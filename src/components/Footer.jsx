import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

const socials = [
  { href: 'https://github.com/IshdoesCoding', icon: GithubIcon, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ishmam-abtahi-60601a324/', icon: LinkedinIcon, label: 'LinkedIn' },
  { href: 'mailto:ishmamabtahi17@gmail.com', icon: Mail, label: 'Email' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#47517d] border-t border-white/[0.07] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-slate-300 text-xs">
            &copy; {new Date().getFullYear()} Ishmam Abtahi. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={s.label}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>

        <button
          onClick={scrollTop}
          className="text-xs font-mono text-slate-300 hover:text-sky-300 transition-colors duration-200 flex items-center gap-1.5"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
