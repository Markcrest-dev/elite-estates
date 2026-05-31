import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function EmptyFavourites() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* SVG illustration */}
        <div className="mb-8 mx-auto w-32 h-32">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="45" width="80" height="55" rx="2" stroke="#c9a84c" strokeWidth="1.5" opacity="0.3" />
            <polygon points="60,20 100,50 20,50" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.3" />
            <rect x="47" y="70" width="16" height="30" rx="1" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
            <rect x="70" y="60" width="12" height="12" rx="1" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5" />
            <path
              d="M60 42 C60 36, 53 33, 50 36 C47 39, 47 44, 60 52 C73 44, 73 39, 70 36 C67 33, 60 36, 60 42Z"
              fill="#c9a84c"
              opacity="0.6"
            />
          </svg>
        </div>

        <h2 className="font-serif text-3xl text-estate-cream mb-3">No Saved Homes Yet</h2>
        <p className="text-estate-muted font-sans text-sm mb-8 leading-relaxed">
          Start exploring and heart the properties you love. They'll appear here for easy comparison and quick access.
        </p>

        <Link to="/search">
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-gold text-estate-dark px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors cursor-pointer"
          >
            Explore Properties
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
