import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Code, Sparkles, Send } from 'lucide-react';

export default function InquiryModal({ 
  isOpen, 
  onClose, 
  product, 
  onSubmitInquiry, 
  isSubmitting, 
  currency = 'LKR', 
  currencyRates 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirements: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        requirements: product ? `Interested in ${product.name} (One-Time License with Source Code)` : ''
      });
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

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
    if (!formData.name || !formData.phone) return;
    onSubmitInquiry({
      ...formData,
      preferredErp: product?.name || 'General Inquire'
    });
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0b1022] border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {product && (
          <div className="mb-6 pb-6 border-b border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-full inline-block mb-2">
              {product.badge || 'ERP Solution'}
            </span>
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{product.tagline}</p>

            <div className="flex items-center justify-between mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">One-Time Price</span>
                <span className="text-xl font-black text-white">{formatPrice(product.priceLKR || 75000)}</span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                100% Source Code Included
              </span>
            </div>
          </div>
        )}

        {!product && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Get Started with Raxwo ERP</h3>
            <p className="text-xs text-slate-400 mt-1">Connect with our ERP architect for instant onboarding & live preview</p>
          </div>
        )}

        {success ? (
          <div className="py-8 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-white">Inquiry Sent Successfully!</h4>
            <p className="text-xs text-slate-300 max-w-sm">
              We received your request. An engineer will WhatsApp or call you within 15 minutes to demo this ERP system.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Full Name / Business Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nimal Jayasuriya"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Phone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="077 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="nimal@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Custom Requirements or Note
              </label>
              <textarea
                rows={3}
                placeholder="Number of POS counters, branches, barcode printer model, etc."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Connecting..." : "Request Live Demo & Quotation"}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
