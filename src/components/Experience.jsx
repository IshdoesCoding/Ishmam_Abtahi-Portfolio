import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Shield, Code, Users, FlaskConical, Briefcase, RotateCcw, Lock, Check } from 'lucide-react';
import { FramedSection, SectionHeader, OrnateFrame } from './Ornate';
import { useGame } from '../game/GameContext';

// Drop logo files into src/assets/logos/ (png, svg, webp or jpg).
// The file name (without extension) must match an entry's `logo` field.
const logoFiles = import.meta.glob('../assets/logos/*.{png,svg,webp,jpg,jpeg}', { eager: true, import: 'default' });
const logos = Object.fromEntries(
  Object.entries(logoFiles).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url])
);

const entries = [
  {
    icon: Briefcase,
    accent: 'emerald',
    period: 'Summer 2027',
    badge: 'Incoming',
    title: 'Cybersecurity Intern',
    type: 'Internship',
    org: 'Capital One',
    location: 'Plano, TX',
    logo: 'capital-one',
    logoBare: true,
    bullets: [],
  },
  {
    icon: Shield,
    accent: 'rose',
    period: 'Jun 2026 to Present',
    badge: 'Current',
    title: 'Security Engineering Intern',
    type: 'Internship',
    org: 'GuidePoint Security',
    location: 'Reston, VA',
    logo: 'guidepoint',
    bullets: [
      "Designed and deployed a dual-firewall (OPNsense) setup that segments the network using NIST Cybersecurity Framework least-privilege principles. It isolates a deliberately vulnerable DMZ (Vulhub) from the SIEM, Forensic, and User VLANs with directional pf rules on both firewalls",
      "Deployed Suricata as an inline IDS on the perimeter firewall's WAN interface. It alerts on malicious traffic mapped to MITRE ATT&CK techniques using the Emerging Threats Open ruleset. Also built a new Ansible firewall module to automate deployment on both firewalls",
      "Patched the team's Python deployment CLI so it can detect and configure OPNsense/FreeBSD hosts. Also caught and fixed 5 bugs before rollout that would've caused failed or locked-out deployments, by checking our setup against the official documentation",
    ],
  },
  {
    icon: FlaskConical,
    accent: 'amber',
    period: 'Jul 2026 to Present',
    badge: 'Current',
    title: 'Researcher',
    type: 'Research',
    org: 'Dart Labs (UVA Cybersecurity Research Lab)',
    location: 'Charlottesville, VA',
    logo: 'dart-labs',
    logoBare: true,
    bullets: [
      'Researching incident triage workflows and detection pipeline performance for university security operations, as part of the Forensic Analysis and SOC Efficiency group',
      "Using digital forensics and log analysis to measure how efficient SOC tools are, and adding those findings to the lab's ongoing research",
    ],
  },
  {
    icon: Shield,
    accent: 'violet',
    period: 'Sep 2025 to Present',
    badge: null,
    title: 'Cybersecurity Analyst Intern',
    type: 'Internship',
    org: 'University of Virginia ITS',
    location: 'Charlottesville, VA',
    logo: 'uva-its',
    logoBare: true,
    bullets: [
      'Analyzed 500+ security events a week in Splunk and used network forensics to cut false positives by 20%. Helped triage 100+ security incidents in a production enterprise environment',
      'Worked with 6 interns on incident documentation and escalation across cloud and on-prem environments, which improved response efficiency by 40% and cross-team coordination by 60%',
      'Partnered with 5 senior analysts to improve detection workflows and monitoring',
    ],
  },
  {
    icon: Code,
    accent: 'sky',
    period: 'Sep 2024 to May 2026',
    badge: null,
    title: 'Student Admin & Developer',
    type: 'Campus Role',
    org: 'UVA School of Data Science',
    location: 'Charlottesville, VA',
    logo: 'uva-data-science',
    logoBare: true,
    bullets: [
      'Built and owned a web app end to end that ~50 employees and executive leadership use every day to track expenses and travel. It fully replaced manual reporting and sped up delivery timelines by 30%',
      'Turned stakeholder requirements into technical solutions that scale, balancing usability and data accuracy across departments. Also managed the full IT asset inventory',
    ],
  },
  {
    icon: Users,
    accent: 'emerald',
    period: 'Apr 2025 to Present',
    badge: null,
    title: 'President',
    type: 'Leadership',
    org: 'Students Who Advance in Technology (SWAT)',
    location: 'Charlottesville, VA',
    logo: 'swat',
    logoBare: true,
    bullets: [
      'Founded and lead a 20+ member tech consulting club that partners with 3 UVA departments each semester. We build real automation and software, from scoping all the way to a live presentation',
      'Led a team that built a computer lab for a local nonprofit youth development center. We sourced and refurbished 15+ recycled computers and set up the whole lab, including networking, OS imaging, and software. It now serves 50+ youth',
      'Delivered Data Science School projects for conference scheduling and expense report automation. Also scoped a new UVA ITS project to build a RAG chatbot over 100+ pages of internal security docs, aiming to cut analyst lookup time by 50%',
    ],
  },
  {
    icon: GraduationCap,
    accent: 'sky',
    period: 'Aug 2024 to May 2028',
    badge: null,
    title: 'B.S. Computer & Electrical Engineering',
    type: 'Education',
    org: 'University of Virginia',
    location: 'QuestBridge Scholar',
    logo: 'uva',
    logoBare: true,
    bullets: [
      'Minor in General Business. Coursework includes Data Structures & Algorithms, Intro to Cybersecurity, Computer Systems & Org, Digital Logic Design, Signals & Systems, and Discrete Math',
      'Certifications: CompTIA Security+, AWS Certified AI Practitioner, Google Professional Cybersecurity, Microsoft Azure AZ-900, AWS ML Foundation, and Udacity Gen AI (AWS)',
      'Active in SWAT, engineering communities, and HackTheBox CTF competitions',
    ],
  },
];

