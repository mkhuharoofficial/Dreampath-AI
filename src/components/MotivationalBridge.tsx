import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import CareerMotivation from './CareerMotivation';
import { LogoImage } from './LogoImage';

interface MotivationalBridgeProps {
  onContinue: () => void;
}

export default function MotivationalBridge({ onContinue }: MotivationalBridgeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-6 relative overflow-hidden py-10">
      {/* Subtle glowing layout circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Animated Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-6"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 bg-white border border-slate-200/80 rounded-3xl p-3 shadow-lg flex items-center justify-center relative z-10 mx-auto">
          <LogoImage 
            className="w-full h-full object-contain"
          />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-3xl blur-xl -z-10"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl relative z-10"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-xs uppercase tracking-widest mb-4">
          <Sparkles size={13} className="text-teal-500 animate-spin" /> Career Compass Active
        </span>

        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight font-display">
          Discover your <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent italic">Dream Path</span>
        </h2>

        {/* Motivational Quotes Carousel */}
        <CareerMotivation />

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          id="continue-journey-btn"
          className="mt-6 px-12 py-5 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/15 hover:shadow-indigo-600/30 transition-all text-base uppercase tracking-widest border border-indigo-400/20"
        >
          Explore All Careers
        </motion.button>
      </motion.div>
    </div>
  );
}


