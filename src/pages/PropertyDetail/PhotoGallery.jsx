import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function PhotoGallery({ images, address }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={address}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: [1, 1.05] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 6, ease: 'linear' },
            }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-estate-dark/50 via-transparent to-estate-dark/30" />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 z-20 bg-black/40 backdrop-blur-sm border border-white/10 text-white p-3 hover:bg-gold hover:text-estate-dark hover:border-gold transition-all cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </motion.button>
      </div>

      {/* Thumbnail strip */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveImage(img)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 w-24 h-16 md:w-32 md:h-20 overflow-hidden border-2 transition-all cursor-pointer ${
                activeImage === img ? 'border-gold' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
