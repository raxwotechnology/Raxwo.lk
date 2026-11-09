import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, theme = 'dark' }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    referralCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Main Card Container (Matches Reference Photos) */}
      <div className="relative w-full max-w-[460px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl text-slate-900 border border-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Tab Switcher */}
        <div className="bg-[#f0f4f9] p-1.5 rounded-2xl flex items-center mb-6 mr-8 sm:mr-0">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl text-center font-bold text-sm sm:text-base transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white border-2 border-[#0062ff] text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl text-center font-bold text-sm sm:text-base transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white border-2 border-[#0062ff] text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0a0827] tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create Account'}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {mode === 'login' ? 'Sign in to your portal' : 'Register as a client to get started'}
          </p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl text-xs bg-red-50 text-red-600 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl text-xs bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign Up: Full Name */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1e293b] mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3">
                <User className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#1e293b] mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center bg-[#eaf2fc] rounded-xl px-3.5 py-3">
              <Mail className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-[#1e293b] mb-1.5">
              Password
            </label>
            <div className="relative flex items-center bg-[#eaf2fc] rounded-xl px-3.5 py-3">
              <Lock className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 shrink-0 ml-2 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign In: Forgot Password link */}
          {mode === 'login' && (
            <div className="text-right !mt-1.5 !mb-5">
              <button
                type="button"
                onClick={() => setError('Password reset instructions will be sent to your email.')}
                className="text-xs sm:text-sm text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Sign Up: Referral Code (optional) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1e293b] mb-1.5">
                Referral Code <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3">
                <input
                  type="text"
                  name="referralCode"
                  placeholder="Enter referral code"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Action Button: Dark Navy */}
          <button
            type="submit"
            disabled={loading}
            className="w-full !mt-6 py-3.5 sm:py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-[#0a0827] hover:bg-[#151241] active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Switch Link */}
        <div className="mt-6 text-center text-xs sm:text-sm text-slate-500">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                className="text-[#0094ff] hover:underline font-semibold cursor-pointer"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className="text-[#0094ff] hover:underline font-semibold cursor-pointer"
              >
                Sign in
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
