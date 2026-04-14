
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sana Sheikh',
    role: 'Homeowner, DHA Phase 6',
    content: "Sikander Art transformed our entire villa. The team was incredibly professional, punctual, and their attention to the base preparation was something I've never seen before. Truly Karachi's best.",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Ahmed Raza',
    role: 'CEO, Creative Labs',
    content: "We hired them for our commercial office revamp. They worked during the night shifts to ensure zero disruption to our operations. The finish on the feature walls is flawless.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Fatima Zahra',
    role: 'Interior Designer',
    content: "As a designer, I am extremely demanding. Sikander Art is the only team I trust with my high-end projects. Their color matching and trim work are unparalleled in the city.",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-[#0a0a0a] overflow-hidden relative">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[180px] -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] -ml-72 -mb-72 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
          </motion.div>
          <div className="relative inline-block perspective-2000">
            <motion.h2
              initial={{ opacity: 0, rotateX: 45, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                type: "spring",
                damping: 20,
                stiffness: 80
              }}
              className="text-6xl md:text-9xl font-serif font-black text-white leading-[1] mb-8 tracking-tighter preserve-3d"
            >
              Voices of <br />
              <span className="text-secondary drop-shadow-[0_10px_30px_rgba(249,115,22,0.3)]">Satisfaction</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
              className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-secondary via-secondary/50 to-transparent rounded-full shadow-[0_0_30px_rgba(249,115,22,0.6)]"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -top-32 left-0 text-white/5 -z-10 transform scale-[3] select-none opacity-20">
            <Quote size={200} />
          </div>

          {/* Laser Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 backdrop-blur-sm rounded-full overflow-hidden z-20 border border-white/10">
            <motion.div
              key={currentIndex}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="h-full bg-gradient-to-r from-transparent via-secondary to-secondary shadow-[0_0_40px_rgba(249,115,22,1)]"
            >
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-white blur-xl opacity-40"></div>
            </motion.div>
          </div>

          <div className="relative z-10 min-h-[600px] flex items-center justify-center pt-10 perspective-3000">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 300 : -300,
                  rotateY: direction > 0 ? 60 : -60,
                  z: -500,
                  scale: 0.8,
                  filter: "blur(15px)"
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  z: 0,
                  scale: 1,
                  filter: "blur(0px)"
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -300 : 300,
                  rotateY: direction > 0 ? -60 : 60,
                  z: -500,
                  scale: 0.8,
                  filter: "blur(15px)"
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-center px-4 md:px-24 will-change-transform preserve-3d"
              >
                {/* Five Stars - High Fidelity Landing */}
                <div className="mb-16 flex justify-center gap-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotateZ: -180, y: -50 }}
                      animate={{ scale: 1, rotateZ: 0, y: 0 }}
                      transition={{
                        delay: i * 0.1 + 0.5,
                        type: "spring",
                        damping: 12,
                        stiffness: 200
                      }}
                    >
                      <Star className="text-secondary fill-current w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 40, rotateX: 20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-3xl md:text-7xl text-white/90 italic font-serif leading-[1.1] mb-20 tracking-tighter px-4 preserve-3d"
                  style={{ textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                >
                  "{testimonials[currentIndex].content}"
                </motion.p>

                <div className="flex flex-col items-center preserve-3d">
                  <motion.div
                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring", damping: 15 }}
                    className="relative mb-10"
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                  >
                    <div className="absolute inset-0 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative group/avatar">
                      <div className="absolute -inset-2 bg-gradient-to-tr from-secondary to-transparent rounded-full animate-spin-slow opacity-50"></div>
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white/10 shadow-[0_50px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-700"
                      />
                    </div>
                  </motion.div>
                  <motion.h4
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4"
                  >
                    {testimonials[currentIndex].name}
                  </motion.h4>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-secondary font-black text-xs md:text-sm uppercase tracking-[0.6em]"
                  >
                    {testimonials[currentIndex].role}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-16 mt-32">
            <motion.button
              whileHover={{ scale: 1.15, rotateY: -25, x: -15, translateZ: 50 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="group relative p-10 rounded-full bg-white/5 text-white overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl transition-all duration-500 preserve-3d"
              aria-label="Previous testimonial"
            >
              <div className="absolute inset-0 bg-secondary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-productive" />
              <ChevronLeft className="relative z-10 w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15, rotateY: 25, x: 15, translateZ: 50 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="group relative p-10 rounded-full bg-white/5 text-white overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl transition-all duration-500 preserve-3d"
              aria-label="Next testimonial"
            >
              <div className="absolute inset-0 bg-secondary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-productive" />
              <ChevronRight className="relative z-10 w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
