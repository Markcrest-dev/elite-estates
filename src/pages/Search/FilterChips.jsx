import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function getActiveFilters(filters) {
  const chips = [];
  if (filters.priceMin > 200000 || filters.priceMax < 10000000) {
    chips.push({ key: 'price', label: `$${(filters.priceMin / 1e6).toFixed(1)}M – $${(filters.priceMax / 1e6).toFixed(1)}M` });
  }
  if (filters.type) chips.push({ key: 'type', label: filters.type });
  if (filters.bedsMin > 1) chips.push({ key: 'beds', label: `${filters.bedsMin}+ Beds` });
  if (filters.bathsMin > 1) chips.push({ key: 'baths', label: `${filters.bathsMin}+ Baths` });
  if (filters.sqftMin > 0 || filters.sqftMax < 15000) {
    chips.push({ key: 'sqft', label: `${filters.sqftMin.toLocaleString()} – ${filters.sqftMax.toLocaleString()} sqft` });
  }
  if (filters.location) chips.push({ key: 'location', label: `"${filters.location}"` });
  filters.amenities.forEach(a => chips.push({ key: `amenity:${a}`, label: a }));
  return chips;
}

export default function FilterChips({ filters, dispatch }) {
  const chips = getActiveFilters(filters);
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <AnimatePresence>
        {chips.map(chip => (
          <motion.button
            key={chip.key}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => dispatch({ type: 'CLEAR_FILTER', key: chip.key })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20 text-gold text-xs font-sans cursor-pointer hover:bg-gold/20 transition-colors"
          >
            {chip.label}
            <X size={12} />
          </motion.button>
        ))}
      </AnimatePresence>
      {chips.length >= 2 && (
        <motion.button
          layout
          onClick={() => dispatch({ type: 'CLEAR_ALL' })}
          className="text-estate-muted text-xs font-sans hover:text-gold transition-colors ml-2 cursor-pointer"
        >
          Clear all
        </motion.button>
      )}
    </div>
  );
}
