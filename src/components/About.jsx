import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import profileImg from '../assets/about_profile.webp';
import { FramedSection, SectionHeader } from './Ornate';
import { useSectionAchievement } from '../game/GameContext';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

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

          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-slate-200 text-[15px] md:text-[17px] leading-relaxed">
              I&apos;m a <span className="text-sky-300 font-medium">QuestBridge Scholar</span> studying
              Computer & Electrical Engineering at the{' '}
              <span className="text-sky-300 font-medium">University of Virginia</span> (Class of 2028),
              and I&apos;m minoring in General Business.
            </p>
            <p className="text-slate-200 text-[15px] md:text-[17px] leading-relaxed">
              Right now I&apos;m a{' '}
              <span className="text-rose-300 font-medium">Security Engineering Intern at GuidePoint Security</span>,
              where I build segmented networks and inline intrusion detection. I&apos;m also a{' '}
              <span className="text-violet-300 font-medium">Cybersecurity Analyst Intern at UVA ITS</span>,
              where I go through 500+ security events a week in Splunk.
            </p>
            <p className="text-slate-200 text-[15px] md:text-[17px] leading-relaxed">
              On top of that, I&apos;m a{' '}
              <span className="text-amber-300 font-medium">Researcher at Dart Labs</span>, UVA&apos;s
              cybersecurity research lab. I study incident triage workflows and how efficient SOC
              tools are, which ties together the two things I care about most: secure software and
              real-world threat analysis.
            </p>
            <p className="text-slate-200 text-[15px] md:text-[17px] leading-relaxed">
              Next summer, I&apos;ll be joining{' '}
              <span className="text-emerald-300 font-medium">Capital One as a Cybersecurity Intern</span>.
            </p>

          </motion.div>
        </div>
      </div>
    </FramedSection>
  );
}
