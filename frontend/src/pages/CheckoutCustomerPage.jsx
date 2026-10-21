import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function CheckoutCustomerPage({ 
  cartItem, 
  onBackToOrder, 
  onContinueToPayment, 
  currency = 'LKR', 
  currencyRates,
  theme = 'dark'
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+94 77 123 4567',
    businessName: 'Nimal Mobile Center',
    businessType: 'Mobile shop',
    country: 'Sri Lanka',
    address: 'No 45, Galle Road, Colombo 03'
  });

  const isDark = theme === 'dark';

  const item = cartItem?.product || {
    id: "mobixa",
    name: "Mobixa",
    subtitle: "Professional Package",
    priceLKR: 120000
  };

  const totalPrice = cartItem?.estimatedTotal || item.priceLKR || 120000;

  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinueToPayment(formData);
  };

  return (
    <div className="w-full pt-6 pb-24 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Breadcrumb Navigation (Exact match to Image 1) */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button 
          onClick={onBackToOrder}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          Your Order
        </button>
        <span>/</span>
        <span className={isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'}>
          Checkout
        </span>
      </nav>

      {/* Heading section */}
      <div className="max-w-4xl mb-10 text-left">
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Customer Details
        </h1>
        <p className={`text-sm sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Tell us where to send your order updates.
        </p>
      </div>

      {/* Stepper Progress Bar: 1 Customer Details -> 2 Payment -> 3 Review */}
      <div className="flex items-center gap-4 sm:gap-8 mb-12 overflow-x-auto pb-2">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-blue-500/20">
            1
          </div>
          <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Customer Details
          </span>
          <div className="w-12 sm:w-20 h-[1px] bg-slate-800 hidden sm:block"></div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
          }`}>
            2
          </div>
          <span className="text-xs font-semibold text-slate-400">Payment</span>
          <div className="w-12 sm:w-20 h-[1px] bg-slate-800 hidden sm:block"></div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
          }`}>
            3
          </div>
          <span className="text-xs font-semibold text-slate-400">Review</span>
        </div>
      </div>

      {/* Main Grid: Left Contact Form + Right Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Box (Exact match to Image 1) */}
        <div className="lg:col-span-8 w-full">
          <div className={`rounded-3xl p-7 sm:p-9 border transition-all ${
            isDark 
              ? 'bg-[#0a0f22]/90 border-slate-800/80 shadow-2xl' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Header with Step 1 Badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Your contact information
                </h3>
                <p className="text-xs text-slate-400">
                  We only use this information to prepare and deliver your software.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Business Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your business name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Business Type
                  </label>
                  <input
                    type="text"
                    placeholder="Example: Mobile shop"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Address
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter your business address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                      : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                  }`}
                ></textarea>
              </div>

              {/* Bottom Actions (Exact match to Image 1) */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={onBackToOrder}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Order</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* Right Sticky Order Summary (Exact match to Image 1) */}
        <div className="lg:col-span-4 w-full">
          <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-xl transition-all ${
            isDark 
              ? 'bg-[#0a0f22]/95 border-slate-800/80 shadow-2xl' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <h4 className={`text-base font-bold mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Order Summary
            </h4>

            {/* Product item mini row */}
            <div className="flex items-center gap-3.5 pb-5 border-b border-slate-800/60 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-900 border border-blue-500/40 flex items-center justify-center p-2.5 shadow-md">
                <svg className="w-full h-full text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <path d="M12 18h.01" />
                  <path d="M9 6h6" />
                  <path d="M8 12l2 2 4-4" stroke="#38bdf8" strokeWidth="2.5" />
                </svg>
              </div>
              <div>
                <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.name}
                </h5>
                <span className="text-xs text-slate-400">
                  {item.subtitle || 'Professional Package'}
                </span>
              </div>
            </div>

            {/* Financial Rows */}
            <div className="space-y-3 text-xs mb-6">
              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Customization</span>
                <span className="text-emerald-400 font-semibold">Included</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Total</span>
                <span className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Safe & Secure Badge */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className={`text-xs font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Safe and secure
                </span>
                <span className="text-[10px] text-slate-400">
                  Your information is protected.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
