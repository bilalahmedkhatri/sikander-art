import { responsiveImageProps } from '../utils/Images';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sana Sheikh',
    role: 'Homeowner, DHA Phase 6',
    content: "Sikander Art transformed our entire villa. The team was incredibly professional, punctual, and their attention to the base preparation was something I've never seen before. Truly Karachi's best.",
    image: '/images/testimonial-avatars/sana.png',
    sample: false
  },
  {
    id: 2,
    name: 'Ahmed Raza',
    role: 'CEO, Creative Labs',
    content: "We hired them for our commercial office revamp. They worked during the night shifts to ensure zero disruption to our operations. The finish on the feature walls is flawless.",
    image: '/images/testimonial-avatars/ahmed.png',
    sample: false
  },
  {
    id: 3,
    name: 'Fatima Zahra',
    role: 'Interior Designer',
    content: "As a designer, I am extremely demanding. Sikander Art is the only team I trust with my high-end projects. Their color matching and trim work are unparalleled in the city.",
    image: '/images/testimonial-avatars/fatima.png',
    sample: false
  },
  {
    id: 4,
    name: 'Usman Ali',
    role: 'Sample homeowner review',
    content: 'Ghar ki painting ke liye meri priority saaf finish aur waqt par kaam tha. Achi surface preparation aur furniture ki protection mere liye bohat aham hain.',
    image: '/images/testimonial-avatars/usman.png',
    sample: true
  },
  {
    id: 5,
    name: 'Ayesha Khan',
    role: 'Sample renovation review',
    content: 'Room ke colours choose karte waqt mujhe clear guidance chahiye thi. Estimate mein paint, labour aur extra charges alag hon to budget samajhna asaan hota hai.',
    image: '/images/testimonial-avatars/ayesha.png',
    sample: true
  },
  {
    id: 6,
    name: 'Hamza Ahmed',
    role: 'Sample office review',
    content: 'For an office repaint, I look for a clear schedule, careful protection of equipment, and an even finish. A detailed estimate helps me plan the work around office hours.',
    image: '/images/testimonial-avatars/hamza.png',
    sample: true
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { amount: 0.15 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;
    // Prepare the adjacent portraits before a slide change to avoid a blank avatar.
    const next = new Image();
    next.src = testimonials[(currentIndex + 1) % testimonials.length].image;
    const previous = new Image();
    previous.src = testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].image;
  }, [currentIndex, isVisible]);

  useEffect(() => {
    if (!isVisible || reducedMotion) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, isVisible, reducedMotion]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-32 bg-[#fbfbfb] overflow-hidden relative">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[180px] -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] -ml-72 -mb-72 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              className="text-4xl md:text-6xl font-serif font-black text-gray-800 leading-[1] mb-8 tracking-tighter preserve-3d"
            >
              Voices of <br />
              <span className="text-secondary drop-shadow-[0_10px_30px_rgba(249,115,22,0.3)]">Satisfaction</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-4 left-0 w-full origin-left h-1 bg-gradient-to-r from-secondary via-secondary/50 to-transparent rounded-full shadow-[0_0_30px_rgba(249,115,22,0.6)]"
            />
          </div>
          <p className="mt-8 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Avatars are AI-generated illustrations, not customer photographs.
            Cards marked “Sample review” are fictional examples, not customer feedback.
          </p>
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
              animate={{ x: isVisible && !reducedMotion ? "0%" : "-100%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="h-full bg-gradient-to-r from-transparent via-secondary to-secondary shadow-[0_0_40px_rgba(249,115,22,1)]"
            >
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-white blur-xl opacity-40"></div>
            </motion.div>
          </div>

          <div className="relative z-10 min-h-[600px] grid items-center pt-10">
            <AnimatePresence mode="sync" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 24 : -24,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -24 : 24,
                  scale: 0.98,
                }}
                transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center px-4 md:px-24 col-start-1 row-start-1"
              >
                {testimonials[currentIndex].sample && (
                  <p className="mb-6 text-sm font-semibold text-gray-600">Sample review · Fictional example</p>
                )}
                {/* Five Stars - High Fidelity Landing */}
                <div className="mb-16 flex justify-center gap-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                    >
                      <Star className="text-secondary fill-current w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="text-2xl md:text-4xl text-gray-600/90 italic font-serif leading-[1.1] mb-20 tracking-tighter px-4 preserve-3d"
                >
                  "{testimonials[currentIndex].content}"
                </motion.p>

                <div className="flex flex-col items-center preserve-3d">
                  <motion.div
                    className="relative mb-10"
                    whileHover={{ scale: 1.1, }}
                  >
                    <div className="absolute inset-0 bg-secondary rounded-full opacity-10"></div>
                    <div className="relative group/avatar">
                      <div className="absolute -inset-2 bg-gradient-to-tr from-secondary to-transparent rounded-full opacity-50"></div>
                      <img
                        {...responsiveImageProps(testimonials[currentIndex].image, { sizes: '(min-width: 768px) 224px, 160px', width: 320 })}
                        alt="AI-generated illustrative avatar"
                        width={320}
                        height={320}
                        className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white/10 shadow-[0_50px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-700"
                      />
                    </div>
                  </motion.div>
                  <motion.h4
                    className="text-4xl md:text-5xl font-black text-gray-700 uppercase tracking-tighter mb-4"
                  >
                    {testimonials[currentIndex].name}
                  </motion.h4>
                  <motion.p
                    className="text-secondary font-black text-xs md:text-sm uppercase tracking-[0.5em]"
                  >
                    {testimonials[currentIndex].role}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-16 mt-32">
            <motion.button
              whileHover={{ scale: 1.03, x: -24, }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="group relative p-10 rounded-full bg-white text-gray-700 overflow-hidden shadow-lg border border-gray-200 transition-colors duration-300"
              aria-label="Previous testimonial" transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-secondary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-productive" />
              <ChevronLeft className="relative z-10 w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, x: 24, }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="group relative p-10 rounded-full bg-white text-gray-700 overflow-hidden shadow-lg border border-gray-200 transition-colors duration-300"
              aria-label="Next testimonial" transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
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
