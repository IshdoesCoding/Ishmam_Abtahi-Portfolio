import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { GithubIcon } from './icons';
import socLabImg from '../assets/soc_lab.png';
import dcdcImg from '../assets/dcdc.jpg';
import { FramedSection, SectionHeader, OrnateFrame, Flourish } from './Ornate';
import { useGame, useSectionAchievement } from '../game/GameContext';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const projects = [
  {
    title: 'LLM Prompt Injection Benchmark',
    description:
      "A benchmark that tests prompt injection across the OWASP LLM01:2025 categories, including direct and indirect injection, payload splitting, and obfuscated or multilingual attacks. Scoring uses a deterministic, regex-based pipeline instead of an LLM judge, since the judge itself could get manipulated. I tested 2 prompt-hardening defenses, and they cut the attack success rate by 33%.",
    impact: '33% attack reduction',
    accent: 'amber',
    tags: ['Python', 'LLM Security', 'OWASP LLM01', 'Prompt Injection'],
    github: 'https://github.com/IshdoesCoding/LLM-Prompt-Injection',
    demo: null,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    flip: false,
  },
  {
    title: 'SSH & Web Honeypot',
    description:
      "A low-interaction SSH and HTTP honeypot I built in Python and ran on a Hostinger VPS to see how real attackers go after internet-facing services. Over 2 weeks, it logged 200+ connection attempts and 60+ credential-stuffing attempts. A custom log-analysis script then showed me the most attacked credentials and the source IPs, which came from 8+ countries.",
    impact: '200+ attempts · 8+ countries',
    accent: 'indigo',
    tags: ['Python', 'Honeypot', 'Network Security', 'VPS'],
    github: 'https://github.com/IshdoesCoding/Honeypot-project',
    demo: null,
    image: 'https://images.pexels.com/photos/5480781/pexels-photo-5480781.jpeg?auto=compress&cs=tinysrgb&w=800',
    flip: true,
  },
  {
    title: 'Resumify: AI Resume Analyzer',
    description:
      "An AI resume analyzer that gives tailored feedback based on the job and the company. I built it with React Router v7 and a Puter.js backend, and it's had 200+ users so far.",
    impact: '200+ users',
    accent: 'sky',
    tags: ['React.js', 'Puter.js', 'AI/LLM', 'Router v7'],
    github: 'https://github.com/IshdoesCoding/AI-Resume-Analyzer-Resumify-',
    demo: 'https://ai-resume-analyzer-resumify.vercel.app/',
    image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
    flip: false,
  },
  {
    title: 'Home SOC: Cyber Defense Lab',
    description:
      "A home Security Operations Center that runs threat detection, log analysis, and incident response 24/7. I built it with enterprise-grade open-source tools on regular hardware.",
    impact: '100+ threats detected',
    accent: 'violet',
    tags: ['Splunk', 'Snort IDS', 'Wireshark', 'pfSense', 'ELK Stack', 'VMware'],
    github: null,
    demo: null,
    image: socLabImg,
    flip: true,
  },
  {
    title: 'Uspot: Campus Events Startup',
    description:
      "A campus app that pulls real-time events into a map and event cards. It was built in 7 hours at the Claude-for-Good hackathon, placed 6th out of 50 teams, and got 20+ people on the waitlist. Live event feeds, club integrations, and push notifications are in the works now.",
    impact: '20+ waitlist users · 6th / 50 teams',
    accent: 'emerald',
    tags: ['React', 'Maps API', 'Real-time', 'Hackathon'],
    github: null,
    demo: null,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    flip: false,
  },
  {
    title: 'Audio-Reactive LED Driver PCB',
    description:
      "An audio-reactive LED driver I designed in KiCad. It has an AC summing amp, Sallen-Key low-pass and high-pass filters, peak detectors, a triangle-wave oscillator, and both analog and PWM LED drivers. I assembled and soldered the board myself, then checked signal integrity with WaveForms.",
    impact: 'Full analog signal chain',
    accent: 'rose',
    tags: ['KiCad', 'PCB Design', 'Analog Circuits', 'WaveForms', 'Signal Analysis'],
    github: null,
    demo: null,
    image: dcdcImg,
    flip: true,
  },
];

