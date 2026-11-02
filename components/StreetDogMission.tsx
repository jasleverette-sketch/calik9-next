import Image from "next/image";

// The Cali K9 street dog rescue mission in Morocco.
export default function StreetDogMission() {
  return (
    <section className="py-20 max-md:py-12 max-[480px]:py-8 bg-white">
      <div className="max-w-[1140px] mx-auto px-10 max-md:px-6 max-[480px]:px-4">
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-14 items-center max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <Image
            src="https://assets.cdn.filesafe.space/9RVPGbjB6dCgPVsRbKEE/media/6aa43e77cbbb2538118d3b55.webp"
            alt="A street dog resting on a curb in Morocco"
            width={1172}
            height={774}
            className="w-full h-auto rounded-xl object-cover"
          />
          <div className="max-[900px]:text-center">
            <span className="inline-block bg-amber-400 text-[#2b1d05] font-ui text-[11px] font-bold tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full mb-4">
              &#10022; The Cali K9 Mission
            </span>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] leading-[0.93] text-ink mb-4">
              TRAIN YOUR DOG. HELP SAVE ANOTHER.
            </h2>
            <p className="font-body text-[16px] text-gray-muted leading-[1.8] mb-3">
              A portion of every Cali K9 program funds the rescue, veterinary care, rehabilitation
              and rehoming of street dogs, beginning in Morocco. Your dog gets trained. Another dog
              gets a second chance.
            </p>
            <p className="font-body text-[16px] text-gray-muted leading-[1.8]">
              Follow the journey on{" "}
              <a href="https://www.youtube.com/channel/UCGtJ7tl98bL-dl7lyanHmMg" target="_blank" rel="noopener" className="text-blue-500 font-semibold hover:underline">
                YouTube
              </a>{" "}
              and{" "}
              <a href="https://www.instagram.com/calik9/" target="_blank" rel="noopener" className="text-blue-500 font-semibold hover:underline">
                Instagram
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
