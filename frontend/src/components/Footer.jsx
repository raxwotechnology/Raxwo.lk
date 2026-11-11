import React from 'react';
import { getTranslation } from '../i18n/translations';

export default function Footer({ theme = 'dark', onRouteChange, lang = 'en' }) {
  const t = (k) => getTranslation(lang, k);
  const handleNav = (route, hash) => {
    if (onRouteChange) {
      onRouteChange(route);
    }
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <footer className="relative w-full bg-black text-white pt-14 pb-8 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden font-sans">
      
      {/* World Map Silhouette Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 bg-center bg-no-repeat bg-cover select-none"
        style={{
          backgroundImage: `url('/world-map.svg')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* 4 Columns Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-12">
          
          {/* Column 1: Brand Logo & Contact */}
          <div className="flex flex-col space-y-5">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => onRouteChange && onRouteChange('home')}
                className="text-left focus:outline-none cursor-pointer group"
              >
                <img 
                  src="/raxwo-logo.png" 
                  alt="RAXWO - NEXT LEVEL TECH" 
                  className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
                />
              </button>
            </div>

            {/* Head Office */}
            <div className="space-y-1 text-sm pt-1">
              <span className="text-[#0094ff] font-bold block text-sm sm:text-[15px]">
                Head Office:
              </span>
              <span className="text-white font-bold block text-sm sm:text-[15px]">
                Weliweriya, Sri lanka
              </span>
            </div>

            {/* Contact */}
            <div className="space-y-1 text-sm pt-1">
              <span className="text-[#0094ff] font-bold block text-sm sm:text-[15px]">
                Contact:
              </span>
              <a 
                href="tel:+94743573333" 
                className="text-white hover:text-[#0094ff] transition-colors font-bold block text-sm sm:text-[15px]"
              >
                +94 74 357 3333
              </a>
            </div>

            {/* Social Icons (5 Cyan/Blue Circular Buttons) */}
            <div className="flex items-center gap-2.5 pt-2">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0094ff] hover:bg-[#0080e0] flex items-center justify-center text-white transition-transform hover:scale-110 shadow-md shadow-blue-500/20"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0094ff] hover:bg-[#0080e0] flex items-center justify-center text-white transition-transform hover:scale-110 shadow-md shadow-blue-500/20"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0094ff] hover:bg-[#0080e0] flex items-center justify-center text-white transition-transform hover:scale-110 shadow-md shadow-blue-500/20"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0094ff] hover:bg-[#0080e0] flex items-center justify-center text-white transition-transform hover:scale-110 shadow-md shadow-blue-500/20"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.761 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="TikTok"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0094ff] hover:bg-[#0080e0] flex items-center justify-center text-white transition-transform hover:scale-110 shadow-md shadow-blue-500/20"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.86-4.49v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.86-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="space-y-4">
            <h4 className="text-[#0094ff] font-bold text-sm sm:text-[15px]">
              Quick links
            </h4>
            <ul className="space-y-3.5 text-sm sm:text-[15px] font-bold text-white">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <a 
                  href="https://raxwo.net/success-stories/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#0094ff] transition-colors text-left flex items-center justify-between group"
                >
                  <span>Success Stories</span>
                  <span className="text-xs text-blue-400 opacity-80 group-hover:translate-x-0.5 transition-transform">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://manage.raxwo.net/our-team" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#0094ff] transition-colors text-left flex items-center justify-between group"
                >
                  <span>Our Team</span>
                  <span className="text-xs text-blue-400 opacity-80 group-hover:translate-x-0.5 transition-transform">↗</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Who We Are
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Let's Talk
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('support')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  FAQ's
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="text-[#0094ff] font-bold text-sm sm:text-[15px]">
              Services
            </h4>
            <ul className="space-y-3.5 text-sm sm:text-[15px] font-bold text-white">
              <li>
                <button 
                  onClick={() => handleNav('home', '#solutions')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  All Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Development Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('customize')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Creative & Design Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('home', '#solutions')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Marketing Lab
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Services & Products
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Products */}
          <div className="space-y-4">
            <h4 className="text-[#0094ff] font-bold text-sm sm:text-[15px]">
              Products
            </h4>
            <ul className="space-y-3.5 text-sm sm:text-[15px] font-bold text-white">
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left"
                >
                  Software Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Mobile Shop ERP</span>
                  <span>📱</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Salon Management ERP</span>
                  <span>💇</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Restaurant & Hotel ERP</span>
                  <span>🍽️</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('products')} 
                  className="hover:text-[#0094ff] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Hardware & Distribution ERP</span>
                  <span>🏗️</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Subtle Divider Line */}
        <div className="w-full border-t border-[#1a1a1a] mb-6"></div>

        {/* Bottom Bar: Copyright & Privacy / Terms */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-bold text-white gap-3">
          <p>©2026 – Raxwo (Pvt) ltd. | All Rights Reserved</p>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('about')} 
              className="hover:text-[#0094ff] transition-colors cursor-pointer text-white font-bold"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600 font-normal">|</span>
            <button 
              onClick={() => handleNav('about')} 
              className="hover:text-[#0094ff] transition-colors cursor-pointer text-white font-bold"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Floating Bottom-Right WhatsApp Button */}
      <a 
        href="https://wa.me/94743573333?text=Hi%20Raxwo%2C%20I%20would%20like%20to%20inquire%20about%20your%20ERP%20solutions."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer bg-[#25D366] flex items-center justify-center"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </footer>
  );
}
