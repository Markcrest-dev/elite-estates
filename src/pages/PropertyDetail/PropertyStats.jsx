import { motion } from 'framer-motion';
import { DollarSign, BedDouble, Bath, Maximize, Calendar, Car } from 'lucide-react';

const icons = {
  price: DollarSign,
  beds: BedDouble,
  baths: Bath,
  sqft: Maximize,
  year: Calendar,
  garage: Car,
};

export default function PropertyStats({ listing }) {
  const stats = [
    { icon: 'price', value: listing.price, label: 'Price' },
    { icon: 'beds', value: listing.beds, label: 'Bedrooms' },
    { icon: 'baths', value: listing.baths, label: 'Bathrooms' },
    { icon: 'sqft', value: listing.sqft.toLocaleString(), label: 'Sq. Ft.' },
    { icon: 'year', value: listing.yearBuilt, label: 'Year Built' },
    { icon: 'garage', value: listing.garage, label: 'Garage' },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-10 border-b border-white/5"
    >
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        return (
          <motion.div
            key={stat.label}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="text-center py-4"
          >
            <Icon size={20} className="text-gold mx-auto mb-3" />
            <div className="text-2xl font-serif text-estate-cream mb-1">{stat.value}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-estate-muted font-sans">{stat.label}</div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
