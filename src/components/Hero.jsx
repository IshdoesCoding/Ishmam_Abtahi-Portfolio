import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';
import CV from '../assets/Ishmam_Abtahi_Resume.pdf';

const roles = ['Computer Engineer', 'Security Researcher', 'Full-Stack Developer', 'Problem Solver'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIdx];
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
        setRoleIdx((roleIdx + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="orb w-96 h-96 bg-sky-500/20 top-1/4 -left-24 animate-float" />
      <div className="orb w-80 h-80 bg-violet-500/15 bottom-1/3 -right-20 animate-float-slow" />
      <div className="orb w-64 h-64 bg-sky-400/10 bottom-10 left-1/3 animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-6">
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
          className="text-5xl md:text-7xl font-bold mb-5 leading-tight"
        >
          <span className="gradient-text">Ishmam Abtahi</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-mono text-slate-300 mb-6 h-9 flex items-center justify-center gap-1"
        >
          <span>{displayed}</span>
          <span className="w-0.5 h-6 bg-sky-400 animate-blink inline-block" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          UVA Computer Engineering student building secure, intelligent software at the
          intersection of cybersecurity and full-stack development.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
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
            Download Resume
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/IshdoesCoding"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <GithubIcon size={22} />
          </a>
          <a
            href="https://linkedin.com/in/ishmam-abtahi"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={22} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
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
