import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ChevronDown,
  ShoppingBag,
  CheckCircle2,
  X
} from 'lucide-react';

export default function OrderCheckoutPage({ 
  cartItem, 
  onBackToHome, 
  onBackToProducts, 
  onEditCustomization,
  onProceedToCheckout,
  currency = 'LKR', 
  onCurrencyChange, 
  currencyRates,
  theme = 'dark'
}) {
  const [quantity, setQuantity] = useState(1);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: 'Nimal Perera',
    phone: '077 123 4567',
    email: 'nimal@gmail.com',
    paymentMethod: 'Bank Transfer'
  });

  const isDark = theme === 'dark';

  const item = cartItem?.product || {
    id: "mobixa",
    name: "Mobixa",
    subtitle: "Professional Package",
    priceLKR: 120000
  };

  const unitPrice = cartItem?.estimatedTotal || item.priceLKR || 120000;
  const totalPrice = unitPrice * quantity;

  // Format Price
  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutSuccess(true);
  };

  return (
    <div className="w-full pt-6 pb-24 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Breadcrumb Navigation (Exact match to Image 5) */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button 
          onClick={onBackToHome}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <span className={isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'}>
          Your Order
        </span>
      </nav>

      {/* Heading section (Exact match to Image 5) */}
      <div className="max-w-4xl mb-10 text-left">
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Your Order
        </h1>
        <p className={`text-sm sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Review your choices before checkout.
        </p>
      </div>

      {isRemoved ? (
        <div className={`p-12 rounded-3xl border text-center max-w-xl mx-auto ${
          isDark ? 'bg-[#0b1022] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Your cart is empty</h3>
          <p className="text-xs text-slate-400 mt-1 mb-6">You have removed your package from the order list.</p>
          <button
            onClick={onBackToProducts}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs cursor-pointer shadow-md"
          >
            Explore Products
          </button>
        </div>
      ) : (
        /* Main 2-Column Grid: Left Item Card + Right Order Summary */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Order Item Card (Exact match to Image 5) */}
          <div className="lg:col-span-8 w-full">
            <div className={`rounded-3xl p-6 sm:p-8 border transition-all ${
              isDark 
                ? 'bg-[#0a0f22]/90 border-slate-800/80 shadow-2xl' 
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              {/* Item Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800/60">
                <div className="flex items-start gap-4">
                  {/* Mobixa App Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-900 border border-blue-500/40 flex items-center justify-center p-3 shrink-0 shadow-md">
                    <svg className="w-full h-full text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="3" />
                      <path d="M12 18h.01" />
                      <path d="M9 6h6" />
                      <path d="M8 12l2 2 4-4" stroke="#38bdf8" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.name}
                    </h3>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {item.subtitle || 'Professional Package'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-2">
                      <Check className="w-3.5 h-3.5" />
                      <span>Customized for your business</span>
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-left sm:text-right">
                  <span className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {formatPrice(unitPrice)}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Quantity Stepper, Edit Customization, Remove (Exact match to Image 5) */}
              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                
                {/* Quantity Stepper */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">Quantity</span>
                  <div className={`flex items-center rounded-xl border p-1 ${
                    isDark ? 'bg-[#11172e] border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className={`w-8 text-center text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Edit & Remove Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEditCustomization(item)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-colors ${
                      isDark 
                        ? 'bg-transparent text-cyan-400 border-cyan-800/50 hover:bg-cyan-950/40' 
                        : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Customization</span>
                  </button>

                  <button
                    onClick={() => setIsRemoved(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Order Summary Card (Exact match to Image 5) */}
          <div className="lg:col-span-4 w-full">
            <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-xl transition-all ${
              isDark 
                ? 'bg-[#0a0f22]/95 border-slate-800/80 shadow-2xl' 
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              <h4 className={`text-base font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Order Summary
              </h4>

              {/* Rows */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Customization</span>
                  <span className="text-emerald-400 font-semibold">
                    Included
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-400">Total</span>
                  <span className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400">Currency</span>
                  <select
                    value={currency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    className={`text-xs rounded-xl px-2.5 py-1.5 border ${
                      isDark ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-100 text-slate-900 border-slate-300'
                    }`}
                  >
                    <option value="LKR">LKR (Rs)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    if (onProceedToCheckout) {
                      onProceedToCheckout();
                    } else {
                      setIsCheckoutModalOpen(true);
                    }
                  }}
                  className="w-full py-3.5 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Proceed to Checkout</span>
                </button>

                <button
                  onClick={onBackToProducts}
                  className="w-full text-center text-xs text-slate-400 hover:text-white cursor-pointer transition-colors block py-1"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Bottom Security Banner (Exact match to Image 5) */}
              <div className={`mt-8 pt-5 border-t border-slate-800/80 flex items-center gap-3`}>
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-left">
                  <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Safe and secure
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    Your information is protected.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Interactive Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`relative w-full max-w-md rounded-3xl border p-6 sm:p-7 text-left shadow-2xl ${
            isDark ? 'bg-[#0b1022] border-slate-700' : 'bg-white border-slate-300'
          }`}>
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutSuccess ? (
              <div className="py-6 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 animate-bounce" />
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Order Confirmed!
                </h3>
                <p className="text-xs text-slate-300 max-w-sm">
                  Thank you, <strong>{checkoutData.name}</strong>! Your order for <strong>{item.name}</strong> ({formatPrice(totalPrice)}) has been placed. An engineer will deliver the Git source repository link and coordinate deployment setup via WhatsApp ({checkoutData.phone}).
                </p>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    onBackToHome();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-md"
                >
                  Return to Home
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Complete Checkout
                  </h3>
                  <p className="text-xs text-slate-400">
                    {item.name} ({formatPrice(totalPrice)})
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#11172e] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={checkoutData.phone}
                    onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#11172e] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Payment Method</label>
                  <select
                    value={checkoutData.paymentMethod}
                    onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border ${
                      isDark ? 'bg-[#11172e] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Bank Transfer">Commercial Bank / HNB Bank Transfer</option>
                    <option value="Visa / Master Card">Online Card Payment (Visa / Master)</option>
                    <option value="Pay on Delivery">Cash / Cheque on Software Handover</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md cursor-pointer mt-2"
                >
                  Confirm Order & Receive Source Code
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
