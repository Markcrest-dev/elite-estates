import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare } from 'lucide-react';
import { useFavourites } from '../../context/FavouritesContext';
import { listings } from '../../data/listings';
import PageTransition from '../../components/PageTransition';
import PropertyCard from '../../components/PropertyCard';
import CompareDrawer from './CompareDrawer';
import EmptyFavourites from './EmptyFavourites';

export default function FavouritesPage() {
  const { favourites, toggle } = useFavourites();
  const [compareIds, setCompareIds] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const savedListings = useMemo(
    () => listings.filter(l => favourites.includes(l.id)),
    [favourites]
  );

  const toggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(c => c !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const compareListings = useMemo(
    () => listings.filter(l => compareIds.includes(l.id)),
    [compareIds]
  );

  if (savedListings.length === 0) {
    return (
      <PageTransition>
        <EmptyFavourites />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Your Collection</span>
            <div className="mt-3 w-12 h-[1px] bg-gold" />
            <h1 className="mt-6 font-serif text-4xl md:text-5xl font-light text-estate-cream">
              Saved <span className="italic text-gold-light">Homes</span>
            </h1>
            <p className="mt-4 text-estate-muted font-sans">
              {savedListings.length} {savedListings.length === 1 ? 'property' : 'properties'} saved
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {savedListings.map(l => (
                <motion.div
                  key={l.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="relative"
                >
                  {/* Remove button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggle(l.id)}
                    className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-sm text-white p-1.5 hover:bg-red-500/80 transition-colors cursor-pointer"
                    aria-label="Remove from favourites"
                  >
                    <X size={14} />
                  </motion.button>

                  {/* Compare checkbox */}
                  <button
                    onClick={() => toggleCompare(l.id)}
                    className={`absolute top-4 left-14 z-30 flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-sans uppercase tracking-wider transition-all cursor-pointer ${
                      compareIds.includes(l.id)
                        ? 'bg-gold text-estate-dark'
                        : 'bg-black/60 backdrop-blur-sm text-white/70 hover:text-white'
                    }`}
                  >
                    <GitCompare size={12} />
                    Compare
                  </button>

                  <PropertyCard {...l} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Compare bar */}
      <AnimatePresence>
        {compareIds.length >= 2 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-estate-dark/95 backdrop-blur-xl border-t border-gold/20 px-6 py-4 flex items-center justify-between"
          >
            <p className="text-estate-cream font-sans text-sm">
              <span className="text-gold font-semibold">{compareIds.length}</span> properties selected
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setDrawerOpen(true)}
              className="bg-gold text-estate-dark px-6 py-2.5 font-sans text-sm uppercase tracking-[0.15em] font-semibold cursor-pointer hover:bg-gold-light transition-colors"
            >
              Compare {compareIds.length} properties →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Drawer */}
      <CompareDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        listings={compareListings}
      />
    </PageTransition>
  );
}
