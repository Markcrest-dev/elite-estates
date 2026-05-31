import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Search } from 'lucide-react';

const propertyTypes = ['House', 'Apartment', 'Villa', 'Penthouse'];
const amenityOptions = ['Pool', 'Gym', 'Garage', 'Garden', 'Concierge'];

function RangeSlider({ min, max, valueMin, valueMax, step, onChange, formatLabel }) {
  return (
    <div className="relative pt-2 pb-4">
      <div className="relative h-1 bg-white/10 rounded-full">
        <div
          className="absolute h-full bg-gold rounded-full"
          style={{
            left: `${((valueMin - min) / (max - min)) * 100}%`,
            right: `${100 - ((valueMax - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        onChange={(e) => onChange(Math.min(Number(e.target.value), valueMax - step), valueMax)}
        className="absolute top-2 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-estate-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        onChange={(e) => onChange(valueMin, Math.max(Number(e.target.value), valueMin + step))}
        className="absolute top-2 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-estate-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
      />
      <div className="flex justify-between mt-3 text-estate-muted text-xs font-sans">
        <span>{formatLabel(valueMin)}</span>
        <span>{formatLabel(valueMax)}</span>
      </div>
    </div>
  );
}

function Stepper({ value, onChange, label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-estate-muted text-sm font-sans">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(value - 1)}
          className="w-8 h-8 border border-white/10 flex items-center justify-center text-estate-muted hover:border-gold hover:text-gold transition-colors cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <span className="text-estate-cream font-sans text-sm w-6 text-center">{value}+</span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 border border-white/10 flex items-center justify-center text-estate-muted hover:border-gold hover:text-gold transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

export default function FilterSidebar({ filters, dispatch }) {
  const [locationInput, setLocationInput] = useState(filters.location);
  const debounceRef = useRef(null);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: 'SET_LOCATION', value: locationInput });
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [locationInput, dispatch]);

  return (
    <div className="space-y-8">
      {/* Location */}
      <div>
        <h4 className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans mb-4">Location</h4>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-estate-muted" />
          <input
            type="text"
            placeholder="City, state, or address..."
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="w-full bg-white/5 border border-white/10 pl-9 pr-4 py-2.5 text-estate-cream font-sans text-sm placeholder:text-estate-muted/50 focus:border-gold focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans mb-4">Price Range</h4>
        <RangeSlider
          min={200000}
          max={10000000}
          step={50000}
          valueMin={filters.priceMin}
          valueMax={filters.priceMax}
          onChange={(min, max) => dispatch({ type: 'SET_PRICE_RANGE', min, max })}
          formatLabel={(v) => `$${(v / 1000000).toFixed(1)}M`}
        />
      </div>

      {/* Property Type */}
      <div>
        <h4 className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans mb-4">Property Type</h4>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map(t => (
            <motion.button
              key={t}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'SET_TYPE', value: t })}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-[0.1em] border transition-all cursor-pointer ${
                filters.type === t
                  ? 'bg-gold text-estate-dark border-gold'
                  : 'border-white/10 text-estate-muted hover:border-gold/40 hover:text-estate-cream'
              }`}
            >
              {t}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="space-y-4">
        <h4 className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans">Rooms</h4>
        <Stepper
          label="Bedrooms"
          value={filters.bedsMin}
          onChange={(v) => dispatch({ type: 'SET_BEDS', value: v })}
        />
        <Stepper
          label="Bathrooms"
          value={filters.bathsMin}
          onChange={(v) => dispatch({ type: 'SET_BATHS', value: v })}
        />
      </div>

      {/* Square Footage */}
      <div>
        <h4 className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans mb-4">Square Footage</h4>
        <RangeSlider
          min={0}
          max={15000}
          step={500}
          valueMin={filters.sqftMin}
          valueMax={filters.sqftMax}
          onChange={(min, max) => dispatch({ type: 'SET_SQFT_RANGE', min, max })}
          formatLabel={(v) => `${v.toLocaleString()} sqft`}
        />
      </div>

      {/* Amenities */}
      <div>
        <h4 className="text-estate-cream text-xs uppercase tracking-[0.2em] font-sans mb-4">Amenities</h4>
        <div className="grid grid-cols-2 gap-2">
          {amenityOptions.map(a => (
            <label
              key={a}
              className={`flex items-center gap-2 px-3 py-2 border cursor-pointer transition-all text-xs font-sans ${
                filters.amenities.includes(a)
                  ? 'border-gold/40 text-gold bg-gold/5'
                  : 'border-white/5 text-estate-muted hover:border-white/20'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(a)}
                onChange={() => dispatch({ type: 'TOGGLE_AMENITY', value: a })}
                className="sr-only"
              />
              <div className={`w-3 h-3 border flex items-center justify-center ${
                filters.amenities.includes(a) ? 'border-gold bg-gold' : 'border-white/20'
              }`}>
                {filters.amenities.includes(a) && <span className="text-[8px] text-estate-dark">✓</span>}
              </div>
              {a}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
