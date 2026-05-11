import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, Clock, Users, ArrowRight, Zap, CheckCircle2, ChevronRight, MessageSquare, AlertCircle, ExternalLink, Play, Target, Filter, ChevronDown, Check, Lock, Terminal, Activity } from 'lucide-react';

const mono = { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 };
const brutalCard = "bg-[#0a0f1a] rounded-2xl shadow-2xl overflow-hidden border border-slate-800";
const brutalHeader = "flex items-center px-5 py-3 bg-[#111827] border-b border-slate-800";

function MacControls({ title }) {
  return (
    <div className={brutalHeader}>
      <div className="flex gap-2">
        <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
        <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
      </div>
      <span className="mx-auto text-xs text-slate-500 font-mono tracking-wider">{title}</span>
    </div>
  );
}

export function AssetCalculator() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={`${brutalCard} relative`} style={{ height: '620px' }}>
        <MacControls title="doodle-roi-calculator.exe" />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a] z-10 pt-10">
            <div className="text-center">
              <Zap className="w-10 h-10 text-emerald-400 mx-auto mb-3 animate-pulse drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
              <p className="text-sm font-mono text-emerald-400">INITIALIZING LIVE DIAGNOSTIC...</p>
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
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="market_analysis.sh" />
        <div className="p-8 space-y-6">
          <div className="p-5 border border-red-500/30 bg-red-500/5 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-red-400 font-bold tracking-widest text-sm uppercase">Legacy Model</span>
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-mono rounded">FAILED</span>
            </div>
            <p className="text-white text-xl font-bold mb-2">1:1 Link Scheduling</p>
            <p className="text-slate-400 text-sm mb-4">Calendly architecture</p>
            <div className="flex items-center gap-3 text-slate-500 font-mono text-xs">
              <Users className="w-4 h-4" /> <span>5 Stakeholders</span>
              <ArrowRight className="w-4 h-4 text-red-500" />
              <span className="text-red-400">14-reply email thread</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <span className="text-slate-500 text-xs font-bold">VS</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-5 border border-emerald-500/40 bg-emerald-500/10 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 animate-[shimmer_2s_infinite]" />
            <div className="flex justify-between items-center mb-4">
              <span className="text-emerald-400 font-bold tracking-widest text-sm uppercase">Target Model</span>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-mono rounded shadow-[0_0_10px_rgba(52,211,153,0.3)]">OPTIMIZED</span>
            </div>
            <p className="text-white text-xl font-bold mb-2">Multi-Party Polling</p>
            <p className="text-slate-400 text-sm mb-4">Doodle architecture</p>
            <div className="flex items-center gap-3 text-slate-300 font-mono text-xs">
              <Users className="w-4 h-4 text-emerald-400" /> <span className="text-emerald-100">5 Stakeholders</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-1 rounded">Consensus in 4 mins</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AssetAudience() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="target_acquisition.exe" />
        <div className="p-8">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="border border-blue-500/30 bg-[#111827] rounded-2xl p-6 relative">
            <div className="absolute -top-3 -right-3">
               <span className="flex h-6 w-6">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-500 border-2 border-[#0a0f1a] items-center justify-center">
                   <Check className="w-3 h-3 text-white" strokeWidth={3} />
                 </span>
               </span>
            </div>
            
            <div className="flex items-center gap-4 border-b border-slate-800 pb-6 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-blue-400 font-mono text-xs mb-1">PERSONA LOCKED</p>
                <p className="text-white font-bold text-xl">Solutions Architect</p>
                <p className="text-slate-400 text-sm">US Technology Sector</p>
              </div>
            </div>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center bg-[#0a0f1a] p-3 rounded border border-slate-800">
                <span className="text-slate-500">BASE_SALARY</span>
                <span className="text-emerald-400">$150,000</span>
              </div>
              <div className="flex justify-between items-center bg-[#0a0f1a] p-3 rounded border border-slate-800">
                <span className="text-slate-500">PAIN_POINT</span>
                <span className="text-slate-300">Calendar Coordination</span>
              </div>
              <div className="flex justify-between items-center bg-red-500/10 p-3 rounded border border-red-500/30">
                <span className="text-red-400/80">QUARTERLY_BLEED</span>
                <span className="text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.8)] animate-pulse">$18,400</span>
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
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="linkedin_ads_manager.sh" />
        <div className="p-6 font-mono text-sm">
          <div className="flex items-center gap-2 text-blue-400 mb-6 pb-4 border-b border-slate-800">
            <Filter className="w-5 h-5" />
            <span className="font-bold text-base uppercase tracking-widest">Audience Builder</span>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span className="text-slate-400">Platform:</span>
              <span className="text-white font-bold bg-blue-500/20 px-2 rounded">LinkedIn Network</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span className="text-slate-400">Geo:</span>
              <span className="text-white font-bold bg-slate-800 px-2 rounded">United States</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Lock className="w-4 h-4 text-amber-500" />
              <span className="text-slate-400">Verified Job Title:</span>
              <span className="text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2 rounded">"Solutions Architect"</span>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-xl border border-blue-500/30 text-center relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20" />
            <p className="text-blue-200/60 text-xs mb-2 relative z-10 uppercase tracking-widest">Target Audience Size</p>
            <p className="text-4xl text-white font-black tracking-tight relative z-10" style={mono}>50,000</p>
            <p className="text-emerald-400 text-xs mt-2 relative z-10">Status: Ready to Launch</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssetTOF() {
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
    <div className="h-full bg-[#0a0f1a] font-mono text-sm leading-relaxed text-slate-300 p-6 flex flex-col justify-center">
      <div className="flex">
        <span className="text-emerald-400 mr-2">➜</span> 
        <span className="text-blue-300">~</span>
        <span className="text-slate-100 ml-2">{text}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-slate-400 ml-1 translate-y-0.5" /></span>
      </div>
      
      {text === fullText && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }} className="space-y-4 mt-4">
          <p className="text-slate-500">[INFO] Scanning active opportunities...</p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-slate-500">[INFO] Checking stakeholder sync status...</motion.p>
          
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} 
            className="my-6 p-5 bg-red-500/10 border border-red-500/40 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <p className="text-red-400 font-bold flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4" /> FATAL ERROR: C-Suite Availability Sync Failed
            </p>
            <p className="text-red-400/70 text-xs">Multi-party coordination requires group consensus. 1:1 link returned 0 confirmed attendees.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="space-y-1 text-xs">
            <p className="text-slate-600">Attempted resolution: calendly.com/john/30min</p>
            <p className="text-slate-600">Status: <span className="text-red-400 font-bold">REJECTED, link does not support 5+ party negotiation</span></p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }} className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-white text-base font-sans font-bold mb-2">You engineered a million-dollar solution. Don't let a personal calendar link kill the deal.</p>
            <button className="w-full py-3 mt-4 bg-blue-600 text-white text-sm font-bold rounded-lg font-sans shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Calculate My Loss →
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export function AssetCreatives() {
  const [activeTab, setActiveTab] = useState('tof');
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="creative_assets.sh" />
        <div className="flex bg-[#111827] border-b border-slate-800">
          <button onClick={() => setActiveTab('tof')} className={`flex-1 py-3 text-xs font-mono font-bold transition-colors ${activeTab === 'tof' ? 'text-blue-400 border-b-2 border-blue-400 bg-[#0a0f1a]' : 'text-slate-500 hover:text-slate-300'}`}>
            01_TOF_AD.exe
          </button>
          <button onClick={() => setActiveTab('mof')} className={`flex-1 py-3 text-xs font-mono font-bold transition-colors ${activeTab === 'mof' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-[#0a0f1a]' : 'text-slate-500 hover:text-slate-300'}`}>
            02_MOF_VIDEO.mp4
          </button>
        </div>
        <div className="h-[480px]">
          {activeTab === 'tof' ? <AssetTOF /> : (
            <iframe
              src="/mof_ad.html"
              title="Doodle MOF LinkedIn Retargeting Ad"
              className="w-full h-full border-0 bg-[#0a0f1a]"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function AssetLinkedIn() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="content_engine.ts" />
        <div className="p-6 border-b border-slate-800 bg-[#111827]">
          <p className="text-slate-400 font-mono text-xs mb-2">TARGET_PLATFORM: LINKEDIN_ARTICLE</p>
          <p className="text-white font-bold text-xl leading-snug">The real reason your enterprise deals slip into next quarter</p>
        </div>
        <div className="p-6 text-slate-300 font-mono text-sm leading-relaxed space-y-4 max-h-[400px] overflow-y-auto">
          <p>You engineered a solution that solves a real problem. The technical validation went well. The CTO nodded in the right places.</p>
          <p>And then the deal slips. Not because of pricing. <span className="text-blue-400 font-bold">Because you couldn't get everyone on a call.</span></p>
          <div className="pl-4 border-l-2 border-blue-500 text-slate-400 italic">
            Fourteen-reply email threads, three rounds of "does Thursday work for everyone," one no-show from the buyer's security lead.
          </div>
          <p>The numbers:</p>
          <ul className="space-y-2">
            <li className="flex justify-between border-b border-slate-800 pb-1"><span>Base Salary</span> <span className="text-emerald-400">$120,000</span></li>
            <li className="flex justify-between border-b border-slate-800 pb-1"><span>Calls / Month</span> <span className="text-white">8</span></li>
            <li className="flex justify-between border-b border-slate-800 pb-1"><span>Hours Lost / Call</span> <span className="text-red-400">6</span></li>
            <li className="flex justify-between pt-2">
              <span className="text-slate-500 font-bold">COST_PER_TEAM_MEMBER</span> 
              <span className="text-red-500 font-bold bg-red-500/10 px-2 rounded">-$16,500/mo</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AssetNurture() {
  const [active, setActive] = useState(0);
  const tabs = ['DAY_00.eml', 'DAY_02.eml', 'DAY_05.eml'];
  const bodies = [
    <>
      <span className="text-emerald-400 font-bold">{'<'} ROI_REPORT_GENERATED {'>'}</span><br/><br/>
      Based on your inputs, scheduling friction is costing you an estimated <span className="text-red-400 font-bold bg-red-500/10 px-1 rounded">$18,400 per quarter</span> in time that could have been spent on technical validation.<br/><br/>
      That is not a rounding error. That is a full week of productive work every three months.<br/><br/>
      <span className="text-blue-400">ACTION_REQUIRED:</span> Start a free Team Trial to stop the bleed next month.
    </>,
    <>
      <span className="text-blue-400 font-bold">{'<'} INTEGRATION_MAP {'>'}</span><br/><br/>
      <span className="text-white">Salesforce:</span> Polls log automatically to active opportunities.<br/>
      <span className="text-white">Slack:</span> Alerts trigger when consensus is reached.<br/>
      <span className="text-white">Google Workspace:</span> One action updates six calendars simultaneously.<br/><br/>
      No new workflow. No IT approval required for a tool under $500 a year.
    </>,
    <>
      <span className="text-amber-400 font-bold">{'<'} ORG_APPROVAL_TEMPLATE {'>'}</span><br/><br/>
      Forward this to your VP of Sales:<br/><br/>
      <span className="text-slate-400 italic">"Our validation cycles are pushed into the following quarter by scheduling delays. I've calculated this costs our team roughly $18,400 per quarter in lost selling time per rep. Doodle's Team Plan ($420/year) eliminates that delay. ROI is recovered within the first deal cycle it accelerates."</span><br/><br/>
      Pipeline language, one number, one solution.
    </>
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="nurture_sequence.sh" />
        <div className="flex p-2 bg-[#111827] gap-2 border-b border-slate-800">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-1 py-2 text-xs font-mono rounded border ${active === i ? 'bg-[#0a0f1a] text-emerald-400 border-emerald-500/30' : 'bg-[#111827] text-slate-500 border-transparent hover:border-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="p-6 h-[300px] font-mono text-sm text-slate-300 leading-relaxed overflow-y-auto">
          <div className="flex">
            <span className="text-blue-500 mr-2">~</span> 
            <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              {bodies[active]}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssetCAC() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="cac_compression_model.ts" />
        <div className="p-8 font-mono">
          <div className="flex justify-between items-end h-48 mb-8 border-b border-slate-800 pb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
              <span className="text-red-400 font-bold">$140</span>
              <motion.div initial={{ height: 0 }} animate={{ height: '140px' }} transition={{ duration: 1, type: 'spring' }} className="w-8 bg-gradient-to-t from-red-900/50 to-red-500/50 border border-red-500/30 rounded-t" />
              <span className="text-slate-500 text-xs">M_03</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
              <span className="text-yellow-400 font-bold">$110</span>
              <motion.div initial={{ height: 0 }} animate={{ height: '110px' }} transition={{ duration: 1, delay: 0.2, type: 'spring' }} className="w-8 bg-gradient-to-t from-yellow-900/50 to-yellow-500/50 border border-yellow-500/30 rounded-t" />
              <span className="text-slate-500 text-xs">M_06</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 relative z-10 w-1/3">
              <span className="text-emerald-400 font-bold drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">$85</span>
              <motion.div initial={{ height: 0 }} animate={{ height: '85px' }} transition={{ duration: 1, delay: 0.4, type: 'spring' }} className="w-8 bg-gradient-to-t from-emerald-900/80 to-emerald-400/80 border border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] rounded-t relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
              </motion.div>
              <span className="text-emerald-500 font-bold text-xs">M_12</span>
            </div>

            {/* Connecting Line Mockup */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 80 40 L 250 70 L 420 95" 
                fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" strokeDasharray="5,5" 
              />
            </svg>
          </div>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400"><div className="w-2 h-2 rounded-full bg-red-500" /> Cold LinkedIn Demand (Premium)</div>
            <div className="flex items-center gap-2 text-slate-400"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Retargeting + Search Intent</div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" /> Viral Loop Active (0 CAC referrals)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssetExpansion() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className={brutalCard}>
        <MacControls title="sys_expansion.exe" />
        <div className="p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
          
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="w-20 h-20 mx-auto bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <Activity className="w-10 h-10 text-blue-400" />
          </motion.div>
          
          <h3 className="text-2xl font-black text-white tracking-tight mb-2">YEAR_02 UNLOCKED</h3>
          <p className="text-slate-400 font-mono text-xs mb-8">Enterprise credibility established.</p>
          
          <div className="grid grid-cols-2 gap-4 font-mono text-sm">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="p-4 bg-[#111827] border border-slate-700 rounded-xl text-left hover:border-blue-500/50 transition-colors">
              <span className="block text-slate-500 text-xs mb-1">MARKET_01</span>
              <span className="text-white font-bold block mb-2">Corporate Legal</span>
              <span className="text-emerald-400 text-xs">Billable Hours Loss</span>
            </motion.div>
            
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="p-4 bg-[#111827] border border-slate-700 rounded-xl text-left hover:border-blue-500/50 transition-colors">
              <span className="block text-slate-500 text-xs mb-1">MARKET_02</span>
              <span className="text-white font-bold block mb-2">Investment Banking</span>
              <span className="text-emerald-400 text-xs">M&A Deal Velocity</span>
            </motion.div>
          </div>
          
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl flex items-center justify-between">
            <div className="text-left">
              <span className="block text-blue-400 text-xs font-mono mb-1">ENTERPRISE_UPSELL</span>
              <span className="text-white font-bold">$15,000+ Org Contracts</span>
            </div>
            <Lock className="w-5 h-5 text-blue-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
