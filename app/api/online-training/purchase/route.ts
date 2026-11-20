import { NextResponse } from "next/server";
import { verifyGhlPurchase } from "@/lib/ghl-purchase-verify";

/**
 * What did this buyer just pay? Used by /online-dog-training/thank-you to send
 * Meta a Purchase event with the real amount charged ($27 or $97, less any
 * coupon such as BF50).
 *
 * POST { contactId } → { ok: true, amount, orderId } when the contact's latest
 * GHL payment is a fresh first payment from a GHL checkout (same rules as the
 * Shopify bridge: lib/ghl-purchase-verify.ts), otherwise { ok: false, retry }.
 *
 * The contact id is the unguessable GHL id the form hands the browser on
 * submit, and the only thing returned is the amount of a payment made in the
 * last 30 minutes, so nothing here needs a login.
 */

const CONTACT_ID = /^[A-Za-z0-9]{15,40}$/;

export async function POST(req: Request) {
  let contactId = "";
  try {
    const body = (await req.json()) as { contactId?: unknown };
    contactId = typeof body.contactId === "string" ? body.contactId.trim() : "";
  } catch {
    // fall through to the 400 below
  }
  if (!CONTACT_ID.test(contactId)) {
    return NextResponse.json({ ok: false, retry: false, reason: "bad contact id" }, { status: 400 });
  }

  // One lookup per request; the page retries while GHL records the payment.
  const result = await verifyGhlPurchase(contactId, Date.now(), 1);
  const headers = { "Cache-Control": "no-store" };
  if (!result.ok) {
    return NextResponse.json({ ok: false, retry: !!result.retryable }, { headers });
  }
  return NextResponse.json({ ok: true, amount: result.amount, orderId: result.orderId }, { headers });
}
