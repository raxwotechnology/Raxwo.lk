import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function PricingPage({ 
  currency = 'LKR', 
  onCurrencyChange, 
  currencyRates, 
  onSelectPlan,
  theme = 'dark'
}) {
  const isDark = theme === 'dark';

  const currenciesList = ['LKR', 'USD', 'EUR', 'GBP', 'INR'];

  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  const plans = [
    {
      id: "starter",
      name: "STARTER",
      tagline: "A simple start for one location.",
      priceLKR: 75000,
      popular: false,
      features: [
        "Core business modules",
        "Full source code",
        "User documentation",
        "Lifetime perpetual license",
        "Standard thermal POS printing"
      ],
      cta: "Choose Starter"
    },
    {
      id: "professional",
      name: "PROFESSIONAL",
      badge: "MOST POPULAR",
      tagline: "The best fit for growing businesses.",
      priceLKR: 120000,
      popular: true,
      features: [
        "All core modules & add-ons",
        "Full source code (React / Node)",
        "Complete technical documentation",
        "90 days dedicated support",
        "Multi-branch & warehouse sync",
        "Free cloud server deployment setup"
      ],
      cta: "Choose Professional"
    },
    {
      id: "premium",
      name: "PREMIUM",
      badge: "ENTERPRISE",
      tagline: "More support, custom modules & flexibility.",
      priceLKR: 150000,
      popular: false,
      features: [
        "Everything in Professional",
        "Advanced accounting & analytics",
        "180 days priority support",
        "Custom module configuration",
        "Staff training workshops (Online/In-person)"
      ],
      cta: "Choose Premium"
    }
  ];

  return (
    <div className="w-full pb-28">

      {/* Top Header Banner — Identical #0c0827 match to Home Page Header */}
      <section 
        className="w-full pt-10 pb-16 md:pt-14 md:pb-22 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#0c0827] text-white text-center overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), 50% 100%, 0 calc(100% - 24px))'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 inline-block text-cyan-400">
            CLEAR COSTS, LASTING VALUE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.25] mb-3 text-white">
            Simple &amp; Transparent Pricing
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto text-slate-200/90">
            One-time purchase. 100% full source code ownership. No recurring monthly fees.
          </p>

          {/* Currency Switcher — Pill Bar */}
          <div className="inline-flex items-center p-1.5 rounded-2xl border shadow-md mt-7 bg-slate-900/90 border-slate-800">
            {currenciesList.map((cur) => (
              <button
                key={cur}
                onClick={() => onCurrencyChange(cur)}
                className={`px-5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 ${
                  currency === cur
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Pricing Cards Container */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-20 pt-10">

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
                  One-time payment &bull; No monthly fees
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

    </div>
  );
}
