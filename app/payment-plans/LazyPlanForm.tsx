"use client";

import { useEffect, useRef, useState } from "react";
import FormEmbed from "@/components/FormEmbed";
import { jump } from "./jump-state";

// Each GHL payment form is heavy: it pulls in Stripe, Google Pay, hCaptcha and
// Cloudflare, about 16 nested frames per form. Loading all five at once made
// the page slow and crashed phones mid-checkout. So a form only loads when the
// visitor settles near it, and unloads again once they are far away, unless
// they have clicked into it (a form someone is filling in is never unloaded).

// Start loading just before a form scrolls up into view. The negative top
// margin ignores the strip hidden behind the fixed banner and menu, so the form
// above the section someone jumped to does not load.
const LOAD_MARGIN = "-170px 0px 250px 0px";
const UNLOAD_MARGIN = "1800px 0px"; // about two screens away
const DWELL_MS = 350; // ignore sections the jump buttons scroll straight past

interface LazyPlanFormProps {
  formId: string;
  formName: string;
  height: number;
}

export default function LazyPlanForm({ formId, formName, height }: LazyPlanFormProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [loaded, setLoaded] = useState(false);
  // Height of the loaded form's card, kept so unloading never moves the page.
  // The wrapper also always reserves `height`: GHL briefly collapses the iframe
  // while it loads, and without the reserve the page would shrink and jump.
  const [keptHeight, setKeptHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let timer: number | undefined;

    let isNear = false;
    // Load once the visitor has settled here. During a jump-button scroll, wait
    // for it to finish, then check again whether this form is still in view.
    const tryLoad = () => {
      const wait = jump.until - Date.now();
      if (wait > 0) timer = window.setTimeout(tryLoad, wait + 50);
      else if (isNear) setLoaded(true);
    };
    const near = new IntersectionObserver(
      ([entry]) => {
        isNear = entry.isIntersecting;
        window.clearTimeout(timer);
        if (isNear) timer = window.setTimeout(tryLoad, DWELL_MS);
      },
      { rootMargin: LOAD_MARGIN },
    );
    const far = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || touched.current) return;
        setKeptHeight(el.offsetHeight);
        setLoaded(false);
      },
      { rootMargin: UNLOAD_MARGIN },
    );
    near.observe(el);
    far.observe(el);

    // Focus moving into the iframe blurs the window: the visitor is using this form.
    const onBlur = () => {
      if (document.activeElement && el.contains(document.activeElement)) touched.current = true;
    };
    window.addEventListener("blur", onBlur);

    return () => {
      window.clearTimeout(timer);
      near.disconnect();
      far.disconnect();
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div ref={wrap} style={{ minHeight: Math.max(height, keptHeight ?? 0) }}>
      {loaded ? (
        <FormEmbed formId={formId} formName={formName} title="Choose Your Payment Plan" height={height} />
      ) : (
        <div
          className="bg-white/[0.07] border border-white/[0.15] rounded-xl p-7 flex flex-col"
          style={{ minHeight: Math.max(height, keptHeight ?? 0) }}
        >
          <div className="font-ui text-base font-bold tracking-[2px] uppercase text-white/85 mb-2">
            Choose Your Payment Plan
          </div>
          <div
            className="flex-1 rounded-sm bg-white/[0.04] flex items-start justify-center pt-24 font-ui text-sm font-semibold tracking-[1px] uppercase text-white/40"
          >
            Loading secure payment form&hellip;
          </div>
        </div>
      )}
    </div>
  );
}
