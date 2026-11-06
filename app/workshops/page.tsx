import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MeetJas from "@/components/MeetJas";
import CtaBlock from "@/components/CtaBlock";

export const metadata: Metadata = {
  title: "Cali K9 Live Workshops",
  description:
    "Cali K9 Live: a one-day, in-person dog training workshop with Jas Leverette, touring the US in 2027. California first, then a new city every month.",
  // Test page. Keep out of search until it's approved.
  robots: { index: false, follow: false },
};

const WAITLIST_URL = "/contact-us";

const TIERS = [
  {
    name: "General Admission",
    price: "$297",
    tag: "No dog",
    desc: "Watch Jas work live, learn the Cali K9 System in person, and leave with a clear plan for your dog at home.",
    perks: ["Full-day workshop seat", "Live Q&A with Jas", "Workshop guide", "Academy access", "2 bags of Turbo Treats"],
    featured: false,
  },
  {
    name: "Elite",
    price: "$597",
    tag: "Bring your dog",
    desc: "Bring your dog and work through the drills on the floor with the Cali K9 team coaching you in real time.",
    perks: ["Everything in General Admission", "Your dog attends with you", "Hands-on coaching from the team", "Personal next-steps plan"],
    featured: true,
  },
  {
    name: "VIP",
    price: "$997",
    tag: "Only 8 per city",
    desc: "The closest you can get to Jas. Your dog works hands-on with him, in a small group capped at 8 dogs per city.",
    perks: ["Everything in Elite", "Hands-on time with Jas", "Capped at 8 dogs per city", "Priority seating"],
    featured: false,
  },
];

const STOPS = [
  { city: "Los Angeles + Bay Area", when: "Opening weekend · January 2027" },
  { city: "Miami + Atlanta", when: "2027" },
  { city: "Dallas + Houston", when: "2027" },
  { city: "New York + Washington, DC", when: "2027" },
  { city: "Chicago + Phoenix", when: "2027" },
];

const LEARN = [
  { title: "Leash Control", desc: "Walk any dog calmly past distractions, people, and other dogs." },
  { title: "Reactivity & Aggression", desc: "How Jas reads and resets a reactive dog before things escalate." },
  { title: "Obedience That Holds", desc: "Commands that work at the park, not just in the living room." },
  { title: "Calm at Home", desc: "Fix jumping, barking, door dashing, and pushy behavior for good." },
];

const FAQS = [
  {
    q: "Do I have to bring my dog?",
    a: "No. General Admission is for owners attending without a dog. Elite and VIP tickets include your dog on the training floor.",
  },
  {
    q: "When will dates and venues be announced?",
    a: "The tour opens in California in January 2027. Exact dates and venues go to the waitlist first, before tickets open to the public.",
  },
  {
    q: "Can I upgrade my training after the workshop?",
    a: "Yes. Attendees get a 48-hour upgrade credit toward Cali K9 training programs after the event.",
  },
];

