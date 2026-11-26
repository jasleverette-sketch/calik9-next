import type React from "react";
import Image from "next/image";
import { posterFor } from "@/lib/video-poster";

// Proof sections first built for /free-masterclass and shared with other
// landing pages (/self-paced-dog-training): press logos, before/after clips,
// testimonials, Jas's bio with the celebrity strip, and the rescue mission.
// Each takes an optional `cta` so the page can point the button at its own form.

const CDN = "https://assets.cdn.filesafe.space/9RVPGbjB6dCgPVsRbKEE/media";

// Three short before → after clips. Slots 1–2 are also used on /elite and /vip.
const BEFORE_AFTER = [
  {
    before: "Reactive",
    after: "Calm",
    name: "Max the Boxer",
    src: `${CDN}/6a9703d4d47ab15319050db5.mp4`,
  },
  {
    before: "Pulling",
    after: "Loose Leash",
    name: "Leash Transformation",
    src: `${CDN}/6a97042bef6af944f0f9a708.mp4`,
  },
  {
    before: "Aggressive",
    after: "Calm & Under Control",
    name: "Aggression Transformation",
    src: `${CDN}/6ab1b3dc966c1acf6d4aa920.mp4`,
  },
];

// Owner testimonial videos, hosted on the GHL media CDN.
const TESTIMONIAL_VIDEOS = [
  { name: "Manuel & Riyo", src: `${CDN}/6a96e0b528f06327141e25a1.mp4` },
  { name: "Michelle & Yolo", src: `${CDN}/6a96e0d728f06327141e28b7.mp4` },
];

// Before → after written testimonials (strongest four from the Academy page).
const RESULTS = [
  {
    before: "Lunging at every dog on the street",
    quote: "“Before Cali K9, Zeus was lunging at every dog on the street. Now he walks by my side like a completely different dog.”",
    name: "Marcus T.",
    meta: "Zeus · German Shepherd",
  },
  {
    before: "Reactive, and three trainers couldn't fix it",
    quote: "“I tried three trainers before Jas. The online course alone solved problems others couldn't fix in person. The system just makes sense.”",
    name: "Priya K.",
    meta: "Mochi · Shiba Inu",
  },
  {
    before: "A fearful rescue we almost returned",
    quote: "“We were considering rehoming our rescue. She came back calm, focused, and loving. I'm emotional typing this.”",
    name: "Jennifer L.",
    meta: "Luna · Pit Bull Rescue",
  },
  {
    before: "No recall, afraid to go off-leash",
    quote: "“Nothing comes close to the depth of Jas's system. My dog is off-leash reliable at 8 months old.”",
    name: "Amanda K.",
    meta: "Miami, FL",
  },
];

const REVIEW_SCREENSHOTS = [
  { src: "/images/funnel/review-antonio-choice.png", width: 1246, height: 576, alt: "Five-star Google review from Antonio Choice: walks calmly without pulling or reacting after a year with Cali K9" },
  { src: "/images/funnel/review-robert-walker.png", width: 1234, height: 532, alt: "Five-star Google review from Robert Walker: the most educational session, signing up again as a returning client" },
];

const JAS_STATS = [
  { big: "Netflix", small: "Host of Canine Intervention" },
  { big: "15+ Yrs", small: "Professional Experience" },
  { big: "10,000+", small: "Dogs Trained" },
  { big: "Since 2012", small: "Voted Best Dog Trainer" },
];

const PRESS_LOGOS = [
  { src: "/images/media-logos/lg/netflix.webp", alt: "Netflix", w: 1191, h: 320 },
  { src: "/images/media-logos/lg/access-hollywood.webp", alt: "Access Hollywood", w: 1398, h: 320 },
  { src: "/images/media-logos/lg/ellen-show.webp", alt: "The Ellen Show", w: 840, h: 320 },
  { src: "/images/media-logos/lg/dr-phil.webp", alt: "Dr. Phil", w: 1225, h: 320 },
];

// Circle crops of Jas with each client, hosted on the GHL media CDN (1200×1200, transparent outside the circle).
const RECOGNIZABLE_NAMES = [
  { name: "Demi Moore", image: `${CDN}/6aa4587785678ef96c59f5f5.png` },
  { name: "Steph Curry", image: `${CDN}/6aa45888cbbb253811900262.png` },
  { name: "Kevin Hart", image: `${CDN}/6aa45898f4e2fd8aa0feb41a.png` },
  { name: "Kendrick Lamar", image: `${CDN}/6aa458abcbbb2538119005d2.png` },
];

