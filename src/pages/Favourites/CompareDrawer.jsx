import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const compareRows = [
  { key: 'price', label: 'Price' },
  { key: 'beds', label: 'Bedrooms' },
  { key: 'baths', label: 'Bathrooms' },
  { key: 'sqft', label: 'Sq. Ft.', format: v => v.toLocaleString() },
  { key: 'type', label: 'Type' },
  { key: 'yearBuilt', label: 'Year Built' },
  { key: 'address', label: 'Location' },
  { key: 'amenities', label: 'Amenities', format: v => v.join(', ') },
];

export default function CompareDrawer({ open, onClose, listings }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-estate-dark border-t border-gold/20 rounded-t-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-serif text-2xl text-estate-cream">Property Comparison</h3>
                <button onClick={onClose} className="text-estate-muted hover:text-estate-cream transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans min-w-[600px]">
                  {/* Headers with images */}
                  <thead>
                    <tr>
                      <th className="w-40" />
                      {listings.map(l => (
                        <th key={l.id} className="p-3 text-center">
                          <div className="relative w-full h-32 mb-3 overflow-hidden rounded-lg">
                            <img src={l.image} alt={l.address} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-estate-cream text-xs font-medium leading-snug">{l.address}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row, i) => {
                      const values = listings.map(l => row.format ? row.format(l[row.key]) : l[row.key]);
                      const allSame = values.every(v => String(v) === String(values[0]));

                      return (
                        <tr key={row.key} className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                          <td className="px-4 py-3 text-gold text-xs uppercase tracking-[0.15em]">{row.label}</td>
                          {values.map((val, j) => (
                            <td
                              key={j}
                              className={`px-4 py-3 text-center ${
                                !allSame ? 'text-gold font-medium' : 'text-estate-cream'
                              }`}
                            >
                              {val}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
