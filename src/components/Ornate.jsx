import { motion } from 'framer-motion';
import corner from '../assets/ornaments/corner.png';
import flourish from '../assets/ornaments/flourish.png';
import side from '../assets/ornaments/side.png';

// corner.png is the bottom-right ornament; the others are mirrors of it
const corners = [
  { pos: { top: 0, left: 0 }, transform: 'scale(-1,-1)' },
  { pos: { top: 0, right: 0 }, transform: 'scale(1,-1)' },
  { pos: { bottom: 0, left: 0 }, transform: 'scale(-1,1)' },
  { pos: { bottom: 0, right: 0 }, transform: 'none' },
];

/**
 * White filigree frame, drawn inside a `relative` parent.
 * inset: CSS inset of the frame from the parent's edges
 * size:  corner ornament size in px
 * line:  border thickness in px
 * sides: show the long side flourishes (for tall sections, desktop only)
 */
export function OrnateFrame({ inset = 16, size = 96, line = 3, sides = false, opacity = 0.9, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ inset, opacity }}
    >
      <div className="absolute inset-0" style={{ border: `${line}px solid rgba(255,255,255,0.95)` }} />
      <div className="absolute" style={{ inset: line }}>
        {corners.map((c, i) => (
          <img
            key={i}
            src={corner}
            alt=""
            className="absolute select-none"
            style={{ ...c.pos, width: size, height: size, transform: c.transform }}
            draggable={false}
          />
        ))}
        {sides && (
          <>
            <img src={side} alt="" draggable={false} className="hidden lg:block absolute top-1/2 left-0 select-none" style={{ height: 'min(46%, 420px)', transform: 'translateY(-50%) scaleX(-1)' }} />
            <img src={side} alt="" draggable={false} className="hidden lg:block absolute top-1/2 right-0 select-none" style={{ height: 'min(46%, 420px)', transform: 'translateY(-50%)' }} />
          </>
        )}
      </div>
    </div>
  );
}

export function Flourish({ className = '', flip = false }) {
  return (
    <img
      src={flourish}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`select-none mx-auto ${className}`}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="text-center mb-14"
    >
      <Flourish className="h-5 md:h-7 mb-4 opacity-90" flip />
      <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text mb-3 tracking-wide">{title}</h2>
      <p className="text-amber-200/90 text-xs md:text-sm font-mono uppercase tracking-[0.25em] mb-4">{subtitle}</p>
      <Flourish className="h-5 md:h-7 opacity-90" />
    </motion.div>
  );
}

// Section shell: indigo background + ornate frame around the content
export function FramedSection({ id, tone = 'a', sides = false, children, sectionRef }) {
  const bg = tone === 'a' ? 'bg-black' : 'bg-[#07070a]';
  return (
    <section id={id} ref={sectionRef} className={`relative ${bg} section-padding`}>
      <OrnateFrame className="hidden md:block" inset={24} size={120} sides={sides} />
      <OrnateFrame className="md:hidden" inset={10} size={64} line={2} />
      <div className="relative">{children}</div>
    </section>
  );
}
