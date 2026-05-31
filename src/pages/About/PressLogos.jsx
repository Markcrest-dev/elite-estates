export default function PressLogos() {
  const logos = [
    'Forbes', 'Wall Street Journal', 'Architectural Digest', 'Financial Times', 
    'Vogue Living', 'Bloomberg', 'The New York Times'
  ];

  // Duplicate for seamless loop
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-24 bg-white/[0.02] border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center">
        <span className="text-estate-muted tracking-[0.3em] uppercase text-xs font-sans">As Featured In</span>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-estate-dark to-transparent z-10" />
        
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {marqueeLogos.map((logo, i) => (
            <span 
              key={i} 
              className="mx-16 font-serif text-2xl md:text-3xl text-white/30 hover:text-white/80 transition-colors duration-300 cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-estate-dark to-transparent z-10" />
      </div>
    </section>
  );
}
