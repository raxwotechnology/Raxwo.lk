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
  theme = 'dark'
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
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Choose Features' },
    { num: 3, label: 'Your Requests' },
    { num: 4, label: 'Review' }
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
          Products
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
          Customize
        </span>
      </nav>

      {/* Header section (Exact match to Image 4) */}
      <div className="max-w-4xl mb-10 text-left">
        <span className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-3 inline-block ${
          isDark ? 'text-cyan-400' : 'text-cyan-700'
        }`}>
          MAKE IT FIT YOUR BUSINESS
        </span>
        <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Customize Your {p.name}
        </h1>
        <p className={`text-sm sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Answer a few simple questions. You can change these details later.
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
                      Tell us about your business
                    </h3>
                    <p className="text-xs text-slate-400">
                      This helps us prepare the right setup.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label className={`text-xs font-semibold block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Business Name
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
                      Business Type
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
                      Number of Users
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
                      Number of Branches
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
                      Select Modules for Your Package
                    </h3>
                    <p className="text-xs text-slate-400">
                      Choose which modules should be activated and customized in your software.
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
                      Special Requests & Hardware
                    </h3>
                    <p className="text-xs text-slate-400">
                      Specify thermal printer model, barcode scanner type, or custom reports.
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <textarea
                    rows={4}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Enter any hardware models, invoice formats, or specific workflows..."
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
                      Review Customization Specs
                    </h3>
                    <p className="text-xs text-slate-400">
                      Check your specifications before confirming your order.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-3 mb-8 text-xs ${
                  isDark ? 'bg-[#11172e] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Business:</span>
                    <span className="font-bold">{formData.businessName} ({formData.businessType})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Scale:</span>
                    <span>{formData.usersCount} Users, {formData.branchesCount} Branch(es)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Features:</span>
                    <span>{formData.selectedFeatures.length} Modules</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hardware & Notes:</span>
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
                  Back
                </button>
              ) : <div></div>}

              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{currentStep === 4 ? "Proceed to Checkout" : "Next Step"}</span>
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
              Your package includes the complete source code and setup support.
            </p>

            {/* Rows: Selected features & Estimated Total */}
            <div className={`space-y-3 pt-2 border-t mb-6 text-xs ${
              isDark ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div className="flex items-center justify-between text-slate-400">
                <span>Selected features</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {formData.selectedFeatures.length} of 8
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Estimated total</span>
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
                Need Help?
              </h5>
              <p className="text-[11px] text-slate-400 mt-1 mb-3">
                Talk to a friendly person before continuing.
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
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
