import type React from "react";
import Image from "next/image";
import Link from "next/link";
import FormEmbed from "@/components/FormEmbed";
import EventDate from "./EventDate";
import Faq from "./Faq";
import StickyCta from "./StickyCta";
import { CLASSIC_SESSIONS, dayPhrase, MASTERCLASS_NAME, type SessionId } from "@/lib/masterclass-sessions";
import RoadmapBonus from "@/components/RoadmapBonus";
import { SectionHead, PressLogos, BeforeAfterVideos, RealResults, TrainerJas, MissionCompact } from "@/components/ProofSections";

// Page order (post-audit, 2026-09-21):
// Hero + form → Before/after videos → Problem identification → Why current
// training fails → What you'll learn → 50-Step Roadmap bonus → Testimonials →
// Jas / authority → Session details → Rescue mission → FAQ → Final CTA.

const BENEFITS = [
  "Discover why your dog isn't listening",
  "Learn the Cali K9 training framework",
  "Build focus around real-world distractions",
  "Understand the roadmap to reliable obedience",
  "Learn how to start making progress in only 15 minutes per day",
];

// The six strongest, most recognizable problems (cut from eleven).
const PAINS = [
  "Pulling on the leash",
  "Jumping on people",
  "Barking",
  "Reactivity toward dogs or people",
  "Ignoring commands",
  "Falls apart around distractions",
];

// Why random tips, isolated commands and inconsistent training don't work.
const FAILURES = [
  {
    title: "Random Tips",
    body: "A trick from one video, a fix from another. None of it connects, so your dog never learns how the pieces fit together.",
  },
  {
    title: "Isolated Commands",
    body: "“Sit” in the kitchen means nothing on a busy sidewalk. Commands taught without engagement and structure don't survive real life.",
  },
  {
    title: "Inconsistent Training",
    body: "Different rules on different days teach your dog that the rules are optional. Reliability comes from a clear, repeatable system.",
  },
];

// Scannable: why behavior happens → communication → engagement → obedience → real-world reliability.
const LEARN_ITEMS = [
  {
    title: "Why Your Dog Actually Behaves This Way",
    body: "What's really driving the pulling, jumping, barking and reactivity, and why it isn't stubbornness.",
  },
  {
    title: "How To Communicate So Your Dog Understands",
    body: "The shared language Cali K9 builds before ever asking for a behavior.",
  },
  {
    title: "How To Get Your Dog Focused On You",
    body: "Why motivation changes everything, and how to make your dog want to work with you.",
  },
  {
    title: "How Obedience Is Actually Built",
    body: "The order skills have to be taught in so each one supports the next.",
  },
  {
    title: "How To Make It Hold Up In The Real World",
    body: "Progressing from the living room to other dogs, people and distractions without the training falling apart.",
  },
];

const SESSION_DETAILS = [
  {
    title: "What To Bring",
    items: ["A phone, tablet or laptop", "Something to take notes with", "Your questions about your dog (your dog can stay on the couch)"],
  },
  {
    title: "What You'll Leave Knowing",
    items: ["Why your dog does what it does", "The order training has to happen in", "Exactly what to work on first this week"],
  },
];

function RegisterCta({ label = "Reserve My Free Seat →", light = false }: { label?: string; light?: boolean }) {
  return (
    <a href="#register" className={`btn btn-lg text-center max-md:w-full ${light ? "btn-white" : "btn-blue"}`}>
      {label}
    </a>
  );
}

