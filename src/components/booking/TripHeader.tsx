import { useState, useEffect } from 'react';
import { useTripStore } from '../../store/useTripStore';
import { Calendar, Users, MapPin, Edit2, Check, X, Plus, Minus } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';

export const TripHeader = () => {
    const { currentTrip, updateTrip } = useTripStore();
    const [isEditing, setIsEditing] = useState(false);

    // Local state for editing
    const [editForm, setEditForm] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        adults: 1,
        children: 0,
        infants: 0
    });

    // Initialize/Reset form data when entering edit mode
    useEffect(() => {
        if (isEditing) {
            // Default dates if missing
            const start = currentTrip.startDate ? new Date(currentTrip.startDate) : new Date();
            const end = currentTrip.duration ? addDays(start, currentTrip.duration) : addDays(start, 3);

            setEditForm({
                destination: currentTrip.destination?.name || 'Bali',
                startDate: start.toISOString().split('T')[0],
                endDate: end.toISOString().split('T')[0],
                adults: currentTrip.travelers.adults || 1,
                children: currentTrip.travelers.children || 0,
                infants: currentTrip.travelers.infants || 0
            });
        }
    }, [isEditing, currentTrip]);

    const handleSave = () => {
        const start = new Date(editForm.startDate);
        const end = new Date(editForm.endDate);
        const duration = differenceInDays(end, start);

        if (duration < 1) {
            alert("End date must be after start date");
            return;
        }

        updateTrip({
            destination: { ...currentTrip.destination, name: editForm.destination, id: currentTrip.destination?.id || 'custom' } as any,
            startDate: start,
            duration: duration,
            travelers: {
                adults: editForm.adults,
                children: editForm.children,
                infants: editForm.infants
            }
        });
        setIsEditing(false);
    };

    // Helper to calculate display duration
    const getDurationDisplay = () => {
        if (currentTrip.duration) return `${currentTrip.duration} Days`;
        return '3 Days'; // Fallback
    };

    // Helper to calculate display dates
    const getDateDisplay = () => {
        if (currentTrip.startDate) {
            const start = new Date(currentTrip.startDate);
            const end = addDays(start, currentTrip.duration);
            return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
        }
        return '';
    };

    // Counter Component
    const Counter = ({ label, value, onChange, min = 0, max = 10 }: { label: string, value: number, onChange: (val: number) => void, min?: number, max?: number }) => (
        <div className="flex items-center justify-between min-w-[120px]">
            <span className="text-sm font-medium text-slate-600">{label}</span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min}
                    className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                >
                    <Minus size={12} />
                </button>
                <span className="w-4 text-center text-sm font-bold text-slate-900">{value}</span>
                <button
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={value >= max}
                    className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                >
                    <Plus size={12} />
                </button>
            </div>
        </div>
    );

    if (isEditing) {
        return (
            <div className="bg-white p-6 rounded-xl border-2 border-brand-100 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <Edit2 size={18} className="text-brand-600" />
                        Edit Trip Details
                    </h3>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Destination */}
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Destination</label>
                        <div className="relative">
                            <input
                                value={editForm.destination}
                                onChange={(e) => setEditForm({ ...editForm, destination: e.target.value })}
                                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                placeholder="Where to?"
                            />
                            <MapPin size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Start Date</label>
                            <input
                                type="date"
                                value={editForm.startDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">End Date</label>
                            <input
                                type="date"
                                value={editForm.endDate}
                                min={editForm.startDate}
                                onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Travelers */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Travelers</label>
                        <Counter label="Adults (12+)" value={editForm.adults} onChange={(v) => setEditForm({ ...editForm, adults: v })} min={1} />
                        <Counter label="Children (2-12)" value={editForm.children} onChange={(v) => setEditForm({ ...editForm, children: v })} />
                        <Counter label="Infants (0-2)" value={editForm.infants} onChange={(v) => setEditForm({ ...editForm, infants: v })} />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-brand-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Check size={16} /> Save Changes
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 bg-white text-slate-600 border border-slate-200 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // View Mode
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 relative group transition-all hover:shadow-md">
            <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 text-brand-600 bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-50 hover:scale-110"
                title="Edit Trip Details"
            >
                <Edit2 size={16} />
            </button>

            <h3 className="font-bold text-slate-900 text-xl mb-3 flex items-center gap-2">
                Trip to {currentTrip.destination?.name || 'Bali'}
            </h3>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brand-500" />
                    <span className="font-medium">{getDurationDisplay()}</span>
                    {getDateDisplay() && <span className="text-slate-500">• {getDateDisplay()}</span>}
                </div>

                <div className="flex items-center gap-2">
                    <Users size={16} className="text-brand-500" />
                    <span className="font-medium">
                        {currentTrip.travelers.adults} Adults
                        {currentTrip.travelers.children > 0 && `, ${currentTrip.travelers.children} Children`}
                        {currentTrip.travelers.infants > 0 && `, ${currentTrip.travelers.infants} Infants`}
                    </span>
                </div>
            </div>
        </div>
    );
};
