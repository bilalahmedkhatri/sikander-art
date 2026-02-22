import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Team Members' },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="relative py-20 bg-primary text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold uppercase tracking-wider text-sm">Why Choose Us</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-6">
            The Sikander Arts Difference
          </h2>
          <p className="text-gray-300 text-lg">
            We don't just paint walls; we build relationships through transparency, quality, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};