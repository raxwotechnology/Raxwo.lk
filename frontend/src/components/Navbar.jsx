import React, { useState } from 'react';
import { 
  Globe, ChevronDown, Menu, X, Sun, Moon, 
  User, ShieldCheck, LogOut, Package, Sparkles, Layers 
} from 'lucide-react';
import { getTranslation } from '../i18n/translations';

export default function Navbar({ 
  currentCurrency, 
  onCurrencyChange, 
  currentLang, 
  onLangChange,
  onOpenInquiry,
  theme = 'dark',
  onToggleTheme,
  currentRoute = 'home',
  onRouteChange,
  currentUser,
  onOpenAuthModal,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const isDark = theme === 'dark';
  const isAdmin = currentUser && (currentUser.role === 'super_admin' || currentUser.role === 'sales_admin');
  const t = (k) => getTranslation(currentLang, k);

  const navLinks = [
    { label: t('home'), route: 'home' },
    { label: t('products'), route: 'products' },
    { label: t('pricing'), route: 'pricing' },
    ...(isAdmin ? [{ label: t('adminPortal'), route: 'admin', isSpecial: true }] : []),
    { label: t('support'), route: 'support' },
    { label: t('about'), route: 'about' },
    { label: t('contact'), route: 'contact' }
  ];

  const currencies = [
    { code: 'LKR', label: 'LKR (Rs)', symbol: 'LKR' },
    { code: 'USD', label: 'USD ($)', symbol: '$' },
    { code: 'EUR', label: 'EUR (€)', symbol: '€' },
    { code: 'GBP', label: 'GBP (£)', symbol: '£' },
    { code: 'INR', label: 'INR (₹)', symbol: '₹' }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'si', label: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  const handleLinkClick = (link) => {
    if (onRouteChange) {
      onRouteChange(link.route);
    }
    if (link.hash && link.route === 'home') {
      setTimeout(() => {
        const el = document.querySelector(link.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full pt-3 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#0c0827]">
      <nav className="w-full flex items-center justify-between py-2">
        
        {/* Brand Logo */}
        <button 
          onClick={() => onRouteChange && onRouteChange('home')}
          className="flex items-center group focus:outline-none cursor-pointer transition-all duration-200"
        >
          <img 
            src="/raxwo-logo.png" 
            alt="RAXWO - NEXT LEVEL TECH" 
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
          />
        </button>

        {/* Center Pill Nav Bar */}
        <div className={`hidden lg:flex items-center backdrop-blur-md rounded-full px-2.5 py-1.5 transition-colors ${
          isDark 
            ? 'bg-[#0d1226]/80 border border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
            : 'bg-white/90 border border-slate-200/90 shadow-sm'
        }`}>
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route && (!link.hash || link.label === 'Home');
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
                  link.isSpecial 
                    ? isDark
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 font-semibold'
                      : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 font-semibold'
                    : isActive 
                      ? isDark
                        ? 'bg-slate-800/90 text-white shadow-sm'
                        : 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 font-semibold'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.isSpecial && <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Theme Toggle (Dark / Light Mode) */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 border ${
              isDark 
                ? 'bg-slate-900/90 text-amber-300 hover:bg-slate-800 border-slate-700/80 shadow-sm' 
                : 'bg-white text-slate-800 hover:bg-slate-100 border-slate-300 shadow-sm'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('light')}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t('dark')}</span>
              </>
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdown(!langDropdown);
                setCurrencyDropdown(false);
                setUserDropdown(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-white hover:text-white hover:bg-white/10 border border-slate-200'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-200'}`} />
              <span>{languages.find(l => l.code === currentLang)?.label || 'English'}</span>
            </button>
            {langDropdown && (
              <div className={`absolute right-0 mt-2 w-32 rounded-xl shadow-2xl py-1 z-50 ${
                isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
              }`}>
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLangChange(l.code);
                      setLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                      currentLang === l.code 
                        ? 'bg-indigo-600/20 text-cyan-500 font-semibold' 
                        : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyDropdown(!currencyDropdown);
                setLangDropdown(false);
                setUserDropdown(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-white hover:text-white hover:bg-white/10 border border-slate-200'
              }`}
            >
              <span>{currentCurrency}</span>
              <ChevronDown className={`w-3 h-3 ${isDark ? 'text-slate-400' : 'text-slate-200'}`} />
            </button>
            {currencyDropdown && (
              <div className={`absolute right-0 mt-2 w-36 rounded-xl shadow-2xl py-1 z-50 ${
                isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-200'
              }`}>
                {currencies.map(c => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCurrencyChange(c.code);
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      currentCurrency === c.code 
                        ? 'bg-indigo-600/20 text-cyan-500 font-semibold' 
                        : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-slate-400 text-[10px]">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-white hover:border-blue-500' 
                    : 'bg-white border-slate-200 text-slate-900 hover:border-blue-500'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[90px] truncate">{currentUser.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase bg-blue-600/20 text-blue-400">
                  {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'sales_admin' ? 'Sales' : 'Buyer'}
                </span>
              </button>

              {userDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl p-2 z-50 border ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <div className="px-3 py-2 border-b border-slate-800/60 mb-1">
                    <span className="text-xs font-bold block">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-400 block">{currentUser.email}</span>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        if (onRouteChange) onRouteChange('admin');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-blue-600/20 text-blue-300 transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span>Admin Backoffice</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      if (onRouteChange) onRouteChange('my-orders');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-blue-400" />
                    <span>{t('myOrders')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('signOut')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                if (onRouteChange) onRouteChange('signin');
                else onOpenAuthModal();
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all cursor-pointer shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-indigo-600'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg cursor-pointer ${
              isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden mt-3 p-4 rounded-2xl backdrop-blur-xl shadow-2xl flex flex-col gap-3 ${
          isDark ? 'bg-slate-900/95 border border-slate-800' : 'bg-white/95 border border-slate-200'
        }`}>
          <div className="flex flex-col gap-1 pb-3 border-b border-slate-800/20">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className={`text-left px-3 py-2 text-sm rounded-lg cursor-pointer flex items-center justify-between ${
                  currentRoute === link.route
                    ? isDark ? 'bg-slate-800 text-white font-semibold' : 'bg-slate-100 text-slate-900 font-semibold'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.isSpecial && <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-bold">STAFF</span>}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-300">Signed in as <strong>{currentUser.name}</strong></span>
                <button
                  onClick={onLogout}
                  className="text-xs text-red-400 hover:underline"
                >
                  {t('signOut')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onRouteChange) onRouteChange('signin');
                  else onOpenAuthModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white text-center cursor-pointer shadow-md"
              >
                {t('signIn')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
