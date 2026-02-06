import { useState, useEffect } from 'react';
import { Mic, Search, X } from 'lucide-react';
import { useTripStore } from '../../store/useTripStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { parseVoiceQuery } from '../../services/voiceParser';

export const VoiceSearch = () => {
    const { isListening, setIsListening, query, setQuery, setParsedParams } = useTripStore();
    const [localQuery, setLocalQuery] = useState(query);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (localQuery.trim()) {
            setQuery(localQuery);
            const parsed = parseVoiceQuery(localQuery);
            setParsedParams(parsed);
            navigate('/search');
        }
    };

    const toggleListening = () => {
        const newState = !isListening;
        setIsListening(newState);
        if (newState) {
            // Simulate voice input with a complex query for demo purposes
            setTimeout(() => {
                const mockQuery = "Plan a 5 day trip to Bali for 2 people with a budget of 2000 dollars";
                setLocalQuery(mockQuery);
                setQuery(mockQuery);
                const parsed = parseVoiceQuery(mockQuery);
                setParsedParams(parsed);
                setIsListening(false);
                navigate('/search');
            }, 3000);
        }
    };

    useEffect(() => {
        setQuery(localQuery);
    }, [localQuery, setQuery]);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 transition-all focus-within:ring-4 focus-within:ring-brand-100 focus-within:border-brand-300">

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="pl-6 pr-4 text-slate-400 hover:text-brand-600 transition-colors"
                >
                    <Search size={24} />
                </button>

                {/* Input Field */}
                <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Where do you want to go? (e.g., 'Bali weekend trip')"
                    className="w-full py-6 text-lg text-slate-900 placeholder:text-slate-400 outline-none font-medium"
                />

                {/* Mic Button */}
                <div className="pr-4">
                    <button
                        onClick={toggleListening}
                        className={`p-3 rounded-xl transition-all ${isListening
                            ? 'bg-red-50 text-red-500 animate-pulse ring-2 ring-red-100'
                            : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                            }`}
                    >
                        <Mic size={24} />
                    </button>
                </div>

                {/* Clear Button */}
                {localQuery && (
                    <button
                        onClick={() => setLocalQuery('')}
                        className="absolute right-20 p-2 text-slate-400 hover:text-slate-600"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Listening Indicator */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-4 text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            Listening...
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
