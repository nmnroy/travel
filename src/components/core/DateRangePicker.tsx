import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import { useTripStore } from "../../store/useTripStore";
import 'react-day-picker/dist/style.css';

export const DateRangePicker = () => {
    const { dateRange, setDateRange } = useTripStore();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelect = (range: any) => {
        setDateRange(range || { from: undefined, to: undefined });
    };

    return (
        <div className="relative">
            <button
                onClick={toggleOpen}
                className={`flex items-center gap-2 px-4 py-2 bg-white rounded-lg border ${isOpen ? 'border-brand-500 ring-2 ring-brand-100' : 'border-slate-200 hover:border-brand-300'
                    } transition-all shadow-sm w-full md:w-64 text-left`}
            >
                <CalendarIcon size={18} className="text-brand-600" />
                <div className="flex-1 truncate">
                    {dateRange?.from ? (
                        dateRange.to ? (
                            <>
                                <span className="font-medium text-slate-700">{format(dateRange.from, "MMM dd")}</span>
                                <span className="mx-2 text-slate-400">→</span>
                                <span className="font-medium text-slate-700">{format(dateRange.to, "MMM dd")}</span>
                            </>
                        ) : (
                            <span className="font-medium text-slate-700">{format(dateRange.from, "MMM dd")}</span>
                        )
                    ) : (
                        <span className="text-slate-400">Select Dates</span>
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
                    <DayPicker
                        mode="range"
                        selected={dateRange}
                        onSelect={handleSelect}
                        numberOfMonths={1}
                        modifiersClassNames={{
                            selected: 'bg-brand-600 text-white hover:bg-brand-700',
                            today: 'font-bold text-brand-600',
                            range_middle: 'bg-brand-50 text-brand-900',
                            range_start: 'bg-brand-600 text-white rounded-l-md',
                            range_end: 'bg-brand-600 text-white rounded-r-md'
                        }}
                        styles={{
                            caption: { color: '#0f172a' }
                        }}
                    />
                    <div className="flex justify-end pt-2 border-t border-slate-100 mt-2">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-brand-600 font-medium hover:text-brand-700"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};
