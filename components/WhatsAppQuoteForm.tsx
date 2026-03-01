import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Calculator } from 'lucide-react';

const SERVICE_PRICES: Record<string, number> = {
    'Interior Painting': 55,
    'Exterior Painting': 30,
    'Commercial Painting': 45,
    'Waterproofing': 40,
    'Cabinet Refinishing': 80,
    'Door & Window Painting': 70,
    'Wall Designing': 150,
    'Other': 50,
};
const OVERHEAD_PERCENT = 15;

export const WhatsAppQuoteForm: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        email: '',
        service: 'Interior Painting',
        area: '',
        message: ''
    });

    // Live cost calculation based on selected service
    const pricePerSqft = SERVICE_PRICES[formState.service] || 50;
    const estimate = useMemo(() => {
        const sqft = parseFloat(formState.area) || 0;
        const baseCost = sqft * pricePerSqft;
        const overhead = baseCost * (OVERHEAD_PERCENT / 100);
        const total = baseCost + overhead;
        return { sqft, baseCost, overhead, total, pricePerSqft };
    }, [formState.area, pricePerSqft]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isRedirecting, setIsRedirecting] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formState.name.trim()) newErrors.name = 'Name is required';
        if (!formState.phone.trim()) newErrors.phone = 'Phone number is required';

        // Basic email validation if provided
        if (formState.email && !/^\S+@\S+\.\S+$/.test(formState.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsRedirecting(true);

        // Format the message for WhatsApp
        const estimateText = estimate.sqft > 0
            ? `\n\n*--- Cost Estimate ---*\n` +
            `*Area:* ${estimate.sqft.toLocaleString()} sq ft\n` +
            `*Base Cost (Rs ${estimate.pricePerSqft}/sqft):* Rs ${estimate.baseCost.toLocaleString()}\n` +
            `*Overhead (${OVERHEAD_PERCENT}%):* Rs ${estimate.overhead.toLocaleString()}\n` +
            `*Estimated Total:* Rs ${estimate.total.toLocaleString()}`
            : '';

        const message = `*New Quote Request*\n\n` +
            `*Name:* ${formState.name}\n` +
            `*Phone:* ${formState.phone}\n` +
            `*Email:* ${formState.email || 'Not provided'}\n` +
            `*Service Needed:* ${formState.service}` +
            estimateText +
            `\n\n*Project Details:*\n${formState.message || 'Koi aur tafseelat nahi di gayi.'}`;

        // Target WhatsApp Number
        const targetNumber = '+923022911088';
        const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

        // Small delay to show the redirecting state
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setIsRedirecting(false);
            // Optional: reset form after sending
            // setFormState({ name: '', phone: '', email: '', service: 'Interior Painting', area: '', message: '' });
        }, 800);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <AnimatePresence>
                {Object.keys(errors).length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3"
                    >
                        <AlertCircle className="text-red-500 mt-0.5" size={18} />
                        <div>
                            <p className="text-sm font-bold text-red-800">Please fix the following errors:</p>
                            <ul className="text-xs text-red-600 list-disc list-inside mt-1">
                                {Object.values(errors).filter(Boolean).map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name <span className="text-red-400">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 focus:bg-white outline-none transition-all font-bold text-primary ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-secondary'}`}
                        placeholder="e.g. Ali Ahmed"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number <span className="text-red-400">*</span></label>
                    <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className={`w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 focus:bg-white outline-none transition-all font-bold text-primary ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-secondary'}`}
                        placeholder="+92 302 291 10 88"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 focus:bg-white outline-none transition-all font-bold text-primary ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-secondary'}`}
                    placeholder="ali@example.com (Optional)"
                />
            </div>

            <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Service Needed</label>
                <div className="relative">
                    <select
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        aria-label="Service Needed"
                        className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary appearance-none cursor-pointer"
                    >
                        {Object.keys(SERVICE_PRICES).map((service) => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Area & Cost Estimator */}
            <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calculator size={14} className="text-secondary" />
                    Area (Square Feet)
                </label>
                <input
                    type="number"
                    name="area"
                    min="0"
                    value={formState.area}
                    onChange={handleChange}
                    className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary"
                    placeholder="e.g. 1200"
                />
            </div>

            {/* Live Cost Breakdown */}
            <AnimatePresence>
                {estimate.sqft > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-secondary/20 p-6 md:p-8 rounded-2xl space-y-4">
                            <h4 className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                                <Calculator size={14} /> Estimated Cost Breakdown
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Area</span>
                                    <span className="font-black text-primary">{estimate.sqft.toLocaleString()} sq ft</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Base Cost (Rs {estimate.pricePerSqft}/sqft)</span>
                                    <span className="font-black text-primary">Rs {estimate.baseCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Overhead &amp; Expenses ({OVERHEAD_PERCENT}%)</span>
                                    <span className="font-black text-primary">Rs {estimate.overhead.toLocaleString()}</span>
                                </div>
                                <div className="border-t-2 border-dashed border-secondary/30 pt-3 flex justify-between items-center">
                                    <span className="text-primary font-black uppercase tracking-wider text-xs">Estimated Total</span>
                                    <span className="text-2xl font-black text-secondary">Rs {estimate.total.toLocaleString()}</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium mt-2">* Yeh aik andaza hai. Final qeemat site inspection ke baad muqarrar hogi. Darwaze aur khirkiyan deewaaron ke saath calculate ki gayi hain.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Project Details / Tafseelat</label>
                <textarea
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-secondary focus:bg-white outline-none transition-all font-bold text-primary resize-none"
                    placeholder="Apni jagah ke baare mein batayen... jaise kitne kamre hain, konsi manzil hai, koi khaas rang ya design chahiye?"
                ></textarea>
            </div>

            <motion.button
                type="submit"
                disabled={isRedirecting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-primary hover:bg-blue-900 text-white font-black py-6 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm ${isRedirecting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
                {isRedirecting ? (
                    'Opening WhatsApp...'
                ) : (
                    <>
                        Send To WhatsApp <Send size={18} />
                    </>
                )}
            </motion.button>
        </form>
    );
};
