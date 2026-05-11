import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, Clock, Users, ArrowRight, Zap, CheckCircle2, ChevronRight, MessageSquare, AlertCircle, ExternalLink, Play, Target, Filter, Lock, Activity, Link as LinkIcon, CalendarCheck, Share2, Check } from 'lucide-react';

const mono = { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 };

// Glassmorphism wrapper for light mode (clean, natural, human)
const glassCard = "bg-white/80 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white overflow-hidden";
const glassHeader = "flex items-center px-6 py-4 bg-slate-50/50 border-b border-slate-100 backdrop-blur-md";

function MacControls({ title }) {
  return (
    <div className={glassHeader}>
      <div className="flex gap-2.5">
        <span className="w-3.5 h-3.5 rounded-full bg-slate-200 shadow-inner" />
        <span className="w-3.5 h-3.5 rounded-full bg-slate-200 shadow-inner" />
        <span className="w-3.5 h-3.5 rounded-full bg-slate-200 shadow-inner" />
      </div>
      <span className="mx-auto text-xs text-slate-400 font-bold tracking-widest uppercase">{title}</span>
    </div>
  );
}

export function AssetHero() {
  return (
    <div className="w-full relative h-[600px] flex items-center justify-center">
      {/* Central Hub */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
        className="w-40 h-40 bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(37,99,235,0.3)] border border-blue-100 flex flex-col items-center justify-center z-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 opacity-50" />
        <CalendarCheck className="w-16 h-16 text-blue-600 mb-2 relative z-10" strokeWidth={1.5} />
        <span className="font-black tracking-tight text-xl text-slate-900 relative z-10">doodle</span>
      </motion.div>

      {/* Orbiting Nodes */}
      {[
        { delay: 0.2, angle: 0, icon: <Target className="w-5 h-5 text-indigo-500" />, label: "CTO" },
        { delay: 0.4, angle: 72, icon: <Lock className="w-5 h-5 text-emerald-500" />, label: "Security" },
        { delay: 0.6, angle: 144, icon: <Activity className="w-5 h-5 text-blue-500" />, label: "Engineering" },
        { delay: 0.8, angle: 216, icon: <Users className="w-5 h-5 text-amber-500" />, label: "Pre-Sales" },
        { delay: 1.0, angle: 288, icon: <Clock className="w-5 h-5 text-rose-500" />, label: "VP Sales" }
      ].map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: node.angle - 45, x: 250 }}
          animate={{ opacity: 1, scale: 1, rotate: node.angle, x: 120 }}
          transition={{ duration: 1.2, delay: node.delay, type: 'spring', bounce: 0.4 }}
          style={{ position: 'absolute', originX: -0.5, originY: 0.5 }}
          className="z-10"
        >
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-slate-100" style={{ transform: `rotate(-${node.angle}deg)` }}>
            <div className="bg-slate-50 p-2 rounded-xl">{node.icon}</div>
            <span className="font-bold text-slate-700 text-sm">{node.label}</span>
          </div>
        </motion.div>
      ))}

      {/* Connecting Pulses */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 600 600">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.line
            key={i}
            x1="300" y1="300"
            x2={300 + Math.cos(angle * Math.PI / 180) * 150}
            y2={300 + Math.sin(angle * Math.PI / 180) * 150}
            stroke="url(#gradient)" strokeWidth="2" strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, delay: 1.5 + (i * 0.2), repeat: Infinity, repeatType: "reverse" }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="absolute bottom-0 text-center w-full">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-slate-100">
          <Zap className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-slate-800 tracking-tight">Consensus Reached. Deal Velocity Unlocked.</span>
        </div>
      </motion.div>
    </div>
  );
}

export function AssetCalculator() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="w-full">
      <div className={`${glassCard} relative`} style={{ height: '620px' }}>
        <MacControls title="Live Pipeline Diagnostic" />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-md z-10 pt-10">
            <div className="text-center">
              <Zap className="w-10 h-10 text-blue-500 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Calculator...</p>
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
    </div>
  );
}

