import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
      transition={{ duration: 0.7, ease: [0.2, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
