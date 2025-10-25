"use client";

import Link from 'next/link';
import Image from 'next/image';

const NavigationHeader = () => {
    const navLinks = [
        { href: '#about-section', label: 'About' },
        { href: '#work', label: 'Work' },
        { href: '#recognition', label: 'Rewards' },
        { href: '#contact-us', label: 'Join us' },
        // Removed Hello link
    ];

    // The original HTML repeats the content many times for a smooth visual. Duplicating it once is sufficient for a seamless loop effect.
    const marqueeSpans = Array(22).fill(null);

    return (
        <header className="relative w-full text-white bg-black sticky top-0 z-50">
            {/* Scrolling Marquee Banner */}
            <div className="w-full overflow-hidden bg-black text-white">
                <Link href="/?archive=true" aria-label="View Synchronized Archive">
                    <div className="flex whitespace-nowrap py-2 text-overline">
                        <div className="flex-shrink-0 animate-[marquee_80s_linear_infinite]">
                            {marqueeSpans.map((_, index) => (
                                <span key={`marquee-part-1-${index}`} className="px-4 animate-pulse-slow">
                                    Aura <span className="font-normal">Aura</span>
                                </span>
                            ))}
                        </div>
                        <div aria-hidden="true" className="flex-shrink-0 animate-[marquee_80s_linear_infinite]">
                            {marqueeSpans.map((_, index) => (
                                <span key={`marquee-part-2-${index}`} className="px-4 animate-pulse-slow">
                                    Aura <span className="font-normal">Aura</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
            </div>

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

                <div className="hidden md:flex items-center gap-x-8 lg:gap-x-10">
                    {navLinks.map((link, index) => (
                        link.href.startsWith('#') ? (
                            <Link 
                                href={link.href} 
                                key={link.label} 
                                className="relative group text-navigation transition-colors duration-300 animate-slide-in-right" 
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const targetId = link.href.substring(1);
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
        </header>
    );
};

export default NavigationHeader;