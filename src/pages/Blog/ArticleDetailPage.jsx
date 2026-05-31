import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Twitter, Linkedin, LinkIcon } from 'lucide-react';
import { articles } from '../../data/articles';
import PageTransition from '../../components/PageTransition';
import ArticleCard from './ArticleCard';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!article) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-estate-cream mb-4">Article Not Found</h1>
            <button onClick={() => navigate('/insights')} className="bg-gold text-estate-dark px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors cursor-pointer">
              View All Articles
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const related = articles.filter(a => a.id !== article.id).slice(0, 3);
  const midIndex = Math.floor(article.body.length / 2);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <PageTransition>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-gold z-[60]"
        style={{ width: `${progress}%` }}
      />

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <motion.img
          src={article.coverImage}
          alt={article.title}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-estate-dark via-estate-dark/50 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 z-20 bg-black/40 backdrop-blur-sm border border-white/10 text-white p-3 hover:bg-gold hover:text-estate-dark hover:border-gold transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute bottom-12 left-0 right-0 px-4 md:px-8 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-gold text-xs font-sans uppercase tracking-[0.2em] mb-4 block">{article.category}</span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-3xl md:text-5xl text-white leading-tight"
            >
              {article.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <img src={article.author.photo} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="text-left">
                <p className="text-estate-cream text-sm font-sans">{article.author.name}</p>
                <p className="text-estate-muted text-xs font-sans">{article.date} · {article.readTime}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-16">
        {article.body.map((paragraph, i) => (
          <div key={i}>
            <p className="text-estate-cream/80 font-serif text-[17px] leading-[1.9] mb-8">{paragraph}</p>
            {i === midIndex && article.pullQuote && (
              <blockquote className="border-l-2 border-gold pl-8 my-12">
                <p className="font-serif text-2xl md:text-3xl italic text-gold-light leading-relaxed">
                  {article.pullQuote}
                </p>
              </blockquote>
            )}
          </div>
        ))}

        {/* Share buttons */}
        <div className="flex items-center gap-4 pt-8 mt-12 border-t border-white/5">
          <span className="text-estate-muted text-xs font-sans uppercase tracking-[0.2em]">Share</span>
          <button onClick={copyLink} className="text-estate-muted hover:text-gold transition-colors cursor-pointer" aria-label="Copy link">
            <LinkIcon size={18} />
          </button>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-estate-muted hover:text-gold transition-colors" aria-label="Share on Twitter">
            <Twitter size={18} />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-estate-muted hover:text-gold transition-colors" aria-label="Share on LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>

        {/* Author bio */}
        <div className="mt-12 glass-card p-8 flex items-start gap-6">
          <img src={article.author.photo} alt={article.author.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-estate-cream">{article.author.name}</h3>
            <p className="text-gold text-xs font-sans uppercase tracking-[0.15em] mb-3">{article.author.title}</p>
            <p className="text-estate-muted font-sans text-sm leading-relaxed">{article.author.bio}</p>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/5">
        <h2 className="font-serif text-3xl text-estate-cream mb-2">Related Articles</h2>
        <div className="w-12 h-[1px] bg-gold mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map(a => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
