import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function PricingPage({ 
  currency = 'LKR', 
  onCurrencyChange, 
  currencyRates, 
  onSelectPlan,
  theme = 'dark',
  lang = 'en'
}) {
  const isDark = theme === 'dark';

  const formatPrice = (lkrAmount) => {
    return `LKR ${Number(lkrAmount).toLocaleString()}`;
  };

  const plans = [
    {
      id: "starter",
      name: "STARTER",
      tagline: lang === 'si' 
        ? "තනි වෙළඳසැලක් සඳහා වඩාත් සුදුසු ආරම්භය." 
        : lang === 'ta'
        ? "ஒரு இடத்திற்கான எளிய தொடக்கம்."
        : "A simple start for one location.",
      priceLKR: 75000,
      popular: false,
      features: lang === 'si' ? [
        "මූලික ව්‍යාපාර මොඩියුල",
        "සම්පූර්ණ මූල කේතය (Source Code)",
        "පරිශීලක අත්පොත් හා මාර්ගෝපදේශ",
        "ජීවිත කාලයටම බලපත්‍රය",
        "තාප මුද්‍රණ (Thermal POS) සහාය"
      ] : lang === 'ta' ? [
        "அடிப்படை வணிக தொகுதிகள்",
        "முழு மூலக் குறியீடு",
        "பயனர் ஆவணங்கள்",
        "வாழ்நாள் உரிமம்",
        "தெர்மல் POS ரசீது அச்சிடுதல்"
      ] : [
        "Core business modules",
        "Full source code",
        "User documentation",
        "Lifetime perpetual license",
        "Standard thermal POS printing"
      ],
      cta: lang === 'si' ? "Starter තෝරන්න" : lang === 'ta' ? "Starter-ஐத் தேர்ந்தெடுக்கவும்" : "Choose Starter"
    },
    {
      id: "professional",
      name: "PROFESSIONAL",
      badge: lang === 'si' ? "වඩාත් ජනප්‍රියයි" : lang === 'ta' ? "மிகவும் பிரபலமானது" : "MOST POPULAR",
      tagline: lang === 'si'
        ? "වර්ධනය වන ව්‍යාපාර සඳහා වඩාත් සුදුසු විසඳුම."
        : lang === 'ta'
        ? "வளரும் வணிகங்களுக்கு சிறந்த தேர்வு."
        : "The best fit for growing businesses.",
      priceLKR: 120000,
      popular: true,
      features: lang === 'si' ? [
        "සියලු මූලික මොඩියුල සහ අතිරේක අංග",
        "සම්පූර්ණ මූල කේතය (React / Node)",
        "සම්පූර්ණ තාක්ෂණික ලියකියවිලි",
        "දින 90ක විශේෂිත සහාය",
        "බහු ශාඛා සහ ගබඩා සමමුහුර්තකරණය",
        "නොමිලේ සර්වර් සැකසුම් (Deployment)"
      ] : lang === 'ta' ? [
        "அனைத்து தொகுதிகள் மற்றும் துணை அம்சங்கள்",
        "முழு மூலக் குறியீடு (React / Node)",
        "தொழில்நுட்ப ஆவணங்கள்",
        "90 நாட்கள் பிரத்யேக ஆதரவு",
        "பல கிளை மற்றும் கிடங்கு ஒத்திசைவு",
        "இலவச கிளவுட் சர்வர் அமைப்பு"
      ] : [
        "All core modules & add-ons",
        "Full source code (React / Node)",
        "Complete technical documentation",
        "90 days dedicated support",
        "Multi-branch & warehouse sync",
        "Free cloud server deployment setup"
      ],
      cta: lang === 'si' ? "Professional තෝරන්න" : lang === 'ta' ? "Professional-ஐத் தேர்ந்தெடுக்கவும்" : "Choose Professional"
    },
    {
      id: "premium",
      name: "PREMIUM",
      badge: lang === 'si' ? "ආයතනික" : lang === 'ta' ? "நிறுவனம்" : "ENTERPRISE",
      tagline: lang === 'si'
        ? "විශේෂිත සහාය, අමතර මොඩියුල සහ පූර්ණ නම්‍යශීලී බව."
        : lang === 'ta'
        ? "கூடுதல் ஆதரவு மற்றும் தனிப்பயன் தொகுதிகள்."
        : "More support, custom modules & flexibility.",
      priceLKR: 150000,
      popular: false,
      features: lang === 'si' ? [
        "Professional පැකේජයේ සියල්ල ඇතුළත් වේ",
        "උසස් ගිණුම්කරණය සහ විශ්ලේෂණ",
        "දින 180ක ප්‍රමුඛතා සහාය",
        "විශේෂිත අවශ්‍යතා අනුව සැකසීම",
        "කාර්ය මණ්ඩල පුහුණු වැඩමුළු"
      ] : lang === 'ta' ? [
        "Professional-இல் உள்ள அனைத்தும்",
        "மேம்பட்ட கணக்கியல் மற்றும் பகுப்பாய்வு",
        "180 நாட்கள் முன்னுரிமை ஆதரவு",
        "தனிப்பயன் தொகுதி உள்ளமைவு",
        "ஊழியர் பயிற்சி பட்டறைகள்"
      ] : [
        "Everything in Professional",
        "Advanced accounting & analytics",
        "180 days priority support",
        "Custom module configuration",
        "Staff training workshops (Online/In-person)"
      ],
      cta: lang === 'si' ? "Premium තෝරන්න" : lang === 'ta' ? "Premium-ஐத் தேர்ந்தெடுக்கவும்" : "Choose Premium"
    }
  ];

  return (
    <div className="w-full pt-10 pb-28 px-6 sm:px-10 lg:px-16 xl:px-20">

      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <span className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-4 inline-block ${
          isDark ? 'text-cyan-400' : 'text-blue-700'
        }`}>
          {lang === 'si' ? 'පැහැදිලි මිල ගණන්, උපරිම වටිනාකම' : lang === 'ta' ? 'தெளிவான விலை, நீடித்த மதிப்பு' : 'CLEAR COSTS, LASTING VALUE'}
        </span>
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.25] mb-3 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {lang === 'si' ? 'සරල සහ විනිවිද පෙනෙන මිල ගණන්' : lang === 'ta' ? 'எளிய மற்றும் வெளிப்படையான விலை' : 'Simple & Transparent Pricing'}
        </h1>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {lang === 'si' 
            ? 'එක්වරක් පමණක් මිලදී ගැනීම. 100% මූල කේතයේ (Source Code) හිමිකාරිත්වය. මාසික ගාස්තු නැත.' 
            : lang === 'ta' 
            ? 'ஒரு முறை வாங்குதல். 100% மூலக் குறியீடு உரிமை. மாதாந்திர கட்டணங்கள் இல்லை.' 
            : 'One-time purchase. 100% full source code ownership. No recurring monthly fees.'}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto mt-12">
        {plans.map((plan) => {
          // In dark mode popular is dark navy; in light mode popular is emphasized white card with blue accents
          const isPop = plan.popular;
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col transition-all duration-300 border ${
                isPop
                  ? isDark
                    ? 'bg-gradient-to-b from-[#111938] via-[#0d132c] to-[#0a0f24] border-blue-500/80 shadow-[0_8px_40px_rgba(59,130,246,0.25)] scale-[1.02]'
                    : 'bg-white border-2 border-blue-600 shadow-[0_12px_40px_rgba(37,99,235,0.15)] ring-4 ring-blue-500/10 scale-[1.02]'
                  : isDark
                    ? 'bg-[#0b1022]/85 border-slate-800/80 hover:border-slate-700 hover:shadow-lg'
                    : 'bg-white/95 border-slate-200/90 shadow-md hover:shadow-xl hover:border-slate-300'
              }`}
            >
              {/* Plan name + badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-base font-extrabold tracking-wider uppercase ${
                  isPop
                    ? isDark ? 'text-white' : 'text-blue-600'
                    : isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                    isPop
                      ? isDark 
                        ? 'text-cyan-300 bg-cyan-900/60 border border-cyan-700/50' 
                        : 'text-white bg-blue-600 shadow-sm shadow-blue-500/30'
                      : isDark
                        ? 'text-slate-400 bg-slate-900 border border-slate-800'
                        : 'text-blue-700 bg-blue-50 border border-blue-200/70'
                  }`}>
                    {isPop && <Sparkles className="w-3 h-3" />}
                    <span>{plan.badge}</span>
                  </span>
                )}
              </div>

              {/* Tagline */}
              <p className={`text-sm mb-6 min-h-[20px] ${
                isPop
                  ? isDark ? 'text-slate-300' : 'text-slate-600 font-medium'
                  : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {plan.tagline}
              </p>

              {/* Divider */}
              <div className={`border-t mb-6 ${
                isPop
                  ? isDark ? 'border-white/10' : 'border-blue-100'
                  : isDark ? 'border-slate-800' : 'border-slate-100'
              }`} />

              {/* Price */}
              <div className="mb-7">
                <span className={`text-3xl sm:text-4xl font-black ${
                  isPop
                    ? isDark ? 'text-white' : 'text-slate-900'
                    : isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatPrice(plan.priceLKR)}
                </span>
                <span className={`text-xs block mt-1.5 font-medium ${
                  isPop
                    ? isDark ? 'text-slate-400' : 'text-blue-600 font-semibold'
                    : isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {lang === 'si' ? 'එක්වරක් පමණක් ගෙවීම • මාසික ගාස්තු නැත' : lang === 'ta' ? 'ஒரு முறை செலுத்துதல் • மாதாந்திர கட்டணம் இல்லை' : 'One-time payment • No monthly fees'}
                </span>
              </div>

              {/* Features — flex-1 so button always stays at bottom */}
              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isPop
                        ? isDark ? 'text-cyan-400' : 'text-blue-600 font-bold'
                        : isDark ? 'text-cyan-400' : 'text-blue-500'
                    }`} />
                    <span className={
                      isPop
                        ? isDark ? 'text-slate-200' : 'text-slate-800 font-medium'
                        : isDark ? 'text-slate-300' : 'text-slate-700'
                    }>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button — pinned to bottom */}
              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm cursor-pointer transition-all duration-200 ${
                  isPop
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]'
                    : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md'
                }`}
              >
                {plan.cta}
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
