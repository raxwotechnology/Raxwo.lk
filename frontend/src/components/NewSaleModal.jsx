import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, DollarSign, ShoppingCart } from 'lucide-react';

export default function NewSaleModal({ isOpen, onClose, onRecordSale, isSubmitting }) {
  const [customer, setCustomer] = useState('Walk-in Customer');
  const [amount, setAmount] = useState('18500');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [itemName, setItemName] = useState('POS Standard License Pack');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRecordSale({
      customer,
      amount: Number(amount) || 18500,
      paymentMethod,
      itemName
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0b1024] border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-7 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Record New POS Sale</h3>
            <p className="text-xs text-slate-400">Simulate real-time live ERP dashboard sync</p>
          </div>
        </div>

        {/* Sale Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Customer Name / Account
            </label>
            <input
              type="text"
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Item / Invoice Item
            </label>
            <input
              type="text"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Amount (LKR)
              </label>
              <input
                type="number"
                required
                min="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Payment Type
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="Cash">Cash (LKR)</option>
                <option value="Card">Visa / Master</option>
                <option value="Koko / Mintpay">Koko / Mintpay</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "Syncing to Database..." : "Record & Update Dashboard Live"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
