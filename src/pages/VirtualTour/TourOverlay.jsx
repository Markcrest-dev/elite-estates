import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Calendar } from 'lucide-react';

export default function TourOverlay({ listing }) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      {/* Top Left Base Info */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 left-6 md:left-72 z-20 bg-black/60 backdrop-blur-md border border-white/10 p-4 max-w-sm"
      >
        <h1 className="font-serif text-xl text-estate-cream leading-tight mb-1">{listing.address}</h1>
        <p className="text-gold font-sans font-semibold text-sm">{listing.price}</p>
        
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 text-estate-muted text-xs font-sans">
          <span>{listing.beds} Beds</span>
          <span>{listing.baths} Baths</span>
          <span>{listing.sqft.toLocaleString()} SqFt</span>
        </div>
      </motion.div>

      {/* Bottom Right Floating CTAs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-3"
      >
        <button 
          onClick={() => setInfoOpen(!infoOpen)}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors shadow-xl cursor-pointer"
          title="Property Details"
        >
          <Info size={18} />
        </button>
        
        <button className="bg-gold text-estate-dark px-6 py-3 font-sans text-sm uppercase tracking-[0.15em] font-semibold flex items-center gap-2 hover:bg-gold-light transition-colors shadow-xl cursor-pointer">
          <Calendar size={16} />
          Request Viewing
        </button>
      </motion.div>

      {/* Expandable Info Panel */}
      <AnimatePresence>
        {infoOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-24 bottom-24 right-6 w-80 bg-estate-dark/95 backdrop-blur-xl border border-white/10 p-6 z-10 overflow-y-auto shadow-2xl"
          >
            <h3 className="font-serif text-xl text-estate-cream mb-4">Property Details</h3>
            <p className="text-estate-muted font-sans text-sm leading-relaxed mb-6">
              {listing.description}
            </p>
            
            <h4 className="text-gold text-xs font-sans uppercase tracking-[0.2em] mb-3">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map(a => (
                <span key={a} className="bg-white/5 border border-white/10 px-2 py-1 text-xs text-estate-muted font-sans">
                  {a}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
