import React, { useEffect, useRef, useState } from 'react';
import BackgroundLayer from './BackgroundLayer';
import Chapter1Hook from './Chapter1Hook';
import Chapter2Problem from './Chapter2Problem';
import Chapter3Solution from './Chapter3Solution';
import Chapter4Channels from './Chapter4Channels';
import Chapter5Conversion from './Chapter5Conversion';
import Chapter6Growth from './Chapter6Growth';
import Chapter7Endgame from './Chapter7Endgame';

export default function ScrollEngine() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveSection(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Trigger when section is around the middle
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const chapters = [
    <Chapter1Hook />,
    <Chapter2Problem />,
    <Chapter3Solution />,
    <Chapter4Channels />,
    <Chapter5Conversion />,
    <Chapter6Growth />,
    <Chapter7Endgame />
  ];

  return (
    <div className="relative w-full min-h-screen font-sans text-slate-100 selection:bg-blue-500/30">
      <BackgroundLayer activeSection={activeSection} />
      
      <div className="relative z-10 w-full" ref={containerRef}>
        {chapters.map((ChapterContent, index) => (
          <section 
            key={index} 
            data-index={index}
            className="scroll-section min-h-screen w-full flex items-center justify-center py-24"
          >
            {ChapterContent}
          </section>
        ))}
      </div>
    </div>
  );
}
