import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Award, Users, Clock, CheckCircle, ShieldCheck, Target, Heart, Star } from 'lucide-react';

interface Stat {
  id: number;
  number: string;
  label: string;
}

const stats: Stat[] = [
  { id: 1, number: "500+", label: "Projects" },
  { id: 2, number: "10+", label: "Years Experience" },
  { id: 3, number: "1000+", label: "Happy Clients" },
  { id: 4, number: "50+", label: "Expert Painters" }
];

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  return (
    <>
      <Helmet>
        <title>About Us | Sikander Arts Painting Contractors</title>
        <meta name="description" content="Learn about Sikander Arts, Karachi's trusted painting contractor with over 10 years of experience." />
      </Helmet>

      <div className="bg-white min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-slate-50">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-primary mb-6 tracking-tighter"
            >
              About <span className="text-secondary">Sikander Arts</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium"
            >
              Karachi's trusted painting contractor delivering premium quality painting and finishing services for residential, commercial, and industrial properties.
            </motion.p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src="https://images.pexels.com/photos/5691597/pexels-photo-5691597.jpeg" alt="Team at work" className="w-full h-[500px] object-cover" />
                  <div className="absolute inset-0 bg-primary/10"></div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <span className="text-secondary font-black uppercase tracking-[0.3em] text-sm block mb-4">WHO WE ARE</span>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-primary mb-8 tracking-tight">
                  Masters of <span className="text-secondary">Color & Finish</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                  Sikander Arts is more than just a painting company; we are a team of dedicated artisans passionate about transforming spaces. Founded in 2014, we have grown from a small team to one of Karachi's most respected painting contractors.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  We specialize in high-end residential and commercial projects where attention to detail is paramount. Our team is trained in the latest application techniques and uses only premium materials to ensure a flawless, long-lasting finish.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story (Alternating) */}
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src="https://images.pexels.com/photos/994164/pexels-photo-994164.jpeg" alt="Our Journey" className="w-full h-[500px] object-cover" />
                  <div className="absolute inset-0 bg-secondary/10"></div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <span className="text-secondary font-black uppercase tracking-[0.3em] text-sm block mb-4">OUR STORY</span>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-primary mb-8 tracking-tight">
                  A Decade of <span className="text-secondary">Excellence</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
                  Starting with a single brush and a vision, Sikander Arts has painted over 500 properties across Karachi. From humble beginnings in Gulshan-e-Iqbal to handling large-scale projects in DHA and Bahria Town, our journey has been defined by trust and quality.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  We believe that a fresh coat of paint does more than just cover walls; it revitalizes lives and businesses. That's why we treat every project, big or small, with the same level of dedication and care.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <span className="text-5xl md:text-6xl font-black text-secondary mb-2">{stat.number}</span>
                  <span className="text-sm md:text-base font-bold uppercase tracking-widest text-gray-300">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  To provide the highest quality painting services in Karachi, ensuring customer satisfaction through transparency, reliability, and superior craftsmanship.
                </p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                  <Star size={32} />
                </div>
                <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  To be Pakistan's leading painting contractor, known for innovation, eco-friendly practices, and setting new standards in the finishing industry.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-secondary font-black uppercase tracking-[0.3em] text-sm block mb-4">WHY CHOOSE US</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-primary tracking-tight">The Sikander Difference</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Experienced and skilled professional team",
                "Premium paints: Berger, Dulux, Nippon",
                "Free site visit and color consultation",
                "On-time project delivery",
                "Competitive and transparent pricing",
                "100% client satisfaction guarantee",
                "Clean and professional work ethics",
                "Available 6 days a week across all Karachi"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md"
                >
                  <CheckCircle className="text-secondary w-6 h-6 flex-shrink-0" />
                  <span className="font-bold text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-black text-primary tracking-tight">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Quality", icon: Award },
                { title: "Integrity", icon: ShieldCheck },
                { title: "Professionalism", icon: Users },
                { title: "Customer-First", icon: Heart }
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] shadow-xl text-center group hover:bg-primary transition-colors duration-300"
                >
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors">
                    <val.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-primary uppercase tracking-widest group-hover:text-white transition-colors">{val.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-20 bg-slate-100">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-black text-primary uppercase tracking-widest mb-10">Areas We Serve in Karachi</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "DHA", "Clifton", "Gulshan-e-Iqbal", "North Nazimabad", "PECHS", "Korangi", 
                "Bahria Town Karachi", "Malir", "Saddar", "Nazimabad", "FB Area", "Landhi", 
                "Defence", "Scheme 33"
              ].map((area, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white px-6 py-3 rounded-full shadow-md text-gray-600 font-bold text-sm uppercase tracking-wider hover:bg-secondary hover:text-white transition-colors cursor-default"
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-primary mb-8 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-orange-600 transition-colors"
              >
                Start Your Project Today
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
