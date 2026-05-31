import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavourites } from '../context/FavouritesContext';

export default function FavouriteButton({ id, className = '' }) {
  const { toggle, isFavourited } = useFavourites();
  const active = isFavourited(id);

  return (
    <motion.button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(id); }}
      whileTap={{ scale: 1.4 }}
      transition={{ type: 'spring', stiffness: 400 }}
      className={`cursor-pointer ${className}`}
      aria-label={active ? 'Remove from favourites' : 'Add to favourites'}
    >
      <Heart
        size={20}
        className={active ? 'fill-gold text-gold' : 'text-white/70 hover:text-white'}
        style={{ transition: 'color 0.2s, fill 0.2s' }}
      />
    </motion.button>
  );
}
