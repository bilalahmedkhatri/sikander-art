import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Team Members' },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="relative py-32 bg-[#050505] text-white overflow-hidden">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-why" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-why)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
          </motion.div>
          <div className="relative inline-block perspective-2000">
            <motion.h2
              initial={{ opacity: 0, rotateX: -30, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-serif font-black mb-8 tracking-tighter leading-[1] preserve-3d"
            >
              The <span className="text-secondary">Sikander</span> <br />
              Arts Difference
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent blur-[1px]"
            />
          </div>
          <p className="text-gray-400 text-lg md:text-xl mt-12 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            We don't just paint walls; we architect atmosphere through transparency, obsessive quality, and absolute reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 perspective-2000">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 80,
                rotateX: 45,
                rotateY: index % 2 === 0 ? -20 : 20,
                scale: 0.8,
                translateZ: -200
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                translateZ: 0
              }}
              whileHover={{
                y: -15,
                rotateY: index % 2 === 0 ? 15 : -15,
                rotateX: 10,
                translateZ: 50,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(249, 115, 22, 0.4)",
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 80,
                delay: index * 0.1,
              }}
              className="relative p-12 rounded-[3.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/5 transition-all duration-700 group cursor-default overflow-hidden text-center preserve-3d"
            >
              {/* Cinematic Glare Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative z-10 preserve-3d">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, translateZ: -50 }}
                  whileInView={{ opacity: 1, scale: 1, translateZ: 0 }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 1, type: "spring" }}
                  className="text-5xl md:text-8xl font-black text-secondary mb-6 tracking-tighter drop-shadow-[0_10px_30px_rgba(249,115,22,0.4)] translate-z-30"
                >
                  {stat.value}
                </motion.div>
                <div
                  className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-white transition-all duration-500 translate-z-10"
                >
                  {stat.label}
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary opacity-[0.03] blur-3xl -mr-16 -mb-16 group-hover:opacity-10 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};