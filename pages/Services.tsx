import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PaintBucket, Building2, Palette, Droplets, Brush, Hammer, Factory, Layers, PenTool, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    icon: <PaintBucket className="w-8 h-8" />,
    title: 'Interior Wall Painting',
    description: 'Professional interior painting for homes and offices. Wall preparation, crack filling, putty work, priming, and two-coat premium finish using Berger, Dulux, or Nippon paints.',
    image: 'https://images.pexels.com/photos/6283973/pexels-photo-6283973.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    icon: <Building2 className="w-8 h-8" />,
    title: 'Exterior Building Painting',
    description: 'Weather-resistant painting for homes and commercial buildings. Anti-fungal treatment, sealing, and UV-protective topcoat for long-lasting results.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    icon: <Palette className="w-8 h-8" />,
    title: 'Texture & Decorative Painting',
    description: 'Rough texture, smooth texture, sand texture, Venetian plaster, and 3D wall effects for a premium designer look.',
    image: 'https://images.pexels.com/photos/8210463/pexels-photo-8210463.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    icon: <Droplets className="w-8 h-8" />,
    title: 'Waterproofing Services',
    description: 'Roof, bathroom, and basement waterproofing using chemical and membrane-based solutions. Permanent leakage prevention.',
    image: 'https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    icon: <Brush className="w-8 h-8" />,
    title: 'Wood Painting & Polish',
    description: 'Door painting, furniture polish, lacquer finishing, and wood staining for all wooden surfaces.',
    image: 'https://images.pexels.com/photos/34277666/pexels-photo-34277666.jpeg'
  },
  {
    id: 6,
    icon: <Hammer className="w-8 h-8" />,
    title: 'Steel & Metal Painting',
    description: 'Anti-rust primer and topcoat for gates, grills, railings, and all metal structures.',
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 7,
    icon: <Factory className="w-8 h-8" />,
    title: 'Commercial & Industrial Painting',
    description: 'Large-scale painting for factories, warehouses, plazas, hospitals, and commercial buildings.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 8,
    icon: <Layers className="w-8 h-8" />,
    title: 'Epoxy Floor Coating',
    description: 'Industrial-grade epoxy flooring for garages, warehouses, and commercial kitchens.',
    image: 'https://images.pexels.com/photos/7031614/pexels-photo-7031614.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 9,
    icon: <PenTool className="w-8 h-8" />,
    title: 'Stucco & Plaster Work',
    description: 'Traditional and modern stucco finishing for walls and ceilings.',
    image: 'https://images.pexels.com/photos/6207819/pexels-photo-6207819.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 10,
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Free Color Consultation',
    description: 'Expert visits your property to help choose perfect colors and finishes.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
  }
];

const Services: React.FC = () => {
  return (
    <>
      <SEO
        title="Painting Services in Karachi | Interior, Exterior, Texture, Waterproofing – Sikander Arts"
        description="Expert painting services in Karachi – interior wall painting, exterior building painting, texture work, waterproofing, wood polish, epoxy flooring & more. Trusted by 1000+ clients. Call Sikander Arts today for a free quote."
        keywords="painting services Karachi, interior painting Karachi, exterior painting Karachi, texture painting Karachi, waterproofing Karachi, wood polish Karachi, epoxy flooring Karachi, painting contractor Karachi, wall painting Karachi"
        url="https://sikanderart.com/services"
      />

      <div className="bg-[#050505] min-h-screen text-white relative overflow-hidden">
        {/* Cinematic Background Lighting */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-transparent">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-2 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-black tracking-[0.5em] uppercase">
                Artisanal Expertise
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, rotateX: -30, y: 30 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-none"
            >
              CRAFTING <span className="text-secondary italic">PERFECTION</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Elevating Karachi's architecture through cinematic finishes and master-class painting solutions. 
              We don't just paint; we sculpt atmospheres.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 perspective-2000">
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 150, rotateX: 45, scale: 0.8, filter: 'blur(20px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    type: "spring",
                    damping: 20,
                    stiffness: 50,
                    delay: index * 0.15,
                    duration: 1.2
                  }}
                  whileHover={{ 
                    y: -20, 
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.05,
                    zIndex: 20,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                  }}
                  className="group relative flex flex-col h-full bg-[#0d0d0d] rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-secondary/40 hover:shadow-[0_40px_100px_rgba(249,115,22,0.15)] preserve-3d"
                >
                  {/* Moving Light Beam on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10">
                    <motion.div 
                      animate={{ 
                        x: ['-200%', '200%'],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatDelay: 1
                      }}
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-25"
                    />
                  </div>

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-90" />
                    
                    {/* Icon badge over image - Cinematic Pop */}
                    <div className="absolute -bottom-6 right-10 z-20">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-[0_20px_40px_rgba(249,115,22,0.4)] relative overflow-hidden group/icon"
                      >
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/icon:translate-x-full transition-transform duration-700" />
                        {service.icon}
                      </motion.div>
                    </div>
                    
                    {/* ID badge */}
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase">
                      Finish 0{service.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 pt-16 flex-grow flex flex-col">
                    <h3 className="text-2xl font-black text-white mb-5 uppercase tracking-tighter group-hover:text-secondary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 font-medium leading-relaxed mb-auto group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                      <Link to="/contact" className="flex items-center gap-3 text-secondary font-black tracking-[0.3em] text-[10px] uppercase group/btn">
                        <span>Initiate Project</span>
                        <motion.div 
                          whileHover={{ x: 5 }}
                          className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center group-hover/btn:bg-secondary group-hover/btn:text-white transition-all duration-300"
                        >
                          <span className="text-lg">→</span>
                        </motion.div>
                      </Link>
                    </div>
                  </div>

                  {/* Laser Edge Interaction */}
                  <div className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent to-secondary opacity-0 group-hover:opacity-100 group-hover:left-full transition-all duration-1500 -translate-x-full pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-br from-[#111] to-[#050505] p-20 border border-white/5 relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              {/* Background Glow */}
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full group-hover:bg-secondary/20 transition-all duration-700" />
              
              <div className="relative z-10 space-y-10">
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  TRANSFORM YOUR <br /> <span className="text-secondary italic">PERSPECTIVE</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                  Join the elite clients in Karachi who trust Sikander Arts for 
                  unmatched cinematic finishes.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-secondary text-white px-12 py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-xs shadow-[0_30px_60px_rgba(249,115,22,0.3)] hover:shadow-secondary/50 transition-all"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                  <Link to="/calculate-cost">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/5 text-white border border-white/10 px-12 py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-xs transition-all backdrop-blur-xl hover:bg-white/10"
                    >
                      Price Guide
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;