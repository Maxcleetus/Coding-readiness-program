import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Questions', path: '/questions' },
        { name: 'Today', path: '/today' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="  border-b border-gray-900 text-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo with glow effect */}
                    <div
                        className="flex items-center space-x-2 cursor-pointer group"
                        onClick={() => navigate('/')}
                    >
                        <div className="relative">
                            <div className="absolute -inset-1   rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                            <div className="relative px-4 py-2 bg-black rounded-lg">
                                <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                                    Coding Readiness Program
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`
                  relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${isActive(item.path)
                                        ? 'text-white bg-gray-900/50'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-900/30'
                                    }
                `}
                            >
                                {isActive(item.path) && (
                                    <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></span>
                                )}
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Right side - User actions */}
                    <div className="flex items-center space-x-3">
                        <div className="relative px-4 py-2 max-md:hidden bg-black rounded-lg">
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                                Welcome
                            </span>
                        </div>


                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors"
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-900 animate-fadeIn">
                        <div className="flex flex-col space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        navigate(item.path);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`
                    flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300
                    ${isActive(item.path)
                                            ? 'bg-gray-900/50 text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-900/30'
                                        }
                  `}
                                >
                                    <span className="font-medium">{item.name}</span>
                                    {isActive(item.path) && (
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                                    )}
                                </button>
                            ))}


                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;