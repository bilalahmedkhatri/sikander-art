
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Palette, PaintBucket, Layers, Brush } from 'lucide-react';

const services = [
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Interior Painting',
    description: 'Flawless finishes for living rooms, kitchens, bedrooms, and more using low-VOC premium paints.',
    img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80'
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
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop'
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            className="text-secondary font-black uppercase text-sm block mb-4"
          >
            OUR EXPERTISE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-4xl md:text-6xl font-serif font-black text-primary mt-2 mb-8"
          >
            Professional Painting Services
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            className="h-1 bg-secondary mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed font-medium"
          >
            We combine artisanal craftsmanship with modern techniques to deliver superior results for every project type in Karachi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -15 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 card-3d-hover"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-2xl group-hover:bg-secondary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
                  {service.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tighter">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{service.description}</p>
                <motion.a 
                  href="#contact" 
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center mt-8 text-secondary font-black uppercase tracking-widest text-xs hover:text-orange-700 transition-colors"
                >
                  Learn More <span className="ml-2 text-xl">&rarr;</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
