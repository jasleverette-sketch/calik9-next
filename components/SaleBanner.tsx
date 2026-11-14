"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLanderPath } from "@/lib/lander-routes";

// The banner turns itself on and off at these times (Pacific), checked in the
// visitor's browser, so no deploy is needed at launch or at the end.
// Black Friday 2026: Mon Nov 16 12:30am PT through Mon Nov 30 11:59pm PT.
const SALE_START = Date.parse("2026-11-16T00:30:00-08:00");
const SALE_END = Date.parse("2026-11-30T23:59:00-08:00");

// Re-check every 30 seconds so an open page picks up the start/end time.
function subscribeClock(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
function saleIsLive() {
  const now = Date.now();
  return now >= SALE_START && now < SALE_END;
}

export default function SaleBanner() {
  const [dismissed, setDismissed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // false on the server, so the banner only ever appears in the browser.
  const live = useSyncExternalStore(subscribeClock, saleIsLive, () => false);
  // Distraction-free lander pages get no promo banner.
  const hidden = !live || dismissed || isLanderPath(pathname);

  useEffect(() => {
    if (hidden) {
      document.documentElement.style.setProperty("--banner-h", "0px");
      return;
    }
    const update = () => {
      if (ref.current) {
        const h = ref.current.offsetHeight;
        document.documentElement.style.setProperty("--banner-h", `${h}px`);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [hidden]);

  const handleDismiss = () => {
    setDismissed(true);
    document.documentElement.style.setProperty("--banner-h", "0px");
    document.documentElement.classList.add("banner-dismissed");
  };

  if (hidden) return null;

  return (
    <div
      ref={ref}
      id="sale-banner"
      className="fixed top-0 left-0 right-0 z-[1001] bg-black text-white border-b-2 border-amber-400 py-3.5 max-md:py-2 pl-10 pr-12 max-md:pl-3 max-md:pr-9"
    >
      <Link
        href="/newclientservices"
        aria-label="Black Friday sale: 20% off in-person training with code BF20, 50% off online training with code BF50. View training services."
        className="no-underline text-white hover:opacity-85 transition-opacity flex items-center justify-center gap-x-5 gap-y-1 max-md:gap-y-1.5 flex-wrap max-md:flex-col text-center font-ui font-bold uppercase leading-none">
        <span className="text-amber-400 text-[21px] max-md:text-[18px] tracking-[3px]">
          Black Friday Sale
        </span>
        <span className="hidden lg:block w-px h-6 bg-white/25" />
        <span className="flex items-center justify-center gap-x-4 max-md:gap-x-3 gap-y-1 flex-wrap text-[17px] max-md:text-[14px] tracking-[1px]">
          <span className="whitespace-nowrap">
            20% Off In-Person Training
            <span className="inline-block bg-white text-black px-2 py-[3px] rounded-sm tracking-[2px] ml-2">BF20</span>
          </span>
          <span className="text-white/35 max-md:hidden">&middot;</span>
          <span className="whitespace-nowrap">
            50% Off Online Training
            <span className="inline-block bg-amber-400 text-black px-2 py-[3px] rounded-sm tracking-[2px] ml-2">BF50</span>
          </span>
        </span>
      </Link>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        className="absolute right-4 max-md:right-2.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-lg font-bold leading-none"
      >
        ✕
      </button>
    </div>
  );
}
