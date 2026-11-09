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
      <div className={`rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden transition-colors border ${
        isDark 
          ? 'bg-[#0b0f24]/75 border-slate-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.5)]' 
          : 'bg-white/90 border-slate-200 shadow-xl'
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
