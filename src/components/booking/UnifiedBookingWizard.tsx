import { useState, useEffect } from 'react';
import { useTripStore } from '../../store/useTripStore';
// import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Train, Car, Hotel, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import type { TransportOption, TransferOption, TravelLocation } from '../../types';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    { id: 'transport', label: 'Transport', icon: Plane },
    { id: 'transfer', label: 'Transfer', icon: Car },
    { id: 'hotel', label: 'Hotel', icon: Hotel },
    { id: 'review', label: 'Review', icon: CheckCircle },
];

export const UnifiedBookingWizard = () => {
    const { currentTrip, updateTrip } = useTripStore();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Data State
    const [transports, setTransports] = useState<TransportOption[]>([]);
    const [transfers, setTransfers] = useState<TransferOption[]>([]);
    const [hotels, setHotels] = useState<TravelLocation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [transportData, transferData, hotelData] = await Promise.all([
                mockApi.getTransportOptions('bali'), // Mock destination
                mockApi.getTransferOptions('bali'),
                mockApi.getLocations('beach'), // Mock category
            ]);
            setTransports(transportData as TransportOption[]);
            setTransfers(transferData as TransferOption[]);
            setHotels(hotelData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1);
        else {
            // Finalize booking
            alert('Booking Confirmed! (Mock)');
            navigate('/');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    const StepContent = () => {
        if (loading) return <div className="p-12 text-center text-slate-400">Loading options...</div>;

        switch (currentStep) {
            case 0: // Transport
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Select Transport to Destination</h2>
                        {transports.map(option => (
                            <div
                                key={option.id}
                                onClick={() => updateTrip({ transport: option })}
                                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${currentTrip.transport?.id === option.id ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' : 'border-slate-200 hover:border-brand-200'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${option.type === 'flight' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {option.type === 'flight' ? <Plane size={24} /> : <Train size={24} />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{option.provider}</div>
                                        <div className="text-sm text-slate-500">{option.departureTime} - {option.arrivalTime} ({option.duration})</div>
                                    </div>
                                </div>
                                <div className="font-bold text-lg">${option.price}</div>
                            </div>
                        ))}
                    </div>
                );
            case 1: // Transfer
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Airport/Station Pickup</h2>
                        {transfers.map(option => (
                            <div
                                key={option.id}
                                onClick={() => updateTrip({ transfer: option })}
                                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${currentTrip.transfer?.id === option.id ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' : 'border-slate-200 hover:border-brand-200'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-green-100 text-green-600">
                                        <Car size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{option.vehicleType}</div>
                                        <div className="text-sm text-slate-500">{option.type} • {option.duration}</div>
                                    </div>
                                </div>
                                <div className="font-bold text-lg">${option.price}</div>
                            </div>
                        ))}
                    </div>
                );
            case 2: // Hotel
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hotels.slice(0, 4).map(option => (
                            <div
                                key={option.id}
                                onClick={() => updateTrip({ hotel: option })}
                                className={`group relative overflow-hidden rounded-xl border cursor-pointer transition-all ${currentTrip.hotel?.id === option.id ? 'border-brand-500 ring-2 ring-brand-500' : 'border-slate-200'}`}
                            >
                                <div className="aspect-video bg-slate-100">
                                    <img src={option.images[0]} alt={option.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold">{option.name}</h3>
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm">★ {option.rating}</div>
                                </div>
                                {currentTrip.hotel?.id === option.id && (
                                    <div className="absolute top-2 right-2 bg-brand-600 text-white p-1 rounded-full">
                                        <CheckCircle size={16} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case 3: // Review
                return (
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                            <h3 className="font-bold text-lg border-b pb-2">Trip Summary</h3>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Transport ({currentTrip.transport?.provider})</span>
                                <span className="font-medium">${currentTrip.transport?.price || 0}</span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Transfer ({currentTrip.transfer?.vehicleType})</span>
                                <span className="font-medium">${currentTrip.transfer?.price || 0}</span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500">Hotel ({currentTrip.hotel?.name})</span>
                                <span className="font-medium">$850 (Est.)</span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-2xl text-brand-600">${currentTrip.totalPrice + (currentTrip.hotel ? 850 : 0)}</span>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Stepper */}
                <div className="flex items-center justify-between mb-8 px-4 sm:px-12">
                    {STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isActive = idx === currentStep;
                        const isCompleted = idx < currentStep;
                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-brand-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-white text-slate-300 border-2 border-slate-200'}`}>
                                    {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                                </div>
                                <span className={`text-sm font-medium ${isActive ? 'text-brand-900' : 'text-slate-400'}`}>{step.label}</span>
                            </div>
                        );
                    })}
                    {/* Progress Line - Simplified for this fixed layout */}
                    <div className="absolute left-0 right-0 top-16 h-0.5 bg-slate-200 -z-0 hidden" />
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                    <div className="flex-1 p-8">
                        <StepContent />
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                        >
                            <ChevronLeft size={20} /> Back
                        </button>

                        <div className="text-right">
                            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Total Est.</div>
                            <div className="text-2xl font-bold text-slate-900">${currentTrip.totalPrice + (currentTrip.hotel ? 850 : 0)}</div>
                        </div>

                        <button
                            onClick={handleNext}
                            className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-shadow shadow-lg shadow-brand-200 flex items-center gap-2"
                        >
                            {currentStep === STEPS.length - 1 ? 'Confirm Booking' : 'Continue'} <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
