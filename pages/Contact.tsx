import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: 'Interior Painting',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', service: 'Interior Painting', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Sikander Arts</title>
        <meta name="description" content="Get in touch with Sikander Arts for professional painting services in Karachi. Free quotes and consultations." />
      </Helmet>

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tighter"
            >
              Contact <span className="text-secondary">Us</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium"
            >
              Get in touch with Karachi's most trusted painting contractor
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Left Column - Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/3 space-y-8"
              >
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                  <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-8">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                        <p className="text-lg font-bold text-gray-800">+92 302 291 10 88</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">WhatsApp</p>
                        <p className="text-lg font-bold text-gray-800">+92 302 291 10 88</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                        <p className="text-lg font-bold text-gray-800 break-all">sikanderpaint@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</p>
                        <p className="text-lg font-bold text-gray-800">Kharadar, Karachi, Pakistan</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Business Hours</p>
                    <p className="text-gray-700 font-medium">Monday – Saturday</p>
                    <p className="text-gray-700 font-medium">9:00 AM – 7:00 PM</p>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                      <MessageCircle size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-2/3"
              >
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
                  <h3 className="text-3xl font-black text-primary uppercase tracking-tighter mb-8">Send Us a Message</h3>
                  
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
                    >
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                        <Send size={40} />
                      </div>
                      <h4 className="text-2xl font-black text-green-800 mb-2">Message Sent!</h4>
                      <p className="text-green-700">Thank you for contacting Sikander Arts. We will get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 ${errors.name ? 'border-red-400' : 'border-transparent'} focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary`}
                            placeholder="Your Name"
                          />
                          {errors.name && <p className="text-red-500 text-xs font-bold ml-1">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 ${errors.phone ? 'border-red-400' : 'border-transparent'} focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary`}
                            placeholder="Your Phone"
                          />
                          {errors.phone && <p className="text-red-500 text-xs font-bold ml-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary`}
                          placeholder="Your Email (Optional)"
                        />
                        {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Service Required</label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary appearance-none"
                          >
                            <option>Interior Painting</option>
                            <option>Exterior Painting</option>
                            <option>Texture Work</option>
                            <option>Waterproofing</option>
                            <option>Wood Painting</option>
                            <option>Metal Painting</option>
                            <option>Epoxy Flooring</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Message</label>
                        <textarea
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary resize-none"
                          placeholder="Tell us about your project..."
                        ></textarea>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-primary text-white py-5 rounded-xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-900 transition-colors flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                      >
                        {isSubmitting ? (
                          <>Processing...</>
                        ) : (
                          <>Send Message <Send size={18} /></>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 w-full bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center bg-slate-300">
             <p className="text-2xl font-black text-gray-500 uppercase tracking-widest">Google Map – Karachi, Pakistan</p>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.324882103323!2d67.05663731500355!3d24.86073430032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1626294770062!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0, opacity: 0.6 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="Sikander Art Karachi Office"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default Contact;
