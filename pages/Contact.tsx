import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';

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
  const [isRedirecting, setIsRedirecting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsRedirecting(true);

    const message =
      `*New Contact Request – Sikander Arts*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'Not provided'}\n` +
      `*Service:* ${formData.service}\n\n` +
      `*Message:*\n${formData.message || 'No additional details provided.'}`;

    const whatsappUrl = `https://wa.me/923022911088?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsRedirecting(false);
      setFormData({ name: '', phone: '', email: '', service: 'Interior Painting', message: '' });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <>
      <SEO
        title="Contact Sikander Arts | Free Painting Quote Karachi – Call or WhatsApp"
        description="Contact Sikander Arts for professional painting services in Karachi. Get a free site visit and quote. Call or WhatsApp +92 302 291 1088. Interior, exterior, texture, waterproofing and all painting services available."
        keywords="contact Sikander Arts, painting quote Karachi, free painting estimate Karachi, painting contractor contact Karachi, WhatsApp painter Karachi, hire painter Karachi"
        url="https://sikanderart.com/contact"
      />

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-[#fbfbfb] text-gray-900 relative overflow-hidden">
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
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium"
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
                  <h3 className="text-xl font-black text-gray-700 uppercase tracking-widest mb-8">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                        <a href="tel:+923022911088" className="text-lg font-bold text-gray-800 hover:text-secondary transition-colors">+92 302 291 10 88</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">WhatsApp</p>
                        <a
                          href="https://wa.me/923022911088"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-gray-800 hover:text-secondary transition-colors"
                        >
                          +92 302 291 10 88
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                        <a href="mailto:bilal_azeemlab@gmail.com" className="text-lg font-bold text-gray-800 hover:text-secondary transition-colors break-all">bilal_azeemlab@gmail.com</a>
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
                    <Link to="https://web.facebook.com/khaskhelipaintservice" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#fbfbfb] hover:text-white transition-colors">
                      <Facebook size={20} />
                    </Link>
                    <Link to="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#fbfbfb] hover:text-white transition-colors">
                      <Instagram size={20} />
                    </Link>
                    <Link
                      to="https://wa.me/923022911088"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors"
                    >
                      <MessageCircle size={20} />
                    </Link>
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
                  <h3 className="text-3xl font-black text-gray-700 uppercase tracking-tighter mb-2">Send Us a Message</h3>
                  <p className="text-gray-500 text-sm font-medium mb-8 flex items-center gap-2">
                    <MessageCircle size={16} className="text-green-500" />
                    Form submit hone par WhatsApp par redirect ho jayega
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 ${errors.name ? 'border-red-400' : 'border-transparent'} focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-600`}
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
                          className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 ${errors.phone ? 'border-red-400' : 'border-transparent'} focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-600`}
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
                        className={`w-full px-6 py-4 rounded-xl bg-slate-50 border-2 ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-600`}
                        placeholder="Your Email (Optional)"
                      />
                      {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Service Required</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-600 appearance-none"
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

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-gray-600 resize-none"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isRedirecting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-xl font-black uppercase tracking-widest shadow-xl transition-colors flex items-center justify-center gap-3 ${isRedirecting ? 'opacity-70 cursor-wait' : ''}`}
                    >
                      {isRedirecting ? (
                        <>Opening WhatsApp...</>
                      ) : (
                        <>
                          <MessageCircle size={20} /> Send via WhatsApp
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;