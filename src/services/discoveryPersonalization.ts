import type { GroupType, Restaurant } from '../types';

// Mock Data for Restaurants
const MOCK_RESTAURANTS: Restaurant[] = [
    {
        id: 'r1',
        name: 'Warung Babi Guling Ibu Oka',
        cuisine: 'Balinese',
        rating: 4.8,
        priceLevel: 'cheap',
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa',
        tags: ['iconic', 'non-veg', 'authentic'],
        locationId: 'bali'
    },
    {
        id: 'r2',
        name: 'Bebek Bengil (Dirty Duck Diner)',
        cuisine: 'Indonesian',
        rating: 4.6,
        priceLevel: 'moderate',
        image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5',
        tags: ['kid-friendly', 'family', 'iconic', 'scenic'],
        locationId: 'bali'
    },
    {
        id: 'r3',
        name: 'Plant Bistro',
        cuisine: 'Vegan',
        rating: 4.9,
        priceLevel: 'moderate',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        tags: ['vegetarian', 'vegan', 'healthy', 'couple'],
        locationId: 'bali'
    },
    {
        id: 'r4',
        name: 'Potato Head Beach Club',
        cuisine: 'International',
        rating: 4.7,
        priceLevel: 'expensive',
        image: 'https://images.unsplash.com/photo-1574097656146-0b43b7660cb6',
        tags: ['friends', 'party', 'beach', 'alcohol'],
        locationId: 'bali'
    },
    {
        id: 'r5',
        name: 'Locavore',
        cuisine: 'Modern European',
        rating: 4.9,
        priceLevel: 'expensive',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de',
        tags: ['fine-dining', 'romantic', 'couple', 'iconic'],
        locationId: 'bali'
    },
    {
        id: 'r6',
        name: 'Naughty Nuri\'s Warung',
        cuisine: 'BBQ',
        rating: 4.7,
        priceLevel: 'moderate',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d580690dd0',
        tags: ['friends', 'meat-lover', 'lively'],
        locationId: 'bali'
    }
];

export const DiscoveryPersonalization = {
    // Infer group type if not explicitly set
    inferGroupType: (people: number, context?: string[]): GroupType => {
        if (context?.includes('family') || (people > 2 && people <= 6)) return 'family';
        if (context?.includes('friends') || people > 6) return 'friends';
        if (context?.includes('couple') || people === 2) return 'couple';
        return 'solo';
    },

    filterRestaurants: (
        groupType: GroupType,
        preferences: string[] = []
    ): Restaurant[] => {
        let filtered = MOCK_RESTAURANTS;

        // Group Type Filtering
        if (groupType === 'family') {
            // Prioritize kid-friendly or avoid 'party'
            filtered = filtered.filter(r =>
                (r.tags.includes('kid-friendly') || r.tags.includes('family')) && !r.tags.includes('party')
            );
        } else if (groupType === 'friends') {
            filtered = filtered.filter(r =>
                r.tags.includes('friends') || r.tags.includes('lively') || r.priceLevel === 'cheap'
            );
        } else if (groupType === 'couple') {
            filtered = filtered.filter(r =>
                r.tags.includes('romantic') || r.tags.includes('scenic') || r.priceLevel === 'expensive'
            );
        }

        // Preference Filtering (e.g., Vegetarian)
        if (preferences.includes('vegetarian') || preferences.includes('veg')) {
            filtered = filtered.filter(r =>
                r.tags.includes('vegetarian') || r.tags.includes('vegan')
            );
        }

        // If filtering results in too few options, relax constraints but keep priority tags at top
        if (filtered.length < 3) {
            const extra = MOCK_RESTAURANTS.filter(r => !filtered.find(x => x.id === r.id)).slice(0, 3 - filtered.length);
            return [...filtered, ...extra];
        }

        return filtered.slice(0, 3);
    },

    getPersonalizedTips: (groupType: GroupType): string => {
        switch (groupType) {
            case 'family': return "Family Tip: We've prioritized places with kids menus and spacious seating.";
            case 'friends': return "Squad Tip: These spots are great for sharing platters and have a lively vibe.";
            case 'couple': return "Romantic Pick: Selected quiet, scenic spots perfect for a date night.";
            case 'solo': return "Solo Traveler: These places have great communal tables or bar seating to meet people.";
            default: return "";
        }
    }
};
