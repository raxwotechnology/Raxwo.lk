import React from 'react';
import { CheckCircle2, TrendingUp, AlertCircle, Plus, Smartphone, Sparkles } from 'lucide-react';
import { getTranslation } from '../i18n/translations';

export default function HeroDashboardMockup({ 
  stats, 
  currency = 'LKR', 
  currencyRates, 
  onNewSaleClick,
  theme = 'dark',
  lang = 'en'
}) {
  const isDark = theme === 'dark';
  const t = (k) => getTranslation(lang, k);
  // Format price based on current currency
  const formatAmount = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  const chartBars = stats?.revenueChart || [
    { day: "Mon", height: 42 },
    { day: "Tue", height: 58 },
    { day: "Wed", height: 45 },
    { day: "Thu", height: 75 },
    { day: "Fri", height: 90 },
    { day: "Sat", height: 82 },
    { day: "Sun", height: 60 }
  ];

  return (
    <div className="relative w-full">
      {/* Background ambient lighting behind mockups */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main ERP Desktop Window Container */}
      <div className="relative rounded-3xl bg-[#0b1022]/90 border border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl p-5 sm:p-7 overflow-hidden transition-all duration-300 hover:border-slate-600">
        
        {/* Subtle grid pattern inside ERP window */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-b from-indigo-500/10 to-transparent blur-xl pointer-events-none"></div>

        {/* Window Top Navigation / Browser bar */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 relative z-10">
          <div className="flex items-center gap-3">
            {/* Window control dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </div>
            {/* Pill Address / App title */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>erp.raxwo.com/portal/dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline">{t('branchName')}</span>
            <span className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
          </div>
        </div>

        {/* Window Content Body with Mini-Sidebar and Main Content */}
        <div className="grid grid-cols-12 gap-5 pt-5 relative z-10">
          
          {/* Mini Left Sidebar */}
          <div className="hidden sm:flex col-span-1 flex-col items-center gap-4 py-2 border-r border-slate-800/60 pr-4">
            <div className="w-8 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
            <div className="w-6 h-1.5 rounded-full bg-slate-700/80"></div>
            <div className="w-6 h-1.5 rounded-full bg-slate-700/80"></div>
            <div className="w-6 h-1.5 rounded-full bg-slate-700/80"></div>
            <div className="w-6 h-1.5 rounded-full bg-slate-800/50 mt-8"></div>
          </div>

          {/* Main ERP Dashboard View */}
          <div className="col-span-12 sm:col-span-11 flex flex-col gap-5">
            
            {/* Greeting Header & + New Sale Button */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  {t('greeting')}
                  <span className="text-base">👋</span>
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  {t('overviewSub')}
                </p>
              </div>

              {/* + New Sale Button (Interactive!) */}
              <button
                onClick={onNewSaleClick}
                className="group flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                title="Click to simulate recording a live transaction"
              >
                <Plus className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90" />
                <span>{t('newSaleBtn')}</span>
              </button>
            </div>

            {/* 3 Metric Cards Grid - Matching Image exactly */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* Metric 1: Today's Sales */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#11172e]/80 border border-slate-700/50 relative overflow-hidden transition-all duration-200 hover:border-slate-600">
                <span className="text-[11px] font-medium text-slate-400 block">{t('todaysSales')}</span>
                <span className="text-sm sm:text-lg font-bold text-white block mt-1 tracking-tight truncate">
                  {formatAmount(stats?.salesToday || 148500)}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mt-2 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {stats?.salesGrowth || '+12.5%'}
                </span>
              </div>

              {/* Metric 2: New Orders */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#11172e]/80 border border-slate-700/50 relative overflow-hidden transition-all duration-200 hover:border-slate-600">
                <span className="text-[11px] font-medium text-slate-400 block">{t('newOrders')}</span>
                <span className="text-sm sm:text-lg font-bold text-white block mt-1 tracking-tight">
                  {stats?.newOrders || 24}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mt-2 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {stats?.ordersGrowth || '+8.2%'}
                </span>
              </div>

              {/* Metric 3: Low Stock */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#11172e]/80 border border-slate-700/50 relative overflow-hidden transition-all duration-200 hover:border-slate-600">
                <span className="text-[11px] font-medium text-slate-400 block">{t('lowStock')}</span>
                <span className="text-sm sm:text-lg font-bold text-amber-400 block mt-1 tracking-tight">
                  0{stats?.lowStockCount || 8}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-300 mt-2 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40">
                  <AlertCircle className="w-2.5 h-2.5" />
                  {t('reorder')}
                </span>
              </div>
            </div>

            {/* Revenue Overview Bar Chart */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#11172e]/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('revenueOverview')}
                </span>
                <span className="text-[10px] text-cyan-400 font-medium">{t('realTimeSync')}</span>
              </div>

              {/* Glowing Cyan/Blue Bars */}
              <div className="flex items-end justify-between gap-2 sm:gap-4 h-28 pt-2">
                {chartBars.map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full relative flex items-end justify-center h-full">
                      <div
                        style={{ height: `${bar.height}%` }}
                        className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-500 group-hover:brightness-125"
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Status Badge (Bottom Left corner) */}
      <div className={`absolute -bottom-5 left-4 sm:left-6 z-20 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-float-slow border ${
        isDark ? 'bg-[#090d1f]/95 border-slate-700/80 shadow-[0_15px_35px_rgba(0,0,0,0.6)]' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isDark ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-cyan-100 border border-cyan-300 text-cyan-700'
        }`}>
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h4 className={`text-xs font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('systemReady')}</h4>
          <p className={`text-[10px] font-medium flex items-center gap-1 ${isDark ? 'text-cyan-400/90' : 'text-cyan-700'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"></span>
            {t('allServicesOnline')}
          </p>
        </div>
      </div>

      {/* Floating Overlapping Mobile Mockup (Bottom Right) */}
      <div className="absolute -bottom-8 -right-3 sm:-right-6 w-48 sm:w-56 rounded-3xl bg-[#0a0f24] border-2 border-slate-700/90 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-30 transition-transform duration-300 hover:scale-105">
        {/* Phone Notch */}
        <div className="w-16 h-2.5 bg-slate-800 rounded-full mx-auto mb-3"></div>

        {/* Phone Screen Card */}
        <div className="p-3 rounded-2xl bg-[#11172e] border border-slate-800 flex flex-col gap-1">
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
            {t('todaysSales')}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-white">
            {formatAmount(stats?.mobileTodaySales || 48200)}
          </span>

          {/* Mini Wave / Area Line Mockup */}
          <div className="relative h-12 w-full my-1 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="phoneGlowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,35 Q20,30 35,22 T70,18 T100,5 L100,40 L0,40 Z"
                fill="url(#phoneGlowGrad)"
              />
              <path
                d="M0,35 Q20,30 35,22 T70,18 T100,5"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
            <span>{stats?.mobileCompletedOrders || 12} {t('ordersCompleted')}</span>
            <span className="text-emerald-400 font-semibold">{t('livePos')}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
