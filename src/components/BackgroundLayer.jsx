import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundLayer({ activeSection }) {
  const backgrounds = [
    { id: 0, src: '', color: 'bg-slate-900' }, // Navy Canvas for Calculator
    { id: 1, src: '/asset-calendly.png', color: 'bg-black' }, // Calendly Nightmare
    { id: 2, src: '/asset-doodle.png', color: 'bg-slate-900' }, // Doodle Consensus
    { id: 3, src: '', color: 'bg-slate-950' }, // Structural Grid for Ads
    { id: 4, src: '', color: 'bg-slate-800' }, // Glassmorphism for Emails
    { id: 5, src: '/asset-viral.png', color: 'bg-black' }, // Viral Network
    { id: 6, src: '/asset-boardroom.png', color: 'bg-slate-900' }, // Obsidian Boardroom
  ];

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {backgrounds.map((bg, index) => (
        <motion.div
          key={bg.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeSection === index ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full ${bg.color} bg-cover bg-center bg-no-repeat`}
          style={bg.src ? { backgroundImage: `url(${bg.src})` } : {}}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-slate-900/70" />
        </motion.div>
      ))}
      
      {/* Grid overlay for Section 3 */}
      <motion.div 
        animate={{ opacity: activeSection === 3 ? 0.3 : 0 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      />
    </div>
  );
}
