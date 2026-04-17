
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Users, Clock, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const imgScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  const imgRotate = useTransform(scrollYProgress, [0.1, 0.4], [10, 0]);

  return (
    <section id="about" className="py-32 md:py-48 bg-[#fbfbfb] text-gray-900 overflow-hidden perspective-2000">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-24 md:gap-32">

          {/* Image Side - 3D Cinematic */}
          <motion.div
            style={{
              scale: imgScale,
              rotateY: imgRotate,
            }}
            className="w-full lg:w-1/2 relative will-change-transform preserve-3d"
          >
            <motion.div
              initial={{ rotateY: -30, opacity: 0, x: -100 }}
              whileInView={{ rotateY: 0, opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, type: "spring", damping: 25 }}
              className="relative rounded-[5rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] group preserve-3d border border-white/5"
            >
              <img
                src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1200&auto=format&fit=crop"
                alt="Our Painting Team"
                className="w-full h-[750px] object-cover transition-transform duration-[3s] group-hover:scale-110 group-hover:rotate-1 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 via-transparent to-white/5 mix-blend-overlay"></div>

              {/* Overlay Glass Layer */}
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all duration-1000"></div>
            </motion.div>

            {/* Experience Badge - High Fidelity 3D Glass */}
            <motion.div
              initial={{ x: 100, y: 100, opacity: 0, rotateZ: 20 }}
              whileInView={{ x: 0, y: 0, opacity: 1, rotateZ: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1.5, type: "spring", damping: 12 }}
              className="absolute -bottom-16 -right-8 md:-right-20 bg-white/5 backdrop-blur-[40px] p-14 rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] border border-white/10 z-20 group preserve-3d hover:translate-z-20 transition-transform"
            >
              <div className="absolute inset-0 bg-secondary/5 rounded-[4rem] blur-2xl group-hover:bg-secondary/10 transition-colors"></div>
              <div className="flex items-center gap-10 relative">
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotateY: [0, 20, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-secondary p-8 rounded-[2rem] text-white shadow-[0_20px_40px_rgba(249,115,22,0.4)]"
                >
                  <Award className="w-14 h-14" />
                </motion.div>
                <div>
                  <p className="text-7xl md:text-8xl font-black text-gray-800 leading-none tracking-tighter drop-shadow-2xl">15+</p>
                  <p className="text-gray-900 text-[14px] font-black uppercase tracking-[0.2em] mt-5 whitespace-nowrap">Years of Mastery</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 preserve-3d">
            <motion.h2
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="text-4xl md:text-6xl font-serif font-black text-gray-900 leading-[0.85] mb-12 tracking-tighter"
            >
              PAINTING <span className="text-secondary italic">KARACHI'S</span> VISION SINCE '08
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-gray-500 text-xl md:text-2xl mb-16 leading-relaxed font-medium italic opacity-80"
            >
              At <Link to="https://sikanderart.com/" className="font-black text-secondary">Sikander Art</Link>, we redefine architecture through the lens of color. Our heritage is built on a decade of precision, merging traditional Pakistani craft with cutting-edge cinematic finishes.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 mb-20">
              {[
                { icon: ShieldCheck, title: "Premium Assurance", desc: "Complete peace of mind for luxury properties." },
                { icon: Target, title: "Artisanal Focus", desc: "Obsessive attention to the finest details." },
                { icon: Users, title: "Master Collective", desc: "Elite painters trained in high-fidelity techniques." },
                { icon: Heart, title: "Client Intimacy", desc: "Your unique vision is our singular metric." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateY: 30 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1, type: "spring" }}
                  className="group relative preserve-3d hover:translate-z-10 transition-all duration-500"
                >
                  <div className="flex items-center gap-6 text-gra-700 font-black uppercase tracking-[0.3em] text-[12px] mb-4">
                    <div className="p-5 bg-white/5 rounded-2xl group-hover:bg-secondary group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-500">
                      <item.icon size={28} className="text-secondary group-hover:text-white" />
                    </div>
                    <span className="group-hover:text-secondary transition-colors">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 font-bold ml-1 opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-10 items-center"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, translateZ: 20 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-white px-12 py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_60px_-15px_rgba(249,115,22,0.4)] inline-flex items-center gap-5 transition-all border border-white/10"
              >
                Start Your Masterwork <Target size={20} />
              </motion.a>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
