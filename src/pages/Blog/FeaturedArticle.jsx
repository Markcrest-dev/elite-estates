import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FeaturedArticle({ article }) {
  return (
    <Link to={`/insights/${article.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 group cursor-pointer border border-white/5 overflow-hidden hover:border-gold/20 transition-colors"
      >
        <div className="relative h-64 lg:h-[400px] overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-estate-dark/20 lg:to-estate-dark/40" />
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-white/[0.02]">
          <span className="text-gold text-xs font-sans uppercase tracking-[0.2em] mb-4">{article.category}</span>
          <h2 className="font-serif text-2xl lg:text-3xl text-estate-cream leading-tight mb-4 group-hover:text-gold-light transition-colors">
            {article.title}
          </h2>
          <p className="text-estate-muted font-sans text-sm leading-relaxed mb-6">{article.excerpt}</p>
          <div className="flex items-center gap-3">
            <img src={article.author.photo} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-estate-cream text-sm font-sans">{article.author.name}</p>
              <p className="text-estate-muted text-xs font-sans">{article.date} · {article.readTime}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
