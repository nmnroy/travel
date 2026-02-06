import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard } from 'lucide-react';

const STEPS = ['Itinerary', 'Travelers', 'Payment', 'Confirmation'];

const BookingFlow = () => {
    const { id } = useParams();
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Stepper */}
            <div className="mb-12 relative flex justify-between">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10" />
                {STEPS.map((s, idx) => (
                    <div key={s} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${idx <= step ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'
                                }`}
                        >
                            {idx < step ? <Check size={18} /> : idx + 1}
                        </div>
                        <span className={`text-sm font-medium ${idx <= step ? 'text-brand-900' : 'text-slate-400'}`}>
                            {s}
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
                {/* Content Area */}
                <div className="flex-1 p-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            {step === 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Customize Your Itinerary</h2>
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <h3 className="font-semibold text-blue-900">Trip to {id?.replace('loc_', '')}</h3>
                                        <p className="text-blue-700 text-sm">5 Days • 2 Adults</p>
                                    </div>
                                    {/* Mock Itinerary items would go here */}
                                    <p className="text-slate-500">Drag and drop activities logic would appear here.</p>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Traveler Details</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                                            <input className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Email</label>
                                            <input className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Payment Method</h2>
                                    <div className="p-6 border-2 border-brand-100 bg-brand-50/30 rounded-xl flex flex-col sm:flex-row items-center gap-4 cursor-pointer hover:bg-brand-50 transition-colors text-center sm:text-left">
                                        <div className="p-3 bg-white rounded-lg shadow-sm">
                                            <CreditCard className="text-brand-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Credit / Debit Card</p>
                                            <p className="text-sm text-slate-500">Secure payment via Stripe (Mock)</p>
                                        </div>
                                        <div className="sm:ml-auto w-5 h-5 rounded-full border-2 border-brand-600 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 bg-brand-600 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="text-center py-10 space-y-6">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <Check size={40} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h2>
                                        <p className="text-slate-500 mt-2">Your trip to Bali is all set. Check your email for tickets.</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 flex justify-between bg-slate-50">
                    <button
                        onClick={prevStep}
                        disabled={step === 0 || step === 3}
                        className="px-6 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Back
                    </button>

                    {step < 3 ? (
                        <button
                            onClick={nextStep}
                            className="px-8 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all hover:scale-105"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            className="px-8 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800"
                        >
                            Download Tickets
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingFlow;
