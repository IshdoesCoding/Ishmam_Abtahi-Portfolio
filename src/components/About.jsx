import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Shield, Lightbulb, Users } from 'lucide-react';
import profileImg from '../assets/ish_final.png';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stats = [
  { value: '4+', label: 'Projects Shipped' },
  { value: '200+', label: 'App Users' },
  { value: '500+', label: 'Events Analyzed' },
  { value: "UVA '28", label: 'QuestBridge Scholar' },
];

const traits = [
  { icon: Code2, label: 'Clean Code', desc: 'Writing maintainable, scalable solutions', color: 'text-sky-400' },
  { icon: Shield, label: 'Security First', desc: 'Building with defense in mind from day one', color: 'text-violet-400' },
  { icon: Lightbulb, label: 'Fast Learner', desc: 'Picking up new technologies rapidly', color: 'text-sky-400' },
  { icon: Users, label: 'Collaborative', desc: 'Working effectively in team environments', color: 'text-violet-400' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-padding bg-[#080d1e]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">About Me</h2>
          <p className="text-slate-500 text-sm font-mono">// who I am</p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-sky-400/20 to-violet-400/20 blur-xl" />
              <img
                src={profileImg}
                alt="Ishmam Abtahi"
                className="relative rounded-2xl w-full object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-violet-400/20 rounded-full blur-xl pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map(s => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">{s.label}</div>
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
            <p className="text-slate-400 leading-relaxed">
              I&apos;m a <span className="text-sky-400 font-medium">QuestBridge Scholar</span> studying
              Computer & Electrical Engineering at the{' '}
              <span className="text-sky-400 font-medium">University of Virginia</span> (Class of 2028),
              with a minor in General Business.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I currently work as a{' '}
              <span className="text-violet-400 font-medium">Cybersecurity Analyst Intern at UVA ITS</span>,
              analyzing 500+ weekly security events in Splunk, and as a developer at the UVA School
              of Data Science where I built a web app used by 50+ employees daily.
            </p>
            <p className="text-slate-400 leading-relaxed">
              This summer I&apos;m joining{' '}
              <span className="text-rose-400 font-medium">GuidePoint Security</span> as a Cybersecurity
              Engineering Intern, bringing together my passion for secure software and real-world
              threat analysis.
            </p>

            <div className="pt-4">
              <p className="text-slate-300 font-semibold mb-4">What I bring</p>
              <div className="grid grid-cols-2 gap-3">
                {traits.map(t => (
                  <div key={t.label} className="glass-card rounded-xl p-4">
                    <t.icon className={`${t.color} mb-2`} size={20} />
                    <div className="font-semibold text-white text-sm">{t.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-snug">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
