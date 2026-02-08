import { useState } from 'react';
import { VoiceSearch } from '../components/core/VoiceSearch';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Star, Mic } from 'lucide-react';

const EXPERIENCE_CATEGORIES = [
    { id: 'beach', icon: '🏖️', label: 'Beach', desc: 'Sun, sand & sea' },
    { id: 'mountain', icon: '🏔️', label: 'Nature', desc: 'Escape to the wild' },
    { id: 'culture', icon: '🏛️', label: 'Culture', desc: 'History & heritage' },
    { id: 'adventure', icon: '🪂', label: 'Advent', desc: 'Thrill seekers' },
    { id: 'nightlife', icon: '🌃', label: 'Night', desc: 'City lights' },
    { id: 'relax', icon: '🧘', label: 'Relax', desc: 'Wellness & spa' },
];

const POPULAR_DESTINATIONS = [
    {
        id: 'loc_bali',
        name: 'Bali',
        country: 'Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        season: 'Apr - Oct',
        rating: 4.8,
        price: '₹45k'
    },
    {
        id: 'loc_goa',
        name: 'Goa',
        country: 'India',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
        season: 'Nov - Feb',
        rating: 4.6,
        price: '₹15k'
    },
    {
        id: 'loc_paris',
        name: 'Paris',
        country: 'France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        season: 'Apr - Jun',
        rating: 4.9,
        price: '₹1.2L'
    }
];

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className="min-h-screen">
            {/* 1. HERO SECTION */}
            <section className="relative pt-20 pb-32 overflow-hidden bg-slate-900">
                {/* Background Gradient & Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-950 to-indigo-950 z-0" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0" />

                {/* Abstract Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 font-medium text-sm mb-6 backdrop-blur-sm">
                                🌍 AI-Powered Travel Assistant
                            </span>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                                Your Journey, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-300">
                                    Perfected
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                                Experience the future of travel planning. Just speak your mind, and let our AI craft the perfect itinerary tailored to your style.
                            </p>
                        </motion.div>

                        {/* Voice Search Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full max-w-2xl mx-auto relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                            <div className="relative">
                                <VoiceSearch />
                            </div>

                            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-400">
                                <span className="font-medium text-slate-500">Try saying:</span>
                                <span className="bg-slate-800/50 px-2 py-1 rounded text-slate-300 border border-slate-700/50">"Plan a 6-day Bali trip..."</span>
                                <span className="bg-slate-800/50 px-2 py-1 rounded text-slate-300 border border-slate-700/50">"Kerala for 2 under 50k..."</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. EXPERIENCE CATEGORIES */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">What experiences are you seeking?</h2>
                        <p className="text-slate-600">Select your vibe and let us do the rest.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {EXPERIENCE_CATEGORIES.map((cat, idx) => {
                            const isSelected = selectedCategory === cat.id;
                            return (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                                    className={`
                                        cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col items-center text-center gap-2
                                        ${isSelected
                                            ? 'bg-brand-50 border-brand-500 shadow-lg shadow-brand-100 scale-105'
                                            : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-md hover:scale-105'
                                        }
                                    `}
                                >
                                    <span className="text-4xl mb-2 filter drop-shadow-sm">{cat.icon}</span>
                                    <h3 className={`font-bold ${isSelected ? 'text-brand-700' : 'text-slate-900'}`}>{cat.label}</h3>
                                    <p className="text-xs text-slate-500">{cat.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {selectedCategory && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-10 text-center"
                            >
                                <Link
                                    to={`/search?category=${selectedCategory}`}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all hover:scale-105"
                                >
                                    Explore {EXPERIENCE_CATEGORIES.find(c => c.id === selectedCategory)?.label} Destinations <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 3. POPULAR DESTINATIONS */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">

                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Trending Destinations</h2>
                            <p className="text-slate-600">Most loved places by our community this month.</p>
                        </div>
                        <Link to="/search" className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors">
                            View All <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {POPULAR_DESTINATIONS.map((dest, idx) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold text-slate-800 shadow-sm">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        {dest.rating}
                                    </div>

                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold">{dest.name}</h3>
                                        <p className="flex items-center gap-1 text-slate-200 text-sm">
                                            <MapPin size={14} /> {dest.country}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                            <Calendar size={14} className="text-brand-500" />
                                            Best: <span className="font-medium text-slate-900">{dest.season}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500">Starting from</p>
                                            <p className="font-bold text-brand-600 text-lg">{dest.price}</p>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/book/${dest.id}`}
                                        className="block w-full text-center py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-brand-600 transition-colors"
                                    >
                                        Explore Itinerary
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/search" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors">
                            View All <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. HOW IT WORKS */}
            <section className="py-20 bg-brand-50/50 border-y border-brand-100/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">How Experio Works</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Your dream trip is just three simple steps away.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 border-t border-dashed border-brand-400 z-0" />

                        {[
                            { title: 'Tell us your plan', desc: 'Use voice or text to share your preferences, budget, and dates.', icon: <Mic size={32} /> },
                            { title: 'Get AI Itinerary', desc: 'Our AI builds a perfect day-by-day plan tailored to you.', icon: <Star size={32} /> },
                            { title: 'Book in One Click', desc: 'Flights, hotels, and activities – all sorted in one place.', icon: <Calendar size={32} /> }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center"
                            >
                                <div className="w-24 h-24 rounded-2xl bg-white border border-brand-100 shadow-xl shadow-brand-100/50 flex items-center justify-center text-brand-600 mb-6 group hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <div className="bg-white/50 backdrop-blur-sm rounded-full px-4 py-1 mb-4 border border-brand-100 text-brand-800 font-bold text-sm">
                                    Step {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed px-4">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
