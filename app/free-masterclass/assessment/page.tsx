import type { Metadata } from "next";
import AssessmentQuiz from "@/app/free-behavior-assessment/AssessmentQuiz";
import { RESULTS, type DogType } from "@/app/free-behavior-assessment/results/content";
import Masterclass from "../Masterclass";
import { SectionHead } from "@/components/ProofSections";

export const metadata: Metadata = {
  title: "Learn How To Train Your Dog With Jas Leverette",
  description:
    "Take the free 2-minute behavior assessment to reserve your seat at Jas Leverette's live masterclass and get a 7-day training video plan built for your dog.",
  // Funnel page. Keep out of search while in review.
  robots: { index: false, follow: false },
};

// Hybrid of /free-masterclass: the same page (hero photo, layout, proof,
// FAQ, final CTA), with the behavior assessment in place of the GHL form.
// The assessment's contact step reserves the seat (AssessmentQuiz
// mode="masterclass" → /api/masterclass/register, tags mc-registered +
// mc-form-assessment) and saves the quiz (quiz-result-* tags drive the 7-day
// video sequences); the result page then confirms the seat.

const CTA = "Start My Free Assessment →";

const BENEFITS = [
  "Find out which of 3 dog types you have",
  "Get a 7-day training video plan built for your dog",
  "Learn the Cali K9 training framework, live with Jas",
  "Understand the roadmap to reliable obedience",
  "Start making progress in only 15 minutes per day",
];

const STEPS = [
  {
    title: "Take The 2-Minute Assessment",
    body: "12 quick questions about your dog's behavior, history and your goals.",
  },
  {
    title: "Reserve Your Free Seat",
    body: "Your last step saves your spot at the live masterclass with Jas, every Wednesday on Zoom.",
  },
  {
    title: "Get Your Personalized Plan",
    body: "See your dog's type right away, then get one training video a day for 7 days, matched to it.",
  },
];

// What each 7-day video plan covers (the GHL email sequences send these).
const PLANS: { type: DogType; forWho: string; days: string[] }[] = [
  {
    type: "pushy",
    forWho: "Jumps, pulls, ignores commands and tests every boundary.",
    days: [
      "Why the bad behavior keeps coming back",
      "Getting a response the first time you ask",
      "Stopping the pulling, step by step",
      "The mistakes that make it worse",
      "Real dog: from biting to listening",
      "The 15-minute daily routine",
      "The full Cali K9 system",
    ],
  },
  {
    type: "fearful",
    forWho: "Nervous, barks or lunges, and on edge around people or dogs.",
    days: [
      "Why the bad behavior keeps coming back",
      "Where to start with a reactive dog",
      "Real dog: a scared Malinois who needed trust",
      "Calming a dog that barks at everything",
      "Using rewards with a dog that bites",
      "Real dog: a reactive Rottweiler, calm in class",
      "The full Cali K9 system",
    ],
  },
  {
    type: "untrained",
    forWho: "Friendly and easygoing, but no recall and still pulls.",
    days: [
      "Why the bad behavior keeps coming back",
      "Obedience around real-world distractions",
      "Loose-leash walking that actually lasts",
      "The 15-minute daily routine: 10 skills",
      "The myths that keep owners stuck",
      "Real dog: off-leash in Times Square",
      "The full Cali K9 system",
    ],
  },
];

const PLAN_ACCENT: Record<DogType, string> = {
  pushy: "bg-amber-400 text-[#2b1d05]",
  fearful: "bg-blue-200 text-blue-700",
  untrained: "bg-green-500 text-white",
};

const FAQ_LEAD = [
  {
    q: "Why do I take an assessment to register?",
    a: "Because every dog starts from a different place. Your answers tell us which of three dog types you have, so the videos we send are about your dog, not dogs in general. It takes about 2 minutes.",
  },
  {
    q: "What's in the personalized video plan?",
    a: "One short training video a day for 7 days, picked for your dog's type: pushy and overconfident, fearful or reactive, or a good dog that's just never been trained. They arrive by email starting the day after you register.",
  },
  {
    q: "Do I see my results right away?",
    a: "Yes. The moment you finish, you'll see your dog's type, why they behave the way they do, what most owners get wrong, and three things to start this week.",
  },
];

function StartCta({ label = CTA }: { label?: string }) {
  return (
    <a href="#register" className="btn btn-lg btn-blue text-center max-md:w-full">
      {label}
    </a>
  );
}

// How it works + the three 7-day plans, shown right after the press logos.
function AssessmentSections() {
  return (
    <>
      <section className="py-14 max-md:py-10">
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
          <SectionHead eyebrow="How It Works" title="ONE ASSESSMENT. YOUR SEAT AND YOUR PLAN." />
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {STEPS.map((step, i) => (
              <div key={step.title} className="bg-cream border border-border rounded-2xl p-6 text-center">
                <div className="w-11 h-11 rounded-full bg-blue-500 text-white font-display text-xl flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-display text-[20px] text-ink leading-tight mb-2">{step.title.toUpperCase()}</h3>
                <p className="font-body text-[14.5px] text-gray-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-md:py-10 bg-cream">
        <div className="max-w-[1100px] mx-auto px-6 max-[480px]:px-4">
          <SectionHead
            eyebrow="Your Personalized Video Plan"
            title="WHICH DOG DO YOU HAVE?"
            sub="Every dog starts from a different place. Your assessment matches you to one of three plans, so every video is about your dog."
          />
          <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 max-lg:max-w-[560px] max-lg:mx-auto">
            {PLANS.map((plan) => (
              <div key={plan.type} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="bg-ink px-6 pt-6 pb-5">
                  <span className={`inline-block font-ui text-[10.5px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full mb-3 ${PLAN_ACCENT[plan.type]}`}>
                    7-Day Plan
                  </span>
                  <h3 className="font-display text-[24px] text-white leading-tight mb-1.5">{RESULTS[plan.type].label.toUpperCase()}</h3>
                  <p className="font-body text-[13.5px] text-white/65 leading-snug">{plan.forWho}</p>
                </div>
                <ol className="px-6 py-5 flex flex-col gap-2.5 flex-1">
                  {plan.days.map((day, i) => (
                    <li key={day} className="flex items-start gap-3 font-body text-[14px] text-ink/85 leading-snug">
                      <span className="font-ui text-[10.5px] font-bold tracking-[1px] uppercase text-blue-500 shrink-0 w-11 pt-[3px]">
                        Day {i + 1}
                      </span>
                      <span>{day}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="font-body text-[15px] text-gray-muted text-center max-w-[560px] mx-auto mt-9 mb-6">
            Not sure which one is yours? That&rsquo;s exactly what the assessment tells you.
          </p>
          <div className="text-center">
            <StartCta label="Find Out Which Dog I Have →" />
          </div>
        </div>
      </section>
    </>
  );
}

export default function MasterclassAssessmentPage() {
  return (
    <Masterclass
      registration={<AssessmentQuiz mode="masterclass" />}
      benefits={BENEFITS}
      heroSub={{
        desktop: (
          <>
            Take the free 2-minute behavior assessment to reserve your seat. Learn the same Cali K9&reg;
            system Jas Leverette has used to transform thousands of dogs, and get a 7-day video plan
            built for yours.
          </>
        ),
        mobile: <>Take the 2-minute assessment to reserve your seat and get a 7-day video plan built for your dog.</>,
      }}
      ctaLabel={CTA}
      afterLogos={<AssessmentSections />}
      faqLead={FAQ_LEAD}
    />
  );
}
