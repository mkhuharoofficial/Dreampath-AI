import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, RefreshCw, ChevronLeft, ChevronRight, Compass, Lightbulb, Trophy, Flame } from 'lucide-react';

export interface MotivationalQuote {
  id: number;
  text: string;
  author: string;
  category: string;
  tagline: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export const CAREER_QUOTES: MotivationalQuote[] = [
  {
    id: 1,
    text: "Your dream career isn't something you simply find — it's built brick by brick with curiosity, daily learning, and unwavering courage.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: "VISION & DESTINY",
    tagline: "Build Your Legacy",
    icon: Compass
  },
  {
    id: 2,
    text: "The future belongs to those who learn high-value skills today and combine them creatively to solve real-world problems.",
    author: "Robert Greene",
    category: "SKILLS & FUTURE",
    tagline: "Master Your Craft",
    icon: Lightbulb
  },
  {
    id: 3,
    text: "Don't follow where the path may lead. Go instead where there is no path and leave a trail for others to follow.",
    author: "Ralph Waldo Emerson",
    category: "LEADERSHIP",
    tagline: "Pioneer Your Trail",
    icon: Flame
  },
  {
    id: 4,
    text: "Every expert in the world was once a beginner. Step forward with confidence — every small effort compounds into greatness.",
    author: "Career Growth Principle",
    category: "GROWTH MINDSET",
    tagline: "Embrace The Journey",
    icon: Trophy
  },
  {
    id: 5,
    text: "Choose a direction that aligns with your true core strengths, and work will transform into a fulfilling lifelong mission.",
    author: "Confucius",
    category: "PASSION & PURPOSE",
    tagline: "Find Your Calling",
    icon: Sparkles
  }
];

export default function CareerMotivation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto advance every 7 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAREER_QUOTES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeQuote = CAREER_QUOTES[currentIndex];
  const IconComponent = activeQuote.icon;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAREER_QUOTES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAREER_QUOTES.length) % CAREER_QUOTES.length);
  };

  const handleShuffle = () => {
    let nextIdx = Math.floor(Math.random() * CAREER_QUOTES.length);
    if (nextIdx === currentIndex) {
      nextIdx = (currentIndex + 1) % CAREER_QUOTES.length;
    }
    setCurrentIndex(nextIdx);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-indigo-100/80 shadow-xl shadow-indigo-500/5 overflow-hidden group"
      >
        {/* Animated Background Light Glows */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-indigo-400/15 via-purple-400/10 to-teal-400/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-teal-400/15 via-blue-400/10 to-indigo-400/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-1000" />

        {/* Header Ribbon */}
        <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 shadow-xs flex items-center justify-center">
              <IconComponent size={18} className="animate-pulse text-indigo-600" />
            </span>
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-600 block leading-none">
                {activeQuote.category}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {activeQuote.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 p-1 rounded-2xl">
            <button
              onClick={handleShuffle}
              title="Shuffle Quote"
              className="p-1.5 rounded-xl hover:bg-white text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center"
            >
              <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
            </button>
            <div className="w-[1px] h-4 bg-slate-200 my-auto" />
            <button
              onClick={handlePrev}
              title="Previous Quote"
              className="p-1.5 rounded-xl hover:bg-white text-slate-400 hover:text-indigo-600 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              title="Next Quote"
              className="p-1.5 rounded-xl hover:bg-white text-slate-400 hover:text-indigo-600 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Quote Content Area with AnimatePresence */}
        <div className="min-h-[110px] md:min-h-[90px] flex flex-col justify-center relative z-10 my-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuote.id}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <Quote size={28} className="text-indigo-400/50 shrink-0 mt-0.5 rotate-180" />
                <p className="text-slate-800 font-serif text-lg md:text-xl font-medium leading-relaxed tracking-tight italic">
                  "{activeQuote.text}"
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pr-2">
                <span className="w-6 h-[2px] bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600 font-sans">
                  {activeQuote.author}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Progress Bar & Dots */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5">
            {CAREER_QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? 'w-7 bg-gradient-to-r from-indigo-600 to-teal-500'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1">
              <Sparkles size={11} className="text-amber-500 animate-spin" /> Career Motivation
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
