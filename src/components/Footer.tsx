import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white py-14 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center p-[1px] shadow-sm">
            <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-slate-900 tracking-wider">
              {PERSONAL_INFO.name} // ARCHITECT
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              © {new Date().getFullYear()} All rights reserved. Crafted with precision & math.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYS_STATUS: ALL NODES OPERATIONAL</span>
        </div>

        <button
          onClick={scrollToTop}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all shadow-sm group"
        >
          <span>ASCEND TO APEX</span>
          <ArrowUp className="w-3.5 h-3.5 text-indigo-600 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
