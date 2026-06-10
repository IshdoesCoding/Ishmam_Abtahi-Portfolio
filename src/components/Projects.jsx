import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import socLabImg from '../assets/soc_lab.png';
import dcdcImg from '../assets/dcdc.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const projects = [
  {
    title: 'AI Resume Analyzer — Resumify',
    description:
      'An AI-powered resume analysis platform that delivers tailored feedback based on job and company data. Built with React.js Router v7 and Puter.js backend, attracting 200+ users.',
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
      'A fully operational home Security Operations Center running 24/7 threat detection, log analysis, and incident response — built with enterprise-grade open-source tools on commodity hardware.',
    impact: '100+ threats detected',
    accent: 'violet',
    tags: ['Splunk', 'Snort IDS', 'Wireshark', 'pfSense', 'ELK Stack', 'VMware'],
    github: null,
    demo: null,
    image: socLabImg,
    flip: true,
  },
  {
    title: 'Uspot — Campus Events Startup',
    description:
      'A campus platform aggregating real-time events through a map-based and event card interface. Built in 7 hours at the Claude-for-Good hackathon. Placed 6th out of 50 teams and secured 20+ waitlist users. Currently developing live event feeds, club integrations, and push notifications.',
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
      'Designed a full audio-reactive LED driver in KiCad: AC summing amp, Sallen-Key LP/HP filters, peak detectors, triangle-wave oscillator, and analog + PWM LED drivers. Assembled, soldered, and verified signal integrity with WaveForms.',
    impact: 'Full analog signal chain',
    accent: 'rose',
    tags: ['KiCad', 'PCB Design', 'Analog Circuits', 'WaveForms', 'Signal Analysis'],
    github: null,
    demo: null,
    image: dcdcImg,
    flip: true,
  },
];

const accentMap = {
  sky: {
    badge: 'bg-sky-400/10 text-sky-400 border-sky-400/20',
    tag: 'bg-sky-400/10 text-sky-400',
    icon: 'text-sky-400 hover:text-sky-300',
    glow: 'group-hover:shadow-[0_0_40px_rgba(56,189,248,0.12)]',
  },
  violet: {
    badge: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
    tag: 'bg-violet-400/10 text-violet-400',
    icon: 'text-violet-400 hover:text-violet-300',
    glow: 'group-hover:shadow-[0_0_40px_rgba(167,139,250,0.12)]',
  },
  emerald: {
    badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    tag: 'bg-emerald-400/10 text-emerald-400',
    icon: 'text-emerald-400 hover:text-emerald-300',
    glow: 'group-hover:shadow-[0_0_40px_rgba(52,211,153,0.12)]',
  },
  rose: {
    badge: 'bg-rose-400/10 text-rose-400 border-rose-400/20',
    tag: 'bg-rose-400/10 text-rose-400',
    icon: 'text-rose-400 hover:text-rose-300',
    glow: 'group-hover:shadow-[0_0_40px_rgba(251,113,133,0.12)]',
  },
};

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[#050a18]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Projects</h2>
          <p className="text-slate-500 text-sm font-mono">// things I&apos;ve built</p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((p, i) => {
            const a = accentMap[p.accent];
            return (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1 }}
                className={`group glass-card rounded-2xl overflow-hidden ${a.glow} transition-all duration-300`}
              >
                <div className={`grid lg:grid-cols-2 ${p.flip ? 'lg:[direction:rtl]' : ''}`}>
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ direction: 'ltr' }}
                    />
                  </div>

                  <div className="p-8 lg:p-10 flex flex-col justify-center" style={{ direction: 'ltr' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-mono px-3 py-1 rounded-full border ${a.badge}`}>
                        {p.impact}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">{p.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.map(tag => (
                        <span key={tag} className={`text-xs font-mono px-2.5 py-1 rounded-lg ${a.tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${a.icon}`}
                        >
                          <GithubIcon size={16} />
                          Source
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${a.icon}`}
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
