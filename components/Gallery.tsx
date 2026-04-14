
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
    <section id="gallery" className="py-32 bg-[#0a0a0a] text-white overflow-hidden perspective-3000">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 relative z-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.1em', x: -30 }}
              whileInView={{ opacity: 1, letterSpacing: '0.5em', x: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-black uppercase tracking-[0.5em] text-xs block mb-6 px-1"
            >
              OUR ARTISANAL PORTFOLIO
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, rotateX: 90, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="text-5xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter"
              >
                CINEMATIC <br/> FINISHES
              </motion.h2>
            </div>
          </div>
          <Link
            to="/portfolio"
            className="hidden md:flex items-center gap-6 text-secondary font-black uppercase tracking-[0.3em] text-[10px] group transition-all mt-8 md:mt-0"
          >
            <motion.div 
              whileHover={{ scale: 1.05, x: 10 }} 
              className="flex items-center gap-4 border border-secondary/30 px-8 py-4 rounded-full backdrop-blur-xl group-hover:bg-secondary group-hover:text-white transition-all duration-500"
            >
              Full Showcase <Paintbrush size={16} className="group-hover:rotate-45 transition-transform" />
            </motion.div>
          </Link>
        </div>

        {/* Main Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 200,
                  rotateX: 90, // Vertical flip entrance
                  scale: 0.8,
                  z: -600
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  z: 0,
                  transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 35,
                    delay: idx * 0.1,
                  }
                }
              }}
              whileHover={{ 
                y: -30, 
                rotateY: idx % 2 === 0 ? 12 : -12,
                rotateX: -7,
                scale: 1.04,
                translateZ: 150,
                transition: { type: "spring", stiffness: 300, damping: 30 } 
              }}
              className="group relative overflow-hidden rounded-[4rem] cursor-pointer bg-[#111] aspect-[4/5] will-change-transform border border-white/10 transform-style-3d shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
              onClick={() => setSelectedId(project.id)}
            >
              {/* Animated Border Glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <motion.img
                initial={{ scale: 1.3 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 opacity-80 group-hover:opacity-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70 duration-700" />

              <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="group-hover:translate-z-20 transition-transform duration-500"
                >
                  <span className="text-secondary text-[10px] font-black uppercase tracking-[0.5em] mb-4 block px-1 border-l-2 border-secondary/50 pl-4">{project.cat}</span>
                  <h3 className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-none mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">{project.title}</h3>
                  
                  <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-white transition-all">
                    <span>View Detail</span>
                    <ArrowRight size={16} className="group-hover:translate-x-4 transition-transform duration-500" />
                  </div>
                </motion.div>
                
                {/* Floating Glass Icon */}
                <div className="absolute top-12 right-12 w-16 h-16 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-12 translate-z-40 transition-all duration-700 shadow-2xl">
                  <ZoomIn className="text-white w-8 h-8" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Transformations */}
        <div className="mt-60">
          <div className="text-center mb-32">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
              className="text-secondary font-black uppercase text-xs block mb-8"
            >
              ALCHEMY OF SPACE
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ opacity: 0, rotateX: -90 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.85]"
              >
                THE VOID <br/> TO COLOR
              </motion.h2>
            </div>
          </div>

          <div className="space-y-60">
            {transformations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 150, rotateX: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 40, damping: 20 }}
                className="bg-[#111] rounded-[5rem] overflow-hidden border border-white/5 group perspective-3000 shadow-2xl"
              >
                <div className="grid md:grid-cols-2 relative h-[500px] md:h-[700px] overflow-hidden">
                  <div className="relative overflow-hidden group/before border-r border-white/5">
                    <div className="absolute top-12 left-12 z-20 bg-black/80 backdrop-blur-2xl text-white text-[10px] font-black px-10 py-4 rounded-full tracking-[0.5em] shadow-2xl border border-white/10">BEFORE</div>
                    <motion.img 
                      initial={{ scale: 1.4 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 2.5 }}
                      src={item.before} 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-80" 
                      alt="Before" 
                    />
                  </div>
                  <div className="relative overflow-hidden group/after">
                    <div className="absolute top-12 left-12 z-20 bg-secondary text-white text-[10px] font-black px-10 py-4 rounded-full tracking-[0.5em] shadow-2xl shadow-secondary/20">AFTER</div>
                    <motion.img 
                      initial={{ scale: 1.4 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 2.5, delay: 0.2 }}
                      src={item.after} 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                      alt="After" 
                    />
                  </div>
                  
                  {/* Floating Controller UI */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-3xl px-8 py-8 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-style-3d transition-transform hover:scale-105 duration-500">
                    <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl rotate-y-12 animate-pulse">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                    <div className="text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 mb-1">Shift</p>
                      <p className="font-black text-xl italic tracking-tighter">Perspective</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-16 md:p-24 bg-gradient-to-br from-[#111] to-[#0a0a0a] relative overflow-hidden group-hover:bg-[#151515] transition-colors duration-700">
                  <div className="absolute -right-20 -bottom-20 text-white/[0.02] font-black text-[15rem] md:text-[25rem] -z-10 select-none pointer-events-none">
                    0{index + 1}
                  </div>
                  <div className="relative z-10 max-w-4xl">
                    <motion.h3 
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-400 leading-relaxed text-xl md:text-2xl font-medium border-l-4 border-secondary/40 pl-10 italic"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-3xl"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                layoutId={`gallery-${selectedId}`}
                className="bg-[#111] border border-white/10 rounded-[5rem] overflow-hidden max-w-7xl w-full relative shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row h-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, rotateX: 45, opacity: 0 }}
                animate={{ scale: 1, rotateX: 0, opacity: 1 }}
                exit={{ scale: 0.8, rotateX: 45, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
              >
                <button
                  className="absolute top-10 right-10 z-50 bg-white/5 hover:bg-secondary p-5 rounded-full transition-all group border border-white/10 shadow-2xl"
                  onClick={() => setSelectedId(null)}
                  title="Close Gallery"
                >
                  <X className="text-white w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                </button>

                {(() => {
                  const project = projects.find((p) => p.id === selectedId);
                  return project ? (
                    <>
                      <div className="lg:w-2/3 h-full relative overflow-hidden">
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"></div>
                      </div>
                      <div className="lg:w-1/3 p-16 flex flex-col justify-center bg-[#111] relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full"></div>
                        
                        <motion.span 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-secondary font-black uppercase tracking-[0.5em] text-xs mb-8 block px-1 border-l-2 border-secondary/50 pl-4"
                        >
                          {project.cat}
                        </motion.span>
                        <motion.h3 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-5xl md:text-6xl font-black text-white mb-10 leading-[0.9] tracking-tighter"
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-gray-400 text-xl leading-relaxed mb-12 font-medium italic"
                        >
                          Our team delivered a peerless finish for this {project.cat} project in Karachi, redefining luxury through artisanal precision.
                        </motion.p>
                        
                        <motion.button
                          whileHover={{ scale: 1.05, translateZ: 20 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          onClick={() => {
                            setSelectedId(null);
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-secondary text-white py-6 px-12 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:shadow-secondary/50 transition-all border border-white/10"
                        >
                          Request Consultation
                        </motion.button>
                        
                        <div className="mt-12 pt-12 border-t border-white/5 flex items-center gap-4 text-[10px] font-black text-white/20 uppercase tracking-[.4em]">
                           <span>Masterwork Series</span>
                           <span className="w-8 h-[1px] bg-white/10"></span>
                           <span>Ref. 0{project.id}</span>
                        </div>
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
