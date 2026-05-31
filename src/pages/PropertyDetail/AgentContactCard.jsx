import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, Calendar, MessageSquare } from 'lucide-react';

export default function AgentContactCard({ agent, listingId }) {
  return (
    <>
      {/* Desktop sticky card */}
      <div className="hidden lg:block sticky top-24">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
            />
            <div>
              <h3 className="font-serif text-lg text-estate-cream">{agent.name}</h3>
              <p className="text-estate-muted text-xs font-sans">{agent.title}</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-estate-muted text-sm font-sans hover:text-gold transition-colors">
              <Phone size={14} className="text-gold" />
              {agent.phone}
            </a>
            <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-estate-muted text-sm font-sans hover:text-gold transition-colors">
              <Mail size={14} className="text-gold" />
              {agent.email}
            </a>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-gold text-estate-dark py-3.5 font-sans text-sm uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors cursor-pointer"
            >
              <Calendar size={16} />
              Schedule a Viewing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full border border-gold/40 text-gold py-3.5 font-sans text-sm uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 hover:bg-gold/10 transition-colors cursor-pointer"
            >
              <MessageSquare size={16} />
              Send Message
            </motion.button>
          </div>

          <Link
            to={`/agents/${agent.id}`}
            className="block mt-6 text-center text-estate-muted text-xs font-sans hover:text-gold transition-colors"
          >
            View Full Agent Profile →
          </Link>
        </motion.div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-estate-dark/95 backdrop-blur-xl border-t border-white/10 p-4 flex gap-3 lg:hidden">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex-1 bg-gold text-estate-dark py-3 font-sans text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calendar size={14} />
          Schedule Viewing
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex-1 border border-gold/40 text-gold py-3 font-sans text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageSquare size={14} />
          Message
        </motion.button>
      </div>
    </>
  );
}
