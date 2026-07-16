import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Practice', path: '/questions' },
        { name: 'Daily Challenge', path: '/today' },
        { name: 'Home', path: '/' },
    ];

    return (
        <footer className="relative bg-[#030303] border-t border-white/5 pt-24 pb-12 overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_30px_rgba(59,130,246,0.5)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

                    {/* Left Side: Brand Info */}
                    <div className="space-y-6">
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => navigate('/')}
                        >
                            <img 
                                src="/logo.png" 
                                alt="Coding Readiness Logo" 
                                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                            />
                            <div className="flex flex-col">
                                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent mb-1 group-hover:w-20 transition-all duration-500"></div>
                                <span className="text-[16px] font-semibold text-white tracking-[0.25em] uppercase transition-colors group-hover:text-blue-400">
                                    Coding Readiness
                                </span>
                                <span className="text-[9px] font-medium text-gray-500 tracking-[0.2em] uppercase">
                                    RIT Kottayam
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Architecting the next generation of engineers through
                            mental models and pattern-based technical training.
                        </p>

                        <div className="border-l-2 border-blue-500/50 pl-4 py-1.5 space-y-1">
                            <p className="text-gray-500 text-[10px] tracking-widest uppercase font-bold">Venue & Host</p>
                            <p className="text-gray-200 text-sm font-semibold">
                                Rajiv Gandhi Institute of Technology (RIT)
                            </p>
                            <p className="text-gray-400 text-xs">
                                Government Engineering College, Kottayam, Kerala
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Navigation */}
                    <div className="grid grid-cols-2 gap-8 md:justify-items-end">
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Explore</h3>
                            <ul className="space-y-4">
                                {footerLinks.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => navigate(link.path)}
                                            className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 group"
                                        >
                                            {link.name}
                                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Institution</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a 
                                        href="https://www.rit.ac.in/" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 group"
                                    >
                                        RIT Website
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                                    </a>
                                </li>
                                <li>
                                    <span className="text-gray-400 text-sm font-medium">
                                        Dept. of Computer Science
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
                    <p className="text-gray-600 text-[11px] font-medium tracking-widest uppercase mb-4 md:mb-0">
                        © {currentYear} Coding Readiness. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-medium">System Operational</span>
                        </div>
                        <p className="text-gray-700 text-[11px] font-medium tracking-[0.3em] hidden sm:block">
                            V2.4.0-STABLE
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
