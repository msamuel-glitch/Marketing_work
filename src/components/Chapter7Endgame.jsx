import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter7Endgame() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-6 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100/10 border border-slate-100/20 text-slate-200 text-[10px] font-bold uppercase tracking-widest">
          The Endgame
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] text-white">
          The Airbnb Moment. <br/>
          <span className="text-slate-400">Enterprise Expansion.</span>
        </h2>

        <p className="text-lg text-slate-300 font-light leading-relaxed max-w-lg">
          The IT security gate that blocked us in Year 1 is not a technical barrier — it is a trust barrier. Year 1 case studies are the credential that opens it.
        </p>

        <div className="space-y-4 mt-8">
          <div className="glass-card p-6 border-l-4 border-l-slate-400">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-2">Phase 2: Adjacent Markets</h3>
            <p className="text-sm text-slate-400 font-light">
              We clone our core architecture and redeploy it. The "Deal Velocity Calculator" becomes the <strong>"Billable Hours Loss Calculator"</strong> for corporate lawyers. Same logic, different P&L.
            </p>
          </div>
          
          <div className="glass-card p-6 border-l-4 border-l-white bg-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Phase 3: Top-Down Upsell</h3>
            <p className="text-sm text-slate-300 font-light">
              We move from bottom-up Product-Led Growth ($420/year) to top-down Enterprise Sales ($15,000+ contracts). We already have active users inside these organizations. We are asking for formal recognition of a relationship that already exists.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Deploy the Pre-Sales Template →
        </motion.button>
      </motion.div>

      {/* Spacer */}
      <div className="hidden lg:block lg:col-span-6" />
    </div>
  );
}
