import { motion } from 'framer-motion';
import { ShieldCheck, Diamond, Lock } from 'lucide-react';

const pillars = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'Integrity',
    desc: 'In an industry often defined by sales targets, we are defined by our fiduciary duty to our clients. Honest counsel is our most valuable asset.',
  },
  {
    num: '02',
    icon: Diamond,
    title: 'Excellence',
    desc: 'From our marketing collateral to our contract negotiations, we apply an obsessive attention to detail that ensures flawless execution.',
  },
  {
    num: '03',
    icon: Lock,
    title: 'Discretion',
    desc: 'We protect our clients\' privacy fiercely. High-profile transactions require a level of confidentiality that we guarantee unconditionally.',
  },
];

export default function MissionValues() {
  return (
    <section className="py-32 px-4 md:px-8 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Our Pillars</span>
          <div className="mt-3 w-12 h-[1px] bg-gold mx-auto" />
          <h2 className="mt-6 font-serif text-4xl md:text-5xl font-light text-estate-cream">
            The Values We <span className="italic text-gold-light">Live By</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="text-[120px] font-serif font-light text-white/[0.02] absolute -top-16 -left-4 -z-10 group-hover:text-gold/[0.05] transition-colors duration-500">
                  {pillar.num}
                </div>
                <div className="w-14 h-14 border border-gold/30 flex items-center justify-center mb-8 bg-estate-dark group-hover:bg-gold transition-colors duration-300">
                  <Icon size={24} className="text-gold group-hover:text-estate-dark transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-2xl text-estate-cream mb-4">{pillar.title}</h3>
                <p className="text-estate-muted font-sans text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
