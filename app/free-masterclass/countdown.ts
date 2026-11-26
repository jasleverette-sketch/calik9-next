// Display only the real time remaining until a scheduled class starts.
export function countdownParts(target: number, now: number) {
  const totalSeconds = Math.max(0, Math.ceil((target - now) / 1000));
  return [
    { label: "Days", value: Math.floor(totalSeconds / 86400) },
    { label: "Hours", value: Math.floor((totalSeconds % 86400) / 3600) },
    { label: "Mins", value: Math.floor((totalSeconds % 3600) / 60) },
    { label: "Secs", value: totalSeconds % 60 },
  ];
}
