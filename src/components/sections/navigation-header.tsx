"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const NavigationHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const navLinks = [
        { href: '/campus-ceo', label: 'Campus CEO' },
        { href: '/#about-section', label: 'About' },
        { href: '/team', label: 'Team' },
        { href: '/#contact-us', label: 'Contact us' },
    ];

    // The original HTML repeats the content many times for a smooth visual. Duplicating it once is sufficient for a seamless loop effect.
    const marqueeSpans = Array(22).fill(null);
    
    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const menu = document.getElementById('mobile-menu');
            const button = document.getElementById('menu-button');
            
            if (isMenuOpen && menu && button && 
                !menu.contains(e.target as Node) && 
                !button.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Close menu when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMobileLinkClick = (href: string, e: React.MouseEvent) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const targetId = href.substring(2);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <header className="relative w-full text-white bg-black sticky top-0 z-50">


            {/* Navigation Bar */}
            <nav className="w-full bg-black flex items-center justify-between px-4 sm:px-5 md:px-10 lg:px-20 py-3 animate-fade-in">
                <Link href="/#hero" aria-label="Go to homepage" className="animate-slide-in-left">
                    <Image
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/svgs/logo-full-1.svg"
                        alt="Synchronized logo"
                        width={120}
                        height={16}
                        priority
                        className="transition-transform duration-300 hover:scale-105 w-24 sm:w-28 md:w-32 lg:w-36"
                    />
                </Link>

                {/* Mobile menu button */}
                <button 
                    id="menu-button"
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-x-8 lg:gap-x-10">
                    {navLinks.map((link, index) => (
                        link.href.startsWith('/#') ? (
                            <Link 
                                href={link.href} 
                                key={link.label} 
                                className="relative group text-navigation transition-colors duration-300 animate-slide-in-right" 
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const targetId = link.href.substring(2);
                                    const targetElement = document.getElementById(targetId);
                                    if (targetElement) {
                                        targetElement.scrollIntoView({ 
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }
                                }}
                            >
                                <span>{link.label}</span>
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                            </Link>
                        ) : (
                            <Link 
                                href={link.href} 
                                key={link.label} 
                                className="relative group text-navigation transition-colors duration-300 animate-slide-in-right" 
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span>{link.label}</span>
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                            </Link>
                        )
                    ))}
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobile && (
                <div 
                    id="mobile-menu"
                    className={`fixed inset-0 bg-black z-40 transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                    {/* Close Button */}
                    <button 
                        className="absolute top-4 right-4 text-white focus:outline-none"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        {navLinks.map((link) => (
                            link.href.startsWith('/#') ? (
                                <Link 
                                    href={link.href} 
                                    key={link.label} 
                                    className="text-2xl font-medium text-white hover:text-gray-300 transition-colors duration-300 py-2 px-4"
                                    onClick={(e) => handleMobileLinkClick(link.href, e)}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <Link 
                                    href={link.href} 
                                    key={link.label} 
                                    className="text-2xl font-medium text-white hover:text-gray-300 transition-colors duration-300 py-2 px-4"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default NavigationHeader;