import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star, X, Plus, Calendar, Users, Wallet } from 'lucide-react';
import { useTripStore } from '../store/useTripStore';

// --- Types ---
interface ItineraryActivity {
    id: string;
    name: string;
    time: string;
    duration: string;
    rating: number;
    image?: string;
    category?: string;
}

interface DaySchedule {
    day: number;
    title: string;
    date: string; // Mock date string
    morning: ItineraryActivity[];
    afternoon: ItineraryActivity[];
    evening: ItineraryActivity[];
}

// --- Mock Data ---
const MOCK_ITINERARY: DaySchedule[] = [
    {
        day: 1,
        title: "South Bali - Seminyak & Tanah Lot",
        date: "Mon, Oct 24",
        morning: [
            { id: 'd1_m1', name: 'Seminyak Beach', time: '9:00 AM - 12:00 PM', duration: '3 hours', rating: 4.6, category: 'Beach', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' }
        ],
        afternoon: [
            { id: 'd1_a1', name: 'Tanah Lot Temple', time: '1:00 PM - 3:00 PM', duration: '2 hours', rating: 4.7, category: 'Culture', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1' },
            { id: 'd1_a2', name: 'Explore Canggu Cafes', time: '3:30 PM - 5:30 PM', duration: '2 hours', rating: 4.5, category: 'Food' }
        ],
        evening: [
            { id: 'd1_e1', name: 'Dinner at Warung Biah Biah', time: '6:00 PM - 8:00 PM', duration: '2 hours', rating: 4.8, category: 'Dining' }
        ]
    },
    {
        day: 2,
        title: "Ubud - Culture & Nature",
        date: "Tue, Oct 25",
        morning: [
            { id: 'd2_m1', name: 'Tegallalang Rice Terraces', time: '8:00 AM - 11:00 AM', duration: '3 hours', rating: 4.8, category: 'Nature', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2' }
        ],
        afternoon: [
            { id: 'd2_a1', name: 'Sacred Monkey Forest', time: '2:00 PM - 4:00 PM', duration: '2 hours', rating: 4.5, category: 'Wildlife' },
            { id: 'd2_a2', name: 'Ubud Art Market', time: '4:30 PM - 6:00 PM', duration: '1.5 hours', rating: 4.4, category: 'Shopping' }
        ],
        evening: [
            { id: 'd2_e1', name: 'Locavore Restaurant', time: '7:00 PM - 9:00 PM', duration: '2 hours', rating: 4.9, category: 'Fine Dining' }
        ]
    },
    {
        day: 3,
        title: "North Bali - Waterfalls & Lakes",
        date: "Wed, Oct 26",
        morning: [
            { id: 'd3_m1', name: 'Ulun Danu Beratan Temple', time: '8:30 AM - 10:30 AM', duration: '2 hours', rating: 4.7, category: 'Culture', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47' }
        ],
        afternoon: [
            { id: 'd3_a1', name: 'Banyumala Twin Waterfalls', time: '12:00 PM - 3:00 PM', duration: '3 hours', rating: 4.8, category: 'Adventure' }
        ],
        evening: [
            { id: 'd3_e1', name: 'Relax at Hotel Spa', time: '6:00 PM - 8:00 PM', duration: '2 hours', rating: 4.9, category: 'Wellness' }
        ]
    },
    {
        day: 4,
        title: "East Bali - Gates of Heaven",
        date: "Thu, Oct 27",
        morning: [
            { id: 'd4_m1', name: 'Lempuyang Temple (Gates of Heaven)', time: '7:00 AM - 10:00 AM', duration: '3 hours', rating: 4.6, category: 'Sightseeing' }
        ],
        afternoon: [
            { id: 'd4_a1', name: 'Tirta Gangga Water Palace', time: '12:00 PM - 2:00 PM', duration: '2 hours', rating: 4.7, category: 'History' },
            { id: 'd4_a2', name: 'Virgin Beach', time: '3:00 PM - 5:00 PM', duration: '2 hours', rating: 4.5, category: 'Beach' }
        ],
        evening: [
            { id: 'd4_e1', name: 'Seafood Dinner in Candidasa', time: '7:00 PM - 9:00 PM', duration: '2 hours', rating: 4.6, category: 'Dining' }
        ]
    },
    {
        day: 5,
        title: "Uluwatu - Cliffs & Departure",
        date: "Fri, Oct 28",
        morning: [
            { id: 'd5_m1', name: 'Relax at Padang Padang Beach', time: '9:00 AM - 12:00 PM', duration: '3 hours', rating: 4.6, category: 'Beach' }
        ],
        afternoon: [
            { id: 'd5_a1', name: 'Uluwatu Temple', time: '4:00 PM - 6:00 PM', duration: '2 hours', rating: 4.8, category: 'Culture' }
        ],
        evening: [
            { id: 'd5_e1', name: 'Kecak Fire Dance', time: '6:00 PM - 7:00 PM', duration: '1 hour', rating: 4.9, category: 'Show' },
            { id: 'd5_e2', name: 'Departure Transfer', time: '8:30 PM', duration: '1 hour', rating: 0, category: 'Transit' }
        ]
    }
];

// --- Components ---

const ActivityCard = ({ activity, onRemove }: { activity: ItineraryActivity; onRemove: (id: string) => void }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="group relative bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all flex gap-4 items-start"
    >
        {/* Optional Image */}
        {activity.image && (
            <img src={activity.image} alt={activity.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
        )}

        {/* Connector Line (Visual only, creates timeline feel) */}
        {!activity.image && (
            <div className="w-16 h-16 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-2xl">
                {activity.category === 'Beach' ? '🏖️' :
                    activity.category === 'Culture' ? '⛩️' :
                        activity.category === 'Nature' ? '🌾' :
                            activity.category === 'Food' || activity.category === 'Dining' ? '🍽️' :
                                activity.category === 'Shopping' ? '🛍️' : '📍'}
            </div>
        )}

        <div className="flex-1">
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">{activity.name}</h4>
                <button
                    onClick={() => onRemove(activity.id)}
                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Remove Activity"
                >
                    <X size={16} />
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded">
                    <Clock size={12} className="text-slate-400" /> {activity.time}
                </span>
                <span>•</span>
                <span>{activity.duration}</span>
                {activity.rating > 0 && (
                    <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star size={10} fill="currentColor" /> {activity.rating}
                        </span>
                    </>
                )}
            </div>
        </div>
    </motion.div>
);

const DaySection = ({ day, onDeleteActivity }: { day: DaySchedule; onDeleteActivity: (dayIdx: number, period: 'morning' | 'afternoon' | 'evening', actId: string) => void }) => {
    return (
        <div className="mb-10 last:mb-0">
            {/* Day Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-bold leading-none select-none">
                    {day.day}
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-blue-100 font-medium text-sm mb-1">
                        <Calendar size={14} />
                        DAY {day.day} • {day.date}
                    </div>
                    <h2 className="text-2xl font-bold">{day.title}</h2>
                </div>
            </div>

            {/* Timeline Connector */}
            <div className="border-l-2 border-indigo-100 ml-4 space-y-8 pl-8 pb-4">

                {/* Morning */}
                {day.morning.length > 0 && (
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1 bg-amber-100 text-amber-600 p-1 rounded-full border-4 border-white shadow-sm z-10">
                            <span className="text-xs font-bold block w-4 h-4 text-center leading-4">M</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Morning</h3>
                        <div className="space-y-3">
                            {day.morning.map(act => (
                                <ActivityCard key={act.id} activity={act} onRemove={(id) => onDeleteActivity(day.day, 'morning', id)} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Afternoon */}
                {day.afternoon.length > 0 && (
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1 bg-orange-100 text-orange-600 p-1 rounded-full border-4 border-white shadow-sm z-10">
                            <span className="text-xs font-bold block w-4 h-4 text-center leading-4">A</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Afternoon</h3>
                        <div className="space-y-3">
                            {day.afternoon.map(act => (
                                <ActivityCard key={act.id} activity={act} onRemove={(id) => onDeleteActivity(day.day, 'afternoon', id)} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Evening */}
                {day.evening.length > 0 && (
                    <div className="relative">
                        <div className="absolute -left-[39px] top-1 bg-indigo-100 text-indigo-600 p-1 rounded-full border-4 border-white shadow-sm z-10">
                            <span className="text-xs font-bold block w-4 h-4 text-center leading-4">E</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Evening</h3>
                        <div className="space-y-3">
                            {day.evening.map(act => (
                                <ActivityCard key={act.id} activity={act} onRemove={(id) => onDeleteActivity(day.day, 'evening', id)} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Add Activity Button */}
                <button className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 hover:bg-brand-50 px-4 py-2 rounded-lg transition-colors w-full border border-dashed border-brand-200 justify-center">
                    <Plus size={16} /> Add Activity to Day {day.day}
                </button>
            </div>
        </div>
    );
};

// --- Main Page Component ---

const ItineraryBuilder = () => {
    const { parsedParams } = useTripStore();
    const [itinerary, setItinerary] = useState<DaySchedule[]>(MOCK_ITINERARY);

    const handleDeleteActivity = (dayNum: number, period: 'morning' | 'afternoon' | 'evening', actId: string) => {
        setItinerary(prev => prev.map(day => {
            if (day.day !== dayNum) return day;
            return {
                ...day,
                [period]: day[period].filter(a => a.id !== actId)
            };
        }));
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-12">

            {/* Page Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
                <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="text-brand-600" />
                        Trip to Bali, Indonesia
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="hidden sm:flex items-center gap-1"><Calendar size={14} /> 5 Days</span>
                        <span className="hidden sm:flex items-center gap-1"><Users size={14} /> {parsedParams?.people || 2} Adults</span>
                        <button className="bg-brand-600 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-brand-700 transition-colors">
                            Save Itinerary
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Main Itinerary Content */}
                <div className="lg:col-span-8">
                    {itinerary.map((day) => (
                        <DaySection
                            key={day.day}
                            day={day}
                            onDeleteActivity={handleDeleteActivity}
                        />
                    ))}
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                        <h3 className="font-bold text-slate-900 mb-4 text-lg">Trip Summary</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                <span className="text-slate-500 text-sm">Destinations</span>
                                <span className="font-medium text-slate-900">12 Locations</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                <span className="text-slate-500 text-sm">Est. Duration</span>
                                <span className="font-medium text-slate-900">5 Days</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                <span className="text-slate-500 text-sm">Travelers</span>
                                <span className="font-medium text-slate-900">{parsedParams?.people || 2} Adults</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                                    <Wallet size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider mb-1">Budget Remaining</p>
                                    <p className="text-xl font-bold text-indigo-900">₹1,45,000</p>
                                    <p className="text-xs text-indigo-400 mt-1">out of ₹2,00,000 total</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            <Plus size={18} /> Add More Activities
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryBuilder;
