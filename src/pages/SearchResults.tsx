import { useEffect, useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { mockApi } from '../services/mockApi';
import type { TravelLocation } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from '../components/core/DateRangePicker';
import { FiltersSidebar } from '../components/core/FiltersSidebar';
import { MapView } from '../components/core/MapView';

const SearchResults = () => {
    const { query, parsedParams, favorites, toggleFavorite } = useTripStore();
    const [results, setResults] = useState<TravelLocation[]>([]);
    const [displayedResults, setDisplayedResults] = useState<TravelLocation[]>([]);
    const [loading, setLoading] = useState(false);
    const [budgetMode, setBudgetMode] = useState(false);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    useEffect(() => {
        const search = async () => {
            setLoading(true);
            const searchTerm = parsedParams.destination || query;
            const data = await mockApi.searchLocations(searchTerm);
            setResults(data);
            setDisplayedResults(data);
            setLoading(false);
        };
        if (query) search();
    }, [query, parsedParams]);

    useEffect(() => {
        if (showFavoritesOnly) {
            setDisplayedResults(results.filter(r => favorites.includes(r.id)));
        } else {
            setDisplayedResults(results);
        }
    }, [showFavoritesOnly, results, favorites]);

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filter - Hidden on mobile, visible on desktop */}
                <aside className="hidden lg:block w-72 shrink-0">
                    <FiltersSidebar />
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Results for "{query || '...'}"
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <div className="w-64">
                                    <DateRangePicker />
                                </div>
                                {parsedParams.people && (
                                    <span className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium border border-purple-100">
                                        {parsedParams.people} People
                                    </span>
                                )}
                                {parsedParams.duration && (
                                    <span className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-100">
                                        {parsedParams.duration} Days
                                    </span>
                                )}
                                {parsedParams.budget && (
                                    <span className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-100">
                                        ${parsedParams.budget} Budget
                                    </span>
                                )}
                                {parsedParams.preferences?.map(pref => (
                                    <span key={pref} className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium border border-orange-100 capitalize">
                                        {pref}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    List
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    Map
                                </button>
                            </div>

                            <div className="h-6 w-px bg-slate-200 mx-1" />

                            <button
                                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${showFavoritesOnly ? 'bg-red-50 text-red-600 border border-red-100' : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                <Heart size={16} className={showFavoritesOnly ? 'fill-red-600' : ''} />
                                {showFavoritesOnly ? 'Saved Only' : 'Saved'}
                            </button>

                            <span className={`text-sm font-medium ${budgetMode ? 'text-green-600' : 'text-slate-500'}`}>
                                Saving
                            </span>
                            <button
                                onClick={() => setBudgetMode(!budgetMode)}
                                className={`w-12 h-7 rounded-full p-1 transition-colors ${budgetMode ? 'bg-green-500' : 'bg-slate-200'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${budgetMode ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    {viewMode === 'map' ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100"
                        >
                            <MapView locations={results} />
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {loading ? (
                                [1, 2].map(i => <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />)
                            ) : (
                                <AnimatePresence>
                                    {displayedResults.map((loc, idx) => (
                                        <motion.div
                                            key={loc.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 relative group"
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleFavorite(loc.id);
                                                }}
                                                className="absolute top-4 left-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                                            >
                                                <Heart
                                                    size={20}
                                                    className={`transition-colors ${favorites.includes(loc.id) ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-400'}`}
                                                />
                                            </button>

                                            <img
                                                src={loc.images[0]}
                                                alt={loc.name}
                                                className="w-full sm:w-48 h-48 rounded-xl object-cover"
                                            />
                                            <div className="flex-1 py-2 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                                        <h3 className="text-xl font-bold flex items-center gap-2 pl-2">
                                                            {loc.name}
                                                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase font-normal tracking-wide">
                                                                {loc.category}
                                                            </span>
                                                        </h3>
                                                        <div className="text-left sm:text-right">
                                                            <p className="text-2xl font-bold text-slate-900">
                                                                {budgetMode ? '$850' : '$1,200'}
                                                            </p>
                                                            <p className="text-xs text-slate-400">per person</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-slate-600 mt-2 line-clamp-2">{loc.description}</p>

                                                    {/* Simulated Transport Options */}
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        <div className="flex items-center gap-1 text-sm bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                            ✈️ Flight + 🏨 Hotel
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                            🚗 Private Transfer
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-start sm:justify-end pt-4">
                                                    <Link
                                                        to={`/book/${loc.id}`}
                                                        className="w-full sm:w-auto bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        View Options <ArrowRight size={18} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {results.length === 0 && !loading && (
                                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                            <p className="text-slate-400">No destinations found matching your criteria.</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
