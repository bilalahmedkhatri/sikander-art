import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Filter, 
  MapPin, 
  Calendar, 
  Maximize2, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Ruler, 
  User,
  Paintbrush,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  area: string;
  duration: string;
  year: number;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  gallery: string[];
  client: string;
}

type ProjectCategory =
  | 'All'
  | 'Interior'
  | 'Exterior'
  | 'Texture Work'
  | 'Waterproofing'
  | 'Wood & Metal'
  | 'Commercial'
  | 'Epoxy Flooring';

// --- Data ---
const projects: Project[] = [
  {
    id: 1,
    title: "Luxury Villa Interior Painting",
    category: "Interior",
    location: "DHA Phase 5, Karachi",
    area: "4,500 sq ft",
    duration: "14 days",
    year: 2024,
    client: "Residential Client",
    services: ["Interior Painting", "Putty Work", "Priming", "Two-Coat Finish"],
    description: "Complete interior painting of a luxury 4,500 sq ft villa in DHA Phase 5. All walls and ceilings covered with premium two-coat finish using Dulux Weathershield.",
    challenge: "Large surface area with high ceilings requiring scaffolding and precision finish.",
    solution: "Used professional scaffolding, applied putty and primer before two coats of premium paint.",
    result: "Flawless, smooth finish delivered 2 days ahead of schedule. Client fully satisfied.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80"
    ]
  },
  {
    id: 2,
    title: "6-Storey Building Exterior Painting",
    category: "Exterior",
    location: "Gulshan-e-Iqbal, Karachi",
    area: "12,000 sq ft",
    duration: "21 days",
    year: 2024,
    client: "Building Owner",
    services: ["Exterior Painting", "Anti-Fungal Treatment", "Waterproofing", "UV Topcoat"],
    description: "Full exterior repaint of a 6-storey residential building. Surface cleaned, anti-fungal treatment applied, sealed, and finished with UV-resistant weather paint.",
    challenge: "Working at height on a busy street in Gulshan with minimal disruption to residents.",
    solution: "Used safety harnesses and scaffolding, worked floor by floor, completed during off-peak hours.",
    result: "Building exterior transformed completely. Weather protection guaranteed for 5+ years.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
    ]
  },
  {
    id: 3,
    title: "Venetian Plaster Texture – Lounge",
    category: "Texture Work",
    location: "Clifton Block 2, Karachi",
    area: "800 sq ft",
    duration: "5 days",
    year: 2024,
    client: "Residential Client",
    services: ["Venetian Plaster", "Decorative Texture", "Custom Finish"],
    description: "Custom Venetian plaster texture applied on the main lounge feature wall and adjacent dining wall. Rich, luxurious finish that completely transformed the living space.",
    challenge: "Matching the client's reference image exactly and achieving consistent texture depth.",
    solution: "Used imported Italian plaster technique, applied in 3 layers with hand-polishing between each.",
    result: "Stunning result that exceeded client expectations. Featured in client's home tour.",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80"
    ]
  },
  {
    id: 4,
    title: "Roof & Bathroom Waterproofing",
    category: "Waterproofing",
    location: "North Nazimabad, Karachi",
    area: "2,200 sq ft",
    duration: "7 days",
    year: 2024,
    client: "Building Owner",
    services: ["Roof Waterproofing", "Bathroom Waterproofing", "Chemical Treatment", "Membrane Application"],
    description: "Complete waterproofing solution for a 5-storey building roof and 8 bathrooms. Chemical-based and membrane-based waterproofing applied to permanently eliminate leakage.",
    challenge: "Severe leakage issue causing damage to multiple floors during monsoon season.",
    solution: "Applied SBR chemical waterproofing on roof followed by APP membrane. Bathroom walls treated with crystalline waterproofing.",
    result: "Zero leakage reported after first monsoon season. Client saved significant repair costs.",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    ]
  },
  {
    id: 5,
    title: "Complete Wood Polish – Bungalow",
    category: "Wood & Metal",
    location: "Bahria Town Karachi",
    area: "All wooden surfaces",
    duration: "8 days",
    year: 2023,
    client: "Residential Client",
    services: ["Wood Polish", "Lacquer Finish", "Door Painting", "Cabinet Polish"],
    description: "All wooden surfaces in a large bungalow polished and finished — main door, all room doors, kitchen cabinets, wardrobes, and window frames. Premium lacquer used throughout.",
    challenge: "Different wood types requiring different polish treatments for consistent final appearance.",
    solution: "Assessed each wood type separately, sanded to bare wood, applied wood filler, primer, and 3 coats of lacquer.",
    result: "Rich, warm wood finish with consistent sheen across all surfaces. Client extremely satisfied.",
    image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
    ]
  },
  {
    id: 6,
    title: "Factory Floor Epoxy Coating",
    category: "Epoxy Flooring",
    location: "Korangi Industrial Area, Karachi",
    area: "8,000 sq ft",
    duration: "5 days",
    year: 2024,
    client: "Factory Owner",
    services: ["Epoxy Floor Coating", "Surface Grinding", "Anti-Slip Finish"],
    description: "Industrial-grade epoxy floor coating applied across entire 8,000 sq ft factory floor. Surface ground, primed, and finished with 2-component epoxy system for maximum durability.",
    challenge: "Existing floor had oil stains, cracks, and uneven surface that needed preparation before epoxy.",
    solution: "Used diamond grinding machine to remove old surface, filled cracks with epoxy filler, applied primer and two coats of industrial epoxy.",
    result: "Seamless, chemical-resistant floor that is easy to clean and maintain. Factory operational within 48 hours.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
    ]
  },
  {
    id: 7,
    title: "Commercial Plaza Exterior",
    category: "Commercial",
    location: "Saddar, Karachi",
    area: "9,500 sq ft",
    duration: "18 days",
    year: 2023,
    client: "Plaza Owner",
    services: ["Commercial Exterior Painting", "Waterproofing", "Anti-Fungal Treatment"],
    description: "Full exterior painting of a 4-storey commercial plaza in Saddar. Surface cleaned, sealed, anti-fungal treatment applied, and finished with commercial-grade exterior paint.",
    challenge: "Active commercial area with shops open during the project requiring careful site management.",
    solution: "Used dustsheets to protect shop fronts, worked systematically floor by floor, minimized disruption to businesses.",
    result: "Plaza completely transformed. Footfall reportedly increased after the fresh new look.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80"
    ]
  },
  {
    id: 8,
    title: "3D Texture Art – Kids Bedroom",
    category: "Texture Work",
    location: "Gulshan-e-Iqbal Block 13, Karachi",
    area: "350 sq ft",
    duration: "3 days",
    year: 2024,
    client: "Residential Client",
    services: ["3D Texture Work", "Decorative Painting", "Custom Wall Art"],
    description: "Fun and colorful 3D texture design created in a children's bedroom. Custom cartoon-themed texture design crafted by our specialist texture artist using specialized tools and materials.",
    challenge: "Creating a child-safe, non-toxic custom design that matched the parents' vision exactly.",
    solution: "Used child-safe, zero-VOC paints and materials. Created design template first, got approval, then executed.",
    result: "Magical bedroom transformation that the child absolutely loves. Parents shared photos widely on social media.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"
    ]
  },
  {
    id: 9,
    title: "Corporate Office Interior",
    category: "Interior",
    location: "PECHS Block 6, Karachi",
    area: "3,500 sq ft",
    duration: "10 days",
    year: 2024,
    client: "Corporate Client",
    services: ["Interior Painting", "Ceiling Work", "Feature Wall", "Color Consultation"],
    description: "Complete interior painting of a 3,500 sq ft corporate office. Light neutral tones used for open work areas, accent color on reception feature wall. Work done over weekend to avoid business disruption.",
    challenge: "Tight deadline — entire office needed completion over one weekend without disturbing business operations.",
    solution: "Deployed a team of 12 painters working two shifts across Saturday and Sunday.",
    result: "Complete office interior finished in 2 days. Business resumed Monday morning with zero disruption.",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
      "https://images.unsplash.com/photo-1600885157082-b2a66d5b1e4e?w=800&q=80"
    ]
  },
  {
    id: 10,
    title: "Anti-Rust Metal Gate Painting",
    category: "Wood & Metal",
    location: "Defence Phase 2, Karachi",
    area: "All metal surfaces",
    duration: "4 days",
    year: 2023,
    client: "Residential Client",
    services: ["Metal Painting", "Anti-Rust Treatment", "Primer Coat", "Topcoat Finish"],
    description: "Complete anti-rust treatment and painting for main entrance gate, boundary wall grills, window grills, and iron staircase railing of a large bungalow in Defence.",
    challenge: "Heavy rust on old iron gate and grills requiring complete removal before painting.",
    solution: "Used angle grinder and wire brush to remove all rust, applied red oxide anti-rust primer, then two coats of high-gloss enamel.",
    result: "All metal surfaces rust-free and beautifully painted. Anti-rust guarantee for 3+ years.",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
    ]
  },
  {
    id: 11,
    title: "New Construction Full Home Painting",
    category: "Interior",
    location: "Malir Cantonment, Karachi",
    area: "5,200 sq ft",
    duration: "18 days",
    year: 2024,
    client: "Homeowner",
    services: ["Interior Painting", "Exterior Painting", "Wood Polish", "Metal Painting"],
    description: "Complete painting package for a newly constructed home — full interior, exterior, all wooden doors and cabinets polished, and iron gates painted. Handover-ready finish.",
    challenge: "Fresh plaster walls requiring extra drying time and multiple primer coats to avoid patchy finish.",
    solution: "Allowed each coat full drying time, used alkali-resistant primer on fresh plaster before finish coats.",
    result: "Beautiful handover-ready home delivered on time. Client moved in directly after completion.",
    image: "https://images.unsplash.com/photo-1600885157082-b2a66d5b1e4e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    ]
  },
  {
    id: 12,
    title: "Warehouse Exterior & Interior",
    category: "Commercial",
    location: "Landhi Industrial Area, Karachi",
    area: "15,000 sq ft",
    duration: "25 days",
    year: 2023,
    client: "Warehouse Owner",
    services: ["Commercial Interior Painting", "Exterior Painting", "Epoxy Flooring", "Roof Waterproofing"],
    description: "Large-scale painting project for an industrial warehouse — full interior and exterior painting, epoxy floor coating throughout, and roof waterproofing to prevent monsoon damage.",
    challenge: "Massive scale project with active warehouse operations requiring phased completion.",
    solution: "Divided warehouse into 4 zones, completed one zone at a time allowing operations to continue.",
    result: "Complete warehouse transformation delivered on schedule. Operations never stopped during the project.",
    image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=800&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
    ]
  }
];

