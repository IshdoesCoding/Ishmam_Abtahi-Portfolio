import { motion } from 'framer-motion';
import { Code2, Cloud, Shield, Wrench } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const categories = [
  {
    label: 'Languages & Frameworks',
    icon: Code2,
    accent: 'sky',
    skills: [
      { name: 'Python', level: 'Proficient' },
      { name: 'JavaScript / TypeScript', level: 'Proficient' },
      { name: 'React', level: 'Proficient' },
      { name: 'C / C++', level: 'Familiar' },
      { name: 'FastAPI', level: 'Proficient' },
      { name: 'HTML / CSS', level: 'Proficient' },
      { name: 'Bash / Shell', level: 'Familiar' },
      { name: 'SQL', level: 'Familiar' },
    ],
  },
  {
    label: 'Cloud & Infrastructure',
    icon: Cloud,
    accent: 'violet',
    skills: [
      { name: 'Vercel', level: 'Proficient' },
      { name: 'AWS (EC2, S3)', level: 'Familiar' },
      { name: 'Docker', level: 'Familiar' },
      { name: 'Linux / Ubuntu', level: 'Proficient' },
      { name: 'VMware / VirtualBox', level: 'Proficient' },
      { name: 'Nginx', level: 'Familiar' },
    ],
  },
  {
    label: 'Cybersecurity',
    icon: Shield,
    accent: 'rose',
    skills: [
      { name: 'Splunk SIEM', level: 'Proficient' },
      { name: 'Snort IDS', level: 'Proficient' },
      { name: 'Wireshark', level: 'Proficient' },
      { name: 'Nmap / Metasploit', level: 'Familiar' },
      { name: 'pfSense Firewall', level: 'Proficient' },
      { name: 'ELK Stack', level: 'Familiar' },
      { name: 'OWASP Top 10', level: 'Proficient' },
    ],
  },
  {
    label: 'Tools & Workflow',
    icon: Wrench,
    accent: 'emerald',
    skills: [
      { name: 'Git / GitHub', level: 'Proficient' },
      { name: 'VS Code', level: 'Proficient' },
      { name: 'Postman', level: 'Proficient' },
      { name: 'Figma', level: 'Familiar' },
      { name: 'Jira / Linear', level: 'Familiar' },
      { name: 'OpenAI API', level: 'Proficient' },
    ],
  },
];

const accentMap = {
  sky: {
    header: 'text-sky-400',
    icon: 'bg-sky-400/10 text-sky-400',
    proficient: 'text-sky-400',
    familiar: 'text-slate-500',
    border: 'border-sky-400/10 hover:border-sky-400/30',
  },
  violet: {
    header: 'text-violet-400',
    icon: 'bg-violet-400/10 text-violet-400',
    proficient: 'text-violet-400',
    familiar: 'text-slate-500',
    border: 'border-violet-400/10 hover:border-violet-400/30',
  },
  rose: {
    header: 'text-rose-400',
    icon: 'bg-rose-400/10 text-rose-400',
    proficient: 'text-rose-400',
    familiar: 'text-slate-500',
    border: 'border-rose-400/10 hover:border-rose-400/30',
  },
  emerald: {
    header: 'text-emerald-400',
    icon: 'bg-emerald-400/10 text-emerald-400',
    proficient: 'text-emerald-400',
    familiar: 'text-slate-500',
    border: 'border-emerald-400/10 hover:border-emerald-400/30',
  },
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-[#050a18]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Skills</h2>
          <p className="text-slate-500 text-sm font-mono">// tools of the trade</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const a = accentMap[cat.accent];
            return (
              <motion.div
                key={cat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card rounded-2xl p-6 border ${a.border} transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-lg ${a.icon}`}>
                    <cat.icon size={16} />
                  </div>
                  <h3 className={`font-semibold text-sm ${a.header}`}>{cat.label}</h3>
                </div>

                <ul className="space-y-3">
                  {cat.skills.map(s => (
                    <li key={s.name} className="flex items-center justify-between gap-2">
                      <span className="text-slate-300 text-sm">{s.name}</span>
                      <span className={`text-xs font-mono flex-shrink-0 ${s.level === 'Proficient' ? a.proficient : a.familiar}`}>
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
