
import React from 'react';
import { Palette, Facebook, Instagram, Phone, Mail, MapPin, Send, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo5 } from './Logos';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-32 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Brand & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-10 group cursor-default">
              <div className="-mt-1 lg:-mt-2">
                <Logo5 isSolidNav={true} />
              </div>
            </div>
            <p className="text-gray-300 mb-10 leading-relaxed font-medium text-lg">
              Karachi's premier painting service. We transform spaces with professional expertise and artisanal quality.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#", name: "Facebook" },
                { icon: Video, href: "#", name: "TikTok" }, // Using Video icon for TikTok as requested
                { icon: Instagram, href: "#", name: "Instagram" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, backgroundColor: "#f97316" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all text-white shadow-xl relative group"
                  title={social.name}
                >
                  <social.icon size={24} />
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.3em] text-secondary border-l-4 border-secondary pl-6">Explore</h4>
            <ul className="space-y-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Calculator', path: '/calculate-cost'},
                { name: 'About', path: '/about' }
              ].map((item) => (
                <li key={item.name}>
                  {item.isExternal ? (
                    <a href={item.path} className="text-gray-300 hover:text-white hover:translate-x-4 transition-all flex items-center gap-4 group font-black uppercase text-xs tracking-[0.2em]">
                      <div className="w-0 h-0.5 bg-secondary group-hover:w-8 transition-all"></div>
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.path} className="text-gray-300 hover:text-white hover:translate-x-4 transition-all flex items-center gap-4 group font-black uppercase text-xs tracking-[0.2em]">
                      <div className="w-0 h-0.5 bg-secondary group-hover:w-8 transition-all"></div>
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.3em] text-secondary border-l-4 border-secondary pl-6">Get In Touch</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                  <a href="tel:+928282569675" className="text-xl font-bold text-white hover:text-secondary transition-colors">+92 302 291 10 88</a>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:sikanderpaint@example.com" className="text-xl font-bold text-white hover:text-secondary transition-colors break-all">sikanderpaint@example.com</a>
                </div>
              </li>
              <li className="flex items-start gap-5 group">
                <div className="p-4 bg-white/5 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="text-xl font-bold text-white">Kharadar, Karachi, Pakistan</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          >
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.3em] text-secondary border-l-4 border-secondary pl-6">Newsletter</h4>
            <p className="text-gray-300 mb-8 font-medium text-lg leading-relaxed">Subscribe for premium paint tips and exclusive offers in Karachi.</p>
            <form className="relative group" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-8 py-5 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-secondary focus:outline-none text-white placeholder-gray-500 font-bold transition-all pr-16"
              />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-3 bottom-3 aspect-square bg-secondary rounded-xl flex items-center justify-center text-white shadow-2xl"
              >
                <Send size={20} />
              </motion.button>
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
