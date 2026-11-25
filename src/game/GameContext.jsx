/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Level thresholds (total XP needed to reach each level)
export const LEVELS = [
  { xp: 0, title: 'Visitor' },
  { xp: 100, title: 'Scout' },
  { xp: 250, title: 'Analyst' },
  { xp: 450, title: 'Threat Hunter' },
  { xp: 700, title: 'Security Engineer' },
];

export const ACHIEVEMENTS = [
  { id: 'player_joined', icon: '🎮', title: 'Player Joined', desc: 'Started exploring the portfolio', xp: 25 },
  { id: 'character_bio', icon: '📜', title: 'Character Bio', desc: 'Read the About section', xp: 50 },
  { id: 'quest_log', icon: '🗺️', title: 'Quest Log', desc: 'Browsed the projects', xp: 50 },
  { id: 'first_draw', icon: '🃏', title: 'First Draw', desc: 'Flipped your first experience card', xp: 50 },
  { id: 'card_collector', icon: '👑', title: 'Card Collector', desc: 'Flipped every experience card', xp: 150 },
  { id: 'skill_tree', icon: '🌳', title: 'Skill Tree', desc: 'Checked out the skill tree', xp: 50 },
  { id: 'source_diver', icon: '🔍', title: 'Source Diver', desc: 'Opened a project repo or live demo', xp: 75 },
  { id: 'recruiter_mode', icon: '📄', title: 'Recruiter Mode', desc: 'Downloaded the resume', xp: 100 },
  { id: 'party_invite', icon: '🤝', title: 'Party Invite', desc: 'Reached the contact section', xp: 75 },
  { id: 'side_quest', icon: '🕹️', title: 'Side Quest', desc: 'Played Firewall Run', xp: 50 },
  { id: 'speedrunner', icon: '⚡', title: 'Speedrunner', desc: 'Scored 500+ in Firewall Run', xp: 100 },
  { id: 'easter_egg', icon: '🥚', title: 'Easter Egg', desc: 'Pet the goat 5 times', xp: 100, hidden: true },
];

const STORAGE_KEY = 'ish-portfolio-game-v1';
const EMPTY = { xp: 0, unlocked: [], collected: [] };

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

function save(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage can be unavailable (private mode, sandboxed previews); progress just won't persist
  }
}

export function levelFor(xp) {
  let idx = 0;
  LEVELS.forEach((l, i) => { if (xp >= l.xp) idx = i; });
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const progress = next ? (xp - current.xp) / (next.xp - current.xp) : 1;
  return { level: idx + 1, title: current.title, next, progress, maxed: !next };
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, setState] = useState(load);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => { save(state); }, [state]);

  const pushToast = useCallback((toast) => {
    const id = ++toastId.current;
    setToasts(t => [...t, { ...toast, id }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3800);
  }, []);

  // Adds XP and announces a level-up when a threshold is crossed
  const applyXP = useCallback((prev, amount) => {
    const before = levelFor(prev.xp).level;
    const xp = prev.xp + amount;
    const after = levelFor(xp);
    if (after.level > before) {
      setTimeout(() => pushToast({ kind: 'level', title: `Level ${after.level} reached`, desc: `You are now a ${after.title}` }), 500);
    }
    return xp;
  }, [pushToast]);

  const unlock = useCallback((id) => {
    const a = ACHIEVEMENTS.find(x => x.id === id);
    if (!a || stateRef.current.unlocked.includes(id)) return;
    const prev = stateRef.current;
    const next = { ...prev, unlocked: [...prev.unlocked, id], xp: applyXP(prev, a.xp) };
    stateRef.current = next;
    setState(next);
    pushToast({ kind: 'achievement', icon: a.icon, title: a.title, desc: a.desc, xp: a.xp });
  }, [applyXP, pushToast]);

  // Experience cards: +10 XP the first time each one is flipped
  const collectCard = useCallback((cardId, total) => {
    const prev = stateRef.current;
    if (prev.collected.includes(cardId)) return;
    const collected = [...prev.collected, cardId];
    const next = { ...prev, collected, xp: applyXP(prev, 10) };
    stateRef.current = next;
    setState(next);
    if (collected.length === 1) unlock('first_draw');
    if (collected.length >= total) unlock('card_collector');
  }, [applyXP, unlock]);

  const reset = useCallback(() => {
    stateRef.current = EMPTY;
    setState(EMPTY);
  }, []);

  // First visit: a welcome achievement that teaches the mechanic
  useEffect(() => {
    const t = setTimeout(() => unlock('player_joined'), 1400);
    return () => clearTimeout(t);
  }, [unlock]);

  const value = useMemo(() => ({
    ...state, ...levelFor(state.xp), toasts, unlock, collectCard, reset,
  }), [state, toasts, unlock, collectCard, reset]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => useContext(GameContext);

// Unlocks an achievement once the referenced section scrolls into view
export function useSectionAchievement(id, amount = 0.1) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const { unlock } = useGame();
  useEffect(() => { if (inView) unlock(id); }, [inView, id, unlock]);
  return ref;
}
