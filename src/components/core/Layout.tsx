import { useState } from 'react';
import type { ReactNode } from 'react';
import { Plane, Search, User, MapPin, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer } from './Footer';

interface LayoutProps {
    children: ReactNode;
    showSearch?: boolean;
}

export const Layout = ({ children, showSearch = true }: LayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>

                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shrink-0">
                                <Plane size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                                <span className="text-brand-600">Experio</span>
                            </span>
                        </Link>
                    </div>

                    {showSearch && !isHome && (
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
                        <Link to="/itinerary" className="hidden lg:flex p-2 hover:bg-slate-100 rounded-full transition-colors relative group items-center justify-center min-w-[44px] min-h-[44px]" title="Itinerary Builder">
                            <MapPin size={20} className="text-slate-600" />
                            <span className="hidden sm:block absolute top-full right-0 mt-2 w-max bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                My Itinerary
                            </span>
                        </Link>
                        <button className="hidden lg:flex p-2 hover:bg-slate-100 rounded-full transition-colors relative group items-center justify-center min-w-[44px] min-h-[44px]" title="User Profile">
                            <User size={20} className="text-slate-600" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
                        >
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between h-16">
                                <span className="text-xl font-bold tracking-tight text-slate-900">
                                    <span className="text-brand-600">Experio</span>
                                </span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <Link
                                    to="/itinerary"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-colors font-medium min-h-[44px]"
                                >
                                    <MapPin size={20} />
                                    My Itinerary
                                </Link>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-xl transition-colors font-medium w-full text-left min-h-[44px]"
                                >
                                    <User size={20} />
                                    Profile
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={isHome ? '' : 'container mx-auto px-4 py-8'}>
                {children}
            </main>

            {/* Global Footer */}
            <Footer />
        </div>
    );
};
