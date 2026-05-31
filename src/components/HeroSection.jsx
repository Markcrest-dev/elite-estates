import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { ChevronDown } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import ParticleOverlay from './ParticleOverlay';

export default function HeroSection() {
  const parallaxRef = useMouseParallax(20);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background Image */}
      <Parallax speed={-20} className="absolute inset-0 w-full h-full">
        <div
          ref={parallaxRef}
          className="absolute inset-[-10%] w-[120%] h-[120%] will-change-transform"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Parallax>

      <ParticleOverlay />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans font-medium">
            Luxury Real Estate
          </span>
          <div className="mt-3 w-12 h-[1px] bg-gold mx-auto" />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] max-w-4xl"
          >
            Find Your{' '}
            <span className="italic text-gold-gradient">Dream</span>{' '}
            Home
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-white/60 font-sans max-w-2xl leading-relaxed"
        >
          Discover curated luxury properties in the world's most prestigious neighborhoods.
          Your next chapter begins here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <MagneticWrapper>
            <motion.a
              href="#listings"
              whileHover={{
                backgroundColor: '#c9a84c',
                color: '#0a0a0c',
                borderColor: '#c9a84c',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="px-8 py-4 border border-white/40 text-white text-sm uppercase tracking-[0.2em] font-sans 
                         hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-shadow cursor-pointer block"
            >
              View Properties
            </motion.a>
          </MagneticWrapper>
          <MagneticWrapper>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gold text-estate-dark text-sm uppercase tracking-[0.2em] font-sans font-medium
                         hover:bg-gold-light transition-colors cursor-pointer block"
            >
              Book Consultation
            </motion.a>
          </MagneticWrapper>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
