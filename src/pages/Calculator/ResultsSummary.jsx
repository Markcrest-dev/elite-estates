import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#c9a84c', '#4a4a4a', '#2a2a2a', '#6a6a6a'];

export default function ResultsSummary({
  monthly, loanAmount, totalInterest, totalCost,
  principalPortion, interestPortion, monthlyTax, monthlyInsurance,
}) {
  const springMonthly = useSpring(0, { stiffness: 100, damping: 20 });
  const displayMonthly = useTransform(springMonthly, v => `$${Math.round(v).toLocaleString()}`);

  useEffect(() => {
    springMonthly.set(monthly);
  }, [monthly, springMonthly]);

  const pieData = [
    { name: 'Principal', value: Math.round(principalPortion) },
    { name: 'Interest', value: Math.round(interestPortion) },
    { name: 'Tax (est.)', value: Math.round(monthlyTax) },
    { name: 'Insurance (est.)', value: Math.round(monthlyInsurance) },
  ];

  const summaryCards = [
    { label: 'Monthly Payment', value: `$${Math.round(monthly).toLocaleString()}` },
    { label: 'Total Interest', value: `$${totalInterest.toLocaleString()}` },
    { label: 'Total Cost', value: `$${totalCost.toLocaleString()}` },
    { label: 'Loan Amount', value: `$${loanAmount.toLocaleString()}` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card p-8"
    >
      {/* Large monthly payment */}
      <div className="text-center mb-8">
        <p className="text-estate-muted text-xs uppercase tracking-[0.2em] font-sans mb-2">Estimated Monthly Payment</p>
        <motion.span className="text-gold font-serif text-5xl md:text-6xl font-light">{displayMonthly}</motion.span>
      </div>

      {/* Donut chart */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {pieData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
              <span className="text-estate-muted text-xs font-sans">{d.name}: ${d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        {summaryCards.map(card => (
          <div key={card.label} className="bg-white/5 border border-white/5 p-4 text-center">
            <p className="text-estate-muted text-[10px] uppercase tracking-[0.15em] font-sans mb-1">{card.label}</p>
            <p className="text-estate-cream font-serif text-lg">{card.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
