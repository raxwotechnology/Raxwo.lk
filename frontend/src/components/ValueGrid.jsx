import React from 'react';
import { Sliders, DollarSign, Globe2, Smile } from 'lucide-react';
import { getTranslation } from '../i18n/translations';

export default function ValueGrid({ theme = 'dark', lang = 'en' }) {
  const isDark = theme === 'dark';
  const t = (k) => getTranslation(lang, k);

  const values = [
    {
      icon: Sliders,
      title: t('easyToCustomize'),
      description: t('easyToCustomizeDesc')
    },
    {
      icon: DollarSign,
      title: t('oneTimePurchase'),
      description: t('oneTimePurchaseDesc')
    },
    {
      icon: Globe2,
      title: t('languageCurrency'),
      description: t('languageCurrencyDesc')
    },
    {
      icon: Smile,
      title: t('friendlyAllAges'),
      description: t('friendlyAllAgesDesc')
    }
  ];

  return (
    <section className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 -mt-4 mb-20 z-20">
      
      {/* Section Header Accent */}
      <div className="flex items-center justify-center mb-4">
        <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border shadow-sm ${
          isDark 
            ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/40' 
            : 'text-cyan-800 bg-cyan-100 border-cyan-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          {lang === 'si' ? 'ප්‍රධාන වේදිකා වාසි' : 'Core Architecture Advantages'}
        </span>
      </div>

      <div className={`rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 border interactive-card ${
        isDark 
          ? 'bg-[#0b0f24]/85 border-slate-800/90 shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-cyan-500/40' 
          : 'bg-white/95 border-slate-200 shadow-xl hover:border-blue-400/50'
      }`}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x ${
          isDark ? 'divide-slate-800/80' : 'divide-slate-200'
        }`}>
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 group transition-all duration-300 ${
                  isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'
                }`}
              >
                {/* Rounded Cyan Icon Box */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  isDark 
                    ? 'bg-cyan-950/60 border border-cyan-800/40 text-cyan-400' 
                    : 'bg-cyan-100 border border-cyan-300 text-cyan-700 shadow-sm'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                  <h3 className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                    isDark 
                      ? 'text-white group-hover:text-cyan-300' 
                      : 'text-slate-900 group-hover:text-cyan-600'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mt-1 leading-snug ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
