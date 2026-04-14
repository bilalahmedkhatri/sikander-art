import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, PaintRoller, Sparkles, Calendar } from 'lucide-react';

const steps = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Schedule Consultation',
    desc: 'Book a free on-site estimate. We listen to your needs and assess the space.'
  },
  {
    icon: <ClipboardList className="w-8 h-8" />,
    title: 'Detailed Proposal',
    desc: 'Receive a transparent quote detailing scope, materials, and timeline.'
  },
  {
    icon: <PaintRoller className="w-8 h-8" />,
    title: 'Execution & Prep',
    desc: 'We protect furniture, prep surfaces, and apply premium paint with precision.'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Final Walkthrough',
    desc: 'We inspect the work with you to ensure every detail meets your standards.'
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-32 bg-[#0a0a0a] overflow-hidden relative">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] -ml-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[180px] -mr-72 -mb-72 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-24 relative">
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
              className="text-5xl md:text-8xl font-serif font-black text-white leading-[1] mb-8 tracking-tighter preserve-3d"
            >
              Our Simple <br />
              <span className="text-secondary drop-shadow-[0_10px_30px_rgba(249,115,22,0.3)]">4-Step Process</span>
            </motion.h2>
          </div>
        </div>

        <motion.div
          className="relative perspective-3000"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting Line (Desktop) - Enhanced with Laser Glow */}
          <div className="hidden lg:block absolute top-[140px] left-[10%] right-[10%] h-[1px] bg-white/5 -z-0">
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="h-full bg-gradient-to-r from-transparent via-secondary to-transparent origin-left shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 100,
                    rotateX: 45,
                    rotateY: index % 2 === 0 ? -30 : 30,
                    z: -300,
                    scale: 0.8,
                    filter: "blur(20px)"
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      type: "spring",
                      damping: 18,
                      stiffness: 60,
                      delay: index * 0.2,
                    }
                  }
                }}
                whileHover={{
                  y: -25,
                  rotateY: index % 2 === 0 ? 15 : -15,
                  translateZ: 50,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(249, 115, 22, 0.3)",
                }}
                className="bg-white/[0.03] backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative group border border-white/5 transition-all duration-700 overflow-visible text-center preserve-3d"
              >
                {/* Internal Orbital Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                {/* Step Numbering - High Fidelity Shadow */}
                <div
                  className="absolute -top-6 -right-6 text-9xl font-serif font-black text-white/5 select-none pointer-events-none group-hover:text-secondary/[0.08] transition-all duration-1000 translate-z-10"
                >
                  0{index + 1}
                </div>

                <motion.div
                  initial={{ rotateY: 90, scale: 0 }}
                  whileInView={{ rotateY: 0, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 1, type: "spring" }}
                  className="relative w-28 h-28 bg-gradient-to-br from-secondary via-secondary/80 to-orange-700 text-white rounded-[2.5rem] flex items-center justify-center mb-10 mx-auto shadow-[0_20px_50px_-10px_rgba(249,115,22,0.4)] group-hover:scale-110 transition-transform duration-700 preserve-3d translate-z-40"
                >
                  <div className="absolute inset-0 bg-white opacity-20 blur-xl scale-75 group-hover:scale-125 transition-transform duration-1000"></div>
                  <div className="relative z-10 group-hover:rotate-[360deg] transition-transform duration-1000">
                    {step.icon}
                  </div>
                </motion.div>

                <h3
                  className="text-3xl font-black text-white mb-6 tracking-tighter group-hover:text-secondary transition-colors duration-500 translate-z-25"
                >
                  {step.title}
                </h3>
                <p
                  className="text-gray-400 leading-relaxed font-light text-lg mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500 translate-z-15"
                >
                  {step.desc}
                </p>

                {/* Progress Indicator Dots - Laser Enhanced */}
                {index < 3 && (
                  <div className="hidden lg:flex absolute top-[140px] -right-8 transform -translate-y-1/2 space-x-2 z-20">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(249,115,22,1)]"
                        style={{ opacity: 1 - (dot * 0.25) }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};