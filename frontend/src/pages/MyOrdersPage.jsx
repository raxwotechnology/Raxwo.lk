import React, { useState } from 'react';
import { 
  Package, ExternalLink, X, Clock, CheckCircle2, 
  AlertCircle, FileText, Copy, Upload, ShieldCheck, Printer 
} from 'lucide-react';

export default function MyOrdersPage({
  userOrders = [],
  currency = 'LKR',
  currencyRates,
  theme = 'dark',
  onSelectOrder,
  onOpenInvoice
}) {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [slipRefInput, setSlipRefInput] = useState('');
  const [slipUploading, setSlipUploading] = useState(false);
  const [slipSuccess, setSlipSuccess] = useState('');

  const isDark = theme === 'dark';

  const defaultOrders = [
    {
      id: 'ORD-2026-10482',
      orderId: 'ORD-2026-10482',
      invoiceNumber: 'INV-2026-10482',
      licenseKey: 'RAXWO-MBX9-K821-L490',
      productName: 'Mobixa Mobile Shop ERP',
      packageType: 'Full Source Code & Deployment',
      date: '02 Oct 2026',
      createdAt: '2026-10-02T10:24:00.000Z',
      amountLKR: 75000,
      totalLKR: 75000,
      status: 'Active',
      paymentStatus: 'completed',
      paymentMethod: 'payhere',
      clientName: 'Nimal Mobile Center',
      customer: {
        name: 'Nimal Perera',
        email: 'nimal@gmail.com',
        phone: '+94 77 123 4567',
        company: 'Nimal Mobile Center'
      },
      items: [
        { name: 'Mobixa Mobile Shop ERP', priceLKR: 75000, quantity: 1 }
      ]
    }
  ];

  // Merge dynamic orders with defaults
  const allOrders = userOrders.length > 0 ? userOrders : defaultOrders;

  const filteredOrders = allOrders.filter(order => {
    if (activeTab === 'All Orders') return true;
    const st = (order.status || 'Active').toLowerCase();
    return st === activeTab.toLowerCase();
  });

  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  const getStatusBadge = (status) => {
    const s = (status || 'Active').toLowerCase();
    if (s === 'active' || s === 'completed' || s === 'fulfilled') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Active & Licensed</span>
        </span>
      );
    }
    if (s === 'processing' || s === 'in progress') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Clock className="w-3.5 h-3.5" />
          <span>Processing</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock className="w-3.5 h-3.5" />
        <span>Pending Payment / Verification</span>
      </span>
    );
  };

  const handleCopyLicense = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleUploadSlip = async (orderId) => {
    if (!slipRefInput) return;
    setSlipUploading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/upload-slip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceNumber: slipRefInput, bankName: 'Commercial Bank' })
      });
      const data = await res.json();
      setSlipSuccess('Bank payment slip reference submitted! Our finance team will verify.');
      setSlipRefInput('');
    } catch (e) {
      alert('Error uploading slip: ' + e.message);
    } finally {
      setSlipUploading(false);
    }
  };

  return (
    <div className="w-full pt-6 pb-24 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Heading */}
      <div className="max-w-4xl mb-10 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Raxwo Buyer License Portal
        </div>
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          My Orders & Licenses
        </h1>
        <p className={`text-sm sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Access your perpetual commercial licenses, tax invoices, and deployment source code.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-800 pb-3">
        {['All Orders', 'Active', 'Pending'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : isDark ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={`w-full rounded-3xl border overflow-hidden transition-all ${
        isDark ? 'bg-[#0a0f22]/90 border-slate-800/80 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'border-slate-800/80 text-slate-400 bg-[#0d132b]/50' : 'border-slate-200 text-slate-500 bg-slate-50/70'
              }`}>
                <th className="py-4 px-6">ORDER ID</th>
                <th className="py-4 px-6">PRODUCT</th>
                <th className="py-4 px-6">LICENSE KEY</th>
                <th className="py-4 px-6">AMOUNT</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-sm text-slate-400">
                    No orders found in this category.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-5 px-6 font-mono text-xs text-cyan-400 font-bold">
                      {order.orderId || order.id}
                    </td>
                    <td className="py-5 px-6 font-semibold">
                      {order.productName || order.items?.[0]?.name || 'ERP Solution'}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {order.packageType || 'Full Source Code'}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-mono text-xs text-amber-300">
                      {order.licenseKey || 'RAXWO-PRO-2026-X892'}
                    </td>
                    <td className="py-5 px-6 font-bold text-white">
                      {formatPrice(order.amountLKR || order.totalLKR || 75000)}
                    </td>
                    <td className="py-5 px-6">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Invoice */}
                        <button
                          onClick={() => onOpenInvoice && onOpenInvoice(order)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Tax Invoice</span>
                        </button>

                        {/* View Details */}
                        <button
                          onClick={() => setSelectedOrderModal(order)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Bank Slip Modal */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl relative ${
            isDark ? 'bg-[#0b1026] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => { setSelectedOrderModal(null); setSlipSuccess(''); }}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Order {selectedOrderModal.orderId || selectedOrderModal.id}</h3>
                <span className="text-xs text-slate-400">Date: {new Date(selectedOrderModal.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>

            {/* License Key Box */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Perpetual Commercial License Key:
              </span>
              <div className="flex items-center justify-between gap-2 font-mono text-sm text-cyan-400 font-bold">
                <span>{selectedOrderModal.licenseKey || 'RAXWO-PRO-2026-X892'}</span>
                <button
                  onClick={() => handleCopyLicense(selectedOrderModal.licenseKey || 'RAXWO-PRO-2026-X892')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-sans flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Bank Slip Upload if Pending */}
            {(selectedOrderModal.status === 'Pending' || selectedOrderModal.paymentStatus === 'pending') && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-5 text-xs text-slate-300">
                <span className="font-bold text-amber-300 block mb-1">
                  Bank Transfer Verification Pending:
                </span>
                <p className="text-[11px] text-slate-400 mb-3">
                  Please deposit to Commercial Bank A/C 1000 8945 2311 (Raxwo Next Level Tech) and enter your transaction reference below:
                </p>

                {slipSuccess ? (
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{slipSuccess}</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Bank Reference / Txn No."
                      value={slipRefInput}
                      onChange={e => setSlipRefInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none text-xs"
                    />
                    <button
                      onClick={() => handleUploadSlip(selectedOrderModal.orderId || selectedOrderModal.id)}
                      disabled={slipUploading || !slipRefInput}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs cursor-pointer disabled:opacity-50"
                    >
                      {slipUploading ? 'Submitting...' : 'Submit Ref'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Invoice Button */}
            <button
              onClick={() => {
                const ord = selectedOrderModal;
                setSelectedOrderModal(null);
                if (onOpenInvoice) onOpenInvoice(ord);
              }}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>View & Print Tax Invoice</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
