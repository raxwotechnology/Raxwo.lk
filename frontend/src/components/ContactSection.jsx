import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
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
          <h2 className={`text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight ${
            isDark ? 'text-white' : 'text-[#0a0827]'
          }`}>
            Raxwo
          </h2>

          <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0094ff] tracking-tight mt-1 mb-4">
            {lang === 'si' ? 'ඔබගේ ව්‍යාපාරික අවශ්‍යතා සාකච්ඡා කරන්න' : lang === 'ta' ? 'உங்கள் வணிகத் தேவைகளைப் பற்றி விவாதிக்கவும்' : 'Discuss Your Business Requirements'}
          </h3>

          <p className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {lang === 'si' ? (
              <>
                ඔබගේ <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>ව්‍යාපෘතිය, ව්‍යාපාරික අවශ්‍යතා, ඉලක්ක සහ අභියෝග</strong> අපට කියන්න. අපගේ කණ්ඩායම ඔබගේ අවශ්‍යතා හඳුනාගෙන ඔබගේ ව්‍යාපාරයට වඩාත් සුදුසු තාක්ෂණය සහ ඩිජිටල් විසඳුම නිර්දේශ කරනු ඇත.
              </>
            ) : lang === 'ta' ? (
              <>
                உங்கள் <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>திட்டம், வணிகத் தேவைகள், இலக்குகள் மற்றும் சவால்கள்</strong> பற்றி எங்களிடம் கூறுங்கள். எங்கள் குழு உங்கள் தேவைகளைப் புரிந்து கொண்டு உங்கள் வணிகத்திற்கான சரியான தொழில்நுட்ப தீர்வை பரிந்துரைக்கும்.
              </>
            ) : (
              <>
                Tell us about <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>your project, business requirements, goals, and challenges</strong>. Our team will understand your needs and recommend the right technology and digital solution for your business.
              </>
            )}
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
                      {lang === 'si' ? 'WhatsApp සහ සෘජු ඇමතුම්' : lang === 'ta' ? 'WhatsApp & நேரடி தொலைபேசி' : 'WhatsApp & Direct Phone'}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">
                      {lang === 'si' ? 'ක්‍රියාකාරීයි' : lang === 'ta' ? 'செயலில் உள்ளது' : 'Active'}
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
                      <span>{lang === 'si' ? 'WhatsApp සංවාදය' : lang === 'ta' ? 'WhatsApp அரட்டை' : 'WhatsApp Chat'}</span>
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
                      <span>{lang === 'si' ? 'කාර්යාලය අමතන්න' : lang === 'ta' ? 'அழைக்கவும்' : 'Call Office'}</span>
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
                    {lang === 'si' ? 'විද්‍යුත් තැපැල් විමසීම් සහ යෝජනා' : lang === 'ta' ? 'மின்னஞ்சல் விசாரணைகள்' : 'Email Inquiries & RFP'}
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
                      <span>{lang === 'si' ? 'ඊමේල් පණිවිඩයක් එවන්න' : lang === 'ta' ? 'மின்னஞ்சல் அனுப்பவும்' : 'Send Official Email'}</span>
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
                    {lang === 'si' ? 'කොළඹ ප්‍රධාන කාර්යාලය සහ විද්‍යාගාරය' : lang === 'ta' ? 'கொழும்பு தலைமையகம் & ஆய்வகம்' : 'Colombo Hardware Test Lab & HQ'}
                  </span>
                  <span className={`text-xs sm:text-sm font-semibold leading-relaxed block mt-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {lang === 'si' ? 'ලෙවල් 05, Raxwo ටෙක් ටවර්, ගාලු පාර, කොළඹ 03, ශ්‍රී ලංකාව' : lang === 'ta' ? 'நிலை 05, Raxwo டெக் டவர், காலி வீதி, கொழும்பு 03, இலங்கை' : 'Level 05, Raxwo Tech Tower, Galle Road, Colombo 03, Sri Lanka'}
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
                      <span>{lang === 'si' ? 'සිතියමෙන් බලන්න' : lang === 'ta' ? 'வரைபடத்தில் காண்க' : 'Open Location in Maps'}</span>
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
                {lang === 'si' ? 'සජීවී ආදර්ශනයක් සහ මිල ඇස්තමේන්තුවක් ලබාගන්න' : lang === 'ta' ? 'நேரடி மாதிரி மற்றும் மேற்கோளைக் கோரவும்' : 'Request Live ERP Demo & Quotation'}
              </h3>
              <p className={`text-xs sm:text-sm mb-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {lang === 'si' 
                  ? 'ඔබගේ විස්තර ඇතුළත් කරන්න. විනාඩි 15ක් ඇතුළත ඔබගේ ව්‍යාපාරයට ගැළපෙන පරිදි සජීවී ආදර්ශනයක් සූදානම් කර දෙනු ලැබේ.' 
                  : lang === 'ta' 
                  ? 'உங்கள் விவரங்களை நிரப்பவும். 15 நிமிடங்களுக்குள் உங்கள் வணிகத்திற்கு ஏற்ற நேரடி மாதிரியை நாங்கள் அமைப்போம்.' 
                  : "Fill in your details. We will set up a customized live demo with your shop's item categories and hardware within 15 minutes."}
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
                        placeholder={lang === 'si' ? 'උදා: නිමල් පෙරේරා / පෙරේරා ස්ටෝර්ස්' : lang === 'ta' ? 'எ.கா: நிமல் பெரேரா / ஸ்டோர்ஸ்' : 'e.g. Nimal Perera / Perera Stores'}
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
                        <option value="Retail & POS" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'සිල්ලර වෙළඳාම සහ POS' : lang === 'ta' ? 'சில்லறை & POS' : 'Retail Store & POS (LankaPOS)'}
                        </option>
                        <option value="Mobile Shop & Repair" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'ජංගම දුරකථන සහ අලුත්වැඩියා' : lang === 'ta' ? 'மொபைல் விற்பனை மற்றும் பழுது' : 'Mobile Shop & Repair (Mobixa)'}
                        </option>
                        <option value="Wholesale & Van Sale" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'තොග සහ වෑන් රථ අලෙවිය' : lang === 'ta' ? 'மொத்த விற்பனை மற்றும் விநியோகம்' : 'Wholesale & Van Distribution (Exxplan)'}
                        </option>
                        <option value="Restaurant & Cafe" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'ආපනශාලා සහ කැෆේ' : lang === 'ta' ? 'உணவகம் மற்றும் கஃபே' : 'Restaurant & Cafe POS (DineFlow)'}
                        </option>
                        <option value="Pharmacy & Healthcare" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'ඖෂධසල් සහ සායන' : lang === 'ta' ? 'மருந்தகம் மற்றும் சுகாதாரப் பராமரிப்பு' : 'Pharmacy & Clinic (PharmaCare)'}
                        </option>
                        <option value="Garment & Apparel" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'ඇඟලුම් සහ රෙදිපිළි' : lang === 'ta' ? 'ஆடை மற்றும் ஆடை வடிவமைப்பு' : 'Garment & Apparel (StitchERP)'}
                        </option>
                        <option value="Automotive & Spare Parts" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'මෝටර් රථ සහ අමතර කොටස්' : lang === 'ta' ? 'வாகன மற்றும் உதிரி பாகங்கள்' : 'Auto Spares & Garage (GearMaster)'}
                        </option>
                        <option value="Hotel & Resort" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'හෝටල් සහ නිවාඩු නිකේතන' : lang === 'ta' ? 'ஹோட்டல் & ரிசார்ட்' : 'Hotel & Resort PMS (VillaStay)'}
                        </option>
                        <option value="Hardware & Paint" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'දෘඩාංග සහ තීන්ත' : lang === 'ta' ? 'வன்பொருள் மற்றும் வர்ணம்' : 'Hardware & Construction (BuildTrack)'}
                        </option>
                        <option value="Fitness & Gym" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'ශාරීරික සුවතා සහ ජිම්' : lang === 'ta' ? 'உடற்தகுதி மற்றும் உடற்பயிற்சிக்கூடம்' : 'Fitness & Biometrics (Gymora)'}
                        </option>
                        <option value="Other Custom ERP" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {lang === 'si' ? 'වෙනත් විශේෂිත ERP පද්ධති' : lang === 'ta' ? 'பிற தனிப்பயன் ERP' : 'Custom Tailored ERP Architecture'}
                        </option>
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
                      placeholder={lang === 'si' ? 'ඔබගේ අවශ්‍යතාවය, පරිගණක ප්‍රමාණය හෝ ශාඛා ගණන මෙහි සඳහන් කරන්න...' : lang === 'ta' ? 'கிளைகள், பிரிண்டர்கள் அல்லது உங்களுக்கு தேவையான சிறப்பு அம்சங்களை விவரிக்கவும்...' : 'Tell us about how many branches, thermal printers, barcode scanners, or special features you need...'}
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
                    className="w-full py-4 rounded-2xl font-black text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{isSubmitting ? (lang === 'si' ? 'යොමු වෙමින් පවතී...' : lang === 'ta' ? 'சமர்ப்பிக்கப்படுகிறது...' : 'Submitting to Engineers...') : t('sendInquiry')}</span>
                  </button>

                  <div className="flex flex-wrap items-center justify-between text-[11px] pt-1 gap-2">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      {lang === 'si' ? '🔒 ඉංජිනේරුවන්ගෙන් සෘජු ප්‍රතිචාර. අනවශ්‍ය කරදරකාරී ඇමතුම් නැත.' : lang === 'ta' ? '🔒 பொறியாளர்களிடமிருந்து நேரடி பதில். தேவையற்ற அழைப்புகள் இல்லை.' : '🔒 Direct engineer response. No pushy sales calls.'}
                    </span>
                    <span className="text-emerald-500 font-bold">
                      {lang === 'si' ? 'සාමාන්‍ය ප්‍රතිචාර කාලය: මිනිත්තු 12යි' : lang === 'ta' ? 'சராசரி பதில் நேரம்: 12 நிமிடங்கள்' : 'Avg Response: 12 Mins'}
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
