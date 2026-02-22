import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PaintBucket, Building2, Palette, Droplets, Brush, Hammer, Factory, Layers, PenTool, CheckCircle } from 'lucide-react';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    icon: <PaintBucket className="w-10 h-10" />,
    title: 'Interior Wall Painting',
    description: 'Professional interior painting for homes and offices. Wall preparation, crack filling, putty work, priming, and two-coat premium finish using Berger, Dulux, or Nippon paints.'
  },
  {
    id: 2,
    icon: <Building2 className="w-10 h-10" />,
    title: 'Exterior Building Painting',
    description: 'Weather-resistant painting for homes and commercial buildings. Anti-fungal treatment, sealing, and UV-protective topcoat for long-lasting results.'
  },
  {
    id: 3,
    icon: <Palette className="w-10 h-10" />,
    title: 'Texture & Decorative Painting',
    description: 'Rough texture, smooth texture, sand texture, Venetian plaster, and 3D wall effects for a premium designer look.'
  },
  {
    id: 4,
    icon: <Droplets className="w-10 h-10" />,
    title: 'Waterproofing Services',
    description: 'Roof, bathroom, and basement waterproofing using chemical and membrane-based solutions. Permanent leakage prevention.'
  },
  {
    id: 5,
    icon: <Brush className="w-10 h-10" />,
    title: 'Wood Painting & Polish',
    description: 'Door painting, furniture polish, lacquer finishing, and wood staining for all wooden surfaces.'
  },
  {
    id: 6,
    icon: <Hammer className="w-10 h-10" />,
    title: 'Steel & Metal Painting',
    description: 'Anti-rust primer and topcoat for gates, grills, railings, and all metal structures.'
  },
  {
    id: 7,
    icon: <Factory className="w-10 h-10" />,
    title: 'Commercial & Industrial Painting',
    description: 'Large-scale painting for factories, warehouses, plazas, hospitals, and commercial buildings.'
  },
  {
    id: 8,
    icon: <Layers className="w-10 h-10" />,
    title: 'Epoxy Floor Coating',
    description: 'Industrial-grade epoxy flooring for garages, warehouses, and commercial kitchens.'
  },
  {
    id: 9,
    icon: <PenTool className="w-10 h-10" />,
    title: 'Stucco & Plaster Work',
    description: 'Traditional and modern stucco finishing for walls and ceilings.'
  },
  {
    id: 10,
    icon: <CheckCircle className="w-10 h-10" />,
    title: 'Free Color Consultation',
    description: 'Expert visits your property to help choose perfect colors and finishes.'
  }
];

const Services: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Painting Services in Karachi | Sikander Arts</title>
        <meta name="description" content="Expert painting services in Karachi – interior, exterior, texture, waterproofing & more. Sikander Arts." />
      </Helmet>

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary/20 z-0"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-black mb-6 tracking-tighter"
            >
              Our Professional <br /> <span className="text-secondary">Painting Services</span> in Karachi
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Karachi's trusted painting contractor delivering premium quality painting and finishing services for residential, commercial, and industrial properties.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                  className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 group transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 tracking-tight">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
                  Contact Sikander Arts today for a free site visit and quote.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-secondary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:bg-orange-600 transition-colors"
                  >
                    Get a Free Quote
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
