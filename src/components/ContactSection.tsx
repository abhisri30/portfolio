import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Copy, Mail, MapPin, Phone, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    opportunityType: 'Full-Time SDE / AI Engineer',
    message: '',
  });

  // Formspree Integration with form key 'xdegapyl'
  const [state, handleSubmit, reset] = useForm('xdegapyl');

  const roleOptions = [
    'Full-Time SDE / AI',
    'Frontend / React',
    'Backend / FastAPI',
    'Consulting / Project',
  ];

  useEffect(() => {
    if (state.succeeded) {
      sound.playSuccess();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#EA580C', '#F97316', '#FBBF24', '#18181B'],
      });
    }
  }, [state.succeeded]);

  const copyToClipboard = () => {
    sound.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    sound.playClick();
    await handleSubmit(e);
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-orange-100/50 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-300 bg-orange-50 text-orange-800 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
          <Mail className="w-3.5 h-3.5 text-orange-600" />
          <span>06 // Initiate Transmission</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
          Let’s Build Something <br />
          <span className="text-outline-dark hover:text-orange-600 transition-colors">Remarkable Together</span>
          <span className="text-orange-600">.</span>
        </h2>
        <p className="text-zinc-600 text-sm max-w-xl mt-3 font-sans leading-relaxed">
          Open to full-time Software Development Engineer (SDE), Frontend Architect, and AI Engineering roles. Feel free to send a message or connect directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info & Social Hub */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Email Box */}
            <div className="glass-panel bg-white/90 p-6 rounded-3xl border border-zinc-200/90 hover:border-orange-400/50 transition-all shadow-sm">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-bold">
                Direct Electronic Mail
              </span>
              <div className="flex items-center justify-between gap-3 bg-zinc-50 p-3 rounded-2xl border border-zinc-200">
                <span className="font-mono text-xs sm:text-sm text-zinc-900 select-all font-bold truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={copyToClipboard}
                  onMouseEnter={() => sound.playHover()}
                  className="p-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 shadow-sm transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <p className="text-xs font-mono text-emerald-600 mt-2 font-medium">
                  ✓ Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Location & Status */}
            <div className="glass-panel bg-white/90 p-6 rounded-3xl border border-zinc-200/90 shadow-sm">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-bold">
                Location & Status
              </span>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-200/70">
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    Base Location:
                  </span>
                  <span className="font-mono text-zinc-900 font-semibold">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-200/70">
                  <span className="flex items-center gap-1.5 text-zinc-500">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    Phone Contact:
                  </span>
                  <span className="font-mono text-zinc-900 font-semibold">{PERSONAL_INFO.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3 font-bold">
              Professional Profiles
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/abhisri30' },
                { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com/in/abhinayasri' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-white hover:bg-zinc-50 text-zinc-800 hover:text-orange-600 border border-zinc-200 shadow-sm transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-orange-600" />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 glass-panel bg-white/95 p-6 sm:p-10 rounded-3xl border border-zinc-200/90 shadow-md relative">
          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 font-['Syne']">
                Message Dispatched via Formspree
              </h3>
              <p className="text-zinc-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you{formData.name ? `, ${formData.name}` : ''}! Your inquiry has been routed into Abhinayasri's verified inbox via Formspree. Expect a response shortly.
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  reset();
                  setFormData({
                    name: '',
                    email: '',
                    opportunityType: 'Full-Time SDE / AI Engineer',
                    message: '',
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-mono text-orange-700 border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors font-bold"
              >
                Send Another Dispatch
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Hidden field passing selected opportunity type to Formspree */}
              <input type="hidden" name="opportunityType" value={formData.opportunityType} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-zinc-700 mb-2 font-bold">
                    YOUR NAME *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-orange-500 focus:bg-white text-zinc-900 text-sm placeholder:text-zinc-400 outline-none transition-all font-sans"
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-xs text-rose-600 font-mono mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-zinc-700 mb-2 font-bold">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-orange-500 focus:bg-white text-zinc-900 text-sm placeholder:text-zinc-400 outline-none transition-all font-sans"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-xs text-rose-600 font-mono mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-700 mb-2 font-bold">
                  OPPORTUNITY / INQUIRY TYPE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {roleOptions.map((opt) => {
                    const isSelected = formData.opportunityType === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => {
                          sound.playClick();
                          setFormData({ ...formData, opportunityType: opt });
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all text-center ${
                          isSelected
                            ? 'bg-orange-50 text-orange-800 border-orange-400 font-bold shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-white'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-zinc-700 mb-2 font-bold">
                  MESSAGE / ROLE DETAILS *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Share details regarding your team, project specifications, or engineering opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-orange-500 focus:bg-white text-zinc-900 text-sm placeholder:text-zinc-400 outline-none transition-all font-sans resize-none"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-xs text-rose-600 font-mono mt-1"
                />
              </div>

              {state.errors && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Unable to dispatch message to Formspree. Please check the fields or email directly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={state.submitting}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-zinc-900 hover:bg-orange-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {state.submitting ? (
                  <span>Transmitting via Formspree...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>Send Message to Abhinaya</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
