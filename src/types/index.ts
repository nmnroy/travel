
export interface UserPreference {
    budgetRange: [number, number];
    interests: string[];
    dietary: 'veg' | 'non-veg' | 'any';
    travelPace: 'relaxed' | 'moderate' | 'fast';
}

export interface TravelLocation {
    id: string;
    name: string;
    description: string;
    images: string[];
    coordinates: { lat: number; lng: number };
    category: 'beach' | 'mountain' | 'city' | 'nature' | 'adventure' | 'culture' | 'history';
    tags: string[];
    rating: number;
}

export interface Activity {
    id: string;
    name: string;
    description: string;
    duration: number; // in hours
    price: number;
    locationId: string;
    category: string;
    image: string;
}

export interface TripDraft {
    destination?: TravelLocation;
    startDate?: Date;
    duration: number;
    travelers: {
        adults: number;
        children: number;
    };
    budget?: number;
    activities: Activity[];
}

export interface SearchParams {
    query: string;
    parsed: {
        destination?: string;
        budget?: number;
        duration?: number;
        people?: number;
        preferences?: string[];
    };
}
