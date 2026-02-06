import { useState, useEffect } from 'react';
import { VoiceSearch } from '../components/core/VoiceSearch';
import ItineraryBuilder from './ItineraryBuilder';
import { Link } from 'react-router-dom';
import { ExperienceCard } from '../components/core/ExperienceCard';
import { motion, AnimatePresence } from 'framer-motion';
import { mockApi } from '../services/mockApi';
import type { TravelLocation } from '../types';
import { MapPin, Star } from 'lucide-react';

const EXPERIENCES = [
    { id: 'beach', title: 'Beaches', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
    { id: 'mountain', title: 'Mountains', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' },
    { id: 'culture', title: 'Culture', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47' },
    { id: 'nature', title: 'Nature', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e' },
];

const Home = () => {
    const [selectedExp, setSelectedExp] = useState('beach');
    const [locations, setLocations] = useState<TravelLocation[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLocs = async () => {
            setLoading(true);
            const data = await mockApi.getLocations(selectedExp);
            setLocations(data);
            setLoading(false);
        };
        fetchLocs();
    }, [selectedExp]);

    return (
        <div className="min-h-screen py-8 space-y-16">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center pt-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
                        Find your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                            Perfect Experience
                        </span>
                    </h1>
                    <div className="mb-12">
                        <VoiceSearch />
                    </div>
                </motion.div>
            </section>

            {/* Experience Categories */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {EXPERIENCES.map((exp) => (
                        <ExperienceCard
                            key={exp.id}
                            {...exp}
                            isSelected={selectedExp === exp.id}
                            onClick={() => setSelectedExp(exp.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Recommendations Grid */}
            <section className="container mx-auto px-4 pb-20">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    Top Picks for <span className="text-brand-600 capitalize">{selectedExp}</span>
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-80 bg-slate-100 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='wait'>
                            {locations.length > 0 ? (
                                locations.map((loc) => (
                                    <Link to={`/book/${loc.id}`} key={loc.id}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group cursor-pointer h-full"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={loc.images[0]}
                                                    alt={loc.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold text-slate-800 shadow-sm">
                                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                    {loc.rating}
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-1 text-brand-600 text-sm font-medium mb-2">
                                                    <MapPin size={16} />
                                                    {loc.name}
                                                </div>
                                                <p className="text-slate-600 text-sm line-clamp-2">{loc.description}</p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {loc.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs rounded-md border border-slate-200">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-slate-400">
                                    No locations found for this category yet.
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </section>

            {/* Integrated Itinerary Builder */}
            <section className="bg-slate-50 py-20 border-t border-slate-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Perfect Itinerary</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            We've crafted a day-by-day plan based on your preferences. Customize it further to match your pace.
                        </p>
                    </div>
                    <ItineraryBuilder />
                </div>
            </section>
        </div>
    );
};

export default Home;
