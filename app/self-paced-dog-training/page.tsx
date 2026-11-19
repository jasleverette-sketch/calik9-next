import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FormEmbed from "@/components/FormEmbed";
import CelebGrid from "@/components/CelebGrid";
import MeetJas from "@/components/MeetJas";
import { JOIN_FORM_ID, JOIN_FORM_HEIGHT, COURSES, BONUSES } from "@/lib/online-training-offer";

export const metadata: Metadata = {
  title: "Self-Paced Dog Training System",
  description:
    "Train your dog at home with the Cali K9® Self-Paced Dog Training System for $27/month, or add live weekly training with Jas Leverette in the Cali K9 Academy for $97/month.",
  // Funnel page. Keep out of search.
  robots: { index: false, follow: false },
};

type PlanItem = { text: string; included: boolean };

const PLANS: {
  key: string;
  name: string;
  tagline: string;
  price: string;
  featured: boolean;
  badge?: string;
  items: PlanItem[];
  bestFor: string;
  cta: string;
}[] = [
  {
    key: "self-paced",
    name: "Self-Paced",
    tagline: "The training videos, on your own schedule",
    price: "$27",
    featured: false,
    items: [
      { text: "3 obedience, socialization & behavior courses", included: true },
      { text: "100 problem solving technique videos", included: true },
      { text: "“3 Motivators” and “10 Rules to Live By” videos", included: true },
      { text: "3 bonus mastery courses: socialization, heeling, recall", included: true },
      { text: "Watch anytime, as often as you like", included: true },
      { text: "Live training with Jas", included: false },
      { text: "Trainer-led live sessions", included: false },
      { text: "Step-by-step roadmap & progress tracker", included: false },
    ],
    bestFor: "Owners who want Jas’s training on video and are happy to work through it on their own.",
    cta: "Choose Self-Paced",
  },
  {
    key: "academy",
    name: "Academy",
    tagline: "The complete system, with live training every week",
    price: "$97",
    featured: true,
    badge: "Live Training Included",
    items: [
      { text: "Complete 50-Step Roadmap™, all 8 modules", included: true },
      { text: "Full training video library", included: true },
      { text: "Live training with Jas every Saturday", included: true },
      { text: "Trainer-led live session every Wednesday", included: true },
      { text: "Progress tracker & personalized training path", included: true },
      { text: "Private member community", included: true },
      { text: "Cancel anytime, no long-term contract", included: true },
    ],
    bestFor: "Owners who want a clear step-by-step plan and a live trainer to bring their questions to every week.",
    cta: "Choose The Academy",
  },
];

const COMPARE: { label: string; values: [string, string] }[] = [
  { label: "Price", values: ["$27 / month", "$97 / month"] },
  { label: "Training videos you watch on your own", values: ["✓", "✓ Full library"] },
  { label: "50-Step Roadmap™ & all 8 modules", values: ["—", "✓"] },
  { label: "Live training with Jas", values: ["—", "✓ Every Saturday"] },
  { label: "Trainer-led live sessions", values: ["—", "✓ Every Wednesday"] },
  { label: "Bring your dog and your questions live", values: ["—", "✓"] },
  { label: "Progress tracker & personalized path", values: ["—", "✓"] },
  { label: "Private member community", values: ["—", "✓"] },
];

const SELF_PACED_IF = [
  "You like learning from video and practicing on your own time",
  "Your dog needs obedience, manners, and everyday problem solving",
  "You want the lowest-cost way to start training with the Cali K9 method",
];

const ACADEMY_IF = [
  "You want a step-by-step plan that tells you exactly what to work on next",
  "You want to ask questions and get answers live, every week",
  "You stay more consistent with a trainer and a community keeping you on track",
];

function JoinButton({ children, className = "btn-gold" }: { children: React.ReactNode; className?: string }) {
  return (
    <a href="#join" className={`btn btn-lg ${className}`}>
      {children}
    </a>
  );
}

