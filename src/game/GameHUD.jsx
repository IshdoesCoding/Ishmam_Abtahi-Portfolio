import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, RotateCcw } from 'lucide-react';
import { ACHIEVEMENTS, useGame } from './GameContext';

function XPBar({ progress }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-400"
        initial={false}
        animate={{ width: `${Math.round(progress * 100)}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  );
}

function AchievementsPanel({ onClose }) {
  const { unlocked, xp, reset } = useGame();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className="absolute bottom-full left-0 mb-3 w-[min(340px,calc(100vw-2rem))] rounded-2xl border border-amber-200/30 bg-[#2b3157]/95 backdrop-blur-md shadow-2xl p-5"
      role="dialog"
      aria-label="Achievements"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-amber-200 text-lg">Achievements</h3>
        <button onClick={onClose} aria-label="Close achievements" className="text-slate-300 hover:text-white">
          <X size={18} />
        </button>
      </div>
      <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
        {ACHIEVEMENTS.map(a => {
          const got = unlocked.includes(a.id);
          const secret = a.hidden && !got;
          return (
            <li
              key={a.id}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 border ${got ? 'border-amber-200/30 bg-amber-200/10' : 'border-white/10 bg-white/[0.03] opacity-60'}`}
            >
              <span className={`text-xl ${got ? '' : 'grayscale'}`}>{secret ? '❔' : a.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${got ? 'text-white' : 'text-slate-300'}`}>{secret ? 'Hidden achievement' : a.title}</div>
                <div className="text-xs text-slate-300 leading-snug">{secret ? 'Keep exploring...' : a.desc}</div>
              </div>
              <span className="text-xs font-mono text-amber-200 flex-shrink-0">+{a.xp}</span>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
        <span className="text-xs font-mono text-slate-300">{xp} XP total</span>
        <button onClick={reset} className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white">
          <RotateCcw size={12} /> Reset progress
        </button>
      </div>
    </motion.div>
  );
}

function Toasts() {
  const { toasts } = useGame();
  return (
    <div className="fixed top-[4.5rem] right-3 sm:top-20 sm:right-4 z-[60] flex flex-col gap-2 sm:gap-3 items-end pointer-events-none" aria-live="polite">
      <AnimatePresence>
        {toasts.slice(-2).map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-amber-200/40 bg-[#2b3157]/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 shadow-xl max-w-[250px] sm:max-w-[300px]"
          >
            <span className="text-xl sm:text-2xl">{t.kind === 'level' ? '⬆️' : t.icon}</span>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-amber-200">
                {t.kind === 'level' ? 'Level up' : 'Achievement unlocked'}
              </div>
              <div className="text-sm font-semibold text-white">{t.title}</div>
              <div className="hidden sm:block text-xs text-slate-300 leading-snug">{t.desc}</div>
            </div>
            {t.xp && <span className="text-xs font-mono text-amber-200 self-start">+{t.xp} XP</span>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function GameHUD() {
  const { level, title, xp, next, progress, maxed, unlocked } = useGame();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Toasts />
      <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-50">
        <AnimatePresence>{open && <AchievementsPanel onClose={() => setOpen(false)} />}</AnimatePresence>
        <motion.button
          onClick={() => setOpen(o => !o)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          aria-expanded={open}
          aria-label={`Level ${level} ${title}. Open achievements`}
          className="flex items-center gap-3 rounded-2xl border border-amber-200/30 bg-[#2b3157]/90 backdrop-blur-md pl-2.5 pr-3 py-2 sm:pl-3 sm:pr-4 sm:py-2.5 shadow-xl hover:border-amber-200/60 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-200 to-amber-400 flex flex-col items-center justify-center text-[#2b3157] leading-none flex-shrink-0">
            <span className="text-[9px] font-bold tracking-wider">LVL</span>
            <span className="text-base font-bold">{level}</span>
          </div>
          <div className="w-32 sm:w-48">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-display text-xs sm:text-sm text-white truncate">{title}</span>
              <span className="flex items-center gap-1 text-xs font-mono text-amber-200">
                <Trophy size={12} /> {unlocked.length}/{ACHIEVEMENTS.length}
              </span>
            </div>
            <XPBar progress={progress} />
            <div className="hidden sm:block text-[10px] font-mono text-slate-300 mt-1">
              {maxed ? `${xp} XP · max level` : `${xp} / ${next.xp} XP`}
            </div>
          </div>
        </motion.button>
      </div>
    </>
  );
}
