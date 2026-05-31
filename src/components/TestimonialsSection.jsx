import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Eleanor Vance',
    role: 'Homeowner',
    text: 'Élite Estates made the process of finding our dream home seamless and extraordinary. Their attention to detail and curated selection of properties is unmatched.',
  },
  {
    name: 'Marcus Sterling',
    role: 'Real Estate Investor',
    text: 'A truly premium experience from start to finish. The agents are incredibly knowledgeable, and the exclusive listings they offer are simply breathtaking.',
  },
  {
    name: 'Sophia Laurent',
    role: 'Seller',
    text: 'They didn\'t just sell my property; they marketed it as a masterpiece. The level of professionalism and luxury service is exactly what I was looking for.',
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-estate-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif text-white mb-4"
          >
            Client <span className="text-gold italic">Experiences</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-estate-muted max-w-2xl mx-auto"
          >
            Hear from those who have discovered their perfect sanctuary through our exclusive services.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-black/40 border border-gold/10 p-8 rounded-sm hover:border-gold/30 transition-colors duration-300"
            >
              <div className="text-gold text-4xl font-serif mb-4">"</div>
              <p className="text-estate-cream/80 mb-8 italic">
                {testimonial.text}
              </p>
              <div>
                <h4 className="text-white font-sans uppercase tracking-widest text-sm mb-1">{testimonial.name}</h4>
                <p className="text-gold-light text-xs">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
