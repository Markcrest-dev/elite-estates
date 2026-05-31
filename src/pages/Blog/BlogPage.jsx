import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { articles } from '../../data/articles';
import PageTransition from '../../components/PageTransition';
import FeaturedArticle from './FeaturedArticle';
import ArticleCard from './ArticleCard';

const categories = ['All', 'Market Trends', 'Buying Guides', 'Luxury Living', 'Investment', 'Neighbourhoods'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = articles[0];
  const rest = articles.slice(1);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return rest;
    return rest.filter(a => a.category === activeCategory);
  }, [activeCategory, rest]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-gold tracking-[0.3em] uppercase text-sm font-sans">Knowledge</span>
            <div className="mt-3 w-12 h-[1px] bg-gold mx-auto" />
            <h1 className="mt-6 font-serif text-4xl md:text-5xl font-light text-estate-cream">
              Market <span className="italic text-gold-light">Insights</span>
            </h1>
            <p className="mt-4 text-estate-muted font-sans max-w-xl mx-auto">
              Expert analysis, buying guides, and luxury lifestyle features from our team.
            </p>
          </motion.div>

          {/* Featured Article */}
          <FeaturedArticle article={featured} />

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-16 mb-10">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-sans uppercase tracking-[0.1em] border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold text-estate-dark border-gold'
                    : 'border-white/10 text-estate-muted hover:border-gold/40 hover:text-estate-cream'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map(article => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
