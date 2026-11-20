import type { Metadata } from "next";

// Where the "$27 or $97 Online Training" GHL form (lib/online-training-offer.ts)
// sends buyers after payment. Shared by /self-paced-dog-training and
// /online-dog-training, so the copy does not name either plan.
export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for joining Cali K9 online training. Your access is on its way by email.",
  robots: { index: false, follow: false },
};

const SUPPORT_EMAIL = "training@calik9.com";

export default function OnlineTrainingThankYouPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden min-h-[100svh] flex items-center pt-[120px] pb-16 max-md:pt-[104px] max-md:pb-12"
        style={{ background: "linear-gradient(135deg, #0A1F3C 0%, #122E85 55%, #1A3FAB 100%)" }}
      >
        <div className="w-full max-w-[720px] mx-auto px-10 max-md:px-6 max-[480px]:px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-400 font-ui text-[12px] font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-6">
            &#10003; You&rsquo;re In
          </span>
          <h1 className="font-display text-[clamp(44px,6vw,72px)] text-white leading-[0.95] mb-5">
            THANK YOU!
          </h1>
          <p className="font-body text-lg max-md:text-[17px] text-white/80 leading-relaxed max-w-[540px] mx-auto">
            You should be receiving access to your online training by email. If you don&rsquo;t see
            it in a few minutes, check your spam and promotions folders.
          </p>

          <div className="bg-white/[0.07] border border-white/[0.15] rounded-xl px-6 py-6 mt-9 max-w-[540px] mx-auto">
            <p className="font-body text-base text-white/75 leading-relaxed mb-2">
              Having any issues? Please reach out to us at
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-ui text-[20px] max-[480px]:text-[18px] font-bold tracking-[0.5px] text-amber-300 hover:underline break-all"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
