"use client";

import { useBlackFridayLive } from "@/lib/black-friday";

// Black Friday code tag for the services cards. Renders nothing outside the
// sale window (see lib/black-friday.ts).
export default function SaleCodeTag({ code, offer }: { code: string; offer: string }) {
  const live = useBlackFridayLive();
  if (!live) return null;
  return (
    <span className="absolute top-3 left-3 z-[2] inline-flex items-center gap-2 bg-black/85 border border-amber-400 rounded-full pl-3.5 pr-1.5 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.35)] font-ui font-bold uppercase leading-none">
      <span className="text-amber-400 text-[12px] tracking-[1.5px]">Black Friday &middot; {offer}</span>
      <span className="bg-amber-400 text-black text-[12px] tracking-[2px] px-2 py-1 rounded-full">{code}</span>
    </span>
  );
}
