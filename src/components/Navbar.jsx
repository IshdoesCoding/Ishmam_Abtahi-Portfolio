import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import CV from '../assets/Ishmam_Abtahi_Resume.pdf';

const links = ['About', 'Projects', 'Experience', 'Skills', 'Contact'];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50 glass-card border-b border-white/[0.07]"
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="gradient-text font-bold text-xl font-mono tracking-tight select-none">IA</a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative group text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sky-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={CV}
            download
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-sky-400/10 text-sky-400 hover:bg-sky-400/20 border border-sky-400/20 transition-all duration-200"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/[0.07] bg-[#080d1e]"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href={CV}
                download
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-sky-400/10 text-sky-400 border border-sky-400/20 w-fit mt-1"
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