// `registration` replaces the GHL form in the hero (used by
// /free-masterclass-live for the on-site form, and by
// /free-masterclass/assessment for the behavior assessment). `sessions`
// controls which live sessions the page advertises.
//
// Variant knobs (all optional; /free-masterclass uses the defaults):
//   benefits   hero checklist
//   heroSub    hero paragraph ({ desktop, mobile })
//   ctaLabel   every "#register" button on the page, incl. the mobile sticky bar
//   afterLogos extra sections between the press logos and the before/after videos
//   faqLead    questions shown before the standard FAQ
export default function Masterclass({
  intro,
  registration,
  sessions = CLASSIC_SESSIONS,
  benefits = BENEFITS,
  heroSub,
  ctaLabel = "Reserve My Free Seat →",
  afterLogos,
  faqLead,
}: {
  intro?: React.ReactNode;
  registration?: React.ReactNode;
  sessions?: readonly SessionId[];
  benefits?: readonly string[];
  heroSub?: { desktop: React.ReactNode; mobile: React.ReactNode };
  ctaLabel?: string;
  afterLogos?: React.ReactNode;
  faqLead?: { q: string; a: string }[];
}) {
  const whenPhrase = sessions.length === 1 ? `this ${dayPhrase(sessions)}` : `this week — ${dayPhrase(sessions)} —`;
  return (
    <main>
      {intro}
      {/* ── 1. Hero + registration ── */}
      <section
        className="relative overflow-hidden pt-[100px] pb-14 max-md:pt-8 max-md:pb-10"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[1140px] mx-auto px-10 max-md:px-6 max-[480px]:px-4 relative z-[1]">
          {/* Desktop: text left, photo + form right. Phones: headline, then
              photo + form, then the Jas details (see .mc-hero-grid). */}
          <div className="mc-hero-grid">
            <div className="mc-hero-intro max-lg:text-center">
              <span className="inline-flex items-center gap-2 bg-white/[0.12] border border-white/[0.22] text-white font-ui text-[11.5px] font-bold tracking-[1.5px] uppercase px-4 py-2 rounded-full backdrop-blur-md mb-6 max-md:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Cali K9 Presents &middot;
                Free Live Masterclass
              </span>
              <span className="font-ui text-[15px] max-md:text-[13.5px] font-bold tracking-[2px] uppercase text-amber-400 block mb-4 max-md:mb-3">
                {MASTERCLASS_NAME}
              </span>
              <h1 className="font-display text-[clamp(38px,5vw,68px)] text-white leading-[0.95] mb-7 max-md:mb-3">
                TRANSFORM YOUR DOG IN JUST 15 MINUTES A DAY
              </h1>
              <p className="font-body text-lg lg:text-xl text-white/70 leading-relaxed mb-8 max-lg:mb-0 max-w-[560px] max-lg:mx-auto max-md:hidden">
                {heroSub ? heroSub.desktop : (
                  <>
                    Discover the same Cali K9&reg; training system Jas Leverette has used to help
                    transform thousands of dogs &mdash; from basic obedience to pulling, reactivity,
                    anxiety, aggression and reliable real-world control.
                  </>
                )}
              </p>
              {/* Phones: shorter version so the form starts above the fold. */}
              <p className="md:hidden font-body text-[15.5px] text-white/70 leading-snug mx-auto max-w-[360px]">
                {heroSub ? heroSub.mobile : (
                  <>
                    The same Cali K9&reg; system Jas Leverette has used to transform thousands of
                    dogs, from pulling and reactivity to anxiety and aggression.
                  </>
                )}
              </p>
            </div>

            <div className="mc-hero-details max-lg:text-center">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 font-ui text-[11px] font-bold tracking-[1.5px] uppercase text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live With
                  Jas Leverette
                </span>
                <div className="font-display text-2xl lg:text-3xl text-white mt-2">JAS LEVERETTE</div>
                <div className="font-body text-[13.5px] lg:text-[15px] text-white/60 mt-1">
                  Founder of Cali K9&reg; &middot; Host &amp; Executive Producer of Netflix&rsquo;s{" "}
                  <em>Canine Intervention</em>
                </div>
              </div>

              <ul className="flex flex-col gap-3 lg:gap-4 mb-8 max-lg:max-w-[440px] max-lg:mx-auto text-left">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 font-body text-[15px] lg:text-[16.5px] text-white/85">
                    <span className="text-amber-400 font-bold shrink-0">&#10003;</span> {benefit}
                  </li>
                ))}
              </ul>

              <EventDate sessions={sessions} />
            </div>

            <div className="mc-hero-media">
              <div className="relative rounded-xl overflow-hidden mb-6 max-md:mb-4">
                <Image
                  src="/images/funnel/results-jas-dutch-shepherd.jpg"
                  alt="Jas Leverette with a Dutch Shepherd"
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover"
                  priority
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-white rounded-full pl-3.5 pr-4 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.3)]">
                  <span className="font-ui text-[11px] font-bold tracking-[1.5px] uppercase text-ink/60">As seen on</span>
                  <Image src="/images/netflix-wordmark.png" alt="Netflix" width={547} height={153} className="h-[15px] w-auto" />
                </span>
              </div>

              <div id="register" className="scroll-mt-24">
                {registration ?? (
                  <FormEmbed
                    formId="hZHHQAAWiOEP0ADyInGy"
                    formName="Webinar Registration"
                    title="Reserve Your Free Seat"
                    height={447}
                  />
                )}
                <p className="font-ui text-xs tracking-[1.5px] uppercase text-white/40 text-center mt-3">
                  100% Free &middot; No Credit Card Required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── As seen on ── */}
      <PressLogos />

      {afterLogos}

      {/* ── 2. Before / after transformation proof ── */}
      <BeforeAfterVideos cta={<RegisterCta label={ctaLabel} />} />

      {/* ── 3. Problem identification ── */}
      <section className="py-14 max-md:py-10 bg-cream">
        <div className="max-w-[860px] mx-auto px-6 max-[480px]:px-4">
          <SectionHead eyebrow="Sound Familiar?" title="DOES THIS SOUND LIKE YOUR DOG?" />
          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 max-[480px]:grid-cols-1">
            {PAINS.map((pain) => (
              <div
                key={pain}
                className="flex items-center gap-2.5 bg-white border border-border rounded-lg px-4 py-4 font-body text-[15px] font-semibold text-ink/85"
              >
                <span className="text-red-500 shrink-0" aria-hidden="true">
                  &#9888;
                </span>
                {pain}
              </div>
            ))}
          </div>
          <p className="font-body text-base text-gray-muted text-center max-w-[560px] mx-auto mt-8">
            If you nodded at even one of these, the masterclass was built for you and
            your dog.
          </p>
        </div>
      </section>

      {/* ── 4. Why current training fails ── */}
      <section className="py-14 max-md:py-10 bg-ink">
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center max-w-[720px] mx-auto mb-10">
            <h2 className="font-display text-[clamp(30px,4.5vw,46px)] text-white leading-[0.95] mb-5">
              YOUR DOG ISN&rsquo;T THE PROBLEM.
              <br />
              <span className="text-blue-200">YOUR DOG NEEDS A SYSTEM THEY CAN UNDERSTAND.</span>
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed">
              Your dog&rsquo;s behavior isn&rsquo;t random. It&rsquo;s the result of how they&rsquo;ve
              been taught so far. Here&rsquo;s why most of what owners try never turns into reliable,
              real-world behavior.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {FAILURES.map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="font-ui text-[12px] font-bold tracking-[1.5px] uppercase text-red-400 mb-2.5">
                  &#10007; {f.title}
                </div>
                <p className="font-body text-[14.5px] text-white/75 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-[15px] text-white/85 text-center max-w-[600px] mx-auto mt-9">
            A system gives your dog one clear language, one order of operations and one set of
            rules. That&rsquo;s what makes behavior stick. That&rsquo;s what the masterclass is about.
          </p>
        </div>
      </section>

      {/* ── 5. What you'll learn ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[720px] mx-auto px-6 max-[480px]:px-4">
          <SectionHead eyebrow="Free Masterclass" title="WHAT YOU'LL LEARN IN THE FREE MASTERCLASS" />
          <div className="flex flex-col gap-5">
            {LEARN_ITEMS.map((item, i) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="font-display text-2xl text-blue-500 shrink-0 w-10">
                  0{i + 1}
                </div>
                <div>
                  <h4 className="font-body text-base font-bold text-ink mb-1">{item.title}</h4>
                  <p className="font-body text-[14px] text-gray-muted leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-9">
            <RegisterCta label={ctaLabel} />
          </div>
        </div>
      </section>

      {/* ── 6. Roadmap bonus ── */}
      <RoadmapBonus ctaHref="#register" />

      {/* ── 7. Testimonials / results ── */}
      <RealResults cta={<RegisterCta label={ctaLabel} />} />

      {/* ── 8. Jas / authority ── */}
      <TrainerJas closing="In the masterclass he teaches it to you directly." />

      {/* ── 9. Session details ── */}
      <section className="py-14 max-md:py-10 bg-ink">
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-10">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-200 block mb-3">
              Live Masterclass · {dayPhrase(sessions, { plural: true, joiner: "&" })}
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[0.95] text-white max-w-[760px] mx-auto mb-6">
              ONE HOUR ON ZOOM. A COMPLETELY DIFFERENT WEEK WITH YOUR DOG.
            </h2>
            <EventDate center sessions={sessions} />
          </div>
          <div className="grid grid-cols-2 gap-5 max-w-[800px] mx-auto max-md:grid-cols-1">
            {SESSION_DETAILS.map((col) => (
              <div key={col.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h4 className="font-ui text-[12px] font-bold tracking-[1.5px] uppercase text-blue-200 mb-4">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-body text-[14.5px] text-white/85">
                      <span className="text-amber-400 font-bold shrink-0">&#10003;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="font-body text-[14px] text-white/60 text-center max-w-[560px] mx-auto mt-8 mb-8">
            Live on Zoom, from anywhere. Register and we&rsquo;ll send the link, a reminder, and the
            Roadmap straight to your inbox.
          </p>
          <div className="text-center">
            <RegisterCta label={ctaLabel} light />
          </div>
        </div>
      </section>

      {/* ── 10. Street dog mission (compressed) ── */}
      <MissionCompact />

      {/* ── 11. FAQ ── */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[680px] mx-auto px-6 max-[480px]:px-4">
          <SectionHead title="FREQUENTLY ASKED QUESTIONS" />
          <Faq sessions={sessions} lead={faqLead} />
        </div>
      </section>

      {/* ── 12. Final CTA ── */}
      <section
        className="py-16 max-md:py-10 text-center max-md:pb-24"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[680px] mx-auto px-6">
          <span className="font-ui text-[13px] font-semibold tracking-[3px] uppercase text-blue-200 block mb-4">
            Your Seat Is Waiting
          </span>
          <h2 className="font-display text-[clamp(32px,4.5vw,52px)] text-white leading-[0.95] mb-5">
            TRANSFORM YOUR DOG IN JUST 15 MINUTES A DAY
          </h2>
          <p className="font-body text-base lg:text-lg text-white/70 leading-relaxed mb-7 max-w-[560px] mx-auto">
            Join Jas live {whenPhrase} and leave knowing exactly why your dog does what it does,
            and what to work on first.
          </p>
          <div className="mb-8">
            <EventDate center sessions={sessions} />
          </div>
          <RegisterCta label={ctaLabel} light />
          <p className="font-ui text-xs tracking-[1.5px] uppercase text-white/40 mt-4">
            Free &middot; Live Online &middot; No Credit Card Required
          </p>

          <p className="font-ui text-xs text-white/35 mt-10">
            &copy; 2026 Cali K9&reg; &middot;{" "}
            <Link href="/privacy-policy" className="hover:text-white/60">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms-of-service" className="hover:text-white/60">
              Terms
            </Link>
          </p>
        </div>
      </section>

      <StickyCta label={ctaLabel} />
    </main>
  );
}
