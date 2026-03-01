import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

type FilterCategory = 'All' | 'Interior' | 'Exterior' | 'Texture Work' | 'Waterproofing' | 'Wood & Metal' | 'Commercial';

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Interior Painting – DHA Phase 5", category: "Interior", image: "https://images.pexels.com/photos/6283973/pexels-photo-6283973.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 2, title: "Exterior Painting – Gulshan Block 13", category: "Exterior", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Texture Work – Clifton Apartment", category: "Texture Work", image: "https://images.pexels.com/photos/8210463/pexels-photo-8210463.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 4, title: "Waterproofing – North Nazimabad Roof", category: "Waterproofing", image: "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 5, title: "Interior Painting – PECHS Office", category: "Interior", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Wood Polish – Bahria Town Villa", category: "Wood & Metal", image: "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=800" },
  { id: 7, title: "Metal Gate Painting – Korangi Factory", category: "Wood & Metal", image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 8, title: "Exterior – Saddar Commercial Plaza", category: "Exterior", image: "https://images.pexels.com/photos/2681639/pexels-photo-2681639.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 9, title: "Texture Wall Art – Defence Bungalow", category: "Texture Work", image: "https://images.pexels.com/photos/6207819/pexels-photo-6207819.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 10, title: "Interior Painting – Malir Home", category: "Interior", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
  { id: 11, title: "Epoxy Flooring – Landhi Warehouse", category: "Commercial", image: "https://images.pexels.com/photos/7031614/pexels-photo-7031614.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 12, title: "Exterior – FB Area Building", category: "Exterior", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop" },
  { id: 13, title: "Interior – Scheme 33 Apartment", category: "Interior", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
  { id: 14, title: "Texture Work – Nazimabad Residence", category: "Texture Work", image: "https://images.pexels.com/photos/6207368/pexels-photo-6207368.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 15, title: "Waterproofing – PECHS Bathroom", category: "Waterproofing", image: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg" },
  { id: 16, title: "Interior – Clifton Sea View Flat", category: "Interior", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 17, title: "Commercial Painting – North Karachi", category: "Commercial", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop" },
  { id: 18, title: "Wood Polish – DHA Phase 6 Villa", category: "Wood & Metal", image: "https://images.pexels.com/photos/32978946/pexels-photo-32978946.jpeg" },
];

const categories: FilterCategory[] = ['All', 'Interior', 'Exterior', 'Texture Work', 'Waterproofing', 'Wood & Metal', 'Commercial'];

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (index: number) => {
    // Find the actual index in the full array if needed, 
    // but here we want to navigate through filtered items
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredItems.length]);

  return (
    <>
      <Helmet>
        <title>Our Work Gallery | Sikander Arts</title>
        <meta name="description" content="Browse our gallery of completed painting projects across Karachi. Interior, exterior, and texture work examples." />
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
              Our Work <span className="text-secondary">Gallery</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium">Browse our completed painting projects across Karachi</p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-10 sticky top-20 z-30 bg-slate-50/95 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-4 overflow-x-auto">
            <div className="flex gap-4 md:justify-center min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-colors ${
                    activeFilter === cat ? 'text-white' : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  {activeFilter === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-secondary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg"
                    onClick={() => openLightbox(index)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                          {item.category}
                        </span>
                        <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                        <div className="mt-4 flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-widest">
                          <ZoomIn size={14} /> View Project
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
              onClick={() => setLightboxOpen(false)}
            >
              <button 
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                onClick={() => setLightboxOpen(false)}
              >
                <X size={40} />
              </button>

              <button 
                className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors p-2"
                onClick={prevImage}
              >
                <ChevronLeft size={40} />
              </button>

              <button 
                className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors p-2"
                onClick={nextImage}
              >
                <ChevronRight size={40} />
              </button>

              <div 
                className="max-w-5xl w-full max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img 
                  key={filteredItems[currentIndex].id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={filteredItems[currentIndex].image} 
                  alt={filteredItems[currentIndex].title}
                  className="w-full h-full object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white rounded-b-lg">
                  <span className="text-secondary text-xs font-black uppercase tracking-widest block mb-1">
                    {filteredItems[currentIndex].category}
                  </span>
                  <h3 className="text-2xl font-bold">{filteredItems[currentIndex].title}</h3>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;
