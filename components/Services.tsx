
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Palette, PaintBucket, Layers, Brush } from 'lucide-react';

const services = [
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Interior Painting',
    description: 'Flawless finishes for living rooms, kitchens, bedrooms, and more using low-VOC premium paints.',
    img: 'https://images.pexels.com/photos/35419462/pexels-photo-35419462.jpeg'
  },
  {
    icon: <PaintBucket className="w-8 h-8" />,
    title: 'Exterior Painting',
    description: 'Boost curb appeal and protect your home from the elements with weather-resistant exterior coatings.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Commercial Painting',
    description: 'Efficient, high-quality painting solutions for offices, retail spaces, and industrial facilities.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Color Consultation',
    description: 'Expert advice on color palettes, finishes, and trends to perfectly match your vision and style.',
    img: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Wallpaper Installation',
    description: 'Precision installation of patterns, textures, and murals to add character to any room.',
    img: 'https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: <Brush className="w-8 h-8" />,
    title: 'Cabinet Refinishing',
    description: 'Transform your kitchen or bathroom cabinets with a factory-like finish at a fraction of the replacement cost.',
    img: 'https://images.pexels.com/photos/6283960/pexels-photo-6283960.jpeg'
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#fbfbfb] text-grey-100 relative overflow-hidden">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="relative inline-block perspective-1000">
            <motion.h2
              initial={{ opacity: 0, rotateX: -30, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none"
            >
              PREMIUM <span className="text-secondary">FINISHES</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '120px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-1.5 bg-secondary mx-auto mb-10 shadow-[0_0_25px_rgba(249,115,22,1)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-gray-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            We don't just paint walls; we sculpt atmospheres. Our artisanal techniques
            deliver unmatched depth and cinematic durability.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 perspective-2000"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 150,
                  rotateX: 45,
                  scale: 0.8,
                  filter: 'blur(20px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 50,
                    delay: index * 0.2,
                    duration: 1.2
                  }
                }
              }}
              whileHover={{
                y: -25,
                rotateY: 8,
                rotateX: -8,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group relative h-full preserve-3d"
            >
              {/* Cinematic Shine/Glow Parent */}
              <div className="relative bg-white border border-white/5 rounded-[2.5rem] overflow-hidden h-full flex flex-col backdrop-blur-sm transition-all duration-500 group-hover:border-secondary/50 group-hover:shadow-[0_0_100px_rgba(249,115,22,0.2)] group-hover:translate-z-20 preserve-3d">

                {/* Moving Light Beam on Hover */}
                {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                  <motion.div
                    animate={{
                      x: ['-200%', '200%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1
                    }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-25"
                  />
                </div> */}

                {/* Service Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 scale-110 group-hover:scale-100 group-hover:rotate-1"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col">
                  <motion.h3
                    className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase group-hover:text-secondary transition-colors duration-300 translate-z-25"
                  >
                    {service.title}
                  </motion.h3>

                  <p className="text-gray-600 font-medium leading-relaxed mb-auto group-hover:text-gray-900 transition-colors duration-300 translate-z-10">
                    {service.description}
                  </p>

                  <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                    <button className="flex items-center gap-3 text-secondary font-black tracking-widest text-[10px] uppercase group/btn">
                      <span>Explore Finish</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center group-hover/btn:bg-secondary group-hover/btn:text-white transition-all duration-300"
                      >
                        <span className="text-lg">→</span>
                      </motion.div>
                    </button>

                    <span className="text-[10px] font-black text-white/5 uppercase tracking-[0.3em] group-hover:text-secondary/10 transition-colors">
                      Series 0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Laser Edge Interaction */}
                <div className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent to-secondary opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-1000 -translate-x-full pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
