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

    const normalizedEmail = (email || '').toLowerCase().trim();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password })
      });

      let data = null;
      try {
        data = await res.json();
      } catch (jsonErr) {}

      if (res.ok && data && data.success) {
        localStorage.setItem('raxwo_token', data.token);
        localStorage.setItem('raxwo_user', JSON.stringify(data.user));
        setSuccess(`Welcome back, ${data.user.name}!`);
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(data.user);
          if (onClose) onClose();
        }, 500);
        return;
      }

      if (data && data.message) {
        throw new Error(data.message);
      }
    } catch (networkErr) {
      if (networkErr.message && !networkErr.message.includes('fetch') && !networkErr.message.includes('JSON')) {
        setError(networkErr.message);
        setLoading(false);
        return;
      }
    }

    // Demo admin and offline resilient login
    if (normalizedEmail === 'admin@raxwo.lk' && password === 'Admin@12345') {
      const adminUser = {
        id: 'usr_admin',
        name: 'Super Administrator',
        email: 'admin@raxwo.lk',
        role: 'super_admin',
        company: 'Raxwo Next Level Tech'
      };
      localStorage.setItem('raxwo_token', `token_admin_${Date.now()}`);
      localStorage.setItem('raxwo_user', JSON.stringify(adminUser));
      setSuccess('Welcome back, Super Administrator!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(adminUser);
        if (onClose) onClose();
      }, 500);
      setLoading(false);
      return;
    }

    if (normalizedEmail === 'buyer@raxwo.lk' && password === 'Buyer@12345') {
      const buyerUser = {
        id: 'usr_buyer',
        name: 'Sample Buyer',
        email: 'buyer@raxwo.lk',
        role: 'buyer',
        company: 'Lanka Retail Mart'
      };
      localStorage.setItem('raxwo_token', `token_buyer_${Date.now()}`);
      localStorage.setItem('raxwo_user', JSON.stringify(buyerUser));
      setSuccess('Welcome back, Sample Buyer!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(buyerUser);
        if (onClose) onClose();
      }, 500);
      setLoading(false);
      return;
    }

    // Locally registered accounts fallback
    try {
      const savedUsers = JSON.parse(localStorage.getItem('raxwo_registered_users') || '[]');
      const match = savedUsers.find(u => u.email === normalizedEmail && u.password === password);
      if (match) {
        const localUser = {
          id: match.id,
          name: match.name,
          email: match.email,
          role: match.role || 'buyer',
          company: match.company || 'Client Account'
        };
        localStorage.setItem('raxwo_token', `token_${Date.now()}`);
        localStorage.setItem('raxwo_user', JSON.stringify(localUser));
        setSuccess(`Welcome back, ${localUser.name}!`);
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(localUser);
          if (onClose) onClose();
        }, 500);
        setLoading(false);
        return;
      }
    } catch (e) {}

    setError('Invalid email or password. Please verify credentials or start the backend server.');
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      performLogin(formData.email, formData.password);
    } else {
      setLoading(true);
      setError('');
      const normalizedEmail = (formData.email || '').toLowerCase().trim();

      let registeredUser = null;
      let registeredToken = null;

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: normalizedEmail,
            password: formData.password,
            referralCode: formData.referralCode
          })
        });

        let data = null;
        try {
          data = await res.json();
        } catch (jsonErr) {}

        if (res.ok && data && data.success) {
          registeredUser = data.user;
          registeredToken = data.token;
        } else if (data && data.message) {
          throw new Error(data.message);
        }
      } catch (networkErr) {
        if (networkErr.message && !networkErr.message.includes('fetch') && !networkErr.message.includes('JSON')) {
          setError(networkErr.message);
          setLoading(false);
          return;
        }
      }

      if (registeredUser && registeredToken) {
        localStorage.setItem('raxwo_token', registeredToken);
        localStorage.setItem('raxwo_user', JSON.stringify(registeredUser));
        setSuccess(`Account created! Welcome, ${registeredUser.name}!`);
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(registeredUser);
          if (onClose) onClose();
        }, 500);
        setLoading(false);
        return;
      }

      // Offline resilient registration
      const newUserId = `usr_${Date.now()}`;
      const newUser = {
        id: newUserId,
        _id: newUserId,
        name: formData.name.trim(),
        email: normalizedEmail,
        role: 'buyer',
        company: 'Client Account'
      };

      try {
        const savedUsers = JSON.parse(localStorage.getItem('raxwo_registered_users') || '[]');
        if (savedUsers.some(u => u.email === normalizedEmail)) {
          setError('An account with this email already exists.');
          setLoading(false);
          return;
        }
        savedUsers.push({
          id: newUserId,
          name: formData.name.trim(),
          email: normalizedEmail,
          password: formData.password,
          role: 'buyer',
          company: 'Client Account'
        });
        localStorage.setItem('raxwo_registered_users', JSON.stringify(savedUsers));
      } catch (e) {}

      localStorage.setItem('raxwo_token', `token_${Date.now()}`);
      localStorage.setItem('raxwo_user', JSON.stringify(newUser));

      setSuccess(`Account created! Welcome, ${newUser.name}!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(newUser);
        if (onClose) onClose();
      }, 500);
      setLoading(false);
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

        {/* Quick Demo Credentials */}
        {mode === 'login' && (
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-medium mb-1.5">Quick Sign-In Demo Accounts:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, email: 'admin@raxwo.lk', password: 'Admin@12345' }));
                  setError('');
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-[#0094ff] hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
              >
                Super Admin (admin@raxwo.lk)
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, email: 'buyer@raxwo.lk', password: 'Buyer@12345' }));
                  setError('');
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
              >
                Buyer (buyer@raxwo.lk)
              </button>
            </div>
          </div>
        )}

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
