import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-estate-dark border-t border-white/5 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="font-serif text-2xl text-estate-cream mb-4 block">Élite <span className="text-gold">Estates</span></Link>
          <p className="text-estate-muted font-sans text-sm leading-relaxed max-w-md">Redefining luxury real estate since 1999. We curate the finest properties for discerning clients who demand excellence in every detail.</p>
          <div className="mt-6 flex gap-4">
            {['Twitter', 'Instagram', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="text-estate-muted hover:text-gold transition-colors text-sm font-sans">{s}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-sm uppercase tracking-[0.2em] text-gold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: 'Properties', to: '/search' },
              { label: 'About Us', to: '/about' },
              { label: 'Agents', to: '/agents' },
              { label: 'Insights', to: '/insights' },
              { label: 'Calculator', to: '/calculator' },
              { label: 'Contact', to: '/#contact' },
            ].map((l) => (
              <li key={l.label}><Link to={l.to} className="text-estate-muted hover:text-estate-cream transition-colors text-sm font-sans">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-sm uppercase tracking-[0.2em] text-gold mb-6">Contact</h4>
          <ul className="space-y-3 text-estate-muted text-sm font-sans">
            <li className="flex items-center gap-2"><MapPin size={14} className="text-gold" />Beverly Hills, CA 90210</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-gold" />+1 (310) 555-0199</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold" />hello@eliteestates.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-estate-muted text-xs font-sans">© 2026 Élite Estates. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service'].map((t) => (
            <a key={t} href="#" className="text-estate-muted hover:text-estate-cream transition-colors text-xs font-sans">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
