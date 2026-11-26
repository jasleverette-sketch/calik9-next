import type { Metadata } from "next";
import Image from "next/image";
import AssessmentQuiz from "@/app/free-behavior-assessment/AssessmentQuiz";
import { RESULTS, type DogType } from "@/app/free-behavior-assessment/results/content";
import EventDate from "../EventDate";
import Faq from "../Faq";
import StickyCta from "../StickyCta";
import { MASTERCLASS_NAME } from "@/lib/masterclass-sessions";
import { SectionHead, PressLogos, BeforeAfterVideos, RealResults, TrainerJas } from "@/components/ProofSections";

export const metadata: Metadata = {
  title: "Free Masterclass + Your Dog's Personalized Training Plan",
  description:
    "Take the free 2-minute behavior assessment to reserve your seat at Jas Leverette's live masterclass and unlock a 7-day training video plan built for your dog's type.",
  // Funnel page. Keep out of search while in review.
  robots: { index: false, follow: false },
};

// Variant of /free-masterclass where the behavior assessment IS the
// registration: Q1 starts in the hero, the contact step reserves the seat
// (AssessmentQuiz mode="masterclass" → /api/masterclass/register, tags
// mc-registered + mc-form-assessment) and also saves the quiz (quiz-result-*
// tags drive the 7-day video sequences). Then the visitor lands on their
// result page, which confirms the seat instead of asking again.

