import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter3Solution() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* Content on the left */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-6 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
          Product-Market Fit
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1]">
          Multi-party efficiency <br/>
          <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">is deal velocity.</span>
        </h2>

        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg">
          The fix is not a new habit. It is a different tool. Multi-party scheduling eliminates this entirely. No follow-up emails. No round-two availability requests.
        </p>

        {/* Ad Mockup */}
        <div className="glass-card p-6 border-t-4 border-emerald-500/50 mt-8 relative overflow-hidden group">
          <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            MOF Ad Execution
          </div>
          
          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-bold text-white">Stop coordinating executives by email.</h3>
            <p className="text-sm text-slate-400">
              You already know the number. Finish your ROI calculation and get your scoping calls booked in three clicks with Doodle's multi-party polling.
            </p>
            
            <div className="bg-slate-900/80 rounded border border-slate-700/50 p-4 font-mono text-xs mt-4">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Time lost: 3d 4h
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Deal Scheduled — 4 minutes
              </div>
            </div>
            
            <button className="w-full mt-4 py-3 bg-emerald-600/20 text-emerald-400 font-bold text-sm rounded border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors">
              Resume My Calculation →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Spacer for the background image on the right */}
      <div className="hidden lg:block lg:col-span-6" />
    </div>
  );
}
