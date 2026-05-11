import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Settings, Calendar, DollarSign, Clock, Users, ArrowRight, Zap, CheckCircle2, ChevronRight, MessageSquare, AlertCircle, ExternalLink, Play } from 'lucide-react';

export function AssetCalculator() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="glass-panel overflow-hidden relative shadow-2xl border border-slate-200" style={{ height: '600px' }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 backdrop-blur-md z-10">
            <div className="text-center">
              <Zap className="w-10 h-10 text-blue-500 mx-auto mb-3 animate-pulse" />
              <p className="text-base font-semibold text-slate-500">Loading Live Calculator</p>
            </div>
          </div>
        )}
        <iframe
          src="https://doodle-roi-calculator.vercel.app/"
          title="Doodle Deal Velocity Calculator"
          className="w-full h-full border-0"
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
      <p className="text-center text-sm font-semibold text-slate-400 mt-4 flex items-center justify-center gap-2">
        <ExternalLink className="w-4 h-4" /> Live Interactive Application — Deployed to Vercel
      </p>
    </div>
  );
}

function SliderRow({ icon, label, value, min, max, step, val, set }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-base font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
        </div>
        <span className="text-xl font-bold text-slate-900 tabular-nums bg-slate-100/80 px-3 py-1 rounded-lg border border-slate-200/60">{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={(e) => set(Number(e.target.value))} className="slider-track" />
    </div>
  );
}

/* ═══════ ASSET B: LINKEDIN ARTICLE DOM ═══════ */
export function AssetLinkedIn() {
  return (
    <div className="w-full max-w-lg mx-auto glass-panel">
      {/* Header */}
      <div className="p-6 flex items-start gap-4 border-b border-slate-100 bg-white/40">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg shadow-blue-500/20">SA</div>
        <div className="flex-1">
          <p className="text-lg font-bold text-slate-900">Solutions Architect / Pre-Sales</p>
          <p className="text-base text-slate-500">Enterprise SaaS · 2nd</p>
          <p className="text-sm font-semibold text-slate-400 mt-1 flex items-center gap-1">3d • <span className="bg-slate-100 px-1.5 py-0.5 rounded text-xs uppercase tracking-wider text-slate-500">Promoted</span></p>
        </div>
      </div>
      {/* Body */}
      <div className="p-6 text-lg text-slate-700 leading-relaxed space-y-4 max-h-[55vh] overflow-y-auto">
        <p className="font-bold text-slate-900 text-2xl tracking-tight leading-snug">The real reason your enterprise deals slip into next quarter</p>
        <p>You engineered a solution that solves a real problem. The technical validation went well. The champion is on your side. The CTO nodded in the right places during the demo.</p>
        <p>And then the deal slips. Not because of pricing. Not because a competitor came in cheaper. <strong className="text-slate-900">Because you couldn't get everyone on a call.</strong></p>
        <p>This is not an edge case. It is the default. The technical win happens in week three. The contract moves in week eleven. The eight weeks in between are almost entirely calendar coordination.</p>
        <p className="pl-5 py-2 border-l-[3px] border-blue-500 text-slate-600 italic text-xl font-serif">Fourteen-reply email threads, three rounds of "does Thursday work for everyone," one no-show from the buyer's security lead, and a rescheduled call that lands in the wrong quarter.</p>
        <p className="font-bold text-slate-900 pt-2 text-xl">The numbers:</p>
        <p>Take a Solutions Architect with a <strong className="text-slate-900 bg-slate-100 px-1 rounded">$120,000 base salary</strong> running <strong className="text-slate-900 bg-slate-100 px-1 rounded">8 panel scoping calls per month</strong>, each requiring <strong className="text-slate-900 bg-slate-100 px-1 rounded">6 hours</strong> of back-and-forth. That is 48 hours per month — roughly six full working days — spent on calendar coordination.</p>
        <p>At that salary: <strong className="text-red-600 font-mono text-xl bg-red-50 px-2 py-0.5 rounded">≈ $3,300/month per person bled to scheduling.</strong></p>
        <p>Across a team of five: <strong className="text-red-600 font-mono text-xl bg-red-50 px-2 py-0.5 rounded">$16,500/month.</strong></p>
        <p className="pb-4">Multi-party scheduling — where all participants vote on available slots in one round — eliminates this entirely. <strong className="text-blue-700 bg-blue-50 px-1 rounded">One poll, one round, one confirmed meeting. Four minutes instead of four days.</strong></p>
      </div>
      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-6 text-base font-semibold text-slate-500 bg-slate-50/50">
        <span className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors">👍 247</span>
        <span className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors"><MessageSquare className="w-4 h-4" /> 38 comments</span>
        <span className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors">12 reposts</span>
      </div>
    </div>
  );
}

