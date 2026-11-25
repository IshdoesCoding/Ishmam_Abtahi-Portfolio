import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Shield, Lightbulb, Users } from 'lucide-react';
import profileImg from '../assets/about_profile.webp';
import { FramedSection, SectionHeader } from './Ornate';
import { useSectionAchievement } from '../game/GameContext';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
  { value: '6+', label: 'Projects Shipped' },
  { value: '200+', label: 'App Users' },
  { value: '500+', label: 'Events Analyzed' },
  { value: "UVA '28", label: 'QuestBridge Scholar' },
];

const traits = [
  { icon: Code2, label: 'Clean Code', desc: 'Code that\'s easy to maintain and scale', color: 'text-sky-300' },
  { icon: Shield, label: 'Security First', desc: 'I build with defense in mind from day one', color: 'text-violet-300' },
  { icon: Lightbulb, label: 'Fast Learner', desc: 'I pick up new tools quickly', color: 'text-sky-300' },
  { icon: Users, label: 'Collaborative', desc: 'I work well on teams', color: 'text-violet-300' },
];

export default function About() {
  const sectionRef = useSectionAchievement('character_bio');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <FramedSection id="about" tone="b" sectionRef={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="About Me" subtitle="Character Bio" />

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-200/25 to-violet-300/25 blur-2xl" />
              <img
                src={profileImg}
                alt="Ishmam Abtahi"
                className="relative w-full object-cover drop-shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-violet-300/20 rounded-full blur-xl pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map(s => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-slate-200 mt-1 font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-slate-200 leading-relaxed">
              I&apos;m a <span className="text-sky-300 font-medium">QuestBridge Scholar</span> studying
              Computer & Electrical Engineering at the{' '}
              <span className="text-sky-300 font-medium">University of Virginia</span> (Class of 2028),
              and I&apos;m minoring in General Business.
            </p>
            <p className="text-slate-200 leading-relaxed">
              Right now I&apos;m a{' '}
              <span className="text-rose-300 font-medium">Security Engineering Intern at GuidePoint Security</span>,
              where I build segmented networks and inline intrusion detection. I&apos;m also a{' '}
              <span className="text-violet-300 font-medium">Cybersecurity Analyst Intern at UVA ITS</span>,
              where I go through 500+ security events a week in Splunk.
            </p>
            <p className="text-slate-200 leading-relaxed">
              On top of that, I&apos;m a{' '}
              <span className="text-amber-300 font-medium">Researcher at Dart Labs</span>, UVA&apos;s
              cybersecurity research lab. I study incident triage workflows and how efficient SOC
              tools are, which ties together the two things I care about most: secure software and
              real-world threat analysis.
            </p>
            <p className="text-slate-200 leading-relaxed">
              Next summer, I&apos;ll be joining{' '}
              <span className="text-emerald-300 font-medium">Capital One as a Cybersecurity Intern</span>.
            </p>

            <div className="pt-4">
              <p className="text-slate-300 font-semibold mb-4">What I bring</p>
              <div className="grid grid-cols-2 gap-3">
                {traits.map(t => (
                  <div key={t.label} className="glass-card rounded-xl p-4">
                    <t.icon className={`${t.color} mb-2`} size={20} />
                    <div className="font-semibold text-white text-sm">{t.label}</div>
                    <div className="text-xs text-slate-300 mt-0.5 leading-snug">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </FramedSection>
  );
}
