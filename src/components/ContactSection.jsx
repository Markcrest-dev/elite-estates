import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Blurred background */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(12px) brightness(0.25)', transform: 'scale(1.1)' }} />
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Get In Touch</span>
          <div className="mt-3 w-12 h-[1px] bg-gold mx-auto" />
          <h2 className="mt-6 font-serif text-4xl md:text-5xl font-light">Schedule a <span className="italic text-gold-light">Consultation</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="glass-card p-8 md:p-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" id="contact-name" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-cream font-sans text-sm placeholder:text-estate-muted/60 focus:border-gold focus:outline-none transition-colors" />
              <input type="email" placeholder="Email Address" id="contact-email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-cream font-sans text-sm placeholder:text-estate-muted/60 focus:border-gold focus:outline-none transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="tel" placeholder="Phone Number" id="contact-phone" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-cream font-sans text-sm placeholder:text-estate-muted/60 focus:border-gold focus:outline-none transition-colors" />
              <select id="contact-interest" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-muted/60 font-sans text-sm focus:border-gold focus:outline-none transition-colors" defaultValue="">
                <option value="" disabled>Property Interest</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="penthouse">Penthouse</option>
                <option value="waterfront">Waterfront</option>
              </select>
            </div>
            <textarea placeholder="Your Message" id="contact-message" rows={5} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-cream font-sans text-sm placeholder:text-estate-muted/60 focus:border-gold focus:outline-none transition-colors resize-none" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" className="w-full bg-gold text-estate-dark py-4 font-sans text-sm uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-3 hover:bg-gold-light transition-colors cursor-pointer">
              <Send size={16} />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
