
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Target } from 'lucide-react';
import { WhatsAppQuoteForm } from './WhatsAppQuoteForm';

export const Contact: React.FC = () => {

  return (
    <section id="contact" className="py-32 bg-[#fbfbfb] overflow-hidden relative">
      {/* Cinematic Background Lighting */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[180px] -ml-96 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] -mr-72 -mb-72 pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row gap-24 items-start">

          {/* Contact Info */}
          <div className="lg:w-5/12 sticky top-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
            </motion.div>
            <div className="relative inline-block perspective-2000">
              <motion.h2
                initial={{ opacity: 0, rotateX: 45, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  type: "spring",
                  damping: 20,
                  stiffness: 80
                }}
                className="text-4xl md:text-6xl font-serif font-black text-gray-800 leading-[1] mb-10 tracking-tighter preserve-3d"
              >
                Let's Color <br />
                <span className="text-secondary drop-shadow-[0_10px_30px_rgba(249,115,22,0.3)]">Your Vision</span>
              </motion.h2>
            </div>
            <p className="text-gray-500 text-xl mb-16 text-blakc leading-relaxed font-light tracking-wide italic">
              Ready to architect atmosphere? Contact Sikander Art for a high-fidelity consultation in Karachi. <br />
              <span className="text-gray-400 font-bold not-italic">Response within 12 hours.</span>
            </p>

            <div className="space-y-10 mb-16">
              {[
                { icon: Phone, title: "Quantum Line", info: "+92 302 291 10 88", href: "tel: +92 302 291 10 88" },
                { icon: Mail, title: "Neural Link", info: "ghulamsikandar13@gmail.com", href: "mailto:ghulamsikandar13@gmail.com" },
                { icon: MapPin, title: "Strategic Center", info: "Kharadar, Karachi, Pakistan", href: "#" }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -30, rotateY: -30 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  whileHover={{ x: 15, translateZ: 20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
                  className="flex items-center gap-8 group"
                >
                  <div className="bg-white/5 p-6 rounded-3xl text-secondary shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 group-hover:bg-secondary group-hover:text-white group-hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-500">
                    <item.icon size={32} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-black text-gray-600 uppercase text-[10px] tracking-[0.4em] mb-2">{item.title}</h4>
                    <p className="text-2xl font-black text-gray-400 group-hover:text-secondary transition-colors duration-300">{item.info}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="rounded-[1rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] h-80 w-full border border-white/10 relative group"
            >
              <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.324882103323!2d67.05663731500355!3d24.86073430032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1626294770062!5m2!1sen!2s"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen={true}
                loading="lazy"
                title="Sikander Art Karachi Office"
              ></iframe>
              <div class="embed-map-responsive"><div class="embed-map-container"><iframe class="embed-map-frame" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&height=400&hl=en&q=kharadar&t=&z=14&ie=UTF8&iwloc=B&output=embed"></iframe><a href="https://cartoongames.io" style="font-size:2px!important;color:gray!important;position:absolute;bottom:0;left:0;z-index:1;max-height:10px;overflow:hidden">Cartoon Network Games</a><a href="https://pokepath.org" style="font-size:2px!important;color:gray!important;position:absolute;bottom:0;left:0;z-index:1;max-height:10px;overflow:hidden">PokePath TD</a></div><style>.embed-map-responsive{position:relative;text-align:right;width:100%;height:0;padding-bottom:66.66666666666666%;}.embed-map-container{overflow:hidden;background:none!important;width:100%;height:100%;position:absolute;top:0;left:0;}.embed-map-frame{width:100%!important;height:100%!important;position:absolute;top:0;left:0;}</style></div>
            </motion.div> */}
          </div>

          {/* Form */}
          <div className="lg:w-7/12 perspective-3000">
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotateY: -5, rotateX: 2, translateZ: 20 }}
              className="bg-white/[0.02] backdrop-blur-3xl p-12 md:p-20 rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] border border-white/10 relative overflow-visible preserve-3d"
            >
              <div
                className="absolute -top-16 -right-16 p-12 opacity-[0.03] text-secondary pointer-events-none translate-z-50"
              >
                <Target size={300} />
              </div>

              <div className="relative z-10 preserve-3d">
                <motion.h3
                  initial={{ opacity: 0, translateZ: -20 }}
                  animate={{ opacity: 1, translateZ: 0 }}
                  className="text-4xl md:text-5xl font-black text-gray-700 mb-12 uppercase tracking-tighter translate-z-30"
                >
                  Architect Your <br /> <span className="text-secondary">Masterpiece</span>
                </motion.h3>
                <div className="translate-z-10">
                  <WhatsAppQuoteForm />
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] pointer-events-none -mt-32 -mr-32" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
