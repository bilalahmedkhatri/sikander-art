
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Palette, Calculator, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLightPage = location.pathname === '/about';
  const isSolidNav = scrolled || isLightPage || isOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Calculator', path: '/calculate-cost' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isSolidNav
          ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl transition-all duration-500 shadow-lg ${isSolidNav ? 'bg-secondary' : 'bg-white'}`}>
                <Palette className={`w-7 h-7 ${isSolidNav ? 'text-white' : 'text-primary'}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-serif font-black tracking-tighter uppercase ${isSolidNav ? 'text-white' : 'text-white drop-shadow-lg'}`}>
                  SIKANDER <span className="text-secondary">ART</span>
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] -mt-1 transition-colors ${isSolidNav ? 'text-blue-200' : 'text-orange-100'}`}>
                  Professional Painting Contractors
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`text-sm font-bold transition-all relative group flex items-center gap-1.5 py-2 uppercase tracking-widest ${
                    isSolidNav ? 'text-gray-100' : 'text-white drop-shadow-sm'
                  } hover:text-secondary`}
                >
                  {link.name === 'Calculator' && <Calculator size={14} className="text-secondary" />}
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </motion.div>
              </Link>
            ))}
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-white px-7 py-3 rounded-full font-bold transition-all shadow-xl flex items-center gap-2 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                <span>Free Quote</span>
              </motion.div>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="lg:hidden text-white p-2 bg-white/10 rounded-lg backdrop-blur-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-x-0 top-[72px] lg:hidden bg-primary/98 backdrop-blur-2xl border-t border-white/10 shadow-2xl overflow-hidden z-40 h-[calc(100vh-72px)]"
          >
            <div className="flex flex-col p-8 space-y-6 h-full justify-center">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    variants={linkVariants}
                    className="text-white text-3xl font-black hover:text-secondary px-4 py-4 rounded-xl hover:bg-white/5 transition-all flex items-center gap-6"
                  >
                    <span className="text-secondary opacity-30">0{i+1}</span>
                    {link.name}
                  </motion.div>
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <motion.div
                  variants={linkVariants}
                  className="bg-secondary text-white text-center py-5 rounded-2xl font-black text-xl shadow-2xl active:scale-95 transition-transform mt-8 uppercase tracking-widest"
                >
                  GET FREE QUOTE
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