export default function WorkshopsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-[128px] pb-16 max-md:pt-[100px] max-md:pb-10 text-center"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="max-w-[780px] mx-auto px-6 max-[480px]:px-4">
          <span className="inline-flex items-center gap-2 bg-amber-400 text-[#2b1d05] font-ui text-[12px] font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-5">
            ★ The 2027 US Tour
          </span>
          <h1 className="font-display text-[clamp(40px,6vw,68px)] text-white leading-[0.95] mb-5">
            CALI K9 LIVE: TRAIN WITH JAS IN PERSON.
          </h1>
          <p className="font-body text-base text-white/70 leading-relaxed max-w-[620px] mx-auto mb-8">
            One full day with Jas Leverette and the Cali K9 team. Watch real dogs transform live,
            learn the exact system from Netflix&rsquo;s Canine Intervention, and bring your own dog
            for hands-on coaching.
          </p>
          <div className="flex gap-4 justify-center flex-wrap max-[480px]:flex-col max-[480px]:items-stretch">
            <Link href={WAITLIST_URL} className="btn btn-gold btn-lg">
              Join The Waitlist &rarr;
            </Link>
            <a href="#tickets" className="btn btn-outline-white btn-lg">
              See Tickets
            </a>
          </div>
          <p className="font-ui text-xs tracking-[1.5px] uppercase text-white/40 mt-5">
            Opening weekend: Los Angeles + Bay Area &middot; January 2027
          </p>
          <div className="max-w-[680px] mx-auto mt-10">
            <Image
              src="/images/jas-coaching.jpeg"
              alt="Jas Leverette coaching a dog owner"
              width={1280}
              height={720}
              className="w-full h-auto rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              priority
            />
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[1000px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              What You&rsquo;ll Learn
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink">
              A FULL DAY OF THE CALI K9 SYSTEM, LIVE
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-[480px]:grid-cols-1">
            {LEARN.map((item) => (
              <div key={item.title} className="bg-white border border-border rounded-xl p-6">
                <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mb-3">
                  &#10003;
                </span>
                <h5 className="font-body text-[15.5px] font-bold text-ink mb-1.5">{item.title}</h5>
                <p className="font-body text-[13.5px] text-gray-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section className="py-14 max-md:py-10 bg-cream" id="tickets">
        <div className="max-w-[1100px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-500 block mb-3">
              Tickets
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink">
              PICK HOW CLOSE YOU WANT TO GET
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1 items-stretch">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-[18px] overflow-hidden bg-white shadow-md ${
                  t.featured ? "border-2 border-amber-400" : "border border-border"
                }`}
              >
                <div className="bg-ink text-center px-6 pt-6 pb-5">
                  <div className="inline-block bg-amber-400 text-[#2b1d05] font-ui text-[11px] font-bold tracking-[1.2px] uppercase px-3.5 py-1.5 rounded-full mb-3">
                    {t.tag}
                  </div>
                  <div className="font-ui text-sm font-bold tracking-[1.5px] uppercase text-white/70 mb-1">
                    {t.name}
                  </div>
                  <div className="font-display text-[44px] text-white leading-none">{t.price}</div>
                </div>
                <div className="px-6 py-6 flex flex-col flex-1">
                  <p className="font-body text-[14px] text-gray-muted leading-relaxed mb-4">{t.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {t.perks.map((p) => (
                      <li key={p} className="font-body text-[14px] text-ink/80 pl-6 relative">
                        <span className="absolute left-0 text-blue-500 font-bold">&#10003;</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={WAITLIST_URL}
                    className={`btn ${t.featured ? "btn-gold" : "btn-blue"} w-full text-center mt-auto`}
                  >
                    Join The Waitlist
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-[13px] text-gray-muted text-center mt-6">
            Every ticket includes the workshop guide, Cali K9 Academy access, and 2 bags of Turbo Treats.
          </p>
        </div>
      </section>

      {/* Tour stops */}
      <section className="py-14 max-md:py-10 bg-ink">
        <div className="max-w-[760px] mx-auto px-6 max-[480px]:px-4">
          <div className="text-center mb-9">
            <span className="font-ui text-[14px] font-semibold tracking-[4px] uppercase text-blue-200 block mb-3">
              Tour Stops
            </span>
            <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-white">
              COMING TO A CITY NEAR YOU
            </h2>
            <p className="font-body text-[14px] text-white/60 mt-3">
              A new two-city weekend every month. Waitlist members hear about dates first.
            </p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {STOPS.map((s, i) => (
              <li key={s.city} className="flex items-center justify-between gap-4 py-4">
                <span className={`font-display text-xl ${i === 0 ? "text-amber-400" : "text-white"}`}>
                  {s.city}
                </span>
                <span className="font-ui text-[12px] tracking-[1.5px] uppercase text-white/50 text-right">
                  {s.when}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MeetJas />

      {/* FAQ */}
      <section className="py-14 max-md:py-10">
        <div className="max-w-[680px] mx-auto px-6 max-[480px]:px-4">
          <h2 className="font-display text-[clamp(28px,4vw,40px)] leading-[0.95] text-ink text-center mb-8">
            QUESTIONS
          </h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-border pb-5">
                <h5 className="font-body text-[16px] font-bold text-ink mb-2">{f.q}</h5>
                <p className="font-body text-[14.5px] text-gray-muted leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock
        eyebrow="Cali K9 Live"
        heading="SPOTS ARE LIMITED IN EVERY CITY"
        description="Join the waitlist to get first access to dates, venues, and tickets before they open to the public."
        primaryCta={{ label: "Join The Waitlist", href: WAITLIST_URL }}
      />
    </main>
  );
}