/* ═══════ ASSET C: TOF TERMINAL ERROR AD ═══════ */
export function AssetTOF() {
  const [text, setText] = useState('');
  const fullText = '$ doodle diagnose --pipeline Q3';
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-[#0a0f1a] rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
      {/* MacOS Window Chrome */}
      <div className="flex items-center px-5 py-4 bg-[#111827] border-b border-slate-800">
        <div className="flex gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>
        <span className="mx-auto text-sm text-slate-500 font-mono font-bold tracking-wider">pipeline-diagnostics.sh</span>
      </div>
      
      {/* Terminal body */}
      <div className="p-8 font-mono text-base leading-relaxed text-slate-300 space-y-4">
        <div className="flex">
          <span className="text-emerald-400 mr-2">➜</span> 
          <span className="text-blue-300">~</span>
          <span className="text-slate-100 ml-2">{text}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2.5 h-5 bg-slate-400 ml-1 translate-y-1" /></span>
        </div>
        
        {text === fullText && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }} className="space-y-4">
            <p className="text-slate-400 text-base">[INFO] Scanning active opportunities...</p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-slate-400 text-base">[INFO] Checking stakeholder sync status...</motion.p>
            
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} 
              className="my-6 p-5 bg-red-500/10 border border-red-500/40 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
              <p className="text-red-400 font-bold flex items-center gap-2 text-lg">
                <AlertCircle className="w-5 h-5" /> FATAL ERROR: C-Suite Availability Sync Failed
              </p>
              <p className="text-red-400/70 mt-2 text-base">Multi-party coordination requires group consensus. 1:1 link returned 0 confirmed attendees.</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="space-y-1">
              <p className="text-slate-500 text-base">Attempted resolution: calendly.com/john/30min</p>
              <p className="text-slate-500 text-base">Status: <span className="text-red-400 font-bold">REJECTED — link does not support 5+ party negotiation</span></p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="mt-8 pt-6 border-t border-slate-800">
              <p className="text-white text-xl font-sans font-bold mb-3 tracking-tight">You engineered a million-dollar solution. Don't let a personal calendar link kill the deal.</p>
              <p className="text-slate-400 text-base font-sans leading-relaxed mb-6">The biggest bottleneck in your pipeline isn't the technical validation. It's the two weeks you lose herding engineers and buyer-side executives into the same call.</p>
              <button className="w-full py-4 bg-blue-600 text-white text-base font-bold rounded-xl font-sans hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Calculate My Loss →
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════ ASSET D: MOF AD — TEAMMATE'S ORIGINAL HTML ═══════ 
   Embedded via iframe to preserve exact animations. */
export function AssetMOF() {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="glass-panel overflow-hidden relative" style={{ aspectRatio: '4/3' }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 backdrop-blur-md z-10">
            <div className="text-center">
              <Play className="w-10 h-10 text-slate-400 mx-auto mb-3 animate-pulse" />
              <p className="text-base font-semibold text-slate-500">Loading MOF Ad</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="/mof_ad.html"
          title="Doodle MOF LinkedIn Retargeting Ad"
          className="w-full h-full border-0 rounded-2xl"
          style={{ minHeight: '420px' }}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <p className="text-center text-sm font-semibold text-slate-400 mt-4 flex items-center justify-center gap-2">
        <Play className="w-4 h-4" /> 25s Animated LinkedIn Retargeting Ad — Click to replay
      </p>
    </div>
  );
}

