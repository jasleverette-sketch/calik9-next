"use client";

import { useEffect } from "react";

// Sends Meta a Purchase event with the amount this buyer was actually charged.
//
// The GHL form does not tell the thank-you page which plan was picked or
// whether a coupon was used, so the page asks our server, which reads the
// payment from GHL (app/api/online-training/purchase).
//
// Who the buyer is comes from the form itself:
//   1. ?cid=<contact id> on the redirect URL, if the form's redirect is set to
//      .../thank-you?cid={{contact.id}}
//   2. otherwise the contact GHL's embed script saves in localStorage ("_ud")
//      when the form is submitted.
//
// Nothing fires for someone who just opens this page without buying.

const CONTACT_ID = /^[A-Za-z0-9]{15,40}$/;
const TRIES = 6;
const WAIT_MS = 3000;

type Fbq = (...args: unknown[]) => void;

function contactFromUrl(): string | null {
  try {
    const cid = new URLSearchParams(window.location.search).get("cid") || "";
    return CONTACT_ID.test(cid) ? cid : null;
  } catch {
    return null;
  }
}

function contactFromForm(): string | null {
  try {
    const ud = JSON.parse(window.localStorage.getItem("_ud") || "{}") as { id?: unknown; customer_id?: unknown };
    const id = typeof ud.id === "string" ? ud.id : typeof ud.customer_id === "string" ? ud.customer_id : "";
    return CONTACT_ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

function alreadySent(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function markSent(key: string) {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    // private mode: worst case a reload sends the event again
  }
}

function track(params: Record<string, unknown>, eventID?: string) {
  const w = window as typeof window & { fbq?: Fbq };
  let tries = 20;
  const fire = () => {
    if (typeof w.fbq === "function") {
      if (eventID) w.fbq("track", "Purchase", params, { eventID });
      else w.fbq("track", "Purchase", params);
    } else if (tries-- > 0) setTimeout(fire, 300);
  };
  fire();
}

export default function PurchasePixel() {
  useEffect(() => {
    const fromUrl = contactFromUrl();
    const contactId = fromUrl ?? contactFromForm();
    if (!contactId) return;

    // Keep the contact id out of the address bar once it has been read.
    if (fromUrl) {
      try {
        window.history.replaceState(null, "", window.location.pathname);
      } catch {
        // not important
      }
    }

    const fallbackKey = `ck9_purchase_sent_${contactId}`;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const attempt = async (n: number) => {
      if (cancelled) return;
      let retry = true;
      try {
        const res = await fetch("/api/online-training/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contactId }),
        });
        const data = (await res.json()) as { ok?: boolean; amount?: number; orderId?: string; retry?: boolean };
        if (cancelled) return;
        if (data.ok && typeof data.amount === "number" && data.orderId) {
          const key = `ck9_purchase_sent_${data.orderId}`;
          if (!alreadySent(key) && !alreadySent(fallbackKey)) {
            track(
              { value: data.amount, currency: "USD", content_name: "Cali K9 Online Training" },
              `ghl-${data.orderId}`,
            );
          }
          markSent(key);
          return;
        }
        retry = data.retry !== false;
      } catch {
        // network hiccup: try again
      }
      if (retry && n < TRIES) {
        timer = setTimeout(() => attempt(n + 1), WAIT_MS);
        return;
      }
      // The form sent this buyer here (the id came on the redirect URL) but the
      // payment could not be read: count the purchase without a value rather
      // than lose it.
      if (fromUrl && !alreadySent(fallbackKey)) {
        track({ currency: "USD", content_name: "Cali K9 Online Training" });
        markSent(fallbackKey);
      }
    };
    attempt(1);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return null;
}
