
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services as ServicesSection } from './components/Services';
import { About as AboutSection } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery as GallerySection } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Process } from './components/Process';
import { Contact as ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Portfolio from './pages/Portfolio';
import ViewProjects from './pages/ViewProjects';
import CostCalculator from './pages/CostCalculator';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import LogoDemo from './pages/LogoDemo';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for resources
    const timer = setTimeout(() => {
      setLoading(false);

      // Scroll to hash if present after loading
      setTimeout(() => {
        if (window.location.hash) {
          const id = window.location.hash.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);

    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-white text-3xl font-serif font-bold tracking-wider">SIKANDER ARTS</h1>
          <p className="text-gray-300 text-sm mt-2 font-bold tracking-[0.2em] uppercase">Karachi's Premium Finishers</p>
        </motion.div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="font-sans text-gray-800 bg-white overflow-x-hidden selection:bg-secondary selection:text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <ServicesSection />
                  <AboutSection />
                  <WhyChooseUs />
                  <GallerySection />
                  <Process />
                  <Testimonials />
                  <ContactSection />
                </>
              } />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/view-projects" element={<ViewProjects />} />
              <Route path="/calculate-cost" element={<CostCalculator />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/logo-demo" element={<LogoDemo />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
