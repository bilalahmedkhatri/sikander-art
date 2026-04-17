import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileText, ArrowLeft, Mail } from 'lucide-react';

interface TermsSection {
  id: number;
  title: string;
  content: string[];
}

const termsSections: TermsSection[] = [
  {
    id: 1,
    title: "Acceptance of Terms",
    content: [
      "By visiting our website, submitting an inquiry, requesting a quote, or hiring Sikander Arts for any painting service, you confirm that you have read, understood, and agree to these Terms of Service.",
      "If you do not agree with any part of these terms, please do not use our website or engage our services."
    ]
  },
  {
    id: 2,
    title: "Services Offered",
    content: [
      "Interior and exterior wall painting for residential, commercial, and industrial properties.",
      "Texture and decorative painting including Venetian plaster, sand texture, and 3D wall effects.",
      "Waterproofing services for roofs, bathrooms, and basements.",
      "Wood painting, polish, and lacquer finishing.",
      "Steel and metal painting with anti-rust treatment.",
      "Epoxy floor coating for garages, warehouses, and commercial spaces.",
      "Stucco and plaster work.",
      "Free on-site color consultation.",
      "All services are subject to availability, site assessment, and mutual agreement on scope and pricing before work begins."
    ]
  },
  {
    id: 3,
    title: "Quotations and Pricing",
    content: [
      "All quotes provided by Sikander Arts are estimates based on the information available at the time of inquiry or site visit.",
      "Final pricing may vary based on actual site conditions, surface area, material costs, and any additional work discovered during the project.",
      "Quotes are valid for 15 days from the date of issue unless otherwise stated.",
      "Sikander Arts reserves the right to revise a quote if the project scope changes after the initial agreement.",
      "All pricing is discussed and agreed upon transparently before any work begins."
    ]
  },
  {
    id: 4,
    title: "Payment Terms",
    content: [
      "Payment terms will be discussed and agreed upon before the project starts.",
      "Typically, an advance payment is required to confirm and schedule the project.",
      "Remaining payment is due upon project completion and client satisfaction sign-off.",
      "Sikander Arts accepts cash and bank transfer payments.",
      "In case of project cancellation by the client after work has commenced, advance payment may be non-refundable depending on the work already completed."
    ]
  },
  {
    id: 5,
    title: "Project Scheduling and Timeline",
    content: [
      "Project start dates and estimated completion timelines are agreed upon before work begins.",
      "Sikander Arts will make every effort to complete projects on time.",
      "Delays caused by factors outside our control — such as weather conditions, client-side changes, material availability, or access restrictions — will be communicated promptly and timelines adjusted accordingly.",
      "Clients are requested to ensure site access and a clear working environment during the project."
    ]
  },
  {
    id: 6,
    title: "Client Responsibilities",
    content: [
      "Provide accurate information about your property and project requirements.",
      "Ensure our team has safe and unobstructed access to the work area at all times.",
      "Secure or remove valuables, furniture, and fragile items from the work area before painting begins.",
      "Be available or appoint a representative to communicate with our team during the project.",
      "Review and approve completed work in person before final payment is made.",
      "Sikander Arts is not responsible for damage to items left in the work area without prior communication."
    ]
  },
  {
    id: 7,
    title: "Warranty and Workmanship Guarantee",
    content: [
      "Sikander Arts stands behind the quality of our work. We offer a workmanship warranty on completed painting projects.",
      "Warranty covers defects in application such as peeling, flaking, or uneven finish caused by our workmanship.",
      "Warranty does not cover damage caused by water seepage, structural cracks, natural wear and tear, or damage caused by the client or third parties after project completion.",
      "Warranty period and specific terms will be discussed and agreed upon in writing before the project begins.",
      "Paint material warranties are subject to the respective manufacturer's terms — Berger, Dulux, Nippon, etc."
    ]
  },
  {
    id: 8,
    title: "Limitation of Liability",
    content: [
      "Sikander Arts' liability is limited to the value of the services provided.",
      "We are not liable for any indirect, incidental, or consequential damages arising from our services.",
      "We are not liable for pre-existing structural defects, water damage, or issues not related to painting workmanship.",
      "We are not liable for delays or losses caused by factors outside our reasonable control.",
      "Our goal is always 100% client satisfaction, and we will work with you to resolve any genuine concerns professionally."
    ]
  },
  {
    id: 9,
    title: "Cancellation Policy",
    content: [
      "Clients may cancel a scheduled project by notifying Sikander Arts at least 48 hours in advance.",
      "Cancellations made less than 48 hours before the scheduled start date may result in a cancellation fee.",
      "If Sikander Arts is unable to proceed with a project due to unforeseen circumstances, we will notify the client promptly and offer a full refund of any advance payment made."
    ]
  },
  {
    id: 10,
    title: "Use of Website",
    content: [
      "Use the website only for lawful purposes.",
      "Do not attempt to damage, disrupt, or gain unauthorized access to our website or systems.",
      "Do not submit false or misleading information through our contact or quote forms.",
      "Do not copy, reproduce, or distribute any content from our website without written permission from Sikander Arts.",
      "All content on this website including text, images, and design is the property of Sikander Arts and is protected under applicable laws."
    ]
  },
  {
    id: 11,
    title: "Photography and Portfolio Rights",
    content: [
      "Sikander Arts reserves the right to photograph completed painting projects for use in our portfolio, website gallery, and social media pages.",
      "If you do not wish your project to be photographed or featured, please inform us in writing before the project begins and we will respect your preference."
    ]
  },
  {
    id: 12,
    title: "Governing Law",
    content: [
      "These Terms of Service are governed by the laws of Pakistan.",
      "Any disputes arising from these terms or our services will be subject to the jurisdiction of the courts of Karachi, Pakistan.",
      "We always encourage resolving disputes amicably through direct communication before pursuing any legal action."
    ]
  },
  {
    id: 13,
    title: "Changes to These Terms",
    content: [
      "Sikander Arts reserves the right to update or modify these Terms of Service at any time.",
      "Updated terms will be posted on this page with a revised Effective Date.",
      "Continued use of our website or services after changes are posted constitutes your acceptance of the revised terms."
    ]
  },
  {
    id: 14,
    title: "Contact Us",
    content: [
      "Company: Sikander Arts",
      "Location: Karachi, Pakistan",
      "Phone: +92 302 291 10 88",
      "Email: bilal_azeemlab@gmail.com",
      "WhatsApp: +92 3XX XXXXXXX",
      "Working Hours: Monday to Saturday, 9:00 AM to 7:00 PM"
    ]
  }
];

