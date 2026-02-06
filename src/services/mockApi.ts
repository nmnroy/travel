import type { TravelLocation } from '../types';

// Mock Data
const LOCATIONS: TravelLocation[] = [
    {
        id: 'loc_bali',
        name: 'Bali',
        description: 'The Island of Gods, known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
        images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4'],
        category: 'beach',
        tags: ['culture', 'nature', 'relaxation'],
        coordinates: { lat: -8.4095, lng: 115.1889 },
        rating: 4.8
    },
    {
        id: 'loc_paris',
        name: 'Paris',
        description: 'France\'s capital, is a major European city and a global center for art, fashion, gastronomy and culture.',
        images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34'],
        category: 'city',
        tags: ['art', 'romance', 'shopping'],
        coordinates: { lat: 48.8566, lng: 2.3522 },
        rating: 4.9
    },
    {
        id: 'loc_kyoto',
        name: 'Kyoto',
        description: 'Famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.',
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'],
        category: 'culture',
        tags: ['history', 'temples', 'calm'],
        coordinates: { lat: 35.0116, lng: 135.7681 },
        rating: 4.7
    },
    {
        id: 'loc_alps',
        name: 'Swiss Alps',
        description: 'The dramatic peaks of the Swiss Alps offering world-class skiing, hiking, and breathtaking mountain vistas.',
        images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7'],
        category: 'mountain',
        tags: ['skiing', 'nature', 'luxury'],
        coordinates: { lat: 46.8182, lng: 8.2275 },
        rating: 4.9
    },
    {
        id: 'loc_santorini',
        name: 'Santorini',
        description: 'A Cycladic island in the Aegean Sea, recognizable by its whitewashed, cubiform houses and blue-domed churches.',
        images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff'],
        category: 'beach',
        tags: ['romance', 'views', 'food'],
        coordinates: { lat: 36.3932, lng: 25.4615 },
        rating: 4.8
    },
    {
        id: 'loc_amazon',
        name: 'Amazon Rainforest',
        description: 'The world\'s largest tropical rainforest, famed for its biodiversity, crisscrossed by thousands of rivers.',
        images: ['https://images.unsplash.com/photo-1516934024742-b461fba47600'],
        category: 'nature',
        tags: ['wildlife', 'adventure', 'river'],
        coordinates: { lat: -3.4653, lng: -62.2159 },
        rating: 4.6
    },
    {
        id: 'loc_machu_picchu',
        name: 'Machu Picchu',
        description: 'Iconic Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.',
        images: ['https://images.unsplash.com/photo-1526392060635-9d6019884377'],
        category: 'culture',
        tags: ['history', 'hiking', 'mountain'],
        coordinates: { lat: -13.1631, lng: -72.5450 },
        rating: 4.9
    }
];

export const mockApi = {
    getLocations: async (category?: string): Promise<TravelLocation[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        if (category) {
            return LOCATIONS.filter(l => l.category === category);
        }
        return LOCATIONS;
    },

    searchLocations: async (query: string): Promise<TravelLocation[]> => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const lowerQ = query.toLowerCase();
        return LOCATIONS.filter(l =>
            l.name.toLowerCase().includes(lowerQ) ||
            lowerQ.includes(l.name.toLowerCase()) ||
            l.tags.some(t => t.includes(lowerQ))
        );
    },

    getReviews: async (_locationId: string) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return [
            {
                id: 'r1',
                author: 'Sarah Jenkins',
                rating: 5,
                date: '2 months ago',
                text: 'Absolutely breathtaking views! The local food recommendations were spot on.',
                likes: 12,
                verified: true
            },
            {
                id: 'r2',
                author: 'Mike Chen',
                rating: 4.5,
                date: '1 month ago',
                text: 'Great experience overall, slightly crowded but worth it for the sunset.',
                likes: 8,
                verified: true
            }
        ];
    },

    getTransportOptions: async (_destination: string) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return [
            { id: 'f1', type: 'flight', provider: 'AirIndya', departureTime: '10:00 AM', arrivalTime: '2:00 PM', duration: '4h', price: 450, class: 'Economy' },
            { id: 'f2', type: 'flight', provider: 'FlyGlobal', departureTime: '6:00 AM', arrivalTime: '9:30 AM', duration: '3.5h', price: 520, class: 'Economy' },
            { id: 't1', type: 'train', provider: 'RailRapid', departureTime: '8:00 AM', arrivalTime: '8:00 PM', duration: '12h', price: 120, class: 'Sleeper' },
        ];
    },

    getTransferOptions: async (_locationId: string) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return [
            { id: 'c1', type: 'cab', vehicleType: 'Sedan', price: 40, duration: '45m' },
            { id: 'c2', type: 'cab', vehicleType: 'SUV', price: 65, duration: '45m' },
            { id: 's1', type: 'shuttle', vehicleType: 'Shared Van', price: 15, duration: '1h 10m' },
        ];
    }
};
