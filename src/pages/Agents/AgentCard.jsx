import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heights = [320, 360, 400, 340, 380, 350];

export default function AgentCard({ agent, index }) {
  const baseHeight = heights[index % heights.length];

  return (
    <Link to={`/agents/${agent.id}`} className="block break-inside-avoid mb-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="relative overflow-hidden rounded-xl cursor-pointer group border-2 border-transparent hover:border-gold/40 transition-colors"
        style={{ height: baseHeight }}
      >
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif text-white text-xl">{agent.name}</h3>
          <p className="text-gold/80 text-sm font-sans mt-1">{agent.title}</p>

          {/* Revealed on hover */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-estate-muted text-xs font-sans mt-3 leading-relaxed">{agent.specialties}</p>
            <div className="flex items-center gap-4 mt-3 text-xs font-sans text-estate-cream/60">
              <span><span className="text-gold font-semibold">{agent.deals}</span> deals</span>
              <span><span className="text-gold font-semibold">{agent.yearsExp}</span> years</span>
              <span className="text-gold">⭐ {agent.rating}</span>
            </div>
          </motion.div>

          <div className="mt-4 overflow-hidden h-0 group-hover:h-auto transition-all duration-300">
            <span className="inline-block bg-gold text-estate-dark px-4 py-2 text-xs font-sans uppercase tracking-[0.15em] font-semibold">
              View Profile
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
