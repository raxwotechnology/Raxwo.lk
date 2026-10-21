import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, DollarSign, ShoppingCart, ShieldCheck, 
  Search, Filter, Plus, CheckCircle2, Clock, FileText, Send, 
  AlertCircle, ArrowUpRight, ChevronRight, RefreshCw, Eye,
  Package, Image as ImageIcon, Edit3, X
} from 'lucide-react';

export default function AdminDashboardPage({ theme = 'dark', currentUser, onLogout }) {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'crm' | 'quotes' | 'orders' | 'products'
  const [analytics, setAnalytics] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [adminProducts, setAdminProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productImageInput, setProductImageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

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

  const token = localStorage.getItem('raxwo_token');

  // Fetch admin data
  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [resAnalytics, resInquiries, resOrders] = await Promise.all([
        fetch('/api/admin/analytics', { headers }),
        fetch('/api/admin/inquiries', { headers }),
        fetch('/api/admin/orders', { headers })
      ]);

      if (!resAnalytics.ok || !resInquiries.ok || !resOrders.ok) {
        throw new Error('Failed to load administrative records. Please verify login permissions.');
      }

      const [dataAnalytics, dataInquiries, dataOrders] = await Promise.all([
        resAnalytics.json(),
        resInquiries.json(),
        resOrders.json()
      ]);

      setAnalytics(dataAnalytics.data);
      setInquiries(dataInquiries.data || []);
      setOrders(dataOrders.data || []);

      // Also fetch products for catalog management
      try {
        const resProd = await fetch('/api/products');
        const dataProd = await resProd.json();
        if (dataProd.success && dataProd.data) {
          setAdminProducts(dataProd.data);
        }
      } catch (pe) {}
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
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

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
      const res = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
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
      if (!res.ok) throw new Error(data.message);

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
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ paymentStatus: 'completed', status: 'Active' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, paymentStatus: 'completed', status: 'Active' } : o));
      setActionSuccess(`Order #${orderId} verified and activated!`);
      setTimeout(() => setActionSuccess(''), 2500);
    } catch (err) {
      alert(err.message);
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
      
      {/* Top Admin Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Raxwo Enterprise Backoffice Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Admin & Sales CRM Console
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Logged in as <span className="font-semibold text-cyan-400">{currentUser?.name || 'Administrator'}</span> ({currentUser?.role || 'super_admin'})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className="p-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Action Notification */}
      {actionSuccess && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mt-6 pb-2 border-b border-slate-800">
        {[
          { id: 'overview', label: 'Platform Analytics', icon: BarChart3 },
          { id: 'crm', label: 'CRM Leads Pipeline', icon: Users, badge: inquiries.length },
          { id: 'quotes', label: 'Quotation Builder', icon: FileText },
          { id: 'orders', label: 'Orders & Payments', icon: ShoppingCart, badge: orders.length },
          { id: 'products', label: 'ERP Products & Images', icon: Package, badge: adminProducts.length }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                  : isDark ? 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && analytics && (
        <div className="mt-8 space-y-8 animate-fadeIn">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0c101d] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Verified Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-emerald-400">
                  LKR {analytics.summary.totalRevenueLKR.toLocaleString()}
                </span>
                <span className="block text-[11px] text-slate-400 mt-1">From completed orders</span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0c101d] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Total CRM Inquiries</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-white">
                  {analytics.summary.totalLeads}
                </span>
                <span className="block text-[11px] text-slate-400 mt-1">Active customer inquiries</span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0c101d] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Orders Placed</span>
                <ShoppingCart className="w-4 h-4 text-purple-400" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-white">
                  {analytics.summary.totalOrders}
                </span>
                <span className="block text-[11px] text-purple-400 mt-1">
                  {analytics.summary.completedOrdersCount} paid & active
                </span>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#0c101d] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Lead Conversion Rate</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-cyan-400">
                  {analytics.summary.conversionRate}
                </span>
                <span className="block text-[11px] text-slate-400 mt-1">Won / Total leads</span>
              </div>
            </div>

          </div>

          {/* CRM Leads Pipeline Status Breakdown */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0c101d] border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              CRM Pipeline Stage Distribution
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'New', count: analytics.leadsPipeline.new, color: 'text-blue-400 bg-blue-500/10' },
                { label: 'Contacted', count: analytics.leadsPipeline.contacted, color: 'text-purple-400 bg-purple-500/10' },
                { label: 'Demo Scheduled', count: analytics.leadsPipeline.demo_scheduled, color: 'text-amber-400 bg-amber-500/10' },
                { label: 'Quoted', count: analytics.leadsPipeline.quoted, color: 'text-indigo-400 bg-indigo-500/10' },
                { label: 'Won / Closed', count: analytics.leadsPipeline.won, color: 'text-emerald-400 bg-emerald-500/10' },
                { label: 'Lost', count: analytics.leadsPipeline.lost, color: 'text-red-400 bg-red-500/10' }
              ].map(stage => (
                <div key={stage.label} className={`p-3.5 rounded-xl border border-slate-800 text-center ${stage.color}`}>
                  <span className="text-2xl font-bold block">{stage.count}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider mt-1 block">
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CRM LEADS PIPELINE */}
      {activeTab === 'crm' && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads by customer, phone, or ERP..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm focus:outline-none text-white placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={leadStatusFilter}
                onChange={e => setLeadStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 focus:outline-none"
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
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0c101d]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase text-[11px] font-semibold">
                <tr>
                  <th className="py-3 px-4">Lead ID & Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone / Email</th>
                  <th className="py-3 px-4">Requested ERP</th>
                  <th className="py-3 px-4">Status & Action</th>
                  <th className="py-3 px-4 text-right">Quick Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 text-xs">
                      No customer leads match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map(inq => (
                    <tr key={inq.id || inq._id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                        <span className="text-cyan-400 font-bold block">{inq.id}</span>
                        <span>{new Date(inq.submittedAt).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {inq.name}
                        <span className="block text-[11px] text-slate-400 font-normal">{inq.businessType}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        <a href={`tel:${inq.phone}`} className="hover:text-cyan-400 block font-medium">
                          {inq.phone}
                        </a>
                        <span className="text-[11px] text-slate-400">{inq.email}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {inq.preferredErp}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={inq.status || 'new'}
                          onChange={e => handleUpdateLeadStatus(inq.id || inq._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none border cursor-pointer ${
                            inq.status === 'won' 
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                              : inq.status === 'quoted'
                                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                                : inq.status === 'demo_scheduled'
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                  : 'bg-slate-800 text-slate-300 border-slate-700'
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
                      <td className="py-3 px-4 text-right">
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
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-all cursor-pointer"
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

      {/* TAB 3: CUSTOM QUOTE BUILDER */}
      {activeTab === 'quotes' && (
        <div className="mt-8 max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-[#0c101d] border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-xl font-bold mb-1">Commercial Quotation Builder</h3>
            <p className="text-xs text-slate-400 mb-6">
              Generate an official Raxwo quotation for qualified enterprise leads.
            </p>

            <form onSubmit={handleGenerateQuote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Customer / Company Name</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.customerName}
                    onChange={e => setQuoteForm({ ...quoteForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Customer Phone</label>
                  <input
                    type="text"
                    required
                    value={quoteForm.customerPhone}
                    onChange={e => setQuoteForm({ ...quoteForm, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">ERP Solution / Package</label>
                <input
                  type="text"
                  required
                  value={quoteForm.solutionName}
                  onChange={e => setQuoteForm({ ...quoteForm, solutionName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Base Price (LKR)</label>
                  <input
                    type="number"
                    required
                    value={quoteForm.priceLKR}
                    onChange={e => setQuoteForm({ ...quoteForm, priceLKR: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Discount (LKR)</label>
                  <input
                    type="number"
                    value={quoteForm.discountLKR}
                    onChange={e => setQuoteForm({ ...quoteForm, discountLKR: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Terms & Scope</label>
                <textarea
                  rows="2"
                  value={quoteForm.notes}
                  onChange={e => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Net Quotation Total:</span>
                <span className="text-xl font-extrabold text-cyan-400">
                  LKR {Math.max(0, quoteForm.priceLKR - quoteForm.discountLKR).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                Generate Official Quotation
              </button>
            </form>
          </div>

          {/* Generated Quote Display */}
          {generatedQuote && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/40 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-purple-400">
                  FORMAL QUOTATION: {generatedQuote.quoteId}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">Active & Valid</span>
              </div>
              <div className="mt-3 text-xs space-y-1 text-slate-300">
                <p><strong>Customer:</strong> {generatedQuote.customerName} ({generatedQuote.customerPhone})</p>
                <p><strong>Items:</strong> {generatedQuote.items[0]?.name} - LKR {generatedQuote.items[0]?.priceLKR.toLocaleString()}</p>
                <p><strong>Total:</strong> LKR {generatedQuote.totalLKR.toLocaleString()}</p>
                <p><strong>Terms:</strong> {generatedQuote.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ORDERS & PAYMENTS */}
      {activeTab === 'orders' && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0c101d]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase text-[11px] font-semibold">
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
              <tbody className="divide-y divide-slate-800/60">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500 text-xs">
                      No client orders recorded yet.
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.orderId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-cyan-400 font-bold">
                        {order.orderId}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {order.customer?.name}
                        <span className="block text-[11px] text-slate-400 font-normal">{order.customer?.phone}</span>
                      </td>
                      <td className="py-3 px-4 font-extrabold text-white">
                        LKR {order.totalLKR?.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 uppercase text-[11px] font-semibold text-slate-300">
                        {order.paymentMethod}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-amber-300">
                        {order.licenseKey}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                          order.paymentStatus === 'completed' || order.paymentStatus === 'verified'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {order.paymentStatus === 'pending' ? (
                          <button
                            onClick={() => handleVerifyBankOrder(order.orderId)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer"
                          >
                            Verify & Activate
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">Activated</span>
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

      {/* TAB 5: PRODUCTS & ERP IMAGES MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">ERP Solutions Catalog &amp; Image Manager</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Add custom images, update solution metadata, and manage marketplace listings.
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminProducts.map(prod => (
              <div 
                key={prod.id} 
                className={`rounded-2xl border overflow-hidden transition-all ${
                  isDark ? 'bg-[#0c101d] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Image Banner */}
                <div className="relative w-full h-40 bg-slate-950 overflow-hidden">
                  <img 
                    src={prod.image || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80'} 
                    alt={prod.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-blue-600 text-white">
                    {prod.category}
                  </span>
                  <div className="absolute bottom-2.5 left-3">
                    <span className="text-white font-extrabold text-base block">{prod.name}</span>
                    <span className="text-cyan-300 text-xs font-medium">{prod.subtitle}</span>
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price (LKR)</span>
                    <span className="text-sm font-bold text-emerald-400">
                      LKR {Number(prod.priceLKR || 75000).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProduct(prod);
                      setProductImageInput(prod.image || '');
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Change Image</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${
            isDark ? 'bg-[#0e1329] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-4">
              <h3 className="text-base font-bold">Update {editingProduct.name} Image</h3>
              <button 
                onClick={() => setEditingProduct(null)} 
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Preview */}
            <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 mb-4 relative">
              <img 
                src={productImageInput || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80'} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-2 left-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                Live Preview
              </span>
            </div>

            <label className="block text-xs font-semibold mb-1">Image URL:</label>
            <input 
              type="text"
              value={productImageInput}
              onChange={e => setProductImageInput(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white mb-4 focus:outline-none focus:border-blue-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await fetch(`/api/products/${editingProduct.id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ image: productImageInput })
                    });
                    setAdminProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, image: productImageInput } : p));
                    setActionSuccess(`Image updated for ${editingProduct.name}`);
                    setTimeout(() => setActionSuccess(''), 2500);
                    setEditingProduct(null);
                  } catch (e) {
                    alert('Error saving image: ' + e.message);
                  }
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
