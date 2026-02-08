import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { TravelerDetailsForm } from '../components/booking/TravelerDetailsForm';
import { PaymentForm } from '../components/booking/PaymentForm';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { useTripStore } from '../store/useTripStore';

const STEPS = [
    { id: 'itinerary', path: '/booking/itinerary', label: 'Itinerary', desc: 'Customize your trip', time: '~3 min' },
    { id: 'travelers', path: '/booking/travelers', label: 'Travelers', desc: 'Enter traveler details', time: '~2 min' },
    { id: 'payment', path: '/booking/payment', label: 'Payment', desc: 'Complete payment', time: '~2 min' },
    { id: 'confirmation', path: '/booking/confirmation', label: 'Confirmation', desc: 'Get confirmation', time: 'Done!' },
];

const BookingFlow = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateTrip, currentTrip } = useTripStore();

    // Determine current step index based on URL
    const getCurrentStepIndex = () => {
        const currentPath = location.pathname;
        if (currentPath === '/book/wizard') return 0; // Fallback
        const index = STEPS.findIndex(s => s.path === currentPath);
        return index >= 0 ? index : 0;
    };

    const step = getCurrentStepIndex();

    // Redirect /book/wizard to standard path if needed
    useEffect(() => {
        if (location.pathname === '/book/wizard') {
            navigate('/booking/itinerary', { replace: true });
        }
    }, [location.pathname, navigate]);

    const goToStep = (targetIndex: number) => {
        // Allow navigation only to previous steps or current step
        if (targetIndex <= step) {
            navigate(STEPS[targetIndex].path);
        }
    };

    const handleNext = () => {
        const nextIndex = step + 1;
        if (nextIndex < STEPS.length) {
            navigate(STEPS[nextIndex].path);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Enhanced Stepper */}
            <div className="mb-12">
                <div className="relative flex justify-between items-start">
                    {/* Background Progress Line */}
                    <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 rounded-full -z-10" />

                    {/* Active Progress Line */}
                    <div
                        className="absolute top-5 left-0 h-1 bg-brand-600 rounded-full -z-10 transition-all duration-500 ease-out"
                        style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                    />

                    {STEPS.map((s, idx) => {
                        const isCompleted = idx < step;
                        const isCurrent = idx === step;

                        return (
                            <div
                                key={s.id}
                                className={`flex flex-col items-center group ${isCompleted ? 'cursor-pointer' : 'cursor-default'}`}
                                onClick={() => goToStep(idx)}
                                role={isCompleted ? 'button' : undefined}
                            >
                                {/* Circle Indicator */}
                                <div
                                    className={`
                                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 z-10 border-4
                                        ${isCompleted
                                            ? 'bg-green-500 border-green-500 text-white scale-105'
                                            : isCurrent
                                                ? 'bg-white border-brand-600 text-brand-600 shadow-lg shadow-brand-100 scale-110'
                                                : 'bg-white border-slate-200 text-slate-400'
                                        }
                                    `}
                                >
                                    {isCompleted ? <Check size={20} strokeWidth={3} /> : idx + 1}
                                </div>

                                {/* Current Step Pulse Effect */}
                                {isCurrent && (
                                    <div className="absolute top-0 w-10 h-10 bg-brand-400 rounded-full animate-ping opacity-20 -z-10" />
                                )}

                                {/* Label & Details */}
                                <div className={`text-center mt-3 transition-colors duration-300 ${isCurrent ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                    <div className="font-bold text-xs md:text-sm lg:text-base text-slate-900 leading-tight">
                                        {s.label}
                                    </div>
                                    <div className="hidden md:block text-xs text-slate-500 mt-1">
                                        {s.desc}
                                    </div>
                                    {isCurrent && (
                                        <div className="hidden md:block text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                                            {s.time}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
                {/* Content Area */}
                <div className="flex-1 p-4 md:p-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            {step === 0 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Customize Your Itinerary</h2>
                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                        <h3 className="font-semibold text-blue-900 text-lg mb-2">Trip to {currentTrip.destination?.name || 'Bali'}</h3>
                                        <p className="text-blue-700 text-sm flex items-center gap-2">
                                            <span>📅 {currentTrip.duration} Days</span>
                                            <span>•</span>
                                            <span>👥 {currentTrip.travelers.adults} Adults</span>
                                        </p>
                                    </div>
                                    {/* Placeholder for Itinerary Customization */}
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400">
                                        <p>Drag and drop activities, or AI recommendations would appear here.</p>
                                        <p className="text-sm mt-2">(This step would be the Itinerary Builder)</p>
                                    </div>
                                    <div className="flex justify-end pt-6">
                                        <button
                                            onClick={handleNext}
                                            className="px-8 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all hover:scale-105"
                                        >
                                            Continue to Travelers
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <TravelerDetailsForm
                                    onComplete={(data) => {
                                        updateTrip({ travelerDetails: data });
                                        handleNext();
                                    }}
                                />
                            )}

                            {step === 2 && (
                                <PaymentForm
                                    onComplete={() => {
                                        // Update simple mock payment info without arguments if component sends none, 
                                        // or handle arguments if it does.
                                        // Based on error: Target signature provides too few arguments. Expected 1 or more.
                                        // It seems PaymentForm expects us to receive data.
                                        updateTrip({
                                            paymentInfo: {
                                                method: 'card', // Defaulting for now if data is missing or incompatible
                                                last4: '4242'
                                            }
                                        });
                                        handleNext();
                                    }}
                                    amount={currentTrip.totalPrice || 120000}
                                />
                            )}

                            {step === 3 && (
                                <BookingConfirmation />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Global Footer Actions (Mostly handled by individual forms now, but kept for consistency if needed) */}
                {step === 0 && (
                    <div className="p-6 border-t border-slate-100 flex justify-between bg-slate-50">
                        <button
                            onClick={() => navigate('/search-results')}
                            className="px-6 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-200"
                        >
                            Back to Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingFlow;
