import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FormEmbed from "@/components/FormEmbed";
import CelebGrid from "@/components/CelebGrid";
import MeetJas from "@/components/MeetJas";
import { JOIN_FORM_ID, JOIN_FORM_HEIGHT, COURSES, BONUSES } from "@/lib/online-training-offer";

// Academy-first version of /self-paced-dog-training: the $97/month Academy is
// the main offer and the $27/month Self-Paced videos are the downsell.

export const metadata: Metadata = {
  title: "Online Dog Training With Jas Leverette",
  description:
    "Join the Cali K9® Academy for $97/month: the 50-Step Roadmap, the full video library, and live training with Jas Leverette every week. Or get the video courses on their own for $27/month.",
  // Funnel page. Keep out of search.
  robots: { index: false, follow: false },
};

const INCLUDED = [
  {
    title: "THE 50-STEP ROADMAP™",
    tag: "All 8 Modules",
    desc: "The whole Cali K9 system in order, from getting to know your dog to real-world proofing. You always know which step comes next.",
  },
  {
    title: "LIVE TRAINING WITH JAS",
    tag: "Every Saturday",
    desc: "Bring your dog and your questions to Academy Live with Jas, every week.",
  },
  {
    title: "TRAINER-LED LIVE SESSION",
    tag: "Every Wednesday",
    desc: "A second live session each week, led by a Cali K9 trainer.",
  },
  {
    title: "FULL TRAINING VIDEO LIBRARY",
    tag: "On Demand",
    desc: "Every lesson on video, so you can watch, practice, and rewatch whenever you need to.",
  },
  {
    title: "PROGRESS TRACKER",
    tag: "Personalized",
    desc: "Start at Step 1 on a recommended path built for your dog, and see how far you have come.",
  },
  {
    title: "PRIVATE MEMBER COMMUNITY",
    tag: "Members Only",
    desc: "Train alongside other Academy members working through the same roadmap.",
  },
];

const WHY_LIVE = [
  {
    title: "FEEDBACK",
    desc: "Ask your questions and get answers live, instead of guessing whether you are doing it right.",
  },
  {
    title: "ACCOUNTABILITY",
    desc: "Live sessions on the calendar every week keep you and your dog practicing.",
  },
  {
    title: "A CLEAR PLAN",
    desc: "The roadmap tells you exactly what to work on next, so your training never stalls.",
  },
];

const STEPS = [
  { num: "01", title: "Join", desc: "Complete your $97/month membership in under two minutes." },
  { num: "02", title: "Get Instant Access", desc: "You are inside the full member portal immediately. No waiting." },
  { num: "03", title: "Start Your Roadmap", desc: "Begin at Step 1 on a recommended path built for your dog, with your progress tracker ready to go." },
  { num: "04", title: "Train Live Every Week", desc: "Join Academy Live with Jas on Saturdays and the trainer-led session on Wednesdays." },
];

const COMPARE: { label: string; values: [string, string] }[] = [
  { label: "Price", values: ["$97 / month", "$27 / month"] },
  { label: "Training videos you watch on your own", values: ["✓ Full library", "✓"] },
  { label: "50-Step Roadmap™ & all 8 modules", values: ["✓", "—"] },
  { label: "Live training with Jas", values: ["✓ Every Saturday", "—"] },
  { label: "Trainer-led live sessions", values: ["✓ Every Wednesday", "—"] },
  { label: "Bring your dog and your questions live", values: ["✓", "—"] },
  { label: "Progress tracker & personalized path", values: ["✓", "—"] },
  { label: "Private member community", values: ["✓", "—"] },
];

const JOIN_PLANS = [
  { name: "ACADEMY", tagline: "Roadmap, videos, and live training every week", price: "$97", featured: true },
  { name: "SELF-PACED", tagline: "The video courses only, on your own schedule", price: "$27", featured: false },
];

const GRADIENT = "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)";
// Anchored sections sit below the fixed header and the sale banner.
const ANCHOR = "scroll-mt-[calc(var(--banner-h,0px)+72px)]";

