import { motion } from 'framer-motion';
import { GraduationCap, Shield, Code, Users } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const entries = [
  {
    icon: Shield,
    accent: 'rose',
    period: 'Summer 2026',
    badge: 'Upcoming',
    title: 'Cybersecurity Engineering Intern',
    org: 'GuidePoint Security',
    bullets: [
      'Incoming cybersecurity engineering intern joining Summer 2026',
      'GuidePoint Security is a leading cybersecurity solutions provider serving enterprise clients across North America',
      'Will apply hands-on security engineering skills in a professional consulting environment',
    ],
  },
  {
    icon: Shield,
    accent: 'violet',
    period: 'Sep 2025 – Present',
    badge: null,
    title: 'Cybersecurity Analyst Intern',
    org: 'University of Virginia ITS',
    bullets: [
      'Analyzed 500+ weekly security and system events in Splunk, reducing false positives by 20% and improving operational decision-making',
      'Supported incident triage, documentation, and escalation with 6 interns in a production enterprise IT environment, enhancing response efficiency by 40%',
      'Applied data analysis for risk evaluation across 100+ security incidents; partnered with 5 senior analysts to optimize detection workflows',
    ],
  },
  {
    icon: Code,
    accent: 'sky',
    period: 'Sep 2024 – Present',
    badge: null,
    title: 'Student Admin & Developer',
    org: 'UVA School of Data Science',
    bullets: [
      'Owned end-to-end development of a web app used daily by executive leadership and ~50 employees to automate expense and travel tracking',
      'Managed IT asset inventory end-to-end and coordinated cross-department requests, improving delivery timelines by 30%',
      'Translated stakeholder requirements into technical solutions, balancing usability, data accuracy, and scalability',
    ],
  },
  {
    icon: Users,
    accent: 'emerald',
    period: 'Apr 2025 – Present',
    badge: null,
    title: 'Vice-President',
    org: 'Students Who Advance in Technology (SWAT)',
    bullets: [
      'Co-lead a 50+ member student organization delivering technology solutions for UVA departments and Charlottesville organizations',
      'Leading a partnership with the School of Data Science Administration to automate administrative workflows, projected to increase efficiency by 20%',
      'Oversee initiatives ranging from process automation to refurbishing and deploying tech for local nonprofits',
    ],
  },
  {
    icon: GraduationCap,
    accent: 'sky',
    period: 'Aug 2024 – May 2028',
    badge: null,
    title: 'B.S. Computer & Electrical Engineering',
    org: 'University of Virginia — QuestBridge Scholar',
    bullets: [
      'Minor in General Business; coursework in Data Structures & Algorithms, Cybersecurity, Digital Logic Design, Signals & Systems, and Applied Circuits',
      'Certified: Google Professional Cybersecurity, Microsoft Azure AZ-900, AWS Machine Learning Foundation, Udacity Intro to Gen AI',
      'Active in SWAT, engineering communities, and HackTheBox CTF competitions',
    ],
  },
];

const accentMap = {
  sky: {
    icon: 'bg-sky-400/10 text-sky-400 border-sky-400/20',
    dot: 'bg-sky-400',
    period: 'text-sky-400',
  },
  violet: {
    icon: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
    dot: 'bg-violet-400',
    period: 'text-violet-400',
  },
  emerald: {
    icon: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    dot: 'bg-emerald-400',
    period: 'text-emerald-400',
  },
  rose: {
    icon: 'bg-rose-400/10 text-rose-400 border-rose-400/20',
    dot: 'bg-rose-400',
    period: 'text-rose-400',
  },
};

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-[#080d1e]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Experience</h2>
          <p className="text-slate-500 text-sm font-mono">// my journey</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-rose-400/60 via-sky-400/40 to-transparent" />

          <div className="space-y-10">
            {entries.map((e, i) => {
              const a = accentMap[e.accent];
              return (
                <motion.div
                  key={e.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16 md:pl-20"
                >
                  <div className={`absolute left-3.5 md:left-5 top-4 w-5 h-5 rounded-full border-2 border-[#080d1e] ${a.dot} shadow-lg`} />

                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex flex-wrap items-start gap-4 mb-4">
                      <div className={`p-2.5 rounded-xl border ${a.icon}`}>
                        <e.icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-mono ${a.period}`}>{e.period}</span>
                          {e.badge && (
                            <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${a.icon} animate-pulse`}>
                              {e.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-base leading-tight">{e.title}</h3>
                        <p className="text-slate-400 text-sm mt-0.5">{e.org}</p>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {e.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-slate-400">
                          <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${a.dot}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
