import { motion } from 'framer-motion';
import { Code2, Cloud, Shield, Wrench } from 'lucide-react';
import { FramedSection, SectionHeader } from './Ornate';
import { useSectionAchievement } from '../game/GameContext';

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
      { name: 'JavaScript / React.js', level: 'Proficient' },
      { name: 'C / Assembly', level: 'Familiar' },
      { name: 'Java', level: 'Familiar' },
      { name: 'REST APIs', level: 'Proficient' },
      { name: 'Ansible', level: 'Proficient' },
      { name: 'Bash / Shell', level: 'Proficient' },
      { name: 'Git / Linux', level: 'Proficient' },
    ],
  },
  {
    label: 'Cloud & Infrastructure',
    icon: Cloud,
    accent: 'violet',
    skills: [
      { name: 'Proxmox / Ludus', level: 'Proficient' },
      { name: 'AWS (EC2, S3)', level: 'Familiar' },
      { name: 'Active Directory', level: 'Proficient' },
      { name: 'VMware / VirtualBox', level: 'Proficient' },
      { name: 'VLAN / Firewall', level: 'Proficient' },
      { name: 'Vercel', level: 'Proficient' },
    ],
  },
  {
    label: 'Cybersecurity',
    icon: Shield,
    accent: 'rose',
    skills: [
      { name: 'Splunk SIEM', level: 'Proficient' },
      { name: 'Suricata IDS', level: 'Proficient' },
      { name: 'Velociraptor / OpenVAS', level: 'Proficient' },
      { name: 'Wireshark', level: 'Proficient' },
      { name: 'BurpSuite', level: 'Familiar' },
      { name: 'Nmap', level: 'Familiar' },
      { name: 'Kali Linux', level: 'Proficient' },
      { name: 'Penetration Testing', level: 'Familiar' },
    ],
  },
  {
    label: 'Electrical & Hardware',
    icon: Wrench,
    accent: 'emerald',
    skills: [
      { name: 'KiCad / PCB Layout', level: 'Proficient' },
      { name: 'MATLAB / VHDL', level: 'Familiar' },
      { name: 'Oscilloscope / WaveForms', level: 'Proficient' },
      { name: 'Circuit Design', level: 'Proficient' },
      { name: 'Signal Analysis', level: 'Familiar' },
      { name: 'CAD', level: 'Familiar' },
    ],
  },
];

const accentMap = {
  sky: {
    header: 'text-sky-300',
    icon: 'bg-sky-300/10 text-sky-300',
    proficient: 'text-sky-300',
    familiar: 'text-slate-300',
    border: 'border-sky-300/10 hover:border-sky-300/30',
  },
  violet: {
    header: 'text-violet-300',
    icon: 'bg-violet-300/10 text-violet-300',
    proficient: 'text-violet-300',
    familiar: 'text-slate-300',
    border: 'border-violet-300/10 hover:border-violet-300/30',
  },
  rose: {
    header: 'text-rose-300',
    icon: 'bg-rose-300/10 text-rose-300',
    proficient: 'text-rose-300',
    familiar: 'text-slate-300',
    border: 'border-rose-300/10 hover:border-rose-300/30',
  },
  emerald: {
    header: 'text-emerald-300',
    icon: 'bg-emerald-300/10 text-emerald-300',
    proficient: 'text-emerald-300',
    familiar: 'text-slate-300',
    border: 'border-emerald-300/10 hover:border-emerald-300/30',
  },
};

export default function Skills() {
  const sectionRef = useSectionAchievement('skill_tree');
  return (
    <FramedSection id="skills" tone="a" sectionRef={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Skills" subtitle="Skill Tree" />

        <p className="text-center text-xs font-mono text-slate-200 -mt-6 mb-10 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1.5"><span className="flex gap-1">{[0, 1, 2].map(n => <span key={n} className="w-2 h-2 rotate-45 bg-amber-200" />)}</span> Proficient</span>
          <span className="flex items-center gap-1.5"><span className="flex gap-1">{[0, 1].map(n => <span key={n} className="w-2 h-2 rotate-45 bg-amber-200" />)}<span className="w-2 h-2 rotate-45 border border-amber-200/50" /></span> Familiar</span>
        </p>
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
                  <h3 className={`font-display font-semibold text-sm ${a.header}`}>{cat.label}</h3>
                </div>

                <ul className="space-y-3">
                  {cat.skills.map(s => (
                    <li key={s.name} className="flex items-center justify-between gap-2">
                      <span className="text-slate-300 text-sm">{s.name}</span>
                      <span className="flex gap-1 flex-shrink-0" title={s.level} aria-label={s.level}>
                        {[0, 1, 2].map(n => (
                          <span
                            key={n}
                            className={`w-2 h-2 rotate-45 ${n < (s.level === 'Proficient' ? 3 : 2) ? 'bg-amber-200' : 'border border-amber-200/50'}`}
                          />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </FramedSection>
  );
}
