
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, PaintRoller, Sparkles, Palette, PaintBucket, Brush, Droplets } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Tracking for 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Floating 3D Elements Configuration
  const floatingElements = [
    { icon: <PaintBucket size={100} />, top: '15%', left: '5%', delay: 0, duration: 12, rotate: [0, 360], color: 'text-secondary/30' },
    { icon: <Brush size={80} />, top: '65%', left: '8%', delay: 1, duration: 15, rotate: [0, -360], color: 'text-white/10' },
    { icon: <PaintRoller size={120} />, top: '25%', right: '10%', delay: 2, duration: 18, rotate: [0, 180], color: 'text-secondary/20' },
    { icon: <Droplets size={70} />, top: '75%', right: '15%', delay: 1.5, duration: 10, rotate: [0, -180], color: 'text-blue-300/10' },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 bg-[#fbfbfb] perspective-2000"
      id="home"
    >
      {/* Content with 3D Mouse Tilt */}
      <div className="container mx-auto px-4 z-20 relative flex flex-col items-center justify-center h-full transform-style-3d">
        <motion.div
          style={{ opacity, rotateX, rotateY }}
          className="max-w-6xl mx-auto text-center will-change-transform"
        >
          <div className="relative mb-14 overflow-visible transform-style-3d">
            <motion.h1
              initial={{ y: 200, opacity: 0, rotateX: 90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                duration: 2,
                ease: [0.16, 1, 0.3, 1],
                delay: 1.2,
                type: "spring",
                damping: 30,
                stiffness: 40
              }}
              className="text-6xl sm:text-5xl md:text-[4rem] lg:text-[6rem] font-serif font-black text-grey-100 leading-[0.8] tracking-tighter drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)]"
            >
              <span className="block mb-4 text-black">MASTER</span>
              <span className="block mb-4">THE <span className="text-secondary italic">ART</span></span>
              <span className="block">OF <span className="text-secondary">LIVING</span></span>
            </motion.h1>

            {/* Cinematic Glare Effect following cursor */}
            <motion.div
              style={{
                left: useTransform(mouseX, [-0.5, 0.5], ["30%", "70%"]),
                top: useTransform(mouseY, [-0.5, 0.5], ["30%", "70%"]),
              }}
              className="absolute w-[400px] h-[400px] bg-secondary/10 blur-[150px] rounded-full -z-10 pointer-events-none opacity-50"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mb-20"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-grey-100 uppercase tracking-[0.3em] max-w-4xl mx-auto leading-relaxed italic">
              Bespoke Interior & <span className="text-secondary border-b-4 border-secondary">Exterior</span> Excellence
            </h2>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-8 md:gap-12 justify-center items-center transform-style-3d">
            <Link to="/view-projects">
              <motion.div
                initial={{ x: -100, opacity: 0, rotateY: -45 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ delay: 2.4, duration: 1.2, type: "spring" }}
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
                initial={{ x: 100, opacity: 0, rotateY: 45 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ delay: 2.4, duration: 1.2, type: "spring" }}
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
        </motion.div>
      </div>

    </section>
  );
};
