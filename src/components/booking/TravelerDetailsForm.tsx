import { useState, useEffect } from 'react';
import { User, Mail, Phone, Users, Globe, Calendar, AlertCircle } from 'lucide-react';

interface TravelerDetailsFormProps {
    onComplete: (data: any) => void;
    initialData?: any;
}

interface travelerErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    emergencyName?: string;
    emergencyPhone?: string;
    passportNumber?: string;
    passportExpiry?: string;
}

export const TravelerDetailsForm = ({ onComplete, initialData }: TravelerDetailsFormProps) => {
    const [formData, setFormData] = useState({
        fullName: initialData?.fullName || '',
        email: initialData?.email || '',
        phoneCode: '+91',
        phone: '',
        travelers: 2,
        ageGroups: {
            adults: true,
            children: false,
            infants: false
        },
        specialRequests: '',
        emergencyContact: {
            name: '',
            phone: '',
            relationship: 'Spouse'
        },
        isInternational: false,
        passport: {
            number: '',
            expiry: '',
            nationality: 'India'
        }
    });

    const [errors, setErrors] = useState<travelerErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validate = () => {
        const newErrors: travelerErrors = {};
        let isValid = true;

        if (formData.fullName.length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        if (formData.emergencyContact.name.length < 2) {
            newErrors.emergencyName = 'Emergency contact name is required';
            isValid = false;
        }

        if (!phoneRegex.test(formData.emergencyContact.phone)) {
            newErrors.emergencyPhone = 'Valid emergency contact phone is required';
            isValid = false;
        }

        if (formData.isInternational) {
            if (formData.passport.number.length < 6) {
                newErrors.passportNumber = 'Valid passport number is required';
                isValid = false;
            }
            if (!formData.passport.expiry) {
                newErrors.passportExpiry = 'Passport expiry date is required';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        // Mark all as touched
        setTouched({
            fullName: true,
            email: true,
            phone: true,
            emergencyName: true,
            emergencyPhone: true,
            passportNumber: true,
            passportExpiry: true
        });

        if (validate()) {
            onComplete(formData);
        }
    };

    // Calculate total price estimate based on travelers (mock)
    const basePrice = 15000; // Mock base price per person
    const totalPrice = basePrice * formData.travelers;

    return (
        <div className="space-y-8">
            {/* Primary Traveler Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <User size={20} className="text-brand-600" />
                    Primary Traveler
                </h3>

                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                type="text"
                                className={`w-full p-3 md:p-3 pl-10 bg-slate-50 rounded-lg border ${errors.fullName && touched.fullName ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-100'} outline-none transition-all text-base`}
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                onBlur={() => setTouched({ ...touched, fullName: true })}
                            />
                            <User size={18} className="absolute left-3 top-3.5 text-slate-400" />
                        </div>
                        {errors.fullName && touched.fullName && (
                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                <AlertCircle size={12} /> {errors.fullName}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                type="email"
                                className={`w-full p-3 md:p-3 pl-10 bg-slate-50 rounded-lg border ${errors.email && touched.email ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-100'} outline-none transition-all text-base`}
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onBlur={() => setTouched({ ...touched, email: true })}
                            />
                            <Mail size={18} className="absolute left-3 top-3.5 text-slate-400" />
                        </div>
                        {errors.email && touched.email && (
                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                <AlertCircle size={12} /> {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <select
                                className="p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none text-base"
                                value={formData.phoneCode}
                                onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                            >
                                <option value="+91">🇮🇳 +91</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+61">🇦🇺 +61</option>
                            </select>
                            <div className="relative flex-1">
                                <input
                                    type="tel"
                                    className={`w-full p-3 md:p-3 pl-10 bg-slate-50 rounded-lg border ${errors.phone && touched.phone ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-100'} outline-none transition-all text-base`}
                                    placeholder="98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setFormData({ ...formData, phone: val });
                                    }}
                                    onBlur={() => setTouched({ ...touched, phone: true })}
                                />
                                <Phone size={18} className="absolute left-3 top-3.5 text-slate-400" />
                            </div>
                        </div>
                        {errors.phone && touched.phone && (
                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                <AlertCircle size={12} /> {errors.phone}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Trip Details Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Users size={20} className="text-brand-600" />
                    Trip Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Number of Travelers</label>
                        <select
                            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-brand-300"
                            value={formData.travelers}
                            onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1} Traveler{i > 0 ? 's' : ''}</option>
                            ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-1">Estimated Total: <span className="font-bold text-brand-600">₹{totalPrice.toLocaleString()}</span></p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Age Groups</label>
                        <div className="flex gap-4 flex-wrap">
                            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 hover:border-brand-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.ageGroups.adults}
                                    onChange={(e) => setFormData({ ...formData, ageGroups: { ...formData.ageGroups, adults: e.target.checked } })}
                                    className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                                />
                                <span className="text-sm text-slate-700">Adults (18+)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 hover:border-brand-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.ageGroups.children}
                                    onChange={(e) => setFormData({ ...formData, ageGroups: { ...formData.ageGroups, children: e.target.checked } })}
                                    className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                                />
                                <span className="text-sm text-slate-700">Children (2-17)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 hover:border-brand-200 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={formData.ageGroups.infants}
                                    onChange={(e) => setFormData({ ...formData, ageGroups: { ...formData.ageGroups, infants: e.target.checked } })}
                                    className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                                />
                                <span className="text-sm text-slate-700">Infants (0-2)</span>
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                        <label className="text-sm font-medium text-slate-700">Special Requests <span className="text-slate-400 font-normal">(Optional)</span></label>
                        <textarea
                            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-brand-300 min-h-[100px]"
                            placeholder="Any dietary restrictions, accessibility needs, or special occasions?"
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Passport Details (Conditional) */}
            <div className={`transition-all duration-300 ${formData.isInternational ? 'opacity-100' : 'opacity-70 grayscale'}`}>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                    {!formData.isInternational && (
                        <div className="absolute inset-0 bg-slate-50/50 z-10 flex items-center justify-center">

                        </div>
                    )}

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Globe size={20} className="text-brand-600" />
                            International Travel Details
                        </h3>
                        <label className="flex items-center gap-2 cursor-pointer relative z-20">
                            <input
                                type="checkbox"
                                checked={formData.isInternational}
                                onChange={(e) => setFormData({ ...formData, isInternational: e.target.checked })}
                                className="w-4 h-4 text-brand-600 rounded"
                            />
                            <span className="text-sm font-medium text-slate-700">International Trip?</span>
                        </label>
                    </div>

                    {formData.isInternational && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Passport Number <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className={`w-full p-3 bg-slate-50 rounded-lg border ${errors.passportNumber && touched.passportNumber ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-300'} outline-none uppercase`}
                                    placeholder="X1234567"
                                    value={formData.passport.number}
                                    onChange={(e) => setFormData({ ...formData, passport: { ...formData.passport, number: e.target.value } })}
                                    onBlur={() => setTouched({ ...touched, passportNumber: true })}
                                />
                                {errors.passportNumber && touched.passportNumber && (
                                    <p className="text-xs text-red-500 mt-1">{errors.passportNumber}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Passport Expiry <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className={`w-full p-3 pl-10 bg-slate-50 rounded-lg border ${errors.passportExpiry && touched.passportExpiry ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-300'} outline-none`}
                                        value={formData.passport.expiry}
                                        onChange={(e) => setFormData({ ...formData, passport: { ...formData.passport, expiry: e.target.value } })}
                                        onBlur={() => setTouched({ ...touched, passportExpiry: true })}
                                    />
                                    <Calendar size={18} className="absolute left-3 top-3.5 text-slate-400" />
                                </div>
                                {errors.passportExpiry && touched.passportExpiry && (
                                    <p className="text-xs text-red-500 mt-1">{errors.passportExpiry}</p>
                                )}
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-slate-700">Nationality <span className="text-red-500">*</span></label>
                                <select
                                    className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-brand-300"
                                    value={formData.passport.nationality}
                                    onChange={(e) => setFormData({ ...formData, passport: { ...formData.passport, nationality: e.target.value } })}
                                >
                                    <option value="India">India</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertCircle size={20} className="text-brand-600" />
                    Emergency Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Contact Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            className={`w-full p-3 bg-slate-50 rounded-lg border ${errors.emergencyName && touched.emergencyName ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-300'} outline-none text-base`}
                            placeholder="Jane Doe"
                            value={formData.emergencyContact.name}
                            onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, name: e.target.value } })}
                            onBlur={() => setTouched({ ...touched, emergencyName: true })}
                        />
                        {errors.emergencyName && touched.emergencyName && (
                            <p className="text-xs text-red-500 mt-1">{errors.emergencyName}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Contact Phone <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            className={`w-full p-3 bg-slate-50 rounded-lg border ${errors.emergencyPhone && touched.emergencyPhone ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-300'} outline-none text-base`}
                            placeholder="98765 00000"
                            value={formData.emergencyContact.phone}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, phone: val } });
                            }}
                            onBlur={() => setTouched({ ...touched, emergencyPhone: true })}
                        />
                        {errors.emergencyPhone && touched.emergencyPhone && (
                            <p className="text-xs text-red-500 mt-1">{errors.emergencyPhone}</p>
                        )}
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Relationship <span className="text-red-500">*</span></label>
                        <select
                            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-brand-300 text-base"
                            value={formData.emergencyContact.relationship}
                            onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, relationship: e.target.value } })}
                        >
                            <option value="Spouse">Spouse</option>
                            <option value="Parent">Parent</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSubmit}
                    className="w-full md:w-auto px-8 py-3 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-200 hover:bg-brand-700 hover:scale-[1.02] active:scale-95 transition-all text-base"
                >
                    Continue to Payment
                </button>
            </div>
        </div>
    );
};
