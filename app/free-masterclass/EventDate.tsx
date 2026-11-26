"use client";

import { useEffect, useState } from "react";
import { countdownParts } from "./countdown";
import {
  CLASSIC_SESSIONS,
  dayPhrase,
  nextOccurrence,
  sessionsFor,
  timesAWeek,
  type SessionId,
} from "@/lib/masterclass-sessions";

// The live masterclass date block. The schedule itself lives in
// lib/masterclass-sessions.ts. Pages that register through the GHL form
// (masterclass, invite, results, call thank-you) show CLASSIC_SESSIONS;
// /free-masterclass-live passes every session.
export default function EventDate({
  center = false,
  sessions = CLASSIC_SESSIONS,
  showCountdown = false,
  showDuration = false,
}: {
  center?: boolean;
  sessions?: readonly SessionId[];
  showCountdown?: boolean;
  showDuration?: boolean;
}) {
  const list = sessionsFor(sessions);
  // Keep the server and first client render identical. The browser supplies
  // both its clock and timezone after hydration.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const initial = window.setTimeout(update, 0);
    const timer = window.setInterval(update, showCountdown ? 1000 : 60_000);
    // Browser timers can pause in a background tab. Refresh when it returns.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") update();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [showCountdown]);

  const rows = now === null
    ? list.map((s) => ({ id: s.id, date: s.day, label: s.label, local: "", iso: "", at: 0 }))
    : list.map((s) => {
        const occ = nextOccurrence(s, new Date(now));
        let local = "";
        try {
          // A Wednesday evening in Pacific time may already be Thursday for
          // the visitor. Always include their local calendar date.
          local = occ.instant.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          });
        } catch { /* Keep the published Pacific / Eastern schedule visible. */ }
        return {
          id: s.id,
          date: occ.dateLabel,
          label: s.label,
          local,
          iso: occ.instant.toISOString(),
          at: occ.instant.getTime(),
        };
      }).sort((a, b) => a.at - b.at);

  const remaining = now !== null && rows.length ? countdownParts(rows[0].at, now) : null;

  return (
    <div className={`flex flex-col gap-2.5 ${center ? "items-center text-center" : "items-center lg:items-start"}`}>
      <span className="bg-amber-400 text-[#2b1d05] font-ui text-[11px] font-bold tracking-[1.2px] uppercase px-3.5 py-1.5 rounded-full text-center">
        Live on Zoom &middot; {list.length === 1 ? `Every ${list[0].day}` : timesAWeek(list.length)}
      </span>
      {rows.map((r) => (
        <div key={r.id} className="font-body text-[15px] text-white/85 leading-snug">
          <time dateTime={r.iso || undefined}><b>{r.date}</b> &middot; {r.label}</time>
          {r.local && <span className="block font-body text-[12px] text-white/65 mt-1">Your local time: {r.local}</span>}
        </div>
      ))}
      {showDuration && <p className="font-body text-[13px] text-white/75">60 minutes &middot; Join from anywhere</p>}
      {showCountdown && rows.length > 0 && (
        <div className="w-full max-w-[300px] mt-1">
          <p className="font-ui text-[10px] font-bold tracking-[1.2px] uppercase text-white/70 mb-2">
            Next live class starts in
          </p>
          <div role="timer" aria-label="Time until the next live masterclass" aria-live="off" className="grid grid-cols-4 gap-2">
            {(remaining ?? ["Days", "Hours", "Mins", "Secs"].map((label) => ({ label, value: null }))).map((part) => (
              <div key={part.label} className="rounded-lg border border-white/15 bg-white/[0.06] px-2 py-2 text-center">
                <span className="block font-ui text-[23px] font-bold tabular-nums leading-none text-white">
                  {part.value === null ? "--" : String(part.value).padStart(2, "0")}
                </span>
                <span className="block font-ui text-[9px] font-semibold tracking-[1px] uppercase text-white/65 mt-1.5">{part.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {list.length > 1 && (
        <p className="font-ui text-[11px] tracking-[1px] uppercase text-white/45 mt-1">
          Pick {dayPhrase(sessions)} when you register
        </p>
      )}
    </div>
  );
}