function JoinForm() {
  return (
    <FormEmbed
      formId={JOIN_FORM_ID}
      formName="Self-Paced Dog Training System"
      title="Choose Your Plan"
      height={JOIN_FORM_HEIGHT}
    />
  );
}

export default function SelfPacedPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-[calc(var(--banner-h,0px)+128px)] pb-14 max-md:pt-[calc(var(--banner-h,0px)+100px)] max-md:pb-10 text-center"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[780px] mx-auto px-6 max-[480px]:px-4">
          <div className="font-ui text-base font-semibold text-white/70 mb-4">
            <span className="text-[#F59E0B] text-lg tracking-[2px] mr-1" aria-label="4.9 out of 5 stars">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>{" "}
            4.9/5 star reviews
          </div>
          <span className="inline-flex items-center gap-2 bg-amber-400 text-[#2b1d05] font-ui text-[12px] font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-5">
            Self-Paced Training &middot; $27/month
          </span>
          <h1 className="font-display text-[clamp(36px,5vw,58px)] text-white leading-[0.95] mb-5">
            CALI K9&reg; SELF-PACED DOG TRAINING SYSTEM
          </h1>
          <p className="font-body text-[17px] max-md:text-base text-white/75 leading-relaxed max-w-[640px] mx-auto mb-7">
            Train your dog at home, on your own schedule, with the video training system from Jas
            Leverette, star of Netflix&rsquo;s Canine Intervention. Obedience, socialization, and
            problem solving, one video at a time.
          </p>
          <JoinButton>Get Started For $27/month &darr;</JoinButton>
          <p className="font-body text-[14.5px] text-white/60 mt-5">
            Want live training with Jas every week? See the{" "}
            <a href="#plans" className="text-amber-300 font-semibold hover:underline">
              Academy for $97/month
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── What's inside ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              What&rsquo;s Included
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink max-w-[700px] mx-auto">
              THE CALI K9 METHOD, ON VIDEO
            </h2>
            <p className="font-body text-base text-gray-muted max-w-[600px] mx-auto mt-4">
              Self-Paced is a library of training videos you work through on your own. Watch a
              lesson, practice with your dog, and come back whenever you are ready for the next one.
            </p>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] gap-5 max-md:grid-cols-1">
            <div className="rounded-xl p-6 bg-blue-50 border-2 border-blue-500">
              <h3 className="font-display text-[24px] text-ink leading-none mb-4">TRAINING COURSES &amp; VIDEOS</h3>
              <ul className="space-y-2.5">
                {COURSES.map((item) => (
                  <li key={item} className="font-body text-[15px] text-ink/85 leading-normal pl-6 relative">
                    <span className="absolute left-0 text-blue-500 font-bold">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-6 bg-white border border-border">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-display text-[24px] text-ink leading-none">BONUS COURSES</h3>
                <span className="bg-amber-400 text-[#2b1d05] font-ui text-[10.5px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 rounded-full shrink-0">
                  Included
                </span>
              </div>
              <ul className="space-y-2.5">
                {BONUSES.map((item) => (
                  <li key={item} className="font-body text-[15px] text-ink/85 leading-normal pl-6 relative">
                    <span className="absolute left-0 text-blue-500 font-bold">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two plans ── */}
      <section className="py-14 max-md:py-10 bg-cream scroll-mt-[calc(var(--banner-h,0px)+72px)]" id="plans">
        <div className="max-w-[900px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-10">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              Two Ways To Train
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink max-w-[700px] mx-auto">
              VIDEOS ON YOUR OWN, OR LIVE TRAINING EVERY WEEK
            </h2>
            <p className="font-body text-base text-gray-muted max-w-[620px] mx-auto mt-4">
              Both use the same Cali K9 method. Self-Paced gives you the videos. The Academy adds a
              step-by-step roadmap and live training with Jas and his trainers every week.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 items-stretch max-md:grid-cols-1">
            {PLANS.map((plan) => (
              <div
                key={plan.key}
                className={`relative flex flex-col rounded-[18px] overflow-hidden bg-white shadow-md ${
                  plan.featured ? "border-2 border-amber-400" : "border border-border"
                }`}
              >
                <div
                  className={`text-center font-ui text-[11px] font-bold tracking-[1.5px] uppercase py-1.5 ${
                    plan.badge ? "bg-amber-400 text-[#2b1d05]" : "bg-ink text-transparent max-md:hidden"
                  }`}
                  aria-hidden={!plan.badge}
                >
                  {plan.badge ?? "."}
                </div>
                <div className="bg-ink text-center px-6 pt-6 pb-5">
                  <div className="font-display text-[34px] text-white leading-none">{plan.name.toUpperCase()}</div>
                  <p className="font-body text-[13px] text-white/60 mt-2">{plan.tagline}</p>
                  <div className="font-display text-[46px] text-white leading-none mt-3">
                    {plan.price}
                    <span className="font-body text-[14px] text-white/60">/month</span>
                  </div>
                </div>
                <div className="px-7 py-6 flex flex-col grow max-[480px]:px-5">
                  <ul className="space-y-2.5 mb-5">
                    {plan.items.map((item) => (
                      <li
                        key={item.text}
                        className={`font-body text-[14.5px] leading-normal pl-6 relative ${
                          item.included ? "text-ink/85" : "text-ink/40"
                        }`}
                      >
                        <span
                          className={`absolute left-0 font-bold ${item.included ? "text-blue-500" : "text-ink/30"}`}
                          aria-hidden="true"
                        >
                          {item.included ? "✓" : "✕"}
                        </span>
                        {!item.included && <span className="sr-only">Not included: </span>}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-cream rounded-lg px-4 py-3 mb-6 mt-auto">
                    <div className="font-ui text-[10.5px] font-bold tracking-[1.5px] uppercase text-blue-500 mb-1">
                      Best For
                    </div>
                    <p className="font-body text-[13.5px] text-ink/75 leading-snug">{plan.bestFor}</p>
                  </div>
                  <a
                    href="#join"
                    className={`btn btn-lg w-full text-center ${plan.featured ? "btn-gold" : "btn-blue"}`}
                  >
                    {plan.cta} &darr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compare ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[820px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-8">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              Side By Side
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink">
              WHAT YOU GET WITH EACH
            </h2>
          </div>
          <div className="rounded-xl border border-border overflow-hidden bg-white">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-ink text-white font-ui text-[12px] max-[480px]:text-[11px] font-bold tracking-[1.5px] uppercase">
              <div className="px-5 py-3.5 max-[480px]:px-3" />
              <div className="px-3 py-3.5 text-center">Self-Paced</div>
              <div className="px-3 py-3.5 text-center text-amber-400">Academy</div>
            </div>
            {COMPARE.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.5fr_1fr_1fr] items-center ${i % 2 ? "bg-cream/60" : "bg-white"} border-t border-border`}
              >
                <div className="px-5 py-3.5 max-[480px]:px-3 font-body text-[14.5px] max-[480px]:text-[13.5px] text-ink/85">
                  {row.label}
                </div>
                {row.values.map((v, j) => (
                  <div
                    key={j}
                    className={`px-3 py-3.5 text-center font-body text-[14.5px] max-[480px]:text-[13px] ${
                      v === "—" ? "text-ink/30" : v.startsWith("✓") ? "text-blue-500 font-semibold" : "text-ink/85 font-semibold"
                    }`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Which one ── */}
      <section className="py-14 max-md:py-10 bg-cream">
        <div className="max-w-[900px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink">
              WHICH ONE IS RIGHT FOR YOU?
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {[
              { title: "CHOOSE SELF-PACED IF", items: SELF_PACED_IF, featured: false },
              { title: "CHOOSE THE ACADEMY IF", items: ACADEMY_IF, featured: true },
            ].map((col) => (
              <div
                key={col.title}
                className={`rounded-xl p-6 bg-white ${col.featured ? "border-2 border-amber-400" : "border border-border"}`}
              >
                <h3 className="font-display text-[24px] text-ink leading-none mb-4">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="font-body text-[15px] text-ink/85 leading-normal pl-6 relative">
                      <span className="absolute left-0 text-blue-500 font-bold">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="font-body text-[14.5px] text-gray-muted text-center max-w-[640px] mx-auto mt-7">
            Dealing with serious aggression or a safety concern? Those cases need hands-on help
            first.{" "}
            <Link href="/evaluation-with-behavior-specialist" className="text-blue-500 font-semibold hover:underline">
              Book an evaluation
            </Link>{" "}
            with our team.
          </p>
        </div>
      </section>

      {/* ── Join ── */}
      <section
        className="py-16 max-md:py-12 scroll-mt-[calc(var(--banner-h,0px)+72px)]"
        id="join"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4 grid grid-cols-[1fr_460px] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <span className="font-ui text-[13px] font-semibold tracking-[4px] uppercase text-amber-400 block mb-3">
              Get Started Today
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,48px)] text-white leading-[0.95] mb-5">
              CHOOSE YOUR PLAN AND START TRAINING
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed mb-6">
              Pick Self-Paced or the Academy in the form, enter your details, and you are in.
            </p>
            <div className="space-y-3 mb-8">
              {PLANS.map((plan) => (
                <div
                  key={plan.key}
                  className="flex items-center justify-between gap-4 bg-white/[0.07] border border-white/[0.15] rounded-lg px-5 py-4"
                >
                  <div>
                    <div className="font-display text-[22px] text-white leading-none">{plan.name.toUpperCase()}</div>
                    <div className="font-body text-[13.5px] text-white/60 mt-1.5">{plan.tagline}</div>
                  </div>
                  <div className="font-display text-[28px] text-amber-400 leading-none shrink-0">
                    {plan.price}
                    <span className="font-body text-[13px] text-white/60">/mo</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 items-start">
              <Image
                src="/images/celebs/steph-curry.png"
                alt="Stephen Curry"
                width={72}
                height={72}
                className="shrink-0 w-[64px] h-[64px] rounded-full object-cover object-top border-2 border-white/15"
              />
              <div>
                <p className="font-body text-[15px] italic text-white/75 leading-relaxed mb-1.5">
                  &ldquo;Jas took care of my boys. He got them straight. They listen to me now. They got
                  the best dog trainer right here.&rdquo;
                </p>
                <div className="font-ui text-[13px] font-bold tracking-[1px] uppercase text-white/50">
                  Stephen Curry, NBA Champion
                </div>
              </div>
            </div>
          </div>
          <JoinForm />
        </div>
      </section>

      {/* ── Social proof ── */}
      <CelebGrid />
      <MeetJas />

      {/* ── Final CTA ── */}
      <section
        className="py-16 max-md:py-12 text-center"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="font-display text-[clamp(30px,4.5vw,44px)] text-white leading-[0.95] mb-5">
            THERE ARE NO BAD DOGS. START TRAINING YOURS TODAY.
          </h2>
          <p className="font-body text-base text-white/70 leading-relaxed mb-7">
            Start with the Self-Paced videos for $27/month, or join the Academy for $97/month and
            train live with Jas every week.
          </p>
          <JoinButton>Choose Your Plan &uarr;</JoinButton>
          <p className="font-ui text-xs text-white/35 mt-10">
            <Link href="/privacy-policy" className="hover:text-white/60">Privacy Policy</Link>
            {" · "}
            <Link href="/terms-of-service" className="hover:text-white/60">Terms</Link>
            {" · "}
            <Link href="/refund-policy" className="hover:text-white/60">Refund Policy</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
