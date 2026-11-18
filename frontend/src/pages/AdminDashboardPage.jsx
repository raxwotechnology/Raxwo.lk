import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, ShoppingCart, ShieldCheck, 
  Search, Filter, CheckCircle2, FileText,
  ArrowUpRight, RefreshCw,
  Package, Edit3, X, Lock, Check, Image as ImageIcon
} from 'lucide-react';
import { curatedPresets, defaultProductImages } from '../data/productImages';

export default function AdminDashboardPage({ theme = 'dark', currentUser, onLogout }) {
  const isDark = theme === 'dark';
  const isSuperAdmin = currentUser && currentUser.role === 'super_admin';

  // Only display the 4 requested modules
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'quotes' | 'crm' | 'pricing'
  const [inquiries, setInquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  // Price Editing State (Super Admin Only)
  const [editingPriceProduct, setEditingPriceProduct] = useState(null);
  const [priceInput, setPriceInput] = useState('');
  const [savingPrice, setSavingPrice] = useState(false);

  // Photo Editing State (Admin Access)
  const [editingPhotoProduct, setEditingPhotoProduct] = useState(null);
  const [photoInput, setPhotoInput] = useState('');
  const [savingPhoto, setSavingPhoto] = useState(false);

  // CRM Filters
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Quotation form state
  const [quoteForm, setQuoteForm] = useState({
    inquiryId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    solutionName: 'Mobixa Mobile Shop ERP',
    priceLKR: 75000,
    discountLKR: 5000,
    notes: 'Includes full source code, RAMIS tax compliance module, and 12-month standard SLA.'
  });
  const [generatedQuote, setGeneratedQuote] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('raxwo_token') || '';
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Fetch admin data
  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = getAuthHeaders();

      const [resInquiries, resOrders, resProd] = await Promise.all([
        fetch('/api/admin/inquiries', { headers }),
        fetch('/api/admin/orders', { headers }),
        fetch('/api/products')
      ]);

      if (!resInquiries.ok || !resOrders.ok) {
        if (resInquiries.status === 401 || resOrders.status === 401) {
          throw new Error('Your administrative session has expired. Please sign in again.');
        }
        throw new Error('Failed to load administrative records. Please verify login permissions.');
      }

      const [dataInquiries, dataOrders, dataProd] = await Promise.all([
        resInquiries.json(),
        resOrders.json(),
        resProd.json()
      ]);

      setInquiries(dataInquiries.data || []);
      setOrders(dataOrders.data || []);
      if (dataProd.success && dataProd.data) {
        setAdminProducts(dataProd.data);
      }
    } catch (err) {
      setError(err.message || 'Error connecting to admin endpoints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Update Inquiry Status in CRM
  const handleUpdateLeadStatus = async (inquiryId, newStatus) => {
    try {
      const token = localStorage.getItem('raxwo_token');
      if (!token) {
        alert('Administrative authentication required. Please sign in as an Administrator.');
        return;
      }
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Your administrative session has expired or is unauthorized. Please sign in again.');
        }
        throw new Error(data.message || 'Failed to update lead');
      }

      setInquiries(prev => prev.map(inq => (inq.id === inquiryId || inq._id === inquiryId) ? { ...inq, status: newStatus } : inq));
      setActionSuccess(`Lead status updated to ${newStatus.toUpperCase()}`);
      setTimeout(() => setActionSuccess(''), 2500);
    } catch (err) {
      alert(`Error updating lead: ${err.message}`);
    }
  };

  // Generate Quotation
  const handleGenerateQuote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('raxwo_token');
      if (!token) {
        alert('Administrative authentication required. Please sign in as an Administrator (admin@raxwo.lk) to generate quotations.');
        return;
      }
      const res = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          inquiryId: quoteForm.inquiryId,
          customerName: quoteForm.customerName,
          customerEmail: quoteForm.customerEmail,
          customerPhone: quoteForm.customerPhone,
          items: [{ name: quoteForm.solutionName, priceLKR: quoteForm.priceLKR, quantity: 1 }],
          discountLKR: quoteForm.discountLKR,
          notes: quoteForm.notes
        })
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Your administrative session has expired or is unauthorized. Please sign in again as Administrator.');
        }
        throw new Error(data.message || 'Failed to generate quotation.');
      }

      setGeneratedQuote(data.data);
      setActionSuccess(`Quotation #${data.data.quoteId} generated successfully!`);
      setTimeout(() => setActionSuccess(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Verify Bank Transfer
  const handleVerifyBankOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('raxwo_token');
      if (!token) {
        alert('Administrative authentication required. Please sign in as an Administrator.');
        return;
      }
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ paymentStatus: 'completed', status: 'Active' })
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Your administrative session has expired or is unauthorized. Please sign in again.');
        }
        throw new Error(data.message || 'Failed to verify order');
      }

      setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, paymentStatus: 'completed', status: 'Active' } : o));
      setActionSuccess(`Order #${orderId} verified and activated!`);
      setTimeout(() => setActionSuccess(''), 2500);
    } catch (err) {
      alert(err.message);
    }
  };

  // Save Product Price (Super Admin Only)
  const handleSavePrice = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Permission denied: Only Super Administrator can modify product prices.');
      return;
    }
    const val = Number(priceInput);
    if (isNaN(val) || val < 0) {
      alert('Please enter a valid price in LKR.');
      return;
    }
    setSavingPrice(true);
    try {
      const token = localStorage.getItem('raxwo_token');
      if (!token) {
        alert('Authentication required: Please sign in as Super Administrator (admin@raxwo.lk).');
        return;
      }
      const res = await fetch(`/api/products/${editingPriceProduct.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ priceLKR: val })
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Your administrative session has expired or is unauthorized. Only Super Administrator can update prices.');
        }
        throw new Error(data.message || 'Failed to update price');
      }

      setAdminProducts(prev => prev.map(p => p.id === editingPriceProduct.id ? { ...p, priceLKR: val } : p));
      setActionSuccess(`Price for ${editingPriceProduct.name} updated to LKR ${val.toLocaleString()}!`);
      setTimeout(() => setActionSuccess(''), 3000);
      setEditingPriceProduct(null);
    } catch (err) {
      alert(err.message || 'Failed to update price');
    } finally {
      setSavingPrice(false);
    }
  };

  // Save Product Photo (Admin Access)
  const handleSavePhoto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('raxwo_token');
    if (!token) {
      alert('Authentication required: Please sign in as an Administrator.');
      return;
    }
    const newImage = photoInput.trim();
    if (!newImage) {
      alert('Please enter or select a valid image URL.');
      return;
    }
    setSavingPhoto(true);
    try {
      const res = await fetch(`/api/products/${editingPhotoProduct.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ image: newImage })
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Your administrative session has expired or is unauthorized to modify photos.');
        }
        throw new Error(data.message || 'Failed to update photo');
      }

      setAdminProducts(prev => prev.map(p => p.id === editingPhotoProduct.id ? { ...p, image: newImage } : p));
      setActionSuccess(`Photo for ${editingPhotoProduct.name} updated successfully!`);
      setTimeout(() => setActionSuccess(''), 3000);
      setEditingPhotoProduct(null);
    } catch (err) {
      alert(err.message || 'Failed to update photo');
    } finally {
      setSavingPhoto(false);
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesStatus = leadStatusFilter === 'all' || inq.status === leadStatusFilter;
    const matchesSearch = !searchQuery || 
      (inq.name && inq.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.phone && inq.phone.includes(searchQuery)) ||
      (inq.preferredErp && inq.preferredErp.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className={`min-h-screen py-10 px-4 sm:px-8 lg:px-14 ${isDark ? 'bg-[#070a13] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Admin Header matching site-wide style */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          {/* Solid Capsule Pill Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm mb-3 ${
            isDark ? 'bg-white text-slate-950' : 'bg-[#0a0f24] text-white'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#0094ff]" />
            <span>Raxwo Enterprise Backoffice</span>
          </div>

          {/* Two-Tone Heading */}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            <span className={isDark ? 'text-white' : 'text-slate-900'}>Admin &amp; Backoffice </span>
            <span className="text-[#0094ff]">Portal</span>
          </h1>
          <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Logged in as <span className="font-semibold text-[#0094ff]">{currentUser?.name || 'Administrator'}</span>{' '}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ml-1 ${
              isSuperAdmin 
                ? 'bg-[#0094ff]/10 text-[#0094ff] border border-[#0094ff]/20' 
                : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
            }`}>
              {isSuperAdmin ? 'Super Administrator' : 'Sales Admin'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              isDark 
                ? 'border-slate-800 hover:border-[#0094ff]/40 hover:text-[#0094ff] text-slate-300' 
                : 'border-slate-300 hover:border-[#0094ff] hover:text-[#0094ff] text-slate-700 bg-white'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Action Notification */}
      {actionSuccess && (
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mt-4 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center justify-between gap-2 animate-fadeIn">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Navigation Tabs — Exactly 4 Requested Modules */}
      <div className="flex flex-wrap gap-2 mt-6 pb-2 border-b border-slate-800">
        {[
          { id: 'orders', label: 'Orders & Payments', icon: ShoppingCart, badge: orders.length },
          { id: 'quotes', label: 'Quotation Builder', icon: FileText },
          { id: 'crm', label: 'CRM Leads & Pipeline', icon: Users, badge: inquiries.length },
          { id: 'pricing', label: 'Product Pricing', icon: DollarSign, badge: adminProducts.length }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-[#0094ff] text-white shadow-lg shadow-[#0094ff]/25 font-bold' 
                  : isDark 
                    ? 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800' 
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* MODULE 1: ORDERS & PAYMENTS */}
      {activeTab === 'orders' && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Orders &amp; </span>
                <span className="text-[#0094ff]">Payment Approvals</span>
              </h2>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Verify client bank deposits, manage license deliveries, and activate ERP accounts.
              </p>
            </div>
          </div>

          <div className={`overflow-x-auto rounded-2xl border ${isDark ? 'border-slate-800 bg-[#0c101d]' : 'border-slate-200 bg-white shadow-sm'}`}>
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className={`border-b text-[11px] font-semibold uppercase ${isDark ? 'border-slate-800 bg-slate-900/80 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">License Key</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-slate-500 text-xs">
                      No customer orders recorded yet.
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.orderId} className={`transition-colors ${isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}`}>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#0094ff] font-bold">
                        {order.orderId}
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        <span className={isDark ? 'text-white' : 'text-slate-900'}>{order.customer?.name}</span>
                        <span className="block text-[11px] text-slate-400 font-normal">{order.customer?.phone}</span>
                      </td>
                      <td className={`py-3.5 px-4 font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        LKR {order.totalLKR?.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 uppercase text-[11px] font-semibold text-slate-400">
                        {order.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-amber-400">
                        {order.licenseKey}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          order.paymentStatus === 'completed' || order.paymentStatus === 'verified'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {order.paymentStatus === 'pending' ? (
                          <button
                            onClick={() => handleVerifyBankOrder(order.orderId)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-sm"
                          >
                            Verify &amp; Activate
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-400 font-medium inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Activated</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 2: QUOTATION BUILDER */}
      {activeTab === 'quotes' && (
        <div className="mt-8 max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0c101d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Commercial </span>
                <span className="text-[#0094ff]">Quotation Builder</span>
              </h2>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Generate official enterprise quotations for qualified leads with customized package pricing.
              </p>
            </div>

            <form onSubmit={handleGenerateQuote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Customer / Company Name</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.customerName}
                    onChange={e => setQuoteForm({ ...quoteForm, customerName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white focus:border-[#0094ff]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0094ff]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Customer Phone</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.customerPhone}
                    onChange={e => setQuoteForm({ ...quoteForm, customerPhone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white focus:border-[#0094ff]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0094ff]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>ERP Solution / Package</label>
                <input
                  type="text"
                  required
                  value={quoteForm.solutionName}
                  onChange={e => setQuoteForm({ ...quoteForm, solutionName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white focus:border-[#0094ff]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0094ff]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Base Price (LKR)</label>
                  <input
                    type="number"
                    required
                    value={quoteForm.priceLKR}
                    onChange={e => setQuoteForm({ ...quoteForm, priceLKR: Number(e.target.value) })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white focus:border-[#0094ff]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0094ff]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Discount (LKR)</label>
                  <input
                    type="number"
                    value={quoteForm.discountLKR}
                    onChange={e => setQuoteForm({ ...quoteForm, discountLKR: Number(e.target.value) })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white focus:border-[#0094ff]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0094ff]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Terms &amp; Scope</label>
                <textarea
                  rows="2"
                  value={quoteForm.notes}
                  onChange={e => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none transition-all ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white focus:border-[#0094ff]' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0094ff]'
                  }`}
                />
              </div>

              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Net Quotation Total:</span>
                <span className="text-xl font-black text-[#0094ff]">
                  LKR {Math.max(0, quoteForm.priceLKR - quoteForm.discountLKR).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#0094ff] hover:bg-[#0080dd] text-white transition-all shadow-lg shadow-[#0094ff]/25 cursor-pointer active:scale-[0.99]"
              >
                Generate Official Quotation
              </button>
            </form>
          </div>

          {/* Generated Quote Display */}
          {generatedQuote && (
            <div className={`p-6 rounded-3xl border animate-fadeIn ${
              isDark ? 'bg-[#0c101d] border-[#0094ff]/40 text-white' : 'bg-white border-[#0094ff]/40 text-slate-900 shadow-md'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-[#0094ff]">
                  FORMAL QUOTATION: {generatedQuote.quoteId}
                </span>
                <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valid &amp; Active</span>
                </span>
              </div>
              <div className={`mt-3 text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <p><strong>Customer:</strong> {generatedQuote.customerName} ({generatedQuote.customerPhone})</p>
                <p><strong>Package:</strong> {generatedQuote.items[0]?.name} - LKR {generatedQuote.items[0]?.priceLKR.toLocaleString()}</p>
                <p><strong>Net Total:</strong> <span className="font-extrabold text-[#0094ff]">LKR {generatedQuote.totalLKR.toLocaleString()}</span></p>
                <p><strong>Terms:</strong> {generatedQuote.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODULE 3: CRM LEADS & PIPELINE */}
      {activeTab === 'crm' && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>CRM Leads &amp; </span>
                <span className="text-[#0094ff]">Sales Pipeline</span>
              </h2>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Track incoming inquiries, assign customer statuses, and generate instant custom quotations.
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads by customer, phone, or ERP..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent text-xs sm:text-sm focus:outline-none ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={leadStatusFilter}
                onChange={e => setLeadStatusFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                <option value="all">All Statuses ({inquiries.length})</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="demo_scheduled">Demo Scheduled</option>
                <option value="quoted">Quoted</option>
                <option value="won">Won / Closed</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className={`overflow-x-auto rounded-2xl border ${isDark ? 'border-slate-800 bg-[#0c101d]' : 'border-slate-200 bg-white shadow-sm'}`}>
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className={`border-b text-[11px] font-semibold uppercase ${isDark ? 'border-slate-800 bg-slate-900/80 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
                <tr>
                  <th className="py-3 px-4">Lead ID &amp; Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone / Email</th>
                  <th className="py-3 px-4">Requested ERP</th>
                  <th className="py-3 px-4">Status &amp; Action</th>
                  <th className="py-3 px-4 text-right">Quick Quote</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-slate-500 text-xs">
                      No customer leads match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map(inq => (
                    <tr key={inq.id || inq._id} className={`transition-colors ${isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}`}>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        <span className="text-[#0094ff] font-bold block">{inq.id}</span>
                        <span>{new Date(inq.submittedAt).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        <span className={isDark ? 'text-white' : 'text-slate-900'}>{inq.name}</span>
                        <span className="block text-[11px] text-slate-400 font-normal">{inq.businessType}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <a href={`tel:${inq.phone}`} className="hover:text-[#0094ff] block font-medium">
                          {inq.phone}
                        </a>
                        <span className="text-[11px] text-slate-400">{inq.email}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#0094ff]/10 text-[#0094ff] border border-[#0094ff]/20">
                          {inq.preferredErp}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={inq.status || 'new'}
                          onChange={e => handleUpdateLeadStatus(inq.id || inq._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none border cursor-pointer ${
                            inq.status === 'won' 
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                              : inq.status === 'quoted'
                                ? 'bg-[#0094ff]/20 text-[#0094ff] border-[#0094ff]/40'
                                : inq.status === 'demo_scheduled'
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                  : isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="demo_scheduled">Demo Scheduled</option>
                          <option value="quoted">Quoted</option>
                          <option value="won">Won / Closed</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setQuoteForm({
                              inquiryId: inq.id || inq._id,
                              customerName: inq.name,
                              customerEmail: inq.email !== 'N/A' ? inq.email : '',
                              customerPhone: inq.phone,
                              solutionName: inq.preferredErp || 'Mobixa Mobile Shop ERP',
                              priceLKR: 85000,
                              discountLKR: 5000,
                              notes: `Customized deployment for ${inq.name} (${inq.businessType}). Source code and SLA included.`
                            });
                            setActiveTab('quotes');
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0094ff]/10 text-[#0094ff] border border-[#0094ff]/30 hover:bg-[#0094ff] hover:text-white transition-all cursor-pointer"
                        >
                          Quote
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 4: PRODUCT PRICING MANAGEMENT (Super Admin Only to change prices) */}
      {activeTab === 'pricing' && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0094ff]/10 text-[#0094ff] border border-[#0094ff]/20 mb-2">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Commercial Price Control</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Product </span>
                <span className="text-[#0094ff]">Pricing Manager</span>
              </h2>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {isSuperAdmin 
                  ? 'Set and update commercial prices in LKR. Changes immediately update the live marketplace and customer checkout.' 
                  : 'View commercial pricing across all ERP solutions. Price modifications require Super Administrator credentials.'}
              </p>
            </div>

            <div>
              {isSuperAdmin ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Price Modification Authorized</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>View Only (Super Admin Required)</span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminProducts.map(prod => (
              <div 
                key={prod.id} 
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                  isDark ? 'bg-[#0c101d] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Image Banner */}
                <div className="relative w-full h-44 bg-slate-950 overflow-hidden">
                  <img 
                    src={prod.image || defaultProductImages[prod.id] || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80'} 
                    alt={prod.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Change Photo Pill Button */}
                  <button
                    onClick={() => {
                      setEditingPhotoProduct(prod);
                      setPhotoInput(prod.image || defaultProductImages[prod.id] || '');
                    }}
                    title="Change product photo"
                    className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/75 hover:bg-[#0094ff] text-white border border-white/20 transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer shadow-md"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Change Photo</span>
                  </button>

                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-[#0094ff] text-white shadow-sm">
                    {prod.category}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-white font-extrabold text-lg block">{prod.name}</span>
                    <span className="text-cyan-300 text-xs font-medium block truncate">{prod.subtitle}</span>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-5 flex items-center justify-between gap-3">
                  <div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Commercial Price (LKR)
                    </span>
                    <span className="text-xl font-black text-[#0094ff] block mt-0.5">
                      LKR {Number(prod.priceLKR || 75000).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingPhotoProduct(prod);
                        setPhotoInput(prod.image || defaultProductImages[prod.id] || '');
                      }}
                      title="Update product photo"
                      className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                        isDark 
                          ? 'border-slate-700 bg-slate-900/80 text-slate-300 hover:border-[#0094ff] hover:text-[#0094ff]' 
                          : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-[#0094ff] hover:text-[#0094ff]'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>

                    {isSuperAdmin ? (
                      <button
                        onClick={() => {
                          setEditingPriceProduct(prod);
                          setPriceInput(String(prod.priceLKR || 75000));
                        }}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0094ff] hover:bg-[#0080dd] text-white shadow-md shadow-[#0094ff]/25 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Change Price</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 text-slate-400 border border-slate-700/60 inline-flex items-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        <span>Price Locked</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Edit Modal (Super Admin Only) */}
      {editingPriceProduct && isSuperAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md p-6 sm:p-7 rounded-3xl border shadow-2xl ${
            isDark ? 'bg-[#0c101d] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
              <div>
                <span className="text-[11px] font-bold text-[#0094ff] uppercase tracking-wider block">Price Update</span>
                <h3 className="text-base sm:text-lg font-extrabold">{editingPriceProduct.name}</h3>
              </div>
              <button 
                onClick={() => setEditingPriceProduct(null)} 
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  New Commercial Base Price (LKR)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-slate-400">LKR</span>
                  <input 
                    type="number"
                    min="0"
                    step="500"
                    required
                    value={priceInput}
                    onChange={e => setPriceInput(e.target.value)}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl text-base font-extrabold border focus:outline-none transition-all ${
                      isDark 
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-[#0094ff] focus:ring-1 focus:ring-[#0094ff]' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#0094ff] focus:ring-1 focus:ring-[#0094ff]'
                    }`}
                  />
                </div>
              </div>

              {/* Quick +/- adjustment buttons */}
              <div>
                <span className={`block text-[11px] font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Quick Adjustment:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[-10000, -5000, 5000, 10000].map(diff => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => {
                        const current = Number(priceInput) || Number(editingPriceProduct.priceLKR) || 0;
                        setPriceInput(String(Math.max(0, current + diff)));
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        diff > 0 
                          ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10' 
                          : 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                      }`}
                    >
                      {diff > 0 ? `+${diff.toLocaleString()}` : diff.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0094ff]/10 border border-[#0094ff]/20 flex items-center justify-between text-xs">
                <span className="text-slate-400">Effective New Price:</span>
                <span className="text-base font-black text-[#0094ff]">
                  LKR {Number(priceInput || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPriceProduct(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPrice}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0094ff] hover:bg-[#0080dd] text-white shadow-lg shadow-[#0094ff]/25 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {savingPrice ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Save New Price</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Photo Edit Modal (Admin Control) */}
      {editingPhotoProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-lg p-6 sm:p-7 rounded-3xl border shadow-2xl ${
            isDark ? 'bg-[#0c101d] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#0094ff] text-white shadow-md shadow-[#0094ff]/25">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Change Product Photo</h3>
                  <p className="text-xs text-slate-400">{editingPhotoProduct.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingPhotoProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              {/* Live Preview */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
                  Live Photo Preview
                </label>
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                  {photoInput ? (
                    <img 
                      src={photoInput} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80'; 
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                      <ImageIcon className="w-8 h-8 mb-1 text-slate-600" />
                      <span>Paste an image URL or choose preset below</span>
                    </div>
                  )}
                  <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                    {editingPhotoProduct.name} Preview
                  </div>
                </div>
              </div>

              {/* Input URL */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Image / Photo URL:
                </label>
                <input
                  type="text"
                  value={photoInput}
                  onChange={e => setPhotoInput(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${
                    isDark 
                      ? 'bg-slate-900 border border-slate-700 text-white focus:border-[#0094ff]' 
                      : 'bg-slate-50 border border-slate-300 text-slate-900 focus:border-[#0094ff]'
                  }`}
                />
              </div>

              {/* Curated Presets */}
              <div>
                <label className="block text-xs font-semibold mb-2">
                  Or pick from curated ERP presets:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {curatedPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoInput(preset.url)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-left truncate transition-colors cursor-pointer border ${
                        photoInput === preset.url
                          ? 'bg-[#0094ff] text-white border-[#0094ff] font-bold'
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

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPhotoProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPhoto}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0094ff] hover:bg-[#0080dd] text-white shadow-md shadow-[#0094ff]/25 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {savingPhoto ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>{savingPhoto ? 'Saving Photo...' : 'Update Product Photo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
