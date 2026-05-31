import { useReducer, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { listings } from '../../data/listings';
import PageTransition from '../../components/PageTransition';
import FilterSidebar from './FilterSidebar';
import FilterChips from './FilterChips';
import ListingResults from './ListingResults';
import SortDropdown from './SortDropdown';
import EmptyState from './EmptyState';

const initialFilters = {
  priceMin: 200000,
  priceMax: 10000000,
  type: null,
  bedsMin: 1,
  bathsMin: 1,
  sqftMin: 0,
  sqftMax: 15000,
  amenities: [],
  location: '',
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_PRICE_RANGE': return { ...state, priceMin: action.min, priceMax: action.max };
    case 'SET_TYPE': return { ...state, type: state.type === action.value ? null : action.value };
    case 'SET_BEDS': return { ...state, bedsMin: Math.max(1, Math.min(8, action.value)) };
    case 'SET_BATHS': return { ...state, bathsMin: Math.max(1, Math.min(8, action.value)) };
    case 'SET_SQFT_RANGE': return { ...state, sqftMin: action.min, sqftMax: action.max };
    case 'TOGGLE_AMENITY': return {
      ...state,
      amenities: state.amenities.includes(action.value)
        ? state.amenities.filter(a => a !== action.value)
        : [...state.amenities, action.value],
    };
    case 'SET_LOCATION': return { ...state, location: action.value };
    case 'CLEAR_FILTER': {
      const cleared = { ...state };
      switch (action.key) {
        case 'price': cleared.priceMin = 200000; cleared.priceMax = 10000000; break;
        case 'type': cleared.type = null; break;
        case 'beds': cleared.bedsMin = 1; break;
        case 'baths': cleared.bathsMin = 1; break;
        case 'sqft': cleared.sqftMin = 0; cleared.sqftMax = 15000; break;
        case 'location': cleared.location = ''; break;
        default:
          if (action.key.startsWith('amenity:')) {
            const am = action.key.split(':')[1];
            cleared.amenities = cleared.amenities.filter(a => a !== am);
          }
      }
      return cleared;
    }
    case 'CLEAR_ALL': return initialFilters;
    default: return state;
  }
}

export default function SearchPage() {
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  const [sort, setSort] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = listings.filter(l => {
      if (l.priceRaw < filters.priceMin || l.priceRaw > filters.priceMax) return false;
      if (filters.type && l.type !== filters.type) return false;
      if (l.beds < filters.bedsMin) return false;
      if (l.baths < filters.bathsMin) return false;
      if (l.sqft < filters.sqftMin || l.sqft > filters.sqftMax) return false;
      if (filters.amenities.length > 0 && !filters.amenities.every(a => l.amenities.includes(a))) return false;
      if (filters.location && !l.address.toLowerCase().includes(filters.location.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case 'price-high': result.sort((a, b) => b.priceRaw - a.priceRaw); break;
      case 'price-low': result.sort((a, b) => a.priceRaw - b.priceRaw); break;
      case 'popular': result.sort((a, b) => b.sqft - a.sqft); break;
      default: result.sort((a, b) => b.yearBuilt - a.yearBuilt);
    }

    return result;
  }, [filters, sort]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin > 200000 || filters.priceMax < 10000000) count++;
    if (filters.type) count++;
    if (filters.bedsMin > 1) count++;
    if (filters.bathsMin > 1) count++;
    if (filters.sqftMin > 0 || filters.sqftMax < 15000) count++;
    if (filters.location) count++;
    count += filters.amenities.length;
    return count;
  }, [filters]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Find Your Home</span>
            <div className="mt-3 w-12 h-[1px] bg-gold" />
            <h1 className="mt-6 font-serif text-4xl md:text-5xl font-light text-estate-cream">
              Property <span className="italic text-gold-light">Search</span>
            </h1>
          </motion.div>

          {/* Mobile filter button */}
          <div className="lg:hidden mb-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 font-sans text-sm text-estate-cream cursor-pointer"
            >
              <SlidersHorizontal size={16} className="text-gold" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-gold text-estate-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">
                  {activeFilterCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Filter Chips */}
          <FilterChips filters={filters} dispatch={dispatch} />

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar filters={filters} dispatch={dispatch} />
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-estate-muted font-sans text-sm">
                  <span className="text-gold font-semibold">{filtered.length}</span> properties found
                </p>
                <SortDropdown sort={sort} setSort={setSort} />
              </div>

              {filtered.length > 0 ? (
                <ListingResults listings={filtered} />
              ) : (
                <EmptyState onClear={() => dispatch({ type: 'CLEAR_ALL' })} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-estate-dark rounded-t-2xl z-50 p-6 max-h-[85vh] overflow-y-auto border-t border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-estate-cream">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-estate-muted hover:text-estate-cream transition-colors font-sans text-sm cursor-pointer">
                  Done
                </button>
              </div>
              <FilterSidebar filters={filters} dispatch={dispatch} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
