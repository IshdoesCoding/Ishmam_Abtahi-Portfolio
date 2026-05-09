import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import CV from '../assets/Ishmam_Abtahi_Resume.pdf';
import profileImg from '../assets/Hero_profile.JPG';

const roles = ['Computer Engineer', 'Security Researcher', 'Full-Stack Developer', 'Problem Solver'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function useTypewriter(words) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = words[idx];
    let timeout;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setIdx((idx + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, idx, words]);

  return displayed;
}

const floatingTech = [
  { label: '⚡ GuidePoint', x: -148, y: -70, delay: 0, color: 'rose' },
  { label: '🛡 Splunk', x: 140, y: -80, delay: 0.6, color: 'violet' },
  { label: '⚛ React', x: -135, y: 75, delay: 1.2, color: 'sky' },
  { label: '🐍 Python', x: 130, y: 72, delay: 1.8, color: 'emerald' },
];

const colorMap = {
  rose: 'border-rose-400/30 text-rose-400',
  violet: 'border-violet-400/30 text-violet-400',
  sky: 'border-sky-400/30 text-sky-400',
  emerald: 'border-emerald-400/30 text-emerald-400',
};

const particles = [
  { x: 8,  y: 12, d: 3.0, delay: 0.0 }, { x: 15, y: 55, d: 4.5, delay: 0.5 },
  { x: 23, y: 83, d: 3.5, delay: 1.0 }, { x: 35, y: 28, d: 5.0, delay: 1.5 },
  { x: 48, y: 70, d: 3.8, delay: 0.3 }, { x: 58, y: 15, d: 4.2, delay: 0.8 },
  { x: 67, y: 45, d: 5.5, delay: 1.3 }, { x: 75, y: 88, d: 3.3, delay: 0.1 },
  { x: 82, y: 32, d: 4.8, delay: 0.9 }, { x: 92, y: 62, d: 3.6, delay: 1.7 },
  { x: 5,  y: 40, d: 4.0, delay: 2.0 }, { x: 18, y: 75, d: 5.2, delay: 0.4 },
  { x: 42, y: 95, d: 3.4, delay: 1.1 }, { x: 62, y: 8,  d: 4.6, delay: 0.7 },
  { x: 88, y: 50, d: 3.9, delay: 1.9 }, { x: 30, y: 60, d: 4.3, delay: 0.2 },
  { x: 72, y: 22, d: 5.1, delay: 1.4 }, { x: 95, y: 78, d: 3.7, delay: 0.6 },
  { x: 52, y: 38, d: 4.4, delay: 1.6 }, { x: 12, y: 92, d: 3.2, delay: 2.2 },
];

