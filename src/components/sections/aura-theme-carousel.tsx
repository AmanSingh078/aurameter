"use client";

import React, { useState, useEffect, useRef } from 'react';

const AuraThemeCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null);

  // Card data from vvv.html
  const cards = [
    {
      name: "Neon Pulse",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
      alt: "Neon Pulse - Musical instruments in neon lighting"
    },
    {
      name: "Cyber Dream",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=800",
      alt: "Cyber Dream - Futuristic mountain landscape"
    },
    {
      name: "Aurora Vibe",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
      alt: "Aurora Vibe - Premium product photography"
    },
    {
      name: "Vapor Light",
      image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=800",
      alt: "Vapor Light - Vintage technology"
    },
    {
      name: "Sunset Calm",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
      alt: "Sunset Calm - Portrait in warm lighting"
    }
  ];

  // Create indicators
  const indicators = cards.map((_, i) => (
    <div 
      key={i}
      className={`indicator ${i === index ? 'active' : ''}`}
      onClick={() => goToSlide(i)}
      role="tab"
      aria-label={`Go to slide ${i + 1}`}
    />
  ));

  // Update carousel positions
  const updateCarousel = () => {
    const total = cards.length;
    const activeIndex = index % total;
    const left1Index = (index - 1 + total) % total;
    const left2Index = (index - 2 + total) % total;
    const right1Index = (index + 1) % total;
    const right2Index = (index + 2) % total;

    // Reset all cards
    const cardElements = carouselRef.current?.querySelectorAll('.card');
    if (!cardElements) return;

    cardElements.forEach(card => {
      card.className = 'card';
      card.classList.add('hidden');
    });

    // Position cards
    cardElements[activeIndex].classList.remove('hidden');
    cardElements[activeIndex].classList.add('active');

    cardElements[left1Index].classList.remove('hidden');
    cardElements[left1Index].classList.add('left1');

    cardElements[left2Index].classList.remove('hidden');
    cardElements[left2Index].classList.add('left2');

    cardElements[right1Index].classList.remove('hidden');
    cardElements[right1Index].classList.add('right1');

    cardElements[right2Index].classList.remove('hidden');
    cardElements[right2Index].classList.add('right2');
  };

  // Auto-rotation functionality
  const startAutoRotate = () => {
    if (autoRotateInterval.current) clearInterval(autoRotateInterval.current);
    autoRotateInterval.current = setInterval(() => {
      next();
    }, 3000);
  };

  const stopAutoRotate = () => {
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
      autoRotateInterval.current = null;
    }
  };

  // Navigation functions
  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => (prev + 1) % cards.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex(prev => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const goToSlide = (i: number) => {
    if (isAnimating || i === index) return;
    setIsAnimating(true);
    setIndex(i);
    setTimeout(() => setIsAnimating(false), 700);
    stopAutoRotate();
    startAutoRotate();
  };

  // Handle card click - navigate to clicked card
  const handleCardClick = (clickedCard: HTMLElement) => {
    const cardClasses = clickedCard.className;

    // If active card is clicked, go to next
    if (cardClasses.includes('active')) {
      next();
    }
    // If right1 card is clicked, go forward
    else if (cardClasses.includes('right1')) {
      next();
    }
    // If right2 card is clicked, go forward twice
    else if (cardClasses.includes('right2')) {
      next();
      setTimeout(() => next(), 100);
    }
    // If left1 card is clicked, go backward
    else if (cardClasses.includes('left1')) {
      prev();
    }
    // If left2 card is clicked, go backward twice
    else if (cardClasses.includes('left2')) {
      prev();
      setTimeout(() => prev(), 100);
    }
  };

  // Touch and mouse interaction handlers
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let hasMoved = false;
  let startTime = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    isDragging = false;
    hasMoved = false;
    stopAutoRotate();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const moveX = Math.abs(e.touches[0].clientX - startX);
    const moveY = Math.abs(e.touches[0].clientY - startY);

    // Consider it a drag if moved more than 10px
    if (moveX > 10 || moveY > 10) {
      isDragging = true;
      hasMoved = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const timeDiff = Date.now() - startTime;

    // If it's a quick tap (less than 200ms) and minimal movement, treat as click
    if (!hasMoved && timeDiff < 200 && Math.abs(diff) < 10) {
      const clickedCard = e.target as HTMLElement;
      if (clickedCard.closest('.card')) {
        handleCardClick(clickedCard.closest('.card') as HTMLElement);
        startAutoRotate();
        return;
      }
    }

    // Handle swipe
    if (hasMoved && Math.abs(diff) >= 50) {
      if (diff < 0) {
        next();
      } else {
        prev();
      }
    }

    startAutoRotate();
    isDragging = false;
    hasMoved = false;
  };

  // Desktop mouse drag with improved click detection
  let mouseStartX = 0;
  let mouseStartY = 0;
  let isMouseDragging = false;
  let mouseHasMoved = false;
  let mouseStartTime = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
    mouseStartTime = Date.now();
    isMouseDragging = false;
    mouseHasMoved = false;
    stopAutoRotate();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (mouseStartX === 0) return;

    const moveX = Math.abs(e.clientX - mouseStartX);
    const moveY = Math.abs(e.clientY - mouseStartY);

    // Consider it a drag if moved more than 5px
    if (moveX > 5 || moveY > 5) {
      isMouseDragging = true;
      mouseHasMoved = true;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (mouseStartX === 0) return;

    const endX = e.clientX;
    const diff = endX - mouseStartX;
    const timeDiff = Date.now() - mouseStartTime;

    // If it's a quick click (less than 200ms) and minimal movement, treat as click
    if (!mouseHasMoved && timeDiff < 200 && Math.abs(diff) < 5) {
      const clickedCard = e.target as HTMLElement;
      if (clickedCard.closest('.card')) {
        handleCardClick(clickedCard.closest('.card') as HTMLElement);
        startAutoRotate();
        mouseStartX = 0;
        mouseStartY = 0;
        isMouseDragging = false;
        mouseHasMoved = false;
        return;
      }
    }

    // Handle drag
    if (mouseHasMoved && Math.abs(diff) >= 60) {
      if (diff < 0) {
        next();
      } else {
        prev();
      }
    }

    startAutoRotate();
    mouseStartX = 0;
    mouseStartY = 0;
    isMouseDragging = false;
    mouseHasMoved = false;
  };

  // Initialize and cleanup
  useEffect(() => {
    updateCarousel();
    startAutoRotate();

    // Add mouse move/up listeners to document for better drag detection
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [index]);

  return (
    <div className="container">
      <div className="heading">
        <h1>Aura Theme Universe</h1>
      </div>

      <div 
        ref={carouselRef}
        className="scene"
        role="region" 
        aria-label="Image carousel" 
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {cards.map((card, i) => (
          <div 
            key={i}
            className="card hidden"
            data-index={i}
            data-name={card.name}
            role="img" 
            aria-label={card.name}
          >
            <img 
              src={card.image} 
              alt={card.alt} 
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="controls">
        <button 
          className="nav-btn" 
          id="prevBtn" 
          aria-label="Previous slide"
          onClick={prev}
        >
          ‹
        </button>
        <div className="indicators" role="tablist" aria-label="Carousel navigation">
          {indicators}
        </div>
        <button 
          className="nav-btn" 
          id="nextBtn" 
          aria-label="Next slide"
          onClick={next}
        >
          ›
        </button>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          /* Remove tap highlight on all elements */
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }

        :root {
          /* Mobile-first variables - smaller cards */
          --card-width: min(75vw, 300px);
          --card-height: min(120vw, 460px);
          --z-front: 100px;
          --z-mid: 50px;
          --z-back: 0px;
          --spacing-x: 60px;
          --spacing-x-far: 110px;
          --rotation: 15deg;
          --rotation-far: 25deg;
          
          /* Black & Gold Theme */
          --gold-primary: #D4AF37;
          --gold-light: #F4E4B8;
          --black-primary: #0a0a0a;
          --black-secondary: #1a1a1a;
        }

        .container {
          width: 100%;
          max-width: 1400px;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          margin: 0 auto;
        }

        /* Professional Black & Gold Heading */
        .heading {
          text-align: center;
          margin-bottom: 10px;
        }

        .heading h1 {
          font-size: clamp(28px, 6vw, 48px);
          font-weight: 700;
          background: linear-gradient(135deg, #F4E4B8 0%, #D4AF37 50%, #B8935E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 1.5px;
          line-height: 1.2;
          position: relative;
          padding-bottom: 12px;
          text-transform: uppercase;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
        }

        .heading h1::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%);
          border-radius: 2px;
        }

        .scene {
          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          perspective: 1400px;
          touch-action: pan-y;
          margin: 0 auto;
          outline: none;
        }

        .card {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          top: 0;
          left: 0;
          transform-style: preserve-3d;
          transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(212, 175, 55, 0.1);
          cursor: pointer;
          /* GPU acceleration optimization */
          will-change: transform, opacity, filter;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .card:focus,
        .card:active {
          outline: none;
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          pointer-events: none;
          /* GPU acceleration for images */
          will-change: transform;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Premium gradient overlay */
        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(0, 0, 0, 0.4) 70%,
            rgba(0, 0, 0, 0.85) 100%
          );
          z-index: 1;
          pointer-events: none;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }

        /* Card label with refined black & gold styling */
        .card::after {
          content: attr(data-name);
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: #D4AF37;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          z-index: 2;
          transition: all 0.3s ease;
          pointer-events: none;
          will-change: opacity, transform;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          font-family: "Poppins", sans-serif;
        }

        /* Depth positioning classes */
        .card.active {
          transform: translateZ(var(--z-front)) scale(1);
          z-index: 10;
          filter: blur(0) brightness(1);
          opacity: 1;
          box-shadow: 
            0 25px 70px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(212, 175, 55, 0.15),
            0 0 30px rgba(212, 175, 55, 0.08);
        }

        .card.active img {
          transform: scale(1.05) translate3d(0, 0, 0);
        }

        .card.active::after {
          opacity: 1;
          transform: translateY(0) translate3d(0, 0, 0);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .card.left1 {
          transform: translateX(calc(-1 * var(--spacing-x))) translateZ(var(--z-mid)) rotateY(var(--rotation)) scale(0.88);
          z-index: 8;
          filter: blur(1.5px) brightness(0.75);
          opacity: 0.8;
        }

        .card.right1 {
          transform: translateX(var(--spacing-x)) translateZ(var(--z-mid)) rotateY(calc(-1 * var(--rotation))) scale(0.88);
          z-index: 8;
          filter: blur(1.5px) brightness(0.75);
          opacity: 0.8;
        }

        .card.left2 {
          transform: translateX(calc(-1 * var(--spacing-x-far))) translateZ(var(--z-back)) rotateY(var(--rotation-far)) scale(0.72);
          z-index: 6;
          filter: blur(3px) brightness(0.6);
          opacity: 0.6;
        }

        .card.right2 {
          transform: translateX(var(--spacing-x-far)) translateZ(var(--z-back)) rotateY(calc(-1 * var(--rotation-far))) scale(0.72);
          z-index: 6;
          filter: blur(3px) brightness(0.6);
          opacity: 0.6;
        }

        .card.hidden {
          transform: translateZ(-200px) scale(0.5);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* Hover effect for side cards */
        .card.left1:hover,
        .card.right1:hover,
        .card.left2:hover,
        .card.right2:hover {
          filter: blur(1px) brightness(0.85);
          opacity: 0.95;
        }

        /* Navigation controls */
        .controls {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(26, 26, 26, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.25);
          backdrop-filter: blur(10px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 18px;
          color: #D4AF37;
          user-select: none;
          outline: none;
          /* GPU acceleration for buttons */
          will-change: transform;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          font-family: "Poppins", sans-serif;
        }

        .nav-btn:focus,
        .nav-btn:active {
          outline: none;
        }

        .nav-btn:hover {
          background: rgba(26, 26, 26, 0.95);
          border-color: rgba(212, 175, 55, 0.4);
          color: #F4E4B8;
          transform: scale(1.08) translate3d(0, 0, 0);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
        }

        .nav-btn:active {
          transform: scale(0.95) translate3d(0, 0, 0);
        }

        .indicators {
          display: flex;
          gap: 8px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(212, 175, 55, 0.1);
          outline: none;
          /* GPU acceleration for indicators */
          will-change: transform, width;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .indicator:focus,
        .indicator:active {
          outline: none;
        }

        .indicator.active {
          background: #D4AF37;
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
        }

        .indicator:hover {
          background: rgba(212, 175, 55, 0.5);
        }

        /* Tablet optimization */
        @media (min-width: 640px) and (max-width: 1023px) {
          :root {
            --card-width: 360px;
            --card-height: 520px;
            --z-front: 120px;
            --z-mid: 60px;
            --spacing-x: 90px;
            --spacing-x-far: 160px;
            --rotation: 16deg;
            --rotation-far: 28deg;
          }

          .card::after {
            font-size: 16px;
            bottom: 24px;
            left: 24px;
            right: 24px;
            padding: 10px 18px;
          }

          .nav-btn {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
        }

        /* Desktop optimization */
        @media (min-width: 1024px) {
          :root {
            --card-width: 380px;
            --card-height: 560px;
            --z-front: 140px;
            --z-mid: 70px;
            --spacing-x: 110px;
            --spacing-x-far: 200px;
            --rotation: 18deg;
            --rotation-far: 30deg;
          }

          .card {
            border-radius: 24px;
          }

          .card::after {
            font-size: 17px;
            bottom: 28px;
            left: 28px;
            right: 28px;
            padding: 12px 20px;
          }

          .card:hover.active {
            transform: translateZ(var(--z-front)) scale(1.02);
          }

          .nav-btn {
            width: 52px;
            height: 52px;
            font-size: 22px;
          }

          .scene {
            cursor: grab;
          }

          .scene:active {
            cursor: grabbing;
          }
        }

        /* Large desktop */
        @media (min-width: 1440px) {
          :root {
            --card-width: 420px;
            --card-height: 600px;
            --z-front: 160px;
            --z-mid: 80px;
            --spacing-x: 130px;
            --spacing-x-far: 240px;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .card,
          .nav-btn,
          .indicator,
          .card img {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        /* Loading state */
        .card img {
          background: linear-gradient(90deg, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        .card img[src] {
          background: none;
          animation: none;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Focus states for accessibility - removed blue outlines */
        .nav-btn:focus,
        .indicator:focus {
          outline: none;
        }

        .card:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default AuraThemeCarousel;