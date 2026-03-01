
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Target } from 'lucide-react';
import { WhatsAppQuoteForm } from './WhatsAppQuoteForm';

export const Contact: React.FC = () => {

  return (
    <section id="contact" className="py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20">

          {/* Contact Info */}
          <div className="lg:w-5/12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-secondary font-black uppercase tracking-[0.4em] text-sm block mb-4"
            >
              GET IN TOUCH
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-serif font-black text-primary leading-[1] mb-10 tracking-tighter"
            >
              Let's Color <br /> Your Vision
            </motion.h2>
            <p className="text-gray-600 text-xl mb-12 leading-relaxed font-medium">
              Ready to transform your space? Contact Sikander Art today for a free, no-obligation estimate in Karachi. We respond to all inquiries within 12 hours.
            </p>

            <div className="space-y-8 mb-16">
              {[
                { icon: Phone, title: "Phone", info: "+92 302 291 10 88", href: "tel: +92 302 291 10 88" },
                { icon: Mail, title: "Email", info: "sikanderpaint@example.com", href: "mailto:sikanderpaint@example.com" },
                { icon: MapPin, title: "Office", info: "Kharadar, Karachi, Pakistan", href: "#" }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-6 group"
                >
                  <div className="bg-white p-5 rounded-2xl text-secondary shadow-xl group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-primary uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                    <p className="text-lg font-bold text-gray-700">{item.info}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl h-80 w-full border-8 border-white relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.324882103323!2d67.05663731500355!3d24.86073430032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1626294770062!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Sikander Art Karachi Office"
              ></iframe>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Target size={200} />
              </div>

              <h3 className="text-4xl font-black text-primary mb-10 uppercase tracking-tighter">Get A Free Quote</h3>
              <WhatsAppQuoteForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
