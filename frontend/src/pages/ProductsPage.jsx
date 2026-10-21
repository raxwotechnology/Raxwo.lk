import React, { useState } from 'react';
import { 
  Search, Play, ArrowRight, Sparkles, Layers, Check, Zap, X, 
  Filter, Code2, Plus, Image as ImageIcon, Edit3, ExternalLink 
} from 'lucide-react';
import { getTranslation } from '../i18n/translations';

// High-definition curated images for ERP solutions
const defaultProductImages = {
  mobixa: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
  gymora: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  exxplan: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
  dineflow: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  pharmacare: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
  buildtrack: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  eduportal: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  swiftlogix: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  'manufacturing-erp': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  'garment-apparel': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  'auto-spare-parts': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
  'hotel-resort-pms': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'hardware-construction': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  'microfinance-leasing': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  'salon-spa-erp': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  'school-institute': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  'realestate-rental': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  'warehouse-3pl': 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80'
};

const curatedPresets = [
  { label: 'Retail & POS', url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80' },
  { label: 'Restaurant & Dining', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
  { label: 'Supermarket Counter', url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pharmacy & Medical', url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80' },
  { label: 'Gym & Fitness', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
  { label: 'Logistics & Warehouse', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hardware Tools', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
  { label: 'Hotel & Resort', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' },
  { label: 'Academy & School', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Manufacturing & Plant', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' }
];

export default function ProductsPage({ 
  products = [], 
  currency = 'LKR', 
  currencyRates, 
  onSelectProduct,
  onOpenSandbox,
  onOpenCompare,
  theme = 'dark',
  lang = 'en'
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTech, setActiveTech] = useState('All');
  const [activePriceTier, setActivePriceTier] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState([]);
  
  // Custom Product List state (supports adding/editing images)
  const [productList, setProductList] = useState(products);
  const [imageModalProduct, setImageModalProduct] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isSavingImage, setIsSavingImage] = useState(false);

  // Sync with prop when products update
  React.useEffect(() => {
    if (products && products.length > 0) {
      setProductList(products);
    }
  }, [products]);

  const isDark = theme === 'dark';
  const t = (k) => getTranslation(lang, k);

  const categories = [
    'All',
    'Retail',
    'Hospitality',
    'Education',
    'Healthcare',
    'Construction',
    'Transport',
    'Business Services'
  ];

  const techStacks = [
    'All',
    'React',
    'Node.js',
    'Electron',
    'PostgreSQL',
    'Vue.js',
    'MySQL',
    'SQLite'
  ];

  const priceTiers = [
    { label: 'All Prices', value: 'All' },
    { label: '< LKR 70,000', value: 'under70' },
    { label: 'LKR 70K – 90K', value: '70to90' },
    { label: '> LKR 90,000', value: 'above90' }
  ];

  // Format price
  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  // Toggle comparison item
  const toggleCompare = (product) => {
    if (compareList.some(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 ERP systems at a time.');
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  // Handle image update for product
  const handleOpenImageModal = (product, e) => {
    if (e) e.stopPropagation();
    setImageModalProduct(product);
    setCustomImageUrl(product.image || defaultProductImages[product.id] || '');
  };

  const handleSaveProductImage = async () => {
    if (!imageModalProduct) return;
    setIsSavingImage(true);
    const updatedImg = customImageUrl.trim();

    try {
      // Send update to backend API
      await fetch(`/api/products/${imageModalProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: updatedImg })
      });
    } catch (e) {
      console.warn('API update failed, updating locally:', e);
    }

    // Update local product list
    setProductList(prev => prev.map(p => 
      p.id === imageModalProduct.id ? { ...p, image: updatedImg } : p
    ));

    setIsSavingImage(false);
    setImageModalProduct(null);
  };

  const filteredProducts = productList.filter(p => {
    // Category match
    const matchesCat = activeCategory === 'All' || 
      p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (p.badge && p.badge.toLowerCase().includes(activeCategory.toLowerCase()));
    
    // Tech Stack match
    const matchesTech = activeTech === 'All' ||
      (p.techStack && p.techStack.some(t => t.toLowerCase() === activeTech.toLowerCase()));

    // Price Tier match
    let matchesPrice = true;
    if (activePriceTier === 'under70') matchesPrice = p.priceLKR < 70000;
    else if (activePriceTier === '70to90') matchesPrice = p.priceLKR >= 70000 && p.priceLKR <= 90000;
    else if (activePriceTier === 'above90') matchesPrice = p.priceLKR > 90000;

    // Search query match
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesTech && matchesPrice && matchesSearch;
  });

  // App Icons generator
  const renderProductIcon = (product) => {
    if (product.id === 'mobixa') {
      return (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 shadow-md border ${
          isDark 
            ? 'bg-gradient-to-br from-blue-700 to-indigo-900 border-blue-500/40 text-cyan-400' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-400/40'
        }`}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <path d="M12 18h.01" />
            <path d="M9 6h6" />
            <path d="M8 12l2 2 4-4" stroke="#38bdf8" strokeWidth="2.5" />
          </svg>
        </div>
      );
    }
    if (product.id === 'gymora') {
      return (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 shadow-md border ${
          isDark 
            ? 'bg-gradient-to-br from-amber-600 to-orange-900 border-amber-500/40 text-amber-400' 
            : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-400/40'
        }`}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
          </svg>
        </div>
      );
    }
    if (product.id === 'exxplan') {
      return (
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 shadow-md border ${
          isDark 
            ? 'bg-gradient-to-br from-blue-700 to-blue-950 border-blue-400/40 text-cyan-400' 
            : 'bg-gradient-to-br from-indigo-600 to-cyan-600 text-white border-indigo-400/40'
        }`}>
          <span className="text-xl font-black tracking-tighter">E</span>
        </div>
      );
    }
    return (
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 shadow-md border ${
        isDark 
          ? `bg-gradient-to-br ${product.iconColor || 'from-indigo-600 to-slate-900'} border-indigo-500/40 text-white`
          : `bg-gradient-to-br ${product.iconColor ? product.iconColor.replace('to-slate-900', 'to-indigo-700') : 'from-blue-600 to-indigo-600'} text-white border-blue-300/40`
      }`}>
        <span className="text-base font-black uppercase">{product.name.substring(0, 2)}</span>
      </div>
    );
  };

  const categoryLabels = {
    'All': lang === 'si' ? 'සියල්ල' : lang === 'ta' ? 'அனைத்தும்' : 'All',
    'Retail': lang === 'si' ? 'සිල්ලර' : lang === 'ta' ? 'சில்ලறை' : 'Retail',
    'Hospitality': lang === 'si' ? 'හෝටල්' : lang === 'ta' ? 'விருந்தோம்பல்' : 'Hospitality',
    'Education': lang === 'si' ? 'අධ්‍යාපන' : lang === 'ta' ? 'கல்வி' : 'Education',
    'Healthcare': lang === 'si' ? 'සෞඛ්‍ය' : lang === 'ta' ? 'சுகாதாரம்' : 'Healthcare',
    'Construction': lang === 'si' ? 'ඉදිකිරීම්' : lang === 'ta' ? 'கட்டுமானம்' : 'Construction',
    'Transport': lang === 'si' ? 'ප්‍රවාහන' : lang === 'ta' ? 'போக்குவரத்து' : 'Transport',
    'Business Services': lang === 'si' ? 'ව්‍යාපාරික සේවා' : lang === 'ta' ? 'வணிக சேவைகள்' : 'Business Services'
  };

  return (
    <div className={`w-full pb-32 relative transition-colors duration-300 ${
      isDark ? 'text-white' : 'text-slate-900'
    }`}>
      
      {/* Top Header Banner — Identical #0c0827 match to Home Page Header */}
      <section 
        className="w-full pt-10 pb-16 md:pt-14 md:pb-22 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#0c0827] text-white text-center overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), 50% 100%, 0 calc(100% - 24px))'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 inline-block text-cyan-400">
            {lang === 'si' ? 'RAXWO ව්‍යවසාය ERP නාමාවලිය' : lang === 'ta' ? 'RAXWO நிறுவன ERP பட்டியல்' : 'RAXWO ENTERPRISE ERP CATALOG'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.25] mb-3 text-white">
            {lang === 'si' ? 'අපගේ සූදානම් කළ ERP පද්ධති' : lang === 'ta' ? 'எங்கள் ஆயத்த ERP அமைப்புகள்' : 'Our Ready-Made ERP Systems'}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-slate-200/90">
            {lang === 'si' ? '100% මූල කේතයේ පූර්ණ අයිතිය සහ මාසික ගාස්තු රහිත සම්පූර්ණ ව්‍යාපාරික මෘදුකාංග විසඳුම්.' : lang === 'ta' ? '100% முழு மூலக் குறியீடு உரிமை மற்றும் மாதாந்திர கட்டணங்கள் இல்லாத முழுமையான வணிக தீர்வுகள்.' : 'Complete business management solutions with 100% full source code ownership & zero subscription fees.'}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'si' ? 'නිෂ්පාදන හෝ අංග අනුව සොයන්න...' : lang === 'ta' ? 'பெயர் அல்லது அம்சங்கள் மூலம் தேடுங்கள்...' : 'Search systems by name, features, or industry...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-28 py-3.5 rounded-2xl text-sm focus:outline-none transition-all bg-[#0e1428] border border-slate-700/80 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-24 top-1/2 -translate-y-1/2 p-1 rounded-full cursor-pointer transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-800 text-cyan-300 border border-slate-700">
              {filteredProducts.length} {lang === 'si' ? 'ප්‍රතිඵල' : lang === 'ta' ? 'முடிவுகள்' : 'results'}
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <div className="w-full pt-8 px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Multi-Faceted Filters (Category, Tech Stack, Price Tier) */}
        <div className="space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-600 scale-[1.02]'
                    : isDark 
                      ? 'bg-[#11172e] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80' 
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Tech Stack & Price Tiers */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
            
            {/* Tech Stack Dropdown */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm hover:border-slate-300'
            }`}>
              <Code2 className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Tech:</span>
              <select
                value={activeTech}
                onChange={e => setActiveTech(e.target.value)}
                className={`bg-transparent focus:outline-none cursor-pointer font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {techStacks.map(t => (
                  <option key={t} value={t} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>{t}</option>
                ))}
              </select>
            </div>

            {/* Price Tier Dropdown */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
              isDark
                ? 'bg-slate-900/90 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700 shadow-sm hover:border-slate-300'
            }`}>
              <Filter className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Price:</span>
              <select
                value={activePriceTier}
                onChange={e => setActivePriceTier(e.target.value)}
                className={`bg-transparent focus:outline-none cursor-pointer font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {priceTiers.map(pt => (
                  <option key={pt.value} value={pt.value} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>{pt.label}</option>
                ))}
              </select>
            </div>

            {(activeCategory !== 'All' || activeTech !== 'All' || activePriceTier !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveTech('All');
                  setActivePriceTier('All');
                  setSearchQuery('');
                }}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  isDark 
                    ? 'text-cyan-300 border-cyan-500/40 hover:bg-cyan-950/40 bg-slate-900' 
                    : 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100'
                }`}
              >
                Reset filters
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Products Grid with Beautiful Product Images & Crisp Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
        {filteredProducts.map((product) => {
          const isComparing = compareList.some(p => p.id === product.id);
          const productImage = product.image || defaultProductImages[product.id] || defaultProductImages.mobixa;

          return (
            <div
              key={product.id}
              className={`rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border relative group overflow-hidden ${
                isDark 
                  ? 'bg-[#0d1228]/90 border-slate-800 hover:border-blue-500/60 shadow-xl shadow-black/40 hover:shadow-cyan-500/10' 
                  : 'bg-white border-slate-200 shadow-md hover:shadow-2xl hover:border-blue-300'
              }`}
            >
              <div>
                
                {/* 1. Beautiful Product Preview Image Banner with Overlays */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-950">
                  <img 
                    src={productImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Subtle Dark Gradient Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-black/40"></div>

                  {/* Top-Left: App Icon */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    {renderProductIcon(product)}
                  </div>

                  {/* Top-Right: Category Badge & Compare button */}
                  <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
                    
                    {/* Change / Add Image Button */}
                    <button
                      onClick={(e) => handleOpenImageModal(product, e)}
                      title="Change or upload image for this ERP"
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                    </button>

                    {/* Compare Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
                      title="Add to 3-way comparison matrix"
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-all cursor-pointer backdrop-blur-md ${
                        isComparing
                          ? 'bg-cyan-500/90 text-white border-cyan-400'
                          : 'bg-black/60 text-white border-white/20 hover:bg-black/90'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                    </button>

                    {/* Category Pill */}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg bg-blue-600/90 text-white border border-blue-400/40 backdrop-blur-md shadow-sm">
                      {product.badge || product.category}
                    </span>
                  </div>

                  {/* Bottom of Image: Name & Subtitle overlay */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md">
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-300 drop-shadow-sm truncate">
                      {product.subtitle || `${product.category} ERP System`}
                    </p>
                  </div>
                </div>

                {/* 2. Card Content & Details */}
                <div className="p-6 pt-5">
                  {/* Tagline / Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {product.tagline}
                  </p>

                  {/* Key Features Bullet List Preview */}
                  {product.features && product.features.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      {product.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className={`flex items-start gap-2 text-xs font-medium ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}>
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isDark ? 'text-cyan-400 font-bold' : 'text-blue-600 font-bold'
                          }`} />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {product.techStack && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {product.techStack.map(t => (
                        <span key={t} className={`text-[10px] font-medium px-2.5 py-0.5 rounded-md border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* 3. Bottom Row: Price & Action Buttons */}
              <div className={`px-6 pb-6 pt-4 border-t flex items-center justify-between gap-3 ${
                isDark ? 'border-slate-800/80 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'
              }`}>
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider block ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Full Source Code
                  </span>
                  <span className={`text-base sm:text-lg font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {formatPrice(product.priceLKR)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Live Sandbox Button */}
                  <button
                    onClick={() => onOpenSandbox && onOpenSandbox(product)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isDark
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/80'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:shadow-xs'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('liveDemo')}</span>
                  </button>

                  {/* View Details Button */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <span>{t('viewDetails')}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating 3-Way Comparison Tray (US1.2) */}
      {compareList.length > 0 && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl p-3 sm:p-4 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center justify-between gap-3 animate-fadeIn ${
          isDark
            ? 'bg-[#090d19]/95 border-cyan-500/40 shadow-cyan-500/20 text-white'
            : 'bg-white/95 border-slate-200/90 shadow-slate-900/15 text-slate-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {compareList.map(p => (
                <div key={p.id} className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {p.name.substring(0, 1)}
                </div>
              ))}
            </div>
            <div>
              <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {compareList.length} of 3 ERP systems selected
              </span>
              <span className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                {compareList.map(p => p.name).join(', ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCompareList([])}
              className={`text-xs font-semibold p-1.5 cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Clear
            </button>
            <button
              onClick={() => onOpenCompare && onOpenCompare(compareList)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare Matrix</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          ADD / EDIT PRODUCT IMAGE MODAL
         ======================================================== */}
      {imageModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-lg p-6 sm:p-7 rounded-3xl border shadow-2xl transition-colors ${
            isDark ? 'bg-[#0e1329] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Change Product Image</h3>
                  <p className="text-xs text-slate-400">{imageModalProduct.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setImageModalProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Preview */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
                Live Preview
              </label>
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                {customImageUrl ? (
                  <img 
                    src={customImageUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = defaultProductImages.mobixa; }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                    <ImageIcon className="w-8 h-8 mb-1" />
                    <span>Paste an image URL or choose preset below</span>
                  </div>
                )}
                <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  {imageModalProduct.name} Preview
                </div>
              </div>
            </div>

            {/* Input URL */}
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">
                Custom Image URL:
              </label>
              <input
                type="text"
                value={customImageUrl}
                onChange={e => setCustomImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${
                  isDark 
                    ? 'bg-slate-900 border border-slate-700 text-white focus:border-cyan-400' 
                    : 'bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Curated Presets */}
            <div className="mb-5">
              <label className="block text-xs font-semibold mb-2">
                Or pick from curated ERP presets:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                {curatedPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomImageUrl(preset.url)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-left truncate transition-colors cursor-pointer border ${
                      customImageUrl === preset.url
                        ? 'bg-blue-600 text-white border-blue-500 font-bold'
                        : isDark
                          ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => setImageModalProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProductImage}
                disabled={isSavingImage}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/30 cursor-pointer transition-all"
              >
                {isSavingImage ? 'Saving...' : 'Apply Image'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
