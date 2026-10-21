import React, { useState } from 'react';
import { ArrowLeft, Landmark, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

export default function CheckoutPaymentPage({
  cartItem,
  customerData,
  onBack,
  onPlaceOrder,
  currency = 'LKR',
  currencyRates,
  theme = 'dark'
}) {
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

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

  const handleOrderSubmit = () => {
    if (!agreedToTerms) {
      setShowTermsError(true);
      return;
    }
    onPlaceOrder({
      paymentMethod: selectedMethod,
      agreedToTerms: true
    });
  };

  return (
    <div className="w-full pt-6 pb-24 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button 
          onClick={onBack}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          Checkout
        </button>
        <span>/</span>
        <span className={isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'}>
          Payment
        </span>
      </nav>

      {/* Heading section */}
      <div className="max-w-4xl mb-10 text-left">
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Payment Method
        </h1>
        <p className={`text-sm sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Choose the payment method that is easiest for you.
        </p>
      </div>

      {/* Stepper Progress Bar: 1 Customer Details -> 2 Payment -> 3 Review */}
      <div className="flex items-center gap-4 sm:gap-8 mb-12 overflow-x-auto pb-2">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            1
          </div>
          <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Customer Details
          </span>
          <div className="w-12 sm:w-20 h-[2px] bg-blue-600 hidden sm:block"></div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-blue-500/20">
            2
          </div>
          <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Payment
          </span>
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

      {/* Main Grid: Left Payment Selection + Right Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Payment Options Card */}
        <div className="lg:col-span-8 w-full">
          <div className={`rounded-3xl p-7 sm:p-9 border transition-all ${
            isDark 
              ? 'bg-[#0a0f22]/90 border-slate-800/80 shadow-2xl' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              How would you like to pay?
            </h3>

            {/* Payment Method Cards */}
            <div className="space-y-4 mb-8">
              
              {/* Option 1: Bank Transfer */}
              <div 
                onClick={() => setSelectedMethod('bank')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  selectedMethod === 'bank'
                    ? isDark 
                      ? 'bg-blue-950/30 border-blue-500/80 ring-1 ring-blue-500/50' 
                      : 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-400'
                    : isDark
                      ? 'bg-[#11172e]/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selectedMethod === 'bank' 
                    ? 'border-blue-500 bg-blue-600' 
                    : 'border-slate-500 bg-transparent'
                }`}>
                  {selectedMethod === 'bank' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Bank Transfer
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pay directly through your bank.
                  </p>
                </div>
              </div>

              {/* Option 2: Card Payment */}
              <div 
                onClick={() => setSelectedMethod('card')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  selectedMethod === 'card'
                    ? isDark 
                      ? 'bg-blue-950/30 border-blue-500/80 ring-1 ring-blue-500/50' 
                      : 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-400'
                    : isDark
                      ? 'bg-[#11172e]/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selectedMethod === 'card' 
                    ? 'border-blue-500 bg-blue-600' 
                    : 'border-slate-500 bg-transparent'
                }`}>
                  {selectedMethod === 'card' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>

                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Card Payment
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Visa and Mastercard accepted.
                  </p>
                </div>
              </div>

              {/* Option 3: Other Local Payment Methods */}
              <div 
                onClick={() => setSelectedMethod('local')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  selectedMethod === 'local'
                    ? isDark 
                      ? 'bg-blue-950/30 border-blue-500/80 ring-1 ring-blue-500/50' 
                      : 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-400'
                    : isDark
                      ? 'bg-[#11172e]/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selectedMethod === 'local' 
                    ? 'border-blue-500 bg-blue-600' 
                    : 'border-slate-500 bg-transparent'
                }`}>
                  {selectedMethod === 'local' && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>

                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Other Local Payment Methods
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose a supported local option.
                  </p>
                </div>
              </div>

            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (e.target.checked) setShowTermsError(false);
                  }}
                  className="mt-1 w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500"
                />
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  I agree to the <span className="text-blue-400 underline hover:text-blue-300">Terms & Conditions</span> and confirm my order details.
                </span>
              </label>

              {(!agreedToTerms || showTermsError) && (
                <p className="text-amber-400 text-xs mt-2 pl-7 font-medium">
                  Please tick the box before placing your order.
                </p>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800/60">
              <button
                type="button"
                onClick={onBack}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#11172e]/60 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleOrderSubmit}
                className="flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Place Order</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Sticky Order Summary */}
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
