import { AnimatePresence, motion } from 'framer-motion';
import PropertyCard from '../../components/PropertyCard';

export default function ListingResults({ listings }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence>
        {listings.map(l => (
          <motion.div
            key={l.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <PropertyCard {...l} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
