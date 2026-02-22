
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
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary font-black uppercase tracking-[0.4em] text-sm block mb-4"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-serif font-black text-primary leading-[1]"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute -top-20 left-0 text-slate-100/50 -z-10 transform scale-[2.5] select-none">
            <Quote size={200} />
          </div>
          
          <div className="relative z-10 min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="text-center px-4 md:px-20"
              >
                <div className="mb-10 flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="text-secondary fill-current w-8 h-8" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-2xl md:text-4xl text-gray-800 italic font-serif leading-[1.4] mb-12 tracking-tight">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-secondary rounded-full blur-md opacity-30 animate-pulse"></div>
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                  </div>
                  <h4 className="text-2xl font-black text-primary uppercase tracking-tighter">{testimonials[currentIndex].name}</h4>
                  <p className="text-secondary font-black text-xs uppercase tracking-[0.2em] mt-1">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-8 mt-16">
            <motion.button 
              whileHover={{ scale: 1.2, x: -5 }}
              whileTap={{ scale: 0.8 }}
              onClick={handlePrev}
              className="p-5 rounded-2xl bg-slate-50 text-primary hover:bg-secondary hover:text-white transition-all shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={28} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.2, x: 5 }}
              whileTap={{ scale: 0.8 }}
              onClick={handleNext}
              className="p-5 rounded-2xl bg-slate-50 text-primary hover:bg-secondary hover:text-white transition-all shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight size={28} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
