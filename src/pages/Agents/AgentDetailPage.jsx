import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ArrowLeft } from 'lucide-react';
import { agents } from '../../data/agents';
import { listings } from '../../data/listings';
import { useCountUp } from '../../hooks/useCountUp';
import PageTransition from '../../components/PageTransition';
import PropertyCard from '../../components/PropertyCard';

function AnimatedStat({ value, label, suffix = '', prefix = '', active }) {
  const numVal = parseInt(String(value).replace(/[^0-9]/g, ''));
  const count = useCountUp(numVal, 2000, active);

  return (
    <div className="text-center py-6">
      <div className="text-3xl md:text-4xl font-serif font-light text-gold mb-1">
        {prefix}{typeof value === 'number' ? count.toLocaleString() : value}{suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-estate-muted font-sans">{label}</div>
    </div>
  );
}

export default function AgentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const agent = agents.find(a => a.id === Number(id));
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  if (!agent) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-estate-cream mb-4">Agent Not Found</h1>
            <button onClick={() => navigate('/agents')} className="bg-gold text-estate-dark px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors cursor-pointer">
              View All Agents
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const agentListings = listings.filter(l => l.agentId === agent.id);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <div className="relative h-[60vh] overflow-hidden">
          <motion.img
            src={agent.photo}
            alt={agent.name}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-estate-dark via-estate-dark/40 to-transparent" />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-24 left-6 z-20 bg-black/40 backdrop-blur-sm border border-white/10 text-white p-3 hover:bg-gold hover:text-estate-dark hover:border-gold transition-all cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="absolute bottom-12 left-0 right-0 px-4 md:px-8 z-10">
            <div className="max-w-7xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-4xl md:text-6xl text-white mb-2"
              >
                {agent.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gold font-sans text-sm uppercase tracking-[0.2em]"
              >
                {agent.title}
              </motion.p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Quote + Bio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <blockquote className="font-serif text-2xl md:text-3xl italic text-gold-light leading-relaxed">
                "{agent.quote}"
              </blockquote>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-estate-muted font-sans leading-relaxed">{agent.bio}</p>
              <div className="mt-6 space-y-2 text-sm font-sans">
                <p className="text-estate-muted">📧 <a href={`mailto:${agent.email}`} className="text-gold hover:text-gold-light transition-colors">{agent.email}</a></p>
                <p className="text-estate-muted">📱 <a href={`tel:${agent.phone}`} className="text-gold hover:text-gold-light transition-colors">{agent.phone}</a></p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 border-y border-white/5">
            <AnimatedStat value={agent.deals} label="Deals Closed" active={statsInView} />
            <AnimatedStat value={agent.avgPrice} label="Avg Sale Price" active={statsInView} />
            <AnimatedStat value={agent.yearsExp} label="Years of Experience" active={statsInView} />
            <div className="text-center py-6">
              <div className="text-3xl md:text-4xl font-serif font-light text-gold mb-1 flex items-center justify-center gap-1">
                {agent.rating} <Star size={20} className="fill-gold text-gold" />
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-estate-muted font-sans">Client Rating</div>
            </div>
          </div>

          {/* Active Listings */}
          {agentListings.length > 0 && (
            <div className="py-16">
              <h2 className="font-serif text-3xl text-estate-cream mb-2">Active Listings</h2>
              <div className="w-12 h-[1px] bg-gold mb-10" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentListings.map(l => (
                  <PropertyCard key={l.id} {...l} />
                ))}
              </div>
            </div>
          )}

          {/* Testimonials */}
          {agent.testimonials.length > 0 && (
            <div className="py-16 border-t border-white/5">
              <h2 className="font-serif text-3xl text-estate-cream mb-2">Client Testimonials</h2>
              <div className="w-12 h-[1px] bg-gold mb-10" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agent.testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-8"
                  >
                    <Quote size={24} className="text-gold/30 mb-4" />
                    <p className="text-estate-cream/80 font-sans text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <img src={t.photo} alt={t.client} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-estate-cream text-sm font-sans font-medium">{t.client}</p>
                        <p className="text-estate-muted text-xs font-sans">{t.property}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Form */}
          <div className="py-16 border-t border-white/5">
            <h2 className="font-serif text-3xl text-estate-cream mb-2">Get in Touch</h2>
            <div className="w-12 h-[1px] bg-gold mb-10" />
            <form className="max-w-xl space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-cream font-sans text-sm placeholder:text-estate-muted/60 focus:border-gold focus:outline-none transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-cream font-sans text-sm placeholder:text-estate-muted/60 focus:border-gold focus:outline-none transition-colors" />
              </div>
              <textarea placeholder="Your Message" rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-estate-cream font-sans text-sm placeholder:text-estate-muted/60 focus:border-gold focus:outline-none transition-colors resize-none" />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="bg-gold text-estate-dark px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors cursor-pointer"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
