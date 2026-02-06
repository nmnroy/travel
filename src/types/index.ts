
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

export interface TransportOption {
    id: string;
    type: 'flight' | 'train';
    provider: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    class: string;
}

export interface TransferOption {
    id: string;
    type: 'cab' | 'shuttle' | 'train';
    vehicleType: string;
    price: number;
    duration: string;
}

export interface BookingItem {
    id: string;
    type: 'flight' | 'train' | 'hotel' | 'transfer' | 'activity';
    name: string;
    price: number;
    details?: any;
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
    // Selected Items for Unified Checkout
    transport?: TransportOption;
    transfer?: TransferOption;
    hotel?: TravelLocation; // Using Location as Hotel for now
    activities: Activity[];
    totalPrice: number;
}

// Local Discovery
export type GroupType = 'solo' | 'couple' | 'family' | 'friends';

export interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    priceLevel: 'cheap' | 'moderate' | 'expensive';
    image: string;
    tags: string[]; // e.g., 'vegetarian', 'kid-friendly', 'romantic', 'iconic'
    locationId: string;
}

export interface SearchParams {
    query: string;
    parsed: {
        destination?: string;
        budget?: number;
        duration?: number;
        people?: number;
        preferences?: string[];
        groupType?: GroupType;
    };
}

export interface CulturalEvent {
    id: string;
    name: string;
    description: string;
    date: string;
    type: 'festival' | 'volunteering' | 'workshop';
    image: string;
    impactScore?: number; // 1-10 scale for sustainable impact
    locationId: string;
}
