import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter4Channels() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* Content on the right */}
      <div className="hidden lg:block lg:col-span-5" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-500/20 border border-slate-500/30 text-slate-300 text-[10px] font-bold uppercase tracking-widest">
          Acquisition Channels
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1]">
          Interrupting the pattern. <br/>
          <span className="text-slate-400">Because nobody Googles this.</span>
        </h2>

        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg">
          We cannot rely on cheap inbound search. We must build demand outbound. We target the exact job title "Solutions Architect" on LinkedIn and surface the financial cost of their current workflow.
        </p>

        {/* TOF Ad Mockup */}
        <div className="glass-card p-0 border-t-4 border-slate-600/50 mt-8 relative overflow-hidden group">
          <div className="bg-black/80 p-6 flex items-center justify-center border-b border-slate-700">
            <div className="bg-red-500/10 border border-red-500 text-red-500 font-mono text-sm px-4 py-2 flex items-center gap-2 rounded">
              <span className="animate-pulse">⚠️</span> FATAL ERROR: C-Suite Availability Sync Failed
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">You engineered a million-dollar solution. Don't let a personal calendar link kill the deal.</h3>
            <p className="text-sm text-slate-400">
              The biggest bottleneck in your pipeline isn't the technical validation. It's the two weeks you lose herding engineers and buyer-side executives into the same call.
            </p>
            <button className="w-full mt-4 py-3 bg-blue-600/20 text-blue-400 font-bold text-sm rounded border border-blue-500/30 hover:bg-blue-600/30 transition-colors">
              Calculate My Loss →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
