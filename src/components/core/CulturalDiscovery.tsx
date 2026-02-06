import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import type { CulturalEvent } from '../../types';

interface CulturalDiscoveryProps {
    locationId: string;
}

const CulturalDiscovery = ({ locationId }: CulturalDiscoveryProps) => {
    const [events, setEvents] = useState<CulturalEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await mockApi.getEvents(locationId);
                setEvents(data as CulturalEvent[]);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [locationId]);

    if (loading) return <div className="animate-pulse h-64 bg-slate-100 rounded-xl"></div>;
    if (events.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                        <Heart size={20} className="text-rose-500" />
                        Volunteering & Local Events
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Engage with local culture & community</p>
                </div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                    ✨ Meaningful Trip
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event, idx) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative group border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div className="h-40 relative overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide text-white shadow-sm
                                    ${event.type === 'volunteering' ? 'bg-green-600' : event.type === 'festival' ? 'bg-purple-600' : 'bg-orange-500'}
                                `}>
                                    {event.type}
                                </span>
                            </div>
                            {event.impactScore && event.impactScore >= 8 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                                    <span className="text-[10px] text-white font-medium flex items-center gap-1">
                                        <Heart size={10} className="fill-rose-500 text-rose-500" /> High Impact Activity
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{event.name}</h3>
                            </div>

                            <p className="text-xs text-slate-500 line-clamp-2 mb-3 h-8">{event.description}</p>

                            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} /> {event.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={12} /> Local
                                </span>
                            </div>

                            <button className="w-full py-2 rounded-lg bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white">
                                View Details <ArrowRight size={12} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CulturalDiscovery;
