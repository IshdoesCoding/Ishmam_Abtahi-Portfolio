import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const socials = [
  {
    label: 'GitHub',
    handle: '@IshdoesCoding',
    href: 'https://github.com/IshdoesCoding',
    icon: GithubIcon,
    color: 'text-slate-300 hover:text-white',
    bg: 'hover:bg-white/5',
  },
  {
    label: 'LinkedIn',
    handle: 'ishmam-abtahi',
    href: 'https://linkedin.com/in/ishmam-abtahi',
    icon: LinkedinIcon,
    color: 'text-sky-400 hover:text-sky-300',
    bg: 'hover:bg-sky-400/5',
  },
  {
    label: 'Email',
    handle: 'ishmamabtahi17@gmail.com',
    href: 'mailto:ishmamabtahi17@gmail.com',
    icon: Mail,
    color: 'text-violet-400 hover:text-violet-300',
    bg: 'hover:bg-violet-400/5',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:ishmamabtahi17@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding bg-[#080d1e]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Get In Touch</h2>
          <p className="text-slate-500 text-sm font-mono">// let&apos;s build something together</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-mono">Available for work</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                I&apos;m actively looking for internships and co-op opportunities in software
                engineering or cybersecurity. Let&apos;s connect!
              </p>
            </div>

            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className={`glass-card rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 ${s.bg}`}
              >
                <div className={`${s.color} flex-shrink-0 transition-colors`}>
                  <s.icon size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-mono">{s.label}</div>
                  <div className={`text-sm font-medium transition-colors ${s.color}`}>{s.handle}</div>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-slate-500 font-mono mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 font-mono mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-mono mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.06] transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-[#050a18] bg-gradient-to-r from-sky-400 to-violet-400 hover:from-sky-300 hover:to-violet-300 transition-all duration-200 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
