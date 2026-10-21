import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ 
  onExploreClick, 
  onExploreProducts,
  onOpenSaleModal,
  theme = 'dark',
  lang = 'en'
}) {
  const isDark = theme === 'dark';

  const handleCtaClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else if (onExploreProducts) {
      onExploreProducts();
    } else {
      const el = document.getElementById('solutions') || document.getElementById('about-raxwo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      
      {/* ========================================================
          1. TOP HERO SECTION (Deep Midnight Violet / Navy)
          Matching exact user design: media_1792606594416_25b7a892.png
          PERSISTENT in both Dark and Light modes as requested.
         ======================================================== */}
      <section 
        className="relative w-full pt-14 pb-16 md:pt-20 md:pb-20 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#0c0827] text-white overflow-hidden"
      >
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Badge: Enter The Digital World */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide text-slate-300 bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-sm transition-all duration-300 hover:bg-white/15">
            Enter The Digital World
          </div>

          {/* Main Title: Custom Software Development in Sri Lanka & Worldwide */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.25] max-w-3xl text-white">
            Custom Software Development in Sri Lanka &amp; Worldwide
          </h1>

          {/* Brand Accent: Raxwo */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black text-[#0094ff] tracking-tight mt-1 mb-4 hover:scale-[1.02] transition-transform">
            Raxwo
          </h2>

          {/* Subtitle / Paragraph */}
          <p className="text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-normal text-slate-200/90 mb-8">
            Raxwo is a software development company in Sri Lanka building custom software, websites, web applications, mobile apps and AI-powered digital solutions for businesses locally and worldwide. We turn business ideas into scalable, secure and high-performing digital products designed to help your business grow.
          </p>

          {/* CTA Button: What We Do ! */}
          <button
            onClick={handleCtaClick}
            className="px-8 py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-slate-100 bg-[#2b274c] hover:bg-[#383363] border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            What We Do !
          </button>

        </div>
      </section>

      {/* ========================================================
          2. ABOUT RAXWO SECTION (Adapts gracefully in Dark/Light)
          Matching media_1791915432625_6bddae32.png
         ======================================================== */}
      <section 
        id="about-raxwo" 
        className={`w-full py-16 md:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10 transition-colors duration-300 ${
          isDark 
            ? 'bg-[#070a16] text-white' 
            : 'bg-white text-slate-900'
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Left Column: Team Office Photo with Glide Entrance */}
          <div className="md:col-span-5 flex justify-center scroll-reveal-left">
            <div className={`relative w-full max-w-md overflow-hidden rounded-2xl shadow-xl border group ${
              isDark ? 'border-slate-800 shadow-black/60' : 'border-slate-100'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
                alt="Raxwo Software Development Team" 
                className="w-full h-[260px] sm:h-[310px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Right Column: About Raxwo Content with Glide Entrance */}
          <div className="md:col-span-7 flex flex-col items-start text-left scroll-reveal-right delay-150">
            
            {/* Badge: Our Company */}
            <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase mb-3 shadow-sm ${
              isDark 
                ? 'bg-cyan-950/70 border border-cyan-800/50 text-cyan-300' 
                : 'bg-[#0c0827] text-white'
            }`}>
              Our Company
            </span>

            {/* Title Line 1: About Raxwo */}
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              About Raxwo
            </h2>

            {/* Title Line 2: Global Software & Digital Solutions */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0084ff] tracking-tight leading-tight mt-1 mb-4">
              Global Software &amp; Digital Solutions
            </h3>

            {/* Paragraph */}
            <p className={`text-xs sm:text-sm md:text-base leading-relaxed font-normal mb-6 max-w-xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              At Raxwo Pvt Ltd, we specialize in custom software development, web solutions, and digital marketing services. Our mission is to empower businesses worldwide with innovative, reliable, and scalable digital solutions that drive growth and efficiency.
            </p>

            {/* Explore Solutions Button */}
            <button
              onClick={handleCtaClick}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:gap-3 hover:scale-105 active:scale-95"
            >
              <span>Explore ERP Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </section>

    </div>
  );
}