const categories: ProjectCategory[] = [
  'All',
  'Interior',
  'Exterior',
  'Texture Work',
  'Waterproofing',
  'Wood & Metal',
  'Commercial',
  'Epoxy Flooring'
];

// --- Components ---
const ViewProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>View Projects | Sikander Arts – Painting Projects Karachi</title>
        <meta name="description" content="View all completed painting projects by Sikander Arts in Karachi. Interior, exterior, texture, waterproofing, epoxy, wood polish and more." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-primary pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=2070&auto=format&fit=crop" 
              alt="Projects Hero" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-20 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
            >
              Our Completed Projects
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Explore Sikander Arts' real work — painting projects completed across Karachi with quality and precision
            </motion.p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white shadow-lg relative z-30 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-xl p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { label: "Projects Completed", value: "500+" },
              { label: "Years Experience", value: "10+" },
              { label: "Happy Clients", value: "1000+" },
              { label: "Expert Painters", value: "50+" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-secondary mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold transition-all ${
                  activeCategory === cat 
                    ? 'text-white bg-secondary shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-200 bg-white'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-orange-700 rounded-full mx-4 mb-2 opacity-30"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                        <Maximize2 size={24} />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {project.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {project.year}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{project.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin size={14} className="mr-1 text-secondary" />
                      {project.location}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Ruler size={14} className="mr-2 text-primary" />
                        {project.area}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-primary" />
                        {project.duration}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.services.slice(0, 3).map((service, idx) => (
                        <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                          {service}
                        </span>
                      ))}
                      {project.services.length > 3 && (
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                          +{project.services.length - 3}
                        </span>
                      )}
                    </div>

                    <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group-hover:bg-secondary">
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Impressed With Our Work?</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get a free site visit and quote for your project anywhere in Karachi
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Link 
                to="/contact" 
                className="bg-secondary hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-2xl flex items-center justify-center gap-2"
              >
                Get a Free Quote <ArrowRight size={20} />
              </Link>
              <Link 
                to="/portfolio" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                View Our Portfolio <Paintbrush size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-96">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur hover:bg-white text-white hover:text-black p-2 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10">
                  <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  <div className="md:col-span-2 space-y-8">
                    {/* Gallery Thumbnails */}
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {[selectedProject.image, ...selectedProject.gallery].map((img, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            // In a real app, this would switch the main image
                            // For now, we'll just show the thumbnail interaction
                          }}
                          className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-transparent hover:border-secondary transition-all"
                        >
                          <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">Project Overview</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                          <Filter size={18} /> The Challenge
                        </h4>
                        <p className="text-red-700/80 text-sm">{selectedProject.challenge}</p>
                      </div>
                      
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                          <Paintbrush size={18} /> The Solution
                        </h4>
                        <p className="text-blue-700/80 text-sm">{selectedProject.solution}</p>
                      </div>

                      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                          <CheckCircle2 size={18} /> The Result
                        </h4>
                        <p className="text-green-700/80 text-sm">{selectedProject.result}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h3 className="font-bold text-primary mb-6 uppercase tracking-wider text-sm">Project Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="text-secondary mt-1" size={18} />
                          <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Location</div>
                            <div className="font-medium text-gray-800">{selectedProject.location}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Ruler className="text-secondary mt-1" size={18} />
                          <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Area</div>
                            <div className="font-medium text-gray-800">{selectedProject.area}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="text-secondary mt-1" size={18} />
                          <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Duration</div>
                            <div className="font-medium text-gray-800">{selectedProject.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="text-secondary mt-1" size={18} />
                          <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Year</div>
                            <div className="font-medium text-gray-800">{selectedProject.year}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <User className="text-secondary mt-1" size={18} />
                          <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Client</div>
                            <div className="font-medium text-gray-800">{selectedProject.client}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Services Provided</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.services.map((service, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link 
                      to="/contact" 
                      className="w-full bg-secondary hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-center transition-all shadow-xl block"
                    >
                      Get a Similar Quote
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ViewProjects;
