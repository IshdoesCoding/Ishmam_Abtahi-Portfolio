import { useMemo } from 'react';

// Small seeded random so the sparkles are the same on every render
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Fixed layer of gold dots that drift upward and twinkle across the whole site.
 * pointer-events: none, so it never blocks clicks.
 */
export default function Sparkles({ count = 60 }) {
  const dots = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: count }, (_, i) => {
      const star = i % 5 === 0; // every 5th is a 4-point star
      const size = star ? 6 + r() * 4 : 2 + r() * 2.5;
      const rise = 18 + r() * 22; // seconds to cross the screen
      return {
        id: i,
        left: r() * 100,
        size,
        rise,
        riseDelay: -r() * rise, // negative delay: already mid-flight on load
        drift: (r() - 0.5) * 80,
        twinkle: 1.6 + r() * 2.6,
        twinkleDelay: -r() * 4,
        star,
        mobileHidden: i % 2 === 1,
      };
    });
  }, [count]);

  return (
    <div aria-hidden="true" className="sparkles pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {dots.map(d => (
        <span
          key={d.id}
          className={`sparkle-rise absolute bottom-0 ${d.mobileHidden ? 'hidden sm:block' : ''}`}
          style={{
            left: `${d.left}%`,
            '--drift': `${d.drift}px`,
            animationDuration: `${d.rise}s`,
            animationDelay: `${d.riseDelay}s`,
          }}
        >
          <span
            className={`block ${d.star ? 'sparkle-star' : 'sparkle-dot rounded-full'}`}
            style={{
              width: d.size,
              height: d.size,
              animationDuration: `${d.twinkle}s`,
              animationDelay: `${d.twinkleDelay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