function ProfileCard() {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useTransform(mouseY, [-0.5, 0.5], [14, -14]);
  const rotY = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const rotateX = useSpring(rotX, { stiffness: 180, damping: 28 });
  const rotateY = useSpring(rotY, { stiffness: 180, damping: 28 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseX.set(nx - 0.5);
    mouseY.set(ny - 0.5);
    setGlowPos({ x: nx * 100, y: ny * 100 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay: 0.35 }}
      className="relative flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      {/* Outer orbital ring — sky */}
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full border border-sky-400/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-sky-400 rounded-full shadow-[0_0_12px_4px_rgba(56,189,248,0.5)]" />
      </motion.div>

      {/* Inner orbital ring — violet, counter-rotate */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full border border-violet-400/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-violet-400 rounded-full shadow-[0_0_10px_3px_rgba(167,139,250,0.5)]" />
        <div className="absolute bottom-6 left-10 w-1.5 h-1.5 bg-sky-400/60 rounded-full" />
      </motion.div>

      {/* Third ring — dashed look */}
      <motion.div
        className="absolute w-[440px] h-[440px] rounded-full"
        style={{ border: '1px dashed rgba(56,189,248,0.08)' }}
        animate={{ rotate: 180 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating tech chips */}
      {floatingTech.map((t) => (
        <motion.div
          key={t.label}
          className={`absolute glass-card border rounded-xl px-2.5 py-1.5 text-xs font-mono whitespace-nowrap ${colorMap[t.color]}`}
          style={{ left: `calc(50% + ${t.x}px)`, top: `calc(50% + ${t.y}px)`, translateX: '-50%', translateY: '-50%' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, t.x > 0 ? -8 : 8, 0] }}
          transition={{ opacity: { delay: t.delay + 0.6, duration: 0.4 }, scale: { delay: t.delay + 0.6, duration: 0.4 }, y: { duration: 3.5 + t.delay * 0.3, repeat: Infinity, ease: 'easeInOut', delay: t.delay } }}
        >
          {t.label}
        </motion.div>
      ))}

      {/* 3D tilt card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-64 h-72 cursor-pointer"
      >
        {/* Ambient glow */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-sky-400/15 to-violet-400/15 blur-3xl pointer-events-none" />

        {/* Image card */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src={profileImg}
            alt="Ishmam Abtahi"
            className="w-full h-full object-cover object-top"
          />
          {/* Mouse-tracking specular highlight */}
          <div
            className="absolute inset-0 transition-none pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(56,189,248,0.18), transparent 60%)`,
            }}
          />
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050a18]/60 to-transparent" />
        </div>

        {/* Available badge — floats in Z */}
        <motion.div
          className="absolute -bottom-4 -right-5 glass-card border border-emerald-400/30 rounded-xl px-3 py-2 flex items-center gap-2"
          style={{ transform: 'translateZ(32px)' }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-400 font-mono font-medium">Available</span>
        </motion.div>

        {/* UVA badge — floats in Z */}
        <motion.div
          className="absolute -top-4 -left-5 glass-card border border-sky-400/30 rounded-xl px-3 py-2"
          style={{ transform: 'translateZ(24px)' }}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <span className="text-xs text-sky-400 font-mono font-medium">🎓 UVA &apos;28</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const displayed = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Background orbs */}
      <div className="orb w-[520px] h-[520px] bg-sky-500/10 -top-20 -left-40 animate-float" />
      <div className="orb w-[400px] h-[400px] bg-violet-500/10 bottom-0 -right-24 animate-float-slow" />
      <div className="orb w-56 h-56 bg-sky-400/8 top-1/3 right-1/3 animate-float" style={{ animationDelay: '3s' }} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-sky-400/35"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left: text */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-5">
            <span className="inline-flex items-center gap-2 text-sm text-sky-400 font-mono border border-sky-400/20 px-3 py-1.5 rounded-full bg-sky-400/5">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight"
          >
            <span className="gradient-text">Ishmam<br />Abtahi</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-mono text-slate-300 mb-5 h-8 flex items-center gap-1"
          >
            <span>{displayed}</span>
            <span className="w-0.5 h-5 bg-sky-400 animate-blink inline-block" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-base max-w-lg mb-8 leading-relaxed"
          >
            UVA Computer Engineering student building secure, intelligent software at the
            intersection of cybersecurity and full-stack development.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <a
              href="#projects"
              className="px-7 py-3 bg-sky-400 text-[#050a18] font-semibold rounded-xl hover:bg-sky-300 transition-all duration-200 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
            >
              View My Work
            </a>
            <a
              href={CV}
              download
              className="flex items-center gap-2 px-7 py-3 glass-card text-slate-300 font-semibold rounded-xl hover:text-white transition-all duration-200"
            >
              <Download size={16} />
              Resume
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
            className="flex items-center gap-5"
          >
            <a href="https://github.com/IshdoesCoding" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors duration-200" aria-label="GitHub">
              <GithubIcon size={22} />
            </a>
            <a href="https://linkedin.com/in/ishmam-abtahi" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              <LinkedinIcon size={22} />
            </a>
          </motion.div>
        </div>

        {/* Right: 3D profile card */}
        <div className="hidden lg:flex justify-center items-center">
          <ProfileCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