const WHAT_YOU_GET = [
  "Your dog's behavior type, revealed instantly",
  "A free seat at the live masterclass with Jas",
  "7 days of training videos matched to your dog",
  "The 15-minute-a-day routine to start this week",
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

const LEARN_ITEMS = [
  { title: "Why Your Dog Actually Behaves This Way", body: "What's really driving the pulling, jumping, barking and reactivity, and why it isn't stubbornness." },
  { title: "How To Communicate So Your Dog Understands", body: "The shared language Cali K9 builds before ever asking for a behavior." },
  { title: "How To Get Your Dog Focused On You", body: "Why motivation changes everything, and how to make your dog want to work with you." },
  { title: "How Obedience Is Actually Built", body: "The order skills have to be taught in, so each one supports the next." },
  { title: "How To Make It Hold Up In The Real World", body: "Going from the living room to other dogs, people and distractions without it falling apart." },
];

const LEAD_FAQS = [
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

function StartCta({ light = false, label = "Start My Free Assessment →" }: { light?: boolean; label?: string }) {
  return (
    <a href="#assessment" className={`btn btn-lg text-center max-md:w-full ${light ? "btn-gold" : "btn-blue"}`}>
      {label}
    </a>
  );
}

export default function MasterclassAssessmentPage() {
  return (
    <main>
      {/* ── 1. Hero: promise on the left, Question 1 on the right ── */}
      <section
        className="relative overflow-hidden pt-[100px] pb-16 max-md:pt-8 max-md:pb-10"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[1180px] mx-auto px-10 max-md:px-5 max-[480px]:px-3 relative z-[1]">
          {/* Phones: intro → quiz → details. Desktop: intro + details left, quiz right. */}
          <div className="grid lg:grid-cols-[1fr_1.08fr] gap-x-14 gap-y-8 max-md:gap-y-6 items-start">
            <div className="lg:col-start-1 lg:row-start-1 max-lg:text-center">
              <span className="inline-flex items-center gap-2 bg-white/[0.12] border border-white/[0.22] text-white font-ui text-[11.5px] font-bold tracking-[1.5px] uppercase px-4 py-2 rounded-full backdrop-blur-md mb-6 max-md:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Free Masterclass + Personalized Plan
              </span>
              <span className="font-ui text-[14px] max-md:text-[12.5px] font-bold tracking-[2px] uppercase text-amber-400 block mb-4 max-md:mb-3">
                {MASTERCLASS_NAME}
              </span>
              <h1 className="font-display text-[clamp(38px,5vw,66px)] text-white leading-[0.95] mb-6 max-md:mb-3">
                GET A TRAINING PLAN BUILT FOR <span className="text-amber-400">YOUR</span> DOG
              </h1>
              <p className="font-body text-lg text-white/75 leading-relaxed max-w-[540px] max-lg:mx-auto max-md:hidden">
                Answer 12 quick questions to reserve your free seat at Jas Leverette&rsquo;s live
                masterclass. You&rsquo;ll see your dog&rsquo;s behavior type instantly, then get 7 days
                of training videos picked for dogs like yours.
              </p>
              <p className="md:hidden font-body text-[15px] text-white/75 leading-snug max-w-[360px] mx-auto">
                Take the 2-minute assessment to reserve your free seat and unlock a 7-day video plan
                for your dog.
              </p>
            </div>

            <div id="assessment" className="lg:col-start-2 lg:row-start-1 lg:row-span-2 scroll-mt-6">
              <AssessmentQuiz mode="masterclass" />
              <p className="font-ui text-[11px] tracking-[1.5px] uppercase text-white/45 text-center mt-3">
                12 Questions &middot; 2 Minutes &middot; 100% Free
              </p>
            </div>

            <div className="lg:col-start-1 lg:row-start-2 max-lg:text-center">
              <div className="font-ui text-[12px] font-bold tracking-[2px] uppercase text-white/50 mb-3.5">
                What You Get
              </div>
              <ul className="flex flex-col gap-3 mb-8 max-lg:max-w-[420px] max-lg:mx-auto text-left">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 font-body text-[16px] text-white/85">
                    <span className="text-amber-400 font-bold shrink-0">&#10003;</span> {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mb-6 max-lg:justify-center text-left">
                <Image
                  src="/images/funnel/results-jas-dutch-shepherd.jpg"
                  alt="Jas Leverette"
                  width={128}
                  height={128}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shrink-0"
                />
                <div>
                  <span className="inline-flex items-center gap-2 font-ui text-[11px] font-bold tracking-[1.5px] uppercase text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live With Jas Leverette
                  </span>
                  <div className="font-body text-[13.5px] text-white/65 mt-0.5">
                    Founder of Cali K9&reg; &middot; Host of Netflix&rsquo;s <em>Canine Intervention</em>
                  </div>
                </div>
              </div>
              <EventDate />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. As seen on ── */}
      <PressLogos />

      {/* ── 3. How it works ── */}
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
          <div className="text-center mt-9">
            <StartCta />
          </div>
        </div>
      </section>

      {/* ── 4. The three 7-day plans ── */}
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

      {/* ── 5. Before / after proof ── */}
      <BeforeAfterVideos cta={<StartCta />} />

      {/* ── 6. What you'll learn live ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[720px] mx-auto px-6 max-[480px]:px-4">
          <SectionHead eyebrow="Live With Jas" title="WHAT YOU'LL LEARN IN THE FREE MASTERCLASS" />
          <div className="flex flex-col gap-5">
            {LEARN_ITEMS.map((item, i) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="font-display text-2xl text-blue-500 shrink-0 w-10">0{i + 1}</div>
                <div>
                  <h4 className="font-body text-base font-bold text-ink mb-1">{item.title}</h4>
                  <p className="font-body text-[14px] text-gray-muted leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Results ── */}
      <RealResults cta={<StartCta />} />

      {/* ── 8. Jas ── */}
      <TrainerJas closing="In the masterclass he teaches it to you directly, and your video plan picks up from there." />

      {/* ── 9. FAQ ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[760px] mx-auto px-6 max-[480px]:px-4">
          <SectionHead eyebrow="Questions" title="FREQUENTLY ASKED QUESTIONS" />
          <Faq lead={LEAD_FAQS} />
        </div>
      </section>

      {/* ── 10. Final CTA ── */}
      <section
        className="py-16 max-md:py-12 text-center"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[720px] mx-auto px-6 max-[480px]:px-4">
          <h2 className="font-display text-[clamp(30px,4.5vw,48px)] text-white leading-[0.95] mb-4">
            FIND OUT WHICH DOG YOU HAVE.
            <br />
            <span className="text-amber-400">SAVE YOUR SEAT IN 2 MINUTES.</span>
          </h2>
          <p className="font-body text-base text-white/70 leading-relaxed mb-7">
            Free live masterclass with Jas Leverette, plus a 7-day video plan built for your dog.
          </p>
          <div className="mb-7">
            <EventDate center />
          </div>
          <StartCta light />
        </div>
      </section>

      <StickyCta targetId="assessment" label="Start My Free Assessment →" />
    </main>
  );
}
