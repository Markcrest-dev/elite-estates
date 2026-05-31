import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { Home, MapPin, Award, Headphones } from 'lucide-react';

const features = [
  { icon: Home, title: 'Exclusive Listings', description: 'Access off-market properties and pre-launch opportunities not available to the general public.' },
  { icon: MapPin, title: 'Prime Locations', description: 'From waterfront estates to penthouse suites in the most coveted addresses worldwide.' },
  { icon: Award, title: 'Award-Winning Agents', description: 'Our team of elite agents has closed over $12B in luxury real estate transactions.' },
  { icon: Headphones, title: 'Full Concierge', description: 'White-glove service from first viewing to closing day — and beyond.' },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Parallax speed={-8}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80" alt="Élite Estates Office" loading="lazy" className="w-full h-[600px] object-cover" />
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10" />
            <div className="absolute -bottom-6 -left-6 bg-gold text-estate-dark px-6 py-4">
              <div className="text-3xl font-serif font-light">25+</div>
              <div className="text-xs uppercase tracking-[0.2em]">Years</div>
            </div>
          </motion.div>
        </Parallax>
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Why Choose Us</span>
            <div className="mt-3 w-12 h-[1px] bg-gold" />
            <h2 className="mt-6 font-serif text-4xl md:text-5xl font-light leading-tight">Where <span className="italic text-gold-light">Luxury</span> Meets Expertise</h2>
          </motion.div>
          <div className="mt-12 space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <Icon size={20} className="text-gold group-hover:text-estate-dark transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-estate-cream mb-1">{feature.title}</h3>
                    <p className="text-estate-muted font-sans text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
