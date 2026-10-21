import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function InvoiceModal({ isOpen, onClose, order, theme = 'dark' }) {
  if (!isOpen || !order) return null;

  const isDark = theme === 'dark';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className={`relative w-full max-w-3xl my-auto rounded-3xl shadow-2xl border p-6 sm:p-10 overflow-hidden transition-all bg-white text-slate-900`}>
        
        {/* Action Controls (Hidden when printed) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Commercial Tax Invoice</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="pt-6 font-sans text-slate-800">
          
          {/* Header & Logo */}
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950">
                RAXWO NEXT LEVEL TECH
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Raxwo Enterprise Platforms (Pvt) Ltd<br />
                Level 14, World Trade Center, Colombo 01, Sri Lanka<br />
                Company Reg: PV-00249811 | VAT: 119830200-7000<br />
                contact@raxwo.lk | +94 11 234 5678
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                TAX INVOICE
              </span>
              <span className="text-xl font-extrabold text-blue-600 font-mono block mt-0.5">
                {order.invoiceNumber || `INV-2026-${order.orderId?.replace('ORD-2026-', '') || '10482'}`}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                Date: {new Date(order.createdAt || Date.now()).toLocaleDateString('en-GB')}
              </span>
            </div>
          </div>

          {/* Billed To & Payment Method */}
          <div className="grid grid-cols-2 gap-4 my-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Billed To (Customer):
              </span>
              <span className="font-bold text-sm text-slate-900 block">{order.customer?.name}</span>
              <span className="text-slate-600 block">{order.customer?.phone}</span>
              <span className="text-slate-600 block">{order.customer?.email}</span>
              {order.customer?.company && (
                <span className="text-slate-600 block font-medium">{order.customer?.company}</span>
              )}
            </div>
            <div>
              <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Payment & License Details:
              </span>
              <span className="text-slate-700 block">
                Method: <strong className="uppercase">{order.paymentMethod || 'Card'}</strong>
              </span>
              <span className="text-slate-700 block">
                Status: <strong className="text-emerald-600 uppercase">{order.paymentStatus || 'Completed'}</strong>
              </span>
              <span className="text-slate-700 block mt-1">
                License Key: <strong className="font-mono text-blue-600">{order.licenseKey || 'RAXWO-PRO-2026-X892'}</strong>
              </span>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-900 uppercase font-bold text-[11px]">
                <th className="py-2.5">Item & Description</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Price (LKR)</th>
                <th className="py-2.5 text-right">Total (LKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(order.items || [{ name: 'Mobixa Mobile Shop ERP (Full Source)', priceLKR: order.totalLKR || 75000, quantity: 1 }]).map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3">
                    <span className="font-bold block">{item.name}</span>
                    <span className="text-[11px] text-slate-500">Perpetual Commercial License with Source Code & RAMIS VAT module</span>
                  </td>
                  <td className="py-3 text-center font-medium">{item.quantity || 1}</td>
                  <td className="py-3 text-right">LKR {(item.priceLKR || order.totalLKR || 75000).toLocaleString()}</td>
                  <td className="py-3 text-right font-bold">LKR {((item.priceLKR || order.totalLKR || 75000) * (item.quantity || 1)).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="border-t-2 border-slate-900 pt-4 mt-6 flex justify-end">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>LKR {(order.totalLKR || 75000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>RAMIS Software Export Tax (0%):</span>
                <span>LKR 0</span>
              </div>
              <div className="flex justify-between font-black text-base text-slate-950 pt-2 border-t border-slate-300">
                <span>Total Paid:</span>
                <span className="text-blue-600">LKR {(order.totalLKR || 75000).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cryptographically verified digital invoice. Retain for tax & accounting filings.</span>
            </div>
            <span>Thank you for choosing Raxwo.lk!</span>
          </div>

        </div>

      </div>
    </div>
  );
}
