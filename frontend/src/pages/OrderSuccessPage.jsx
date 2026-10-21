import React from 'react';
import { Check, Package, MessageCircle, Mail } from 'lucide-react';

export default function OrderSuccessPage({
  orderData,
  onViewMyOrders,
  onWhatsAppChat,
  currency = 'LKR',
  currencyRates,
  theme = 'dark'
}) {
  const isDark = theme === 'dark';

  const orderId = orderData?.orderId || '#RX-2025-1048';
  const product = orderData?.product?.name || 'Mobixa';
  const packageType = orderData?.product?.subtitle || 'Professional';
  const paymentMethod = orderData?.paymentMethod === 'card' 
    ? 'Card Payment' 
    : orderData?.paymentMethod === 'local' 
      ? 'Local Payment' 
      : 'Bank Transfer';

  const totalAmount = orderData?.total || 120000;
  const orderDate = orderData?.date || '14 August 2025';

  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  return (
    <div className="w-full pt-10 pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col items-center">
      
      {/* Success Icon & Glow */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_40px_rgba(52,211,153,0.5)]">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
      </div>

      {/* Badge */}
      <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase mb-3">
        ORDER RECEIVED
      </span>

      {/* Heading & Subtitle */}
      <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 text-center ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}>
        Thank You!
      </h1>
      <p className={`text-sm sm:text-base text-center max-w-xl mb-12 ${
        isDark ? 'text-slate-400' : 'text-slate-600'
      }`}>
        Your order has been submitted successfully. We have sent a confirmation to your email.
      </p>

      {/* Main Order Details Card */}
      <div className={`w-full max-w-3xl rounded-3xl p-7 sm:p-9 border mb-8 transition-all ${
        isDark 
          ? 'bg-[#0a0f22]/90 border-slate-800/80 shadow-2xl' 
          : 'bg-white border-slate-200 shadow-xl'
      }`}>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-8 pb-7 border-b border-slate-800/70">
          
          {/* Order ID */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              Order ID
            </span>
            <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {orderId}
            </span>
          </div>

          {/* Product */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              Product
            </span>
            <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {product}
            </span>
          </div>

          {/* Package */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              Package
            </span>
            <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {packageType}
            </span>
          </div>

          {/* Total */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              Total
            </span>
            <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatPrice(totalAmount)}
            </span>
          </div>

          {/* Order Date */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              Order Date
            </span>
            <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {orderDate}
            </span>
          </div>

          {/* Payment Method */}
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              Payment Method
            </span>
            <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {paymentMethod}
            </span>
          </div>

        </div>

        {/* Current Status Badge Row */}
        <div className="pt-6">
          <span className="text-[11px] font-medium text-slate-400 block mb-2">
            Current Status
          </span>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            Pending - Waiting for payment confirmation
          </div>
        </div>

      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={onViewMyOrders}
          className="flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Package className="w-4 h-4" />
          <span>View My Orders</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onWhatsAppChat) onWhatsAppChat();
            else window.open('https://wa.me/94771234567?text=Hi%20Raxwo%2C%20I%20have%20an%20order%20inquiry', '_blank');
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-xs sm:text-sm border transition-colors cursor-pointer ${
            isDark
              ? 'bg-[#11172e]/80 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700'
              : 'bg-slate-100 border-slate-300 text-slate-800 hover:text-slate-950'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </button>
      </div>

      {/* What happens next banner */}
      <div className={`w-full max-w-2xl rounded-2xl p-4 sm:p-5 border flex items-start gap-3.5 ${
        isDark 
          ? 'bg-[#0d132b]/80 border-cyan-500/20 text-slate-300' 
          : 'bg-blue-50/60 border-blue-200 text-slate-700'
      }`}>
        <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What happens next?
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Our team will contact you within one business day to confirm your requirements.
          </p>
        </div>
      </div>

    </div>
  );
}