export function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-9">
      {eyebrow && (
        <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[0.95] text-ink max-w-[760px] mx-auto">
        {title}
      </h2>
      {sub && (
        <p className="font-body text-base text-gray-muted max-w-[560px] mx-auto mt-4">{sub}</p>
      )}
    </div>
  );
}

/** "As Seen On" logo strip. */
export function PressLogos() {
  return (
    <section className="bg-white py-8 border-b border-border">
      <div className="max-w-[760px] mx-auto px-6 max-[480px]:px-4 text-center">
        <div className="font-ui text-[12px] font-semibold tracking-[2px] uppercase text-gray-muted mb-6">
          As Seen On
        </div>
        <div className="flex items-center justify-between max-md:justify-center max-md:gap-x-8 gap-y-5 flex-wrap">
          {PRESS_LOGOS.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              sizes="(max-width: 768px) 130px, 170px"
              className="h-auto w-auto max-h-11 max-w-[170px] max-md:max-h-8 max-md:max-w-[130px] object-contain opacity-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Three proof clips, including an owner testimonial in the focused variant. */
export function BeforeAfterVideos({
  cta,
  className = "",
  focused = false,
}: {
  cta?: React.ReactNode;
  className?: string;
  focused?: boolean;
}) {
  const clips: Array<(typeof BEFORE_AFTER)[number] | (typeof TESTIMONIAL_VIDEOS)[number]> = focused
    ? [BEFORE_AFTER[0], BEFORE_AFTER[1], TESTIMONIAL_VIDEOS[0]]
    : BEFORE_AFTER;

  return (
    <section className={`py-14 max-md:py-10${className ? ` ${className}` : ""}`}>
      <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
        <SectionHead
          eyebrow={focused ? "Real Dogs. Real Owners." : "Real Transformations"}
          title={focused ? "SEE THE CALI K9 SYSTEM IN ACTION" : "SEE WHAT'S POSSIBLE WITH THE RIGHT SYSTEM"}
          sub={focused ? "Watch the training in practice and hear from owners who have worked with Cali K9." : "Same dogs. Same owners. The only thing that changed was the system."}
        />
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {clips.map((clip) => (
            <div key={clip.src} className="bg-white border border-border rounded-xl p-3 shadow-sm">
              <video
                poster={posterFor(clip.src)}
                className={`w-full aspect-[4/3] rounded-lg bg-black ${"before" in clip ? "object-cover" : "object-contain"}`}
                controls
                playsInline
                preload={focused ? "none" : "metadata"}
              >
                <source src={clip.src} type="video/mp4" />
              </video>
              {"before" in clip ? (
                <div className="flex items-center justify-center gap-2 mt-3 font-ui text-[12px] font-bold tracking-[1px] uppercase">
                  <span className="text-red-500">{clip.before}</span>
                  <span className="text-gray-muted" aria-hidden="true">&rarr;</span>
                  <span className="text-blue-500">{clip.after}</span>
                </div>
              ) : (
                <div className="text-center mt-3 font-ui text-[12px] font-bold tracking-[1px] uppercase text-blue-500">
                  Hear From A Cali K9 Owner
                </div>
              )}
              <div className="font-body text-[13px] text-gray-muted text-center mt-1">{clip.name}</div>
            </div>
          ))}
        </div>
        {cta && <div className="text-center mt-9">{cta}</div>}
      </div>
    </section>
  );
}

/** "Real dogs. Real owners. Real transformations.": owner videos, Google reviews, written results. */
export function RealResults({
  cta,
  compact = false,
  showVideos = true,
}: {
  cta?: React.ReactNode;
  compact?: boolean;
  showVideos?: boolean;
}) {
  return (
    <section className="py-14 max-md:py-10">
      <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
        <SectionHead eyebrow="Real Results" title={compact ? "WHAT CALI K9 OWNERS SAY" : "REAL DOGS. REAL OWNERS. REAL TRANSFORMATIONS."} />
        {showVideos && <div className="grid grid-cols-2 gap-5 max-w-[760px] mx-auto max-md:grid-cols-1">
          {TESTIMONIAL_VIDEOS.map((v) => (
            <div key={v.name}>
              <video
                poster={posterFor(v.src)}
                className={`w-full rounded-xl bg-black shadow-md${compact ? " aspect-video object-cover" : ""}`}
                controls
                playsInline
                preload={compact ? "none" : "metadata"}
              >
                <source src={v.src} type="video/mp4" />
              </video>
              <div className="font-ui text-sm font-bold tracking-[1px] uppercase text-ink mt-3 text-center">
                {v.name}
              </div>
            </div>
          ))}
        </div>}

        <div className={`grid grid-cols-2 gap-5 max-w-[760px] mx-auto max-md:grid-cols-1${showVideos ? " mt-6" : ""}`}>
          {REVIEW_SCREENSHOTS.map((shot) => (
            <div
              key={shot.src}
              className="bg-white border border-border rounded-xl p-3 shadow-sm flex items-center"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="w-full h-auto rounded-md"
              />
            </div>
          ))}
        </div>

        {!compact && (
          <div className="grid grid-cols-2 gap-5 mt-6 max-md:grid-cols-1">
            {RESULTS.map((r) => (
              <div key={r.name} className="bg-cream border border-border rounded-xl p-6">
                <div className="font-ui text-[11px] font-bold tracking-[1.5px] uppercase text-red-500 mb-3">
                  Before: {r.before}
                </div>
                <p className="font-body text-[15px] text-ink leading-relaxed mb-4">{r.quote}</p>
                <div className="font-ui text-[13px] font-bold tracking-[0.5px] uppercase text-ink">
                  {r.name}
                  <span className="font-body font-normal normal-case tracking-normal text-gray-muted"> &middot; {r.meta}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {cta && <div className="text-center mt-9">{cta}</div>}
      </div>
    </section>
  );
}

/**
 * Jas's bio, stats and quote, with the "Trusted to train dogs for some of the
 * world's most recognizable names" strip underneath. `closing` is the last
 * sentence of the bio, which says how he teaches on this page's offer.
 */
export function TrainerJas({
  eyebrow = "Your Trainer This Week",
  closing,
  compact = false,
}: {
  eyebrow?: string;
  closing: string;
  compact?: boolean;
}) {
  return (
    <section className="py-14 max-md:py-10 bg-cream">
      <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
        <div className="grid grid-cols-[0.85fr_1.15fr] gap-10 items-center max-md:grid-cols-1">
          <Image
            src="/images/funnel/jas-class.jpg"
            alt="Jas Leverette teaching a training class"
            width={480}
            height={270}
            className="w-full h-auto rounded-xl object-cover"
          />
          <div>
            <span className="font-ui text-[13px] font-semibold tracking-[3px] uppercase text-blue-500 block mb-2">
              {eyebrow}
            </span>
            <h2 className="font-display text-[clamp(32px,4.5vw,48px)] text-ink leading-[0.95] mb-4">
              JAS LEVERETTE
            </h2>
            {compact ? (
              <>
                <p className="font-body text-[15px] text-[#4b4f58] leading-relaxed mb-3">
                  Jas Leverette is the founder of Cali K9&reg; and the host of Netflix&rsquo;s{" "}
                  <em>Canine Intervention</em>. His work centers on helping owners understand
                  their dogs and follow a clear training system.
                </p>
                <p className="font-body text-[15px] text-[#4b4f58] leading-relaxed mb-5">{closing}</p>
                <div className="flex flex-wrap gap-2 font-ui text-[11px] font-semibold tracking-[1px] uppercase text-blue-500">
                  <span className="bg-white border border-border rounded-lg px-3 py-2">Founder of Cali K9&reg;</span>
                  <span className="bg-white border border-border rounded-lg px-3 py-2">Host of Canine Intervention</span>
                </div>
              </>
            ) : (
              <>
                <p className="font-body text-[15px] text-[#4b4f58] leading-relaxed mb-3">
                  Jas is the founder of Cali K9 and the host and executive producer of Netflix&rsquo;s{" "}
                  <em>Canine Intervention</em>, where millions watched him take on the dogs other
                  trainers had given up on.
                </p>
                <p className="font-body text-[15px] text-[#4b4f58] leading-relaxed mb-5">
                  The same system has transformed family pets, serious behavioral cases and the dogs
                  of some of the world&rsquo;s most recognizable athletes and entertainers. {closing}
                </p>
                <div className="grid grid-cols-4 gap-3 max-[560px]:grid-cols-2 mb-6">
                  {JAS_STATS.map((s) => (
                    <div key={s.big} className="bg-white border border-border rounded-lg px-3 py-3 text-center">
                      <div className="font-display text-[20px] text-blue-500 leading-none">{s.big}</div>
                      <div className="font-ui text-[10px] font-semibold tracking-[0.5px] uppercase text-gray-muted mt-1.5 leading-tight">
                        {s.small}
                      </div>
                    </div>
                  ))}
                </div>
                <blockquote className="border-l-[3px] border-blue-500 pl-4.5 font-ui text-base italic text-ink">
                  &ldquo;If you treat a dog like a human, it will treat you like a dog.&rdquo;
                  <span className="block mt-1.5 font-ui text-[11.5px] not-italic tracking-[0.5px] uppercase text-gray-muted">
                    &mdash; Jas Leverette
                  </span>
                </blockquote>
              </>
            )}
          </div>
        </div>

        {!compact && (
          <div className="mt-12 pt-10 border-t border-black/[0.08]">
            <div className="font-ui text-[12px] font-semibold tracking-[2px] uppercase text-gray-muted text-center mb-6">
              Trusted To Train Dogs For Some Of The World&rsquo;s Most Recognizable Names
            </div>
            <div className="flex items-center justify-center gap-8 max-md:gap-5 flex-wrap">
              {RECOGNIZABLE_NAMES.map((celeb) => (
                <div key={celeb.name} className="text-center w-[120px] max-md:w-[96px]">
                  <Image
                    src={celeb.image}
                    alt={`Jas Leverette with ${celeb.name}`}
                    width={240}
                    height={240}
                    className="w-full h-auto rounded-full"
                  />
                  <span className="block font-ui text-[11px] font-bold tracking-[1px] uppercase text-ink mt-2.5">
                    {celeb.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** "Train your dog. Help save another.": the street dog rescue mission, short version. */
export function MissionCompact({
  className = "bg-cream",
  focused = false,
}: {
  className?: string;
  focused?: boolean;
}) {
  return (
    <section className={`py-14 max-md:py-10 ${className}`}>
      <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-10 items-center max-md:grid-cols-1">
          <Image
            src={`${CDN}/6aa43e77cbbb2538118d3b55.webp`}
            alt="A street dog resting on a curb in Morocco"
            width={1172}
            height={774}
            className="w-full h-auto rounded-xl object-cover"
          />
          <div className="max-md:text-center">
            <span className="inline-block bg-amber-400 text-[#2b1d05] font-ui text-[11px] font-bold tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full mb-4">
              &#10022; The Cali K9 Mission
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,42px)] leading-[0.95] text-ink mb-4">
              {focused ? "HELPING DOGS GET A SECOND CHANCE" : "TRAIN YOUR DOG. HELP SAVE ANOTHER."}
            </h2>
            {focused ? (
              <p className="font-body text-[15px] text-[#4b4f58] leading-relaxed">
                Cali K9&rsquo;s mission extends to helping street dogs through rescue, care,
                rehabilitation, and responsible rehoming, beginning in Morocco.
              </p>
            ) : (
              <>
                <p className="font-body text-[15px] text-[#4b4f58] leading-relaxed mb-3">
                  A portion of every Cali K9 program funds the rescue, veterinary care, rehabilitation
                  and rehoming of street dogs, beginning in Morocco.
                </p>
                <p className="font-body text-[15px] text-[#4b4f58] leading-relaxed">
                  Every dog we train helps another dog get a second chance. Follow the journey on{" "}
                  <a href="https://www.youtube.com/channel/UCGtJ7tl98bL-dl7lyanHmMg" target="_blank" rel="noopener" className="text-blue-500 font-semibold hover:underline">
                    YouTube
                  </a>{" "}
                  and{" "}
                  <a href="https://www.instagram.com/calik9/" target="_blank" rel="noopener" className="text-blue-500 font-semibold hover:underline">
                    Instagram
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
