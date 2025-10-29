"use client";

import React, { useState, useEffect, useRef } from 'react';

const PremiumCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Removed autoRotateInterval since we're removing auto-rotation

  // Card data with local images
  const cards = [
    {
      name: "Theme Relax",
      image: "/image/theme-relax.png",
      alt: "Theme Relax - Premium Aura Theme"
    },
    {
      name: "Barbie Dream",
      image: "/image/barbie.jpg",
      alt: "Barbie Dream - Premium Aura Theme"
    },
    {
      name: "Ben 10 Adventure",
      image: "/image/ben-10.webp",
      alt: "Ben 10 Adventure - Premium Aura Theme"
    },
    {
      name: "Gojo Art",
      image: "/image/gojo-art.jpg",
      alt: "Gojo Art - Premium Aura Theme"
    },
    {
      name: "Harry Potter Magic",
      image: "/image/hp-art.jpg",
      alt: "Harry Potter Magic - Premium Aura Theme"
    }
  ];

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

  // Navigation functions (removed auto-rotation)
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
  };

  // Handle card click - navigate to clicked card
  const handleCardClick = (clickedCard: HTMLElement) => {
    const dataIndex = clickedCard.getAttribute('data-index');
    if (!dataIndex) return;
    
    const cardIndex = parseInt(dataIndex);
    
    // If active card is clicked, go to next
    if (cardIndex === index % cards.length) {
      next();
    }
    // If right1 card is clicked, go forward
    else if (cardIndex === (index + 1) % cards.length) {
      next();
    }
    // If right2 card is clicked, go forward twice
    else if (cardIndex === (index + 2) % cards.length) {
      next();
      setTimeout(() => next(), 100);
    }
    // If left1 card is clicked, go backward
    else if (cardIndex === (index - 1 + cards.length) % cards.length) {
      prev();
    }
    // If left2 card is clicked, go backward twice
    else if (cardIndex === (index - 2 + cards.length) % cards.length) {
      prev();
      setTimeout(() => prev(), 100);
    }
  };

  // Enhanced touch interaction with proper click vs drag detection
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
    // Removed stopAutoRotate since we're removing auto-rotation
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
      const cardElement = clickedCard.closest('.card');
      if (cardElement) {
        handleCardClick(cardElement as HTMLElement);
        // Removed startAutoRotate since we're removing auto-rotation
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

    // Removed startAutoRotate since we're removing auto-rotation
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
    // Removed stopAutoRotate since we're removing auto-rotation
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
      const cardElement = clickedCard.closest('.card');
      if (cardElement) {
        handleCardClick(cardElement as HTMLElement);
        // Removed startAutoRotate since we're removing auto-rotation
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

    // Removed startAutoRotate since we're removing auto-rotation
    mouseStartX = 0;
    mouseStartY = 0;
    isMouseDragging = false;
    mouseHasMoved = false;
  };

  // Pause on hover (removed auto-rotation functionality)
  const handleMouseEnter = () => {
    // Removed stopAutoRotate since we're removing auto-rotation
  };

  const handleMouseLeave = () => {
    // Removed startAutoRotate since we're removing auto-rotation
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prev();
      // Removed auto-rotation functions since we're removing auto-rotation
    }
    if (e.key === "ArrowRight") {
      next();
      // Removed auto-rotation functions since we're removing auto-rotation
    }
  };

  // Initialize and cleanup
  useEffect(() => {
    updateCarousel();
    // Removed startAutoRotate() to disable auto-rotation

    // Add mouse move/up listeners to document for better drag detection
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Preload images
    cards.forEach(card => {
      const preloadImg = new Image();
      preloadImg.src = card.image;
    });

    return () => {
      // Removed clearInterval for autoRotateInterval
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [index]);

  return (
    <div className="premium-carousel-container">
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
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
          aria-label="Previous slide"
          onClick={() => {
            prev();
            // Removed auto-rotation functions since we're removing auto-rotation
          }}
        >
          ‹
        </button>
        <div className="indicators" role="tablist" aria-label="Carousel navigation">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`indicator ${i === index % cards.length ? 'active' : ''}`}
              onClick={() => {
                goToSlide(i);
                // Removed auto-rotation functions since we're removing auto-rotation
              }}
              role="tab"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button 
          className="nav-btn" 
          aria-label="Next slide"
          onClick={() => {
            next();
            // Removed auto-rotation functions since we're removing auto-rotation
          }}
        >
          ›
        </button>
      </div>

      <style jsx global>{`
        .premium-carousel-container {
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
        .premium-carousel-container .heading {
          text-align: center;
          margin-bottom: 10px;
        }

        .premium-carousel-container .heading h1 {
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

        .premium-carousel-container .heading h1::after {
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

        .premium-carousel-container .scene {
          position: relative;
          width: min(75vw, 300px);
          height: min(120vw, 460px);
          perspective: 1400px;
          touch-action: pan-y;
          margin: 0 auto;
          outline: none;
        }

        .premium-carousel-container .card {
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

        .premium-carousel-container .card:focus,
        .premium-carousel-container .card:active {
          outline: none;
        }

        .premium-carousel-container .card img {
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
        .premium-carousel-container .card::before {
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
        .premium-carousel-container .card::after {
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
        .premium-carousel-container .card.active {
          transform: translateZ(100px) scale(1);
          z-index: 10;
          filter: blur(0) brightness(1);
          opacity: 1;
          box-shadow: 
            0 25px 70px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(212, 175, 55, 0.15),
            0 0 30px rgba(212, 175, 55, 0.08);
        }

        .premium-carousel-container .card.active img {
          transform: scale(1.05) translate3d(0, 0, 0);
        }

        .premium-carousel-container .card.active::after {
          opacity: 1;
          transform: translateY(0) translate3d(0, 0, 0);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .premium-carousel-container .card.left1 {
          transform: translateX(calc(-1 * 60px)) translateZ(50px) rotateY(15deg) scale(0.88);
          z-index: 8;
          filter: blur(1.5px) brightness(0.75);
          opacity: 0.8;
        }

        .premium-carousel-container .card.right1 {
          transform: translateX(60px) translateZ(50px) rotateY(calc(-1 * 15deg)) scale(0.88);
          z-index: 8;
          filter: blur(1.5px) brightness(0.75);
          opacity: 0.8;
        }

        .premium-carousel-container .card.left2 {
          transform: translateX(calc(-1 * 110px)) translateZ(0px) rotateY(25deg) scale(0.72);
          z-index: 6;
          filter: blur(3px) brightness(0.6);
          opacity: 0.6;
        }

        .premium-carousel-container .card.right2 {
          transform: translateX(110px) translateZ(0px) rotateY(calc(-1 * 25deg)) scale(0.72);
          z-index: 6;
          filter: blur(3px) brightness(0.6);
          opacity: 0.6;
        }

        .premium-carousel-container .card.hidden {
          transform: translateZ(-200px) scale(0.5);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* Hover effect for side cards */
        .premium-carousel-container .card.left1:hover,
        .premium-carousel-container .card.right1:hover,
        .premium-carousel-container .card.left2:hover,
        .premium-carousel-container .card.right2:hover {
          filter: blur(1px) brightness(0.85);
          opacity: 0.95;
        }

        /* Navigation controls */
        .premium-carousel-container .controls {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }

        .premium-carousel-container .nav-btn {
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

        .premium-carousel-container .nav-btn:focus,
        .premium-carousel-container .nav-btn:active {
          outline: none;
        }

        .premium-carousel-container .nav-btn:hover {
          background: rgba(26, 26, 26, 0.95);
          border-color: rgba(212, 175, 55, 0.4);
          color: #F4E4B8;
          transform: scale(1.08) translate3d(0, 0, 0);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
        }

        .premium-carousel-container .nav-btn:active {
          transform: scale(0.95) translate3d(0, 0, 0);
        }

        .premium-carousel-container .indicators {
          display: flex;
          gap: 8px;
        }

        .premium-carousel-container .indicator {
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

        .premium-carousel-container .indicator:focus,
        .premium-carousel-container .indicator:active {
          outline: none;
        }

        .premium-carousel-container .indicator.active {
          background: #D4AF37;
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
        }

        .premium-carousel-container .indicator:hover {
          background: rgba(212, 175, 55, 0.5);
        }

        /* Mobile optimization */
        @media (max-width: 639px) {
          .premium-carousel-container .scene {
            width: min(85vw, 280px);
            height: min(130vw, 420px);
          }

          .premium-carousel-container .card::after {
            font-size: 12px;
            bottom: 12px;
            left: 12px;
            right: 12px;
            padding: 6px 10px;
          }

          .premium-carousel-container .card.left1 {
            transform: translateX(calc(-1 * 50px)) translateZ(40px) rotateY(12deg) scale(0.85);
          }
          
          .premium-carousel-container .card.right1 {
            transform: translateX(50px) translateZ(40px) rotateY(calc(-1 * 12deg)) scale(0.85);
          }
          
          .premium-carousel-container .card.left2 {
            transform: translateX(calc(-1 * 90px)) translateZ(0px) rotateY(22deg) scale(0.7);
          }
          
          .premium-carousel-container .card.right2 {
            transform: translateX(90px) translateZ(0px) rotateY(calc(-1 * 22deg)) scale(0.7);
          }

          .premium-carousel-container .nav-btn {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .premium-carousel-container .controls {
            gap: 12px;
          }
        }

        /* Tablet optimization */
        @media (min-width: 640px) and (max-width: 1023px) {
          .premium-carousel-container .scene {
            width: min(80vw, 360px);
            height: min(110vw, 520px);
          }

          .premium-carousel-container .card::after {
            font-size: 15px;
            bottom: 20px;
            left: 20px;
            right: 20px;
            padding: 8px 16px;
          }

          .premium-carousel-container .nav-btn {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
          
          .premium-carousel-container .card.left1 {
            transform: translateX(calc(-1 * 80px)) translateZ(60px) rotateY(16deg) scale(0.88);
          }
          
          .premium-carousel-container .card.right1 {
            transform: translateX(80px) translateZ(60px) rotateY(calc(-1 * 16deg)) scale(0.88);
          }
          
          .premium-carousel-container .card.left2 {
            transform: translateX(calc(-1 * 150px)) translateZ(0px) rotateY(28deg) scale(0.72);
          }
          
          .premium-carousel-container .card.right2 {
            transform: translateX(150px) translateZ(0px) rotateY(calc(-1 * 28deg)) scale(0.72);
          }
        }

        /* Desktop optimization */
        @media (min-width: 1024px) {
          .premium-carousel-container .scene {
            width: min(70vw, 380px);
            height: min(100vw, 560px);
          }

          .premium-carousel-container .card {
            border-radius: 24px;
          }

          .premium-carousel-container .card::after {
            font-size: 16px;
            bottom: 24px;
            left: 24px;
            right: 24px;
            padding: 10px 18px;
          }

          .premium-carousel-container .card:hover.active {
            transform: translateZ(140px) scale(1.02);
          }

          .premium-carousel-container .nav-btn {
            width: 52px;
            height: 52px;
            font-size: 22px;
          }

          .premium-carousel-container .scene {
            cursor: grab;
          }

          .premium-carousel-container .scene:active {
            cursor: grabbing;
          }
          
          .premium-carousel-container .card.left1 {
            transform: translateX(calc(-1 * 100px)) translateZ(70px) rotateY(18deg) scale(0.88);
          }
          
          .premium-carousel-container .card.right1 {
            transform: translateX(100px) translateZ(70px) rotateY(calc(-1 * 18deg)) scale(0.88);
          }
          
          .premium-carousel-container .card.left2 {
            transform: translateX(calc(-1 * 190px)) translateZ(0px) rotateY(30deg) scale(0.72);
          }
          
          .premium-carousel-container .card.right2 {
            transform: translateX(190px) translateZ(0px) rotateY(calc(-1 * 30deg)) scale(0.72);
          }
        }

        /* Large desktop */
        @media (min-width: 1440px) {
          .premium-carousel-container .scene {
            width: min(60vw, 420px);
            height: min(90vw, 600px);
          }
          
          .premium-carousel-container .card::after {
            font-size: 17px;
            bottom: 28px;
            left: 28px;
            right: 28px;
            padding: 12px 20px;
          }
          
          .premium-carousel-container .card.left1 {
            transform: translateX(calc(-1 * 120px)) translateZ(80px) rotateY(18deg) scale(0.88);
          }
          
          .premium-carousel-container .card.right1 {
            transform: translateX(120px) translateZ(80px) rotateY(calc(-1 * 18deg)) scale(0.88);
          }
          
          .premium-carousel-container .card.left2 {
            transform: translateX(calc(-1 * 230px)) translateZ(0px) rotateY(30deg) scale(0.72);
          }
          
          .premium-carousel-container .card.right2 {
            transform: translateX(230px) translateZ(0px) rotateY(calc(-1 * 30deg)) scale(0.72);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .premium-carousel-container .card,
          .premium-carousel-container .nav-btn,
          .premium-carousel-container .indicator,
          .premium-carousel-container .card img {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        /* Loading state */
        .premium-carousel-container .card img {
          background: linear-gradient(90deg, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        .premium-carousel-container .card img[src] {
          background: none;
          animation: none;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Focus states for accessibility - removed blue outlines */
        .premium-carousel-container .nav-btn:focus,
        .premium-carousel-container .indicator:focus {
          outline: none;
        }

        .premium-carousel-container .card:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default PremiumCarousel;