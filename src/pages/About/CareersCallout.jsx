import { motion } from 'framer-motion';

export default function CareersCallout() {
  return (
    <section className="relative py-32 px-4 overflow-hidden border-b border-white/5 bg-estate-dark">
      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gold-light/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-estate-cream mb-6">
          Ready to Elevate Your <span className="italic text-gold-light">Career?</span>
        </h2>
        <p className="text-estate-muted font-sans text-lg mb-10 max-w-2xl mx-auto">
          We are always looking for exceptional talent. If you share our commitment to excellence and discretion, we invite you to explore opportunities with Élite Estates.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gold text-estate-dark px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors cursor-pointer"
        >
          Join Our Team
        </motion.button>
      </div>
    </section>
  );
}
