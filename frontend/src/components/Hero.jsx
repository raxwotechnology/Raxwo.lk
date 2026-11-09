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
          Matching media_1791915432625_6bddae32.png
         ======================================================== */}
      <section className={`relative w-full pt-12 pb-16 md:pt-16 md:pb-20 px-6 sm:px-10 lg:px-16 xl:px-20 border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0c0827] text-white border-slate-800/80' 
          : 'bg-[#f3f6fb] text-slate-900 border-slate-200'
      }`}>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Badge: Enter The Digital World */}
          <div className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide mb-6 border shadow-sm ${
            isDark 
              ? 'text-slate-200 bg-white/10 border-white/15 backdrop-blur-md' 
              : 'text-slate-700 bg-white border-slate-200'
          }`}>
            {lang === 'si' ? 'ඩිජිටල් ලෝකයට පිවිසෙන්න' : lang === 'ta' ? 'டிஜிட்டல் உலகிற்குள் நுழையுங்கள்' : 'Enter The Digital World'}
          </div>

          {/* Main Title: Custom Software Development */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight leading-[1.2] max-w-3xl ${
            isDark ? 'text-white' : 'text-[#0a0827]'
          }`}>
            {lang === 'si' ? 'විශේෂිත මෘදුකාංග සංවර්ධනය' : lang === 'ta' ? 'தனிப்பயன் மென்பொருள் உருவாக்கம்' : 'Custom Software Development'}
          </h1>

          {/* Line 2: in Sri Lanka */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#0094ff] tracking-tight mt-1 mb-5">
            {lang === 'si' ? 'ශ්‍රී ලංකාව තුළ' : lang === 'ta' ? 'இலங்கையில்' : 'in Sri Lanka'}
          </h2>

          {/* Subtitle / Paragraph */}
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal mb-8 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {lang === 'si' ? (
              <>
                <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Raxwo සමාගම</strong> ඔබගේ ව්‍යාපාරික ක්‍රියාවලීන්ට ගැළපෙන පරිදි විශේෂිත මෘදුකාංග සංවර්ධන සේවාවන් සපයයි. <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>ව්‍යාපාර කළමනාකරණ පද්ධති සහ ERP විසඳුම්වල සිට වෙබ් හා ජංගම දුරකථන යෙදුම්</strong> දක්වා, ව්‍යාපාර වඩාත් කාර්යක්ෂමව මෙහෙයවීමට සහ වර්ධනය වීමට අවශ්‍ය විශ්වාසනීය විසඳුම් අප නිර්මාණය කරමු.
              </>
            ) : lang === 'ta' ? (
              <>
                <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Raxwo</strong> உங்கள் வணிக நடைமுறைகளுக்கு ஏற்ப தனிப்பயன் மென்பொருள் மேம்பாட்டு சேவைகளை வழங்குகிறது. <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>வணிக மேலாண்மை அமைப்புகள் மற்றும் ERP தீர்வுகள் முதல் இணைய பயன்பாடுகள் மற்றும் மொபைல் ஆப்ஸ்</strong> வரை, வணிகங்கள் சிறப்பாக இயங்கவும் வளரவும் உதவும் தீர்வுகளை நாங்கள் உருவாக்குகிறோம்.
              </>
            ) : (
              <>
                <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Raxwo provides</strong> custom software development services designed around your business processes. From business <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>management systems and ERP solutions to web applications and mobile apps</strong>, we build scalable solutions that help businesses work smarter and grow.
              </>
            )}
          </p>

          {/* CTA Button: What We Do ! */}
          <button
            onClick={handleCtaClick}
            className={`px-7 py-3 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              isDark 
                ? 'bg-white hover:bg-slate-100 text-slate-900' 
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {lang === 'si' ? 'අපගේ සේවාවන් !' : lang === 'ta' ? 'எங்கள் சேவைகள் !' : 'What We Do !'}
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
            ? 'bg-[#080b18] text-white border-b border-slate-800/80' 
            : 'bg-white text-slate-900 border-b border-slate-200'
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Left Column: Team Office Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className={`relative w-full max-w-md overflow-hidden rounded-2xl shadow-xl border group ${
              isDark ? 'border-slate-800 shadow-black/60' : 'border-slate-100'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
                alt="Raxwo Software Development Team" 
                className="w-full h-[260px] sm:h-[310px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Right Column: About Raxwo Content */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            
            {/* Badge: Our Company */}
            <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase mb-3 shadow-sm ${
              isDark 
                ? 'bg-cyan-950/70 border border-cyan-800/50 text-cyan-300' 
                : 'bg-[#0c0827] text-white'
            }`}>
              {lang === 'si' ? 'අපගේ සමාගම' : lang === 'ta' ? 'எங்கள் நிறுவனம்' : 'Our Company'}
            </span>

            {/* Title Line 1: About Raxwo */}
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#0a0827]'
            }`}>
              {lang === 'si' ? 'Raxwo ගැන' : lang === 'ta' ? 'Raxwo பற்றி' : 'About Raxwo'}
            </h2>

            {/* Title Line 2: Development Hub */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0094ff] tracking-tight leading-tight mt-1 mb-5">
              {lang === 'si' ? 'මෘදුකාංග සංවර්ධන කේන්ද්‍රය' : lang === 'ta' ? 'மென்பொருள் மேம்பாட்டு மையம்' : 'Development Hub'}
            </h3>

            {/* Lead Paragraph */}
            <p className={`font-bold text-sm sm:text-base leading-relaxed mb-4 max-w-xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {lang === 'si' 
                ? 'Raxwo Pvt Ltd මෘදුකාංග සංවර්ධන කේන්ද්‍රය සැබෑ ව්‍යාපාරික වර්ධනයක් ඇති කරන ආරක්ෂිත, උසස් ක්‍රියාකාරීත්වයකින් යුත් ඩිජිටල් විසඳුම් සපයයි.' 
                : lang === 'ta' 
                ? 'Raxwo Pvt Ltd-ன் மேம்பாட்டு மையம் உண்மையான வணிக வளர்ச்சியைத் தூண்டும் அளவிடக்கூடிய, பாதுகாப்பான, உயர் செயல்திறன் கொண்ட டிஜிட்டல் தீர்வுகளை வழங்குகிறது.' 
                : 'Raxwo Pvt Ltd’s Development Hub delivers scalable, secure, high-performance digital solutions that fuel real business growth.'}
            </p>

            {/* Paragraph */}
            <p className={`text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal mb-6 max-w-xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {lang === 'si' ? (
                <>
                  ශ්‍රී ලංකාවේ ප්‍රමුඛතම <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>විශේෂිත මෘදුකාංග සංවර්ධන සමාගමක්</strong> ලෙස, ඉහළම ප්‍රමිතීන්ට අනුකූල වන පරිදි <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Java මත පදනම් වූ ERP සහ POS පද්ධති</strong>, <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>ජංගම සහ වෙබ් යෙදුම්</strong>, සහ <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>ආරක්ෂිත පරිගණක පද්ධති (On-premise)</strong> අප නිර්මාණය කරමු. අපගේ ඉංජිනේරුවන් පහසු <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>API සංවර්ධනය සහ ඒකාබද්ධ කිරීමේ සේවාවන්</strong> ලබා දෙමින් ඔබගේ ආයෝජනයට උපරිම වටිනාකමක් සහතික කරයි.
                </>
              ) : lang === 'ta' ? (
                <>
                  இலங்கையின் முன்னணி <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>தனிப்பயன் மென்பொருள் நிறுவனமாக</strong>, நாம் <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Java அடிப்படையிலான ERP மற்றும் POS அமைப்புகள்</strong>, <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>மொபைல் மற்றும் வலை பயன்பாடுகள்</strong>, மற்றும் <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>பாதுகாப்பான மென்பொருள் தளங்களை</strong> உருவாக்குகிறோம். எங்கள் பொறியாளர்கள் தடையற்ற <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>API மேம்பாடு மற்றும் ஒருங்கிணைப்பு சேவைகளையும்</strong> வழங்குகிறார்கள்.
                </>
              ) : (
                <>
                  As a leading <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>custom software development company in Sri Lanka</strong>, we craft tailor-made <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Java-based ERP and POS systems</strong>, responsive <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>mobile and web applications</strong>, and <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>secure on-premise platforms</strong> that meet the most demanding performance and compliance standards. Our engineers also provide seamless <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>API development and integration services</strong>, ensuring every solution fits perfectly within your existing tech stack and drives measurable ROI.
                </>
              )}
            </p>

            {/* Explore Solutions Button */}
            <button
              onClick={handleCtaClick}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer hover:gap-3"
            >
              <span>{lang === 'si' ? 'ERP විසඳුම් බලන්න' : lang === 'ta' ? 'ERP தீர்வுகளை ஆராய்க' : 'Explore ERP Solutions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </section>

    </div>
  );
}
