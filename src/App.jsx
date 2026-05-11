import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetCalculator, AssetLinkedIn, AssetTOF, AssetMOF, AssetNurture } from './StageAssets';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';

const STAGE_MAP = {
  0: 'hero',
  1: 'calc',
  2: 'calc',
  3: 'tof',
  4: 'tof',
  5: 'linkedin',
  6: 'nurture',
  7: 'mof',
  8: 'mof',
  9: 'calc',
};

const BG_MAP = { 1: '/asset-calendly.png', 8: '/asset-doodle.png', 6: '/asset-viral.png' };

const BLOCK_COLORS = {
  blue:    { badge: 'badge-blue',    border: '#3B82F6', numColor: '#DBEAFE' },
  red:     { badge: 'badge-red',     border: '#EF4444', numColor: '#FEE2E2' },
  emerald: { badge: 'badge-emerald', border: '#10B981', numColor: '#D1FAE5' },
  gray:    { badge: 'badge-gray',    border: '#94A3B8', numColor: '#F1F5F9' },
};

const mono = { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 };

function useActiveBlock() {
  const [a, setA] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setA(Number(e.target.dataset.block)); });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    document.querySelectorAll('[data-block]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return a;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

function Block({ idx, badge, badgeColor, title, children }) {
  const c = BLOCK_COLORS[badgeColor];
  return (
    <div data-block={idx} className="min-h-[85vh] flex flex-col justify-center py-20 scroll-mt-20 relative overflow-hidden group">
      <div className="absolute -left-4 top-10 font-black leading-none select-none pointer-events-none transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105 origin-left"
        style={{ fontSize: '12rem', color: c.numColor, zIndex: 0 }}>
        {String(idx).padStart(2, '0')}
      </div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }}
        className="relative z-10 pl-8" style={{ borderLeft: `3px solid ${c.border}` }}>
        <motion.div variants={itemVariants} className={`badge ${c.badge} mb-8 shadow-sm`}>{badge}</motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
          {title}
        </motion.h2>
        <motion.div variants={itemVariants} className="text-lg md:text-xl text-slate-600 leading-[1.8] space-y-6 font-medium">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

function BudgetBar({ label, amount, pct, color, delay = 0 }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-base font-semibold text-slate-700">{label}</span>
        <span className="text-base font-black text-slate-900" style={mono}>
          {amount} <span className="text-slate-400 font-semibold text-sm">— {pct}%</span>
        </span>
      </div>
      <div className="h-2.5 bg-slate-200/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-slate-200">
        <motion.div className="h-full rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] relative" style={{ backgroundColor: color }}
          initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }} transition={{ duration: 1.2, delay, type: "spring", bounce: 0.2 }}>
          <div className="absolute inset-0 bg-white/20 w-full" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
        </motion.div>
      </div>
    </div>
  );
}

function ChainItem({ index, label, value }) {
  return (
    <motion.div variants={itemVariants} className="flex gap-6 py-6 border-b border-slate-200/60 last:border-0 hover:bg-slate-50/50 transition-colors rounded-xl px-2">
      <span className="font-black text-3xl leading-none flex-shrink-0 w-10 text-slate-300 tabular-nums drop-shadow-sm" style={mono}>
        {String(index).padStart(2, '0')}
      </span>
      <div>
        <p className="text-lg font-bold text-slate-900 tracking-tight">{label}</p>
        <p className="text-base text-slate-600 mt-2 leading-relaxed font-medium">{value}</p>
      </div>
    </motion.div>
  );
}

function Transition({ children }) {
  return <motion.p variants={itemVariants} className="mt-10 text-base font-medium text-slate-500 italic border-t border-slate-200/80 pt-6 flex items-center gap-2"><ArrowRight className="w-5 h-5 text-slate-400"/> {children}</motion.p>;
}

function DataRow({ label, value, bold }) {
  return (
    <div className="flex justify-between items-baseline py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded px-2">
      <span className="text-base font-medium text-slate-600">{label}</span>
      <span className={`text-base ${bold ? 'font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded shadow-sm' : 'font-bold text-slate-800'}`} style={mono}>{value}</span>
    </div>
  );
}

