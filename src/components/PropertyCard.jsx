import { motion, useMotionValue, useTransform } from 'framer-motion';
import { BedDouble, Bath, Maximize } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavouriteButton from './FavouriteButton';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function PropertyCard({ id, image, price, address, beds, baths, sqft }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    setMousePos({ x: px * 100, y: py * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="group relative bg-white/5 border border-white/10 overflow-hidden cursor-pointer will-change-transform"
    >
      <Link to={`/property/${id}`} className="block">
        {/* Glossy highlight overlay */}
        <div
          className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,168,76,0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={address}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Price badge */}
          <div className="absolute top-4 left-4 z-20 bg-gold text-estate-dark px-4 py-1.5 text-sm font-sans font-semibold tracking-wide">
            {price}
          </div>
          {/* Favourite button */}
          <div className="absolute top-4 right-4 z-20">
            <FavouriteButton id={id} />
          </div>
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-estate-dark/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-estate-cream mb-4 leading-snug">{address}</h3>
          <div className="flex items-center gap-6 text-estate-muted text-sm font-sans">
            <div className="flex items-center gap-2">
              <BedDouble size={16} className="text-gold" />
              <span>{beds} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={16} className="text-gold" />
              <span>{baths} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize size={16} className="text-gold" />
              <span>{sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Link>
    </motion.div>
  );
}
