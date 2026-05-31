import { motion } from 'framer-motion';

const termOptions = [10, 15, 20, 30];

export default function LoanInputs({ inputs, setInputs }) {
  const update = (key, value) => setInputs(prev => ({ ...prev, [key]: value }));
  const downPaymentDollar = inputs.price * (inputs.downPct / 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 space-y-8"
    >
      {/* Home Price */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans">Home Price</label>
          <div className="flex items-center gap-1">
            <span className="text-gold font-sans text-sm">$</span>
            <input
              type="number"
              value={inputs.price}
              onChange={e => update('price', Number(e.target.value))}
              className="bg-transparent text-gold font-sans text-sm w-28 text-right focus:outline-none border-b border-gold/30 focus:border-gold pb-0.5"
            />
          </div>
        </div>
        <input
          type="range"
          min={200000}
          max={10000000}
          step={50000}
          value={inputs.price}
          onChange={e => update('price', Number(e.target.value))}
          className="w-full h-1 appearance-none bg-white/10 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-estate-dark [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-estate-muted text-[10px] font-sans mt-1">
          <span>$200K</span>
          <span>$10M</span>
        </div>
      </div>

      {/* Down Payment */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans">Down Payment</label>
          <div className="text-right">
            <span className="text-gold font-sans text-sm">{inputs.downPct}%</span>
            <span className="text-estate-muted font-sans text-xs ml-2">(${downPaymentDollar.toLocaleString()})</span>
          </div>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          step={1}
          value={inputs.downPct}
          onChange={e => update('downPct', Number(e.target.value))}
          className="w-full h-1 appearance-none bg-white/10 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-estate-dark [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-estate-muted text-[10px] font-sans mt-1">
          <span>5%</span>
          <span>50%</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans">Interest Rate</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              step={0.1}
              value={inputs.rate}
              onChange={e => update('rate', Number(e.target.value))}
              className="bg-transparent text-gold font-sans text-sm w-16 text-right focus:outline-none border-b border-gold/30 focus:border-gold pb-0.5"
            />
            <span className="text-gold font-sans text-sm">%</span>
          </div>
        </div>
        <input
          type="range"
          min={2}
          max={12}
          step={0.1}
          value={inputs.rate}
          onChange={e => update('rate', Number(e.target.value))}
          className="w-full h-1 appearance-none bg-white/10 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-estate-dark [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-estate-muted text-[10px] font-sans mt-1">
          <span>2%</span>
          <span>12%</span>
        </div>
      </div>

      {/* Loan Term */}
      <div>
        <label className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans block mb-4">Loan Term</label>
        <div className="grid grid-cols-4 gap-2">
          {termOptions.map(t => (
            <motion.button
              key={t}
              whileTap={{ scale: 0.95 }}
              onClick={() => update('term', t)}
              className={`py-3 text-sm font-sans transition-all cursor-pointer ${
                inputs.term === t
                  ? 'bg-gold text-estate-dark font-semibold'
                  : 'border border-white/10 text-estate-muted hover:border-gold/40 hover:text-estate-cream'
              }`}
            >
              {t} yr
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