/* ═══════ ASSET E: NURTURE SEQUENCE PREVIEW ═══════ */
export function AssetNurture() {
  const [active, setActive] = useState(0);
  const tabs = [
    { day: 'Day 0', subject: 'Your Deal Velocity report', lever: 'Financial Pain' },
    { day: 'Day 2', subject: 'How Doodle fits into what you already use', lever: 'Technical Ease' },
    { day: 'Day 5', subject: 'Four sentences for your VP of Sales', lever: 'Org Approval' },
  ];
  const bodies = [
    <>
      <p>Hi [First name],</p>
      <p>Here's what you entered:</p>
      <ul className="list-disc pl-5 space-y-2 font-medium text-slate-800 text-base">
        <li>Annual base salary: $[X]</li>
        <li>Panel scoping calls per month: [X]</li>
        <li>Hours lost per call to scheduling: [X]</li>
      </ul>
      <p>Based on those numbers, scheduling friction is costing you an estimated <strong className="text-red-600 bg-red-50 px-1 rounded">$[calculated amount] per quarter</strong> in time that could have been spent on technical validation, demo preparation, or closing.</p>
      <p>That's not a rounding error. That's a full week of productive work every three months, spent on reply-all email threads.</p>
      <p className="text-slate-500 mt-4 font-medium flex items-center gap-2 pt-4 border-t border-slate-100">
        <ArrowRight className="w-5 h-5 text-blue-600" /> 
        <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-base">Start a free Team Trial</a> — no credit card, no IT request
      </p>
    </>,
    <>
      <p>Hi [First name],</p>
      <p>Here's exactly how Doodle connects to your existing stack — nothing to configure, nothing to ask IT about.</p>
      <p><strong className="text-slate-900">Salesforce:</strong> Every multi-party poll logs automatically to the active opportunity. Pipeline stays clean without manual entry.</p>
      <p><strong className="text-slate-900">Slack:</strong> The moment all stakeholders have voted, your team gets a Slack notification with the confirmed time.</p>
      <p><strong className="text-slate-900">Google Calendar / Outlook:</strong> The confirmed meeting drops into every participant's calendar simultaneously — one action, six calendars updated.</p>
      <p className="font-medium text-slate-800">There is no new workflow. No onboarding session. No IT approval required for a tool under $500 a year.</p>
      <p className="text-slate-500 mt-4 font-medium flex items-center gap-2 pt-4 border-t border-slate-100">
        <ArrowRight className="w-5 h-5 text-blue-600" /> 
        <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-base">Click here to activate your team template</a>
      </p>
    </>,
    <>
      <p>Hi [First name],</p>
      <p>If you need someone with budget authority to sign off, here's exactly what to forward:</p>
      <div className="my-4 p-5 bg-blue-50/50 border-l-4 border-blue-500 rounded-r-xl text-lg italic text-slate-700 leading-relaxed font-serif shadow-sm">
        "Our validation cycles are consistently pushed into the following quarter by scheduling delays — multi-party scoping calls take 10 to 14 days to coordinate. I've calculated that this costs our team roughly $[X] per quarter in lost selling time per rep. Doodle's Team Plan ($420/year for five users) eliminates that delay — direct integrations with Salesforce, Slack, and Google Calendar, no IT required. ROI is recovered within the first deal cycle it accelerates."
      </div>
      <p className="font-bold text-slate-900 text-lg">Pipeline language, one number, one solution, one outcome.</p>
      <p className="text-slate-500 mt-4 font-medium flex items-center gap-2 pt-4 border-t border-slate-100">
        <ArrowRight className="w-5 h-5 text-blue-600" /> 
        <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors text-base">Activate the Team Trial — free for 14 days</a>
      </p>
    </>,
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex gap-2 mb-6">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex-1 py-3.5 px-2 text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300
              ${active === i 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105 z-10' 
                : 'bg-white/50 text-slate-500 border border-slate-200 hover:bg-white hover:text-slate-800 backdrop-blur-sm'}`}>
            {t.day}
          </button>
        ))}
      </div>
      <motion.div 
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="glass-panel"
      >
        <div className="px-6 py-5 bg-white/60 border-b border-slate-100">
          <p className="text-sm text-blue-600 uppercase tracking-widest font-bold flex items-center gap-1.5"><Mail className="w-4 h-4"/>{tabs[active].lever}</p>
          <p className="text-xl font-bold text-slate-900 mt-2 tracking-tight">Subject: {tabs[active].subject}</p>
          <p className="text-base font-medium text-slate-500 mt-1">From: The Doodle Team <span className="mx-2 text-slate-300">|</span> To: [First name]</p>
        </div>
        <div className="p-6 text-lg text-slate-700 leading-relaxed space-y-4 max-h-[45vh] overflow-y-auto">
          {bodies[active]}
        </div>
      </motion.div>
    </div>
  );
}