export function AssetMarket() {
  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="Market Architecture Comparison" />
        <div className="p-10 space-y-8">
          <div className="p-6 border border-slate-100 bg-white rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 font-bold tracking-widest text-xs uppercase flex items-center gap-2"><LinkIcon className="w-4 h-4"/> Legacy Model</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">FAILED</span>
            </div>
            <p className="text-slate-900 text-2xl font-black mb-2 tracking-tight">1:1 Link Scheduling</p>
            <p className="text-slate-500 text-base mb-6">Calendly architecture</p>
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-700"><Users className="w-5 h-5 text-slate-400" /> 5 Stakeholders</div>
              <ArrowRight className="w-5 h-5 text-slate-300" />
              <div className="text-red-600 font-bold bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">14-reply email thread</div>
            </div>
          </div>
          
          <div className="flex justify-center relative -my-4 z-10">
            <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-100 text-slate-400 font-black text-sm">
              VS
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 border border-blue-100 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase flex items-center gap-2"><Share2 className="w-4 h-4"/> Target Model</span>
              <span className="px-3 py-1 bg-blue-600 text-white shadow-md text-xs font-bold rounded-full shadow-blue-500/20">OPTIMIZED</span>
            </div>
            <p className="text-slate-900 text-2xl font-black mb-2 tracking-tight relative z-10">Multi-Party Polling</p>
            <p className="text-blue-600/70 text-base mb-6 relative z-10 font-medium">Doodle architecture</p>
            <div className="flex items-center justify-between bg-white/80 backdrop-blur p-4 rounded-xl border border-blue-100 relative z-10 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-800"><Users className="w-5 h-5 text-blue-500" /> 5 Stakeholders</div>
              <ArrowRight className="w-5 h-5 text-blue-300" />
              <div className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Consensus in 4 mins</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AssetAudience() {
  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="Target Audience Profile" />
        <div className="p-10 bg-slate-50/50">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="bg-white rounded-3xl p-8 relative shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100">
            <div className="absolute -top-4 -right-4">
               <span className="flex h-10 w-10">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30"></span>
                 <span className="relative inline-flex rounded-full h-10 w-10 bg-blue-600 border-4 border-white shadow-lg items-center justify-center">
                   <Check className="w-5 h-5 text-white" strokeWidth={3} />
                 </span>
               </span>
            </div>
            
            <div className="flex items-center gap-6 border-b border-slate-100 pb-8 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div>
                <p className="text-blue-600 font-bold text-xs mb-1 uppercase tracking-widest">Persona Locked</p>
                <p className="text-slate-900 font-black text-2xl tracking-tight">Solutions Architect</p>
                <p className="text-slate-500 text-base font-medium mt-1">US Technology Sector</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Base Salary</span>
                <span className="text-slate-900 font-black text-xl" style={mono}>$150,000</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Pain Point</span>
                <span className="text-slate-700 font-bold text-lg">Calendar Coordination</span>
              </div>
              <div className="flex justify-between items-center bg-red-50 p-5 rounded-xl border border-red-100 shadow-inner">
                <span className="text-red-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2"><AlertCircle className="w-4 h-4"/> Quarterly Bleed</span>
                <span className="text-red-600 font-black text-2xl" style={mono}>$18,400</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AssetChannel() {
  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="LinkedIn Ads Campaign Builder" />
        <div className="p-10 bg-slate-50/50">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 text-blue-600 mb-8 pb-6 border-b border-slate-100">
              <Filter className="w-6 h-6" />
              <span className="font-black text-xl tracking-tight">Audience Targeting</span>
            </div>

            <div className="space-y-5 mb-10 text-base">
              <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span className="text-slate-500 font-medium">Platform:</span>
                <span className="text-slate-900 font-bold bg-slate-100 px-3 py-1 rounded-lg">LinkedIn Network</span>
              </div>
              <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                <span className="text-slate-500 font-medium">Geography:</span>
                <span className="text-slate-900 font-bold bg-slate-100 px-3 py-1 rounded-lg">United States</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <Lock className="w-5 h-5 text-amber-500" />
                <span className="text-amber-700 font-medium">Verified Job Title:</span>
                <span className="text-amber-900 font-black bg-white px-3 py-1.5 rounded-lg shadow-sm border border-amber-200">"Solutions Architect"</span>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl shadow-blue-500/20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <p className="text-blue-100 font-bold text-sm mb-3 relative z-10 uppercase tracking-widest">Target Audience Size</p>
              <p className="text-6xl text-white font-black tracking-tight relative z-10 drop-shadow-md" style={mono}>50,000</p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm relative z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Campaign Ready to Launch
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="Cold Outreach Creative (Ad 1)" />
        <div className="bg-slate-100 p-8 flex items-center justify-center min-h-[500px]">
          {/* THE AD ITSELF IS DARK MODE AS SPECIFIED IN THE TEXT */}
          <div className="w-full bg-[#0a0f1a] rounded-xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col h-[420px]">
            <div className="flex items-center px-4 py-3 bg-[#111827] border-b border-slate-800">
              <span className="text-slate-500 text-xs font-mono font-bold tracking-wider mx-auto">pipeline-diagnostics.sh</span>
            </div>
            
            <div className="p-6 font-mono text-sm leading-relaxed text-slate-300 flex-1 overflow-y-auto">
              <div className="flex mb-4">
                <span className="text-emerald-400 mr-2">➜</span> 
                <span className="text-blue-300 mr-2">~</span>
                <span className="text-slate-100">{text}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-slate-400 ml-1 translate-y-0.5" /></span>
              </div>
              
              {text === fullText && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }} className="space-y-4">
                  <p className="text-slate-500">[INFO] Scanning active opportunities...</p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-slate-500">[INFO] Checking stakeholder sync status...</motion.p>
                  
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} 
                    className="my-5 p-4 bg-red-500/10 border border-red-500/40 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                    <p className="text-red-400 font-bold flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4" /> FATAL ERROR: C-Suite Availability Sync Failed
                    </p>
                    <p className="text-red-400/70 text-xs">Multi-party coordination requires group consensus. 1:1 link returned 0 confirmed attendees.</p>
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="space-y-1 text-xs mb-6">
                    <p className="text-slate-600">Attempted resolution: calendly.com/john/30min</p>
                    <p className="text-slate-600">Status: <span className="text-red-400 font-bold">REJECTED, link does not support 5+ party negotiation</span></p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="pt-4 border-t border-slate-800">
                    <p className="text-white text-base font-sans font-bold mb-2">You engineered a million-dollar solution. Don't let a personal calendar link kill the deal.</p>
                    <button className="w-full py-3 mt-4 bg-blue-600 text-white text-sm font-bold rounded-lg font-sans shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                      Calculate My Loss →
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssetMOF() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full">
      <div className={`${glassCard} relative`} style={{ height: '520px' }}>
        <MacControls title="Retargeting Video (Ad 2)" />
        <div className="h-[480px] bg-slate-50 relative p-8 flex items-center justify-center">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 backdrop-blur-md z-10">
              <div className="text-center">
                <Play className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse fill-slate-200" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading 25s Animation</p>
              </div>
            </div>
          )}
          <iframe
            src="/mof_ad.html"
            title="Doodle MOF LinkedIn Retargeting Ad"
            className="w-full h-full border-0 rounded-2xl shadow-xl shadow-slate-200"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}

