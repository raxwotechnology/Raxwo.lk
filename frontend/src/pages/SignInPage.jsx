import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Building, 
  Phone, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Check,
  Star
} from 'lucide-react';

export default function SignInPage({ 
  onLoginSuccess, 
  onBackToHome, 
  theme = 'dark' 
}) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    company: ''
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isDark = theme === 'dark';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleQuickDemoLogin = (email, password) => {
    setFormData(prev => ({ ...prev, email, password }));
    setMode('login');
    performLogin(email, password);
  };

  const performLogin = async (email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');

    // Pre-configured instant demo profiles for zero-friction access
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
      setSuccess('Authenticated as Super Administrator. Redirecting to workspace...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(adminUser);
      }, 600);
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
      setSuccess('Authenticated as Sales Manager. Redirecting to workspace...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(salesUser);
      }, 600);
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
      setSuccess('Welcome back, Sample Buyer! Redirecting...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(buyerUser);
      }, 600);
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
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid credentials');

      localStorage.setItem('raxwo_token', data.token);
      localStorage.setItem('raxwo_user', JSON.stringify(data.user));

      setSuccess(`Welcome back, ${data.user.name}!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
      }, 600);
    } catch (err) {
      setError(err.message || 'Login failed. Please verify email and password.');
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
        }, 600);
      } catch (err) {
        setError(err.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`w-full min-h-[90vh] py-8 sm:py-12 px-6 sm:px-10 lg:px-16 xl:px-20 flex flex-col justify-center transition-colors ${
      isDark ? 'text-white' : 'text-slate-900'
    }`}>
      
      {/* Top Bar: Back to Home Button */}
      <div className="max-w-6xl mx-auto w-full mb-8">
        <button
          onClick={onBackToHome}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
            isDark 
              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' 
              : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      {/* Main Split Layout Container */}
      <div className={`max-w-6xl mx-auto w-full rounded-3xl border shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${
        isDark 
          ? 'bg-[#0a0f22]/95 border-slate-800/90' 
          : 'bg-white border-slate-200'
      }`}>
        
        {/* LEFT COLUMN: Visual Brand & Benefits Showcase (5 Cols) */}
        <div className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-[#0c1432] via-[#090e24] to-[#060a17] border-slate-800/80 text-white' 
            : 'bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 border-slate-200 text-white'
        }`}>
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* Brand Logo */}
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/raxwo-logo.png" 
                alt="RAXWO NEXT LEVEL TECH" 
                className="h-9 w-auto object-contain" 
              />
            </div>

            <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400/30 inline-block mb-4">
              ENTERPRISE AUTHENTICATION
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
              One Secure Account. Complete Software Freedom.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
              Sign in to manage your purchased ERP packages, download unminified source code, launch interactive sandbox terminals, and generate official VAT invoices.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-3.5 mb-8">
              {[
                { title: 'Full Source Code Access', desc: 'Direct Git repositories and zip bundles.' },
                { title: 'No Recurring Seat Taxes', desc: 'Pay once, own forever with zero penalties.' },
                { title: 'Live Sandbox & Staging', desc: 'Test POS updates safely in simulated counters.' },
                { title: 'Commercial VAT Invoicing', desc: 'RAMIS compliant official receipts & audit logs.' }
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                    <p className="text-[11px] text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-md">
            <div className="flex items-center gap-1 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-200 italic">
              "Raxwo Mobixa transformed our 3 mobile branches. Having full source code ownership gave our business complete peace of mind."
            </p>
            <span className="text-[11px] font-bold text-cyan-300 block mt-2">
              — Perera Mobile Hub, Colombo 03
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Form & 1-Click Demo Profiles (7 Cols) */}
        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between">
          
          <div>
            {/* Switch Tabs (Sign In vs Register) */}
            <div className={`flex items-center p-1 rounded-2xl mb-8 border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create New Account
              </button>
            </div>

            {/* Header info */}
            <div className="mb-6">
              <h3 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {mode === 'login' ? 'Welcome Back' : 'Create Your Buyer Account'}
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {mode === 'login' 
                  ? 'Enter your credentials or choose a 1-click demo profile below.' 
                  : 'Get immediate access to product source codes and order tracking.'}
              </p>
            </div>

            {/* 1-Click Instant Demo Login Profiles (for testing and showcase) */}
            {mode === 'login' && (
              <div className={`mb-6 p-4 rounded-2xl border ${
                isDark ? 'bg-[#0f152d]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant 1-Click Demo Profiles</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Click to Auto-Login</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  
                  {/* Profile 1: Super Admin */}
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin@raxwo.lk', 'Admin@12345')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer group hover:scale-[1.02] ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-700/80 hover:border-blue-500' 
                        : 'bg-white border-slate-200 hover:border-blue-500 shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 block w-max mb-1">
                      Full Access
                    </span>
                    <span className={`text-xs font-bold block group-hover:text-blue-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Super Admin
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Backoffice &amp; Catalog
                    </span>
                  </button>

                  {/* Profile 2: Sales Manager */}
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('sales@raxwo.lk', 'Sales@12345')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer group hover:scale-[1.02] ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-700/80 hover:border-indigo-500' 
                        : 'bg-white border-slate-200 hover:border-indigo-500 shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 block w-max mb-1">
                      CRM &amp; Quotes
                    </span>
                    <span className={`text-xs font-bold block group-hover:text-indigo-400 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Sales Manager
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Leads &amp; Invoices
                    </span>
                  </button>

                  {/* Profile 3: Sample Buyer */}
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('buyer@raxwo.lk', 'Buyer@12345')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer group hover:scale-[1.02] ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-500' 
                        : 'bg-white border-slate-200 hover:border-emerald-500 shadow-sm'
                    }`}
                  >
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 block w-max mb-1">
                      Customer
                    </span>
                    <span className={`text-xs font-bold block group-hover:text-emerald-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Sample Buyer
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Orders &amp; Licenses
                    </span>
                  </button>

                </div>
              </div>
            )}

            {/* Error & Success Feedback Alerts */}
            {error && (
              <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-2xl text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-2xl text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'register' && (
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Nimal Perera"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Work or Personal Email *
                </label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Password *
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link will be sent to your email.')}
                      className="text-xs font-medium text-blue-500 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="Enter at least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-11 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      isDark 
                        ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Phone (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="077 123 4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Company / Store Name
                    </label>
                    <div className="relative">
                      <Building className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                      <input
                        type="text"
                        name="company"
                        placeholder="Perera Stores"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Remember Me Checkbox */}
              {mode === 'login' && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className={`text-xs cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Keep me signed in on this device
                  </label>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Your Workspace' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Bottom Security Note */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit TLS Secure Encryption</span>
              </span>
              <span>Sri Lanka Business Compliant</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
