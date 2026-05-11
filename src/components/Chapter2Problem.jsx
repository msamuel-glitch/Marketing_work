import React from 'react';
import { motion } from 'framer-motion';

export default function Chapter2Problem() {
  return (
    <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* Spacer for the background image on the left */}
      <div className="hidden lg:block lg:col-span-5" />

      {/* Content on the right */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
          The Core Insight
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1]">
          You can't growth-hack <br/>
          <span className="text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">a bad product.</span>
        </h2>

        <div className="glass-card p-8 md:p-10 space-y-6 border-t-4 border-red-500/50">
          <p className="text-sm text-slate-300 font-bold uppercase tracking-widest border-b border-slate-700/50 pb-4">
            From the LinkedIn Article
          </p>
          
          <div className="space-y-6 text-slate-300 font-light leading-relaxed">
            <p>
              <strong className="text-white font-bold">The 1:1 scheduling link is not built for what you do.</strong>
            </p>
            <p>
              Calendly works perfectly for one scenario: a single person sends a link, and another person picks a time. It is an excellent product for that use case. Your use case is not that.
            </p>
            <p>
              When you're setting up a technical scoping call for an enterprise deal, you are coordinating your own engineers, your AE, your solutions consultant, and three to five people on the buyer's side.
            </p>
            
            <blockquote className="pl-6 border-l-2 border-red-500 text-xl font-medium text-white italic py-2">
              "A 1:1 scheduling link sent to that group does not produce a meeting. It produces a reply-all thread."
            </blockquote>
            
            <p>
              This is not a people problem. It is a tooling problem. And it is costing you money directly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
