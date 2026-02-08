import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Users, Plane, Hotel, CreditCard, Mail, Download, Share2, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookingConfirmation = () => {
    // Generate random booking ID
    const bookingId = useRef(`TRV-BAL-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`).current;

    // Mock Dates
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 30); // 30 days from now
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 5);

    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    // Confetti / Celebration effect on mount
    useEffect(() => {
        // You could add a canvas confetti library here if available, 
        // for now we'll rely on the CSS animations.
    }, []);

    const handleDownload = () => alert("Downloading tickets... (Mock)");
    const handleEmail = () => alert("Tickets emailed to your inbox! (Mock)");
    const handleCalendar = () => alert("Added to your calendar! (Mock)");

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">

            {/* Success Header */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-center space-y-4 py-8"
            >
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm relative z-10">
                        <Check size={48} strokeWidth={3} className="animate-in zoom-in duration-500 delay-200" />
                    </div>
                    <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Booking Confirmed!</h1>
                    <p className="text-slate-600 mt-2 text-lg">Your trip to Bali is all set!</p>
                    <div className="mt-4 inline-block bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 font-mono text-sm text-slate-600">
                        Booking ID: <span className="font-bold text-slate-900 select-all">{bookingId}</span>
                    </div>
                </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Trip Details Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2 font-bold text-slate-700">
                        <Calendar size={18} className="text-brand-600" /> TRIP DETAILS
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500 text-sm">Destination</span>
                            <span className="font-bold text-slate-900">Bali, Indonesia</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500 text-sm">Duration</span>
                            <span className="font-bold text-slate-900">5 Days, 4 Nights</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-50 pb-2">
                            <span className="text-slate-500 text-sm">Travelers</span>
                            <span className="font-bold text-slate-900">2 Adults</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 text-sm">Dates</span>
                            <span className="font-bold text-slate-900">{formatDate(startDate)} - {formatDate(endDate)}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Flight Details Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2 font-bold text-slate-700">
                        <Plane size={18} className="text-blue-600" /> FLIGHT DETAILS
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="relative pl-6 border-l-2 border-slate-200">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <p className="text-xs font-bold text-slate-500 uppercase">Outbound • {formatDate(startDate)}</p>
                            <div className="flex justify-between items-start mt-1">
                                <div>
                                    <p className="font-bold text-slate-900">DEL → DPS</p>
                                    <p className="text-xs text-slate-500">06:30 AM • Air India AI-335</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative pl-6 border-l-2 border-slate-200">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <p className="text-xs font-bold text-slate-500 uppercase">Return • {formatDate(endDate)}</p>
                            <div className="flex justify-between items-start mt-1">
                                <div>
                                    <p className="font-bold text-slate-900">DPS → DEL</p>
                                    <p className="text-xs text-slate-500">10:45 PM • Air India AI-336</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Hotel Details Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2 font-bold text-slate-700">
                        <Hotel size={18} className="text-orange-600" /> ACCOMMODATION
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <p className="font-bold text-slate-900 text-lg">Padma Resort Ubud</p>
                            <p className="text-sm text-slate-500">Banjar Carik, Desa Puhu Payangan, Ubud</p>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 text-xs font-medium text-slate-600">
                                <span>Check-in:</span>
                                <span className="font-bold text-slate-900">2:00 PM</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 text-xs font-medium text-slate-600">
                                <span>Check-out:</span>
                                <span className="font-bold text-slate-900">11:00 AM</span>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-slate-50 text-sm flex justify-between">
                            <span className="text-slate-500">Room Type</span>
                            <span className="font-medium text-slate-900">Deluxe Double with Valley View</span>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Summary Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2 font-bold text-slate-700">
                        <CreditCard size={18} className="text-green-600" /> PAYMENT SUMMARY
                    </div>
                    <div className="p-6 space-y-2">
                        <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-100 mb-4">
                            <span className="text-green-700 font-medium">Total Paid</span>
                            <span className="text-green-800 font-bold text-lg">₹1,37,100</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Payment Method</span>
                            <span className="font-medium text-slate-900">Credit Card (**** 3456)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Payment Status</span>
                            <span className="font-bold text-green-600 flex items-center gap-1">
                                <Check size={14} strokeWidth={3} /> Confirmed
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Transaction ID</span>
                            <span className="font-mono text-slate-600">TXN-2024-98765</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Email Notice */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3"
            >
                <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm">
                    <Mail size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-blue-900 text-sm">Confirmation email sent</h4>
                    <p className="text-blue-700 text-sm">We've sent the booking details and tickets to <span className="font-medium">john@example.com</span>. Please check your spam folder if you don't see it.</p>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
            >
                <button
                    onClick={handleDownload}
                    className="w-full sm:w-auto flex-1 min-w-[200px] py-3 px-6 bg-brand-600 text-white rounded-xl font-bold font-medium shadow-lg shadow-brand-200 hover:bg-brand-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                    <Download size={18} /> Download Tickets
                </button>
                <button
                    onClick={handleEmail}
                    className="w-full sm:w-auto flex-1 min-w-[200px] py-3 px-6 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Mail size={18} /> Email Tickets
                </button>
                <button
                    onClick={handleCalendar}
                    className="w-full sm:w-auto flex-1 min-w-[200px] py-3 px-6 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <Calendar size={18} /> Add to Calendar
                </button>
            </motion.div>

            <div className="text-center pt-8">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium transition-colors">
                    <Home size={16} /> Back to Home
                </Link>
            </div>

            {/* What's Next Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="border-t border-slate-100 pt-10 mt-6"
            >
                <h3 className="text-center font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">What's Next?</h3>
                <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
                    {[
                        'Download your tickets',
                        'Check visa requirements',
                        'Review your itinerary',
                        'Pack your bags!'
                    ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">
                                <Check size={14} />
                            </div>
                            <span className="text-slate-700 font-medium">{step}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
};
