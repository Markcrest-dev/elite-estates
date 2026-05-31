import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence } from 'framer-motion';
import { FavouritesProvider } from './context/FavouritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import SearchPage from './pages/Search/SearchPage';
import AgentsPage from './pages/Agents/AgentsPage';
import AgentDetailPage from './pages/Agents/AgentDetailPage';
import BlogPage from './pages/Blog/BlogPage';
import ArticleDetailPage from './pages/Blog/ArticleDetailPage';
import MortgageCalculator from './pages/Calculator/MortgageCalculator';
import FavouritesPage from './pages/Favourites/FavouritesPage';
import AboutPage from './pages/About/AboutPage';
import VirtualTourPage from './pages/VirtualTour/VirtualTourPage';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import PageBackground from './components/PageBackground';

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <FavouritesProvider>
        <ParallaxProvider>
          <ScrollToTop />
          <div className="noise-overlay" />
          <PageBackground />
          <div className="min-h-screen">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/property/:id/tour" element={<VirtualTourPage />} />
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/agents/:id" element={<AgentDetailPage />} />
                <Route path="/insights" element={<BlogPage />} />
                <Route path="/insights/:slug" element={<ArticleDetailPage />} />
                <Route path="/calculator" element={<MortgageCalculator />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </ParallaxProvider>
      </FavouritesProvider>
    </BrowserRouter>
  );
}

export default App;
