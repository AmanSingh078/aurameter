'use client';

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const KnowMorePage = () => {
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-viewport').forEach(el => {
      observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element: Element) {
      const target = parseInt(element.getAttribute('data-target') || '0');
      const duration = 2500;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current).toString();
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target + (target === 800 ? '+' : '');
        }
      };

      updateCounter();
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector('.stat-number');
          if (counter && counter.textContent === '0') {
            animateCounter(counter);
          }
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statItemsRef.current.forEach(item => {
      if (item) {
        statsObserver.observe(item);
      }
    });

    // Cleanup observers on unmount
    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const openInstagram = () => {
    window.open('https://instagram.com/app.aurameter', '_blank');
  };

  return (
    <>
      <Head>
        <title>About Aurameter - Redefining Social Media for Gen Z</title>
        <meta name="description" content="An AI-powered, gamified social platform where your aura becomes your value and every interaction rewards real expression" />
      </Head>

      <div className="know-more-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <p className="subtitle">Building for Gen Z</p>
            <h1>About Aurameter</h1>
            <div className="divider"></div>
            <p className="tagline">An AI-powered, gamified social platform where your aura becomes your value and every interaction rewards real expression</p>
            
            <div className="hero-buttons">
              <Link href="/#about-section" className="hero-button primary">
                Our Mission
              </Link>
              <Link href="/team" className="hero-button secondary">
                Meet the Team
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="section-title fade-in-viewport">
              <p className="section-label">Our Mission</p>
              <h2>Redefining Social Media<br />for a New Generation</h2>
            </div>
            <div className="mission-content fade-in-viewport">
              <p>People's attention spans have shifted dramatically — from watching full-length movies to spending just 15 seconds on a reel. Most social media today leaves users feeling anxious, drained, and stuck in procrastination loops built on vanity metrics and endless scrolling.</p>
              <p>Aurameter is different. We're building a story-only social platform powered by AI that measures vibe, not popularity. Every story you post earns personalized AI-generated compliments and AuraPoints, turning social behavior into emotionally uplifting experiences with real-world value.</p>
              <p className="highlight">"Aura isn't just vibes — it's the new status, identity, and value Gen Z craves."</p>
              <p>Our platform blends AI, gamification, and emotional intelligence to create a space where authenticity, energy, and creativity are celebrated. Unlike platforms focused on likes and followers, we reward genuine self-expression, helping users build confidence while earning tangible rewards through our brand ecosystem.</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <div className="section-title fade-in-viewport">
              <p className="section-label">What Makes Us Different</p>
              <h2>Built to Empower, Not Extract</h2>
            </div>
            <div className="values-grid fade-in-viewport">
              <div className="value-item">
                <div className="value-number">01</div>
                <h3>AI-Powered Validation</h3>
                <p>Our Aura AI analyzes your stories and interactions to deliver personalized compliments and aura scores that uplift mood and boost confidence.</p>
              </div>
              <div className="value-item">
                <div className="value-number">02</div>
                <h3>Gamified Engagement</h3>
                <p>Earn AuraPoints through stories, quizzes, steps, and mindful actions. Our decay mechanics ensure healthy engagement without addiction.</p>
              </div>
              <div className="value-item">
                <div className="value-number">03</div>
                <h3>Real-World Rewards</h3>
                <p>Convert your AuraPoints into brand rewards and tangible perks — giving your social presence genuine purchasing power.</p>
              </div>
              <div className="value-item">
                <div className="value-number">04</div>
                <h3>Emotional Intelligence</h3>
                <p>Our emotionally friendly chatbot helps with social queries and provides genuine support, making digital interactions feel human.</p>
              </div>
              <div className="value-item">
                <div className="value-number">05</div>
                <h3>Community Gaming</h3>
                <p>Play mini multiplayer games with friends, building connections through shared experiences, not just passive content consumption.</p>
              </div>
              <div className="value-item">
                <div className="value-number">06</div>
                <h3>Authentic Expression</h3>
                <p>No grids, no vanity metrics — just emotional resonance, genuine vibes, and a space that celebrates your authentic self.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="container">
            <div className="story-content fade-in-viewport">
              <h3>The Journey of Ankit Bhati</h3>
              <p>As a college student and part of Gen Z, I felt firsthand how social media can damage confidence instead of building it. That realization sparked the vision for Aurameter — a platform where your aura, emotions, and creativity actually matter, where every story turns into something that rewards you back.</p>
              <p>In my second year, while managing internships and startup experiences, I led a team of 20, tested products with 800+ users, visited 10+ colleges, and connected with investors daily. We onboarded 25 campus CEOs and secured 15+ brand deals to build a reward-ready ecosystem for India's Gen Z.</p>
              <p>The journey taught me that leadership isn't about doing everything yourself — it's about empowering your team, listening actively, and turning challenges into opportunities for collective growth. Every late-night coding session, every user feedback call, every pivot has shaped Aurameter into what it is today.</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item fade-in-viewport" ref={(el) => { statItemsRef.current[0] = el; }}>
                <span className="stat-number" data-target="800">0</span>
                <span className="stat-label">Beta Users Tested</span>
              </div>
              <div className="stat-item fade-in-viewport" ref={(el) => { statItemsRef.current[1] = el; }}>
                <span className="stat-number" data-target="25">0</span>
                <span className="stat-label">Campus CEOs Onboarded</span>
              </div>
              <div className="stat-item fade-in-viewport" ref={(el) => { statItemsRef.current[2] = el; }}>
                <span className="stat-number" data-target="10">0</span>
                <span className="stat-label">Colleges Visited</span>
              </div>
              <div className="stat-item fade-in-viewport" ref={(el) => { statItemsRef.current[3] = el; }}>
                <span className="stat-number" data-target="15">0</span>
                <span className="stat-label">Brand Partnerships</span>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="commitment-section">
          <div className="container">
            <div className="section-title fade-in-viewport">
              <p className="section-label">Our Vision</p>
              <h2>The Future We're Building</h2>
            </div>
            <div className="commitment-content">
              <div className="commitment-grid">
                <div className="commitment-item fade-in-viewport">
                  <h3>Social Intelligence Currency</h3>
                  <p>We're making social intelligence the new social currency. Just as LinkedIn became the standard for professional credibility, Aurameter will become the currency for personal authenticity and emotional resonance.</p>
                </div>
                <div className="commitment-item fade-in-viewport">
                  <h3>Healthier Digital Habits</h3>
                  <p>Gen Z will no longer measure their worth in likes or followers, but in their aura — their authenticity, energy, and emotional intelligence. Social media will uplift confidence, not drain it.</p>
                </div>
                <div className="commitment-item fade-in-viewport">
                  <h3>India's Global Platform</h3>
                  <p>In five years, Aurameter will become India's next big social media platform — a global product that resonates with Gen Z everywhere, setting worldwide standards for authentic digital connection.</p>
                </div>
                <div className="commitment-item fade-in-viewport">
                  <h3>Mental Well-Being Focus</h3>
                  <p>We're shifting from addictive, surface-level platforms to an ecosystem where technology actively supports mental well-being, stronger self-esteem, and communities that celebrate real vibes over vanity metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content fade-in-viewport">
              <h2>Join the Movement</h2>
              <p>Your aura matters. Be part of Gen Z's next social platform.</p>
              <div className="cta-buttons">
                <button className="cta-button" onClick={openInstagram}>Follow on Instagram</button>
                <Link href="/#contact-us" className="cta-button secondary">Get in Touch</Link>
              </div>
            </div>
          </div>
        </section>

        <style jsx global>{`
          .know-more-page {
            font-family: var(--font-sans);
            background-color: #000000;
            color: #ffffff;
            overflow-x: hidden;
            line-height: 1.8;
          }

          :root {
            --black: #000000;
            --dark-gray: #1a1a1a;
            --medium-gray: #2a2a2a;
            --gold: #d4af37;
            --light-gold: #f4e4b3;
            --white: #ffffff;
          }

          .hero-section {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: var(--black);
            overflow: hidden;
          }

          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              linear-gradient(rgba(212, 175, 55, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.02) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridSlide 30s linear infinite;
          }

          @keyframes gridSlide {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }

          .hero-section::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
            filter: blur(100px);
            pointer-events: none;
          }

          .hero-content {
            text-align: center;
            z-index: 1;
            padding: 0 30px;
            max-width: 1000px;
          }

          .hero-content .subtitle {
            font-size: 0.9rem;
            color: var(--gold);
            letter-spacing: 5px;
            text-transform: uppercase;
            margin-bottom: 30px;
            font-weight: 300;
            opacity: 0;
            animation: fadeInUp 1s ease 0.2s forwards;
          }

          .hero-content h1 {
            font-family: var(--font-title);
            font-size: clamp(3.5rem, 8vw, 7rem);
            font-weight: 300;
            color: var(--light-gold);
            margin-bottom: 30px;
            letter-spacing: 3px;
            line-height: 1.2;
            opacity: 0;
            animation: fadeInUp 1s ease 0.4s forwards;
          }

          .hero-content .tagline {
            font-size: clamp(1rem, 2vw, 1.4rem);
            color: rgba(244, 228, 179, 0.8);
            letter-spacing: 2px;
            font-weight: 300;
            max-width: 800px;
            margin: 0 auto 40px;
            opacity: 0;
            animation: fadeInUp 1s ease 0.6s forwards;
          }

          .hero-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 40px;
            opacity: 0;
            animation: fadeInUp 1s ease 0.8s forwards;
          }

          .hero-button {
            padding: 15px 35px;
            font-size: 1rem;
            border: 2px solid var(--gold);
            color: var(--gold);
            text-decoration: none;
            font-weight: 400;
            letter-spacing: 2px;
            text-transform: uppercase;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            font-family: var(--font-sans);
            background: transparent;
            cursor: pointer;
          }

          .hero-button.primary {
            background: var(--gold);
            color: var(--black);
          }

          .hero-button.primary:hover {
            background: transparent;
            color: var(--gold);
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
          }

          .hero-button.secondary:hover {
            background: var(--gold);
            color: var(--black);
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
            from {
              opacity: 0;
              transform: translateY(20px);
            }
          }

          .divider {
            width: 100px;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            margin: 50px auto;
            opacity: 0;
            animation: fadeIn 1s ease 0.8s forwards;
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 50px;
          }

          .mission-section {
            padding: 150px 0;
            background: linear-gradient(180deg, var(--black) 0%, var(--dark-gray) 100%);
            position: relative;
          }

          .section-title {
            text-align: center;
            margin-bottom: 80px;
          }

          .section-label {
            font-size: 0.85rem;
            color: var(--gold);
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 20px;
            font-weight: 400;
          }

          .section-title h2 {
            font-family: var(--font-title);
            font-size: clamp(2.5rem, 5vw, 4.5rem);
            font-weight: 300;
            color: var(--light-gold);
            letter-spacing: 2px;
            line-height: 1.3;
          }

          .mission-content {
            max-width: 900px;
            margin: 0 auto;
            text-align: center;
          }

          .mission-content p {
            font-size: 1.25rem;
            color: rgba(244, 228, 179, 0.9);
            margin-bottom: 35px;
            line-height: 2;
            font-weight: 300;
          }

          .mission-content .highlight {
            font-size: 1.4rem;
            color: var(--gold);
            font-style: italic;
            margin: 50px 0;
            line-height: 1.8;
          }

          .values-section {
            padding: 150px 0;
            background: var(--black);
            position: relative;
          }

          .values-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: rgba(212, 175, 55, 0.15);
            margin-top: 80px;
          }

          .value-item {
            background: var(--black);
            padding: 70px 50px;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .value-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--gold), transparent);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .value-item:hover {
            background: var(--dark-gray);
          }

          .value-item:hover::before {
            transform: translateX(-50%) scaleX(1);
          }

          .value-number {
            font-size: 3rem;
            color: var(--gold);
            font-weight: 300;
            margin-bottom: 25px;
            opacity: 0.4;
            transition: opacity 0.5s ease;
          }

          .value-item:hover .value-number {
            opacity: 1;
          }

          .value-item h3 {
            font-family: var(--font-title);
          }

          .value-item p {
            color: rgba(244, 228, 179, 0.8);
            font-size: 1rem;
            line-height: 1.8;
            font-weight: 300;
          }

          .story-section {
            padding: 150px 0;
            background: linear-gradient(180deg, var(--dark-gray) 0%, var(--medium-gray) 100%);
          }

          .story-content {
            max-width: 900px;
            margin: 0 auto;
            text-align: center;
          }

          .story-content h3 {
            font-family: var(--font-title);
          }

          .story-content p {
            font-size: 1.1rem;
            color: rgba(244, 228, 179, 0.85);
            margin-bottom: 30px;
            line-height: 2;
            font-weight: 300;
          }

          .stats-section {
            padding: 120px 0;
            background: var(--black);
            border-top: 1px solid rgba(212, 175, 55, 0.15);
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 60px;
          }

          .stat-item {
            text-align: center;
            padding: 40px 20px;
            transition: transform 0.5s ease;
          }

          .stat-item:hover {
            transform: translateY(-8px);
          }

          .stat-number {
            font-size: 4.5rem;
            font-weight: 300;
            color: var(--gold);
            margin-bottom: 15px;
            display: block;
          }

          .stat-label {
            font-size: 0.95rem;
            color: var(--light-gold);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 300;
          }

          .commitment-section {
            padding: 150px 0;
            background: linear-gradient(135deg, var(--dark-gray) 0%, var(--black) 100%);
            text-align: center;
          }

          .commitment-content {
            max-width: 1000px;
            margin: 0 auto;
          }

          .commitment-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 50px;
            margin-top: 80px;
            text-align: left;
          }

          .commitment-item {
            padding: 50px;
            background: rgba(26, 26, 26, 0.5);
            border: 1px solid rgba(212, 175, 55, 0.2);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .commitment-item:hover {
            border-color: var(--gold);
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(212, 175, 55, 0.1);
          }

          .commitment-item h3 {
            font-family: var(--font-title);
          }

          .commitment-item p {
            font-size: 1.05rem;
            color: rgba(244, 228, 179, 0.85);
            line-height: 1.9;
            font-weight: 300;
          }

          .cta-section {
            padding: 150px 0;
            background: var(--black);
            position: relative;
            overflow: hidden;
          }

          .cta-section::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1000px;
            height: 1000px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
            filter: blur(120px);
          }

          .cta-content {
            text-align: center;
            position: relative;
            z-index: 1;
          }

          .cta-content h2 {
            font-family: var(--font-title);
          }

          .cta-content p {
            font-size: 1.3rem;
            color: rgba(244, 228, 179, 0.8);
            margin-bottom: 50px;
            font-weight: 300;
          }

          .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
          }

          .cta-button {
            padding: 20px 60px;
            font-size: 1rem;
            background: transparent;
            color: var(--gold);
            border: 2px solid var(--gold);
            cursor: pointer;
            font-weight: 400;
            letter-spacing: 3px;
            text-transform: uppercase;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            font-family: 'Georgia', 'Times New Roman', serif;
            text-decoration: none;
            display: inline-block;
          }

          .cta-button.secondary {
            background: var(--gold);
            color: var(--black);
          }

          .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
          }

          .cta-button.secondary:hover {
            background: transparent;
            color: var(--gold);
          }

          .fade-in-viewport {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1s ease, transform 1s ease;
          }

          .fade-in-viewport.visible {
            opacity: 1;
            transform: translateY(0);
          }

          @media (max-width: 1024px) {
            .values-grid {
              grid-template-columns: 1fr;
            }

            .stats-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 40px;
            }

            .commitment-grid {
              grid-template-columns: 1fr;
            }
            
            .hero-buttons {
              flex-direction: column;
              align-items: center;
              gap: 15px;
            }
            
            .cta-buttons {
              flex-direction: column;
              align-items: center;
              gap: 15px;
            }
          }

          @media (max-width: 768px) {
            .container {
              padding: 0 25px;
            }

            .hero-content h1 {
              font-size: 3rem;
            }

            .value-item {
              padding: 50px 30px;
            }

            .stats-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default KnowMorePage;