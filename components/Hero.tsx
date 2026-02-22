
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, PaintRoller, Sparkles, Palette, PaintBucket, Brush, Droplets } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  // Floating 3D Elements Configuration
  const floatingElements = [
    { icon: <PaintBucket size={80} />, top: '15%', left: '5%', delay: 0, duration: 8, rotate: [0, 360], color: 'text-secondary/40' },
    { icon: <Brush size={60} />, top: '65%', left: '8%', delay: 1, duration: 10, rotate: [0, -360], color: 'text-white/20' },
    { icon: <PaintRoller size={100} />, top: '25%', right: '10%', delay: 2, duration: 12, rotate: [0, 180], color: 'text-secondary/30' },
    { icon: <Droplets size={50} />, top: '75%', right: '15%', delay: 1.5, duration: 7, rotate: [0, -180], color: 'text-blue-300/20' },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20" id="home">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary/30 z-10 mix-blend-multiply"></div>
        <img
          src="https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=2070&auto=format&fit=crop"
          alt="Modern Painted Interior"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 z-[5] opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </motion.div>

      {/* 3D Floating Objects */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        {floatingElements.map((el, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${el.color}`}
            style={{ top: el.top, left: el.left, right: el.right }}
            animate={{ 
              y: [0, -40, 0],
              rotate: el.rotate,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: el.duration, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: el.delay
            }}
          >
            {el.icon}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative flex flex-col items-center justify-center h-full">
        <motion.div
          style={{ opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-xl border border-secondary/30 text-secondary text-[9px] sm:text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-4 md:mb-6 shadow-2xl"
          >
            <Sparkles size={14} className="animate-pulse" />
            Karachi's #1 Rated Painting Service
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white leading-[1.0] mb-4 md:mb-8 tracking-tighter text-glow"
          >
            TRANSFORM <br /> YOUR <span className="text-secondary italic">SPACE</span> WITH <span className="text-secondary">COLOR</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-sm sm:text-lg md:text-2xl font-bold text-blue-100 mb-4 md:mb-6 uppercase tracking-[0.2em]">
              PROFESSIONAL PAINTING SERVICES
            </h2>
            <p className="text-sm md:text-lg text-white/80 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto font-medium hidden sm:block">
              Expert residential and commercial painting services. From interior walls to exterior facades, we bring your vision to life with precision, quality, and vibrant colors.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <Link to="/view-projects">
              <motion.div
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-gray-100 text-primary px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-xs md:text-base transition-all shadow-2xl flex items-center justify-center gap-2 md:gap-3 group min-w-[180px] md:min-w-[220px]"
              >
                <PaintRoller size={18} className="text-secondary group-hover:rotate-12 transition-transform" />
                VIEW PROJECTS
              </motion.div>
            </Link>
            <Link to="/calculate-cost">
              <motion.div
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-black text-xs md:text-base transition-all shadow-2xl flex items-center justify-center gap-2 md:gap-3 group min-w-[180px] md:min-w-[220px]"
              >
                <Calculator size={18} className="group-hover:scale-110 transition-transform" />
                CALCULATE COST
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 text-white z-20 flex flex-col items-center"
      >
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 md:w-1.5 h-1 md:h-1.5 bg-secondary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