const tagColor = {
  sky: 'bg-sky-300/15 text-sky-200',
  violet: 'bg-violet-300/15 text-violet-200',
  emerald: 'bg-emerald-300/15 text-emerald-200',
  rose: 'bg-rose-300/15 text-rose-200',
  amber: 'bg-amber-300/15 text-amber-200',
  indigo: 'bg-indigo-300/15 text-indigo-200',
};

const questNo = (i) => `Quest ${String(i + 1).padStart(2, '0')}`;

function QuestCard({ p, i, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (i % 3) * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative text-left rounded-2xl overflow-hidden bg-gradient-to-b from-[#56609a] to-[#353d6a] border border-white/15 shadow-[0_18px_40px_rgba(20,24,50,0.4)] hover:shadow-[0_24px_60px_rgba(20,24,50,0.55)] hover:border-amber-200/50 transition-[box-shadow,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-amber-200 outline-none"
      aria-label={`${questNo(i)}: ${p.title}. Open quest details`}
    >
      <OrnateFrame inset={8} size={38} line={1.5} opacity={0.75} />
      <div className="relative p-5 pt-6 flex flex-col h-full">
        <div className="relative mx-1 rounded-lg overflow-hidden border border-white/15 aspect-[16/10] bg-[#2b3157]">
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b3157]/70 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-100 bg-[#2b3157]/80 border border-amber-200/40 rounded-full px-2 py-0.5">
            {questNo(i)}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center text-center px-2 pt-5 pb-3">
          <h3 className="font-display text-lg font-bold text-white leading-snug">{p.title}</h3>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-amber-200">
            <span aria-hidden="true">🏆</span> {p.impact}
          </span>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {p.tags.slice(0, 3).map(tag => (
              <span key={tag} className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${tagColor[p.accent]}`}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="text-center text-[10px] font-mono uppercase tracking-[0.22em] text-slate-200 group-hover:text-amber-200 transition-colors pb-2">
          View quest →
        </div>
      </div>
    </motion.button>
  );
}

function QuestModal({ p, i, onClose, onLink }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[#1c2040]/75 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="relative w-full max-w-2xl"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close quest"
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20 w-10 h-10 rounded-full bg-amber-200 text-[#2b3157] shadow-lg hover:bg-amber-100 flex items-center justify-center"
        >
          <X size={20} />
        </button>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#4c5690] to-[#2c3259] border border-amber-200/30 shadow-2xl">
          <OrnateFrame inset={10} size={48} line={2} opacity={0.7} className="z-10" />
          <div className="relative max-h-[86vh] overflow-y-auto thin-scroll px-10 pt-12 pb-12 sm:px-16">
          <div className="rounded-xl overflow-hidden border border-white/15 h-40 sm:h-52 bg-[#2b3157]">
            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          </div>

          <div className="text-center mt-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-200">{questNo(i)}</div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">{p.title}</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-amber-100 border border-amber-200/40 bg-amber-200/10 rounded-full px-3 py-1">
              <span aria-hidden="true">🏆</span> Reward: {p.impact}
            </span>
          </div>

          <Flourish className="h-5 my-5 opacity-70" />

          <p className="text-slate-100 leading-relaxed text-[15px]">{p.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {p.tags.map(tag => (
              <span key={tag} className={`text-xs font-mono px-2.5 py-1 rounded-lg ${tagColor[p.accent]}`}>{tag}</span>
            ))}
          </div>

          {(p.github || p.demo) && (
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onLink}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-200 text-[#2b3157] font-semibold text-sm hover:bg-amber-100 transition-colors"
                >
                  <GithubIcon size={16} /> View Source
                </a>
              )}
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onLink}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-200/50 text-amber-100 font-semibold text-sm hover:bg-amber-200/10 transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useSectionAchievement('quest_log');
  const { unlock } = useGame();
  const [openIdx, setOpenIdx] = useState(null);
  const close = useCallback(() => setOpenIdx(null), []);

  return (
    <FramedSection id="projects" tone="a" sides sectionRef={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Projects" subtitle="Quest Board" />
        <p className="text-center text-sm text-slate-200 -mt-6 mb-12">Pick a quest to see what I built.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((p, i) => (
            <QuestCard key={p.title} p={p} i={i} onOpen={() => setOpenIdx(i)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <QuestModal
            key={openIdx}
            p={projects[openIdx]}
            i={openIdx}
            onClose={close}
            onLink={() => unlock('source_diver')}
          />
        )}
      </AnimatePresence>
    </FramedSection>
  );
}
