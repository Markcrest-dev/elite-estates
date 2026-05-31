import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-high', label: 'Price (High–Low)' },
  { value: 'price-low', label: 'Price (Low–High)' },
  { value: 'popular', label: 'Most Popular' },
];

export default function SortDropdown({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = options.find(o => o.value === sort);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-estate-muted text-sm font-sans hover:text-estate-cream transition-colors cursor-pointer"
      >
        Sort: <span className="text-estate-cream">{current.label}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-estate-dark border border-white/10 shadow-2xl z-30 overflow-hidden"
          >
            {options.map(o => (
              <button
                key={o.value}
                onClick={() => { setSort(o.value); setOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm font-sans transition-colors cursor-pointer ${
                  sort === o.value ? 'text-gold bg-gold/5' : 'text-estate-muted hover:text-estate-cream hover:bg-white/5'
                }`}
              >
                {o.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
