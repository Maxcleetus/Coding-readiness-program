import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Twitter, Linkedin, ArrowUpRight, ShieldCheck } from 'lucide-react';

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
                    <div className="space-y-8">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => navigate('/')}
                        >
                            <div
                                className="flex flex-col cursor-pointer group"
                                onClick={() => navigate('/')}
                            >
                                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent mb-1.5 group-hover:w-20 transition-all duration-500"></div>
                                <span className="text-[15px] font-medium text-gray-400 tracking-[0.3em] uppercase transition-colors group-hover:text-blue-400">
                                    Coding Readiness
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
                            Architecting the next generation of engineers through
                            mental models and pattern-based technical training.
                        </p>

                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
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
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Trust</h3>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</a></li>
                                <li className="flex items-center gap-2 text-blue-500/80 text-[10px] font-bold tracking-widest uppercase mt-4">
                                    <ShieldCheck size={14} /> Certified Prep
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
