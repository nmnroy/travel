import { useEffect, useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { mockApi } from '../services/mockApi';
import type { TravelLocation } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plane, Hotel, Utensils, Map, LayoutGrid, Check, Star, Filter, ToggleLeft, ToggleRight, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TABS = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'experiences', label: 'Experiences', icon: Map },
    { id: 'food', label: 'Food', icon: Utensils },
];

const SearchResults = () => {
    const { query, parsedParams, isBudgetOptimized, setBudgetOptimized } = useTripStore();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    // Data State
    const [locations, setLocations] = useState<TravelLocation[]>([]);
    const [flights, setFlights] = useState<any[]>([]);
    const [hotels, setHotels] = useState<any[]>([]);
    const [restaurants, setRestaurants] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [locs, fls, hts, rests] = await Promise.all([
                    mockApi.searchLocations(parsedParams.destination || query),
                    mockApi.getFlights(parsedParams.destination || 'DPS'),
                    mockApi.getHotels(parsedParams.destination || 'DPS'),
                    mockApi.getRestaurants(parsedParams.destination || 'DPS'),
                ]);
                setLocations(locs);
                setFlights(fls);
                setHotels(hts);
                setRestaurants(rests);
            } catch (err) {
                console.error("Failed to load search data", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [query, parsedParams]);

    // Derived State for Budget
    const baseTotal = 162100; // Calculated based on defaults
    const discount = 25000;
    const finalTotal = isBudgetOptimized ? baseTotal - discount : baseTotal;

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 min-h-screen">

            {/* 1. SEARCH SUMMARY HEADER */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        Results for: <span className="text-brand-600 capitalize">{parsedParams.destination || query || 'Bali'}</span>
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mt-2">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {parsedParams.duration || 6} days</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>{parsedParams.people || 2} travelers</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>Budget: ₹{parsedParams.budget || '1.5L'}</span>
                    </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors">
                    Edit Search
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT CONTENT AREA */}
                <div className="flex-1">

                    {/* 2. TABS */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all
                                        ${isActive
                                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                                        }
                                    `}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* TAB CONTENT */}
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* OVERVIEW TAB */}
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    {/* Trip Summary Card */}
                                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Plane size={120} />
                                        </div>

                                        <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-500 mb-1">Estimated Total Trip Cost</p>
                                                    <div className="flex items-end gap-3">
                                                        <h2 className="text-4xl font-bold text-slate-900">₹{finalTotal.toLocaleString()}</h2>
                                                        {isBudgetOptimized && (
                                                            <span className="text-sm font-medium text-green-600 mb-2 line-through opacity-70">
                                                                ₹{baseTotal.toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                                        <Check size={12} strokeWidth={3} />
                                                        Within your ₹1.5L budget
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-100/50">
                                                    <div>
                                                        <p className="text-xs text-slate-500">Flights (2 pax)</p>
                                                        <p className="font-semibold text-slate-800">₹64,000</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Hotels (5 nights)</p>
                                                        <p className="font-semibold text-slate-800">₹48,000</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Activities</p>
                                                        <p className="font-semibold text-slate-800">₹15,000</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Local Transport</p>
                                                        <p className="font-semibold text-slate-800">₹10,100</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-center items-center md:items-end gap-4 min-w-[200px]">
                                                {isBudgetOptimized && (
                                                    <div className="text-right animate-pulse">
                                                        <span className="text-xs font-bold bg-green-500 text-white px-2 py-1 rounded">
                                                            SAVING ₹{discount.toLocaleString()}
                                                        </span>
                                                    </div>
                                                )}
                                                <Link
                                                    to="/booking/itinerary"
                                                    className="w-full md:w-auto px-8 py-4 bg-brand-600 text-white rounded-xl font-bold shadow-xl shadow-brand-200 hover:bg-brand-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
                                                >
                                                    Build My Itinerary <ArrowRight size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Must Visit Places */}
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">Top Places in {parsedParams.destination || 'Bali'}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {locations.slice(0, 3).map((loc, idx) => (
                                                <div key={idx} className="group relative h-48 rounded-xl overflow-hidden cursor-pointer">
                                                    <img src={loc.images[0]} alt={loc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                                    <div className="absolute bottom-3 left-3 text-white">
                                                        <h4 className="font-bold text-lg">{loc.name}</h4>
                                                        <div className="flex items-center gap-2 text-xs opacity-90">
                                                            <span className="flex items-center gap-0.5"><Star size={10} className="fill-yellow-400 text-yellow-400" /> {loc.rating}</span>
                                                            <span>•</span>
                                                            <span className="capitalize">{loc.category}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Best Time to Visit */}
                                    <div className="bg-orange-50 rounded-xl p-5 border border-orange-100 flex items-start gap-4">
                                        <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-orange-900">Best time to visit: April - October</h4>
                                            <p className="text-sm text-orange-800 mt-1">Weather is pleasant with less rainfall. Perfect for beach activities and sightseeing. Crowd levels are moderate.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FLIGHTS TAB */}
                            {activeTab === 'flights' && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-bold text-lg">Available Flights (DEL → DPS)</h3>
                                        <span className="text-sm text-slate-500">Prices are per person</span>
                                    </div>
                                    {flights.map(flight => (
                                        <div key={flight.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors flex flex-col md:flex-row items-center gap-6 shadow-sm">
                                            <div className="w-16 h-16 object-contain flex items-center justify-center p-2 bg-slate-50 rounded-lg">
                                                <img src={flight.image} alt={flight.airline} className="max-w-full max-h-full" />
                                            </div>
                                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-center md:text-left">
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{flight.airline}</h4>
                                                    <p className="text-xs text-slate-500">{flight.flightNumber}</p>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{flight.departure} - {flight.arrival}</p>
                                                    <p className="text-xs text-slate-500">{flight.duration} • {flight.stops}</p>
                                                </div>
                                                <div className="md:text-right">
                                                    <p className="font-bold text-slate-900 text-lg">₹{flight.price.toLocaleString()}</p>
                                                    <p className="text-xs text-slate-500">per person</p>
                                                </div>
                                                <div className="flex items-center justify-end">
                                                    <button className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-brand-600 transition-colors">
                                                        Select
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* HOTELS TAB */}
                            {activeTab === 'hotels' && (
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg mb-2">Recommended Hotels</h3>
                                    {hotels.map(hotel => (
                                        <div key={hotel.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition-colors flex flex-col md:flex-row gap-6 shadow-sm">
                                            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                                                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-lg text-slate-900">{hotel.name}</h4>
                                                        <p className="text-sm text-slate-500 flex items-center gap-1"><MapPinIcon size={14} /> {hotel.location}</p>
                                                        <div className="flex gap-2 mt-2">
                                                            {hotel.amenities.map((am: string) => (
                                                                <span key={am} className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-600">{am}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold mb-1">
                                                            <Star size={10} className="fill-green-700" /> {hotel.rating}
                                                        </div>
                                                        <p className="text-xs text-slate-400">({hotel.reviews} reviews)</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-end mt-4">
                                                    <div>
                                                        <span className="text-xs text-slate-500 bg-brand-50 text-brand-700 px-2 py-1 rounded">Used by 2k+ travelers</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="font-bold text-xl text-slate-900">₹{hotel.price.toLocaleString()}</p>
                                                            <p className="text-xs text-slate-500">per night</p>
                                                        </div>
                                                        <button className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-brand-600 transition-colors">
                                                            Book Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* FOOD TAB */}
                            {activeTab === 'food' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {restaurants.map(rest => (
                                        <div key={rest.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="h-40 relative">
                                                <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                                    {rest.priceLevel}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-slate-900">{rest.name}</h4>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                                                        <Star size={12} className="fill-yellow-400 text-yellow-400" /> {rest.rating}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                                                    <span>{rest.cuisine}</span>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${rest.type === 'Veg' ? 'bg-green-100 text-green-700' :
                                                        rest.type === 'Non-Veg' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                                        }`}>{rest.type}</span>
                                                </div>
                                                <div className="pt-3 border-t border-slate-100">
                                                    <p className="text-xs text-slate-400">Must Try:</p>
                                                    <p className="text-sm font-medium text-slate-800">{rest.mustTry}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* EXPERIENCES TAB */}
                            {activeTab === 'experiences' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {locations.map(loc => (
                                        <div key={loc.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex">
                                            <div className="w-1/3 relative">
                                                <img src={loc.images[0]} alt={loc.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="w-2/3 p-4 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-slate-900 text-sm">{loc.name}</h4>
                                                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded uppercase font-medium">{loc.category}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{loc.description}</p>
                                                </div>
                                                <button className="mt-3 w-full py-2 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 hover:text-brand-600 transition-colors">
                                                    Add to Itinerary
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT SIDEBAR - DESKTOP */}
                <div className="hidden lg:block w-80 shrink-0 space-y-6">
                    {/* Budget Optimizer Card */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm sticky top-24">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                <Filter size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Budget Optimizer</h3>
                                <p className="text-xs text-slate-500">AI-powered savings</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-700">Optimize Costs</span>
                                <button
                                    onClick={() => setBudgetOptimized(!isBudgetOptimized)}
                                    className="text-brand-600 transition-colors"
                                >
                                    {isBudgetOptimized ? <ToggleRight size={32} className="fill-green-100" /> : <ToggleLeft size={32} className="text-slate-300" />}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500">
                                {isBudgetOptimized
                                    ? "Great! We've found ₹25,000 in savings by adjusting flight times and hotel choices."
                                    : "Enable to see how much you can save without compromising on quality."
                                }
                            </p>
                        </div>

                        {isBudgetOptimized && (
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Flight Savings</span>
                                    <span className="text-green-600 font-medium">-₹8,000</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Hotel Deals</span>
                                    <span className="text-green-600 font-medium">-₹12,000</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Bundle Offer</span>
                                    <span className="text-green-600 font-medium">-₹5,000</span>
                                </div>
                                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold">
                                    <span>Total Saved</span>
                                    <span className="text-green-600">₹25,000</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Duration Toggle */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-3">Trip Duration</h3>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button className="flex-1 py-1.5 text-xs font-bold rounded-md bg-white shadow-sm text-slate-900">4 Days</button>
                            <button className="flex-1 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:text-slate-900">6 Days</button>
                            <button className="flex-1 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:text-slate-900">8 Days</button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">See what experiences unlock with more days!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MapPinIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export default SearchResults;
