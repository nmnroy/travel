import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { TravelLocation } from '../../types';
import { Link } from 'react-router-dom';

// Fix Leaflet's default icon issue in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
    locations: TravelLocation[];
}

export const MapView = ({ locations }: MapViewProps) => {
    // Default center (Bali) if no locations, else center on first location
    const center: [number, number] = locations.length > 0
        ? [locations[0].coordinates.lat, locations[0].coordinates.lng]
        : [-8.4095, 115.1889];

    return (
        <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 z-0">
            <MapContainer center={center} zoom={4} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map(loc => (
                    <Marker key={loc.id} position={[loc.coordinates.lat, loc.coordinates.lng]}>
                        <Popup>
                            <div className="min-w-[150px]">
                                <img src={loc.images[0]} className="w-full h-24 object-cover rounded-lg mb-2" alt={loc.name} />
                                <h3 className="font-bold text-slate-900">{loc.name}</h3>
                                <div className="text-xs text-slate-500 mb-2">{loc.category}</div>
                                <Link to={`/book/${loc.id}`} className="text-brand-600 font-medium text-sm hover:underline">
                                    View Details
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
