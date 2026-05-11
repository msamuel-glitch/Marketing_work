import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssetCalculator, AssetLinkedIn, AssetCreatives, AssetNurture, AssetMarket, AssetAudience, AssetChannel, AssetCAC, AssetExpansion } from './StageAssets';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';

const STAGE_MAP = {
  0: 'hero',
  1: 'market',
  2: 'audience',
  3: 'channel',
  4: 'creatives',
  5: 'calc',
  6: 'linkedin',
  7: 'nurture',
  8: 'cac',
  9: 'expansion',
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
            style={{ height: `${(active / 9) * 100}%` }} 
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
        <Block idx={1} badge="I. The Market" badgeColor="blue"
          title={<>Calendly has already won the scheduling category.<br/><span className="text-slate-400">The question is which category it has not won yet.</span></>}>
          <motion.p variants={itemVariants}>The objective is to acquire <span style={mono}>50,000</span> Doodle users in the US market. The instinctive approach is to target anyone who schedules meetings online. That approach fails for one reason: Calendly has already occupied that space. Attempting to outspend them on Google Ads would exhaust a <span style={mono}>$1,000,000</span> budget in under three months without meaningful return.</motion.p>
          <motion.p variants={itemVariants}>Calendly was built for one scenario: a single person sends a link, and another person picks a time. That works well for simple bilateral meetings. It breaks entirely when the situation involves multiple parties from different organisations. Scheduling a technical scoping call between five or six stakeholders who report to different companies and different leadership chains is not a problem that a calendar link can solve. It requires coordination, compromise, and a tool designed for group consensus.</motion.p>
          <motion.p variants={itemVariants}>Doodle has always had a structural advantage in exactly that scenario: multi-party polling. The US enterprise market has not been shown that advantage in a focused, financially compelling way. That is the opening this campaign was built to fill. The strategy does not compete on Calendly's terms. It reframes the product entirely. We are not selling a calendar tool. We are selling the speed at which a team closes a deal.</motion.p>
          <Transition>That gap belongs to someone. The question is who occupies it.</Transition>
        </Block>

        {/* ─── BLOCK 2 ─── */}
        <Block idx={2} badge="II. The Audience" badgeColor="gray"
          title={<>Two sectors were evaluated.<br/><span className="text-slate-400">One was selected. The others were rejected with reasons.</span></>}>
          <motion.p variants={itemVariants}>Before settling on a target, two other sectors were considered. The legal industry and high finance both involve frequent multi-party coordination between external stakeholders, and both have the budget to pay for a solution. Both were rejected. Enterprise IT security requirements in those sectors create adoption barriers that are too slow and too costly to clear within the timeline and budget of Year 1. They are not the wrong audience permanently. They are the wrong audience now.</motion.p>
          <motion.p variants={itemVariants}>The selected audience is Solutions Architects and Pre-Sales Engineers at US technology companies. These are professionals whose entire role depends on moving complex technical sales forward. They regularly bring together their own engineers, their sales colleagues, and multiple contacts from the buyer's side, including technical leads and C-suite decision makers, onto a single call. Every day spent coordinating that call over email is a day the contract does not move.</motion.p>
          <motion.p variants={itemVariants}>The pitch to this audience is not about scheduling. It is about deal velocity, which is directly tied to their commission. A Solutions Architect earning <span style={mono}>$150,000</span> per year who runs eight panel scoping calls per month and loses 2.5 hours per call to scheduling back-and-forth is losing <span style={mono}>$18,400</span> per quarter to calendar coordination. That is not a productivity problem. That is a compensation problem.</motion.p>
          <motion.blockquote variants={itemVariants} className="pl-5 border-l-[3px] border-[#111827] text-[#111827] font-semibold text-[17px] leading-relaxed not-italic my-6 bg-slate-100/50 py-3 pr-4 rounded-r-xl">
            The biggest bottleneck in your pipeline is not the technical validation. It is the two weeks you lose trying to get everyone into the same room.
          </motion.blockquote>
          <Transition>Audience confirmed. Now, where are they and what does it cost to reach them?</Transition>
        </Block>

        {/* ─── BLOCK 3 ─── */}
        <Block idx={3} badge="III. The Channel Logic" badgeColor="blue"
          title={<>We could not buy our way into organic search.<br/><span className="text-slate-400">So we went to the only channel that confirms a job title before the click.</span></>}>
          <motion.p variants={itemVariants}>Calendly dominates organic search for scheduling. Building inbound traffic from scratch against an entrenched competitor is a multi-year project. This campaign has one year. Inbound cannot carry the volume.</motion.p>
          <motion.p variants={itemVariants}>The target does not search for scheduling tools. Solutions Architects do not type "multi-party meeting scheduler" into Google. They do not know yet that a dedicated tool exists for their problem. Demand does not exist to be captured. It has to be created.</motion.p>
          <motion.p variants={itemVariants}>LinkedIn is the only digital advertising platform that verifies a job title before the click is purchased. No other channel can guarantee, with that precision, that the ad is reaching a Solutions Architect rather than someone adjacent to that role. That precision justifies the cost premium.</motion.p>
          
          <motion.div variants={itemVariants} className="my-10">
            <div className="glass-panel p-6 bg-[#111827] text-white">
              <DataRow label={<span className="text-slate-300">Acquisition target</span>} value={<span className="text-white" style={mono}><span style={mono}>10,000</span> Teams (<span style={mono}>50,000</span> users at <span style={mono}>5</span> per team)</span>} />
              <DataRow label={<span className="text-slate-300">Team LTV (12 months)</span>} value={<span className="text-white" style={mono}>$420</span>} />
              <DataRow label={<span className="text-slate-300">LTV to CAC ratio target</span>} value={<span className="text-white" style={mono}>3:1</span>} />
              <DataRow label={<span className="text-slate-300">Maximum allowable CAC</span>} value={<span className="text-white" style={mono}>$140</span>} />
              <DataRow label={<span className="text-slate-300">Year 1 budget</span>} value={<span className="text-white" style={mono}>$1,400,000</span>} bold />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="my-10">
            <div className="glass-panel p-8 space-y-8 bg-white/90">
              <BudgetBar label="LinkedIn: Demand Generation" amount={<span style={mono}>$910K</span>} pct={<span style={mono}>65</span>} color="#3B82F6" delay={0} />
              <BudgetBar label="LinkedIn and Display: Retargeting" amount={<span style={mono}>$350K</span>} pct={<span style={mono}>25</span>} color="#60A5FA" delay={0.2} />
              <BudgetBar label="Google Search: Intent Capture" amount={<span style={mono}>$140K</span>} pct={<span style={mono}>10</span>} color="#94A3B8" delay={0.4} />
            </div>
          </motion.div>
          
          <motion.p variants={itemVariants}>The allocation follows a specific logic. LinkedIn at <span style={mono}>65%</span> is the only way to reach the right people at scale before they know they need the product. Retargeting at <span style={mono}>25%</span> exists because enterprise professionals rarely act on first contact. The Google Search budget at <span style={mono}>10%</span> captures intent that the LinkedIn spend will create, not intent that already exists.</motion.p>
          <Transition>Budget set. Here is what it runs.</Transition>
        </Block>

        {/* ─── BLOCK 4 ─── */}
        <Block idx={4} badge="IV. The Creative Executions" badgeColor="blue"
          title={<>Two ads. Two stages. One through-line.<br/><span className="text-slate-400">Both built to run. Neither built to explain the product.</span></>}>
          <motion.p variants={itemVariants}>The first ad targets a cold audience of Solutions Architects on LinkedIn. It does not introduce Doodle. It names a problem they already have.</motion.p>
          <motion.p variants={itemVariants}>The creative uses a dark-mode aesthetic designed to resemble a code editor, an environment where this audience spends significant time. A red critical error message appears at the centre: FATAL ERROR: C-Suite Availability Sync Failed. Beneath it, looking entirely out of place, is a standard 1-on-1 calendar link.</motion.p>
          <motion.p variants={itemVariants}>The headline reads: You engineered a million-dollar solution. Do not let a personal calendar link kill the deal.</motion.p>
          <motion.p variants={itemVariants}>The body copy is written to sound like a peer. It reads: The biggest bottleneck in your pipeline is not the technical validation. It is the two weeks you lose trying to get your engineers and the buyer's executives into the same room. Find out exactly how much commission you are losing to scheduling friction. The call to action reads: Calculate My Loss.</motion.p>
          <motion.p variants={itemVariants}>The ad does not mention Doodle once.</motion.p>
          <motion.p variants={itemVariants}>The second ad targets users who visited the Calculator but did not submit their email. It runs as a ten-second autoplay video on LinkedIn and Google Display.</motion.p>
          <motion.p variants={itemVariants}>The video opens on a blurred inbox scrolling fast, a thread with twelve replies under the subject line Re: Scoping Call Availability. A red timer counts up: Time wasted, 3 days. The screen cuts to the Doodle interface. A cursor selects three available slots, labels the meeting Tech Validation Panel, and sends the poll. Five green checkmarks appear as each stakeholder votes. The confirmed meeting drops into Google Calendar. A green badge reads: Deal Scheduled in 4 minutes.</motion.p>
          <motion.p variants={itemVariants}>The headline reads: Stop coordinating executives by email. The call to action reads: Resume My Calculation, returning the user to where they left off.</motion.p>
          <Transition>Both ads point to the same place.</Transition>
        </Block>

        {/* ─── BLOCK 5 ─── */}
        <Block idx={5} badge="V. The Lead Magnet" badgeColor="emerald"
          title={<>No purchase ask on first contact.<br/><span className="text-emerald-500">A financial report in exchange for a work email.</span></>}>
          <motion.p variants={itemVariants}>Every click from both ads lands on the same tool: the Deal Velocity Loss Calculator. It is live and accessible now.</motion.p>
          <motion.p variants={itemVariants}>A Solutions Architect enters three inputs: their annual base salary, how many panel scoping calls they run per month, and how many hours they typically lose per call to scheduling coordination. The tool returns one number: the quarterly cost of that coordination to their personal earnings.</motion.p>
          <motion.p variants={itemVariants}>That number is not a projection. It is arithmetic applied to their own inputs.</motion.p>
          <motion.p variants={itemVariants}>To receive the full personalised report by email, they submit their work address. The exchange is financial intelligence for contact information. No product is mentioned. No trial is offered. The only thing offered is the number they just calculated, delivered in a format they can keep.</motion.p>
          <motion.p variants={itemVariants}>The Calculator is also the content centrepiece. It is the reason the LinkedIn article exists. It is what every nurture email references. Every part of the funnel connects back to this one tool and the number it produced.</motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <a href="https://doodle-roi-calculator.vercel.app/" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-slate-900/20">
              Open the Live Calculator <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
          <Transition>The Calculator creates the lead. Content brings them back before they are ready to buy.</Transition>
        </Block>

        {/* ─── BLOCK 6 ─── */}
        <Block idx={6} badge="VI. The Content Play" badgeColor="gray"
          title={<>The content does not market the product.<br/><span className="text-slate-400">It earns the right to talk about the problem.</span></>}>
          <motion.p variants={itemVariants}>The content angle is this: no scheduling company, including Calendly, has the standing to publish authoritative writing about why enterprise deals slip. That conversation belongs to sales operations, pre-sales leadership, and solutions architecture communities. Doodle, as the company building a tool for exactly that problem, does have that standing.</motion.p>
          <motion.p variants={itemVariants}>The format is a long-form LinkedIn article, written in the voice of someone inside pre-sales, not someone selling to it. It does not mention Doodle until the final section. It makes its case on the evidence first.</motion.p>
          <motion.p variants={itemVariants}>The article to the right is complete and publish-ready. It is titled: The real reason your enterprise deals slip into next quarter.</motion.p>
          <motion.p variants={itemVariants}>It argues one thing: the technical win happens in week three. The contract moves in week eleven. The eight weeks between those moments are almost entirely calendar coordination. Fourteen-reply email threads, three rounds of "does Thursday work for everyone," one no-show from a CTO's EA. None of that is a people problem. It is a tooling problem.</motion.p>
          <motion.p variants={itemVariants}>The article earns trust before asking for anything. At the end, it offers one thing: a calculator that tells you exactly how much that tooling gap is costing your team this quarter. That is the only call to action.</motion.p>
          <Transition>The article brings them to the Calculator. The Calculator captures the email. Then this happens.</Transition>
        </Block>

        {/* ─── BLOCK 7 ─── */}
        <Block idx={7} badge="VII. The Nurture Sequence" badgeColor="blue"
          title={<>Three emails. Each has one job.<br/><span className="text-slate-400">None of them feel like marketing.</span></>}>
          <motion.p variants={itemVariants}>The sequence begins the moment a user submits their email on the Calculator page. It is designed for a technical, analytical audience that will immediately dismiss anything that reads like a promotional campaign. No graphics, no product imagery, no subject lines that announce a brand. Plain text, formatted like internal documents.</motion.p>
          <motion.div variants={containerVariants} initial="hidden" whileInView="show" className="space-y-4 my-8 pl-0">
            <motion.div variants={itemVariants} className="glass-panel p-5 bg-white/80 border-t-4 border-t-blue-500">
              <strong className="block text-slate-900 mb-2">Day 0: The Report</strong>
              <span className="text-slate-600">The first email delivers exactly what was promised: the personalised Deal Velocity Loss report. It restates the user's inputs, presents their quarterly scheduling cost, and explains in one sentence what that number represents: time spent on coordination that could have been spent on the technical work that moves their commission forward. The only ask is soft: start a free Team Trial to bring that number down next month.</span>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-5 bg-white/80 border-t-4 border-t-emerald-500">
              <strong className="block text-slate-900 mb-2">Day 2: The Integration</strong>
              <span className="text-slate-600">The second email addresses the most common reason a technical person delays a new tool: the assumption that integration will require effort. It maps exactly how Doodle connects to what this audience already uses. Multi-party polls log automatically to active Salesforce opportunities. Slack sends an alert the moment all stakeholders have voted. The confirmed meeting appears in every Google Calendar at once. No IT ticket. No new workflow. One link deploys a pre-sales template directly to their Google Workspace.</span>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-5 bg-white/80 border-t-4 border-t-indigo-500">
              <strong className="block text-slate-900 mb-2">Day 5: The Business Case</strong>
              <span className="text-slate-600">The third email is built around one insight: even a convinced Solutions Architect still needs budget approval. The email provides four sentences they can forward directly to their VP of Sales, framing the problem in pipeline language and presenting the <span style={mono}>$420</span> Team Plan as a cost whose return is recovered within the first deal cycle. The closing line points back to their own report: the trial costs nothing, and the math is already in their hands.</span>
            </motion.div>
          </motion.div>
          <motion.p variants={itemVariants} className="mt-8 font-bold text-slate-900 text-xl">Every word in every email has a job. Nothing is filler.</motion.p>
          <Transition>The funnel is built. Here is what it costs to run it, and how that cost changes.</Transition>
        </Block>

        {/* ─── BLOCK 8 ─── */}
        <Block idx={8} badge="VIII. The CAC Forecast" badgeColor="emerald"
          title={<>The acquisition cost does not stay flat.<br/><span className="text-emerald-500">It compresses as the funnel matures.</span></>}>
          <motion.p variants={itemVariants}>The customer acquisition cost follows a compression curve across twelve months. The curve is not an assumption. It is the predictable consequence of how the funnel is structured.</motion.p>
          
          <motion.div variants={itemVariants} className="bg-[#111827] rounded-xl p-6 flex justify-between items-center mt-6 mb-8">
            <div className="flex flex-col items-center flex-1">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1 text-center">Month 3</p>
              <p className="text-white text-2xl font-black mb-1" style={mono}>$140</p>
              <p className="text-gray-500 text-xs font-semibold text-center leading-tight">Cold LinkedIn demand only</p>
            </div>
            <div className="text-gray-600 text-xl font-bold px-2">→</div>
            <div className="flex flex-col items-center flex-1">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1 text-center">Month 6</p>
              <p className="text-white text-2xl font-black mb-1" style={mono}>$110</p>
              <p className="text-gray-500 text-xs font-semibold text-center leading-tight">Retargeting and Search capture</p>
            </div>
            <div className="text-gray-600 text-xl font-bold px-2">→</div>
            <div className="flex flex-col items-center flex-1">
              <p className="text-emerald-400 text-xs uppercase font-bold tracking-widest mb-1 text-center">Month 12</p>
              <p className="text-emerald-400 text-2xl font-black mb-1" style={mono}>$85</p>
              <p className="text-emerald-500/80 text-xs font-semibold text-center leading-tight">Viral loop active</p>
            </div>
          </motion.div>

          <motion.p variants={itemVariants}>In the first quarter, every conversion is paid at full LinkedIn market rate. Zero brand presence, zero retargeting audience, zero organic referral activity. The unit economics hold: <span style={mono}>$140</span> against a <span style={mono}>$420</span> LTV. The work of this phase is not efficiency. It is building the email database and user base that makes the next two phases possible.</motion.p>
          <motion.p variants={itemVariants}>By mid-year, the retargeting layer and email sequence are converting the audience built in months one through three at a fraction of the cold acquisition cost. Google Search begins capturing intent from users who, having encountered the campaign, start researching Doodle or looking for alternatives to their current tool. CAC drops to <span style={mono}>$110</span>.</motion.p>
          <motion.p variants={itemVariants}>By month twelve, the nature of growth changes. Every Solutions Architect acquired through a paid ad immediately begins sending Doodle multi-party polls to their clients: the buyer's CTO, security lead, and project manager. Between <span style={mono}>4</span> and <span style={mono}>5</span> high-level external contacts experience the product firsthand at zero acquisition cost. A share of them adopt Doodle for their own teams. Blended CAC drops to <span style={mono}>$85</span>, as the cost of paid acquisition is increasingly offset by organic growth. The mechanism is identical to the viral loop that drove Calendly's own expansion, applied to the multi-party use case where Calendly does not work.</motion.p>
          <Transition>Year 1 confirmed. Here is what three more months and three times the budget does.</Transition>
        </Block>

        {/* ─── BLOCK 9 ─── */}
        <Block idx={9} badge="IX. Year 2" badgeColor="gray"
          title={<>Three months. Three times the budget.<br/><span className="text-slate-400">One condition: Year 1 targets are met.</span></>}>
          <motion.p variants={itemVariants}>By the close of Year 1, the campaign will have produced tens of thousands of verified enterprise users, real ROI data, and case study material from recognisable US technology companies. That material is not only useful for optimising the acquisition algorithm. It is the credential required to pass the enterprise IT security audits of the two sectors that were bypassed in Year 1.</motion.p>
          <motion.p variants={itemVariants}>The barrier to entering High Finance and Legal Coordination in Year 1 was not technical. It was the absence of enterprise credibility. Year 1 creates it.</motion.p>
          <motion.p variants={itemVariants}>With that credential, the campaign architecture is redeployed in two adjacent markets.</motion.p>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-10">
            <div className="glass-panel p-5 bg-white/80 border-t border-slate-200">
              <p className="font-black text-slate-900 text-lg mb-2">Corporate Legal</p>
              <p className="text-slate-600">The Deal Velocity Calculator becomes the Billable Hours Loss Calculator, quantifying time lost to coordinating multi-party litigation and due diligence calls. The underlying logic and product are identical. The language is adapted to a profession where time is literally billed by the hour.</p>
            </div>
            <div className="glass-panel p-5 bg-white/80 border-t border-slate-200">
              <p className="font-black text-slate-900 text-lg mb-2">Investment Banking</p>
              <p className="text-slate-600">For M&A transaction teams, the same mechanic surfaces the cost of delays in coordinating across deal teams and counterparties. The pain is the same. The persona changes. The calculator changes its label. The funnel runs identically.</p>
            </div>
          </motion.div>
          
          <motion.p variants={itemVariants}>The final move of the expansion phase shifts the commercial model. Rather than continuing to acquire individual teams through bottom-up adoption, the strategy targets the organisations that already contain active Doodle users. The <span style={mono}>10,000</span> teams from Year 1 belong to parent companies with CTOs and VP-level engineering leaders. The goal is to convert those relationships from a <span style={mono}>$420</span> Team Plan to an organisation-wide enterprise contract at <span style={mono}>$15,000</span> or more. This is not cold outreach. The relationship already exists inside the organisation. This phase formalises it at the right level.</motion.p>

          <motion.div variants={containerVariants} initial="hidden" whileInView="show" className="my-10 glass-panel p-4 bg-white/80">
            <ChainItem index={1} label="Product-Market Fit" value="Multi-party coordination is the gap Calendly's design choice left open. Doodle's polling is the only purpose-built solution for it." />
            <ChainItem index={2} label="Conversion Journey" value="Interrupt on LinkedIn. Exchange value through the Calculator. Convert through a three-email sequence with no filler." />
            <ChainItem index={3} label="Acquisition Channels" value={<>LinkedIn is the only verified job-title channel. <span style={mono}>$910K</span> goes there because no other allocation produces this audience reliably.</>} />
            <ChainItem index={4} label="Experimentation and Data" value={<>CAC starts at <span style={mono}>$140</span>, compresses to <span style={mono}>$85</span>. The hypothesis was tested before the budget was set, not after.</>} />
            <ChainItem index={5} label="Customer Quality" value={<>Solutions Architects convert faster, stay longer, and generate referrals automatically through the viral loop. Every <span style={mono}>$420</span> account carries a <span style={mono}>$15,000</span> expansion path.</>} />
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-xl font-bold text-slate-900">Mégane's framework for sustainable acquisition asks five questions. This campaign answers all five with work that is live, measurable, and already running.</motion.p>
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
              {stageKey === 'creatives' && <AssetCreatives />}
              {stageKey === 'nurture' && <AssetNurture />}
              {stageKey === 'market' && <AssetMarket />}
              {stageKey === 'audience' && <AssetAudience />}
              {stageKey === 'channel' && <AssetChannel />}
              {stageKey === 'cac' && <AssetCAC />}
              {stageKey === 'expansion' && <AssetExpansion />}
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
