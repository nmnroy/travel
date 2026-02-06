import { Star, ThumbsUp } from 'lucide-react';

interface ReviewProps {
    id: string;
    author: string;
    avatar?: string;
    rating: number;
    date: string;
    text: string;
    likes: number;
    verified?: boolean;
}

export const ReviewCard = ({ author, rating, date, text, likes, verified }: ReviewProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold uppercase">
                        {author.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                            {author}
                            {verified && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                    Verified Stay
                                </span>
                            )}
                        </h4>
                        <p className="text-sm text-slate-500">{date}</p>
                    </div>
                </div>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-bold text-slate-900">{rating.toFixed(1)}</span>
                </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-4">{text}</p>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 transition-colors">
                    <ThumbsUp size={16} />
                    Helpful ({likes})
                </button>
            </div>
        </div>
    );
};
