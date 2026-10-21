import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, MessageSquare, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { getTranslation } from '../i18n/translations';

export default function ContactSection({ 
  onSubmitInquiry, 
  isSubmitting, 
  contactSuccess, 
  inquiryResult,
  theme = 'dark',
  lang = 'en'
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: 'Retail & POS',
    requirements: ''
  });

  const isDark = theme === 'dark';
  const t = (k) => getTranslation(lang, k);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onSubmitInquiry(formData);
  };

  return (
    <section id="contact" className={`relative w-full py-16 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 border-t overflow-hidden ${
      isDark ? 'border-slate-800/80 bg-[#080b18]' : 'border-slate-200 bg-slate-50/70'
    }`}>
      


      {/* Main Centered Container with strict responsive bounds */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t('letsTalkTitle')}
          </h2>

          <p className={`text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('letsTalkSubtitle')}
          </p>
        </div>

        {/* 2-Column Responsive Layout (100% Mobile & Desktop Safe, Zero Horizontal Overflow) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 w-full min-w-0 flex flex-col justify-between gap-4">
            
            {/* Card 1: WhatsApp & Phone */}
            <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
              isDark 
                ? 'bg-[#0a0f24]/95 border-slate-800 shadow-xl hover:border-emerald-500/50' 
                : 'bg-white border-slate-200/90 shadow-md hover:shadow-xl hover:border-emerald-500/50'
            }`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      WhatsApp &amp; Direct Phone
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">
                      Active
                    </span>
                  </div>
                  <span className={`text-base sm:text-lg font-black tracking-tight block mt-1 break-words ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    +94 77 123 4567 / +94 11 234 5678
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5 mt-3.5">
                    <a
                      href="https://wa.me/94771234567?text=Hello%20Raxwo%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20software."
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                    <a
                      href="tel:+94112345678"
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isDark 
                          ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' 
                          : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Office</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Email & Official Proposals */}
            <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
              isDark 
                ? 'bg-[#0a0f24]/95 border-slate-800 shadow-xl hover:border-purple-500/50' 
                : 'bg-white border-slate-200/90 shadow-md hover:shadow-xl hover:border-purple-500/50'
            }`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold uppercase tracking-wider block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email Inquiries &amp; RFP
                  </span>
                  <span className={`text-sm sm:text-base font-black block mt-1 break-words ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    sales@raxwo.lk / support@raxwo.lk
                  </span>
                  <div className="mt-3">
                    <a
                      href="mailto:sales@raxwo.lk?subject=Raxwo%20ERP%20Software%20Inquiry"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isDark 
                          ? 'bg-purple-950/40 text-purple-300 border-purple-800/60 hover:bg-purple-900/60' 
                          : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      <span>Send Official Email</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Colombo HQ & Lab */}
            <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
              isDark 
                ? 'bg-[#0a0f24]/95 border-slate-800 shadow-xl hover:border-cyan-500/50' 
                : 'bg-white border-slate-200/90 shadow-md hover:shadow-xl hover:border-cyan-500/50'
            }`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold uppercase tracking-wider block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Colombo Hardware Test Lab &amp; HQ
                  </span>
                  <span className={`text-xs sm:text-sm font-semibold leading-relaxed block mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Level 05, Raxwo Tech Tower, Galle Road, Colombo 03, Sri Lanka
                  </span>
                  <div className="mt-3">
                    <a
                      href="https://maps.google.com/?q=Galle+Road+Colombo+03+Sri+Lanka"
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isDark 
                          ? 'bg-cyan-950/40 text-cyan-300 border-cyan-800/60 hover:bg-cyan-900/60' 
                          : 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100'
                      }`}
                    >
                      <span>Open Location in Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation & Request Form (7 Cols) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className={`p-6 sm:p-9 rounded-3xl border shadow-2xl relative ${
              isDark ? 'bg-[#0a0f24]/95 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className={`text-xl sm:text-2xl font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Request Live ERP Demo &amp; Quotation
              </h3>
              <p className={`text-xs sm:text-sm mb-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Fill in your details. We will set up a customized live demo with your shop's item categories and hardware within 15 minutes.
              </p>

              {contactSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center text-center gap-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400" />
                  <h4 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>Inquiry Received Successfully!</h4>
                  <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {inquiryResult?.message || "Thank you! Our technical specialist will contact your phone number within 15 minutes."}
                  </p>
                  <span className="text-xs text-emerald-500 font-mono font-bold mt-1">
                    Reference: {inquiryResult?.inquiryId}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        {t('yourName')} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nimal Perera / Perera Stores"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        {t('phoneWhatsApp')} *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 077 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        {t('emailAddress')}
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. nimal@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        {t('selectSolution')}
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white' 
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Retail & POS" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Retail Store &amp; POS (LankaPOS)</option>
                        <option value="Mobile Shop & Repair" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Mobile Shop &amp; Repair (Mobixa)</option>
                        <option value="Wholesale & Van Sale" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Wholesale &amp; Van Distribution (Exxplan)</option>
                        <option value="Restaurant & Cafe" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Restaurant &amp; Cafe POS (DineFlow)</option>
                        <option value="Pharmacy & Healthcare" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Pharmacy &amp; Clinic (PharmaCare)</option>
                        <option value="Garment & Apparel" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Garment &amp; Apparel (StitchERP)</option>
                        <option value="Automotive & Spare Parts" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Auto Spares &amp; Garage (GearMaster)</option>
                        <option value="Hotel & Resort" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Hotel &amp; Resort PMS (VillaStay)</option>
                        <option value="Hardware & Paint" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Hardware &amp; Construction (BuildTrack)</option>
                        <option value="Fitness & Gym" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Fitness &amp; Biometrics (Gymora)</option>
                        <option value="Other Custom ERP" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Custom Tailored ERP Architecture</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="min-w-0">
                    <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      {t('yourMessage')}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={lang === 'si' ? 'ඔබගේ අවශ්‍යතාවය, පරිගණක ප්‍රමාණය හෝ ශාඛා ගණන මෙහි සඳහන් කරන්න...' : 'Tell us about how many branches, thermal printers, barcode scanners, or special features you need...'}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                      }`}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{isSubmitting ? (lang === 'si' ? 'යොමු වෙමින් පවතී...' : 'Submitting to Engineers...') : t('sendInquiry')}</span>
                  </button>

                  <div className="flex flex-wrap items-center justify-between text-[11px] pt-1 gap-2">
                    <span className={`inline-flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      Direct engineer response. No pushy sales calls.
                    </span>
                    <span className="text-emerald-500 font-bold">
                      Avg Response: 12 Mins
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
