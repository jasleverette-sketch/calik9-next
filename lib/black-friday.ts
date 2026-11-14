import { useSyncExternalStore } from "react";

// Black Friday 2026 sale window (Pacific). Everything tied to the sale (the
// top banner, the code tags on the services cards) turns itself on and off at
// these times in the visitor's browser, so no deploy is needed at launch/end.
export const SALE_START = Date.parse("2026-11-16T00:30:00-08:00");
export const SALE_END = Date.parse("2026-11-30T23:59:00-08:00");

// Re-check every 30 seconds so an open page picks up the start/end time.
function subscribeClock(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}
function saleIsLive() {
  const now = Date.now();
  return now >= SALE_START && now < SALE_END;
}

/** True only in the browser, during the sale window. Client components only. */
export function useBlackFridayLive(): boolean {
  return useSyncExternalStore(subscribeClock, saleIsLive, () => false);
}
