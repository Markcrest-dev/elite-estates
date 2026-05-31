import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const milestones = [
  { year: '1999', title: 'Founded', desc: 'Élite Estates opens its first office in Beverly Hills with a team of three agents.' },
  { year: '2004', title: 'First $10M Sale', desc: 'Shattered local records with the sale of a historic Bel Air estate.' },
  { year: '2010', title: 'Global Expansion', desc: 'Opened offices in London and Dubai to serve our international clientele.' },
  { year: '2015', title: 'New Development', desc: 'Launched a dedicated division for luxury high-rise developments in Manhattan.' },
  { year: '2021', title: '$5B Milestone', desc: 'Surpassed $5 billion in total lifetime sales volume across all offices.' },
  { year: '2026', title: 'Digital Evolution', desc: 'Pioneering VR property tours and AI-driven market analysis tools.' },
];

export default function MilestonesTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={containerRef} className="py-32 bg-[#0a0a0a] overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Our Journey</span>
        <div className="mt-3 w-12 h-[1px] bg-gold" />
        <h2 className="mt-6 font-serif text-4xl md:text-5xl font-light text-estate-cream">
          A Legacy of <span className="italic text-gold-light">Success</span>
        </h2>
      </div>

      <div className="relative pb-12">
        {/* Continuous background line */}
        <div className="absolute top-[88px] left-0 right-0 h-[1px] bg-white/10 z-0" />
        
        <motion.div
          drag="x"
          dragConstraints={{ left: -1200, right: 0 }}
          style={{ x: xOffset }}
          className="flex gap-16 px-4 md:px-8 cursor-grab active:cursor-grabbing relative z-10 w-max"
        >
          {milestones.map((m, i) => (
            <div key={m.year} className="w-[300px] flex-shrink-0">
              <div className="text-gold font-serif text-4xl font-light mb-6">{m.year}</div>
              
              {/* Node on the line */}
              <div className="relative mb-8">
                <div className="w-full h-[1px] bg-gold" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-estate-dark border-2 border-gold rounded-full" />
              </div>
              
              <h3 className="font-serif text-xl text-estate-cream mb-3">{m.title}</h3>
              <p className="text-estate-muted font-sans text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="text-center mt-12 text-estate-muted/50 text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2">
        <span>← Drag to explore →</span>
      </div>
    </section>
  );
}
