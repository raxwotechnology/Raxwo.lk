import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Truck, 
  UtensilsCrossed, 
  Pill, 
  Factory, 
  Scissors, 
  Wrench, 
  Hotel, 
  Hammer, 
  Landmark, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Boxes,
  Check,
  Code2,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import { defaultProductImages } from '../data/productImages';

export default function ProductsSection({ 
  products = [], 
  currency = 'LKR', 
  currencyRates, 
  onSelectProduct,
  onOpenInquiry,
  theme = 'dark'
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isDark = theme === 'dark';

  const categories = [
    'All',
    'Retail & Supermarket',
    'Wholesale & Logistics',
    'Food & Beverage',
    'Healthcare & Pharmacy',
    'Manufacturing',
    'Textile & Garment',
    'Automotive',
    'Hospitality',
    'FinTech & Banking'
  ];

  // Helper to format currency
  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="relative w-full py-20 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <span className={`text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-3 ${
          isDark 
            ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
            : 'text-cyan-800 bg-cyan-100 border border-cyan-300'
        }`}>
          14+ PRODUCTION-READY ERP SYSTEMS
        </span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Explore Our Ready-Made Solutions
        </h2>
        <p className={`text-sm sm:text-base mt-3 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Each ERP package includes complete source code, lifetime license, deployment setup, and Sri Lankan business compliance (VAT, SSCL, Sinhala/Tamil UI support).
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mt-6">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`} />
          <input
            type="text"
            placeholder="Search ERP (e.g. Pharmacy, POS, Restaurant, Garment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none transition-colors shadow-inner ${
              isDark 
                ? 'bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:border-cyan-400' 
                : 'bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-500 shadow-sm'
            }`}
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none justify-start lg:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : isDark 
                  ? 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800' 
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
        {filteredProducts.map((erp) => {
          const imgUrl = erp.image || (defaultProductImages && defaultProductImages[erp.id]) || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";

          return (
            <div
              key={erp.id}
              className={`group relative rounded-3xl overflow-hidden flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                isDark 
                  ? 'bg-[#0b1022]/90 border border-slate-800/90 hover:border-slate-700/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]' 
                  : 'bg-white border border-slate-200/90 hover:border-blue-400 shadow-md hover:shadow-2xl'
              }`}
            >
              {/* 1. Top Image Banner */}
              <div className="relative w-full h-44 overflow-hidden bg-slate-950">
                <img 
                  src={imgUrl} 
                  alt={erp.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Floating Badges on Image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600/90 text-white border border-blue-400/40 backdrop-blur-md shadow-sm">
                    {erp.badge || 'Ready-Made'}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-200 border border-slate-700/80 backdrop-blur-md">
                    {erp.category}
                  </span>
                </div>

                {/* Bottom of Image: Name */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md group-hover:text-cyan-300 transition-colors">
                    {erp.name}
                  </h3>
                </div>
              </div>

              {/* 2. Middle Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {erp.tagline}
                  </p>

                  {/* Features List */}
                  <div className="mt-4 space-y-1.5">
                    {erp.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className={`flex items-start gap-2 text-xs font-medium ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5 font-bold" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className={`mt-4 pt-3 border-t flex flex-wrap gap-1.5 items-center ${
                    isDark ? 'border-slate-800/80' : 'border-slate-100'
                  }`}>
                    <Code2 className={`w-3 h-3 mr-1 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
                    {erp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                          isDark 
                            ? 'text-slate-300 bg-slate-900/90 border-slate-800' 
                            : 'text-slate-700 bg-slate-100 border-slate-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Bottom Row: Price & Actions */}
                <div className={`mt-5 pt-4 border-t flex flex-col gap-3 ${
                  isDark ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className={`text-[10px] block uppercase tracking-wider font-semibold ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        One-Time License
                      </span>
                      <span className={`text-xl font-extrabold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {formatPrice(erp.priceLKR)}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isDark 
                        ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40' 
                        : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    }`}>
                      Full Code Included
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => onSelectProduct(erp)}
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDark 
                          ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => onOpenInquiry(erp)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-all shadow-sm cursor-pointer"
                    >
                      Get Solution
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
