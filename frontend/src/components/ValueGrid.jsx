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
    <section className={`relative w-full py-16 px-6 sm:px-10 lg:px-16 xl:px-20 z-20 transition-colors duration-300 ${
      isDark ? 'bg-[#0d122b]' : 'bg-[#f8fafc]'
    }`}>
      
      {/* Section Header Accent */}
      <div className="flex items-center justify-center mb-6 scroll-reveal">
        <span className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border ${
          isDark 
            ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50' 
            : 'text-cyan-800 bg-cyan-100 border-cyan-200'
        }`}>
          {lang === 'si' ? 'ප්‍රධාන වේදිකා වාසි' : 'Core Architecture Advantages'}
        </span>
      </div>

      <div className={`rounded-3xl shadow-xl overflow-hidden transition-all duration-300 border scroll-reveal-scale delay-100 ${
        isDark 
          ? 'bg-[#090d1f] border-slate-800/80' 
          : 'bg-white border-slate-200/60 shadow-lg'
      }`}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x ${
          isDark ? 'divide-slate-800/80' : 'divide-slate-100'
        }`}>
          {values.map((item, index) => {
            const Icon = item.icon;
            const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400'];
            return (
              <div 
                key={index}
                className={`p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 group transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${
                  isDark ? 'hover:bg-slate-800/40' : 'hover:bg-blue-50/40'
                }`}
              >
                {/* Rounded Cyan Icon Box - Clean & Matte */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  isDark 
                    ? 'bg-slate-800/90 border border-slate-700/80 text-cyan-400' 
                    : 'bg-blue-50 border border-blue-100 text-blue-600'
                }`}>
                  <Icon className="w-5 h-5" />
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
