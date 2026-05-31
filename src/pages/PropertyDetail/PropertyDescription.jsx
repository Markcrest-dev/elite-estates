import { motion } from 'framer-motion';

export default function PropertyDescription({ description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-serif text-3xl text-estate-cream mb-2">About This Property</h2>
      <div className="w-12 h-[1px] bg-gold mb-8" />
      <p className="text-estate-muted font-sans leading-relaxed text-[15px]">{description}</p>
    </motion.div>
  );
}
