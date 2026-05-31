import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function AmortizationTable({ schedule }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-estate-muted text-sm font-sans hover:text-gold transition-colors cursor-pointer mb-4"
      >
        {open ? 'Hide' : 'View'} full amortization schedule
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="glass-card overflow-x-auto">
              <table className="w-full text-sm font-sans">
                <thead className="sticky top-0 bg-estate-dark/95 backdrop-blur-sm">
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-gold">Year</th>
                    <th className="px-6 py-4 text-right text-xs uppercase tracking-[0.15em] text-gold">Principal</th>
                    <th className="px-6 py-4 text-right text-xs uppercase tracking-[0.15em] text-gold">Interest</th>
                    <th className="px-6 py-4 text-right text-xs uppercase tracking-[0.15em] text-gold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, i) => (
                    <tr
                      key={row.year}
                      className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                    >
                      <td className="px-6 py-3 text-estate-cream">{row.year}</td>
                      <td className="px-6 py-3 text-right text-gold">${row.principal.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right text-estate-muted">${row.interest.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right text-estate-cream">${row.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
