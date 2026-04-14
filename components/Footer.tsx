import React, { useState } from 'react';
import { Palette, Facebook, Instagram, Phone, Mail, MapPin, Send, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo5 } from './Logos';

export const Footer: React.FC = () => {

  const [email, setEmail] = useState('bilal_azeemlab@gmail.com');
  return (
    <footer className="bg-[#050505] text-white pt-32 pb-12 relative overflow-hidden perspective-2000">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(249,115,22,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand & About */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 30, translateZ: -100 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, translateZ: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="group"
          >
            <div className="flex items-center gap-3 mb-10 transform-gpu transition-all duration-500 group-hover:translate-z-10 group-hover:scale-105">
              <div className="-mt-1 lg:-mt-2 relative">
                <Logo5 isSolidNav={true} />
                <div className="absolute -inset-4 bg-secondary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
            <p className="text-gray-400 mb-10 leading-relaxed font-medium text-lg border-l-2 border-secondary/30 pl-6 italic">
              Karachi's premier painting service. We transform spaces with professional expertise and artisanal quality.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#", name: "Facebook" },
                { icon: Video, href: "#", name: "TikTok" },
                { icon: Instagram, href: "#", name: "Instagram" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 20, 
                    rotateX: -10,
                    translateZ: 20,
                    backgroundColor: "rgba(249, 115, 22, 0.2)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all text-white shadow-xl relative group transform-style-3d backdrop-blur-md"
                  title={social.name}
                >
                  <social.icon size={24} className="group-hover:text-secondary group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all" />
                  <div className="absolute -inset-1 bg-gradient-to-tr from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 blur-sm rounded-2xl transition-opacity"></div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.3em] text-secondary border-l-4 border-secondary pl-6 relative">
              Explore
              <div className="absolute -left-1 top-0 w-1 h-full bg-secondary blur-[4px]"></div>
            </h4>
            <ul className="space-y-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Calculator', path: '/calculate-cost' },
                { name: 'About', path: '/about' }
              ].map((item) => (
                <li key={item.name} className="perspective-sm">
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white hover:translate-x-4 hover:translate-z-4 transition-all flex items-center gap-4 group font-black uppercase text-xs tracking-[0.2em] transform-style-3d"
                  >
                    <div className="w-0 h-0.5 bg-secondary group-hover:w-8 transition-all shadow-[0_0_10px_rgba(249,115,22,1)]"></div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -30, translateZ: -100 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, translateZ: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.3em] text-secondary border-l-4 border-secondary pl-6 relative">
              Get In Touch
              <div className="absolute -left-1 top-0 w-1 h-full bg-secondary blur-[4px]"></div>
            </h4>
            <ul className="space-y-8">
              {[
                { icon: Phone, title: "Call Us", value: "+92 302 291 10 88", link: "tel:+923022911088" },
                { icon: Mail, title: "Email Us", value: email, link: `mailto:${email}` },
                { icon: MapPin, title: "Visit Us", value: "Kharadar, Karachi, Pakistan", link: null }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-5 group perspective-md">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-xl group-hover:rotate-y-12 group-hover:translate-z-4">
                    <item.icon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.title}</p>
                    {item.link ? (
                      <a href={item.link} className="text-xl font-bold text-white hover:text-secondary transition-colors break-all whitespace-pre-wrap">{item.value}</a>
                    ) : (
                      <p className="text-xl font-bold text-white">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.3em] text-secondary border-l-4 border-secondary pl-6 relative">
              Newsletter
              <div className="absolute -left-1 top-0 w-1 h-full bg-secondary blur-[4px]"></div>
            </h4>
            <p className="text-gray-400 mb-8 font-medium text-lg leading-relaxed">Subscribe for premium paint tips and exclusive offers in Karachi.</p>
            <form className="relative group perspective-md" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-8 py-5 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-secondary focus:outline-none text-white placeholder-gray-500 font-bold transition-all pr-16 backdrop-blur-xl group-hover:bg-white/10 group-hover:border-white/20"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotateY: 10, rotateX: -10, translateZ: 10 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-3 bottom-3 aspect-square bg-secondary rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] transform-style-3d overflow-hidden"
              >
                <Send size={20} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
              <div className="absolute -inset-1 bg-secondary/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </form>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-gray-500 text-xs font-black tracking-[0.3em] uppercase text-center md:text-left">
            &copy; {new Date().getFullYear()} SIKANDER ART PAINTING CONTRACTORS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors underline decoration-secondary/30 underline-offset-4">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors underline decoration-secondary/30 underline-offset-4">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};