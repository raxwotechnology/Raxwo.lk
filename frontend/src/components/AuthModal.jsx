import React, { useState } from 'react';
import { X, Lock, Mail, User, Building, Phone, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, Zap } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, theme = 'dark' }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleQuickDemoLogin = (email, password) => {
    setFormData(prev => ({ ...prev, email, password }));
    setMode('login');
    // Instant login on click for seamless experience
    performLogin(email, password);
  };

  const performLogin = async (email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');

    // Pre-configured instant demo profiles for reliable testing
    if (email === 'admin@raxwo.lk') {
      const adminUser = {
        id: 'admin_demo_01',
        name: 'Super Administrator',
        email: 'admin@raxwo.lk',
        role: 'super_admin',
        company: 'Raxwo Next Level Tech'
      };
      localStorage.setItem('raxwo_token', 'demo_admin_jwt_token_2026');
      localStorage.setItem('raxwo_user', JSON.stringify(adminUser));
      setSuccess('Welcome back, Super Administrator!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(adminUser);
        onClose();
      }, 500);
      setLoading(false);
      return;
    }

    if (email === 'sales@raxwo.lk') {
      const salesUser = {
        id: 'sales_demo_02',
        name: 'Sales Manager',
        email: 'sales@raxwo.lk',
        role: 'sales_admin',
        company: 'Raxwo Enterprise Sales'
      };
      localStorage.setItem('raxwo_token', 'demo_sales_jwt_token_2026');
      localStorage.setItem('raxwo_user', JSON.stringify(salesUser));
      setSuccess('Welcome back, Sales Manager!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(salesUser);
        onClose();
      }, 500);
      setLoading(false);
      return;
    }

    if (email === 'buyer@raxwo.lk') {
      const buyerUser = {
        id: 'buyer_demo_03',
        name: 'Sample Buyer',
        email: 'buyer@raxwo.lk',
        role: 'buyer',
        company: 'Lanka Retail Mart'
      };
      localStorage.setItem('raxwo_token', 'demo_buyer_jwt_token_2026');
      localStorage.setItem('raxwo_user', JSON.stringify(buyerUser));
      setSuccess('Welcome back, Sample Buyer!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(buyerUser);
        onClose();
      }, 500);
      setLoading(false);
      return;
    }

    // Standard backend call
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Backend server is starting up. Please try again in a moment.');
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('raxwo_token', data.token);
      localStorage.setItem('raxwo_user', JSON.stringify(data.user));

      setSuccess(`Welcome back, ${data.user.name}!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
        onClose();
      }, 500);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      performLogin(formData.email, formData.password);
    } else {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || 'Registration failed');

        localStorage.setItem('raxwo_token', data.token);
        localStorage.setItem('raxwo_user', JSON.stringify(data.user));

        setSuccess(`Account created! Welcome, ${data.user.name}!`);
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(data.user);
          onClose();
        }, 500);
      } catch (err) {
        setError(err.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl border p-6 sm:p-8 overflow-hidden transition-all ${
        isDark ? 'bg-[#0b0f19] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-xl transition-colors ${
            isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/15 text-blue-400 border border-blue-500/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Raxwo Enterprise Security
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create Buyer Account'}
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {mode === 'login' 
              ? 'Access purchased licenses, live sandbox, and invoices.' 
              : 'Free access to catalog, demo environments & order history.'}
          </p>
        </div>

        {/* Quick Demo Credentials Tabs (All in crisp Blue) */}
        {mode === 'login' && (
          <div className="mb-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-2">
              ⚡ Instant 1-Click Login:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin@raxwo.lk', 'Admin@12345')}
                className="px-2 py-1.5 text-xs rounded-lg font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('sales@raxwo.lk', 'Sales@12345')}
                className="px-2 py-1.5 text-xs rounded-lg font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer"
              >
                Sales CRM
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('buyer@raxwo.lk', 'Buyer@12345')}
                className="px-2 py-1.5 text-xs rounded-lg font-semibold bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer"
              >
                Sample Buyer
              </button>
            </div>
          </div>
        )}

        {/* Feedback messages */}
        {error && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl text-xs bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Nimal Perera"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? 'bg-slate-900/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="admin@raxwo.lk"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-900/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Password *</label>
            <div className="relative">
              <Lock className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="0771234567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-900/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Company</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Perera Motors"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark ? 'bg-slate-900/90 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Primary Action Button: Solid Blue */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div className="mt-5 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className="text-blue-400 hover:underline font-semibold"
              >
                Create one now (Free)
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className="text-blue-400 hover:underline font-semibold"
              >
                Sign In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
