import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const FloatingActions: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-6 z-40 items-end perspective-1000">
      {/* WhatsApp Button - Premium 3D Orb */}
      <motion.a
        href="https://wa.me/+923022911088"
        target="_blank"
        rel="noopener noreferrer"
        initial={false}
        transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-[2rem] shadow-2xl flex items-center justify-center cursor-pointer z-50 transition-shadow duration-500 relative group overflow-hidden border border-white/20"
        title="Chat on WhatsApp"
      >
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        <motion.div
        >
          <MessageCircle size={25} className="relative z-10" />
        </motion.div>
        {/* Light Sweep Effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" /> */}
      </motion.a>

      {/* Back To Top Button - Cinematic Reveal */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            onClick={scrollToTop}
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-2xl shadow-lg flex items-center justify-center cursor-pointer border border-white/10 relative overflow-hidden group"
            title="Back to Top"
          >
            <div className="absolute inset-0 bg-secondary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <ArrowUp size={28} className="relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