export default function App() {
  const active = useActiveBlock();
  const stageKey = STAGE_MAP[active];
  const bgSrc = BG_MAP[active] || null;

  return (
    <div className="flex min-h-screen bg-[#F4F7FA]">
      
      {/* ═══ LEFT HEMISPHERE (Narrative) ═══ */}
      <div className="w-full lg:w-1/2 overflow-y-auto h-screen px-8 md:px-16 lg:px-20 py-16 pb-48 relative">
        
        {/* Sticky progress indicator */}
        <div className="fixed left-0 top-0 bottom-0 w-1.5 bg-slate-200 z-50">
          <motion.div className="w-full bg-blue-600" 
            style={{ height: `${(active / 9) * 100}%` }} 
            transition={{ type: "spring", stiffness: 50 }} />
        </div>

        {/* ─── BLOCK 0: HERO SLIDE ─── */}
        <div data-block={0} className="min-h-screen flex flex-col justify-center pb-20 pt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }}>
            
            {/* Status Badge — inspired by calculator's live diagnostic badge */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50/80 border border-blue-200/60 mb-10 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-sm font-bold text-blue-700 tracking-wide uppercase">Go-To-Market Strategy · Live Presentation</span>
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[1.0] mb-8">
              Selling<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 [text-shadow:none]">Deal Velocity.</span>
            </h1>
            
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ originX: 0 }}
              className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full mb-10" />

            <p className="text-2xl md:text-3xl text-slate-600 font-medium leading-relaxed max-w-2xl mb-14">
              How Doodle captures <span className="font-bold text-slate-900">50,000 users</span> by attacking the one problem Calendly's product cannot solve.
            </p>
            
            <div className="p-8 glass-panel bg-white/60 max-w-xl">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-5">Presented By</p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-xl font-bold text-slate-800">
                <span>Samuel</span>
                <span>Chloé Stéphane</span>
                <span>Noémi</span>
                <span>Oscar Zinetti</span>
              </div>
              <p className="text-base font-semibold text-slate-500 mt-6 pt-5 border-t border-slate-200">
                Albert School · Mines Paris-PSL · Marketing Fundamentals B1
              </p>
            </div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-16 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-xl border border-slate-100 text-slate-400"
            >
              <ChevronDown className="w-7 h-7" />
            </motion.div>
          </motion.div>
        </div>

        {/* ─── BLOCK 1 ─── */}
        <Block idx={1} badge="Slide 1 — Open With the Hook" badgeColor="blue"
          title={<>A Solutions Architect. <span style={mono}>$150K</span> base. <span style={mono}>8</span> panel calls a month.<br/><span className="text-red-600 font-mono">$18,400</span> gone this quarter — to email threads.</>}>
          <motion.p variants={itemVariants}>That is not a projection. That is the math, right now — calculated from real inputs on the tool to your right.</motion.p>
          <motion.p variants={itemVariants}>Before this presentation explains a single strategy, it forces the target audience to interact with the raw financial cost of their own problem. That number is the villain in this story.</motion.p>
          <motion.p variants={itemVariants}>Our goal: acquire <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>50,000</span> Doodle users in the US market. The instinctive approach — targeting anyone who needs a scheduling link — is a dead end. Calendly already owns that category. A spend-for-spend fight on Google Ads would exhaust a <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>$1,000,000</span> budget in under 90 days.</motion.p>
          <motion.p variants={itemVariants}>The winning move is not to fight where Calendly is strongest. It is to attack where its product structurally breaks down.</motion.p>
          <Transition>The question this raises: why does a tool as sophisticated as Calendly leave this problem completely unsolved?</Transition>
        </Block>

        {/* ─── BLOCK 2 ─── */}
        <Block idx={2} badge="Slide 2 — The Pivot" badgeColor="gray"
          title={<>But the real question is:<br/><span className="text-slate-400">why would a hack like this work sustainably — and for this specific audience?</span></>}>
          <motion.p variants={itemVariants}>A calculator that reveals a pain point is a clever trick. What makes it a <em className="font-serif">system</em> is the chain of logic underneath it: the product-market fit, the channel strategy, the conversion journey, and the viral loop that makes each acquisition cheaper than the last.</motion.p>
          <motion.p variants={itemVariants}>This presentation is not a pitch. It is a proof. Each slide maps to one of the five building blocks of sustainable client acquisition from the Albert School framework — demonstrated live, not just illustrated.</motion.p>
          <motion.p variants={itemVariants}>We will walk through every link in that chain, and show that each one is load-bearing.</motion.p>
          <Transition>Start with the foundation: why does Doodle actually fit this market?</Transition>
        </Block>

        {/* ─── BLOCK 3 ─── */}
        <Block idx={3} badge="Building Block 1 — Product-Market Fit" badgeColor="red"
          title={<>We didn't choose Doodle's target.<br/><span className="text-red-600">The product's structural advantage chose it for us.</span></>}>
          <motion.p variants={itemVariants}>Calendly made a deliberate design decision: optimise for the 1:1 meeting. One person sends a link. The other picks a time. It is an excellent product for that use case.</motion.p>
          <motion.p variants={itemVariants}>High-value enterprise business does not work this way.</motion.p>
          <motion.p variants={itemVariants}>When a Solutions Architect sets up a technical scoping call, they are coordinating their own engineers, their AE, their solutions consultant, and three to five people on the buyer's side — including a CTO whose calendar is managed by three EAs, and a security lead with availability every other Tuesday before 10am.</motion.p>
          <motion.blockquote variants={itemVariants} className="pl-6 py-2 border-l-[4px] border-slate-900 bg-slate-100/50 rounded-r-xl text-slate-900 font-bold text-xl leading-relaxed not-italic my-8 shadow-sm">
            A 1:1 scheduling link sent to that group does not produce a meeting. It produces a reply-all thread.
          </motion.blockquote>
          <motion.p variants={itemVariants}>This is not a criticism of Calendly. It is a product choice that left an entire category — multi-party group coordination — without a purpose-built solution. That gap is exactly where Doodle's multi-party polling lives.</motion.p>
          <motion.p variants={itemVariants} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><strong className="text-slate-900 text-xl font-black block mb-2">The reframe that wins:</strong> We are not selling a scheduling tool. We are selling <strong className="text-blue-600">deal velocity</strong> — the ability to close faster by removing calendar friction from the critical path.</motion.p>
          <Transition>Gap confirmed. But a gap alone is not a strategy — you need a system to reach the people inside it.</Transition>
        </Block>

        {/* ─── BLOCK 4 ─── */}
        <Block idx={4} badge="Building Block 2 — Conversion Journey" badgeColor="blue"
          title={<>Every step was designed around<br/><span className="text-blue-600">a specific moment of friction in the buyer's day.</span></>}>
          <motion.p variants={itemVariants}>The funnel has three steps. Each one exists because of a specific barrier — not because of a template.</motion.p>
          <motion.div variants={itemVariants} className="space-y-6 mt-8">
            <div className="glass-panel p-6">
              <p className="font-black text-slate-900 text-lg mb-2">Step 1 — Interruption (LinkedIn Ads)</p>
              <p>Solutions Architects do not search for scheduling tools. They are not looking for Doodle. We have to interrupt their feed with something precise enough to stop the scroll. The ad to your right was engineered to speak directly in their technical language — a system error they immediately recognise. The call-to-action is not "try Doodle." It is "Calculate My Loss."</p>
            </div>
            <div className="glass-panel p-6">
              <p className="font-black text-slate-900 text-lg mb-2">Step 2 — Value Exchange (Deal Velocity Calculator)</p>
              <p>No purchase ask on first contact. Clicks go to a live calculator that converts their salary, call volume, and wasted hours into a personalised quarterly loss figure. To receive the full report, they provide their work email. The exchange is financial intelligence for contact information.</p>
            </div>
            <div className="glass-panel p-6">
              <p className="font-black text-slate-900 text-lg mb-2">Step 3 — Conversion (Email Nurture Sequence)</p>
              <p>Three emails. Each is a distinct lever. Day 0 anchors the financial pain in their own numbers. Day 2 removes the technical adoption barrier — proving Doodle connects to Salesforce, Slack, and Google Calendar without an IT ticket. Day 5 arms them to sell internally — a four-sentence pitch they can forward directly to their VP of Sales.</p>
            </div>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-8 font-bold text-slate-900 text-xl">No email is filler. Every word has a job.</motion.p>
          <Transition>The journey is designed. The next question: where do we find these people, and how much does it cost to reach them?</Transition>
        </Block>

        {/* ─── BLOCK 5 ─── */}
        <Block idx={5} badge="Building Block 3 — Acquisition Channels" badgeColor="blue"
          title={<>We did not choose LinkedIn because it was trendy.<br/><span className="text-slate-400">We chose it because it is the only platform where we can verify a job title before buying a click.</span></>}>
          <motion.p variants={itemVariants}>Calendly dominates organic search for scheduling. A Google Ads fight would exhaust the budget in 90 days. This is not a creative problem — it is a structural one. Inbound cannot work here because the target is not actively searching for a solution to a problem they have not yet quantified.</motion.p>
          <motion.p variants={itemVariants}>We must build demand outbound. That logic drives everything below.</motion.p>
          
          <motion.div variants={itemVariants} className="my-10">
            <p className="font-black text-slate-900 text-xl mb-4">Unit Economics — Derived, Not Guessed:</p>
            <div className="glass-panel p-6 bg-white/90">
              <DataRow label="Goal" value="10,000 Teams (50,000 users)" />
              <DataRow label="Team LTV" value="$420" />
              <DataRow label="Target LTV:CAC ratio" value="3:1" />
              <DataRow label="Max allowable CAC" value="$140 / team" />
              <DataRow label="Year 1 Budget" value="$1,400,000" bold />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="my-10">
            <p className="font-black text-slate-900 text-xl mb-6">Channel Allocation:</p>
            <div className="glass-panel p-8 space-y-8 bg-white/90">
              <BudgetBar label="LinkedIn — Demand Gen (TOF)" amount="$910K" pct={65} color="#3B82F6" delay={0} />
              <BudgetBar label="LinkedIn + Display — Retargeting (MOF)" amount="$350K" pct={25} color="#60A5FA" delay={0.2} />
              <BudgetBar label="Google Search — High-Intent (BOF)" amount="$140K" pct={10} color="#94A3B8" delay={0.4} />
            </div>
          </motion.div>
          
          <motion.p variants={itemVariants}>LinkedIn at <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>65%</span> because it is the only platform with verified job-title targeting. Nobody Googles "multi-party scheduling" — the demand does not yet exist. We must create it.</motion.p>
          <motion.p variants={itemVariants}>Retargeting at <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>25%</span> because enterprise professionals rarely convert on first touch. This budget recaptures Calculator visitors who did not submit their email.</motion.p>
          <motion.p variants={itemVariants}>Google Search at <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>10%</span> to harvest the intent our LinkedIn spend creates. Targets "Doodle for Teams" and "Calendly alternatives for enterprise" — the searches that appear after a prospect has already seen the ad.</motion.p>
          <Transition>The channel logic is sound. But does the math hold over 12 months — and how does it improve?</Transition>
        </Block>

        {/* ─── BLOCK 6 ─── */}
        <Block idx={6} badge="Building Block 4 — Experimentation & Data" badgeColor="emerald"
          title={<>Every number in this plan is derived, not guessed.<br/><span className="text-emerald-500">The CAC curve is a hypothesis we are designed to compress.</span></>}>
          <motion.p variants={itemVariants}>Our customer acquisition cost does not stay flat. It follows a deliberate compression curve as the funnel matures from expensive cold outreach to organic product-led growth.</motion.p>
          
          <motion.div variants={itemVariants} className="space-y-6 mt-8">
            <p><strong className="text-slate-900 text-lg">Phase 1 — Month 3 · CAC: <span className="font-mono bg-red-100 text-red-700 px-1 rounded">$140</span></strong><br/>Launch. Zero brand presence in B2B Pre-Sales. Every conversion is paid at full LinkedIn market rate. At <span style={mono}>$140</span> CAC against <span style={mono}>$420</span> LTV the unit economics hold. The work of this phase is not efficiency — it is building the user base and email database that makes Phase 2 possible.</p>
            <p><strong className="text-slate-900 text-lg">Phase 2 — Month 6 · CAC: <span className="font-mono bg-yellow-100 text-yellow-700 px-1 rounded">$110</span></strong><br/>The email database built in Months 1–3 converts at low marginal cost. Google Search begins capturing the intent our LinkedIn spend already created, at a significantly lower CPC. Month 6 is the inflection point where we stop primarily buying users and start primarily converting them.</p>
            <p><strong className="text-slate-900 text-lg">Phase 3 — Month 12 · CAC: <span className="font-mono bg-emerald-100 text-emerald-700 px-1 rounded">$85</span></strong><br/>The product itself becomes a distribution vector.</p>
          </motion.div>
          
          <motion.p variants={itemVariants} className="mt-8 font-medium">
            The mechanism: we acquire 1 Solutions Architect via paid LinkedIn. They immediately send Doodle multi-party polls to their clients — the buyer's CTO, Security Lead, Project Manager. <strong className="text-slate-900 font-bold bg-slate-100 px-1 rounded" style={mono}>4–5 high-level external stakeholders</strong> experience Doodle's group scheduling firsthand, at zero acquisition cost. A portion of those stakeholders adopt Doodle for their own teams organically.
          </motion.p>
          
          <motion.p variants={itemVariants}>Each paid acquisition partially funds several unpaid ones. Blended CAC drops as organic signups increase as a share of total growth.</motion.p>
          
          {/* Dark Premium CAC card */}
          <motion.div variants={itemVariants} className="bg-slate-900 rounded-2xl p-8 mt-10 grid grid-cols-3 gap-6 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500" />
            <div>
              <p className="text-4xl font-black text-white" style={mono}>$140</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Month 3</p>
              <p className="text-sm font-medium text-slate-500 mt-1">LinkedIn cold demand</p>
            </div>
            <div className="border-l border-r border-slate-700/50 flex flex-col items-center justify-center">
              <p className="text-4xl font-black text-white" style={mono}>$110</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Month 6</p>
              <p className="text-sm font-medium text-slate-500 mt-1">Email nurture + Search</p>
            </div>
            <div>
              <p className="text-4xl font-black text-emerald-400 [text-shadow:_0_0_20px_rgb(52_211_153_/_0.4)]" style={mono}>$85</p>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mt-2">Month 12</p>
              <p className="text-sm font-medium text-emerald-600/80 mt-1">Viral loop + PLG</p>
            </div>
          </motion.div>
          <Transition>The math compresses. But only if we acquire the right customers — volume without quality collapses the model.</Transition>
        </Block>

        {/* ─── BLOCK 7 ─── */}
        <Block idx={7} badge="Building Block 5 — Customer Quality Over Volume" badgeColor="gray"
          title={<>We could have targeted "anyone who schedules meetings."<br/><span className="text-slate-400">We rejected that. We went narrower to go bigger.</span></>}>
          <motion.p variants={itemVariants}>Solutions Architects were not chosen because they were convenient. They were chosen because they satisfy every quality criterion simultaneously.</motion.p>
          <motion.ul variants={containerVariants} initial="hidden" whileInView="show" className="space-y-4 my-8 pl-0">
            <motion.li variants={itemVariants} className="glass-panel p-5 bg-white/80 border-l-4 border-l-blue-500 rounded-l-none">They convert faster — high pain, high urgency, direct line from the Calculator output to a commission loss they personally feel.</motion.li>
            <motion.li variants={itemVariants} className="glass-panel p-5 bg-white/80 border-l-4 border-l-emerald-500 rounded-l-none">They stay longer — enterprise team accounts have natural stickiness. Once Doodle is embedded in a pre-sales workflow, it becomes infrastructure, not a tool.</motion.li>
            <motion.li variants={itemVariants} className="glass-panel p-5 bg-white/80 border-l-4 border-l-indigo-500 rounded-l-none">They generate referrals automatically — through the viral loop, every acquisition sends Doodle polls to <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>4–5</span> external stakeholders at zero cost.</motion.li>
          </motion.ul>
          <motion.p variants={itemVariants} className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4 py-2 my-8 bg-slate-100/50 rounded-r-lg">
            And every <span className="font-mono bg-slate-200 px-1 rounded">$420</span> Team Plan has a natural expansion path to a <span className="font-mono bg-slate-200 px-1 rounded">$15,000+</span> organisation-wide enterprise contract — a <strong className="text-emerald-600">35× revenue multiplier</strong> per account, unlocked by the same user relationship.
          </motion.p>
          <motion.p variants={itemVariants}>The nurture sequence to your right is the mechanism that moves a high-quality lead from Calculator output to Team Trial without feeling like a sales sequence. Each email removes one specific barrier. No email asks for anything the prospect has not already agreed to intellectually.</motion.p>
          <Transition>Quality secured, viral loop active, math compressing. What does Year 2 look like when all of this compounds?</Transition>
        </Block>

        {/* ─── BLOCK 8 ─── */}
        <Block idx={8} badge="Slide 8 — The Airbnb Moment" badgeColor="emerald"
          title={<>The Calculator is our Craigslist hack.<br/><span className="text-emerald-500">The enterprise upsell is our "Belong Anywhere."</span></>}>
          <motion.p variants={itemVariants}>Airbnb did not just hack Craigslist. They used the users Craigslist gave them to build trust infrastructure — reviews, host guarantees, brand campaigns, localised content — that made the hack obsolete. Year 1 is our Craigslist hack. Year 2 is our trust infrastructure.</motion.p>
          
          <motion.div variants={itemVariants} className="glass-panel p-8 my-8 bg-slate-900 text-slate-300 shadow-2xl">
            <p className="text-white font-black text-2xl mb-4">The Bowling Alley Model:</p>
            <p className="text-lg leading-relaxed font-medium">We do not diversify at random. We use the beachhead we built — B2B Pre-Sales at US tech companies — as a precision instrument to knock down adjacent markets we deliberately avoided in Year 1.</p>
          </motion.div>
          
          <motion.p variants={itemVariants}>We rejected High Finance and Legal in Year 1 because we lacked the enterprise security credentials to pass their IT audits. Year 1 changes that. Our major tech company case studies satisfy those requirements.</motion.p>
          <motion.ul variants={containerVariants} initial="hidden" whileInView="show" className="list-disc pl-6 space-y-4 my-6 font-medium text-lg">
            <motion.li variants={itemVariants}>The "Deal Velocity Calculator" becomes the <strong>"Billable Hours Loss Calculator"</strong> for corporate lawyers — same logic, same mechanic, different P&L pain point.</motion.li>
            <motion.li variants={itemVariants}>The same architecture redeploys for M&A coordination teams in investment banking.</motion.li>
          </motion.ul>
          
          <motion.div variants={itemVariants} className="mt-10 p-6 border-2 border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm">
            <p className="text-slate-900 font-black text-xl mb-3">Phase 3 — Top-Down Enterprise Upsell:</p>
            <p className="mb-4">We move from bottom-up product-led growth (<span className="font-bold bg-slate-100 px-1 rounded" style={mono}>$420</span>/year) to top-down enterprise sales (<span className="font-bold bg-slate-100 px-1 rounded" style={mono}>$15,000+</span> organisation-wide contracts). We already have active users inside these organisations. We are not cold prospecting. We are asking for formal recognition of a relationship that already exists.</p>
            <p><strong className="text-slate-900">The leverage:</strong> we are not asking for permission to enter — we are converting <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>10,000</span> team-level relationships into enterprise contracts with the data and case studies those teams generated.</p>
          </motion.div>
          <Transition>Every piece of this connects. The final question: how do we know each link is actually load-bearing?</Transition>
        </Block>

        {/* ─── BLOCK 9 ─── */}
        <Block idx={9} badge="Slide 9 — The Logic Chain" badgeColor="blue"
          title={<>Client acquisition that scales is not one clever idea.<br/><span className="text-blue-600">It is a chain where each link is load-bearing.</span></>}>
          <motion.p variants={itemVariants} className="text-xl font-medium">Remove any one of these links and the model collapses. Leave them all in place and <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>$1,400,000</span> becomes <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>$3,000,000</span> becomes market leadership.</motion.p>
          <motion.div variants={containerVariants} initial="hidden" whileInView="show" className="mt-10 mb-12 glass-panel p-4 bg-white/80">
            <ChainItem index={1} label="Product-Market Fit" value="1:1 links break in group settings. Doodle's multi-party polling is the structural advantage Calendly's product cannot replicate." />
            <ChainItem index={2} label="Conversion Journey" value="LinkedIn interruption → Calculator value exchange → 3-email nurture. Each step designed around the friction point that would kill it." />
            <ChainItem index={3} label="Acquisition Channels" value="$910K LinkedIn outbound because Calendly owns organic search and verified job-title targeting exists nowhere else." />
            <ChainItem index={4} label="Experimentation & Data" value="CAC compresses from $140 to $85 via a PLG viral loop that mirrors Calendly's own growth model, applied where Calendly underperforms." />
            <ChainItem index={5} label="Customer Quality" value="Solutions Architects convert faster, stay longer, and generate organic referrals. Every $420 account has a $15,000 expansion path." />
          </motion.div>
          <motion.p variants={itemVariants} className="mt-8 text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4 py-2 bg-slate-100/50 rounded-r-lg">The jury's unspoken question is always: did they understand the theory, or did they just build something?</motion.p>
          <motion.p variants={itemVariants} className="mt-6 font-medium">This presentation answers both simultaneously. The Calculator to your right is not a trick. It is the theory, demonstrated live. The number it produced at the start of this presentation is the same problem this entire chain was built to solve.</motion.p>
          <motion.p variants={itemVariants} className="text-3xl font-black text-slate-900 mt-10 tracking-tight text-center bg-white py-6 rounded-2xl shadow-sm border border-slate-200">The chain is closed.</motion.p>
        </Block>

      </div>

      {/* ═══ RIGHT HEMISPHERE (Assets) ═══ */}
      <div className="hidden lg:flex w-1/2 sticky top-0 h-screen items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          {bgSrc && (
            <motion.div key={bgSrc} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgSrc})` }}>
              <div className="absolute inset-0 backdrop-blur-3xl bg-[#F4F7FA]/70" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Subtle radial glow behind the asset */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-12">
          <AnimatePresence mode="wait">
            <motion.div key={stageKey} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
              {stageKey === 'hero' && (
                <div className="w-full flex flex-col items-center gap-8">
                   <div className="w-56 h-56 bg-white rounded-[48px] shadow-2xl flex flex-col items-center justify-center border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500 group cursor-default">
                     <Calendar className="w-20 h-20 text-blue-600 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                     <span className="text-3xl font-black text-slate-900 mt-4 tracking-tight">doodle</span>
                   </div>
                   <p className="text-lg font-semibold text-slate-500 text-center max-w-xs">Enterprise group scheduling that closes deals faster.</p>
                </div>
              )}
              {stageKey === 'calc' && <AssetCalculator />}
              {stageKey === 'linkedin' && <AssetLinkedIn />}
              {stageKey === 'tof' && <AssetTOF />}
              {stageKey === 'mof' && <AssetMOF />}
              {stageKey === 'nurture' && <AssetNurture />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Modern Dot Indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="relative flex items-center justify-center w-4 h-4">
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${active === i ? 'bg-slate-900 scale-[2]' : 'bg-slate-300'}`} />
              {active === i && (
                <motion.div layoutId="active-dot-ring" className="absolute inset-0 rounded-full border border-slate-900" transition={{ type: "spring", stiffness: 200, damping: 20 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
