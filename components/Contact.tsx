
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Target } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Interior Painting',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', service: 'Interior Painting', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Contact Info */}
          <div className="lg:w-5/12">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-black uppercase tracking-[0.4em] text-sm block mb-4"
            >
              GET IN TOUCH
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-serif font-black text-primary leading-[1] mb-10 tracking-tighter"
            >
              Let's Color <br /> Your Vision
            </motion.h2>
            <p className="text-gray-600 text-xl mb-12 leading-relaxed font-medium">
              Ready to transform your space? Contact Sikander Art today for a free, no-obligation estimate in Karachi. We respond to all inquiries within 12 hours.
            </p>

            <div className="space-y-8 mb-16">
              {[
                { icon: Phone, title: "Phone", info: "+92 828 256 96 75", href: "tel:+928282569675" },
                { icon: Mail, title: "Email", info: "sikanderpaint@example.com", href: "mailto:sikanderpaint@example.com" },
                { icon: MapPin, title: "Office", info: "123 Paint Street, Karachi, Pakistan", href: "#" }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
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
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 text-green-700 p-10 rounded-3xl flex flex-col items-center gap-6 text-center"
                >
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center animate-bounce">
                    <Send size={40} />
                  </div>
                  <div>
                    <p className="text-2xl font-black uppercase tracking-tight">Message Sent!</p>
                    <p className="font-medium mt-2">Our master painter will contact you shortly.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary"
                        placeholder="e.g. Ali Ahmed"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary"
                        placeholder="+92 3XX XXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary"
                      placeholder="ali@example.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Service Needed</label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary appearance-none"
                      >
                        <option>Interior Painting</option>
                        <option>Exterior Painting</option>
                        <option>Commercial Painting</option>
                        <option>Waterproofing</option>
                        <option>Cabinet Refinishing</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Project Details</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary resize-none"
                      placeholder="Tell us about your space..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-primary hover:bg-blue-900 text-white font-black py-6 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      'Processing...'
                    ) : (
                      <>
                        Request Estimate <Send size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
