import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <Link to={`/insights/${article.slug}`} className="group block">
      <div className="border border-white/5 overflow-hidden hover:border-gold/20 transition-colors">
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 bg-gold text-estate-dark px-3 py-1 text-[10px] font-sans uppercase tracking-[0.15em] font-semibold">
            {article.category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-lg text-estate-cream leading-snug mb-3 group-hover:text-gold-light transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-estate-muted font-sans text-sm leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
          <div className="flex items-center gap-3">
            <img src={article.author.photo} alt={article.author.name} className="w-8 h-8 rounded-full object-cover" />
            <div>
              <p className="text-estate-cream text-xs font-sans">{article.author.name}</p>
              <p className="text-estate-muted text-[10px] font-sans">{article.readTime}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
