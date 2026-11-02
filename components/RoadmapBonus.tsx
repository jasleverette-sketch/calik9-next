// The free 50-Step Roadmap bonus for masterclass registrants: pitch on the
// left, a mockup of the roadmap's eight modules on the right. `ctaHref` is the
// masterclass signup (an in-page anchor on the masterclass page itself).

// The eight modules of the 50-Step Roadmap (the actual product structure).
const MODULES = [
  { num: 1, title: "Getting To Know Your Dog", steps: "Steps 1–8" },
  { num: 2, title: "Building Drive & First Commands", steps: "Steps 9–14" },
  { num: 3, title: "Box Work: Sit, Down & Focus", steps: "Steps 15–20" },
  { num: 4, title: "Proofing & Positions", steps: "Steps 21–26" },
  { num: 5, title: "Touchpad & Heeling Basics", steps: "Steps 27–33" },
  { num: 6, title: "Removing The Training Wheels", steps: "Steps 34–38" },
  { num: 7, title: "Advanced Foundations", steps: "Steps 39–44" },
  { num: 8, title: "Advanced Reliability & Real-World Proofing", steps: "Steps 45–50" },
];

// Premium mockup of the actual roadmap: a stacked-document card listing the
// eight modules with their step ranges, replacing the old 1–50 number grid.
function RoadmapMockup() {
  return (
    <div className="relative max-w-[420px] mx-auto w-full">
      <div className="absolute inset-x-6 -bottom-3 h-full rounded-[18px] bg-white/[0.06] border border-white/10" aria-hidden="true" />
      <div className="absolute inset-x-3 -bottom-1.5 h-full rounded-[18px] bg-white/[0.09] border border-white/10" aria-hidden="true" />
      <div className="relative bg-ink rounded-[18px] border border-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.45)] overflow-hidden">
        <div className="px-6 pt-6 pb-5 border-b border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-ui text-[10px] font-bold tracking-[2.5px] uppercase text-amber-400">
                Cali K9&reg; &middot; Official Training Plan
              </div>
              <div className="font-display text-[22px] text-white leading-none mt-2">
                THE 50-STEP ROADMAP&trade;
              </div>
            </div>
            <div className="shrink-0 w-12 h-12 rounded-full border-2 border-amber-400/80 flex flex-col items-center justify-center text-center leading-none">
              <span className="font-display text-[16px] text-white">50</span>
              <span className="font-ui text-[7px] font-bold tracking-[1px] uppercase text-amber-400">Steps</span>
            </div>
          </div>
        </div>
        <ol className="px-6 py-4">
          {MODULES.map((m) => (
            <li key={m.num} className="flex items-center gap-3.5 py-2.5 border-b border-white/[0.07] last:border-b-0">
              <span className="w-7 h-7 rounded-md bg-blue-500 text-white font-display text-[14px] flex items-center justify-center shrink-0">
                {m.num}
              </span>
              <span className="flex-1 font-body text-[13.5px] font-semibold text-white/90 leading-tight">
                {m.title}
              </span>
              <span className="font-ui text-[10px] font-bold tracking-[1px] uppercase text-blue-200 shrink-0">
                {m.steps}
              </span>
            </li>
          ))}
        </ol>
        <div className="px-6 pb-5">
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-blue-200 to-amber-400" />
          </div>
          <div className="flex justify-between font-ui text-[9px] font-semibold tracking-[0.5px] uppercase text-white/45 mt-2">
            <span>Foundation</span>
            <span>Obedience</span>
            <span>Off-Leash</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoadmapBonus({ ctaHref = "/free-masterclass" }: { ctaHref?: string }) {
  return (
    <section
      className="py-16 max-md:py-10"
      style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
        <div className="grid grid-cols-[1fr_0.9fr] gap-12 items-center max-md:grid-cols-1">
          <div className="max-md:text-center">
            <span className="inline-block bg-amber-400 text-[#2b1d05] font-ui text-[11px] font-bold tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full mb-5">
              Free Registration Bonus
            </span>
            <h2 className="font-display text-[clamp(30px,4.5vw,46px)] text-white leading-[0.95] mb-4">
              THE CALI K9 50-STEP ROADMAP&trade;
            </h2>
            <p className="font-ui text-[15px] font-semibold tracking-[1px] uppercase text-blue-200 mb-5">
              8 Modules &rarr; 50 Simple Steps &rarr; One Fully Trained Dog
            </p>
            <p className="font-body text-[15px] text-white/70 leading-relaxed mb-6">
              Most owners don&rsquo;t fail because they aren&rsquo;t trying. They fail because
              they don&rsquo;t know what to work on next. The Roadmap lays out the entire
              progression, from getting to know your dog to real-world off-leash reliability, in the exact
              order Jas teaches it. Yours free the moment you register.
            </p>
            <a href={ctaHref} className="btn btn-lg btn-white text-center max-md:w-full">
              Get The Roadmap + Reserve My Seat &rarr;
            </a>
            <p className="font-body text-xs text-white/50 mt-3">Sent to your inbox when you register.</p>
          </div>
          <RoadmapMockup />
        </div>
      </div>
    </section>
  );
}
