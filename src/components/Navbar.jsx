import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Menu, X } from 'lucide-react';
import { useFavourites } from '../context/FavouritesContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/agents', label: 'Agents' },
  { to: '/insights', label: 'Insights' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { favourites } = useFavourites();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-estate-dark/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-4xl navbar-logo transition-all duration-500 overflow-hidden inline-flex">
            {'Domaine'.split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to={link.to}
                  className={`relative font-sans text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                    location.pathname === link.to
                      ? 'text-gold'
                      : 'text-estate-cream/70 hover:text-estate-cream'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
            className="flex items-center gap-4"
          >
            <Link to="/search" className="text-estate-cream/70 hover:text-gold transition-colors" aria-label="Search">
              <Search size={18} />
            </Link>
            <Link to="/favourites" className="relative text-estate-cream/70 hover:text-gold transition-colors" aria-label="Favourites">
              <Heart size={18} />
              {favourites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gold text-estate-dark text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {favourites.length}
                </motion.span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-estate-cream/70 hover:text-gold transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-estate-dark/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Link
                  to={link.to}
                  className={`font-serif text-3xl transition-colors ${
                    location.pathname === link.to ? 'text-gold' : 'text-estate-cream/70 hover:text-estate-cream'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/favourites"
                className="font-serif text-3xl text-estate-cream/70 hover:text-estate-cream transition-colors flex items-center gap-3"
              >
                Favourites
                {favourites.length > 0 && (
                  <span className="bg-gold text-estate-dark text-sm font-sans font-bold w-7 h-7 rounded-full flex items-center justify-center">
                    {favourites.length}
                  </span>
                )}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
