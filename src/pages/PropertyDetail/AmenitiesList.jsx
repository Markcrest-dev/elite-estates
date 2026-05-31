import { motion } from 'framer-motion';
import {
  Waves, Dumbbell, Phone, Cpu, Wine, Sun, Zap, ShieldCheck, TreePine, Car,
} from 'lucide-react';

const amenityIcons = {
  Pool: Waves,
  Gym: Dumbbell,
  Concierge: Phone,
  'Smart Home': Cpu,
  'Wine Cellar': Wine,
  Terrace: Sun,
  'EV Charging': Zap,
  Security: ShieldCheck,
  Garden: TreePine,
  Garage: Car,
};

export default function AmenitiesList({ amenities }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h2 className="font-serif text-3xl text-estate-cream mb-2">Amenities</h2>
      <div className="w-12 h-[1px] bg-gold mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {amenities.map((amenity, i) => {
          const Icon = amenityIcons[amenity] || ShieldCheck;
          return (
            <motion.div
              key={amenity}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-3 py-4 border border-white/5 hover:border-gold/30 transition-colors"
            >
              <Icon size={24} className="text-gold" />
              <span className="text-[11px] uppercase tracking-[0.15em] text-estate-muted font-sans">{amenity}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
