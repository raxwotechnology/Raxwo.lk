import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function PricingSection({ currency = 'LKR', currencyRates, onOpenInquiry, theme = 'dark' }) {
  const isDark = theme === 'dark';

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
      name: "Starter Solution",
      tagline: "Ideal for single store, cafe, boutique, or dispensary",
      priceLKR: 55000,
      badge: "Standard",
      popular: false,
      features: [
        "1 Branch / Outlet configuration",
        "Lifetime perpetual license (No monthly fees)",
        "Core POS & Inventory depletion",
        "ESC/POS thermal printer setup",
        "Basic sales & cash register reports",
        "30 days technical support & training",
        "Compliant with Sri Lankan VAT"
      ],
      cta: "Choose Starter"
    },
    {
      name: "Business Pro + Source Code",
      tagline: "Our most chosen tier: includes 100% full source code ownership",
      priceLKR: 95000,
      badge: "Most Popular",
      popular: true,
      features: [
        "Multi-branch & warehouse stock transfer",
        "Full unminified Source Code included (React/Node)",
        "Mobile App for CEO / Manager live reports",
        "Tri-lingual UI: Sinhala, English, Tamil",
        "User roles, cash drawer & shift auditing",
        "Barcode generator & label design tool",
        "6 months priority phone & WhatsApp support",
        "Free cloud server deployment setup"
      ],
      cta: "Get Business Pro"
    },
    {
      name: "Enterprise Custom ERP",
      tagline: "Tailored to your exact company workflows and existing systems",
      priceLKR: 165000,
      badge: "Enterprise",
      popular: false,
      features: [
        "Unlimited branches & sub-locations",
        "100% Full Source code & complete Git repository",
        "Custom module development (tailored to your specs)",
        "Accounting integration (QuickBooks / Xero / RAMIS)",
        "On-premise offline server + cloud failover sync",
        "1 Year 24/7 dedicated engineer support",
        "Staff training workshops (In-person or Zoom)"
      ],
      cta: "Contact for Enterprise"
    }
  ];

  return (
    <section id="pricing" className={`relative w-full py-20 px-6 sm:px-10 lg:px-16 xl:px-20 border-t ${
      isDark ? 'border-slate-800/60' : 'border-slate-200'
    }`}>
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className={`text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-3 inline-block ${
          isDark 
            ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
            : 'text-cyan-800 bg-cyan-100 border border-cyan-300'
        }`}>
          ZERO MONTHLY SUBSCRIPTION FEES
        </span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Simple, Transparent One-Time Investment
        </h2>
        <p className={`text-sm sm:text-base mt-3 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Pay once, own forever. No surprise monthly bills, user seat taxes, or hidden renewal fees.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 interactive-card ${
              plan.popular
                ? 'bg-gradient-to-b from-[#111838] to-[#0c1024] text-white border-2 border-indigo-500 shadow-[0_0_35px_rgba(99,102,241,0.25)] scale-[1.02] lg:-translate-y-2 hover:border-indigo-400' 
                : isDark 
                  ? 'bg-[#0b1022]/80 border border-slate-800 hover:border-blue-500/50' 
                  : 'bg-white border border-slate-200 shadow-xl hover:border-blue-400'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{plan.badge}</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-xl font-bold ${
                  plan.popular ? 'text-white' : isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {plan.name}
                </h3>
                {!plan.popular && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isDark ? 'text-slate-400 bg-slate-900 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
                  }`}>
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className={`text-xs mb-6 min-h-[32px] ${
                plan.popular ? 'text-slate-300' : isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {plan.tagline}
              </p>

              {/* Price display */}
              <div className={`pb-6 mb-6 border-b ${
                plan.popular ? 'border-slate-800/80' : isDark ? 'border-slate-800/80' : 'border-slate-100'
              }`}>
                <span className={`text-3xl sm:text-4xl font-extrabold ${
                  plan.popular ? 'text-white' : isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatPrice(plan.priceLKR)}
                </span>
                <span className={`text-xs block mt-1 font-medium ${
                  plan.popular ? 'text-slate-400' : isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  One-time fee • Lifetime ownership
                </span>
              </div>

              {/* Feature list */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                    plan.popular ? 'text-slate-200' : isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                      plan.popular ? 'text-cyan-400' : isDark ? 'text-slate-400' : 'text-blue-600'
                    }`} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenInquiry({ name: plan.name, price: plan.priceLKR })}
              className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:scale-[1.02] cursor-pointer'
                  : isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/60 cursor-pointer' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md cursor-pointer'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}
