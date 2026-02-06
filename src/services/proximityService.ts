
import type { Activity } from '../types';

export interface CommuteInfo {
    method: 'Private Cab' | 'Scooter' | 'Walk' | 'Shuttle';
    cost: number;
    duration: string;
    distance: string;
}

// Mock coordinates for Bali locations (approximate)
const LOCATION_COORDINATES: Record<string, { lat: number, lng: number }> = {
    'Uluwatu Temple': { lat: -8.8291, lng: 115.0837 },
    'Single Fin': { lat: -8.8250, lng: 115.0870 }, // Near Uluwatu
    'Padang Padang Beach': { lat: -8.8111, lng: 115.1030 }, // ~3km from Uluwatu
    'Kecak Fire Dance': { lat: -8.8291, lng: 115.0837 }, // At Uluwatu

    // Ubud Area
    'Ubud Art Market': { lat: -8.5069, lng: 115.2625 },
    'Monkey Forest': { lat: -8.5194, lng: 115.2606 },
    'Tegalalang Rice Terrace': { lat: -8.4293, lng: 115.2810 },

    // Nusa Penida
    'Kelingking Beach': { lat: -8.7505, lng: 115.4750 },
    'Angel\'s Billabong': { lat: -8.7300, lng: 115.4500 }
};

export const ProximityService = {
    // Haversine formula to calculate distance in km
    getDistance: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    },

    // Group activities that are within 'radius' km of the first activity in the group
    groupActivitiesByProximity: (activities: Activity[], radiusKm: number = 5): Activity[][] => {
        const groups: Activity[][] = [];
        const visited = new Set<string>();

        // We assume activities might not have coordinates on the object itself yet, 
        // so we lookup by name/title for this mock implementation
        const enrichedActivities = activities.map(a => ({
            ...a,
            coords: LOCATION_COORDINATES[a.name] || LOCATION_COORDINATES[a.name.replace('Visit ', '')] || { lat: 0, lng: 0 }
        }));

        for (const act of enrichedActivities) {
            if (visited.has(act.id)) continue;

            const currentGroup = [act];
            visited.add(act.id);

            for (const other of enrichedActivities) {
                if (visited.has(other.id)) continue;

                // If either has no coords (0,0), skip proximity check (or force group if logic dictates)
                if (act.coords.lat === 0 || other.coords.lat === 0) continue;

                const dist = ProximityService.getDistance(
                    act.coords.lat, act.coords.lng,
                    other.coords.lat, other.coords.lng
                );

                if (dist <= radiusKm) {
                    currentGroup.push(other);
                    visited.add(other.id);
                }
            }
            groups.push(currentGroup);
        }

        return groups;
    },

    getCommuteInfo: (groupSize: number): CommuteInfo => {
        // Mock logic: if group size > 2, it's likely a day tour or extensive travel
        if (groupSize > 2) {
            return {
                method: 'Private Cab',
                cost: 800,
                duration: '45 mins',
                distance: '12 km' // Mock total distance
            };
        } else {
            return {
                method: 'Scooter',
                cost: 150,
                duration: '20 mins',
                distance: '4 km'
            };
        }
    }
};
