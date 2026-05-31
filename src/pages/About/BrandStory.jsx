import { motion } from 'framer-motion';

export default function BrandStory() {
  const headline = "We believe every home has a story.".split(' ');

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Domaine Brand Story"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-estate-dark via-estate-dark/80 to-estate-dark" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* Animated Headline */}
        <div className="max-w-4xl mb-24">
          <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans block mb-8">Our Story</span>
          <motion.h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-estate-cream leading-[1.1]">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="inline-block mr-3 md:mr-5 mb-2"
              >
                {word === 'story.' ? <span className="italic text-gold-light">{word}</span> : word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* 2-Column Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-estate-muted font-sans text-lg leading-relaxed mb-6">
              Founded in 1999, Domaine emerged from a simple observation: the luxury real estate market had become entirely transactional. We set out to change that by reintroducing the art of curation and the importance of personal connection.
            </p>
            <p className="text-estate-muted font-sans text-lg leading-relaxed">
              Today, we represent the world's most exceptional properties and the discerning individuals who seek them. Our approach goes beyond square footage and amenities; we look for the soul of a property, the provenance of its architecture, and the lifestyle it enables.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="pl-0 lg:pl-12 border-l-0 lg:border-l border-gold/30"
          >
            <blockquote className="font-serif text-3xl md:text-4xl italic text-estate-cream leading-snug">
              "We don't merely open doors to houses. We open doors to <span className="text-gold-light">extraordinary lives</span>."
            </blockquote>
            <p className="mt-6 text-gold text-sm font-sans uppercase tracking-[0.15em]">— Marcus Sterling, Founder</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
