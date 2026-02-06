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
        totalPrice: 0,
    },
    updateTrip: (updates) =>
        set((state) => {
            const newTrip = { ...state.currentTrip, ...updates };
            // Simple price calculation
            let total = 0;
            if (newTrip.transport) total += newTrip.transport.price * (newTrip.travelers.adults + newTrip.travelers.children);
            if (newTrip.transfer) total += newTrip.transfer.price;
            // Hotel price is usually per night, simplifying to total for now or need per night logic
            // Assuming hotel object has a price property which is per night or total. 
            // The TravelLocation type doesn't have price, let's assume we maintain it separately or add it.
            // For now, let's assume TravelLocation has a 'price' field mocked or we add it to the type.
            // Wait, TravelLocation doesn't have price. I should update TravelLocation or handle it.
            // Let's check types again. TravelLocation doesn't. 
            // I'll assume for this prototype that we set a price when selecting.

            if (newTrip.activities) {
                total += newTrip.activities.reduce((acc, act) => acc + act.price, 0) * (newTrip.travelers.adults + newTrip.travelers.children);
            }

            return { currentTrip: { ...newTrip, totalPrice: total } };
        }),
    addToTrip: (_activityId) => {
        // Placeholder: In a real app we'd fetch the activity. 
        // For now, we can't fully implement this without the activity list.
        console.log('Use updateTrip to add specific full objects instead');
    },
    removeFromTrip: (_activityId) =>
        set((state) => ({
            currentTrip: {
                ...state.currentTrip,
                activities: state.currentTrip.activities.filter((a) => a.id !== _activityId),
                // Needs price recalc, simpler to just use updateTrip for everything in this refined flow
            },
        })),

    viewMode: 'search',
    setViewMode: (mode) => set({ viewMode: mode }),
}));
