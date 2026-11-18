"use client";

import { jump } from "./jump-state";

// The "zap down" buttons at the top of /payment-plans: one per program,
// gold for in-person and white for online. Each smooth-scrolls to its own
// section (sections carry scroll-margin for the fixed nav and sale banner).
const GROUPS = [
  {
    label: "In-Person Training",
    className: "btn-gold",
    cols: "grid-cols-3",
    width: "max-w-[780px]",
    targets: [
      { id: "12-session", label: "12 Sessions" },
      { id: "elite-in-person", label: "Elite 24 Sessions" },
      { id: "vip-in-person", label: "VIP Training" },
    ],
  },
  {
    label: "Online Training",
    className: "btn-white",
    cols: "grid-cols-2",
    width: "max-w-[516px]",
    targets: [
      { id: "academy-elite", label: "Academy Elite" },
      { id: "all-access", label: "All Access" },
    ],
  },
];

// The payment forms above a section grow as they scroll into view (GHL
// resizes its iframes), which pushes the target down mid-scroll. So after the
// first scroll, re-check a few times and correct, unless the visitor has
// started scrolling on their own.
function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  history.replaceState(null, "", `#${id}`);
  jump.until = Date.now() + 1500;
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
  events.forEach((ev) => window.addEventListener(ev, cancel, { once: true, passive: true }));
  const cleanup = () => events.forEach((ev) => window.removeEventListener(ev, cancel));

  const want = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  [900, 1700, 2600].forEach((ms, i, all) => {
    window.setTimeout(() => {
      if (!cancelled && Math.abs(el.getBoundingClientRect().top - want) > 6) {
        jump.until = Date.now() + 700;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (i === all.length - 1) cleanup();
    }, ms);
  });
}

export default function JumpButtons() {
  return (
    <div className="flex flex-col gap-7 max-md:gap-6">
      {GROUPS.map((g) => (
        <div key={g.label}>
          <div className="font-ui text-[13px] font-semibold tracking-[4px] uppercase text-white/60 mb-3">
            {g.label}
          </div>
          <div className={`grid ${g.cols} gap-3 ${g.width} mx-auto max-[640px]:grid-cols-1 max-[640px]:gap-2.5`}>
            {g.targets.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                onClick={(e) => {
                  if (!document.getElementById(t.id)) return;
                  e.preventDefault();
                  jumpTo(t.id);
                }}
                className={`btn ${g.className} !px-4 !py-[18px] max-[640px]:!py-4 !text-[15px] no-underline whitespace-nowrap`}
              >
                {t.label} &darr;
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
