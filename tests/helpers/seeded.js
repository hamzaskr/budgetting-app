export function seededRandom(seed = 20261101) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

export function fixedClock(value = '2026-11-01T12:00:00+05:00') {
  const now = new Date(value);
  return { now: () => new Date(now), iso: () => now.toISOString() };
}
