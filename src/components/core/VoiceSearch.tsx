import { useState, useEffect, useRef } from 'react';
import { Mic, Search, X, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { useTripStore } from '../../store/useTripStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { parseVoiceQuery } from '../../services/voiceParser';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';

export const VoiceSearch = () => {
    const { setQuery, setParsedParams, addToHistory, searchHistory, clearHistory } = useTripStore();
    const [localQuery, setLocalQuery] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const {
        isListening,
        transcript,
        error: voiceError,
        isSupported,
        startListening,
        stopListening
    } = useVoiceRecognition();

    // Sync transcript to local input
    useEffect(() => {
        if (transcript) {
            setLocalQuery(transcript);
        }
    }, [transcript]);

    // Handle clicking outside to close history
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowHistory(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const executeSearch = (text: string) => {
        if (!text.trim()) return;
        setQuery(text);
        const parsed = parseVoiceQuery(text);
        addToHistory(text, parsed);
        setParsedParams(parsed);
        navigate('/search');
    };

    const handleSearch = () => {
        executeSearch(localQuery);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
            setShowHistory(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto font-sans z-50">
            {/* Error Banner */}
            <AnimatePresence>
                {!isSupported && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-amber-900 font-medium">Voice search not supported</p>
                            <p className="text-xs text-amber-700 mt-1">Please use Chrome, Edge, or Safari.</p>
                        </div>
                    </motion.div>
                )}

                {voiceError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-4 bg-red-50 border border-red-100 rounded-lg p-3 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-red-700">{voiceError} <span className="text-red-500 underline cursor-pointer ml-2" onClick={() => document.querySelector<HTMLInputElement>('input')?.focus()}>Try typing instead?</span></span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 transition-all focus-within:ring-4 focus-within:ring-brand-100 focus-within:border-brand-300">

                {/* Search Button (Desktop) */}
                <button
                    onClick={handleSearch}
                    className="hidden md:block pl-6 pr-4 text-slate-400 hover:text-brand-600 transition-colors"
                >
                    <Search size={24} />
                </button>

                {/* Input Field */}
                <input
                    type="text"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={() => setShowHistory(true)}
                    placeholder="Where do you want to go? (e.g., 'Bali weekend trip')"
                    className="w-full px-6 md:px-0 py-4 md:py-6 text-base md:text-lg text-slate-900 placeholder:text-slate-400 outline-none font-medium text-center md:text-left border-b md:border-b-0 border-slate-100"
                />

                {/* Actions Container */}
                <div className="flex items-center p-2 md:p-0 md:pr-4 gap-2">
                    {/* Mobile Search Button (Visible only on mobile) */}
                    <button
                        onClick={handleSearch}
                        className="md:hidden flex-1 h-12 flex items-center justify-center bg-brand-600 text-white rounded-xl font-medium active:scale-95 transition-transform"
                    >
                        Search
                    </button>

                    {/* Mic Button */}
                    <button
                        onClick={toggleListening}
                        disabled={!isSupported}
                        className={`p-3 md:p-3 rounded-xl transition-all flex-shrink-0 min-w-[48px] min-h-[48px] flex items-center justify-center ${isListening
                            ? 'bg-red-50 text-red-500 animate-pulse ring-2 ring-red-100'
                            : 'bg-brand-50 text-brand-600 hover:bg-brand-100'
                            }`}
                        title={!isSupported ? "Voice search is not available in this browser" : isListening ? "Stop listening" : "Start voice search"}
                        aria-label="Voice Search"
                    >
                        {isListening ? (
                            <div className="w-6 h-6 flex items-center justify-center">
                                <span className="block w-3 h-3 bg-red-500 rounded-sm animate-spin" />
                            </div>
                        ) : (
                            <Mic size={24} />
                        )}
                    </button>

                    {/* Clear Button */}
                    {localQuery && (
                        <button
                            onClick={() => setLocalQuery('')}
                            className="absolute top-4 right-4 md:static p-2 text-slate-400 hover:text-slate-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Search History Dropdown */}
            <AnimatePresence>
                {showHistory && searchHistory.length > 0 && !localQuery && !isListening && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-20"
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between px-1 mb-3">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                    <Clock size={12} /> Recent Searches
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearHistory();
                                    }}
                                    className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-red-50"
                                >
                                    <Trash2 size={12} /> Clear History
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {searchHistory.map((historyItem) => {
                                    // Format the display string from parsed params if available, else use query
                                    let displayLabel = historyItem.query;
                                    const p = historyItem.parsedParams;

                                    if (p && (p.destination || p.duration || p.budget || p.people)) {
                                        const parts = [];
                                        if (p.destination) parts.push(p.destination.charAt(0).toUpperCase() + p.destination.slice(1));
                                        if (p.duration) parts.push(`${p.duration} days`);
                                        if (p.budget) parts.push(`$${p.budget}`);
                                        if (p.people) parts.push(`${p.people} ${p.people === 1 ? 'person' : 'people'}`);
                                        if (p.groupType) parts.push(p.groupType);

                                        if (parts.length > 0) {
                                            displayLabel = parts.join(' • ');
                                        }
                                    }

                                    return (
                                        <button
                                            key={historyItem.id}
                                            onClick={() => {
                                                setLocalQuery(historyItem.query);
                                                setQuery(historyItem.query);
                                                setParsedParams(historyItem.parsedParams);
                                                setShowHistory(false);
                                                navigate('/search');
                                            }}
                                            className="px-3 py-2 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-transparent rounded-full text-sm text-slate-700 transition-all text-left max-w-full truncate"
                                        >
                                            {displayLabel}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Listening State UI */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-4 text-center"
                    >
                        <span className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-900/95 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
                            <span className="flex gap-1 h-3 items-center">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-75" />
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-150" />
                            </span>
                            Listening...
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
