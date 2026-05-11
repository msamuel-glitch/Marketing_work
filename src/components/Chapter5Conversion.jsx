import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter5Conversion() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
          The Conversion Journey
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1]">
          Removing Friction. <br/>
          <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">The Nurture Sequence.</span>
        </h2>

        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg">
          Each email is a distinct lever — financial pain, technical ease, organizational approval. No email is filler.
        </p>

        {/* Email Stack */}
        <div className="space-y-4 relative mt-8">
          
          <div className="glass-card p-5 transform -rotate-1 hover:rotate-0 transition-transform bg-slate-900/80 border-t-2 border-slate-600">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">
              <span>Day 0</span>
              <span>Your Deal Velocity report</span>
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Based on those numbers, scheduling friction is costing you an estimated $12,400 per quarter in time that could have been spent on technical validation. That's not a rounding error. That's a full week of productive work.
            </p>
          </div>

          <div className="glass-card p-5 transform rotate-1 hover:rotate-0 transition-transform bg-slate-900/80 border-t-2 border-blue-500/50">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">
              <span>Day 2</span>
              <span>How Doodle fits into what you already use</span>
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Every multi-party poll you send logs automatically to the active opportunity in Salesforce. The moment all stakeholders have voted, your team gets a Slack notification. There is no new workflow.
            </p>
          </div>

          <div className="glass-card p-5 transform -rotate-2 hover:rotate-0 transition-transform bg-slate-900/80 border-t-2 border-emerald-500/50">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">
              <span>Day 5</span>
              <span>Four sentences for your VP of Sales</span>
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed italic">
              "Our validation cycles are pushed into the next quarter by scheduling delays... I've calculated this costs our team roughly $12,400 per quarter. Doodle's Team Plan eliminates that delay... ROI is recovered within the first deal cycle."
            </p>
          </div>

        </div>
      </motion.div>

      {/* Spacer for background */}
      <div className="hidden lg:block lg:col-span-6" />
    </div>
  );
}
