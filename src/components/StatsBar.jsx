import { useInView } from 'react-intersection-observer';
import { useCountUp } from '../hooks/useCountUp';
import { motion } from 'framer-motion';

const stats = [
  { target: 2500, suffix: '+', label: 'Properties Sold' },
  { target: 98, suffix: '%', label: 'Client Satisfaction' },
  { target: 25, suffix: '+', label: 'Years of Excellence' },
  { target: 12, suffix: 'B+', prefix: '$', label: 'Total Value Closed' },
];

function StatItem({ target, suffix, prefix = '', label, active, index }) {
  const count = useCountUp(target, 2000, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center py-8 relative"
    >
      <div className="text-4xl md:text-5xl font-serif font-light text-gold mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm uppercase tracking-[0.2em] text-neutral-400 font-sans">
        {label}
      </div>
      {/* Subtle separator on larger screens */}
      {index < stats.length - 1 && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10" />
      )}
    </motion.div>
  );
}

export default function StatsBar() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      id="stats"
      className="bg-estate-dark border-y border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} {...stat} active={inView} index={i} />
        ))}
      </div>
    </section>
  );
}
