import { useEffect, useRef } from 'react';
import { FramedSection, SectionHeader } from './Ornate';
import { useGame } from '../game/GameContext';

// ---------- Pixel sprites (original art, 1 char = 1 pixel) ----------
const P = 4; // screen px per sprite pixel
const PAL = {
  r: '#fb7185', G: '#f59e0b', g: '#fde68a', k: '#1e2340', b: '#c7d2fe', B: '#818cf8',
  R: '#fb7185', d: '#9f1239', w: '#ffffff', v: '#a78bfa', V: '#6d28d9',
};

const KNIGHT_TOP = [
  '....rrr.....',
  '...rr.......',
  '...GGGGGG...',
  '..GggggggG..',
  '..GgkkkkkG..',
  '..GggggggG..',
  '...GGGGGG...',
  '..BbbbbbBGG.',
  '..BbbbbbBGgG',
  '..BbbbbbBGgG',
  '..BBBBBBBGG.',
];
const KNIGHT_LEGS = [
  ['...kk..kk...', '...kk..kk...', '..kkk..kkk..'],
  ['..kk....kk..', '..kk....kk..', '.kkk....kkk.'],
  ['...kk.kk....', '...kkkkk....', '............'], // jumping (tucked)
];

const BUG = [
  '..k....k..',
  '...k..k...',
  '..RRRRRR..',
  '.RwkRRwkR.',
  'RRRRRRRRRR',
  'RdRRddRRdR',
  '.RRRRRRRR.',
  '.k.k..k.k.',
];

const DRONE = [
  [
    'V..........V',
    'VV...vv...VV',
    'VVVvvvvvvVVV',
    '.VVvwvvwvVV.',
    '...vvvvvv...',
    '....v..v....',
  ],
  [
    '....vvvv....',
    '...vvvvvv...',
    'VVVvwvvwvVVV',
    'VV.vvvvvv.VV',
    'V...v..v...V',
    '............',
  ],
];

function drawSprite(ctx, rows, x, y) {
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === '.') continue;
      ctx.fillStyle = PAL[ch];
      ctx.fillRect(Math.round(x + c * P), Math.round(y + r * P), P, P);
    }
  }
}

const KNIGHT_W = 12 * P;
const KNIGHT_H = 14 * P;
const BUG_W = 10 * P;
const BUG_H = 8 * P;
const DRONE_W = 12 * P;
const DRONE_H = 6 * P;

// ---------- Physics ----------
const GRAVITY = 2600;
const JUMP_V = -760;
const HOLD_GRAVITY = 2100; // lighter gravity while jump is held and rising = higher jump
const START_SPEED = 380;
const MAX_SPEED = 950;
const BEST_KEY = 'ish-portfolio-arcade-best';

