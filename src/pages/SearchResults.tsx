import { useEffect, useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { mockApi } from '../services/mockApi';
import type { TravelLocation } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const { query, parsedParams } = useTripStore();
    const [results, setResults] = useState<TravelLocation[]>([]);
    const [loading, setLoading] = useState(false);
    const [budgetMode, setBudgetMode] = useState(false);

    useEffect(() => {
        const search = async () => {
            setLoading(true);
            // If we have a parsed destination, use it, else fuzzy search
            const searchTerm = parsedParams.destination || query;
            const data = await mockApi.searchLocations(searchTerm);
            setResults(data);
            setLoading(false);
        };
        if (query) search();
    }, [query, parsedParams]);

    return (
        <div className="container mx-auto max-w-5xl py-8 space-y-8">
            {/* Header & Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Results for "{query || '...'}"
                    </h1>
                    <div className="flex gap-2 mt-2">
                        {parsedParams.duration && (
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                {parsedParams.duration} Days
                            </span>
                        )}
                        {parsedParams.people && (
                            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                {parsedParams.people} People
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${budgetMode ? 'text-green-600' : 'text-slate-500'}`}>
                        Budget Optimization
                    </span>
                    <button
                        onClick={() => setBudgetMode(!budgetMode)}
                        className={`w-14 h-8 rounded-full p-1 transition-colors ${budgetMode ? 'bg-green-500' : 'bg-slate-200'}`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${budgetMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
                {loading ? (
                    [1, 2].map(i => <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />)
                ) : (
                    <AnimatePresence>
                        {results.map((loc, idx) => (
                            <motion.div
                                key={loc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6"
                            >
                                <img
                                    src={loc.images[0]}
                                    alt={loc.name}
                                    className="w-full sm:w-48 h-48 rounded-xl object-cover"
                                />
                                <div className="flex-1 py-2 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                            <h3 className="text-xl font-bold flex items-center gap-2">
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
        </div>
    );
};

export default SearchResults;