export function AssetLinkedIn() {
  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="LinkedIn Article Publication" />
        <div className="p-8 bg-slate-50/50 h-[550px] flex items-center justify-center">
          <div className="bg-white w-full h-full rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 flex items-start gap-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">SA</div>
              <div className="flex-1">
                <p className="text-lg font-bold text-slate-900">Solutions Architect / Pre-Sales</p>
                <p className="text-base text-slate-500 font-medium">Enterprise SaaS · 2nd</p>
                <p className="text-sm font-bold text-slate-400 mt-1">3d • Promoted</p>
              </div>
            </div>
            
            <div className="p-6 text-slate-700 text-lg leading-relaxed space-y-5 overflow-y-auto flex-1">
              <p className="font-black text-slate-900 text-2xl tracking-tight leading-snug">The real reason your enterprise deals slip into next quarter</p>
              <p className="font-medium">You engineered a solution that solves a real problem. The technical validation went well. The CTO nodded in the right places.</p>
              <p className="font-medium">And then the deal slips. Not because of pricing. <strong className="text-blue-600">Because you couldn't get everyone on a call.</strong></p>
              <div className="pl-5 border-l-4 border-blue-500 text-slate-600 italic bg-blue-50/50 py-3 pr-4 rounded-r-lg">
                Fourteen-reply email threads, three rounds of "does Thursday work for everyone," one no-show from the buyer's security lead.
              </div>
              <p className="font-bold text-slate-900 pt-2">The numbers:</p>
              <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="flex justify-between items-center"><span className="font-bold text-slate-600">Base Salary</span> <span className="text-slate-900 font-black" style={mono}>$120,000</span></div>
                <div className="flex justify-between items-center"><span className="font-bold text-slate-600">Calls / Month</span> <span className="text-slate-900 font-black" style={mono}>8</span></div>
                <div className="flex justify-between items-center"><span className="font-bold text-slate-600">Hours Lost / Call</span> <span className="text-slate-900 font-black" style={mono}>6</span></div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-2">
                  <span className="font-bold text-slate-900 uppercase text-sm">Cost Per Rep</span> 
                  <span className="text-red-600 font-black text-xl" style={mono}>-$16,500/mo</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-6 text-sm font-bold text-slate-500 bg-slate-50">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">👍 247</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> 38 comments</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">12 reposts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssetNurture() {
  const [active, setActive] = useState(0);
  const tabs = [
    { label: 'Day 0', icon: <Calendar className="w-4 h-4" />, color: 'blue' },
    { label: 'Day 2', icon: <LinkIcon className="w-4 h-4" />, color: 'emerald' },
    { label: 'Day 5', icon: <MessageSquare className="w-4 h-4" />, color: 'indigo' }
  ];
  
  const bodies = [
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full uppercase tracking-widest mb-2">Financial Pain</div>
      <p className="font-bold text-slate-900">Subject: Your Deal Velocity report</p>
      <div className="w-full h-px bg-slate-100 my-4" />
      <p>Based on your inputs, scheduling friction is costing you an estimated <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100">$18,400 per quarter</span> in time that could have been spent on technical validation.</p>
      <p>That is not a rounding error. That is a full week of productive work every three months.</p>
      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-300 transition-colors">
        <span className="font-bold text-blue-600 group-hover:text-blue-700">Start Free Team Trial</span>
        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
    </div>,
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded-full uppercase tracking-widest mb-2">Technical Ease</div>
      <p className="font-bold text-slate-900">Subject: How Doodle fits into what you already use</p>
      <div className="w-full h-px bg-slate-100 my-4" />
      <div className="space-y-3">
        <div className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700"><strong className="text-slate-900">Salesforce:</strong> Polls log automatically to active opportunities.</span></div>
        <div className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700"><strong className="text-slate-900">Slack:</strong> Alerts trigger when consensus is reached.</span></div>
        <div className="flex gap-3 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-slate-700"><strong className="text-slate-900">Google Workspace:</strong> One action updates six calendars.</span></div>
      </div>
      <p className="font-bold text-slate-900 pt-2">No new workflow. No IT approval required for a tool under $500 a year.</p>
    </div>,
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 font-bold text-xs rounded-full uppercase tracking-widest mb-2">Org Approval</div>
      <p className="font-bold text-slate-900">Subject: Four sentences for your VP of Sales</p>
      <div className="w-full h-px bg-slate-100 my-4" />
      <p className="text-slate-600">Forward this to your VP of Sales:</p>
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm italic text-slate-700 leading-relaxed">
        "Our validation cycles are pushed into the following quarter by scheduling delays. I've calculated this costs our team roughly $18,400 per quarter in lost selling time per rep. Doodle's Team Plan ($420/year) eliminates that delay. ROI is recovered within the first deal cycle it accelerates."
      </div>
      <p className="font-bold text-slate-900 mt-2">Pipeline language, one number, one solution.</p>
    </div>
  ];

  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="Nurture Email Sequence" />
        <div className="flex p-4 bg-slate-50 gap-3 border-b border-slate-100">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm rounded-xl transition-all shadow-sm ${active === i ? `bg-${t.color}-600 text-white shadow-md shadow-${t.color}-500/20 scale-105` : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="p-10 h-[400px] text-lg text-slate-700 leading-relaxed overflow-y-auto bg-white">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}>
            {bodies[active]}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AssetCAC() {
  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="CAC Compression Model" />
        <div className="p-12">
          <div className="flex justify-between items-end h-[300px] mb-10 border-b-2 border-slate-100 pb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 group">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:text-blue-600 transition-colors">Month 3</span>
              <span className="text-slate-900 font-black text-3xl" style={mono}>$140</span>
              <motion.div initial={{ height: 0 }} animate={{ height: '200px' }} transition={{ duration: 1, type: 'spring' }} className="w-16 bg-gradient-to-t from-blue-100 to-blue-200 border border-blue-300 rounded-t-xl shadow-inner" />
            </div>
            
            <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 group">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:text-indigo-600 transition-colors">Month 6</span>
              <span className="text-slate-900 font-black text-3xl" style={mono}>$110</span>
              <motion.div initial={{ height: 0 }} animate={{ height: '150px' }} transition={{ duration: 1, delay: 0.2, type: 'spring' }} className="w-16 bg-gradient-to-t from-indigo-100 to-indigo-200 border border-indigo-300 rounded-t-xl shadow-inner" />
            </div>
            
            <div className="flex flex-col items-center gap-3 relative z-10 w-1/3 group">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:text-emerald-600 transition-colors">Month 12</span>
              <span className="text-emerald-600 font-black text-4xl drop-shadow-sm" style={mono}>$85</span>
              <motion.div initial={{ height: 0 }} animate={{ height: '100px' }} transition={{ duration: 1, delay: 0.4, type: 'spring' }} className="w-20 bg-gradient-to-t from-emerald-400 to-emerald-300 border border-emerald-400 rounded-t-xl shadow-[0_10px_20px_rgba(52,211,153,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
              </motion.div>
            </div>

            {/* Connecting Line Mockup */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 100 80 L 300 130 L 500 180" 
                fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="8,8" opacity="0.4"
              />
            </svg>
          </div>
          
          <div className="space-y-4 text-sm font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3 text-slate-600"><div className="w-3 h-3 rounded-full bg-blue-300" /> Cold LinkedIn Demand (Premium Rates)</div>
            <div className="flex items-center gap-3 text-slate-600"><div className="w-3 h-3 rounded-full bg-indigo-300" /> Retargeting + Search Intent Capture</div>
            <div className="flex items-center gap-3 text-emerald-700 font-bold"><div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse" /> Viral Loop Active (Zero-CAC internal referrals)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssetExpansion() {
  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="System Expansion Unlocked" />
        <div className="p-12 text-center relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_70%)]" />
          
          <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', bounce: 0.6 }} className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
            <Activity className="w-12 h-12 text-white" />
          </motion.div>
          
          <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Year 2 Unlocked</h3>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-10">Enterprise credibility established.</p>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:shadow-md transition-shadow group">
              <span className="block text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">Market 01</span>
              <span className="text-slate-900 font-black text-xl block mb-2 tracking-tight">Corporate Legal</span>
              <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium shadow-sm">Billable Hours Loss</span>
            </motion.div>
            
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-left hover:shadow-md transition-shadow group">
              <span className="block text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">Market 02</span>
              <span className="text-slate-900 font-black text-xl block mb-2 tracking-tight">Investment Banking</span>
              <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium shadow-sm">M&A Deal Velocity</span>
            </motion.div>
          </div>
          
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }} className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-between shadow-xl shadow-blue-500/20">
            <div className="text-left">
              <span className="block text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Enterprise Upsell Path</span>
              <span className="text-white font-black text-2xl tracking-tight" style={mono}>$15,000+ Org Contracts</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AssetCreatives() {
  const [activeTab, setActiveTab] = useState('tof');
  return (
    <div className="w-full">
      <div className={glassCard}>
        <MacControls title="Creative Asset Library" />
        <div className="flex bg-slate-50 border-b border-slate-200">
          <button onClick={() => setActiveTab('tof')} className={`flex-1 py-4 text-xs font-mono font-bold transition-all border-b-2 ${activeTab === 'tof' ? 'text-blue-600 border-blue-600 bg-white' : 'text-slate-500 border-transparent hover:text-slate-800'}`}>
            01_TOF_AD.exe
          </button>
          <button onClick={() => setActiveTab('mof')} className={`flex-1 py-4 text-xs font-mono font-bold transition-all border-b-2 ${activeTab === 'mof' ? 'text-blue-600 border-blue-600 bg-white' : 'text-slate-500 border-transparent hover:text-slate-800'}`}>
            02_MOF_VIDEO.mp4
          </button>
        </div>
        <div className="h-[520px] overflow-hidden">
          {activeTab === 'tof' ? (
            <div className="-mt-16 transform scale-[0.85] origin-top">
              <AssetTOF />
            </div>
          ) : (
            <div className="-mt-16 transform scale-[0.85] origin-top">
              <AssetMOF />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
