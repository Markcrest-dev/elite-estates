import { motion } from 'framer-motion';

export default function ParallaxShowcase() {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Fixed background (native parallax) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          {/* Decorative line */}
          <div className="w-16 h-[1px] bg-gold mx-auto mb-8" />

          <blockquote className="font-serif text-3xl md:text-5xl italic font-light leading-snug text-estate-cream">
            "We Don't Just Sell Properties
            <span className="block mt-2">
              — We Match <span className="text-gold-light">Lifestyles</span>"
            </span>
          </blockquote>

          <div className="w-16 h-[1px] bg-gold mx-auto mt-8" />

          <p className="mt-6 text-estate-muted font-sans text-sm uppercase tracking-[0.3em]">
            Domaine
          </p>
        </motion.div>
      </div>
    </section>
  );
}
