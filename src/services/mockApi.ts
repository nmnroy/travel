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
    },

    getEvents: async (_locationId: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: 'e1',
                name: 'Bali Kite Festival',
                description: 'Annual international kite festival in Padang Galak area, Sanur Beach.',
                date: 'July - October',
                type: 'festival',
                image: 'https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=800&q=80',
                locationId: 'bali',
                impactScore: 7
            },
            {
                id: 'e2',
                name: 'Beach Cleanup Drive',
                description: 'Join local community heroes in keeping Kuta beach clean and plastic-free.',
                date: 'Every Saturday',
                type: 'volunteering',
                image: 'https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?auto=format&fit=crop&w=800&q=80',
                locationId: 'bali',
                impactScore: 10
            },
            {
                id: 'e3',
                name: 'Traditional Batik Workshop',
                description: 'Learn the ancient art of Batik making from local artisans in Ubud.',
                date: 'Daily',
                type: 'workshop',
                image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80',
                locationId: 'bali',
                impactScore: 8
            }
        ];
    },

    getFlights: async (_destination: string) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return [
            {
                id: 'fl_1',
                airline: 'Air India',
                flightNumber: 'AI-335',
                from: 'DEL',
                to: 'DPS',
                departure: '06:30 AM',
                arrival: '02:45 PM',
                duration: '6h 15m',
                stops: 'Non-stop',
                price: 32000,
                rating: 4.2,
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png'
            },
            {
                id: 'fl_2',
                airline: 'Singapore Airlines',
                flightNumber: 'SQ-421',
                from: 'DEL',
                to: 'DPS',
                departure: '09:15 AM',
                arrival: '05:30 PM',
                duration: '6h 45m',
                stops: '1 Stop (SIN)',
                price: 35500,
                rating: 4.8,
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png'
            },
            {
                id: 'fl_3',
                airline: 'IndiGo',
                flightNumber: '6E-101',
                from: 'DEL',
                to: 'DPS',
                departure: '11:00 PM',
                arrival: '08:00 AM',
                duration: '7h 30m',
                stops: '1 Stop (BKK)',
                price: 24500,
                rating: 4.0,
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/IndiGo_Airlines_logo.svg/1200px-IndiGo_Airlines_logo.svg.png'
            },
            {
                id: 'fl_4',
                airline: 'Garuda Indonesia',
                flightNumber: 'GA-880',
                from: 'DEL',
                to: 'DPS',
                departure: '10:45 AM',
                arrival: '06:20 PM',
                duration: '6h 05m',
                stops: 'Non-stop',
                price: 38000,
                rating: 4.6,
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Garuda_Indonesia_Logo.svg/2560px-Garuda_Indonesia_Logo.svg.png'
            }
        ];
    },

    getHotels: async (_destination: string) => {
        await new Promise(resolve => setTimeout(resolve, 700));
        return [
            {
                id: 'ht_1',
                name: 'Padma Resort Ubud',
                location: 'Ubud, Bali',
                type: 'Luxury Resort',
                rating: 4.9,
                reviews: 234,
                price: 12000,
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                amenities: ['Pool', 'Spa', 'Free WiFi', 'Breakfast']
            },
            {
                id: 'ht_2',
                name: 'The Kayon Jungle Resort',
                location: 'Ubud, Bali',
                type: 'Luxury Villa',
                rating: 4.8,
                reviews: 189,
                price: 18500,
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
                amenities: ['Infinity Pool', 'Yoga Deck', 'Bar']
            },
            {
                id: 'ht_3',
                name: 'Ayana Resort and Spa',
                location: 'Jimbaran, Bali',
                type: 'Beach Resort',
                rating: 4.7,
                reviews: 412,
                price: 15000,
                image: 'https://images.unsplash.com/photo-1571896349842-6e53ce41ad03?auto=format&fit=crop&w=800&q=80',
                amenities: ['Private Beach', 'Rock Bar', 'Spa']
            },
            {
                id: 'ht_4',
                name: 'Potato Head Suites',
                location: 'Seminyak, Bali',
                type: 'Boutique Hotel',
                rating: 4.6,
                reviews: 320,
                price: 9500,
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
                amenities: ['Beach Club', 'Gym', 'Art Gallery']
            }
        ];
    },

    getRestaurants: async (_destination: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            {
                id: 'rs_1',
                name: 'Locavore',
                cuisine: 'Modern European',
                image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
                rating: 4.9,
                priceLevel: '₹₹₹',
                type: 'Non-Veg',
                mustTry: 'Into The Wild Menu'
            },
            {
                id: 'rs_2',
                name: 'Warung Babi Guling Ibu Oka',
                cuisine: 'Indonesian',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                priceLevel: '₹',
                type: 'Non-Veg',
                mustTry: 'Suckling Pig'
            },
            {
                id: 'rs_3',
                name: 'Kubu at Mandapa',
                cuisine: 'Mediterranean',
                image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
                rating: 4.8,
                priceLevel: '₹₹₹₹',
                type: 'Veg/Non-Veg',
                mustTry: 'River Prawns'
            },
            {
                id: 'rs_4',
                name: 'Kynd Community',
                cuisine: 'Vegan Cafe',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
                rating: 4.6,
                priceLevel: '₹₹',
                type: 'Veg',
                mustTry: 'Acai Bowls'
            }
        ];
    }
};
