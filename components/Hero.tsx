
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, PaintRoller } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-12 md:pt-32 bg-[#fbfbfb]"
      id="home"
    >
      <div className="container mx-auto px-4 z-20 relative flex flex-col items-center justify-center">
        <div
          className="max-w-6xl mx-auto text-center"
        >
          <div className="relative mb-14 overflow-visible transform-style-3d">
            <h1
              className="text-6xl sm:text-5xl md:text-[4rem] lg:text-[6rem] font-serif font-black text-grey-100 leading-[0.8] tracking-tighter drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
            >
              <span className="block mb-4 text-black">MASTER</span>
              <span className="block mb-4">THE <span className="text-secondary italic">ART</span></span>
              <span className="block">OF <span className="text-secondary">LIVING</span></span>
            </h1>
          </div>

          <div
            className="mb-20"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-grey-100 uppercase tracking-[0.3em] max-w-4xl mx-auto leading-relaxed italic">
              Bespoke Interior & <span className="text-secondary border-b-4 border-secondary">Exterior</span> Excellence
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 md:gap-12 justify-center items-center transform-style-3d">
            <Link to="/view-projects">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -15,
                  rotateY: -10,
                  boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.8)",
                  translateZ: 50
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-white text-gray-700 px-12 py-6 md:px-16 md:py-8 rounded-3xl font-black text-sm md:text-2xl transition-all shadow-2xl flex items-center justify-center gap-6 overflow-hidden min-w-[250px] md:min-w-[320px] transform-style-3d"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <PaintRoller size={28} className="text-secondary group-hover:rotate-[25deg] transition-transform duration-500" />
                <span className="tracking-[0.2em]">EXPLORE WORK</span>
              </motion.div>
            </Link>
            <Link to="/calculate-cost">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -15,
                  rotateY: 10,
                  boxShadow: "0 50px 100px -20px rgba(249, 115, 22, 0.5)",
                  translateZ: 50
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-secondary text-white px-12 py-6 md:px-16 md:py-8 rounded-3xl font-black text-sm md:text-2xl transition-all shadow-2xl flex items-center justify-center gap-6 overflow-hidden min-w-[250px] md:min-w-[320px] transform-style-3d"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Calculator size={24} className="group-hover:rotate-[-20deg] transition-transform duration-500" />
                <span className="tracking-widest">GET ESTIMATE</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};
