import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, ChevronRight, Utensils, Users, User, Heart, Baby, Car, Clock, MapPin, X } from 'lucide-react';
import { useTripStore } from '../store/useTripStore';
import { DiscoveryPersonalization } from '../services/discoveryPersonalization';
import { ProximityService } from '../services/proximityService';
import CulturalDiscovery from '../components/core/CulturalDiscovery';
import type { GroupType, Activity } from '../types';

const DAY_SCHEDULES: Record<number, Activity[]> = {
    1: [
        { id: 'd1_1', name: 'Arrival & Check-in', description: 'Check into your hotel and relax.', category: 'fast', duration: 1, price: 0, locationId: 'seminyak', image: '' },
        { id: 'd1_2', name: 'Sunset at Tanah Lot', description: 'Watch the iconic sunset at the sea temple.', category: 'culture', duration: 2, price: 20, locationId: 'tabanan', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
        { id: 'd1_3', name: 'Seafood Dinner at Jimbaran', description: 'Enjoy fresh seafood on the beach.', category: 'food', duration: 2, price: 50, locationId: 'jimbaran', image: '' },
    ],
    2: [
        { id: 'd2_1', name: 'Tegalalang Rice Terrace', description: 'Walk through the famous rice paddies.', category: 'nature', duration: 2, price: 10, locationId: 'ubud', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2' },
        { id: 'd2_2', name: 'Sacred Monkey Forest', description: 'Visit the sanctuary of the long-tailed macaques.', category: 'adventure', duration: 1.5, price: 15, locationId: 'ubud', image: '' },
        { id: 'd2_3', name: 'Ubud Royal Palace', description: 'Explore the historical palace.', category: 'culture', duration: 1, price: 5, locationId: 'ubud', image: '' },
        { id: 'd2_4', name: 'Campuhan Ridge Walk', description: 'Scenic nature walk.', category: 'nature', duration: 1.5, price: 0, locationId: 'ubud', image: '' },
    ],
    3: [
        { id: 'd3_1', name: 'Ulun Danu Beratan Temple', description: 'Iconic temple on the lake.', category: 'culture', duration: 1.5, price: 10, locationId: 'bedugul', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47' },
        { id: 'd3_2', name: 'Handara Gate', description: 'Famous Instagram spot.', category: 'sightseeing', duration: 0.5, price: 5, locationId: 'bedugul', image: '' },
        { id: 'd3_3', name: 'Banyumala Twin Waterfalls', description: 'Swim in the crystal clear waters.', category: 'nature', duration: 2, price: 10, locationId: 'wanagiri', image: '' },
    ],
    4: [
        { id: 'd4_1', name: 'Visit Uluwatu Temple', description: 'Temple on a cliff with ocean views.', category: 'culture', duration: 2, price: 50, locationId: 'uluwatu', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47' },
        { id: 'd4_2', name: 'Lunch at Single Fin', description: 'Great food with a view.', category: 'food', duration: 1.5, price: 30, locationId: 'uluwatu', image: '' },
        { id: 'd4_3', name: 'Padang Padang Beach', description: 'Beautiful beach for swimming.', category: 'beach', duration: 3, price: 0, locationId: 'uluwatu', image: '' },
        { id: 'd4_4', name: 'Kecak Fire Dance', description: 'Traditional dance performance at sunset.', category: 'show', duration: 1, price: 15, locationId: 'uluwatu', image: '' },
    ]
};

const UNLOCKABLE_ACTIVITIES: Activity[] = [
    { id: 'u1', name: 'Nusa Penida Day Trip', description: 'Explore Kelingking Beach, Broken Beach, and Angel\'s Billabong.', category: 'adventure', duration: 8, price: 100, locationId: 'nusa', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
    { id: 'u2', name: 'Ubud Art Market', description: 'Shop for local crafts and souvenirs.', category: 'shopping', duration: 2, price: 0, locationId: 'ubud', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80' },
];

const GROUP_TYPES: { id: GroupType; icon: any; label: string }[] = [
    { id: 'solo', icon: User, label: 'Solo' },
    { id: 'couple', icon: Heart, label: 'Couple' },
    { id: 'family', icon: Baby, label: 'Family' },
    { id: 'friends', icon: Users, label: 'Friends' },
];

const CommuteGuide = ({ activityCount }: { activityCount: number }) => {
    const commute = ProximityService.getCommuteInfo(activityCount);

    return (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
                    {commute.method === 'Scooter' ? <Car size={20} /> : <Car size={20} />}
                </div>
                <div>
                    <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Transit Guide</p>
                    <p className="font-bold text-slate-800 text-sm">Best Way: {commute.method}</p>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm border-l border-indigo-200 pl-4">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Approx Cost</span>
                    <span className="font-bold text-slate-900">₹{commute.cost}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Travel Time</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Clock size={12} /> {commute.duration}
                    </span>
                </div>
            </div>
        </div>
    );
};

const ItineraryBuilder = () => {
    const { parsedParams } = useTripStore();
    const [duration, setDuration] = useState(parsedParams?.duration || 4);
    const [selectedDay, setSelectedDay] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [customActivities, setCustomActivities] = useState<Record<number, Activity[]>>({});
    const [newActivity, setNewActivity] = useState({
        name: '',
        description: '',
        duration: 1,
        price: 0,
        category: 'sightseeing' as Activity['category']
    });

    // Default group type from store or default to couple
    const [groupType, setGroupType] = useState<GroupType>(parsedParams?.groupType || 'couple');

    // Get personalized restaurants
    const recommendedRestaurants = useMemo(() => {
        return DiscoveryPersonalization.filterRestaurants(groupType, parsedParams?.preferences);
    }, [groupType, parsedParams?.preferences]);

    const personalizationTip = useMemo(() => DiscoveryPersonalization.getPersonalizedTips(groupType), [groupType]);

    // Use Proximity Service to "group" or at least visualize proximity
    // For this mock, we pretend the activities for Day 1 are "Proximity Group 1"
    // Determine activities for the current day
    const currentDayActivities = useMemo(() => {
        let baseActivities: Activity[];
        if (selectedDay > 4) {
            // Distribute unlockable activities across extra days if needed
            baseActivities = selectedDay === 5 ? [UNLOCKABLE_ACTIVITIES[0]] : [UNLOCKABLE_ACTIVITIES[1]];
        } else {
            baseActivities = DAY_SCHEDULES[selectedDay] || DAY_SCHEDULES[1];
        }
        // Append custom activities for this day
        const custom = customActivities[selectedDay] || [];
        return [...baseActivities, ...custom];
    }, [selectedDay, customActivities]);
    const activityGroups = useMemo(() => ProximityService.groupActivitiesByProximity(currentDayActivities), [currentDayActivities]);

    const handleGroupChange = (type: GroupType) => {
        setGroupType(type);
    };

    const handleAddActivity = () => {
        if (!newActivity.name.trim()) return;

        const activity: Activity = {
            id: `custom_${Date.now()}`,
            name: newActivity.name,
            description: newActivity.description,
            duration: newActivity.duration,
            price: newActivity.price,
            category: newActivity.category,
            locationId: 'custom',
            image: ''
        };

        setCustomActivities(prev => ({
            ...prev,
            [selectedDay]: [...(prev[selectedDay] || []), activity]
        }));

        // Reset form
        setNewActivity({
            name: '',
            description: '',
            duration: 1,
            price: 0,
            category: 'sightseeing'
        });
        setShowAddModal(false);
    };

    return (
        <div className="container mx-auto max-w-6xl py-8 px-4">
            {/* Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Itinerary Planner</h1>
                    <p className="text-slate-500">Customize your {duration}-day trip to Bali</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    {/* Group Type Selector */}
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex items-center">
                        {GROUP_TYPES.map(type => (
                            <button
                                key={type.id}
                                onClick={() => handleGroupChange(type.id)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${groupType === type.id
                                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                                title={type.label}
                            >
                                <type.icon size={16} />
                                <span className="hidden sm:inline">{type.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Duration Comparator Toggle */}
                    <div className="flex items-center bg-white rounded-xl shadow-sm border border-slate-200 p-1 relative">
                        <button
                            onClick={() => setDuration(4)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${duration === 4 ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            4 Days
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
                                                <span className="text-sm font-medium text-indigo-900">{u.name}</span>
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
                <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
                    {/* Itinerary Activities */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Calendar size={20} className="text-brand-600" />
                                Day {selectedDay} Itinerary
                            </h2>
                            {personalizationTip && (
                                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 hidden sm:block">
                                    {personalizationTip}
                                </span>
                            )}
                        </div>

                        <div className="relative border-l-2 border-slate-100 pl-8 space-y-8 ml-4">
                            {/* Inject mock extra activities for days 5 & 6 */}
                            {/* Render Activities Grouped */}
                            {activityGroups.map((group, groupIdx) => (
                                <div key={groupIdx} className="mb-4 relative">
                                    {group.length > 1 && (
                                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-100 rounded-full" />
                                    )}
                                    {group.map((act: any, idx) => (
                                        <motion.div
                                            key={act.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="relative group cursor-pointer mb-4 last:mb-0"
                                        >
                                            {/* Timeline dot */}
                                            <div className={`absolute -left-[41px] top-2 w-5 h-5 bg-white border-2 rounded-full z-10 transition-colors ${selectedDay > 4 ? 'border-yellow-400 group-hover:bg-yellow-400' : 'border-brand-400 group-hover:bg-brand-400'}`} />

                                            <div className={`rounded-xl border transition-all overflow-hidden ${selectedDay > 4 ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 border-slate-200 hover:border-brand-200 hover:shadow-md'}`}>
                                                {/* Image Header if available */}
                                                {act.image && (
                                                    <div className="h-40 w-full relative">
                                                        <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                        <span className="absolute bottom-2 left-4 text-white font-bold text-lg text-shadow-sm">{act.name}</span>
                                                    </div>
                                                )}

                                                <div className="p-4">
                                                    {!act.image && (
                                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{act.name}</h3>
                                                    )}

                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-sm font-bold text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                                                            {idx === 0 ? '10:00 AM' : '01:00 PM'}
                                                        </span>
                                                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                                            <Clock size={12} /> {act.duration}h
                                                        </span>
                                                    </div>

                                                    {act.description && (
                                                        <p className="text-sm text-slate-600 mb-3">{act.description}</p>
                                                    )}

                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize 
                                     ${act.category === 'food' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}
                                   `}>
                                                            {act.category}
                                                        </span>
                                                        {group.length > 1 && (
                                                            <span className="flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100">
                                                                <MapPin size={10} /> Near {group[0].id === act.id ? 'next stop' : group[0].name.split(' ').slice(0, 2).join(' ')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ))}

                            {selectedDay <= 4 && (
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-2 w-5 h-5 bg-white border-2 border-slate-300 rounded-full" />
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:text-brand-600 hover:border-brand-300 hover:bg-brand-50 transition-all flex items-center justify-center gap-2 font-medium"
                                    >
                                        <Plus size={20} />
                                        Add Activity
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Commute Guide Component */}
                        <CommuteGuide activityCount={currentDayActivities.length} />
                    </div>

                    {/* Local Food Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                                <Utensils size={20} className="text-orange-500" />
                                Local Food & Dining
                            </h2>
                            <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-full">
                                Curated for: <span className="capitalize text-slate-600">{groupType}</span>
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendedRestaurants.map((restaurant, idx) => (
                                <motion.div
                                    key={restaurant.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                                >
                                    <div className="h-32 bg-slate-200 relative overflow-hidden">
                                        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
                                            {restaurant.tags.includes('iconic') && (
                                                <span className="text-[10px] font-bold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full shadow-sm">
                                                    Iconic
                                                </span>
                                            )}
                                            {restaurant.tags.includes('vegetarian') && (
                                                <span className="text-[10px] font-bold bg-green-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                                                    Veg
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{restaurant.name}</h3>
                                            <span className="text-xs font-bold text-orange-600 flex items-center gap-0.5">
                                                ★ {restaurant.rating}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-2">{restaurant.cuisine} • {restaurant.priceLevel}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {restaurant.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Cultural Events & Volunteering */}
                    <CulturalDiscovery locationId="bali" />
                </div>
            </div>

            {/* Add Activity Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900">Add Custom Activity</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-slate-400" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Activity Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newActivity.name}
                                        onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                                        placeholder="e.g., Yoga Session"
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={newActivity.description}
                                        onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                                        placeholder="Brief description of the activity"
                                        rows={3}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Duration (hours)
                                        </label>
                                        <input
                                            type="number"
                                            min="0.5"
                                            step="0.5"
                                            value={newActivity.duration}
                                            onChange={(e) => setNewActivity({ ...newActivity, duration: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={newActivity.price}
                                            onChange={(e) => setNewActivity({ ...newActivity, price: parseInt(e.target.value) })}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={newActivity.category}
                                        onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value as Activity['category'] })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                                    >
                                        <option value="sightseeing">Sightseeing</option>
                                        <option value="adventure">Adventure</option>
                                        <option value="culture">Culture</option>
                                        <option value="nature">Nature</option>
                                        <option value="food">Food</option>
                                        <option value="beach">Beach</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="show">Show/Performance</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddActivity}
                                        disabled={!newActivity.name.trim()}
                                        className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add Activity
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ItineraryBuilder;
