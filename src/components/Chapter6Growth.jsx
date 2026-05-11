import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter6Growth() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* Spacer */}
      <div className="hidden lg:block lg:col-span-5" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
          Sustainable Growth
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1]">
          The product is <br/>
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">a distribution vector.</span>
        </h2>

        <div className="glass-card p-8 border-t-4 border-cyan-500/50">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-700/50 pb-4">
            The Viral Loop Mechanism
          </h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-slate-300">1</div>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                We acquire <strong className="text-white">1 Solutions Architect</strong> via paid LinkedIn ad at a $140 CAC.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-slate-300">2</div>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                They immediately send Doodle multi-party polls to their clients — the buyer's CTO, Security Lead, and Project Manager.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center font-bold text-cyan-400">3</div>
              <p className="text-sm text-cyan-100 font-medium leading-relaxed">
                <strong className="text-cyan-400">4–5 high-level external stakeholders</strong> experience Doodle's group scheduling firsthand, at zero acquisition cost to us.
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-black/40 rounded border border-slate-700/50 flex justify-between items-center">
            <div className="text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Month 3 CAC</div>
              <div className="text-xl font-mono text-white">$140</div>
            </div>
            <div className="text-slate-600">→</div>
            <div className="text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Month 6 CAC</div>
              <div className="text-xl font-mono text-white">$110</div>
            </div>
            <div className="text-slate-600">→</div>
            <div className="text-center">
              <div className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mb-1">Month 12 CAC</div>
              <div className="text-xl font-mono text-cyan-400 font-bold">$85</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
