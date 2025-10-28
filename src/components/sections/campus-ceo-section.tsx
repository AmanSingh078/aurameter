"use client";

import Link from 'next/link';

export default function CampusCEOSection() {
  return (
    <section className="min-h-screen py-16 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Animated Background Canvas */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(212,175,55,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.03)_0%,transparent_50%),#000000]"></div>
      </div>

      {/* Geometric Lines Overlay */}
      <div className="fixed inset-0 z-1 pointer-events-none opacity-20">
        <div className="absolute left-0 w-[400px] h-[1px] bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent)] top-1/2 animate-move-line"></div>
        <div className="absolute top-0 w-[1px] h-[300px] bg-[linear-gradient(180deg,transparent,rgba(212,175,55,0.4),transparent)] left-[15%] animate-move-vertical"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-2">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-500/5 border border-yellow-500/25 rounded-full text-xs text-white/70 mb-6 backdrop-blur-lg uppercase font-medium tracking-wider">
            <div className="w-2 h-2 bg-[linear-gradient(135deg,#d4af37,#f4e5b8)] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-pulse-gold"></div>
            AURAMETER CAMPUS CEO PROGRAM
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            India's Biggest Campus CEO Program By <span className="bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent font-bold">Aurmeter</span>
          </h1>
        </div>

        <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-8 md:p-12 backdrop-blur-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-yellow-500">Founder's Message</h2>
          
          {/* Founders Layout with Photo in Center */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center mb-12">
            {/* Left Quote */}
            <div className="bg-black/30 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <p className="text-gray-300 mb-4 italic text-lg">
                Innovation is not just a concept; it's the very essence of our existence. From pioneering social media innovations to integrating technology seamlessly into our student's journey, we've always pushed the boundaries. Our aim is clear: to create a platform where every student's potential is unlocked.
              </p>
              <p className="text-yellow-500 font-semibold text-xl">— Prateek Maheshwari</p>
            </div>

            {/* Center Photo */}
            <div className="flex justify-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl border-4 border-yellow-500 bg-gray-800 flex items-center justify-center text-6xl shadow-[0_0_60px_rgba(212,175,55,0.2),0_8px_32px_rgba(0,0,0,0.8)]">
                👥
              </div>
            </div>

            {/* Right Quote */}
            <div className="bg-black/30 border-r-4 border-yellow-500 p-6 rounded-l-lg">
              <p className="text-gray-300 mb-4 italic text-lg">
                If you give yourself just 3 years and dedicate them wholly and completely to your dream, and not let self-doubt, or laziness, or the fear of failure come in your way, nothing can stop you from being successful.
              </p>
              <p className="text-yellow-500 font-semibold text-xl">— Alakh Pandey</p>
            </div>
          </div>

          {/* Program Description */}
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-6 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-yellow-500">
              Dream Big With Aurmeter's Campus CEO Program
            </h3>
            <p className="text-gray-300 text-center leading-relaxed text-lg">
              The Aurmeter Campus CEO Program is an exciting opportunity for passionate and motivated students to become ambassadors of India's fastest-growing social media platform. As a Campus CEO, you'll gain exclusive access to leadership development, networking opportunities, and real-world experience that will set you apart in your career journey. Join thousands of students across India who are already building their personal brand, earning aura points, and climbing the college leaderboard. This is more than just a program – it's a movement that empowers young leaders to make a difference on their campus while developing skills that last a lifetime.
            </p>
          </div>

          <div className="text-center">
            <Link 
              href="/waitlist" 
              className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              Start Your Journey
            </Link>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              YOUR MOMENT TO LEAD IS HERE.
            </h2>
            <p className="text-2xl md:text-3xl font-bold bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent">
              BECOME AN AURMETER CAMPUS CEO
            </p>
          </div>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-8 md:p-12 backdrop-blur-lg">
            <ul className="space-y-6 mb-10">
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-xl block mb-2">🎯 Lead</strong>
                <span className="text-gray-300 text-lg">Be the face of Aurmeter on your campus and inspire your peers.</span>
              </li>
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-xl block mb-2">🤝 Connect</strong>
                <span className="text-gray-300 text-lg">Build bonds with fellow tech lovers and a buzzing community.</span>
              </li>
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-xl block mb-2">🎊 Organise</strong>
                <span className="text-gray-300 text-lg">Host fun events and activities that get everyone talking.</span>
              </li>
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-xl block mb-2">💡 Create</strong>
                <span className="text-gray-300 text-lg">Bring your ideas to life with content and campaigns that stand out.</span>
              </li>
            </ul>

            <p className="text-gray-300 text-center text-xl mb-6">
              This is your chance to represent one of the fastest-growing social media platforms, experience unforgettable opportunities, and unlock rewards that go beyond campus.
            </p>

            <p className="text-yellow-500 text-2xl font-bold text-center mb-8">
              DON'T MISS OUT, APPLY NOW AND LEVEL UP WITH AURMETER!
            </p>

            <div className="text-center">
              <Link 
                href="/waitlist" 
                className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Mind-Blowing Benefits For <span className="bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent font-bold">Aurmeter's Campus CEOs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-lg">
              <div className="text-5xl mb-6">💰</div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Earn While You Learn</h3>
              <p className="text-gray-300">
                Get the chance to earn money while you are still in college and build your financial independence!
              </p>
            </div>

            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-lg">
              <div className="text-5xl mb-6">📈</div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Level-Up Your Career</h3>
              <p className="text-gray-300">
                Aurmeter's Campus CEOs get exclusive internship opportunities and career advancement at Aurmeter!
              </p>
            </div>

            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-lg">
              <div className="text-5xl mb-6">💼</div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Placement Scope</h3>
              <p className="text-gray-300">
                You can get a pre-placement offer and comprehensive placement training by Aurmeter's expert team!
              </p>
            </div>

            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-lg">
              <div className="text-5xl mb-6">👥</div>
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Meet Leadership</h3>
              <p className="text-gray-300">
                Connect with Aurmeter's CXOs and Founders, get career guidance and mentorship from industry leaders!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/waitlist" 
              className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent font-bold">Superb Rewards</span> & Exciting Incentives
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Aurmeter's Campus CEOs get superb rewards and growth opportunities through this program
            </p>
          </div>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-8 md:p-12 backdrop-blur-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-6 transition-all duration-300 hover:bg-yellow-500/10">
                <div className="text-5xl mb-4 text-center">👀</div>
                <h3 className="text-xl font-bold text-yellow-500 mb-4 text-center">Did You Know?</h3>
                <p className="text-gray-300">
                  This program allows you to have a Unique Coupon Code! A unique coupon code can get you individual recognition & very cool incentives. Your performance will be tracked by us and you will get performance-based rewards!
                </p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-6 transition-all duration-300 hover:bg-yellow-500/10">
                <div className="text-5xl mb-4 text-center">🎉</div>
                <h3 className="text-xl font-bold text-yellow-500 mb-4 text-center">What's More?</h3>
                <p className="text-gray-300 mb-3">
                  • Your communication and marketing skills will also improve while working as a Campus CEO!
                </p>
                <p className="text-gray-300 mb-3">
                  • You can build networking skills through online and offline platforms and cultivate a relationship with Aurmeter!
                </p>
                <p className="text-gray-300">
                  • Top performers can gain more recognition by having their success stories published in WhatsApp groups!
                </p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-6 transition-all duration-300 hover:bg-yellow-500/10">
                <div className="text-5xl mb-4 text-center">📝</div>
                <h3 className="text-xl font-bold text-yellow-500 mb-4 text-center">What Else?</h3>
                <p className="text-gray-300">
                  This certification can be added to your resume which will make it shine like never before. It will increase your value for prospective employers and open new opportunities!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; transform: rotate(0deg); }
          50% { opacity: 0.6; transform: rotate(180deg); }
        }
        
        @keyframes pulse-gold {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        
        @keyframes move-line {
          0%, 100% { transform: translateX(0); opacity: 0.2; }
          50% { transform: translateX(100px); opacity: 0.4; }
        }
        
        @keyframes move-vertical {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(100px); opacity: 0.4; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-pulse-gold {
          animation: pulse-gold 2s ease-in-out infinite;
        }
        
        .animate-move-line {
          animation: move-line 8s ease-in-out infinite;
        }
        
        .animate-move-vertical {
          animation: move-vertical 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}