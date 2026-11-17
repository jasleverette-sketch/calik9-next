import type { Metadata } from "next";
import Link from "next/link";
import StarsRow from "@/components/StarsRow";
import PackageHeading from "@/components/PackageHeading";
import PackageList from "@/components/PackageList";
import FormEmbed from "@/components/FormEmbed";
import JumpButtons from "./JumpButtons";

export const metadata: Metadata = {
  title: "Payment Plans",
  description:
    "Payment plans for Cali K9® in-person and online dog training: 12 Session, Elite, and VIP in-person packages, plus Academy Elite and All Access.",
  robots: { index: false, follow: false },
};

type Plan = {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  items: (string | { text: string; bold?: boolean })[];
  price: string;
  detailsHref: string;
  // GHL payment-plan form. null shows a placeholder until the ID is pasted in.
  formId: string | null;
  formHeight?: number;
};

const IN_PERSON: Plan[] = [
  {
    id: "12-session",
    name: "In-Person Dog Training (12 Sessions)",
    tagline: "For dogs with no aggression or anxiety issues",
    description:
      "Hands-on training with a Certified Cali K9 Trainer at one of our facilities. Your trainer works directly with you and your dog, building obedience, socialization, and real-world skills.",
    items: [
      { text: "2 Private Training Sessions", bold: true },
      "2 Semi-Private Sessions",
      "4 Group Classes",
      "4 Group Zoom Classes",
      "Obedience",
      "Socialization",
      "Urban Agility",
      "Problem Solving Techniques",
    ],
    price: "$1,497",
    detailsHref: "/in-person",
    formId: "S4ijTmB5JBb6OodOTepG", // In-Person Dog Training (12 Sessions) - Payment Plans
    formHeight: 1065,
  },
  {
    id: "elite-in-person",
    name: "Elite In-Person Dog Training (24 Sessions)",
    description:
      "Twice the training of the 12 Session package, plus behavior modification and the Dog Training Starter Kit. Built for dogs that need more time and more structure to reach their goals.",
    items: [
      { text: "2 Private Training Sessions", bold: true },
      { text: "Dog Training Starter Kit", bold: true },
      "6 Semi-Private Sessions",
      "8 Group Classes",
      "8 Group Zoom Classes",
      "Obedience",
      "Socialization",
      "Behavior Modification",
      "Problem Solving Techniques",
    ],
    price: "$2,997",
    detailsHref: "/in-person",
    formId: "OpKkrXF9PeXqPpULvckb", // Elite Dog Training (24 Sessions) - Payment Plans
    formHeight: 1065,
  },
  {
    id: "vip-in-person",
    name: "VIP In-Person Dog Training",
    description:
      "One-on-one, fully personalized training tailored to your dog’s needs, lifestyle, and goals: reliable off-leash obedience, service-dog task training, and specialized behaviors, with flexible scheduling and premium support.",
    items: [
      { text: "10 VIP Sessions", bold: true },
      { text: "Dog Training Starter Kit", bold: true },
      "1 Year of Group Classes",
      "1 Year of Group Zoom Classes",
      "Obedience",
      "Socialization",
      "Agility",
      "Behavior Modification",
      "Problem Solving Techniques",
    ],
    price: "$5,997",
    detailsHref: "/in-person",
    formId: null,
  },
];

const ONLINE: Plan[] = [
  {
    id: "academy-elite",
    name: "Academy Elite",
    tagline: "The complete system plus small-group coaching with Jas",
    description:
      "The full Cali K9 5 Pillar, 50-Step System™ online, with 6 months of Academy access and 4 Train With Jas coaching sessions where Jas looks at your dog, corrects your technique, and keeps you accountable.",
    items: [
      { text: "6 Months of Academy Access", bold: true },
      { text: "4 Train With Jas Coaching Sessions", bold: true },
      "Complete 50-Step Roadmap™, all 8 modules",
      "Full training video library",
      "Weekly live training with Jas",
      "Troubleshooting, video review & feedback",
      "Accountability & roadmap adjustments",
      "Certificate of Completion",
    ],
    price: "$997",
    detailsHref: "/elite",
    formId: null,
  },
  {
    id: "all-access",
    name: "Academy All Access",
    tagline: "The Academy for life, plus a full year of coaching",
    description:
      "Lifetime access to the Cali K9 Academy for every dog you’ll ever own, plus 12 months of VIP coaching with Jas and the team in your corner.",
    items: [
      { text: "Lifetime Cali K9 Academy", bold: true },
      { text: "Unlimited Train With Jas Coaching Sessions", bold: true },
      "12 months of coaching & private WhatsApp access",
      "Priority video feedback",
      "Advanced workshops",
      "Lifetime All Access community",
      "Preferred member pricing",
      "Turbo Treats bonus",
    ],
    price: "$2,997",
    detailsHref: "/all-access",
    formId: null,
  },
];

