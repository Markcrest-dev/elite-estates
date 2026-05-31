import { motion } from 'framer-motion';
import { listings } from '../data/listings';
import PropertyCard from './PropertyCard';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ListingsGrid() {
  return (
    <section id="listings" className="relative py-24 px-4 md:px-8">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">
            Featured Properties
          </span>
          <div className="mt-3 w-12 h-[1px] bg-gold mx-auto" />
          <h2 className="mt-6 font-serif text-4xl md:text-5xl font-light">
            Exclusive <span className="italic text-gold-light">Listings</span>
          </h2>
          <p className="mt-4 text-estate-muted font-sans max-w-xl mx-auto">
            Handpicked luxury properties that redefine modern living. Each home is a masterpiece of architecture and design.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {listings.map((l) => (
            <PropertyCard key={l.id} {...l} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
