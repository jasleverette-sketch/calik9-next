"use client";

// The two "zap down" buttons at the top of /payment-plans. Smooth-scrolls to
// the In-Person or Online group (each section has scroll-margin for the nav).
const TARGETS = [
  {
    id: "in-person",
    label: "In-Person Training",
    sub: "12 Session · Elite · VIP",
    className: "btn-gold",
  },
  {
    id: "online",
    label: "Online Training",
    sub: "Academy Elite · All Access",
    className: "btn-white",
  },
];

export default function JumpButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-[640px] mx-auto max-[560px]:grid-cols-1 max-[560px]:gap-3">
      {TARGETS.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          onClick={(e) => {
            const el = document.getElementById(t.id);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", `#${t.id}`);
          }}
          className={`btn btn-lg ${t.className} !flex flex-col items-center justify-center gap-1.5 !py-5 no-underline`}
        >
          <span className="text-[17px] max-md:text-[15px] tracking-[2px]">{t.label} &darr;</span>
          <span className="font-body normal-case tracking-normal text-[13px] font-semibold opacity-75">
            {t.sub}
          </span>
        </a>
      ))}
    </div>
  );
}
