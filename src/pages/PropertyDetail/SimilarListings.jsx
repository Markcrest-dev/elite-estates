import { useRef } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../../components/PropertyCard';

export default function SimilarListings({ listings }) {
  const containerRef = useRef(null);

  return (
    <section className="py-16 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">You May Also Like</span>
          <div className="mt-3 w-12 h-[1px] bg-gold" />
          <h2 className="mt-6 font-serif text-3xl md:text-4xl font-light text-estate-cream">
            Similar <span className="italic text-gold-light">Properties</span>
          </h2>
        </div>

        <div className="overflow-hidden" ref={containerRef}>
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing pb-4"
          >
            {listings.map(l => (
              <motion.div key={l.id} className="flex-shrink-0 w-[320px] md:w-[380px]">
                <PropertyCard {...l} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
