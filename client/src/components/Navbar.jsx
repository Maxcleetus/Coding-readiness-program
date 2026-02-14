import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Questions', path: '/questions' },
        { name: 'Today', path: '/today' }
    ];

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Calculate scroll progress percentage
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setScrollProgress((currentScrollY / scrollHeight) * 100);
            }

            // Show/Hide logic
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false); // Scrolling down
            } else {
                setVisible(true); // Scrolling up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`
                fixed top-0 left-0 right-0 w-full border-b border-white/5 
                backdrop-blur-xl bg-black/60 text-white 
                z-[100] transition-all duration-500 ease-in-out
                ${visible ? 'translate-y-0' : '-translate-y-full'}
            `}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div
                        className="flex flex-col cursor-pointer group"
                        onClick={() => navigate('/')}
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent mb-1.5 group-hover:w-20 transition-all duration-500"></div>
                        <span className="text-[10px] font-medium text-gray-400 tracking-[0.3em] uppercase transition-colors group-hover:text-blue-400">
                            Coding Readiness
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`
                                    relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${isActive(item.path)
                                        ? 'text-white bg-white/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                {item.name}
                                {isActive(item.path) && (
                                    <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right side - User actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase py-2 px-4 border border-white/5 rounded-full">
                                Consistency is Key
                            </span>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`
                    md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${mobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                `}>
                    <div className="flex flex-col space-y-1 pb-4">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    navigate(item.path);
                                    setMobileMenuOpen(false);
                                }}
                                className={`
                                    flex items-center justify-between px-4 py-3 rounded-xl transition-all
                                    ${isActive(item.path) ? 'bg-white/10 text-white' : 'text-gray-400'}
                                `}
                            >
                                <span className="text-sm font-medium">{item.name}</span>
                                {isActive(item.path) && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <div 
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-blue-600 via-indigo-500 to-transparent transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />
        </nav>
    );
};

export default Navbar;
