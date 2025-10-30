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

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-2">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-6 sm:py-2 bg-yellow-500/5 border border-yellow-500/25 rounded-full text-xs text-white/70 mb-4 sm:mb-6 backdrop-blur-lg uppercase font-medium tracking-wider">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[linear-gradient(135deg,#d4af37,#f4e5b8)] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-pulse-gold"></div>
            LEAD YOUR CAMPUS
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            India's Biggest Campus CEO Program By <span className="bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent font-bold">Aurameter</span>
          </h1>
        </div>

        <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 text-yellow-500">Founder's Message</h2>
          
          {/* Founders Layout - Two attractive frames for both mobile and laptop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {/* Ankit Bhati's Message - Frame 1 */}
            <div className="bg-gradient-to-br from-black/50 to-black/30 border-l-4 border-yellow-500 p-5 sm:p-6 rounded-r-xl backdrop-blur-sm hover:from-black/60 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="flex items-start mb-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 mr-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-yellow-500 font-bold text-lg sm:text-xl">Vision & Passion</h3>
                  <p className="text-gray-400 text-sm">Every big idea starts with one fearless believer</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3 text-sm sm:text-base leading-relaxed">
                Aurameter was born from that same fire – the urge to build something the world hasn't seen yet. I'm the same student like you who once dreamed of doing something meaningful, something that could shape the future of India.
              </p>
              <p className="text-gray-300 mb-3 text-sm sm:text-base leading-relaxed">
                I'm still learning, growing, and working every single day for that dream. Join me in this journey – you'll learn more than you can imagine, not from books, but from real impact.
              </p>
              <p className="text-yellow-500 font-semibold text-sm sm:text-base italic mb-4">
                "The Campus CEO Program isn't just a title – it's your chance to build, lead, and inspire change from your own campus."
              </p>
              <div className="pt-3 border-t border-yellow-500/20">
                <p className="text-yellow-500 font-bold text-base sm:text-lg">— Ankit Bhati</p>
                <p className="text-gray-400 text-sm">Co-Founder, Aurameter</p>
              </div>
            </div>

            {/* Nikhil Jha's Message - Frame 2 */}
            <div className="bg-gradient-to-br from-black/50 to-black/30 border-r-4 border-yellow-500 p-5 sm:p-6 rounded-l-xl backdrop-blur-sm hover:from-black/60 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <div className="flex items-start mb-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 mr-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-yellow-500 font-bold text-lg sm:text-xl">Action & Impact</h3>
                  <p className="text-gray-400 text-sm">The difference between dreamers and doers</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3 text-sm sm:text-base leading-relaxed">
                We built Aurameter for the generation that doesn't wait for permission to create impact. The Campus CEO Program is for those who dare to be the face of change in their college.
              </p>
              <p className="text-gray-300 mb-3 text-sm sm:text-base leading-relaxed">
                You'll not just represent a brand, you'll represent a mindset – that Gen Z can lead, innovate, and inspire on their own terms.
              </p>
              <p className="text-yellow-500 font-semibold text-sm sm:text-base italic mb-4">
                "Take that first step. The rest will follow."
              </p>
              <div className="pt-3 border-t border-yellow-500/20">
                <p className="text-yellow-500 font-bold text-base sm:text-lg">— Nikhil Jha</p>
                <p className="text-gray-400 text-sm">Co-Founder, Aurameter</p>
              </div>
            </div>
          </div>

          {/* Program Description */}
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-3 sm:mb-4 text-yellow-500">
              Dream Big With Aurmeter's Campus CEO Program
            </h3>
            <p className="text-gray-300 text-center leading-relaxed text-base sm:text-lg">
              The Aurmeter Campus CEO Program is an exciting opportunity for passionate and motivated students to become ambassadors of India's fastest-growing social media platform. As a Campus CEO, you'll gain exclusive access to leadership development, networking opportunities, and real-world experience that will set you apart in your career journey. Join thousands of students across India who are already building their personal brand, earning aura points, and climbing the college leaderboard. This is more than just a program – it's a movement that empowers young leaders to make a difference on their campus while developing skills that last a lifetime.
            </p>
          </div>

          <div className="text-center">
            <Link 
              href="/waitlist" 
              className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              Start Your Journey
            </Link>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              YOUR MOMENT TO LEAD IS HERE.
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent">
              BECOME AN AURMETER CAMPUS CEO
            </p>
          </div>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-lg">
            <ul className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8 md:mb-10">
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-4 sm:p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-lg sm:text-xl block mb-2"> Lead</strong>
                <span className="text-gray-300 text-base sm:text-lg">Be the face of Aurmeter on your campus and inspire your peers.</span>
              </li>
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-4 sm:p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-lg sm:text-xl block mb-2"> Connect</strong>
                <span className="text-gray-300 text-base sm:text-lg">Build bonds with fellow tech lovers and a buzzing community.</span>
              </li>
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-4 sm:p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-lg sm:text-xl block mb-2"> Organise</strong>
                <span className="text-gray-300 text-base sm:text-lg">Host fun events and activities that get everyone talking.</span>
              </li>
              <li className="bg-yellow-500/5 border-l-4 border-yellow-500 p-4 sm:p-5 rounded-r-lg transition-all duration-300 hover:bg-yellow-500/10">
                <strong className="text-yellow-500 text-lg sm:text-xl block mb-2"> Create</strong>
                <span className="text-gray-300 text-base sm:text-lg">Bring your ideas to life with content and campaigns that stand out.</span>
              </li>
            </ul>

            <p className="text-gray-300 text-center text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
              This is your chance to represent one of the fastest-growing social media platforms, experience unforgettable opportunities, and unlock rewards that go beyond campus.
            </p>

            <p className="text-yellow-500 text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
              DON'T MISS OUT, APPLY NOW AND LEVEL UP WITH AURMETER!
            </p>

            <div className="text-center">
              <Link 
                href="/waitlist" 
                className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              Mind-Blowing Benefits For <span className="bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent font-bold">Aurmeter's Campus CEOs</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 sm:p-6 md:p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6"></div>
              <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 sm:mb-4">Earn While You Learn</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Get the chance to earn money while you are still in college and build your financial independence!
              </p>
            </div>

            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 sm:p-6 md:p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6"></div>
              <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 sm:mb-4">Level-Up Your Career</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Aurmeter's Campus CEOs get exclusive internship opportunities and career advancement at Aurmeter!
              </p>
            </div>

            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 sm:p-6 md:p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6"></div>
              <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 sm:mb-4">Placement Scope</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                You can get a pre-placement offer and comprehensive placement training by Aurmeter's expert team!
              </p>
            </div>

            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 sm:p-6 md:p-8 text-center hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-lg">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6"></div>
              <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 sm:mb-4">Meet Leadership</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Connect with Aurmeter's CXOs and Founders, get career guidance and mentorship from industry leaders!
              </p>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link 
              href="/waitlist" 
              className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              <span className="bg-[linear-gradient(135deg,#d4af37_0%,#f4e5b8_50%,#d4af37_100%)] bg-clip-text text-transparent font-bold">Superb Rewards</span> & Exciting Incentives
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto">
              Aurmeter's Campus CEOs get superb rewards and growth opportunities through this program
            </p>
          </div>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-yellow-500/10">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 text-center"></div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 sm:mb-4 text-center">Did You Know?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  This program allows you to have a Unique Coupon Code! A unique coupon code can get you individual recognition & very cool incentives. Your performance will be tracked by us and you will get performance-based rewards!
                </p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-yellow-500/10">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 text-center"></div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 sm:mb-4 text-center">What's More?</h3>
                <p className="text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">
                  • Your communication and marketing skills will also improve while working as a Campus CEO!
                </p>
                <p className="text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">
                  • You can build networking skills through online and offline platforms and cultivate a relationship with Aurmeter!
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  • Top performers can gain more recognition by having their success stories published in WhatsApp groups!
                </p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-yellow-500/10">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 text-center"></div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-3 sm:mb-4 text-center">What Else?</h3>
                <p className="text-gray-300 text-sm sm:text-base">
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