const TermsOfService: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Sikander Arts – Painting Contractor Karachi</title>
        <meta name="description" content="Read the Terms of Service for Sikander Arts. Understand our terms and conditions for painting contractor services in Karachi, Pakistan." />
      </Helmet>

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#fbfbfb] text-gray-800 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6 backdrop-blur-sm"
            >
              <FileText size={32} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tighter"
            >
              Terms of <span className="text-secondary">Service</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-500 font-medium mb-2"
            >
              Sikander Arts – Karachi, Pakistan
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm font-bold uppercase tracking-widest text-secondary/80"
            >
              Effective Date: March 1, 2026
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 mb-12"
            >
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                These Terms of Service govern your use of the Sikander Arts website and your engagement with our professional painting contractor services in Karachi, Pakistan. By accessing our website or hiring our services, you agree to be bound by these terms. Please read them carefully before proceeding.
              </p>
            </motion.div>

            <div className="space-y-8">
              {termsSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-8 md:p-10 rounded-[2rem] shadow-lg border border-gray-50 hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-2xl font-black text-gray-700 mb-6 flex items-center gap-3">
                    <span className="text-secondary text-sm bg-secondary/10 w-8 h-8 rounded-full flex items-center justify-center">{section.id}</span>
                    {section.title}
                  </h2>
                  <ul className="space-y-4">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600 font-medium leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2.5 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-white text-gray-700 border-2 border-primary/10 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} /> Back to Home
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-secondary text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  Contact Us <Mail size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfService;