function loadBest() {
  try { return Number(window.localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
}
function saveBest(v) {
  try { window.localStorage.setItem(BEST_KEY, String(v)); } catch { /* storage unavailable */ }
}

function seededStars(n) {
  let s = 7;
  const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  return Array.from({ length: n }, () => ({ x: r(), y: r() * 0.7, a: 0.2 + r() * 0.5, s: r() < 0.2 ? 2 : 1 }));
}
const STARS = seededStars(40);

export default function Arcade() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const { unlock } = useGame();
  const unlockRef = useRef(unlock);
  unlockRef.current = unlock;

  const g = useRef({
    status: 'idle', // idle | running | over
    W: 800, H: 220, ground: 186,
    y: 0, vy: 0, holding: false, onGround: true,
    obstacles: [], speed: START_SPEED, score: 0, best: 0,
    t: 0, legT: 0, nextGap: 300, overAt: 0, raf: 0, last: 0,
    unlockedPlay: false, unlockedScore: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext('2d');
    const s = g.current;
    s.best = loadBest();

    const playerX = () => Math.max(28, Math.min(70, s.W * 0.08));

    const draw = () => {
      const { W, H, ground } = s;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#2b3157');
      bg.addColorStop(1, '#353d6a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      STARS.forEach(st => {
        ctx.globalAlpha = st.a;
        ctx.fillStyle = '#fde68a';
        ctx.fillRect(st.x * W, st.y * ground, st.s, st.s);
      });
      ctx.globalAlpha = 1;

      // ground
      ctx.fillStyle = 'rgba(253,230,138,0.85)';
      ctx.fillRect(0, ground, W, 2);
      ctx.fillStyle = 'rgba(253,230,138,0.35)';
      const off = (s.t * s.speed) % 46;
      for (let x = -off; x < W; x += 46) {
        ctx.fillRect(x, ground + 8, 10, 2);
        ctx.fillRect(x + 23, ground + 16, 4, 2);
      }

      // obstacles
      s.obstacles.forEach(o => {
        if (o.type === 'drone') {
          drawSprite(ctx, DRONE[Math.abs(Math.floor(s.t * 8)) % 2], o.x, o.y);
        } else {
          for (let i = 0; i < o.count; i++) drawSprite(ctx, BUG, o.x + i * (BUG_W + 2), ground - BUG_H);
        }
      });

      // knight
      const px = playerX();
      const py = ground - KNIGHT_H - s.y;
      drawSprite(ctx, KNIGHT_TOP, px, py);
      const legs = !s.onGround ? KNIGHT_LEGS[2] : s.status === 'running' ? KNIGHT_LEGS[Math.abs(Math.floor(s.legT * 10)) % 2] : KNIGHT_LEGS[0];
      drawSprite(ctx, legs, px, py + KNIGHT_TOP.length * P);

      // score
      ctx.font = '600 14px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(226,232,240,0.7)';
      const sc = String(Math.floor(s.score)).padStart(5, '0');
      const best = String(Math.floor(s.best)).padStart(5, '0');
      ctx.fillText(`HI ${best}`, W - 92, 14);
      ctx.fillStyle = '#fde68a';
      ctx.fillText(sc, W - 16, 14);

      // overlays
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (s.status === 'idle') {
        ctx.fillStyle = '#fde68a';
        ctx.font = '700 20px Cinzel, Georgia, serif';
        ctx.fillText('Firewall Run', W / 2, H * 0.32);
        ctx.fillStyle = 'rgba(241,245,249,0.85)';
        ctx.font = '500 13px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillText('Press Space or tap to start', W / 2, H * 0.32 + 30);
      } else if (s.status === 'over') {
        ctx.fillStyle = 'rgba(30,35,64,0.55)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fde68a';
        ctx.font = '700 26px Cinzel, Georgia, serif';
        ctx.fillText('Game Over', W / 2, H * 0.34);
        ctx.fillStyle = 'rgba(241,245,249,0.9)';
        ctx.font = '500 13px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillText(`Score ${Math.floor(s.score)}  ·  Best ${Math.floor(s.best)}`, W / 2, H * 0.34 + 32);
        ctx.fillText('Space or tap to try again', W / 2, H * 0.34 + 54);
      }
    };

    const spawn = () => {
      const allowDrones = s.score > 250;
      const roll = Math.random();
      if (allowDrones && roll < 0.28) {
        const high = Math.random() < 0.5;
        // low drone: must jump. high drone: stay on the ground and run under it
        const y = high ? s.ground - KNIGHT_H - DRONE_H - 6 : s.ground - DRONE_H - 16;
        s.obstacles.push({ type: 'drone', x: s.W + 10, y, w: DRONE_W, h: DRONE_H });
      } else {
        const count = roll < 0.6 ? 1 : roll < 0.88 ? 2 : 3;
        s.obstacles.push({ type: 'bug', x: s.W + 10, y: s.ground - BUG_H, w: count * BUG_W + (count - 1) * 2, h: BUG_H, count });
      }
      s.nextGap = 240 + Math.random() * 280 + s.speed * 0.28;
    };

    const hit = (o) => {
      const px = playerX() + 7;
      const py = s.ground - KNIGHT_H - s.y + 6;
      const pw = KNIGHT_W - 14;
      const ph = KNIGHT_H - 8;
      const ox = o.x + 4, oy = o.y + 4, ow = o.w - 8, oh = o.h - 6;
      return px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy;
    };

    const step = (now) => {
      const dt = Math.max(0, Math.min(0.05, (now - s.last) / 1000 || 0));
      s.last = now;
      s.t += dt;

      if (s.status === 'running') {
        s.speed = Math.min(MAX_SPEED, s.speed + 9 * dt);
        s.score += s.speed * dt * 0.025;
        s.legT += dt * (s.speed / START_SPEED);

        // jump physics
        if (!s.onGround) {
          const grav = s.holding && s.vy < 0 ? HOLD_GRAVITY : GRAVITY;
          s.vy += grav * dt;
          s.y -= s.vy * dt;
          if (s.y <= 0) { s.y = 0; s.vy = 0; s.onGround = true; }
        }

        // obstacles
        s.obstacles.forEach(o => { o.x -= s.speed * dt; });
        s.obstacles = s.obstacles.filter(o => o.x + o.w > -20);
        const lastObs = s.obstacles[s.obstacles.length - 1];
        if (!lastObs || lastObs.x < s.W - s.nextGap) spawn();

        if (!s.unlockedScore && s.score >= 500) {
          s.unlockedScore = true;
          unlockRef.current('speedrunner');
        }

        if (s.obstacles.some(hit)) {
          s.status = 'over';
          s.overAt = now;
          if (s.score > s.best) { s.best = s.score; saveBest(Math.floor(s.best)); }
        }
      }

      draw();
      if (s.status === 'running') s.raf = requestAnimationFrame(step);
    };

    const start = () => {
      Object.assign(s, {
        status: 'running', y: 0, vy: 0, onGround: true, obstacles: [], speed: START_SPEED,
        score: 0, t: 0, legT: 0, nextGap: 420, last: performance.now(),
      });
      if (!s.unlockedPlay) { s.unlockedPlay = true; unlockRef.current('side_quest'); }
      cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame(step);
    };

    const press = () => {
      if (s.status === 'idle') { start(); return; }
      if (s.status === 'over') {
        if (performance.now() - s.overAt > 450) start();
        return;
      }
      s.holding = true;
      if (s.onGround) { s.onGround = false; s.vy = JUMP_V; }
    };
    const release = () => { s.holding = false; };

    const onKeyDown = (e) => {
      if ([' ', 'ArrowUp', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        if (!e.repeat) press();
      }
    };
    const onKeyUp = (e) => {
      if ([' ', 'ArrowUp', 'w', 'W'].includes(e.key)) release();
    };
    const onPointerDown = (e) => {
      e.preventDefault();
      wrap.focus({ preventScroll: true });
      press();
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      s.W = rect.width;
      s.H = rect.height;
      s.ground = s.H - 34;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    wrap.addEventListener('keydown', onKeyDown);
    wrap.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', release);
    // fonts may load after first paint; redraw so the canvas text uses them
    document.fonts?.ready.then(draw);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      wrap.removeEventListener('keydown', onKeyDown);
      wrap.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', release);
    };
  }, []);

  return (
    <FramedSection id="arcade" tone="a">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Bonus Level" subtitle="Side Quest" />
        <p className="text-center text-sm text-slate-200 -mt-6 mb-8">
          Thanks for stopping by. Now help the knight dodge the malware.
          <span className="block mt-1 text-xs font-mono text-amber-200/90">Space / ↑ to jump (hold to jump higher) · or tap the game</span>
        </p>
        <div
          ref={wrapRef}
          tabIndex={0}
          role="application"
          aria-label="Firewall Run mini game. Press Space or tap to jump."
          className="relative h-[230px] sm:h-[260px] rounded-2xl overflow-hidden border border-amber-200/40 shadow-[0_18px_40px_rgba(20,24,50,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-amber-200 cursor-pointer touch-none select-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </FramedSection>
  );
}
