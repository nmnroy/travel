import { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Building, User, Lock, ShieldCheck, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface PaymentFormProps {
    onComplete: () => void;
    amount: number;
}

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'hotel';

export const PaymentForm = ({ onComplete, amount = 120000 }: PaymentFormProps) => {
    const [method, setMethod] = useState<PaymentMethod>('card');
    const [processing, setProcessing] = useState(false);

    // Form States
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    const [upiId, setUpiId] = useState('');
    const [showBilling, setShowBilling] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Price Breakdown Constants
    const taxes = Math.round(amount * 0.18);
    const serviceFee = 500;
    const discount = 5000;
    const total = amount + taxes + serviceFee - discount;

    // Formatting Helpers
    const formatCardNumber = (val: string) => {
        const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiry = (val: string) => {
        const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return `${v.substring(0, 2)} / ${v.substring(2, 4)}`;
        }
        return v;
    };

    const getCardType = (num: string) => {
        if (/^4/.test(num)) return 'Visa';
        if (/^5[1-5]/.test(num)) return 'Mastercard';
        if (/^3[47]/.test(num)) return 'Amex';
        return 'Card';
    };

    // Validation
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (method === 'card') {
            if (cardDetails.number.replace(/\s/g, '').length < 16) newErrors.number = 'Invalid card number';
            if (cardDetails.expiry.length < 5) newErrors.expiry = 'Invalid expiry';
            if (cardDetails.cvv.length < 3) newErrors.cvv = 'Invalid CVV';
            if (cardDetails.name.length < 3) newErrors.name = 'Name required';
        }

        if (method === 'upi') {
            if (!upiId.includes('@')) newErrors.upi = 'Invalid UPI ID';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePay = () => {
        if (validate()) {
            setProcessing(true);
            setTimeout(() => {
                setProcessing(false);
                onComplete();
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Methods Column */}
            <div className="flex-1 space-y-6">

                {/* Method Selector */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                        PAYMENT OPTIONS
                    </div>

                    <div className="divide-y divide-slate-100">
                        <label className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${method === 'card' ? 'bg-brand-50/50' : ''}`}>
                            <input
                                type="radio"
                                name="method"
                                checked={method === 'card'}
                                onChange={() => setMethod('card')}
                                className="w-5 h-5 text-brand-600 focus:ring-brand-500"
                            />
                            <div className="flex items-center gap-3 flex-1">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-brand-600">
                                    <CreditCard size={20} />
                                </div>
                                <span className="font-medium text-slate-900">Credit / Debit Card</span>
                            </div>
                        </label>

                        <label className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${method === 'upi' ? 'bg-brand-50/50' : ''}`}>
                            <input
                                type="radio"
                                name="method"
                                checked={method === 'upi'}
                                onChange={() => setMethod('upi')}
                                className="w-5 h-5 text-brand-600 focus:ring-brand-500"
                            />
                            <div className="flex items-center gap-3 flex-1">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-violet-600">
                                    <Smartphone size={20} />
                                </div>
                                <span className="font-medium text-slate-900">UPI (PhonePe, Google Pay, Paytm)</span>
                            </div>
                        </label>

                        <label className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${method === 'netbanking' ? 'bg-brand-50/50' : ''}`}>
                            <input
                                type="radio"
                                name="method"
                                checked={method === 'netbanking'}
                                onChange={() => setMethod('netbanking')}
                                className="w-5 h-5 text-brand-600 focus:ring-brand-500"
                            />
                            <div className="flex items-center gap-3 flex-1">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-blue-600">
                                    <Building size={20} />
                                </div>
                                <span className="font-medium text-slate-900">Net Banking</span>
                            </div>
                        </label>

                        <label className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${method === 'hotel' ? 'bg-brand-50/50' : ''}`}>
                            <input
                                type="radio"
                                name="method"
                                checked={method === 'hotel'}
                                onChange={() => setMethod('hotel')}
                                className="w-5 h-5 text-brand-600 focus:ring-brand-500"
                            />
                            <div className="flex items-center gap-3 flex-1">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-green-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <span className="font-medium text-slate-900 block">Pay at Hotel</span>
                                    <span className="text-xs text-slate-500">Subject to property policy</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Dynamic Form Area */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[300px]">
                    {method === 'card' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                CARD INFORMATION
                                <span className="ml-auto flex gap-1">
                                    {['visa', 'mastercard', 'amex'].map(t => (
                                        <div key={t} className="w-8 h-5 bg-slate-100 rounded border border-slate-200" />
                                    ))}
                                </span>
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className={`w-full p-3 pl-10 bg-slate-50 rounded-lg border font-mono tracking-widest ${errors.number ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'} outline-none transition-all`}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            value={cardDetails.number}
                                            onChange={e => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
                                        />
                                        <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
                                        <div className="absolute right-3 top-3.5 text-xs font-bold text-brand-600">
                                            {getCardType(cardDetails.number)}
                                        </div>
                                    </div>
                                    {errors.number && <p className="text-xs text-red-500 mt-1">{errors.number}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Expiry Date</label>
                                        <input
                                            type="text"
                                            className={`w-full p-3 bg-slate-50 rounded-lg border font-mono text-center ${errors.expiry ? 'border-red-300' : 'border-slate-200 focus:border-brand-500'} outline-none`}
                                            placeholder="MM / YY"
                                            maxLength={5}
                                            value={cardDetails.expiry}
                                            onChange={e => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                                        />
                                        {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">CVV</label>
                                        <input
                                            type="password"
                                            className={`w-full p-3 bg-slate-50 rounded-lg border font-mono text-center tracking-widest ${errors.cvv ? 'border-red-300' : 'border-slate-200 focus:border-brand-500'} outline-none`}
                                            placeholder="***"
                                            maxLength={4}
                                            value={cardDetails.cvv}
                                            onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                                        />
                                        {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Cardholder Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className={`w-full p-3 pl-10 bg-slate-50 rounded-lg border ${errors.name ? 'border-red-300' : 'border-slate-200 focus:border-brand-500'} outline-none uppercase`}
                                            placeholder="JOHN DOE"
                                            value={cardDetails.name}
                                            onChange={e => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                                        />
                                        <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                                    </div>
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {method === 'upi' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                            <h3 className="font-bold text-slate-800 mb-4">
                                ENTER UPI ID
                            </h3>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">UPI ID</label>
                                <input
                                    type="text"
                                    className={`w-full p-3 bg-slate-50 rounded-lg border ${errors.upi ? 'border-red-300' : 'border-slate-200 focus:border-brand-500'} outline-none`}
                                    placeholder="yourname@bank"
                                    value={upiId}
                                    onChange={e => setUpiId(e.target.value)}
                                />
                                {errors.upi && <p className="text-xs text-red-500 mt-1">{errors.upi}</p>}
                                <p className="text-xs text-slate-400 mt-2">A payment request will be sent to your UPI app.</p>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Or Pay Using</p>
                                <div className="flex gap-4">
                                    {['PhonePe', 'GPay', 'Paytm'].map(app => (
                                        <button key={app} className="flex-1 py-2 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors">
                                            📱 {app}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {method === 'netbanking' && (
                        <div className="text-center py-10 text-slate-500">
                            Select your bank from the list (Mock Placeholder)
                        </div>
                    )}

                    {/* Billing Address Toggle */}
                    <div className="pt-6 mt-6 border-t border-slate-100">
                        <button
                            className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-brand-600 transition-colors w-full"
                            onClick={() => setShowBilling(!showBilling)}
                        >
                            {showBilling ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            Billing Address
                        </button>

                        {showBilling && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                <input className="col-span-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" placeholder="Full Address" />
                                <input className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" placeholder="City" />
                                <input className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" placeholder="State" />
                                <input className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" placeholder="PIN Code" />
                                <input className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm" placeholder="Country" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Summary Column */}
            <div className="lg:w-96 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
                    <h3 className="font-bold text-slate-900 mb-6 text-lg">PAYMENT SUMMARY</h3>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between text-slate-600">
                            <span>Trip Cost (2 Travelers)</span>
                            <span>₹{amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Taxes & Fees (18%)</span>
                            <span>₹{taxes.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                            <span>Service Fee</span>
                            <span>₹{serviceFee}</span>
                        </div>
                        <div className="flex justify-between text-green-600 font-medium">
                            <span>Travel Pro Discount</span>
                            <span>-₹{discount.toLocaleString()}</span>
                        </div>

                        <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between items-center">
                            <span className="font-bold text-slate-900 text-lg">TOTAL</span>
                            <span className="font-bold text-brand-700 text-xl">₹{total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePay}
                        disabled={processing}
                        className="w-full mt-8 py-4 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-200 hover:bg-brand-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" /> Processing...
                            </>
                        ) : (
                            <>
                                Pay ₹{total.toLocaleString()} <Lock size={18} />
                            </>
                        )}
                    </button>

                    <div className="mt-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded justify-center">
                            <Lock size={12} className="text-green-600" />
                            Secure Payment via Stripe (Mock)
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded justify-center">
                            <ShieldCheck size={12} className="text-brand-600" />
                            100% Payment Protection
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
