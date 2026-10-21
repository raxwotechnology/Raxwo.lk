import React, { useState } from 'react';
import { 
  ArrowRight, 
  Wrench, 
  Check, 
  Star, 
  TrendingUp, 
  Smartphone, 
  Plus, 
  CheckCircle, 
  DollarSign,
  Package,
  ShieldCheck,
  Play
} from 'lucide-react';

export default function ProductDetailPage({ 
  product, 
  onBackToProducts, 
  onChoosePackage, 
  onRequestCustomize,
  currency = 'LKR', 
  currencyRates,
  theme = 'dark'
}) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [salesWave, setSalesWave] = useState(248000);

  const isDark = theme === 'dark';

  // Fallback product if none selected
  const p = product || {
    id: "mobixa",
    name: "Mobixa",
    subtitle: "Mobile Shop ERP",
    category: "Retail",
    badge: "Mobile & Repair Business",
    tagline: "Manage sales, inventory, accessories and service jobs in one place.",
    fullDescription: "A complete, easy-to-use system for mobile sales, accessories, repairs, inventory and customer care.",
    priceLKR: 75000,
    priceUSD: 249,
    rating: 4.9,
    reviewsCount: 126,
    audience: [
      "Mobile shop owners",
      "Mobile accessory stores",
      "Smartphone repair centers"
    ]
  };

  const tabs = ['Overview', 'Features', 'Screenshots', 'Demo Video', 'Reviews'];

  return (
    <div className="w-full pt-6 pb-24 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Breadcrumb Navigation (Exact match to Image 2) */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button 
          onClick={onBackToProducts}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button 
          onClick={onBackToProducts}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          Products
        </button>
        <span>/</span>
        <span className={isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'}>
          {p.name}
        </span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Column: Title, Ratings, Description, Action Buttons */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* App Icon & Category Tag */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-900 border border-blue-500/40 flex items-center justify-center p-3">
              <svg className="w-full h-full text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <path d="M12 18h.01" />
                <path d="M9 6h6" />
                <path d="M8 12l2 2 4-4" stroke="#38bdf8" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wide">
              {p.badge || 'Mobile & Repair Business'}
            </span>
          </div>

          {/* Heading */}
          <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {p.name}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-400 mb-5">
            – {p.subtitle || 'Mobile Shop ERP'}
          </h2>

          {/* Subtitle / Description */}
          <p className={`text-base sm:text-lg leading-relaxed max-w-xl mb-6 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {p.fullDescription || p.tagline}
          </p>

          {/* Star Ratings */}
          <div className="flex items-center gap-2 mb-8 text-xs sm:text-sm">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {p.rating || 4.9}
            </span>
            <span className="text-slate-400">
              from {p.reviewsCount || 126} customers
            </span>
          </div>

          {/* Action Buttons: Choose Package & Request Customization */}
          <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
            <button
              onClick={() => onChoosePackage(p)}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_25px_rgba(99,102,241,0.5)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Choose Package</span>
            </button>

            <button
              onClick={() => onRequestCustomize(p)}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto border ${
                isDark 
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:text-white' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              <Wrench className="w-4 h-4 text-slate-400" />
              <span>Request Customization</span>
            </button>
          </div>

          {/* 3 Checks Highlights */}
          <div className={`flex flex-wrap items-center gap-6 text-xs sm:text-sm ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>One-time purchase</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Free setup help</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Source code included</span>
            </div>
          </div>

        </div>

        {/* Right Column: Business Dashboard Mockup Window (Exact match to Image 2) */}
        <div className="lg:col-span-6 w-full">
          <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-xl shadow-2xl transition-all ${
            isDark 
              ? 'bg-[#0a0f22]/95 border-slate-800/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)]' 
              : 'bg-slate-900 text-white border-slate-800 shadow-2xl'
          }`}>
            {/* Window title bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="text-[11px] text-slate-400 ml-2 font-mono">
                  {p.name} Business Dashboard
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Connected
              </span>
            </div>

            {/* Dashboard Header: Business Overview & + Quick Sale */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h4 className="text-base font-bold text-white">Business Overview</h4>
                <span className="text-[11px] text-slate-400">Wednesday, 14 August</span>
              </div>
              <button 
                onClick={() => setSalesWave(prev => prev + 15000)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md cursor-pointer transition-transform active:scale-95 flex items-center gap-1"
                title="Click to simulate quick sale"
              >
                <Plus className="w-3 h-3" />
                <span>+ Quick Sale</span>
              </button>
            </div>

            {/* 3 Metric Cards Grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-[#11172e] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">TOTAL SALES</span>
                <span className="text-base sm:text-lg font-bold text-white block mt-1">
                  LKR {(salesWave / 1000).toFixed(0)}K
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#11172e] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">NET PROFIT</span>
                <span className="text-base sm:text-lg font-bold text-cyan-400 block mt-1">
                  LKR 82K
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#11172e] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">REPAIRS</span>
                <span className="text-base sm:text-lg font-bold text-amber-400 block mt-1">
                  18
                </span>
              </div>
            </div>

            {/* Sales Performance Wave Chart */}
            <div className="p-4 rounded-2xl bg-[#11172e]/80 border border-slate-800 mb-5">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Sales performance
              </span>
              <div className="relative h-20 w-full overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                  <path
                    d="M0,65 Q50,60 90,45 T180,35 T250,20 T300,10"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,65 Q50,60 90,45 T180,35 T250,20 T300,10 L300,80 L0,80 Z"
                    fill="url(#waveFill)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Recent Orders Mini Table */}
            <div className="p-3.5 rounded-2xl bg-[#11172e]/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2.5">
                Recent orders
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>1. iPhone 14 Case</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">Paid</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>2. Galaxy A53</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">Paid</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>3. Screen Repair</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded">In Progress</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tabs Row (Exact match to Image 2: Overview, Features, Screenshots, Demo Video, Reviews) */}
      <div className={`flex items-center gap-8 border-b pb-1 mb-12 text-sm font-semibold overflow-x-auto ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 relative cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'text-cyan-400'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{tab}</span>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Screenshots Tab View */}
      {activeTab === 'Screenshots' && (
        <div className="mb-12 animate-fadeIn">
          <div className={`p-5 sm:p-7 rounded-3xl border overflow-hidden ${
            isDark ? 'bg-[#0d1226]/90 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {p.name} Production Interface &amp; Live POS Preview
            </h4>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 max-h-[500px]">
              <img 
                src={p.image || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80'} 
                alt={`${p.name} screenshot`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Section below Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Headline & Descriptions */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <span className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-2 ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}>
            EVERYTHING IN ONE PLACE
          </span>
          <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Run your {p.subtitle?.toLowerCase().replace('erp', '') || 'business'} with confidence
          </h3>
          <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Engineered specifically to solve inventory shrinkages, job card disorganization, and manual accounting delays. Built with offline data sync for non-stop billing even when broadband drops.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {(p.features || [
              "Mobile IMEI tracking & barcode scanning",
              "Repair service job cards & technician commissions",
              "Accessory stock depletion & warranty serials",
              "Customer SMS alerts upon repair completion"
            ]).map((feat, i) => (
              <div key={i} className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDark ? 'bg-[#0d1226]/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Who is this for? Box (Exact match to Image 2) */}
        <div className="lg:col-span-4 w-full">
          <div className={`p-6 sm:p-7 rounded-3xl border transition-colors ${
            isDark ? 'bg-[#0c1024]/90 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
          }`}>
            <h4 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Who is this for?
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              {(p.audience || [
                "Mobile shop owners",
                "Mobile accessory stores",
                "Smartphone repair centers"
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-300">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800/80">
              <button
                onClick={() => onRequestCustomize(p)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
              >
                Customize for My Store
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
