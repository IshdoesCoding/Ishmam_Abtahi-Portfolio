import { useEffect, useMemo, useRef, useState } from 'react';

// ---------- Pixel sprites (original art), facing right ----------
const P = 3; // screen px per sprite pixel
const COLS = 16;
const ROWS = 14;
export const DUEL_W = COLS * P;
export const DUEL_H = ROWS * P;

const BODY = [
  '....PPP.........',
  '...PP...........',
  '...hhhhhh.......',
  '..hHHHHHHh......',
  '..hHkkkkHh......',
  '..hHHHHHHh......',
  '...hhhhhh.......',
  '..aAAAAAAa......',
  '..aAAAAAAa......',
  '..aAAAAAAa......',
  '..aaaaaaaa......',
];
const LEGS = {
  idle: ['...kk..kk.......', '...kk..kk.......', '..kkk..kkk......'],
  run1: ['...kk...kk......', '..kk.....kk.....', '.kkk.....kkk....'],
  run2: ['....kkkk........', '....kk.kk.......', '...kkk.kkk......'],
};
const SWORD = {
  guard: [[8, 10, 'g'], [7, 11, 's'], [6, 12, 's'], [5, 13, 's'], [4, 14, 's']],
  thrust: [[8, 10, 'g'], [8, 11, 's'], [8, 12, 's'], [8, 13, 's'], [8, 14, 's'], [8, 15, 's']],
  raise: [[7, 10, 'g'], [6, 10, 's'], [5, 10, 's'], [4, 10, 's'], [3, 10, 's'], [2, 10, 's'], [1, 10, 's']],
};
// frame index -> [legs, sword]
const FRAMES = [
  ['idle', 'guard'], // 0 stance
  ['run1', 'guard'], // 1 run
  ['run2', 'guard'], // 2 run
  ['idle', 'thrust'], // 3 attack
  ['idle', 'raise'], // 4 wind-up / parry
];

const COMMON = { H: '#e2e8f0', h: '#94a3b8', k: '#1e2340', s: '#f8fafc', g: '#fde68a' };
const TEAMS = {
  blue: { ...COMMON, A: '#60a5fa', a: '#1d4ed8', P: '#93c5fd' },
  red: { ...COMMON, A: '#f87171', a: '#b91c1c', P: '#fca5a5' },
};

const cache = {};
function framesFor(team) {
  if (cache[team]) return cache[team];
  const pal = TEAMS[team];
  cache[team] = FRAMES.map(([legs, sword]) => {
    const grid = [...BODY, ...LEGS[legs]].map(r => r.split(''));
    SWORD[sword].forEach(([r, c, ch]) => { grid[r][c] = ch; });
    const canvas = document.createElement('canvas');
    canvas.width = DUEL_W;
    canvas.height = DUEL_H;
    const ctx = canvas.getContext('2d');
    grid.forEach((row, r) => row.forEach((ch, c) => {
      if (ch === '.') return;
      ctx.fillStyle = pal[ch];
      ctx.fillRect(c * P, r * P, P, P);
    }));
    return canvas.toDataURL('image/png');
  });
  return cache[team];
}

// Fight loop: blue and red are offset by half a cycle so they trade blows
const FIGHT = [0, 3, 0, 4];
const RUN_MS = 1800;
const TICK_MS = 300;

/**
 * Two knights on the bottom border of a framed section.
 * bottom: distance from the section's bottom edge to the top of the frame's bottom line
 */
export default function KnightDuel() {
  const ref = useRef(null);
  const [phase, setPhase] = useState('start'); // start | run | fight
  const [tick, setTick] = useState(0);
  const blue = useMemo(() => framesFor('blue'), []);
  const red = useMemo(() => framesFor('red'), []);
  const reduced = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, []);

  // Start when the section's bottom edge comes into view, reset when it leaves
  useEffect(() => {
    if (reduced) { setPhase('fight'); return undefined; }
    const el = ref.current;
    let runTimer;
    const io = new IntersectionObserver(([entry]) => {
      clearTimeout(runTimer);
      if (entry.isIntersecting) {
        setPhase('run');
        runTimer = setTimeout(() => setPhase('fight'), RUN_MS);
      } else {
        setPhase('start');
      }
    }, { threshold: 1 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(runTimer); };
  }, [reduced]);

  // Frame ticker: fast while running, slower while fighting
  useEffect(() => {
    if (reduced || phase === 'start') return undefined;
    const id = setInterval(() => setTick(t => t + 1), phase === 'run' ? 130 : TICK_MS);
    return () => clearInterval(id);
  }, [phase, reduced]);

  let blueFrame = 0;
  let redFrame = 0;
  if (phase === 'run') {
    blueFrame = 1 + (tick % 2);
    redFrame = 1 + ((tick + 1) % 2);
  } else if (phase === 'fight' && !reduced) {
    blueFrame = FIGHT[tick % 4];
    redFrame = FIGHT[(tick + 2) % 4];
  }
  const clash = phase === 'fight' && !reduced && (blueFrame === 3 || redFrame === 3);

  const atCenter = phase !== 'start';
  const move = phase === 'run' ? `left ${RUN_MS}ms linear, right ${RUN_MS}ms linear` : 'none';
  const meet = `calc(50% - ${DUEL_W - 11}px)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-[2] bottom-[12px] md:bottom-[27px]"
      style={{ height: DUEL_H }}
    >
      <img
        src={blue[blueFrame]}
        alt=""
        draggable={false}
        className="absolute bottom-0 select-none left-[80px] md:left-[165px]"
        style={{ width: DUEL_W, height: DUEL_H, imageRendering: 'pixelated', transition: move, ...(atCenter ? { left: meet } : null) }}
      />
      <img
        src={red[redFrame]}
        alt=""
        draggable={false}
        className="absolute bottom-0 select-none right-[80px] md:right-[165px]"
        style={{ width: DUEL_W, height: DUEL_H, imageRendering: 'pixelated', transform: 'scaleX(-1)', transition: move, ...(atCenter ? { right: meet } : null) }}
      />
      {clash && (
        <span
          className="absolute w-3 h-3"
          style={{
            left: 'calc(50% - 6px)',
            bottom: 12,
            background: 'radial-gradient(circle, #ffffff 0%, #fde68a 45%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)',
            filter: 'drop-shadow(0 0 4px #fde68a)',
          }}
        />
      )}
    </div>
  );
}
