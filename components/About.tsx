
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Users, Clock, Target, Heart } from 'lucide-react';

export const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Image Side */}
          <motion.div 
            style={{ scale }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] group">
              <img 
                src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1200&auto=format&fit=crop" 
                alt="Our Painting Team" 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
            
            {/* Floating Experience Badge */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-6 md:-right-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-[320px] backdrop-blur-md bg-white/90"
            >
              <div className="flex items-center gap-6">
                <div className="bg-secondary p-5 rounded-2xl text-white shadow-xl animate-bounce-slow">
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-5xl font-black text-primary leading-none">15+</p>
                  <p className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mt-2">Years of Excellence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-secondary font-black uppercase tracking-[0.4em] text-sm mb-6"
            >
              OUR STORY
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-serif font-black text-primary mt-2 mb-10 leading-[1] tracking-tighter"
            >
              COLORING <span className="text-secondary italic">KARACHI</span> SINCE 2008
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-xl mb-10 leading-relaxed font-medium"
            >
              At <strong className="text-primary">Sikander Art</strong>, we believe every wall is a masterpiece waiting to happen. Our mission is to combine the heritage of Pakistani craftsmanship with modern, eco-friendly materials to deliver stunning results that last.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { icon: ShieldCheck, title: "Licensed & Insured", desc: "Complete peace of mind for your property." },
                { icon: Target, title: "Precision Driven", desc: "Laser-focused on the smallest details." },
                { icon: Users, title: "Master Painters", desc: "Expert artisans trained in modern techniques." },
                { icon: Heart, title: "Client First", desc: "Your satisfaction is our primary metric." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-4 group"
                >
                  <div className="flex items-center gap-4 text-primary font-black uppercase tracking-widest text-xs">
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                      <item.icon size={20} />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium ml-1">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 flex flex-wrap gap-6"
            >
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(30,58,138,0.2)" }}
                className="bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl inline-flex items-center gap-3 transition-all"
              >
                Let's Talk Colors <Target size={18} />
              </motion.a>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-4">
                   {[1,2,3].map(i => (
                     <img key={i} className="w-12 h-12 rounded-full border-4 border-white object-cover" src={`https://i.pravatar.cc/150?u=${i}`} alt="Client" />
                   ))}
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">1k+ Happy Clients</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
