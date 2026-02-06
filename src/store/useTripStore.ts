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

    // UI State
    viewMode: 'search' | 'itinerary' | 'booking';
    setViewMode: (mode: 'search' | 'itinerary' | 'booking') => void;
}

export const useTripStore = create<TripStore>((set) => ({
    query: '',
    isListening: false,
    parsedParams: {},
    dateRange: { from: undefined, to: undefined },
    favorites: [],
    setQuery: (query) => set({ query }),
    setParsedParams: (params) => set({ parsedParams: params }),
    setDateRange: (range) => set({ dateRange: range }),
    toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
            ? state.favorites.filter(favId => favId !== id)
            : [...state.favorites, id]
    })),
    setIsListening: (isListening) => set({ isListening }),

    currentTrip: {
        duration: 3,
        travelers: { adults: 2, children: 0 },
        activities: [],
    },
    updateTrip: (updates) =>
        set((state) => ({ currentTrip: { ...state.currentTrip, ...updates } })),
    addToTrip: (activityId) => {
        // Logic to add activity would likely need to fetch activity details first
        // For now simple placeholder
        console.log('Add activity', activityId);
    },
    removeFromTrip: (activityId) =>
        set((state) => ({
            currentTrip: {
                ...state.currentTrip,
                activities: state.currentTrip.activities.filter((a) => a.id !== activityId),
            },
        })),

    viewMode: 'search',
    setViewMode: (mode) => set({ viewMode: mode }),
}));
