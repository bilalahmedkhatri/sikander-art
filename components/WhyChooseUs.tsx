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
    <section id="why-us" className="relative py-32 bg-[#fbfbfb] text-gray-900 overflow-hidden">
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
        <div className="text-center max-w-4xl mx-auto mb-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
          </motion.div>
          <div className="relative inline-block perspective-2000">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-serif font-black mb-8 tracking-tighter leading-[1] preserve-3d"
            >
              The <span className="text-secondary">Sikander</span> <br />
              Arts Difference
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent blur-[1px]"
            />
          </div>
          <p className="text-gray-500 text-xl md:text-2xl mt-12 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            We don't just paint walls; we architect atmosphere through transparency, obsessive quality, and absolute reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 perspective-2000">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              whileHover={{
                y: -6,
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-12 rounded-[3.5rem] bg-white/[0.03]  border border-white/5 transition-colors duration-700 group cursor-default overflow-hidden text-center preserve-3d"
            >
              {/* Cinematic Glare Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative z-10 preserve-3d">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, }}
                  whileInView={{ opacity: 1, scale: 1, }}
                  transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-6xl font-black text-gray-800 mb-6 tracking-tighter drop-shadow-[0_10px_30px_rgba(249,115,22,0.4)] translate-z-30"
                >
                  {stat.value}
                </motion.div>
                <div
                  className="text-secondary font-bold uppercase tracking-[0.4em] text-[12px] md:text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-gray-800 transition-all duration-500 translate-z-10"
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