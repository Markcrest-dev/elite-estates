import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 border border-gold/20 rounded-full flex items-center justify-center mb-6">
        <SearchX size={32} className="text-gold/50" />
      </div>
      <h3 className="font-serif text-2xl text-estate-cream mb-2">No Properties Found</h3>
      <p className="text-estate-muted font-sans text-sm max-w-md mb-8">
        We couldn't find any properties matching your current filters. Try adjusting your search criteria.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClear}
        className="bg-gold text-estate-dark px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] font-semibold hover:bg-gold-light transition-colors cursor-pointer"
      >
        Clear All Filters
      </motion.button>
    </motion.div>
  );
}