function PlanForm({ plan }: { plan: Plan }) {
  if (plan.formId) {
    return (
      <FormEmbed
        formId={plan.formId}
        formName={`${plan.name} Payment Plan`}
        title="Choose Your Payment Plan"
        height={plan.formHeight ?? 760}
      />
    );
  }
  return (
    <div className="bg-white/[0.07] border border-white/[0.15] rounded-xl p-7">
      <div className="font-ui text-base font-bold tracking-[2px] uppercase text-white/85 mb-4">
        Choose Your Payment Plan
      </div>
      <div className="h-[420px] max-md:h-[300px] rounded-sm border-2 border-dashed border-white/20 flex items-center justify-center text-center px-6 font-ui text-sm font-semibold tracking-[1px] uppercase text-white/40">
        Payment plan form
        <br />
        coming soon
      </div>
    </div>
  );
}

function PlanSection({ plan }: { plan: Plan }) {
  return (
    <section id={plan.id} className="scroll-mt-[calc(var(--banner-h,0px)+72px)] py-14 max-md:py-10 border-t border-white/[0.12]">
      <div className="grid grid-cols-[1fr_440px] gap-12 items-start max-[1000px]:grid-cols-1 max-[1000px]:gap-8">
        <div>
          <PackageHeading as="h2">{plan.name}</PackageHeading>
          {plan.tagline && (
            <p className="font-ui text-sm tracking-[1px] text-white/55 -mt-2 mb-5">({plan.tagline})</p>
          )}
          <p className="font-body text-base text-white/70 leading-relaxed mb-7">{plan.description}</p>
          <PackageList title="What's Included:" items={plan.items} />
          <div className="flex items-end gap-x-6 gap-y-2 flex-wrap">
            <div>
              <div className="font-ui text-xs font-bold tracking-[2px] uppercase text-white/45 mb-1.5">
                Program Price
              </div>
              <div className="font-display text-[clamp(42px,5vw,56px)] text-white leading-none">
                {plan.price}
              </div>
            </div>
            <div className="font-ui text-[15px] font-semibold text-green-400 pb-1.5">
              <span className="max-[1000px]:hidden">Payment plans available &rarr;</span>
              <span className="hidden max-[1000px]:inline">Payment plans available &darr;</span>
            </div>
          </div>
          <Link
            href={plan.detailsHref}
            className="inline-block mt-5 font-ui text-sm font-semibold text-blue-200 hover:text-white hover:underline"
          >
            See full program details
          </Link>
        </div>
        <div className="sticky top-[calc(var(--banner-h,0px)+84px)] max-[1000px]:static">
          <PlanForm plan={plan} />
        </div>
      </div>
    </section>
  );
}

function GroupHeader({ id, eyebrow, title, note }: { id: string; eyebrow: string; title: string; note: string }) {
  return (
    <div id={id} className="scroll-mt-[calc(var(--banner-h,0px)+72px)] pt-16 pb-10 max-md:pt-12 max-md:pb-8 text-center">
      <span className="font-ui text-[13px] font-semibold tracking-[4px] uppercase text-amber-400 block mb-3">
        {eyebrow}
      </span>
      <h2 className="font-display text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[1px] uppercase text-white mb-3">
        {title}
      </h2>
      <p className="font-body text-base text-white/65 max-w-[560px] mx-auto">{note}</p>
    </div>
  );
}

export default function PaymentPlansPage() {
  return (
    <main
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 45%, #1A3FAB 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
      <div className="max-w-[1200px] mx-auto px-10 max-md:px-6 max-[480px]:px-4 relative">
        {/* ── Hero ── */}
        <div className="text-center pb-14 max-md:pb-10" style={{ paddingTop: "calc(var(--banner-h, 0px) + 104px)" }}>
          <StarsRow />
          <h1
            className="font-display text-[clamp(40px,6vw,72px)] leading-[1.02] tracking-[1px] uppercase mb-4"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #93b4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Payment Plans
          </h1>
          <p className="font-body text-[17px] max-md:text-base text-white/75 leading-relaxed max-w-[600px] mx-auto mb-8">
            Split your dog&rsquo;s training into easy payments. Pick in-person or online training, find
            your program, and choose the payment plan that works for you.
          </p>
          <JumpButtons />
        </div>

        {/* ── In-Person ── */}
        <GroupHeader
          id="in-person"
          eyebrow="In-Person Training"
          title="In-Person Payment Plans"
          note="Training with a Certified Cali K9 Trainer at our San Jose, North Hollywood, Brooklyn, and Miami facilities."
        />
        {IN_PERSON.map((plan) => (
          <PlanSection key={plan.id} plan={plan} />
        ))}

        {/* ── Online ── */}
        <GroupHeader
          id="online"
          eyebrow="Online Training"
          title="Online Payment Plans"
          note="Train from anywhere with the Cali K9 Academy and live coaching with Jas Leverette."
        />
        {ONLINE.map((plan) => (
          <PlanSection key={plan.id} plan={plan} />
        ))}

        {/* ── Help ── */}
        <div className="py-16 max-md:py-12 border-t border-white/[0.12] text-center">
          <p className="font-body text-base text-white/70 mb-5">
            Not sure which program fits your dog? Talk to a behavior specialist first.
          </p>
          <Link href="/evaluation-with-behavior-specialist" className="btn btn-white">
            Book an Evaluation &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
