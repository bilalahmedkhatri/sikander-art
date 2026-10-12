import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { MotionConfig } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';

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
  return (
    <MotionConfig reducedMotion="user">
    <Router>
      <ScrollToTop />
      <div className="font-sans text-gray-800 bg-white overflow-x-hidden selection:bg-secondary selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <div className="landing-page">
                <SEO 
                  title="Sikander Arts | Professional Painting Contractor & Latest 2026 Paint Labour Rates in Karachi"
                  description="Sikander Arts – Karachi's most trusted painting contractor. Check latest 2026 paint labour rates in Karachi. Interior, exterior, texture, waterproofing & wood polish. 500+ projects completed. Get a free quote today!"
                  url="https://sikanderart.com/"
                />
                <Hero />
                <ServicesSection />
                <AboutSection />
                <WhyChooseUs />
                <GallerySection />
                <Process />
                <Testimonials />
                <ContactSection />
              </div>
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
    </MotionConfig>
  );
};

export default App;
