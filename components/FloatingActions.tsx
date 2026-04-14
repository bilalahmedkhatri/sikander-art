import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingActions: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-6 z-40 items-end perspective-1000">
      {/* WhatsApp Button - Premium 3D Orb */}
      <motion.a
        href="https://wa.me/+923022911088"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, rotateZ: -45 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotateZ: 0,
          boxShadow: [
            "0 0 0 0px rgba(37, 211, 102, 0)",
            "0 0 0 20px rgba(37, 211, 102, 0.2)",
            "0 0 0 40px rgba(37, 211, 102, 0)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: { type: "spring", damping: 15, stiffness: 200 },
          opacity: { duration: 0.5 }
        }}
        whileHover={{ 
          scale: 1.15, 
          rotateY: 20, 
          rotateX: -10,
          z: 50,
          boxShadow: "0 30px 60px -12px rgba(37, 211, 102, 0.5)"
        }}
        whileTap={{ scale: 0.9, z: 0 }}
        className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-[2rem] shadow-2xl flex items-center justify-center cursor-pointer z-50 transition-shadow duration-500 relative group overflow-hidden border border-white/20"
        title="Chat on WhatsApp"
      >
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageCircle size={36} className="relative z-10 drop-shadow-lg" />
        </motion.div>
        {/* Light Sweep Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </motion.a>
 
      {/* Back To Top Button - Cinematic Reveal */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50, rotateX: 90 }}
            transition={{ type: "spring", damping: 15, stiffness: 150 }}
            onClick={scrollToTop}
            whileHover={{ 
              scale: 1.2, 
              y: -10, 
              backgroundColor: "#22c55e",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-500 border border-white/10 backdrop-blur-md relative overflow-hidden group"
            title="Back to Top"
          >
            <div className="absolute inset-0 bg-secondary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <ArrowUp size={28} className="relative z-10 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};