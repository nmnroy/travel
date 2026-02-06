import type { ReactNode } from 'react';
import { Plane, Search, User, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
    showSearch?: boolean;
}

export const Layout = ({ children, showSearch = true }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shrink-0">
                            <Plane size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                            <span className="text-brand-600">Experio</span>
                        </span>
                    </Link>

                    {showSearch && (
                        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 gap-2 border border-transparent focus-within:border-brand-300 transition-all">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Where to next?"
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link to="/itinerary" className="p-2 hover:bg-slate-100 rounded-full transition-colors relative group" title="Itinerary Builder">
                            <MapPin size={20} className="text-slate-600" />
                            <span className="hidden sm:block absolute top-full right-0 mt-2 w-max bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                My Itinerary
                            </span>
                        </Link>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative group" title="User Profile">
                            <User size={20} className="text-slate-600" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer (Simplified) */}
            <footer className="bg-white border-t border-slate-200 py-8 mt-20">
                <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                    © {new Date().getFullYear()} Experio. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
