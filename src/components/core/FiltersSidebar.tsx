import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

export const FiltersSidebar = () => {
    const [priceRange, setPriceRange] = useState([500, 5000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);

    const categories = [
        { id: 'beach', label: '🏖️ Beach' },
        { id: 'mountain', label: '⛰️ Mountain' },
        { id: 'city', label: 'kafka City' },
        { id: 'nature', label: '🌿 Nature' },
        { id: 'culture', label: '🏛️ Culture' },
    ];

    const toggleCategory = (id: string) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit space-y-8">
            <div>
                <h3 className="font-bold text-slate-900 mb-4">Price Range</h3>
                <div className="px-2">
                    <Slider
                        range
                        min={0}
                        max={10000}
                        step={100}
                        defaultValue={priceRange}
                        onChange={(val) => setPriceRange(val as number[])}
                        trackStyle={[{ backgroundColor: '#4f46e5' }]}
                        handleStyle={[
                            { borderColor: '#4f46e5', backgroundColor: '#fff', opacity: 1 },
                            { borderColor: '#4f46e5', backgroundColor: '#fff', opacity: 1 },
                        ]}
                        railStyle={{ backgroundColor: '#e2e8f0' }}
                    />
                </div>
                <div className="flex justify-between mt-4 text-sm font-medium text-slate-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
                <div className="space-y-3">
                    {categories.map(cat => (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat.id)
                                    ? 'bg-brand-600 border-brand-600 text-white'
                                    : 'border-slate-300 group-hover:border-brand-400'
                                }`}>
                                {selectedCategories.includes(cat.id) && (
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedCategories.includes(cat.id)}
                                onChange={() => toggleCategory(cat.id)}
                            />
                            <span className="text-slate-600 group-hover:text-slate-900">{cat.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-900 mb-4">Min Rating</h3>
                <div className="flex gap-2">
                    {[4, 4.5].map(rating => (
                        <button
                            key={rating}
                            onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${minRating === rating
                                    ? 'bg-brand-50 border-brand-200 text-brand-700'
                                    : 'border-slate-200 text-slate-600 hover:border-brand-200'
                                }`}
                        >
                            {rating}+ ⭐
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
