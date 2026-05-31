import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-estate-dark border border-white/10 px-4 py-3 shadow-2xl">
      <p className="text-estate-cream text-sm font-sans font-semibold mb-1">Year {label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs font-sans" style={{ color: p.fill }}>
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function AmortizationChart({ schedule }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-serif text-2xl text-estate-cream mb-2">Amortization Schedule</h2>
      <div className="w-12 h-[1px] bg-gold mb-8" />

      <div className="glass-card p-6 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={schedule} barCategoryGap="15%">
            <XAxis
              dataKey="year"
              tick={{ fill: '#999', fontSize: 11, fontFamily: 'DM Sans' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#999', fontSize: 11, fontFamily: 'DM Sans' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, fontFamily: 'DM Sans' }}
              iconType="square"
            />
            <Bar dataKey="principal" name="Principal" fill="#c9a84c" stackId="a" radius={[0, 0, 0, 0]} />
            <Bar dataKey="interest" name="Interest" fill="#333333" stackId="a" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
