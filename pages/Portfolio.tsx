import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { X, ArrowRight, MapPin, Calendar, Layers, Star } from 'lucide-react';

interface PortfolioProject {
  id: number;
  title: string;
  location: string;
  services: string[];
  year: number;
  description: string;
  image: string;
  featured?: boolean;
}

interface StatItem {
  id: number;
  number: string;
  label: string;
}

const featuredProject: PortfolioProject = {
  id: 0,
  title: "Luxury Villa Complete Painting – DHA Phase 6, Karachi",
  location: "DHA Phase 6, Karachi",
  services: ["Interior Painting", "Exterior Painting", "Wood Polish", "Texture Work"],
  year: 2024,
  description: "A complete top-to-bottom painting transformation of a 500-yard luxury villa in DHA Phase 6. Full interior and exterior painting, premium wood polish on all doors and cabinets, and custom texture work in lounge and master bedroom — completed in 12 days.",
  image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1200&q=80",
  featured: true
};

const portfolioProjects: PortfolioProject[] = [
  { id: 1, title: "Complete Interior Renovation Painting", location: "Gulshan-e-Iqbal, Karachi", services: ["Interior Painting", "Putty Work", "Priming"], year: 2024, description: "Full interior painting of a 3-bedroom apartment with premium two-coat finish.", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80" },
  { id: 2, title: "Exterior Waterproof Painting", location: "North Nazimabad, Karachi", services: ["Exterior Painting", "Waterproofing"], year: 2024, description: "6-storey building exterior with weather-resistant paint and full roof waterproofing.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
  { id: 3, title: "Texture Feature Wall – Lounge", location: "Clifton, Karachi", services: ["Decorative Texture Work"], year: 2023, description: "Custom Venetian plaster texture on main lounge feature wall with elegant finish.", image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80" },
  { id: 4, title: "Factory Floor Epoxy Coating", location: "Korangi Industrial Area, Karachi", services: ["Epoxy Floor Coating"], year: 2024, description: "Industrial epoxy flooring across 8,000 sq ft factory floor. Seamless and chemical-resistant.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
  { id: 5, title: "Villa Exterior & Gate Painting", location: "Bahria Town Karachi", services: ["Exterior Painting", "Metal Gate Painting"], year: 2023, description: "Full exterior repaint with anti-rust treatment on iron gates and boundary grills.", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80" },
  { id: 6, title: "Office Interior Painting", location: "PECHS, Karachi", services: ["Interior Painting", "Ceiling Work"], year: 2024, description: "Complete interior of a 3,500 sq ft corporate office with clean professional tones.", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80" },
  { id: 7, title: "Bathroom Waterproofing", location: "DHA, Karachi", services: ["Bathroom Waterproofing"], year: 2023, description: "Complete membrane-based waterproofing for 3 bathrooms in a DHA bungalow.", image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&q=80" },
  { id: 8, title: "Complete Wood Polish – Villa Doors", location: "Scheme 33, Karachi", services: ["Wood Polish", "Lacquer Finish"], year: 2024, description: "All wooden doors and cabinets polished with premium lacquer. Rich grain finish.", image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80" },
  { id: 9, title: "Commercial Plaza Exterior Painting", location: "Saddar, Karachi", services: ["Commercial Exterior Painting"], year: 2023, description: "Full 4-storey commercial plaza exterior with commercial-grade weather paint.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { id: 10, title: "3D Texture Wall Art – Kids Room", location: "Gulshan-e-Iqbal, Karachi", services: ["Decorative 3D Texture Work"], year: 2024, description: "Fun and colorful 3D texture design by our specialist team in a children's bedroom.", image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80" },
  { id: 11, title: "Roof Waterproofing – Apartment Building", location: "FB Area, Karachi", services: ["Roof Waterproofing"], year: 2023, description: "Chemical-based waterproofing on full roof of 5-storey residential building.", image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80" },
  { id: 12, title: "Full Home Painting – New Construction", location: "Malir Cantonment, Karachi", services: ["Interior Painting", "Exterior Painting", "Wood Polish"], year: 2024, description: "Complete new-home painting inside and outside with all woodwork finished in 18 days.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
];

const stats: StatItem[] = [
  { id: 1, number: "500+", label: "Projects Completed" },
  { id: 2, number: "10+", label: "Years of Experience" },
  { id: 3, number: "1000+", label: "Happy Clients" },
  { id: 4, number: "50+", label: "Expert Painters" }
];

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <>
      <Helmet>
        <title>Our Full Portfolio – Sikander Arts</title>
        <meta name="description" content="Explore our complete collection of masterpiece painting projects across Karachi. Interior, exterior, commercial, and industrial painting portfolio." />
      </Helmet>

      <div className="bg-slate-50 min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tighter"
            >
              Our Full Portfolio – <span className="text-secondary">Sikander Arts</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium">Explore our complete collection of masterpiece painting projects across Karachi</p>
          </div>
        </section>

        {/* Featured Project */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row"
            >
              <div className="lg:w-1/2 relative min-h-[400px]">
                <img src={featuredProject.image} alt={featuredProject.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-6 left-6 bg-secondary text-white px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs shadow-lg flex items-center gap-2">
                  <Star size={14} fill="white" /> Featured Project
                </div>
              </div>
              <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4 block">LATEST MASTERPIECE</span>
                <h2 className="text-3xl md:text-4xl font-serif font-black text-primary mb-6 leading-tight">{featuredProject.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.services.map((service, i) => (
                    <span key={i} className="bg-slate-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {service}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed font-medium mb-8">
                  {featuredProject.description}
                </p>
                <div className="flex items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-secondary" /> {featuredProject.location}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-secondary" /> {featuredProject.year}</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(featuredProject)}
                  className="self-start bg-primary text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-900 transition-colors flex items-center gap-2"
                >
                  View Full Details <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-xl group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-black uppercase tracking-widest border-2 border-white px-6 py-3 rounded-full">View Project</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <MapPin size={14} /> {project.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <span className="text-4xl md:text-6xl font-black text-secondary mb-2">{stat.number}</span>
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-300">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-primary mb-8 tracking-tight">
              Like What You See? Let's Work Together
            </h2>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-orange-600 transition-colors"
              >
                Get a Free Quote
              </motion.button>
            </Link>
          </div>
        </section>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 bg-white/80 hover:bg-white p-2 rounded-full text-primary z-10 transition-colors shadow-lg"
                >
                  <X size={24} />
                </button>

                <div className="h-64 md:h-96 relative">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 md:left-12 text-white">
                    <span className="bg-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                      {selectedProject.year}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif font-black leading-tight">{selectedProject.title}</h2>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.services.map((service, i) => (
                      <span key={i} className="bg-slate-100 text-gray-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <Layers size={14} /> {service}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-4">Project Overview</h3>
                      <p className="text-gray-600 leading-relaxed font-medium text-lg">
                        {selectedProject.description}
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Location</h4>
                        <p className="text-gray-800 font-bold flex items-center gap-2"><MapPin size={18} className="text-secondary" /> {selectedProject.location}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Year</h4>
                        <p className="text-gray-800 font-bold flex items-center gap-2"><Calendar size={18} className="text-secondary" /> {selectedProject.year}</p>
                      </div>
                      
                      <Link to="/contact" onClick={() => setSelectedProject(null)}>
                        <button className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-blue-900 transition-colors">
                          Get Quote for Similar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Portfolio;
