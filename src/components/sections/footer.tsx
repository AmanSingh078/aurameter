"use client";

import React from 'react';
import Image from 'next/image';

const socialLinks = [
  { name: 'Dribbble', href: 'https://dribbble.com/Synchronized' },
  { name: 'Behance', href: 'https://www.behance.net/Synchronized_Studio' },
  { name: 'Instagram', href: 'https://www.instagram.com/synchronized.studio/' },
  { name: 'Linkedin', href: 'https://www.linkedin.com/company/synchronized-studio' },
  { name: 'twitter', href: 'https://twitter.com/synchronized_st' },
  { name: 'Facebook', href: 'https://www.facebook.com/synchronized.studio' },
];

const faceSvgUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/svgs/face-7.svg?";
const sunSvgUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/svgs/sun-5.svg?";

const Marquee = () => {
    const marqueeText = '--------- '.repeat(30);
    return (
        <div className="w-full bg-black py-3 sm:py-4 border-t border-white/10 overflow-hidden">
            <div className="relative flex">
                <div className="animate-marquee whitespace-nowrap">
                    <span className="text-[14px] sm:text-[16px] font-semibold mx-2">{marqueeText}</span>
                </div>
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
                    <span className="text-[14px] sm:text-[16px] font-semibold mx-2">{marqueeText}</span>
                </div>
            </div>
        </div>
    );
};

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Floating particles - Reduced for mobile performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-500/10 animate-float"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              animationDuration: `${Math.random() * 25 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-between min-h-[250px] animate-slide-in-left">
            <div>
              <p className="text-[12px] sm:text-[13px] leading-[1.5] tracking-[0] text-muted-foreground subtitle">
                ©2025.All Rights Reserved.
              </p>
            </div>
            <div className="flex items-end space-x-3 sm:space-x-4">
              <Image src={faceSvgUrl} alt="Face illustration" width={60} height={60} className="w-[60px] sm:w-[80px] h-auto animate-float" style={{ animationDuration: '6s' }} />
              <Image src={sunSvgUrl} alt="Sun illustration" width={80} height={80} className="w-[80px] sm:w-[100px] h-auto animate-[spin_20s_linear_infinite]" />
            </div>
          </div>

          <div className="lg:col-span-7 animate-slide-in-right">
            <p className="text-[9px] sm:text-[10px] font-bold leading-[1.4] tracking-[0.1em] uppercase text-muted-foreground mb-8 sm:mb-10 md:mb-12">
              Discover AuraMeter,<br />a revolutionary platform<br />for measuring and enhancing<br />your digital presence
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-5 sm:gap-y-6 mb-8 sm:mb-10 md:mb-12">
              <div className="space-y-3 sm:space-y-4">
                {socialLinks.slice(0, 3).map((link, index) => (
                  <div key={link.name} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-block text-[clamp(20px,2.5vw,32px)] font-semibold leading-[1.2] tracking-[0] transition-colors duration-300 title"
                      style={{
                        fontFamily: 'var(--font-title)',
                        background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
              <div className="space-y-3 sm:space-y-4">
                {socialLinks.slice(3).map((link, index) => (
                  <div key={link.name} className="animate-slide-in-up" style={{ animationDelay: `${(index + 3) * 0.1}s` }}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-block text-[clamp(20px,2.5vw,32px)] font-semibold leading-[1.2] tracking-[0] capitalize transition-colors duration-300 title"
                      style={{
                        fontFamily: 'var(--font-title)',
                        background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="mailto:hey@synchronized.studio"
              className="inline-flex items-center gap-2 text-[16px] sm:text-[18px] leading-[1.6] tracking-[0] font-normal hover:text-yellow-300 transition-colors duration-300 group animate-fade-in subtitle"
            >
              let's collaborate
              <Image
                src={faceSvgUrl}
                alt=""
                width={24}
                height={24}
                className="transition-transform duration-300 group-hover:rotate-12 animate-float"
                style={{ animationDuration: '4s' }}
              />
            </a>

            <div className="lg:hidden mt-10 sm:mt-12 text-center animate-fade-in">
              <p className="text-[12px] sm:text-[13px] leading-[1.5] tracking-[0] text-muted-foreground subtitle">
                ©2025.All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Marquee />
    </footer>
  );
}