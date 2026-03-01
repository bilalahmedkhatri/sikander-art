
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowRight, Paintbrush } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, cat: 'Interior', img: 'https://images.pexels.com/photos/6283973/pexels-photo-6283973.jpeg', title: 'DHA Phase 8 Villa' },
  { id: 2, cat: 'Exterior', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', title: 'Clifton Modern Facade' },
  { id: 3, cat: 'Commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop', title: 'I.I. Chundrigar Office' },
  { id: 4, cat: 'Interior', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop', title: 'Gulshan Minimalist Den' },
  { id: 5, cat: 'Kitchen', img: 'https://images.pexels.com/photos/35443238/pexels-photo-35443238.png', title: 'Cabinet Restoration' },
  { id: 6, cat: 'Detail', img: 'https://images.pexels.com/photos/8210463/pexels-photo-8210463.jpeg', title: 'Gold Leaf Trim Detail' },
];

const transformations = [
  {
    id: 1,
    title: 'Bahria Town Exterior',
    description: 'We revitalized this fading exterior with a complete power wash, crack repairs, and weather-resistant premium paint.',
    before: 'https://images.pexels.com/photos/11384223/pexels-photo-11384223.jpeg',
    after: 'https://images.pexels.com/photos/2681639/pexels-photo-2681639.jpeg'
  },
  {
    id: 2,
    title: 'PECHS Apartment Shift',
    description: 'Complete interior color shift from dated beige to a modern, crisp white palette, enhancing natural light.',
    before: 'https://images.pexels.com/photos/3562689/pexels-photo-3562689.jpeg',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop'
  }
];

export const Gallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-32 bg-slate-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-secondary font-black uppercase tracking-[0.4em] text-sm block mb-4"
            >
              OUR PORTFOLIO
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-serif font-black text-primary leading-[1]"
            >
              Recent Masterpieces
            </motion.h2>
          </div>
          <Link
            to="/portfolio"
            className="hidden md:flex items-center gap-3 text-secondary font-black uppercase tracking-widest text-sm hover:text-orange-700 transition-all mt-4 md:mt-0"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              Full Portfolio <Paintbrush size={18} />
            </motion.div>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08, duration: 0.4, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[2.5rem] cursor-pointer shadow-2xl bg-white aspect-[4/5] will-change-transform hover:-translate-y-3 transition-transform duration-300"
              onClick={() => setSelectedId(project.id)}
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <span className="text-secondary text-xs font-black uppercase tracking-[0.2em] mb-2">{project.cat}</span>
                <h3 className="text-white text-3xl font-serif font-bold tracking-tighter leading-none">{project.title}</h3>
                <div className="absolute top-8 right-8 bg-white/20 p-4 rounded-2xl backdrop-blur-xl border border-white/30 transform group-hover:scale-110 transition-transform">
                  <ZoomIn className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transformations */}
        <div className="mt-32">
          <div className="text-center mb-20">
            <span className="text-secondary font-black uppercase tracking-[0.3em] text-sm">REAL TRANSFORMATIONS</span>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-primary mt-4">Before & After</h2>
          </div>

          <div className="space-y-20">
            {transformations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100"
              >
                <div className="grid md:grid-cols-2 relative h-[500px]">
                  <div className="relative group overflow-hidden">
                    <div className="absolute top-8 left-8 z-10 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-6 py-2 rounded-full tracking-[0.3em]">BEFORE</div>
                    <img src={item.before} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Before" />
                  </div>
                  <div className="relative group overflow-hidden">
                    <div className="absolute top-8 left-8 z-10 bg-secondary text-white text-[10px] font-black px-6 py-2 rounded-full tracking-[0.3em] shadow-xl">AFTER</div>
                    <img src={item.after} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="After" />
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex w-20 h-20 bg-white rounded-full items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-primary transform hover:scale-110 transition-all duration-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>
                <div className="p-12 text-center md:text-left bg-gradient-to-r from-white to-slate-50">
                  <h3 className="text-3xl font-serif font-black text-primary mb-4 tracking-tighter">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-medium">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-2xl"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white rounded-[3rem] overflow-hidden max-w-6xl w-full relative shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-8 right-8 z-10 bg-black/10 hover:bg-black/20 p-4 rounded-full transition-all"
                  onClick={() => setSelectedId(null)}
                >
                  <X className="text-primary w-8 h-8" />
                </button>

                {(() => {
                  const project = projects.find((p) => p.id === selectedId);
                  return project ? (
                    <>
                      <div className="md:w-2/3 h-full">
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="md:w-1/3 p-12 flex flex-col justify-center">
                        <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4">{project.cat}</span>
                        <h3 className="text-5xl font-serif font-black text-primary mb-8 leading-none tracking-tighter">{project.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
                          Our team delivered a premium finish for this {project.cat} project in Karachi, using top-tier materials and precision tools.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedId(null);
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-secondary text-white py-5 px-10 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-orange-600 transition-colors"
                        >
                          Get Free Estimate
                        </motion.button>
                      </div>
                    </>
                  ) : null;
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
