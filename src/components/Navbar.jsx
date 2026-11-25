import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import CV from '../assets/Ishmam_Abtahi_Resume.pdf';
import { useGame } from '../game/GameContext';

const links = ['About', 'Projects', 'Experience', 'Skills', 'Contact'];

// Tracks which section is in the middle of the screen
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const els = ['hero', ...ids].map(id => document.getElementById(id)).filter(Boolean);
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = links.map(l => l.toLowerCase());

function Diamond({ className = '' }) {
  return <span aria-hidden="true" className={`inline-block w-1.5 h-1.5 rotate-45 bg-amber-200 ${className}`} />;
}

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [open, setOpen] = useState(false);
  const { unlock } = useGame();
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80 || open);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY, open]);

  return (
    <motion.nav
      className="fixed top-3 inset-x-3 sm:top-4 z-50 flex justify-center pointer-events-none"
      animate={{ y: visible ? 0 : -110 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="pointer-events-auto w-full max-w-4xl flex flex-col items-end md:items-stretch">
        <div className="relative flex items-center justify-between h-14 px-2 md:pl-6 rounded-full bg-[#2b3157]/85 backdrop-blur-md border border-amber-200/30 shadow-[0_10px_30px_rgba(20,24,50,0.35)]">
          {/* inner hairline for a framed look */}
          <div aria-hidden="true" className="absolute inset-[3px] rounded-full border border-white/10 pointer-events-none" />

          <ul className="relative hidden md:flex flex-1 items-center justify-center gap-1">
            {links.map(link => {
              const id = link.toLowerCase();
              const isActive = active === id;
              return (
                <li key={link}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex flex-col items-center px-4 py-1.5 font-display text-[13px] tracking-[0.14em] uppercase transition-colors duration-200 ${isActive ? 'text-amber-200' : 'text-slate-100 hover:text-amber-100'}`}
                  >
                    {link}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1 w-1.5 h-1.5 rotate-45 bg-amber-200"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative flex items-center gap-2">
            <a
              href={CV}
              download
              onClick={() => unlock('recruiter_mode')}
              className="hidden md:flex items-center gap-1.5 h-10 px-5 rounded-full bg-amber-200 text-[#2b3157] text-sm font-semibold hover:bg-amber-100 transition-colors"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-amber-100 hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 w-[min(320px,calc(100vw-1.5rem))] rounded-2xl bg-[#2b3157]/95 backdrop-blur-md border border-amber-200/30 shadow-xl overflow-hidden"
            >
              <ul className="px-6 py-4 flex flex-col">
                {links.map(link => {
                  const id = link.toLowerCase();
                  const isActive = active === id;
                  return (
                    <li key={link}>
                      <a
                        href={`#${id}`}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 py-3 font-display text-sm tracking-[0.14em] uppercase border-b border-white/10 ${isActive ? 'text-amber-200' : 'text-slate-100'}`}
                      >
                        <Diamond className={isActive ? '' : 'opacity-30'} />
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="px-6 pb-5">
                <a
                  href={CV}
                  download
                  onClick={() => { unlock('recruiter_mode'); setOpen(false); }}
                  className="flex items-center justify-center gap-1.5 h-11 rounded-full bg-amber-200 text-[#2b3157] text-sm font-semibold"
                >
                  <Download size={14} />
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
