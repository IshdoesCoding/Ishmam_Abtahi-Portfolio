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
    period: 'Jun 2026 – Present',
    badge: 'Current',
    title: 'Security Engineering Intern',
    org: 'GuidePoint Security — Reston, VA',
    bullets: [
      'Engineering SOC-in-a-Box: a portable SOC lab integrating Splunk, Velociraptor, OpenVAS, and Active Directory on segmented Proxmox/Ludus infrastructure with firewall rules, authentication controls, and VLAN network isolation',
      'Developing Ansible playbooks to automate VM provisioning and building a Python CLI (soccli.py) with tiered deployment profiles (Basic | Standard | Advanced) enabling hardware-aware one-command SOC deployment',
      'Documenting infrastructure setup, troubleshooting procedures, and known issues to support team onboarding and reproducibility across deployment environments',
    ],
  },
  {
    icon: Shield,
    accent: 'violet',
    period: 'Sep 2025 – Present',
    badge: null,
    title: 'Cybersecurity Analyst Intern',
    org: 'University of Virginia ITS — Charlottesville, VA',
    bullets: [
      'Analyzed 500+ weekly security events in Splunk, applying network forensics techniques to reduce false positives by 20% and support triage of 100+ security incidents in a production enterprise environment',
      'Coordinated with 6 interns on incident documentation and escalation across cloud and on-prem environments, improving response efficiency by 40% and cross-team coordination by 60%',
      'Partnered with 5 senior analysts to optimize detection workflows and monitoring processes',
    ],
  },
  {
    icon: Code,
    accent: 'sky',
    period: 'Sep 2024 – May 2026',
    badge: null,
    title: 'Student Admin & Developer',
    org: 'UVA School of Data Science — Charlottesville, VA',
    bullets: [
      'Owned end-to-end development of a web app used daily by ~50 employees and executive leadership to automate expense and travel tracking, fully eliminating manual reporting and improving delivery timelines by 30%',
      'Translated stakeholder requirements into scalable technical solutions, balancing usability, data accuracy, and cross-department coordination while managing IT asset inventory end-to-end',
    ],
  },
  {
    icon: Users,
    accent: 'emerald',
    period: 'Apr 2025 – Present',
    badge: null,
    title: 'President',
    org: 'Students Who Advance in Technology (SWAT) — Charlottesville, VA',
    bullets: [
      'Founded and lead a 20+ member tech consulting organization partnering with 3 UVA departments per semester to deliver real automation and software solutions, from scoping through build to live presentation',
      'Confirmed Data Science School partnerships for conference scheduling and expense report automation; actively scoping a third departmental project with UVA ITS',
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
      'Certified: Google Professional Cybersecurity, Microsoft Azure AZ-900, AWS ML Foundation, Udacity Gen AI (AWS)',
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
