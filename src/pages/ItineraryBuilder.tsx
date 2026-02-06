import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Calendar, Plus, ChevronRight } from 'lucide-react';

const MOCK_ACTIVITIES = [
    { id: 'a1', time: '09:00 AM', title: 'Visit Uluwatu Temple', type: 'culture', duration: '2h' },
    { id: 'a2', time: '12:00 PM', title: 'Lunch at Single Fin', type: 'food', duration: '1.5h' },
    { id: 'a3', time: '02:00 PM', title: 'Padang Padang Beach', type: 'beach', duration: '3h' },
    { id: 'a4', time: '06:00 PM', title: 'Kecak Fire Dance', type: 'show', duration: '1h' },
];

const UNLOCKABLE_ACTIVITIES = [
    { id: 'u1', title: 'Nusa Penida Day Trip', type: 'adventure', image: 'https://images.unsplash.com/photo-1596395818837-7798361e69cc' },
    { id: 'u2', title: 'Ubud Art Market', type: 'shopping', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a' },
];

const ItineraryBuilder = () => {
    const [duration, setDuration] = useState(4);
    const [selectedDay, setSelectedDay] = useState(1);

    return (
        <div className="container mx-auto max-w-6xl py-8 px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Itinerary Planner</h1>
                    <p className="text-slate-500">Customize your {duration}-day trip to Bali</p>
                </div>

                {/* Duration Comparator Toggle */}
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-slate-200 p-1 relative">
                    <button
                        onClick={() => setDuration(4)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${duration === 4 ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        4 Days (Standard)
                    </button>
                    <button
                        onClick={() => setDuration(6)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${duration === 6 ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        6 Days
                        <span className={`text-xs px-1.5 rounded-full font-bold ${duration === 6 ? 'bg-white text-brand-600' : 'bg-yellow-100 text-yellow-700'}`}>+2</span>
                    </button>

                    {/* Value Badge Tooltip */}
                    {duration === 4 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-16 right-0 bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs w-64 z-20 pointer-events-none"
                        >
                            <div className="font-bold text-yellow-400 mb-1">✨ Best Value</div>
                            For just ₹5,000 more, you unlock Nusa Penida & Ubud markets!
                            <div className="absolute -top-1 right-10 w-2 h-2 bg-slate-900 rotate-45" />
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar: Days & Stats */}
                <div className="space-y-6 order-2 lg:order-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4 px-2">Trip Timeline</h3>
                        <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-hide">
                            {Array.from({ length: duration }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDay(i + 1)}
                                    className={`shrink-0 flex items-center justify-between p-3 rounded-xl transition-all whitespace-nowrap lg:w-full ${selectedDay === i + 1
                                        ? 'bg-brand-50 text-brand-700 border border-brand-200'
                                        : 'text-slate-600 hover:bg-slate-50 border border-transparent custom-hover-border'
                                        }`}
                                >
                                    <span className="font-medium">Day {i + 1}</span>
                                    {i >= 4 ? (
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold ml-2">Bonus</span>
                                    ) : (
                                        <ChevronRight size={16} className="hidden lg:block text-slate-300" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Unlockable Content Notice */}
                    <AnimatePresence>
                        {duration === 4 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-5 rounded-2xl relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                                        <span className="text-xl">🔓</span> Extend to 6 Days?
                                    </h4>
                                    <p className="text-sm text-indigo-700 mb-4">Reduce travel fatigue and visit:</p>
                                    <div className="space-y-3">
                                        {UNLOCKABLE_ACTIVITIES.map(u => (
                                            <div key={u.id} className="flex items-center gap-3 bg-white/60 p-2 rounded-lg shadow-sm">
                                                <img src={u.image} alt="" className="w-10 h-10 rounded-md object-cover" />
                                                <span className="text-sm font-medium text-indigo-900">{u.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setDuration(6)}
                                        className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                    >
                                        Unlock for ₹5,000
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Timeline View */}
                <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[500px]">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Calendar size={20} className="text-brand-600" />
                            Day {selectedDay} Itinerary
                        </h2>

                        <div className="relative border-l-2 border-slate-100 pl-8 space-y-8 ml-4">
                            {/* Inject mock extra activities for days 5 & 6 */}
                            {(selectedDay > 4 ? UNLOCKABLE_ACTIVITIES.map((act, _idx) => ({ ...act, time: '10:00 AM', duration: '4h' })) : MOCK_ACTIVITIES).map((act: any, idx) => (
                                <motion.div
                                    key={act.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative group cursor-pointer"
                                >
                                    {/* Timeline dot */}
                                    <div className={`absolute -left-[41px] top-2 w-5 h-5 bg-white border-2 rounded-full z-10 transition-colors ${selectedDay > 4 ? 'border-yellow-400 group-hover:bg-yellow-400' : 'border-brand-400 group-hover:bg-brand-400'}`} />

                                    <div className={`p-4 rounded-xl border transition-all ${selectedDay > 4 ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 border-slate-200 hover:border-brand-200 hover:shadow-md'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-bold text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm">
                                                {act.time || '10:00 AM'}
                                            </span>
                                            <span className="text-xs font-medium text-slate-400">{act.duration}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{act.title}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize 
                         ${act.type === 'food' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}
                       `}>
                                                {act.type}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {selectedDay <= 4 && (
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-2 w-5 h-5 bg-white border-2 border-slate-300 rounded-full" />
                                    <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50 transition-all flex items-center justify-center gap-2 font-medium">
                                        <Plus size={20} />
                                        Add Activity
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryBuilder;
