import { motion } from 'framer-motion';
import { agents } from '../../data/agents';
import PageTransition from '../../components/PageTransition';
import AgentCard from './AgentCard';

export default function AgentsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Our Team</span>
            <div className="mt-3 w-12 h-[1px] bg-gold mx-auto" />
            <h1 className="mt-6 font-serif text-4xl md:text-5xl font-light text-estate-cream">
              Meet Our <span className="italic text-gold-light">Agents</span>
            </h1>
            <p className="mt-4 text-estate-muted font-sans max-w-xl mx-auto">
              Each agent brings decades of expertise, deep market knowledge, and a commitment to exceptional service.
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {agents.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
