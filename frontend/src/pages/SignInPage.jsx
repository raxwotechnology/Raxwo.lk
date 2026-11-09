import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  AlertCircle,
  Eye, 
  EyeOff
} from 'lucide-react';

export default function SignInPage({ 
  onLoginSuccess, 
  onBackToHome, 
  theme = 'dark',
  lang = 'en'
}) {
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

  const isDark = theme === 'dark';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
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
      setSuccess('Authenticated as Super Administrator. Redirecting...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(adminUser);
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
      setSuccess('Authenticated as Sales Manager. Redirecting...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(salesUser);
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
      setSuccess('Welcome back, Sample Buyer! Redirecting...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(buyerUser);
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
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Invalid credentials');

      localStorage.setItem('raxwo_token', data.token);
      localStorage.setItem('raxwo_user', JSON.stringify(data.user));

      setSuccess(`Welcome back, ${data.user.name}!`);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
      }, 500);
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
        }, 500);
      } catch (err) {
        setError(err.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`w-full min-h-[90vh] py-8 sm:py-12 px-4 sm:px-6 flex flex-col justify-center items-center transition-colors ${
      isDark ? 'text-white' : 'text-slate-900'
    }`}>
      
      {/* Top Bar: Back to Home Button */}
      {onBackToHome && (
        <div className="max-w-[460px] w-full mb-6">
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
              isDark 
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'si' ? 'නැවත මුල් පිටුවට' : lang === 'ta' ? 'மீண்டும் முகப்பிற்கு' : 'Back to Marketplace'}</span>
          </button>
        </div>
      )}

      {/* Main Card Container (Matches Reference Photos) */}
      <div className="w-full max-w-[460px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl text-slate-900 border border-slate-100">
        
        {/* Top Tab Switcher */}
        <div className="bg-[#f0f4f9] p-1.5 rounded-2xl flex items-center mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl text-center font-bold text-sm sm:text-base transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white border-2 border-[#0062ff] text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'si' ? 'ඇතුල් වන්න' : lang === 'ta' ? 'உள்நுழைக' : 'Sign In'}
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
            {lang === 'si' ? 'ලියාපදිංචි වන්න' : lang === 'ta' ? 'பதிவு செய்க' : 'Sign Up'}
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0a0827] tracking-tight">
            {mode === 'login' 
              ? (lang === 'si' ? 'නැවත සාදරයෙන් පිළිගනිමු' : lang === 'ta' ? 'மீண்டும் வருக' : 'Welcome back') 
              : (lang === 'si' ? 'ගිණුමක් සාදන්න' : lang === 'ta' ? 'கணக்கை உருவாக்கவும்' : 'Create Account')}
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            {mode === 'login' 
              ? (lang === 'si' ? 'ඔබගේ පද්ධතියට ඇතුල් වන්න' : lang === 'ta' ? 'உங்கள் போர்ட்டலில் உள்நுழையவும்' : 'Sign in to your portal') 
              : (lang === 'si' ? 'සේවාදායකයෙකු ලෙස ලියාපදිංචි වන්න' : lang === 'ta' ? 'தொடங்குவதற்கு பதிவு செய்யவும்' : 'Register as a client to get started')}
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
                {lang === 'si' ? 'සම්පූර්ණ නම' : lang === 'ta' ? 'முழுப் பெயர்' : 'Full Name'}
              </label>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3">
                <User className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={lang === 'si' ? 'ඔබගේ සම්පූර්ණ නම' : lang === 'ta' ? 'உங்கள் முழுப் பெயர்' : 'Your full name'}
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
              {lang === 'si' ? 'විද්‍යුත් තැපෑල (Email)' : lang === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
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
              {lang === 'si' ? 'මුරපදය (Password)' : lang === 'ta' ? 'கடவுச்சொல்' : 'Password'}
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
                onClick={() => setError(lang === 'si' ? 'මුරපදය නැවත සැකසීමේ උපදෙස් ඔබගේ ඊමේල් ලිපිනයට එවනු ලැබේ.' : lang === 'ta' ? 'கடவுச்சொல் மீட்டமைப்பு வழிமுறைகள் உங்கள் மின்னஞ்சலுக்கு அனுப்பப்படும்.' : 'Password reset instructions will be sent to your email.')}
                className="text-xs sm:text-sm text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
              >
                {lang === 'si' ? 'මුරපදය අමතකද?' : lang === 'ta' ? 'கடவுச்சொல் மறந்துவிட்டதா?' : 'Forgot password?'}
              </button>
            </div>
          )}

          {/* Sign Up: Referral Code (optional) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1e293b] mb-1.5">
                {lang === 'si' ? 'යොමු කේතය (Referral Code)' : lang === 'ta' ? 'பரிந்துரை குறியீடு' : 'Referral Code'} <span className="text-slate-400 font-normal">({lang === 'si' ? 'විකල්ප' : lang === 'ta' ? 'விருப்பத்தேர்வு' : 'optional'})</span>
              </label>
              <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-3">
                <input
                  type="text"
                  name="referralCode"
                  placeholder={lang === 'si' ? 'යොමු කේතය ඇතුළත් කරන්න' : lang === 'ta' ? 'பரிந்துரை குறியீட்டை உள்ளிடவும்' : 'Enter referral code'}
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
                <span>
                  {mode === 'login' 
                    ? (lang === 'si' ? 'ඇතුල් වන්න' : lang === 'ta' ? 'உள்நுழைக' : 'Sign In') 
                    : (lang === 'si' ? 'ගිණුම සාදන්න' : lang === 'ta' ? 'கணக்கை உருவாக்கவும்' : 'Create Account')}
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Switch Link */}
        <div className="mt-6 text-center text-xs sm:text-sm text-slate-500">
          {mode === 'login' ? (
            <span>
              {lang === 'si' ? 'ගිණුමක් නැද්ද? ' : lang === 'ta' ? 'கணக்கு இல்லையா? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                className="text-[#0094ff] hover:underline font-semibold cursor-pointer"
              >
                {lang === 'si' ? 'ලියාපදිංචි වන්න' : lang === 'ta' ? 'பதிவு செய்க' : 'Sign up'}
              </button>
            </span>
          ) : (
            <span>
              {lang === 'si' ? 'දැනටමත් ගිණුමක් තිබේද? ' : lang === 'ta' ? 'ஏற்கனவே கணக்கு உள்ளதா? ' : 'Already have an account? '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                className="text-[#0094ff] hover:underline font-semibold cursor-pointer"
              >
                {lang === 'si' ? 'ඇතුල් වන්න' : lang === 'ta' ? 'உள்நுழைக' : 'Sign in'}
              </button>
            </span>
          )}
        </div>

      </div>

    </div>
  );
}
