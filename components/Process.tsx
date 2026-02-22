import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, PaintRoller, Sparkles, Calendar } from 'lucide-react';

const steps = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Schedule Consultation',
    desc: 'Book a free on-site estimate. We listen to your needs and assess the space.'
  },
  {
    icon: <ClipboardList className="w-8 h-8" />,
    title: 'Detailed Proposal',
    desc: 'Receive a transparent quote detailing scope, materials, and timeline.'
  },
  {
    icon: <PaintRoller className="w-8 h-8" />,
    title: 'Execution & Prep',
    desc: 'We protect furniture, prep surfaces, and apply premium paint with precision.'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Final Walkthrough',
    desc: 'We inspect the work with you to ensure every detail meets your standards.'
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold uppercase tracking-wider text-sm">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mt-2">
            Our Simple 4-Step Process
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg relative group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-md group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="absolute top-4 right-4 text-6xl font-serif font-bold text-gray-100 -z-10 group-hover:text-gray-200 transition-colors">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-primary text-center mb-3">{step.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};