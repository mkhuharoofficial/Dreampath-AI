import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Book, Sparkles, Compass } from 'lucide-react';
import { DEGREES } from '../data';
import { LogoImage } from './LogoImage';

interface FullGuideProps {
  onBack: () => void;
}

export default function FullGuide({ onBack }: FullGuideProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in zoom-in-95 duration-700 relative text-left">
      <button 
        onClick={onBack}
        className="mb-12 group flex items-center gap-2 text-slate-600 hover:text-slate-900 font-extrabold transition-all uppercase tracking-widest text-xs py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-indigo-600" /> Exit Manual
      </button>

      <div className="text-center mb-20 relative">
        <div className="absolute inset-0 -top-12 bg-indigo-500/5 blur-[120px] pointer-events-none" />
        <div className="flex justify-center mb-6 relative z-10">
          <LogoImage className="h-20 md:h-24 w-auto object-contain" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase mb-6 font-display text-slate-900 relative z-10 leading-none">
          The <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">Master Guide</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium tracking-wide max-w-xl mx-auto relative z-10 leading-relaxed">
          2026 Edition — Comprehensive Career Manual and Structural Roadmap System for Pakistan
        </p>
      </div>

      <div className="space-y-16 relative">
        {DEGREES.map((degree) => (
          <div key={degree.id} className="border-t border-slate-200 pt-12 group">
             <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
               <div>
                  <span className="text-indigo-600 font-extrabold uppercase tracking-[0.25em] text-[10px] block mb-2">{degree.domain} Domain</span>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 uppercase tracking-tight font-display group-hover:text-indigo-600 transition-colors">
                    {degree.title}
                  </h2>
               </div>
               <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-extrabold uppercase tracking-widest text-[10px] shadow-sm">
                  {degree.duration}
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700">
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                   <h3 className="font-extrabold uppercase tracking-widest text-[10px] mb-4 text-indigo-600 font-display flex items-center gap-2">
                     <Sparkles size={12} /> Market Dynamics
                   </h3>
                   <div className="space-y-3">
                     {degree.marketReality.map((r, i) => (
                       <p key={i} className="font-semibold text-xs leading-relaxed text-slate-500">• {r}</p>
                     ))}
                   </div>
                </div>
                
                <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="font-extrabold uppercase tracking-widest text-[10px] mb-4 text-indigo-600 font-display flex items-center gap-2">
                      <Compass size={12} /> Core Competencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {degree.subjects.map((s, i) => (
                        <span key={i} className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-600 shadow-xs">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-gradient-to-r from-indigo-50/50 to-teal-50/30 border border-indigo-100 text-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
                   <h3 className="font-extrabold uppercase tracking-widest text-[10px] mb-3 text-indigo-600 font-display">Recommended Strategic Career Path</h3>
                   <p className="text-base md:text-lg font-semibold italic text-slate-700 leading-relaxed">&quot;{degree.strategy.join(' → ')}&quot;</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 md:p-14 bg-gradient-to-br from-indigo-50 to-teal-50/50 border border-indigo-100 rounded-[3rem] text-center relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-6 tracking-tight font-display text-slate-800 relative z-10 leading-none">Ready to start?</h2>
          <button 
            onClick={onBack} 
            className="bg-indigo-600 text-white px-8 py-4.5 rounded-2xl font-extrabold uppercase tracking-widest hover:bg-indigo-500 transition-all text-xs relative z-10 shadow-md shadow-indigo-600/10"
          >
            Go to Dashboard
          </button>
      </div>
    </div>
  );
}
