import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  MessageCircle, 
  ChevronRight, 
  Sparkles,
  Building,
  Users,
  Store
} from 'lucide-react';

export default function CustomizePage({ 
  product, 
  onBackToProduct, 
  onProceedToOrder,
  currency = 'LKR', 
  currencyRates,
  theme = 'dark',
  lang = 'en'
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: 'Nimal Mobile Center',
    businessType: 'Mobile shop and repair center',
    usersCount: '5',
    branchesCount: '1',
    selectedFeatures: ['IMEI Tracking', 'Technician Commissions', 'SMS Receipts', 'Barcode Printing'],
    specialRequests: 'Need integration with EPSON TM-T82X thermal printer.'
  });

  const isDark = theme === 'dark';

  const p = product || {
    id: "mobixa",
    name: "Mobixa",
    subtitle: "Professional Package",
    priceLKR: 120000
  };

  const steps = [
    { num: 1, label: lang === 'si' ? 'මූලික තොරතුරු' : lang === 'ta' ? 'அடிப்படை தகவல்' : 'Basic Info' },
    { num: 2, label: lang === 'si' ? 'විශේෂාංග තෝරන්න' : lang === 'ta' ? 'அம்சங்களைத் தேர்வுசெய்க' : 'Choose Features' },
    { num: 3, label: lang === 'si' ? 'විශේෂ අවශ්‍යතා' : lang === 'ta' ? 'உங்கள் தேவைகள்' : 'Your Requests' },
    { num: 4, label: lang === 'si' ? 'සමාලෝචනය' : lang === 'ta' ? 'மதிப்பாய்வு' : 'Review' }
  ];

  const availableFeatures = [
    'IMEI Tracking & Barcode Scanning',
    'Technician Commissions & Job Cards',
    'Customer SMS Alerts upon Repair',
    'Barcode Label & Thermal Receipt Printing',
    'Multi-Counter Cash Drawer Reconciliation',
    'Wholesale Accessory Depletion Logic',
    'Accounting Ledger & Tax Invoice Export',
    'Cloud Database Sync & Backup'
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Proceed to order
      onProceedToOrder({
        product: p,
        customization: formData,
        estimatedTotal: p.priceLKR || 120000
      });
    }
  };

  const toggleFeature = (feat) => {
    if (formData.selectedFeatures.includes(feat)) {
      setFormData({
        ...formData,
        selectedFeatures: formData.selectedFeatures.filter(f => f !== feat)
      });
    } else {
      setFormData({
        ...formData,
        selectedFeatures: [...formData.selectedFeatures, feat]
      });
    }
  };

  return (
    <div className="w-full pt-6 pb-24 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Breadcrumb Navigation (Exact match to Image 4) */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button 
          onClick={onBackToProduct}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          {lang === 'si' ? 'නිෂ්පාදන' : lang === 'ta' ? 'தயாரிப்புகள்' : 'Products'}
        </button>
        <span>/</span>
        <button 
          onClick={onBackToProduct}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          {p.name}
        </button>
        <span>/</span>
        <span className={isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'}>
          {lang === 'si' ? 'අභිරුචිකරණය' : lang === 'ta' ? 'தனிப்பயனாக்குக' : 'Customize'}
        </span>
      </nav>

      {/* Header section (Exact match to Image 4) */}
      <div className="max-w-4xl mb-10 text-left">
        <span className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-3 inline-block ${
          isDark ? 'text-cyan-400' : 'text-cyan-700'
        }`}>
          {lang === 'si' ? 'ඔබගේ ව්‍යාපාරයට ගැළපෙන පරිදි සකසන්න' : lang === 'ta' ? 'உங்கள் வணிகத்திற்கு ஏற்ப அமைக்கவும்' : 'MAKE IT FIT YOUR BUSINESS'}
        </span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {lang === 'si' ? `${p.name} ඔබගේ අවශ්‍යතාවයට සකසන්න` : lang === 'ta' ? `உங்கள் ${p.name}-ஐ தனிப்பயனாக்குங்கள்` : `Customize Your ${p.name}`}
        </h1>
        <p className={`text-sm sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {lang === 'si' 
            ? 'සරල ප්‍රශ්න කිහිපයකට පිළිතුරු දෙන්න. ඔබට පසුවද මේවා වෙනස් කළ හැක.' 
            : lang === 'ta' 
            ? 'சில எளிய கேள்விகளுக்கு பதிலளிக்கவும். இந்த விவரங்களை நீங்கள் பின்னர் மாற்றலாம்.' 
            : 'Answer a few simple questions. You can change these details later.'}
        </p>
      </div>

      {/* Stepper Progress Bar (Exact match to Image 4) */}
      <div className="flex items-center gap-4 sm:gap-8 mb-12 overflow-x-auto pb-2">
        {steps.map((st) => {
          const isDone = st.num < currentStep;
          const isCurrent = st.num === currentStep;
          return (
            <div key={st.num} className="flex items-center gap-3 shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                isDone 
                  ? 'bg-blue-600 text-white' 
                  : isCurrent 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' 
                    : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
              }`}>
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.num}
              </div>
              <span className={`text-xs font-semibold ${
                isCurrent 
                  ? isDark ? 'text-white' : 'text-slate-900'
                  : 'text-slate-400'
              }`}>
                {st.label}
              </span>
              {st.num < 4 && (
                <div className={`w-10 sm:w-16 h-[1px] hidden sm:block ${
                  isDone ? 'bg-blue-600' : isDark ? 'bg-slate-800' : 'bg-slate-300'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Grid: Left Step Form + Right Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Multi-Step Interactive Form */}
        <div className="lg:col-span-8 w-full">
          <div className={`rounded-3xl p-7 sm:p-9 border transition-all ${
            isDark 
              ? 'bg-[#0b1022]/90 border-slate-800/80 shadow-2xl' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Step 1: Tell us about your business (Exact match to Image 4) */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'si' ? 'ඔබගේ ව්‍යාපාරය පිළිබඳ අපට කියන්න' : lang === 'ta' ? 'உங்கள் வணிகத்தைப் பற்றி எங்களிடம் கூறுங்கள்' : 'Tell us about your business'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'si' ? 'මෙය ඔබට ගැළපෙන පද්ධතිය සකස් කිරීමට උපකාරී වේ.' : lang === 'ta' ? 'சரியான அமைப்பைத் தயாரிக்க இது எங்களுக்கு உதவுகிறது.' : 'This helps us prepare the right setup.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {lang === 'si' ? 'ව්‍යාපාරයේ නම' : lang === 'ta' ? 'வணிகப் பெயர்' : 'Business Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Example: Nimal Mobile Center"
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                          : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {lang === 'si' ? 'ව්‍යාපාර වර්ගය' : lang === 'ta' ? 'வணிக வகை' : 'Business Type'}
                    </label>
                    <input
                      type="text"
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      placeholder="Mobile shop and repair center"
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                          : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {lang === 'si' ? 'පරිශීලකයින් ගණන' : lang === 'ta' ? 'பயனர்களின் எண்ணிக்கை' : 'Number of Users'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.usersCount}
                      onChange={(e) => setFormData({ ...formData, usersCount: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                          : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {lang === 'si' ? 'ශාඛා ගණන' : lang === 'ta' ? 'கிளைகளின் எண்ணிக்கை' : 'Number of Branches'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.branchesCount}
                      onChange={(e) => setFormData({ ...formData, branchesCount: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                          : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Choose Features */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'si' ? 'ඔබගේ මෘදුකාංගයට අවශ්‍ය මොඩියුල තෝරන්න' : lang === 'ta' ? 'உங்கள் தொகுப்பிற்கான தொகுதிகளைத் தேர்ந்தெடுக்கவும்' : 'Select Modules for Your Package'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'si' ? 'ඔබගේ මෘදුකාංගයේ සක්‍රීය කළ යුතු මොඩියුල තෝරන්න.' : lang === 'ta' ? 'எந்த தொகுதிகள் செயல்படுத்தப்பட வேண்டும் என்பதைத் தேர்ந்தெடுக்கவும்.' : 'Choose which modules should be activated and customized in your software.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {availableFeatures.map((feat) => {
                    const isSelected = formData.selectedFeatures.includes(feat);
                    return (
                      <div
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-cyan-300'
                            : isDark ? 'bg-[#11172e] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-xs font-medium">{feat}</span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          isSelected ? 'bg-blue-600 text-white' : 'border border-slate-600'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Your Requests */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'si' ? 'විශේෂ ඉල්ලීම් සහ දෘඩාංග' : lang === 'ta' ? 'சிறப்பு கோரிக்கைகள் மற்றும் வன்பொருள்' : 'Special Requests & Hardware'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'si' ? 'තාප මුද්‍රණ යන්ත්‍ර මාදිලිය, බාර්කෝඩ් ස්කෑනර් වර්ගය හෝ විශේෂ වාර්තා සඳහන් කරන්න.' : lang === 'ta' ? 'தெர்மல் பிரிண்டர் மாடல் அல்லது ஸ்கேனர் வகையைக் குறிப்பிடவும்.' : 'Specify thermal printer model, barcode scanner type, or custom reports.'}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <textarea
                    rows={4}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder={lang === 'si' ? 'දෘඩාංග ආකෘති, බිල්පත් ආකෘති හෝ විශේෂිත අවශ්‍යතා මෙහි සටහන් කරන්න...' : lang === 'ta' ? 'வன்பொருள் மாதிரிகள் அல்லது குறிப்பிட்ட பணிப்பாய்வுகளை உள்ளிடவும்...' : 'Enter any hardware models, invoice formats, or specific workflows...'}
                    className={`w-full p-4 rounded-xl text-sm focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-[#11172e] border border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'si' ? 'තොරතුරු සමාලෝචනය කරන්න' : lang === 'ta' ? 'விவரக்குறிப்புகளை மதிப்பாய்வு செய்யவும்' : 'Review Customization Specs'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {lang === 'si' ? 'ඇණවුම තහවුරු කිරීමට පෙර ඔබගේ පිරිවිතර පරීක්ෂා කරන්න.' : lang === 'ta' ? 'ஆர்டரை உறுதிப்படுத்துவதற்கு முன் விவரங்களைச் சரிபார்க்கவும்.' : 'Check your specifications before confirming your order.'}
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-3 mb-8 text-xs ${
                  isDark ? 'bg-[#11172e] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lang === 'si' ? 'ව්‍යාපාරය:' : lang === 'ta' ? 'வணிகம்:' : 'Business:'}</span>
                    <span className="font-bold">{formData.businessName} ({formData.businessType})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lang === 'si' ? 'පරිමාණය:' : lang === 'ta' ? 'அளவு:' : 'Scale:'}</span>
                    <span>{formData.usersCount} {lang === 'si' ? 'පරිශීලකයින්' : lang === 'ta' ? 'பயனர்கள்' : 'Users'}, {formData.branchesCount} {lang === 'si' ? 'ශාඛා' : lang === 'ta' ? 'கிளைகள்' : 'Branch(es)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lang === 'si' ? 'තෝරාගත් මොඩියුල:' : lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்டவை:' : 'Selected Features:'}</span>
                    <span>{formData.selectedFeatures.length} {lang === 'si' ? 'මොඩියුල' : lang === 'ta' ? 'தொகுதிகள்' : 'Modules'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lang === 'si' ? 'දෘඩාංග සහ සටහන්:' : lang === 'ta' ? 'வன்பொருள் மற்றும் குறிப்புகள்:' : 'Hardware & Notes:'}</span>
                    <span>{formData.specialRequests}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions: Next Step Button (Exact match to Image 4) */}
            <div className={`flex items-center justify-between pt-4 border-t ${
              isDark ? 'border-slate-800/60' : 'border-slate-200'
            }`}>
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'si' ? 'ආපසු' : lang === 'ta' ? 'பின்னால்' : 'Back'}
                </button>
              ) : <div></div>}

              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>
                  {currentStep === 4 
                    ? (lang === 'si' ? 'ගෙවීම සඳහා ඉදිරියට' : lang === 'ta' ? 'செக்அவுட்டிற்கு தொடரவும்' : 'Proceed to Checkout') 
                    : (lang === 'si' ? 'මීළඟ පියවර' : lang === 'ta' ? 'அடுத்த படி' : 'Next Step')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Sticky Summary Card (Exact match to Image 4) */}
        <div className="lg:col-span-4 w-full">
          <div className={`rounded-3xl p-6 sm:p-7 border backdrop-blur-xl transition-all ${
            isDark 
              ? 'bg-[#0a0f22]/95 border-slate-800/80 shadow-2xl' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* App Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-900 border border-blue-500/40 flex items-center justify-center p-2.5 mb-4 shadow-md">
              <svg className="w-full h-full text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <path d="M12 18h.01" />
                <path d="M9 6h6" />
                <path d="M8 12l2 2 4-4" stroke="#38bdf8" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Title & Description */}
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {p.name} Professional
            </h4>
            <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
              {lang === 'si' 
                ? 'ඔබගේ පැකේජයට සම්පූර්ණ මූල කේතය සහ සැකසුම් සහාය ඇතුළත් වේ.' 
                : lang === 'ta' 
                ? 'உங்கள் தொகுப்பில் முழு மூலக் குறியீடு மற்றும் அமைப்பு உதவி அடங்கும்.' 
                : 'Your package includes the complete source code and setup support.'}
            </p>

            {/* Rows: Selected features & Estimated Total */}
            <div className={`space-y-3 pt-2 border-t mb-6 text-xs ${
              isDark ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div className="flex items-center justify-between text-slate-400">
                <span>{lang === 'si' ? 'තෝරාගත් විශේෂාංග' : lang === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட அம்சங்கள்' : 'Selected features'}</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {formData.selectedFeatures.length} of 8
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>{lang === 'si' ? 'ඇස්තමේන්තුගත මුදල' : lang === 'ta' ? 'மதிப்பிடப்பட்ட மொத்தம்' : 'Estimated total'}</span>
                <span className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  LKR 120,000
                </span>
              </div>
            </div>

            {/* Need Help Box & WhatsApp Button (Exact match to Image 4) */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-[#11172e]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'si' ? 'උදව් අවශ්‍යද?' : lang === 'ta' ? 'உதவி தேவையா?' : 'Need Help?'}
              </h5>
              <p className="text-[11px] text-slate-400 mt-1 mb-3">
                {lang === 'si' ? 'ඉදිරියට යාමට පෙර අපගේ කණ්ඩායම හා කතා කරන්න.' : lang === 'ta' ? 'தொடர்வதற்கு முன் ஒருவருடன் பேசுங்கள்.' : 'Talk to a friendly person before continuing.'}
              </p>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-colors ${
                  isDark 
                    ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700/80' 
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'si' ? 'WhatsApp සංවාදය' : lang === 'ta' ? 'WhatsApp அரட்டை' : 'Chat on WhatsApp'}</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
