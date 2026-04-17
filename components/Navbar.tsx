
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Palette, Calculator, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Logo5 } from './Logos';

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
      className={`fixed w-full z-50 transition-all duration-700 perspective-2000 ${isSolidNav
        ? 'bg-grey/80 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] py-3'
        : 'bg-transparent py-5'
        }`}
    >
      {/* Laser Bottom Glow */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_15px_rgba(249,115,22,0.8)]"
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section - 3D Tilt */}
          <Link
            to="/"
            className="flex items-center gap-3 group relative"
          >
            <motion.div
              whileHover={{ rotateY: 15, rotateX: -10, z: 50 }}
              className="flex items-center gap-3 mr-2 sm:mr-4 transform-gpu transition-transform duration-500"
            >
              <div className="-mt-1 lg:-mt-2 filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                <Logo5 isSolidNav={isSolidNav} />
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Cinematic Stagger */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
              >
                <motion.div
                  initial={{ opacity: 0, y: -20, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: idx * 0.1 + 0.5, type: "spring", damping: 15 }}
                  className={`text-[11px] font-black transition-all relative group flex items-center gap-2 py-2 uppercase tracking-[0.25em] ${isSolidNav ? 'text-gray-900' : 'text-black'
                    } hover:text-secondary`}
                >
                  {link.name === 'Calculator' && <Calculator size={14} className="text-secondary animate-pulse" />}
                  <span className="group-hover:tracking-[0.4em] transition-all duration-500">{link.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-secondary to-orange-400 transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
                </motion.div>
              </Link>
            ))}
            <Link to="/contact">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05, y: -2, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-white px-8 py-3.5 rounded-xl font-black text-xs transition-all shadow-2xl flex items-center gap-3 group overflow-hidden relative uppercase tracking-[0.2em]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Phone size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                <span>Free Quote</span>
              </motion.div>
            </Link>
          </nav>

          {/* Mobile Menu Button - 3D */}
          <motion.button
            whileTap={{ scale: 0.8, rotate: 90 }}
            className="lg:hidden text-grey-900 p-3 bg-black/20 border border-white/10 rounded-xl backdrop-blur-3xl shadow-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown - 3D Unfold */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, rotateX: -90, originY: 0 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[64px] lg:hidden bg-secondary/90 backdrop-blur-5xl border-t border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden z-40 h-[calc(100vh-64px)]"
          >
            <div className="flex flex-col p-10 space-y-8 h-full justify-center perspective-2000">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -50, rotateY: 45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="text-gray-800 text-4xl font-black hover:text-secondary px-6 py-4 rounded-2xl hover:bg-white/5 transition-all flex items-center gap-8 group"
                  >
                    <span className="text-secondary/20 font-serif italic text-2xl group-hover:text-secondary group-hover:opacity-100 transition-all">0{i + 1}</span>
                    <span className="tracking-tighter uppercase">{link.name}</span>
                  </motion.div>
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-secondary text-white text-center py-6 rounded-2xl font-black text-xl shadow-[0_20px_40px_-10px_rgba(249,115,22,0.5)] active:scale-95 transition-transform mt-12 uppercase tracking-[0.3em] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
