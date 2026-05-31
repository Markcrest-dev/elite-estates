import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import ListingsGrid from '../components/ListingsGrid';
import ParallaxShowcase from '../components/ParallaxShowcase';
import WhyChooseUs from '../components/WhyChooseUs';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import PageTransition from '../components/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsBar />
      <ListingsGrid />
      <ParallaxShowcase />
      <WhyChooseUs />
      <TestimonialsSection />
      <ContactSection />
    </PageTransition>
  );
}
