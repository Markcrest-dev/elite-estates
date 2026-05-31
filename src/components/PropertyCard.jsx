import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
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
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  
  const mousePosX = useMotionValue(50);
  const mousePosY = useMotionValue(50);
  const springMouseX = useSpring(mousePosX, { damping: 20, stiffness: 200 });
  const springMouseY = useSpring(mousePosY, { damping: 20, stiffness: 200 });
  
  const gradientX = useTransform(springMouseX, v => `${v}%`);
  const gradientY = useTransform(springMouseY, v => `${v}%`);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    mousePosX.set(px * 100);
    mousePosY.set(py * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mousePosX.set(50);
    mousePosY.set(50);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
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
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.1) 0%, transparent 50%)`
            ),
            opacity: isHovered ? 1 : 0
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