const accentMap = {
  sky: 'text-sky-200',
  violet: 'text-violet-200',
  emerald: 'text-emerald-200',
  rose: 'text-rose-200',
  amber: 'text-amber-200',
};

const cardId = (e) => `${e.title}|${e.org}`;

function Emblem({ e }) {
  const src = e.logo && logos[e.logo];
  const name = e.org;
  if (src && e.logoBare) {
    return <img src={src} alt={`${name} logo`} className="w-20 h-20 object-cover rounded-2xl drop-shadow-lg" draggable={false} />;
  }
  if (src) {
    return (
      <div className="w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg">
        <img src={src} alt={`${name} logo`} className="max-w-full max-h-full object-contain" draggable={false} />
      </div>
    );
  }
  return (
    <div className="w-20 h-20 rounded-full border-2 border-amber-200/60 bg-white/10 flex items-center justify-center shadow-lg">
      <e.icon size={34} className={accentMap[e.accent]} />
    </div>
  );
}

function ExperienceCard({ e, i, total }) {
  const [flipped, setFlipped] = useState(false);
  const { collected, collectCard } = useGame();
  const id = cardId(e);
  const isCollected = collected.includes(id);
  const { org, location } = e;
  const tilt = i % 2 === 0 ? 1.2 : -1.2;

  const toggle = () => {
    setFlipped(f => !f);
    collectCard(id, total);
  };

  const onKeyDown = (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      toggle();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
      className="w-[290px] sm:w-[310px] h-[470px]"
      style={{ perspective: 1400 }}
    >
      {/* Idle float */}
      <motion.div
        className="w-full h-full"
        animate={{ y: [0, -12, 0], rotate: [tilt, -tilt, tilt] }}
        transition={{ duration: 5 + (i % 3) * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
      >
        <motion.div
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`${e.title}, ${org}. ${flipped ? 'Showing details, press to flip back' : 'Press to see details'}`}
          onClick={toggle}
          onKeyDown={onKeyDown}
          whileHover={{ scale: 1.04, y: -6 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full h-full cursor-pointer outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          <motion.div
            className="card-3d relative w-full h-full"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 130, damping: 18 }}
          >
            {/* Front */}
            <div className="card-face absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-b from-[#5a64a0] to-[#353d6a] border border-white/15 shadow-[0_24px_50px_rgba(20,24,50,0.5)]">
              <OrnateFrame inset={10} size={46} line={2} />
              <div className="relative h-full flex flex-col items-center text-center px-6 pt-9 pb-8">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em]">
                  <span className="text-amber-200">{e.type}</span>
                  {e.badge && (
                    <span className="px-2 py-0.5 rounded-full border border-amber-200/50 text-amber-100 bg-amber-200/10">{e.badge}</span>
                  )}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-5">
                  <Emblem e={e} />
                  <div>
                    <h3 className="font-display text-lg font-bold text-white leading-snug">{e.title}</h3>
                    <p className="text-sm text-slate-100 mt-1.5">{org}</p>
                    {location && <p className="text-xs text-slate-300 mt-0.5">{location}</p>}
                  </div>
                  <span className={`text-xs font-mono ${accentMap[e.accent]}`}>{e.period}</span>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-200 flex items-center gap-1.5">
                  {isCollected ? (
                    <><Check size={12} className="text-amber-200" /> Collected</>
                  ) : (
                    <><RotateCcw size={12} /> Click to flip</>
                  )}
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="card-face card-back absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-b from-[#363e6c] to-[#252a4e] border border-amber-200/25 shadow-[0_24px_50px_rgba(20,24,50,0.5)]">
              <OrnateFrame inset={10} size={46} line={2} opacity={0.55} />
              <div className="relative h-full flex flex-col px-7 pt-10 pb-9">
                <div className="text-center mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-200">{e.period}</div>
                  <h3 className="font-display text-base font-bold text-white leading-snug mt-1">{e.title}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{org}</p>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto thin-scroll pr-1.5">
                  {e.bullets.length > 0 ? (
                    <ul className="space-y-3">
                      {e.bullets.map(b => (
                        <li key={b} className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-100">
                          <span className="mt-[7px] w-1.5 h-1.5 rotate-45 bg-amber-200 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                      <Lock size={28} className="text-amber-200" />
                      <p className="font-display text-white">Quest begins {e.period}</p>
                      <p className="text-xs text-slate-300 max-w-[200px]">Details unlock once the internship starts.</p>
                    </div>
                  )}
                </div>

                <div className="text-center text-[10px] font-mono uppercase tracking-[0.22em] text-slate-300 mt-4 flex items-center justify-center gap-1.5">
                  <RotateCcw size={12} /> Click to flip back
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const { collected } = useGame();
  const ids = entries.map(cardId);
  const count = ids.filter(id => collected.includes(id)).length;

  return (
    <FramedSection id="experience" tone="b" sides>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Experience" subtitle="Card Collection" />

        <div className="flex flex-col items-center gap-3 -mt-4 mb-14">
          <p className="text-sm text-slate-200">Click a card to flip it over and see the details.</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              {ids.map(id => (
                <span
                  key={id}
                  className={`w-2.5 h-2.5 rotate-45 transition-colors duration-300 ${collected.includes(id) ? 'bg-amber-200' : 'border border-amber-200/60'}`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-amber-200">{count}/{ids.length} collected</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
          {entries.map((e, i) => (
            <ExperienceCard key={cardId(e)} e={e} i={i} total={entries.length} />
          ))}
        </div>
      </div>
    </FramedSection>
  );
}
