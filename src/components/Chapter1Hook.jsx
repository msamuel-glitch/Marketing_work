import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter1Hook() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          The Hook
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
          We built a growth hack. <br />
          <span className="text-slate-500">Here is what it does.</span>
        </h1>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg mb-8">
          The Albert School directive is clear: start with the hook. Before we pitch the strategy, we force the target audience to interact with the raw financial cost of their problem.
        </p>
        <div className="flex items-center gap-4">
          <div className="h-px bg-slate-700 flex-grow" />
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Try the live calculator 👉</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600/30 to-emerald-500/30 blur-2xl rounded-xl z-0" />
        
        {/* Iframe Container */}
        <div className="glass-card rounded-xl overflow-hidden relative z-10 aspect-[4/5] md:aspect-square flex items-center justify-center p-2">
           <iframe 
             src="https://doodle-roi-calculator.vercel.app/" 
             className="w-full h-full rounded-lg bg-transparent"
             frameBorder="0"
             title="Doodle ROI Calculator"
           />
        </div>
      </motion.div>
    </div>
  );
}
