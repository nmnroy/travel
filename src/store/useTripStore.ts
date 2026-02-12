import { create } from 'zustand';
import type { TripDraft, SearchParams } from '../types';

interface TripStore {
    // Search State
    query: string;
    isListening: boolean;
    parsedParams: SearchParams['parsed'];
    dateRange: { from: Date | undefined; to: Date | undefined };
    setQuery: (query: string) => void;
    setParsedParams: (params: SearchParams['parsed']) => void;
    setDateRange: (range: { from: Date | undefined; to: Date | undefined }) => void;
    setIsListening: (isListening: boolean) => void;

    // Trip Draft State
    currentTrip: TripDraft;
    updateTrip: (updates: Partial<TripDraft>) => void;
    addToTrip: (activityId: string) => void;
    removeFromTrip: (activityId: string) => void;

    // User Personalization
    favorites: string[];
    toggleFavorite: (id: string) => void;
    searchHistory: import('../types').SearchHistoryItem[];
    addToHistory: (query: string, parsed: SearchParams['parsed']) => void;
    clearHistory: () => void;

    // UI State
    viewMode: 'search' | 'itinerary' | 'booking';
    setViewMode: (mode: 'search' | 'itinerary' | 'booking') => void;

    // Budget Optimization
    isBudgetOptimized: boolean;
    setBudgetOptimized: (enabled: boolean) => void;
}

export const useTripStore = create<TripStore>((set) => ({
    query: '',
    isListening: false,
    parsedParams: {},
    dateRange: { from: undefined, to: undefined },
    favorites: JSON.parse(localStorage.getItem('experio_favorites') || '[]'),
    searchHistory: JSON.parse(localStorage.getItem('travel-pro-search-history') || '[]'),
    isBudgetOptimized: JSON.parse(localStorage.getItem('travel-pro-budget-optimized') || 'false'),

    setQuery: (query) => set({ query }),
    setParsedParams: (params) => set({ parsedParams: params }),
    setDateRange: (range) => set({ dateRange: range }),

    setBudgetOptimized: (enabled) => {
        localStorage.setItem('travel-pro-budget-optimized', JSON.stringify(enabled));
        set({ isBudgetOptimized: enabled });
    },

    toggleFavorite: (id) => set((state) => {
        const newFavorites = state.favorites.includes(id)
            ? state.favorites.filter(favId => favId !== id)
            : [...state.favorites, id];
        localStorage.setItem('experio_favorites', JSON.stringify(newFavorites));
        return { favorites: newFavorites };
    }),

    addToHistory: (query, parsed) => set((state) => {
        if (!query.trim()) return state;

        const newItem: import('../types').SearchHistoryItem = {
            id: Date.now().toString(),
            query,
            timestamp: Date.now(),
            parsedParams: parsed
        };

        // Filter out duplicates (same query) and keep max 10
        const filteredHistory = state.searchHistory.filter(item => item.query.toLowerCase() !== query.toLowerCase());
        const newHistory = [newItem, ...filteredHistory].slice(0, 10);

        localStorage.setItem('travel-pro-search-history', JSON.stringify(newHistory));
        return { searchHistory: newHistory };
    }),

    clearHistory: () => {
        if (window.confirm('Are you sure you want to clear your search history?')) {
            localStorage.removeItem('travel-pro-search-history');
            set({ searchHistory: [] });
        }
    },

    setIsListening: (isListening) => set({ isListening }),

    currentTrip: JSON.parse(localStorage.getItem('experio_current_trip') || JSON.stringify({
        duration: 3,
        travelers: { adults: 2, children: 0, infants: 0 },
        activities: [],
        totalPrice: 0,
    })),
    updateTrip: (updates) =>
        set((state) => {
            const newTrip = { ...state.currentTrip, ...updates };
            // Simple price calculation simulation (in real app, this would be more complex)
            let total = 0;
            if (newTrip.transport) total += newTrip.transport.price;
            if (newTrip.transfer) total += newTrip.transfer.price;
            if (newTrip.hotel) total += newTrip.hotel.price || 5000; // Mock hotel price if missing

            // Persist
            const updatedDraft = { ...newTrip, totalPrice: total };
            localStorage.setItem('experio_current_trip', JSON.stringify(updatedDraft));

            return { currentTrip: updatedDraft };
        }),
    addToTrip: (_activityId) => {
        // Placeholder
    },
    removeFromTrip: (_activityId) =>
        set((state) => ({
            currentTrip: {
                ...state.currentTrip,
                activities: state.currentTrip.activities.filter((a) => a.id !== _activityId),
            },
        })),

    viewMode: 'search',
    setViewMode: (mode) => set({ viewMode: mode }),
}));
