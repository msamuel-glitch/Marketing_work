import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetCalculator, AssetLinkedIn, AssetTOF, AssetMOF, AssetNurture } from './StageAssets';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';

const STAGE_MAP = {
  0: 'hero',
  1: 'calc',
  2: 'tof',
  3: 'tof',
  4: 'nurture',
  5: 'linkedin',
  6: 'mof',
  7: 'mof',
  8: 'calc',
};

const BG_MAP = { 1: '/asset-calendly.png', 8: '/asset-doodle.png', 6: '/asset-viral.png' };

const BLOCK_COLORS = {
  blue:    { badge: 'badge-blue',    border: '#3B82F6', numColor: '#DBEAFE' },
  red:     { badge: 'badge-red',     border: '#EF4444', numColor: '#FEE2E2' },
  emerald: { badge: 'badge-emerald', border: '#10B981', numColor: '#D1FAE5' },
  gray:    { badge: 'badge-gray',    border: '#94A3B8', numColor: '#F1F5F9' },
  indigo:  { badge: 'badge-indigo',  border: '#6366F1', numColor: '#E0E7FF' },
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
  const c = BLOCK_COLORS[badgeColor] || BLOCK_COLORS.gray;
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
          <span style={mono}>{amount}</span> <span className="text-slate-400 font-semibold text-sm" style={mono}>· {pct}%</span>
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
      <span className={`text-base ${bold ? 'font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded shadow-sm' : 'font-bold text-slate-800'}`}>{value}</span>
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
            style={{ height: `${(active / 8) * 100}%` }} 
            transition={{ type: "spring", stiffness: 50 }} />
        </div>

        {/* ─── BLOCK 0: HERO SLIDE ─── */}
        <div data-block={0} className="min-h-screen flex flex-col justify-center pb-20 pt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }}>
            
            {/* Status Badge */}
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
              How Doodle captures <span className="font-bold text-slate-900" style={mono}>50,000</span> users by attacking the one problem Calendly's product cannot solve.
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
        <Block idx={1} badge="The Growth Hack" badgeColor="blue"
          title={<>We started with a hack.<br/><span className="text-slate-400">Here is what it does, and why we built it.</span></>}>
          <motion.p variants={itemVariants}>Mégane opened this session with a question: how do startups go viral? Airbnb hijacked Craigslist. Dropbox gave away storage for referrals and grew <span style={mono}>3900%</span>. Hotmail added a line to every outgoing email and reached 12 million users in 18 months.</motion.p>
          <motion.p variants={itemVariants}>Our hack is different in mechanism but identical in logic. We built a live calculator that converts three real inputs: salary, call volume, and hours wasted per call, into a single quarterly loss figure for any Solutions Architect working enterprise pre-sales. That number is not hypothetical. It is calculated from their own inputs, right now, on the tool to your right.</motion.p>
          <motion.p variants={itemVariants}>The call-to-action is not "try Doodle." It is "Calculate My Loss."</motion.p>
          <motion.p variants={itemVariants}>No product pitch. No feature list. Just a number that proves the problem is real and makes it personal. The person who interacts with this calculator understands immediately why they need a better tool. That is the growth hack.</motion.p>
          <motion.p variants={itemVariants}>Our goal: acquire <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>50,000</span> Doodle users in the US market by targeting <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>10,000</span> enterprise teams. Total Year 1 budget: <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>$1,400,000</span>.</motion.p>
          <Transition>But Mégane also asked: is client acquisition just about hacking? The answer changes everything about how this strategy was built.</Transition>
        </Block>

        {/* ─── BLOCK 2 ─── */}
        <Block idx={2} badge="Sustainable vs. One-Time" badgeColor="gray"
          title={<>A hack gets you in the door.<br/><span className="text-slate-400">It does not keep you there.</span></>}>
          <motion.p variants={itemVariants}>Airbnb's Craigslist hack gave them their first users. It did not make them a 150-billion-dollar company. What came after the hack did: trust-building, brand campaigns, SEO, localised content, partnerships. Sustainable acquisition comes from a system, not a trick.</motion.p>
          <motion.p variants={itemVariants}>A calculator that reveals a pain point is a clever trick. What makes it a system is the chain underneath it. Before we spent a single euro on ads, we had to answer five questions that Mégane's framework defines as the building blocks of sustainable growth. Each one is addressed in the slides that follow.</motion.p>
          <motion.p variants={itemVariants}>This presentation is not a pitch. It is a proof. Every building block from the course is demonstrated live, not just illustrated on a slide.</motion.p>
          <Transition>Start with the foundation. Does Doodle actually fit this market?</Transition>
        </Block>

        {/* ─── BLOCK 3 ─── */}
        <Block idx={3} badge="Building Block 1: Product-Market Fit" badgeColor="red"
          title={<>We did not choose Doodle's target.<br/><span className="text-red-600">The product's structural advantage chose it for us.</span></>}>
          <motion.p variants={itemVariants}>Mégane's first building block is clear: sustainable acquisition starts with a product that solves a real need. You cannot growth-hack your way out of a bad product. So before any strategy, we had to answer honestly: does Doodle actually fit a real market?</motion.p>
          <motion.p variants={itemVariants}>Calendly made a deliberate product decision: optimise for the 1-on-1 meeting. One person sends a link. The other picks a time. That is an excellent product for that use case.</motion.p>
          <motion.p variants={itemVariants}>High-value enterprise business does not work that way.</motion.p>
          <motion.p variants={itemVariants}>When a Solutions Architect sets up a technical scoping call, they are coordinating their own engineers, their AE, their solutions consultant, and three to five people on the buyer's side, including a CTO whose calendar is managed by three EAs and a security lead with availability every other Tuesday before 10am.</motion.p>
          <motion.blockquote variants={itemVariants} className="pl-5 border-l-[3px] border-[#111827] text-[#111827] font-semibold text-[17px] leading-relaxed not-italic my-6 bg-slate-100/50 py-3 pr-4 rounded-r-xl">
            A 1-on-1 scheduling link sent to that group does not produce a meeting. It produces a reply-all thread.
          </motion.blockquote>
          <motion.p variants={itemVariants}>This is not a criticism of Calendly. It is a product decision that left an entire category, multi-party group coordination, without a purpose-built solution. That gap is exactly where Doodle's multi-party polling lives.</motion.p>
          <motion.p variants={itemVariants}>We are not selling a scheduling tool. We are selling deal velocity: the ability to close faster by removing calendar friction from the critical path. That is a real need. That is genuine product-market fit.</motion.p>
          <Transition>PMF confirmed. Next question: how does a prospect move from seeing an ad to becoming a paying customer?</Transition>
        </Block>

        {/* ─── BLOCK 4 ─── */}
        <Block idx={4} badge="Building Block 2: Conversion Journey" badgeColor="blue"
          title={<>Every step was designed around<br/><span className="text-blue-600">a specific moment of friction.</span></>}>
          <motion.p variants={itemVariants}>Mégane's second building block asks us to map the steps a customer takes, identify the key moments, and understand what motivates or blocks them at each stage. Our funnel has three steps. Each one exists because of a specific barrier, not a template.</motion.p>
          <motion.div variants={itemVariants} className="space-y-6 mt-8">
            <div className="glass-panel p-5 border-t-2 border-slate-400">
              <p className="font-black text-slate-900 text-lg mb-2">Step 1: Interruption</p>
              <p className="text-slate-600">Solutions Architects do not search for scheduling tools. We have to interrupt their LinkedIn feed with something precise enough to stop the scroll. The TOF ad was engineered to speak in their technical language, a system error they immediately recognise. The call-to-action is not "try Doodle." It is "Calculate My Loss."</p>
            </div>
            <div className="glass-panel p-5 border-t-2 border-blue-400">
              <p className="font-black text-slate-900 text-lg mb-2">Step 2: Value Exchange</p>
              <p className="text-slate-600">No purchase ask on first contact. Clicks go to the live calculator that converts their inputs into a personalised quarterly loss figure. To receive the full report, they provide their work email. The exchange is financial intelligence for contact information.</p>
            </div>
            <div className="glass-panel p-5 border-t-2 border-emerald-400">
              <p className="font-black text-slate-900 text-lg mb-2">Step 3: Conversion</p>
              <p className="text-slate-600">Three emails. Each is a distinct lever. Day 0 anchors the financial pain in their own numbers. Day 2 removes the technical adoption barrier, proving Doodle connects to Salesforce, Slack, and Google Calendar without an IT ticket. Day 5 arms them to sell internally with a four-sentence pitch they can forward to their VP of Sales.</p>
            </div>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-8 font-bold text-slate-900 text-xl">No email is filler. Every word has a job.</motion.p>
          <Transition>Journey mapped. Now: where do we find these people, and what does it cost to reach them?</Transition>
        </Block>

        {/* ─── BLOCK 5 ─── */}
        <Block idx={5} badge="Building Block 3: Acquisition Channels" badgeColor="blue"
          title={<>We did not choose LinkedIn because it was trendy.<br/><span className="text-slate-400">We chose it because it is the only platform where we can verify a job title before buying a click.</span></>}>
          <motion.p variants={itemVariants}>Mégane's third building block: not all channels are equal. Choose channels based on where your audience is, not what is trendy. For Doodle targeting Solutions Architects, two facts determined the channel decision.</motion.p>
          <motion.p variants={itemVariants}>First: Calendly dominates organic search for scheduling. A Google Ads fight would exhaust the budget in 90 days. This is not a creative problem. It is structural. Inbound cannot work here because the target is not actively searching for a solution to a problem they have not yet quantified.</motion.p>
          <motion.p variants={itemVariants}>Second: LinkedIn is the only platform offering verified job-title targeting at scale. We can buy impressions specifically from people whose job title is "Solutions Architect" at US enterprise tech companies. No other platform offers that precision.</motion.p>
          <motion.p variants={itemVariants}>We must build demand outbound. That logic drives the budget allocation below.</motion.p>
          
          <motion.div variants={itemVariants} className="my-10">
            <div className="glass-panel p-6 bg-white/90">
              <DataRow label="Goal" value={<span style={mono}>10,000 Teams (50,000 users)</span>} />
              <DataRow label="Team LTV" value={<span style={mono}>$420</span>} />
              <DataRow label="Max allowable CAC" value={<span style={mono}>$140</span>} />
              <DataRow label="Year 1 Budget" value={<span style={mono}>$1,400,000</span>} bold />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="my-10">
            <div className="glass-panel p-8 space-y-8 bg-white/90">
              <BudgetBar label="LinkedIn: Demand Gen (TOF)" amount={<span style={mono}>$910K</span>} pct={<span style={mono}>65</span>} color="#3B82F6" delay={0} />
              <BudgetBar label="LinkedIn + Display: Retargeting (MOF)" amount={<span style={mono}>$350K</span>} pct={<span style={mono}>25</span>} color="#60A5FA" delay={0.2} />
              <BudgetBar label="Google Search: High-Intent Capture (BOF)" amount={<span style={mono}>$140K</span>} pct={<span style={mono}>10</span>} color="#94A3B8" delay={0.4} />
            </div>
          </motion.div>
          
          <motion.p variants={itemVariants}>Google Search at <span className="font-bold bg-slate-100 px-1 rounded" style={mono}>10%</span> exists to harvest the intent our LinkedIn spend already created. It targets "Doodle for Teams" and "Calendly alternatives for enterprise," the searches that appear after a prospect has seen the ad. The channel mix works together.</motion.p>
          <Transition>The channels are chosen. Does the math hold over 12 months, and does it improve?</Transition>
        </Block>

        {/* ─── BLOCK 6 ─── */}
        <Block idx={6} badge="Building Block 4: Experimentation and Data" badgeColor="emerald"
          title={<>Every number in this plan is derived, not guessed.<br/><span className="text-emerald-500">The CAC curve is a hypothesis we are designed to compress.</span></>}>
          <motion.p variants={itemVariants}>Mégane's fourth building block: use data to inform decisions, not just to report results. Look beyond vanity metrics. Test, learn, and iterate with a goal and a hypothesis. Our hypothesis is specific: customer acquisition cost compresses over 12 months as the funnel matures from cold outreach to product-led growth.</motion.p>
          
          <motion.div variants={itemVariants} className="bg-[#111827] rounded-xl p-6 flex justify-between items-center mt-4 mb-8">
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Month 3</p>
              <p className="text-white text-2xl font-black mb-1" style={mono}>$140</p>
              <p className="text-gray-500 text-xs font-semibold">LinkedIn cold demand</p>
            </div>
            <div className="text-gray-600 text-xl font-bold">→</div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Month 6</p>
              <p className="text-white text-2xl font-black mb-1" style={mono}>$110</p>
              <p className="text-gray-500 text-xs font-semibold">Email nurture and Search</p>
            </div>
            <div className="text-gray-600 text-xl font-bold">→</div>
            <div className="flex flex-col items-center">
              <p className="text-emerald-400 text-xs uppercase font-bold tracking-widest mb-1">Month 12</p>
              <p className="text-emerald-400 text-2xl font-black mb-1" style={mono}>$85</p>
              <p className="text-emerald-500/80 text-xs font-semibold">Viral loop and PLG</p>
            </div>
          </motion.div>

          <motion.p variants={itemVariants}>Phase 1, Month 3, CAC <span className="font-mono bg-red-100 text-red-700 px-1 rounded" style={mono}>$140</span>: Every conversion is paid at full LinkedIn market rate. The unit economics hold at <span style={mono}>$140</span> against a <span style={mono}>$420</span> LTV. The work of this phase is not efficiency. It is building the user base that makes Phase 2 possible.</motion.p>
          <motion.p variants={itemVariants}>Phase 2, Month 6, CAC <span className="font-mono bg-yellow-100 text-yellow-700 px-1 rounded" style={mono}>$110</span>: The email database converts at low marginal cost. Google Search captures intent our LinkedIn spend already created, at a lower CPC. Month 6 is the inflection point.</motion.p>
          <motion.p variants={itemVariants}>Phase 3, Month 12, CAC <span className="font-mono bg-emerald-100 text-emerald-700 px-1 rounded" style={mono}>$85</span>: The product becomes its own distribution vector. Each Solutions Architect we acquire immediately sends Doodle polls to their clients: the buyer's CTO, Security Lead, Project Manager. Between <span style={mono}>4</span> and <span style={mono}>5</span> high-level external stakeholders experience the product firsthand at zero acquisition cost. A share of those stakeholders adopt Doodle for their own teams organically.</motion.p>
          <motion.p variants={itemVariants}>Each paid acquisition partially funds several unpaid ones. This mirrors Calendly's own growth mechanism, applied where Calendly underperforms.</motion.p>
          <Transition>The math compresses. But only if we acquire the right customers. Volume without quality breaks the model.</Transition>
        </Block>

        {/* ─── BLOCK 7 ─── */}
        <Block idx={7} badge="Building Block 5: Customer Quality" badgeColor="gray"
          title={<>We could have targeted anyone who schedules meetings.<br/><span className="text-slate-400">We rejected that. We went narrower to go further.</span></>}>
          <motion.p variants={itemVariants}>Mégane's fifth building block: acquisition is not about volume. It is about attracting the right customers. High-quality clients convert faster, stay longer, and generate referrals. Optimise for both quantity and quality.</motion.p>
          <motion.p variants={itemVariants}>Solutions Architects were not chosen because they were convenient. They were chosen because they satisfy every quality criterion at once.</motion.p>
          
          <motion.div variants={containerVariants} initial="hidden" whileInView="show" className="space-y-4 my-8 pl-0">
            <motion.div variants={itemVariants} className="glass-panel p-5 bg-white/80 border-l-4 border-l-blue-500 rounded-l-none">
              <strong className="block text-slate-900 mb-1">They convert faster.</strong>
              High pain, high urgency. The calculator output is a commission loss they personally feel. The distance from awareness to trial is short.
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-5 bg-white/80 border-l-4 border-l-emerald-500 rounded-l-none">
              <strong className="block text-slate-900 mb-1">They stay longer.</strong>
              Once Doodle is embedded in a pre-sales workflow, it becomes infrastructure. Enterprise team accounts have natural stickiness.
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-5 bg-white/80 border-l-4 border-l-indigo-500 rounded-l-none">
              <strong className="block text-slate-900 mb-1">They generate referrals automatically.</strong>
              Through the viral loop, every acquisition sends Doodle polls to <span style={mono}>4</span> to <span style={mono}>5</span> external stakeholders at zero cost. The product acquires its own next users.
            </motion.div>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4 py-2 my-8 bg-slate-100/50 rounded-r-lg">
            Every <span className="font-mono bg-slate-200 px-1 rounded" style={mono}>$420</span> Team Plan carries a natural expansion path to a <span className="font-mono bg-slate-200 px-1 rounded" style={mono}>$15,000</span> organisation-wide enterprise contract. That is a 35x revenue multiplier per account, unlocked by the same user relationship we already built.
          </motion.p>
          <Transition>Five building blocks confirmed. Now: what happens after the hack, just like Airbnb?</Transition>
        </Block>

        {/* ─── BLOCK 8 ─── */}
        <Block idx={8} badge="After the Hack" badgeColor="emerald"
          title={<>The calculator was our Craigslist hack.<br/><span className="text-emerald-500">Sustainable growth is what comes next.</span></>}>
          <motion.p variants={itemVariants}>Mégane asked: what did Airbnb do after the Craigslist hack? They built trust initiatives, brand campaigns, localised content, SEO, and partnerships. Sustainable client acquisition came from a mix of smart marketing, product trust, and value-building, not just one clever trick.</motion.p>
          <motion.p variants={itemVariants}>Our answer to the same question, applied to Doodle:</motion.p>
          <motion.p variants={itemVariants}>Year 1 establishes the beachhead. <span style={mono}>10,000</span> enterprise pre-sales teams in US tech. The Craigslist hack, the calculator, the TOF ad, the nurture sequence. Every link in the chain working together.</motion.p>
          <motion.p variants={itemVariants}>Year 2 deploys the trust infrastructure those <span style={mono}>10,000</span> teams created.</motion.p>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-10">
            <div className="glass-panel p-5 bg-white/80">
              <p className="font-black text-slate-900 text-lg mb-2">Adjacent Markets</p>
              <p className="text-slate-600">The "Deal Velocity Calculator" becomes the "Billable Hours Loss Calculator" for corporate lawyers. The same architecture, a different P&L pain point. The IT security credentials earned in Year 1 satisfy the compliance requirements that blocked Year 1 entry into legal and finance.</p>
            </div>
            <div className="glass-panel p-5 bg-white/80">
              <p className="font-black text-slate-900 text-lg mb-2">Enterprise Upsell</p>
              <p className="text-slate-600">We move from product-led growth at <span style={mono}>$420</span> per year to enterprise sales at <span style={mono}>$15,000</span> per organisation. We already have active users inside these companies. We are not cold prospecting. We are asking for formal recognition of a relationship that already exists.</p>
            </div>
          </motion.div>
          
          <motion.div variants={containerVariants} initial="hidden" whileInView="show" className="mb-10 glass-panel p-4 bg-white/80">
            <ChainItem index={1} label="Product-Market Fit" value="1-on-1 links break in group settings. Doodle's multi-party polling is the structural advantage Calendly cannot replicate." />
            <ChainItem index={2} label="Conversion Journey" value="Interruption, value exchange, nurture. Each step designed around the friction point that would otherwise kill it." />
            <ChainItem index={3} label="Acquisition Channels" value={<><span style={mono}>$910K</span> LinkedIn outbound because Calendly owns organic search and verified job-title targeting exists nowhere else.</>} />
            <ChainItem index={4} label="Experimentation and Data" value={<>CAC compresses from <span style={mono}>$140</span> to <span style={mono}>$85</span> via a viral loop. Hypothesis tested, result tracked.</>} />
            <ChainItem index={5} label="Customer Quality" value={<>Solutions Architects convert faster, stay longer, and generate organic referrals. Every <span style={mono}>$420</span> account has a <span style={mono}>$15,000</span> expansion path.</>} />
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-xl font-bold text-slate-900">Mégane said it best: no new customers, no business. This is the system we built to make sure that never happens to Doodle.</motion.p>
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
          {Array.from({ length: 9 }).map((_, i) => (
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
