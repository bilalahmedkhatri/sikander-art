import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';

interface PolicySection {
  id: number;
  title: string;
  content: string[];
}

const policySections: PolicySection[] = [
  {
    id: 1,
    title: "Information We Collect",
    content: [
      "Personal Identification Information: Your full name, phone number, email address, and home or office address when you fill out our contact form or request a free quote.",
      "Project Information: Details about your property such as property type, location in Karachi, approximate area in square feet, and the type of painting service you require.",
      "Communication Records: Any messages, inquiries, or project details you share with us via our contact form, WhatsApp, phone call, or email.",
      "Technical Information: Basic website usage data such as your browser type, device type, IP address, and pages visited, collected automatically through standard web technologies."
    ]
  },
  {
    id: 2,
    title: "How We Use Your Information",
    content: [
      "To respond to your inquiries and provide you with painting service quotes and consultations.",
      "To schedule and conduct free site visits at your property in Karachi.",
      "To communicate with you about your project, provide updates, and follow up after service completion.",
      "To improve our website, services, and overall customer experience.",
      "To send occasional service updates or promotional offers related to painting services — only if you have opted in.",
      "To maintain our internal business records and project database.",
      "We do not use your information for any purpose outside of providing and improving our painting contractor services."
    ]
  },
  {
    id: 3,
    title: "How We Protect Your Information",
    content: [
      "We take the security of your personal information seriously. Sikander Arts implements appropriate technical and organizational measures to protect your data against unauthorized access, loss, misuse, or disclosure.",
      "Your personal details shared through our website or communication channels are used only by authorized members of our team and are never shared with third parties for marketing purposes."
    ]
  },
  {
    id: 4,
    title: "Sharing of Information",
    content: [
      "Sikander Arts does not sell, rent, or trade your personal information to any third party.",
      "With our internal team members (painters, supervisors, project managers) solely for the purpose of delivering your requested painting service.",
      "With trusted service providers who assist us in operating our website or business, under strict confidentiality.",
      "When required by law or legal process in Pakistan.",
      "We do not share your information with any advertising company, data broker, or unrelated third party."
    ]
  },
  {
    id: 5,
    title: "Cookies and Website Tracking",
    content: [
      "Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.",
      "Cookies are small text files stored on your device. You can choose to disable cookies through your browser settings; however, this may affect some functionality of our website.",
      "We do not use cookies to collect sensitive personal information."
    ]
  },
  {
    id: 6,
    title: "Third-Party Links",
    content: [
      "Our website may contain links to third-party platforms such as Facebook, Instagram, Google Maps, or WhatsApp.",
      "Sikander Arts is not responsible for the privacy practices of these external platforms. We encourage you to read their respective privacy policies before sharing any personal information."
    ]
  },
  {
    id: 7,
    title: "Children's Privacy",
    content: [
      "Our website and services are not directed at children under the age of 13.",
      "We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will delete it promptly."
    ]
  },
  {
    id: 8,
    title: "Your Rights",
    content: [
      "Request access to the personal information we hold about you.",
      "Request correction of any inaccurate or outdated information.",
      "Request deletion of your personal data from our records.",
      "Opt out of any promotional communications from us at any time.",
      "To exercise any of these rights, please contact us directly using the information provided below."
    ]
  },
  {
    id: 9,
    title: "Data Retention",
    content: [
      "We retain your personal information only for as long as necessary to fulfill the purpose for which it was collected — primarily for the duration of your project and a reasonable period afterward for business record-keeping.",
      "When your data is no longer needed, it is securely deleted from our systems."
    ]
  },
  {
    id: 10,
    title: "Changes to This Privacy Policy",
    content: [
      "Sikander Arts reserves the right to update or modify this Privacy Policy at any time.",
      "Any changes will be posted on this page with an updated Last Updated date. We encourage you to review this page periodically to stay informed about how we protect your information."
    ]
  },
  {
    id: 11,
    title: "Contact Us",
    content: [
      "Company: Sikander Arts",
      "Location: Karachi, Pakistan",
      "Phone: +92 302 291 10 88",
      "Email: ghulamsikandar13@gmail.com",
      "WhatsApp: +92 302 291 10 88",
      "Working Hours: Monday to Saturday, 9:00 AM to 7:00 PM"
    ]
  }
];

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Sikander Arts – Painting Contractor Karachi</title>
        <meta name="description" content="Read Sikander Arts' Privacy Policy. Learn how we collect, use, and protect your personal information. Karachi-based professional painting contractor." />
      </Helmet>

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#fbfbfb] text-gray-900 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6 backdrop-blur-sm"
            >
              <ShieldCheck size={32} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tighter"
            >
              Privacy <span className="text-secondary">Policy</span>
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
              Last Updated: January 1, 2025
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
                Welcome to Sikander Arts. We are a professional painting contractor company based in Karachi, Pakistan. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website or contact us for our painting services.
              </p>
            </motion.div>

            <div className="space-y-8">
              {policySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-8 md:p-10 rounded-[2rem] shadow-lg border border-gray-50 hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
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
                  className="w-full sm:w-auto bg-white text-gray-800 border-2 border-primary/10 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} /> Back to Home
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-secondary text-gray-900 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
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

export default PrivacyPolicy;
