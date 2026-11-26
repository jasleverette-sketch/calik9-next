const PLANNER_POINTS = [
  {
    title: "Bring One Goal",
    items: [
      "An everyday challenge you want to improve",
      "One question about your dog's training",
      "Your planner and something to take notes with",
    ],
  },
  {
    title: "Plan Your Next Week",
    items: [
      "Choose your first practice priority",
      "Set aside a 15-minute daily practice slot",
      "Track what you notice and what to ask next",
    ],
  },
];

export default function FirstWeekPlanner({ ctaLabel }: { ctaLabel: string }) {
  return (
    <section className="py-14 max-md:py-10 bg-ink">
      <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
        <div className="text-center mb-9">
          <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-200 block mb-3">
            Your Live Class Worksheet
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[0.95] text-white max-w-[760px] mx-auto mb-5">
            BUILD YOUR FIRST-WEEK TRAINING PLAN
          </h2>
          <p className="font-body text-base text-white/75 leading-relaxed max-w-[620px] mx-auto">
            Attend live with your First-Week Training Planner. Capture the guidance from class,
            choose your first practice priority, and map out a 15-minute daily routine.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 max-w-[800px] mx-auto max-md:grid-cols-1">
          {PLANNER_POINTS.map((column) => (
            <div key={column.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-ui text-[12px] font-bold tracking-[1.5px] uppercase text-blue-200 mb-4">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-body text-[15px] text-white/85">
                    <span className="text-amber-400 font-bold shrink-0" aria-hidden="true">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#register" className="btn btn-white btn-lg max-md:w-full">{ctaLabel}</a>
          <p className="mt-4 font-body text-sm text-white/75">
            <a
              href="/downloads/cali-k9-first-week-training-planner.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              Preview your first-week planner (PDF)
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
