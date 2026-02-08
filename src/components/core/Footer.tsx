import { Plane, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shrink-0">
                                <Plane size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                <span className="text-brand-500">Experio</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your AI-powered travel companion. We help you discover, plan, and book the perfect trip tailored just for you.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
                            <li><Link to="/itinerary" className="hover:text-brand-500 transition-colors">My Itinerary</Link></li>
                            <li><Link to="/search" className="hover:text-brand-500 transition-colors">Discover Places</Link></li>
                            <li><a href="#" className="hover:text-brand-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-brand-500 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-brand-500 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-brand-500 transition-colors">Cancellation Policy</a></li>
                            <li><a href="#" className="hover:text-brand-500 transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-brand-500 shrink-0 mt-0.5" />
                                <span>123 Travel Street, Tech Park,<br />Bangalore, KA 560001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-brand-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-brand-500 shrink-0" />
                                <span>hello@experio.ai</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Experio. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