export default function OnlineDogTrainingPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-[128px] pb-14 max-md:pt-[100px] max-md:pb-10 text-center"
        style={{ background: GRADIENT }}
      >
        <div className="max-w-[800px] mx-auto px-6 max-[480px]:px-4">
          <div className="font-ui text-base font-semibold text-white/70 mb-4">
            <span className="text-[#F59E0B] text-lg tracking-[2px] mr-1" aria-label="4.9 out of 5 stars">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </span>{" "}
            4.9/5 star reviews
          </div>
          <span className="inline-flex items-center gap-2 bg-amber-400 text-[#2b1d05] font-ui text-[12px] font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-5">
            Cali K9&reg; Academy &middot; $97/month
          </span>
          <h1 className="font-display text-[clamp(36px,5vw,58px)] text-white leading-[0.95] mb-5">
            TRAIN YOUR DOG LIVE WITH JAS LEVERETTE, EVERY WEEK
          </h1>
          <p className="font-body text-[17px] max-md:text-base text-white/75 leading-relaxed max-w-[660px] mx-auto mb-7">
            The Cali K9 Academy is the complete online training system from the star of
            Netflix&rsquo;s Canine Intervention: a step-by-step 50-Step Roadmap&trade;, the full
            video library, and live training every week, so you always know you are doing it right.
          </p>
          <a href="#join" className="btn btn-gold btn-lg">
            Join The Academy For $97/month &darr;
          </a>
          <p className="font-ui text-xs tracking-[1.5px] uppercase text-white/40 mt-4">
            Cancel Anytime &middot; No Long-Term Contract
          </p>
          <p className="font-body text-[14.5px] text-white/60 mt-5">
            Just want the videos?{" "}
            <a href="#self-paced" className="text-amber-300 font-semibold hover:underline">
              Get them for $27/month
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[1040px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              What&rsquo;s Included
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink max-w-[720px] mx-auto">
              A COMPLETE SYSTEM, PLUS A TRAINER IN YOUR CORNER
            </h2>
            <p className="font-body text-base text-gray-muted max-w-[620px] mx-auto mt-4">
              Everything you need to train your dog at home, with live help every week when you get
              stuck.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {INCLUDED.map((item, i) => (
              <div
                key={item.title}
                className={`rounded-xl p-6 ${
                  i < 3 ? "bg-blue-50 border-2 border-blue-500" : "bg-white border border-border"
                }`}
              >
                <span
                  className={`inline-block font-ui text-[10.5px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 rounded-full mb-3 ${
                    i < 3 ? "bg-blue-500 text-white" : "bg-cream text-ink/60"
                  }`}
                >
                  {item.tag}
                </span>
                <h3 className="font-display text-[23px] text-ink leading-none mb-2.5">{item.title}</h3>
                <p className="font-body text-[14.5px] text-ink/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why live ── */}
      <section className="py-14 max-md:py-10 bg-cream">
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              Why Live Training
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink max-w-[760px] mx-auto">
              VIDEOS SHOW YOU WHAT TO DO. LIVE TRAINING MAKES SURE YOU DO IT.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {WHY_LIVE.map((item) => (
              <div key={item.title} className="rounded-xl p-6 bg-white border border-border">
                <h3 className="font-display text-[24px] text-ink leading-none mb-2.5">{item.title}</h3>
                <p className="font-body text-[15px] text-ink/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[1040px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              How It Works
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink">
              START TRAINING TODAY
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
            {STEPS.map((step) => (
              <div key={step.num} className="rounded-xl p-6 bg-white border border-border">
                <div className="font-display text-[34px] text-blue-500 leading-none mb-3">{step.num}</div>
                <h3 className="font-display text-[22px] text-ink leading-none mb-2.5">{step.title.toUpperCase()}</h3>
                <p className="font-body text-[14.5px] text-ink/75 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-9">
            <a href="#join" className="btn btn-gold btn-lg">
              Join The Academy For $97/month &darr;
            </a>
          </div>
        </div>
      </section>

      {/* ── Downsell: Self-Paced ── */}
      <section className={`py-14 max-md:py-10 bg-cream ${ANCHOR}`} id="self-paced">
        <div className="max-w-[940px] mx-auto px-6 max-[480px]:px-4">
          <div className="rounded-[18px] bg-white border border-border shadow-md overflow-hidden">
            <div className="bg-ink text-center px-7 py-8 max-[480px]:px-5">
              <span className="font-ui text-[13px] font-semibold tracking-[4px] uppercase text-amber-400 block mb-3">
                Just Want The Videos?
              </span>
              <h2 className="font-display text-[clamp(26px,3.8vw,38px)] leading-[0.98] text-white max-w-[680px] mx-auto">
                DON&rsquo;T NEED THE LIVE TRAINING AND ACCOUNTABILITY?
              </h2>
              <p className="font-body text-[17px] max-md:text-base text-white/75 mt-4">
                Get all the video courses for only{" "}
                <strong className="text-amber-300">$27/month</strong>.
              </p>
            </div>
            <div className="grid grid-cols-[1.35fr_1fr] gap-8 p-8 max-md:grid-cols-1 max-md:gap-6 max-[480px]:p-5">
              <div>
                <div className="font-ui text-[12px] font-bold tracking-[2px] uppercase text-blue-500 mb-3">
                  Self-Paced Dog Training System
                </div>
                <ul className="space-y-2.5">
                  {COURSES.map((item) => (
                    <li key={item} className="font-body text-[15px] text-ink/85 leading-normal pl-6 relative">
                      <span className="absolute left-0 text-blue-500 font-bold">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="font-ui text-[12px] font-bold tracking-[2px] uppercase text-blue-500 mt-5 mb-3">
                  Bonus Courses
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
              <div className="bg-cream rounded-xl p-6 flex flex-col justify-center text-center">
                <div className="font-display text-[26px] text-ink leading-none">SELF-PACED</div>
                <div className="font-display text-[52px] text-ink leading-none mt-3">
                  $27<span className="font-body text-[15px] text-ink/60">/month</span>
                </div>
                <p className="font-body text-[14px] text-ink/70 leading-relaxed mt-3 mb-5">
                  The training videos, on your own schedule. No live sessions, roadmap, or community.
                </p>
                <a href="#join" className="btn btn-blue w-full text-center">
                  Get The Videos For $27/month &darr;
                </a>
              </div>
            </div>
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
              ACADEMY VS. SELF-PACED
            </h2>
          </div>
          <div className="rounded-xl border border-border overflow-hidden bg-white">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-ink text-white font-ui text-[12px] max-[480px]:text-[11px] font-bold tracking-[1.5px] uppercase">
              <div className="px-5 py-3.5 max-[480px]:px-3" />
              <div className="px-3 py-3.5 text-center text-amber-400">Academy</div>
              <div className="px-3 py-3.5 text-center">Self-Paced</div>
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
      <section className={`py-16 max-md:py-12 ${ANCHOR}`} id="join" style={{ background: GRADIENT }}>
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4 grid grid-cols-[1fr_460px] gap-12 items-start max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <span className="font-ui text-[13px] font-semibold tracking-[4px] uppercase text-amber-400 block mb-3">
              Get Started Today
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,48px)] text-white leading-[0.95] mb-5">
              JOIN THE ACADEMY AND START TRAINING
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed mb-6">
              Select your plan in the form, enter your details, and you are in.
            </p>
            <div className="space-y-3 mb-8">
              {JOIN_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex items-center justify-between gap-4 rounded-lg px-5 py-4 ${
                    plan.featured
                      ? "bg-amber-400/10 border-2 border-amber-400"
                      : "bg-white/[0.07] border border-white/[0.15]"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-display text-[22px] text-white leading-none">{plan.name}</span>
                      {plan.featured && (
                        <span className="bg-amber-400 text-[#2b1d05] font-ui text-[10px] font-bold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
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
          <FormEmbed
            formId={JOIN_FORM_ID}
            formName="Cali K9 Academy or Self-Paced"
            title="Choose Your Plan"
            height={JOIN_FORM_HEIGHT}
          />
        </div>
      </section>

      {/* ── Social proof ── */}
      <CelebGrid />
      <MeetJas />

      {/* ── Final CTA ── */}
      <section className="py-16 max-md:py-12 text-center" style={{ background: GRADIENT }}>
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="font-display text-[clamp(30px,4.5vw,44px)] text-white leading-[0.95] mb-5">
            THERE ARE NO BAD DOGS. TRAIN YOURS WITH JAS EVERY WEEK.
          </h2>
          <p className="font-body text-base text-white/70 leading-relaxed mb-7">
            Join the Academy for $97/month and get the roadmap, the video library, and live training
            every week. Or start with the video courses on their own for $27/month.
          </p>
          <a href="#join" className="btn btn-gold btn-lg">
            Join The Academy &uarr;
          </a>
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
