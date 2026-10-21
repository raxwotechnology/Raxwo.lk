import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  ExternalLink,
  Laptop,
  Check,
  Calendar,
  Zap,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCheck,
  Globe,
  Printer,
  ScanBarcode,
  Monitor,
  Headphones
} from 'lucide-react';
import { getTranslation } from '../i18n/translations';

export default function ContactUsPage({
  theme = 'dark',
  lang = 'en',
  onSubmitInquiry,
  isSubmitting = false
}) {
  const isDark = theme === 'dark';
  const t = (k) => getTranslation(lang, k);

  const [inquiryType, setInquiryType] = useState('demo'); // 'demo' | 'quote' | 'custom' | 'support'
  const [preferredContact, setPreferredContact] = useState('whatsapp'); // 'whatsapp' | 'call' | 'email' | 'visit'
  const [selectedHardware, setSelectedHardware] = useState(['Thermal Printer', 'Barcode Scanner']);
  const [copiedField, setCopiedField] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: 'mobixa',
    branches: '1',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const productList = [
    { id: 'mobixa', name: 'Mobixa — Mobile Shop & Phone Repair ERP' },
    { id: 'dineflow', name: 'DineFlow — Multi-Branch Restaurant, Cafe & Bar POS' },
    { id: 'exxplan', name: 'Exxplan — Wholesale & Van Sales FMCG Distribution' },
    { id: 'pharmacare', name: 'PharmaCare — Pharmacy & Clinic Inventory Suite' },
    { id: 'lankapos', name: 'LankaPOS — Supermarket & Grocery Retail Point of Sale' },
    { id: 'gymora', name: 'Gymora — Fitness Club & Member Biometrics' },
    { id: 'buildtrack', name: 'BuildTrack — Hardware, Paint & Construction' },
    { id: 'manufacturing-erp', name: 'Industrial Core — Manufacturing & BOM Suite' },
    { id: 'garment-apparel', name: 'StitchERP — Garment, Textile & Apparel Factory' },
    { id: 'auto-spare-parts', name: 'GearMaster — Auto Spares & Garage Workshop' },
    { id: 'hotel-resort-pms', name: 'VillaStay — Hotel, Villa & Resort Property PMS' },
    { id: 'custom', name: 'Custom Enterprise ERP Architecture' }
  ];

  const hardwareOptions = [
    { id: 'Thermal Printer', label: 'Thermal Receipt Printer (EPSON / Xprinter)', icon: Printer },
    { id: 'Barcode Scanner', label: '1D/2D Barcode Scanner', icon: ScanBarcode },
    { id: 'Touch POS Screen', label: 'Touch Screen POS Terminal', icon: Monitor },
    { id: 'Cash Drawer', label: 'Auto Cash Drawer (RJ11)', icon: Building2 },
    { id: 'Weighing Scale', label: 'Digital Weighing Scale Integration', icon: Zap },
    { id: 'Van Sale Mobile POS', label: 'Android Handheld Mobile POS', icon: Laptop }
  ];

  const faqs = [
    {
      q: lang === 'si' ? 'අපගේ වෙළඳසැලට පද්ධතිය ස්ථාපනය කිරීමට කොපමණ කාලයක් ගතවේද?' : 'How quickly can LankaPOS or Mobixa be deployed in our store?',
      a: lang === 'si' 
        ? 'දුරස්ථව (Remote - AnyDesk) පැය 1ක් ඇතුළත සම්පූර්ණයෙන්ම සකසා දිය හැක. සෘජුවම පැමිණ (On-site setup) පැය 3-4ක් ඇතුළත ප්‍රින්ටර්, බාර්කෝඩ් ස්කෑනර් සහ පරිගණක සියල්ල සම්බන්ධ කර සේවකයන්ට පුහුණුව ලබාදේ.' 
        : 'Remote setup can be completed within 1 hour via AnyDesk. For on-site installations in Colombo and island-wide, our technician arrives the same or next business day to configure printers, cash drawers, and train your cashiers in under 3 hours.'
    },
    {
      q: lang === 'si' ? 'දැනට අප සතුව ඇති EPSON හෝ වෙනත් බිල්පත් ප්‍රින්ටර් මේ සඳහා භාවිත කළ හැකිද?' : 'Can we use our existing POS hardware, thermal printers & barcode scanners?',
      a: lang === 'si' 
        ? 'ඔව්, නිසැකවම! Raxwo පද්ධති EPSON, Xprinter, Rongta, Bixolon, Sunmi සහ ඕනෑම USB/Ethernet/Bluetooth තාප මුද්‍රණ යන්ත්‍ර සහ සියලුම බාර්කෝඩ් ස්කෑනර් සමඟ 100% ක් අනුකූලව ක්‍රියා කරයි.' 
        : 'Yes, 100%! Raxwo software is plug-and-play compatible with all major ESC/POS thermal printers (EPSON, Xprinter, Rongta, Bixolon, Black Copper), RJ11 cash drawers, weighing scales, and 1D/2D barcode scanners.'
    },
    {
      q: lang === 'si' ? 'පැරණි Excel හෝ වෙනත් මෘදුකාංගවල ඇති භාණ්ඩ (Stock) මාරු කරගත හැකිද?' : 'Can we import our existing inventory and stock lists from Excel?',
      a: lang === 'si' 
        ? 'ඔව්, ඔබගේ දැනට පවතින සියලුම අයිතම නාම, මිල ගණන් සහ බාර්කෝඩ් Excel (CSV / XLSX) ගොනුවක් මගින් තනි ක්ලික් කිරීමකින් අපගේ ඉංජිනේරුවන් නොමිලේම පද්ධතියට ඇතුළත් කර දෙනු ලැබේ.' 
        : 'Yes! Our engineering team will clean, format, and import your complete product inventory, barcodes, cost prices, and current stock counts from Excel or your legacy software at zero extra cost.'
    },
    {
      q: lang === 'si' ? 'මාසික ගාස්තු හෝ සැඟවුණු වියදම් තිබේද?' : 'Are there any monthly subscription fees or hidden recurrent charges?',
      a: lang === 'si' 
        ? 'කිසිසේත්ම නැත! ඔබ ගෙවන්නේ එක් වරක් පමණි (One-time payment). සම්පූර්ණ මෘදුකාංගය සහ එහි හිමිකාරිත්වය (Lifetime License & Source Code) ඔබට හිමිවේ. කිසිදු මාසික බිල්පතක් නොමැත.' 
        : 'None whatsoever. Raxwo provides complete perpetual lifetime ownership. You pay once and own the system forever with zero recurring monthly or annual subscription fees.'
    },
    {
      q: lang === 'si' ? 'කාර්ය මණ්ඩලයට සිංහල භාෂාවෙන් භාවිත කළ හැකිද සහ පුහුණුව ලබාදෙනවාද?' : 'Is the software available in Sinhala/Tamil and is cashier training included?',
      a: lang === 'si' 
        ? 'ඔව්, පද්ධතිය සම්පූර්ණයෙන්ම සිංහල, ඉංග්‍රීසි හෝ දෙමළ භාෂාවෙන් ක්‍රියාත්මක කළ හැක. බිල්පත පවා සිංහලෙන් මුද්‍රණය කළ හැක. ඔබගේ කාර්ය මණ්ඩලයට සම්පූර්ණ පුහුණුවක් නොමිලේ ලබාදෙනු ලැබේ.' 
        : 'Yes, Raxwo supports full Sinhala, Tamil, and English user interfaces, as well as Sinhala receipt printing. Free comprehensive training for cashiers, managers, and owners is included with every deployment.'
    }
  ];

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const toggleHardware = (item) => {
    if (selectedHardware.includes(item)) {
      setSelectedHardware(selectedHardware.filter(h => h !== item));
    } else {
      setSelectedHardware([...selectedHardware, item]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `RX-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(ref);

    const submissionData = {
      ...formData,
      inquiryType,
      preferredContact,
      hardwareRequired: selectedHardware,
      referenceId: ref,
      submittedAt: new Date().toISOString()
    };

    if (onSubmitInquiry) {
      onSubmitInquiry(submissionData);
    }

    setIsSuccess(true);
  };

  return (
    <div className={`w-full pt-6 pb-28 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      {/* 1. HERO HEADER */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-12 reveal-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.25] mb-4 ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {lang === 'si' ? 'ඔබගේ ව්‍යාපාරයට ගැළපෙන' : "Let's Build Your"}{' '}
            <span className="text-[#0094ff]">
              {lang === 'si' ? 'ERP හා POS පද්ධතිය' : 'Business Software'}
            </span>
          </h1>

          <p className={`text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {lang === 'si'
              ? 'ඔබගේ වෙළඳසැලට, හෝටලයට, ෆාමසියට හෝ කර්මාන්තශාලාවට සජීවී අත්හදාබැලීමක් (Live Demo), මිල ගණන් ලේඛනයක් හෝ තාක්ෂණික උපදෙස් ලබාගැනීමට කොළඹ ප්‍රධාන ඉංජිනේරු මධ්‍යස්ථානය සෘජුව අමතන්න.'
              : 'Direct access to senior ERP software architects in Colombo. Schedule a live hands-on demo, test your thermal printers in our lab, or receive a formal commercial proposal.'}
          </p>

          {/* Trust Guarantees Quick Pill Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs font-semibold">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Lifetime Source Code Ownership</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Zero Monthly Recurring Fees</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
              isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Islandwide On-Site Installation</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FOUR HIGH-VISIBILITY DIRECT CHANNELS (With Copy & Call Actions) */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-14 reveal-on-scroll">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Channel 1: WhatsApp Hotline */}
          <div className={`p-6 rounded-3xl border transition-all duration-300 group flex flex-col justify-between ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-emerald-500/60 shadow-xl' 
              : 'bg-white border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-xl'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Fastest
                </span>
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                WhatsApp Direct Chat
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Instant chat with our software engineers. Get quick screenshots, quotes, and video demos.
              </p>
              <div className="mt-3 font-mono font-bold text-sm text-[#25D366] flex items-center justify-between">
                <span>+94 74 357 3333</span>
                <button
                  type="button"
                  onClick={() => handleCopy('+94743573333', 'whatsapp')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer p-1"
                  title="Copy Number"
                >
                  {copiedField === 'whatsapp' ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <a
              href="https://wa.me/94743573333?text=Hello%20Raxwo%20Team%2C%20I%20would%20like%20to%20get%20a%20live%20demo%20and%20quotation%20for%20my%20business."
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Channel 2: Phone Hotline */}
          <div className={`p-6 rounded-3xl border transition-all duration-300 group flex flex-col justify-between ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-blue-500/60 shadow-xl' 
              : 'bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-xl'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">
                  Mon – Sat 8:30 AM
                </span>
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Colombo Tech Desk
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Official direct line for enterprise contracts, urgent cashier support, and tenders.
              </p>
              <div className="mt-3 font-mono font-bold text-sm text-blue-500 flex items-center justify-between">
                <span>+94 11 234 5678</span>
                <button
                  type="button"
                  onClick={() => handleCopy('+94112345678', 'phone')}
                  className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer p-1"
                  title="Copy Landline"
                >
                  {copiedField === 'phone' ? <CheckCheck className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href="tel:+94112345678"
              className="mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Call Technical Desk</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Channel 3: Email Inquiries */}
          <div className={`p-6 rounded-3xl border transition-all duration-300 group flex flex-col justify-between ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-purple-500/60 shadow-xl' 
              : 'bg-white border-slate-200 hover:border-purple-500 shadow-md hover:shadow-xl'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400">
                  SLA &amp; RFP
                </span>
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Email &amp; Proposals
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Send formal system specifications, hardware requirements, or partnership inquiries.
              </p>
              <div className="mt-3 font-mono font-bold text-sm text-purple-400 flex items-center justify-between">
                <span>sales@raxwo.lk</span>
                <button
                  type="button"
                  onClick={() => handleCopy('sales@raxwo.lk', 'email')}
                  className="text-slate-400 hover:text-purple-400 transition-colors cursor-pointer p-1"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <CheckCheck className="w-4 h-4 text-purple-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href="mailto:sales@raxwo.lk?subject=Raxwo%20ERP%20Software%20Inquiry"
              className={`mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark 
                  ? 'bg-purple-950/40 text-purple-300 border-purple-800/60 hover:bg-purple-900/60' 
                  : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
              }`}
            >
              <span>Send Official Email</span>
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Channel 4: Colombo Demo Lab & Walk-in */}
          <div className={`p-6 rounded-3xl border transition-all duration-300 group flex flex-col justify-between ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-cyan-500/60 shadow-xl' 
              : 'bg-white border-slate-200 hover:border-cyan-500 shadow-md hover:shadow-xl'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                  Colombo 03
                </span>
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Hardware Test Lab
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Level 05, Raxwo Tech Tower, Galle Road, Colombo 03. Bring your thermal printers for live testing.
              </p>
              <div className="mt-3 text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reserved Customer Parking</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Galle+Road+Colombo+03+Sri+Lanka"
              target="_blank"
              rel="noreferrer"
              className={`mt-5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark 
                  ? 'bg-cyan-950/40 text-cyan-300 border-cyan-800/60 hover:bg-cyan-900/60' 
                  : 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100'
              }`}
            >
              <span>Get GPS Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 3. MAIN INTERACTIVE FORM + EMBEDDED GOOGLE MAP SHOWCASE */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-20 overflow-hidden reveal-on-scroll">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: INTERACTIVE CONSULTATION & DEMO BOOKING FORM (7 Cols) */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className={`p-6 sm:p-9 rounded-3xl border shadow-2xl transition-all ${
              isDark 
                ? 'bg-[#0a0f24]/95 border-slate-800/90' 
                : 'bg-white border-slate-200'
            }`}>
              
              {/* Form Title & Subtitle */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-500">
                    DIRECT INQUIRY &amp; CONSULTATION
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    No Registration Required
                  </span>
                </div>
                <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {lang === 'si' ? 'සජීවී අත්හදාබැලීමක් හෝ මිල ගණන් ලබාගන්න' : 'Request Live Demo or Price Quotation'}
                </h2>
                <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {lang === 'si'
                    ? 'ඔබගේ වෙළඳසැලේ හෝ ආයතනයේ අවශ්‍යතාවය පහතින් සටහන් කරන්න. විනාඩි 15ක් ඇතුළත අපගේ ඉංජිනේරුවරයෙකු ඔබව අමතනු ඇත.'
                    : 'Tell us about your business. We will configure a live preview tailored specifically to your counter setup and hardware.'}
                </p>
              </div>

              {/* Inquiry Type Chips (Interactive Filter) */}
              <div className="mb-6">
                <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                  1. What would you like to do? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'demo', label: '🚀 Live Demo' },
                    { id: 'quote', label: '💰 Price Quote' },
                    { id: 'custom', label: '⚙️ Custom Build' },
                    { id: 'support', label: '📞 Call Me Back' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setInquiryType(tab.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                        inquiryType === tab.id
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                          : isDark 
                            ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' 
                            : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Success Notification Alert */}
              {isSuccess ? (
                <div className="py-10 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center flex flex-col items-center gap-3 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    Inquiry Received Successfully!
                  </h3>
                  <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Thank you, <strong>{formData.name}</strong>. A dedicated Raxwo software architect has been assigned to your request and will contact you via {preferredContact === 'whatsapp' ? 'WhatsApp' : 'phone'} within 15 minutes.
                  </p>
                  
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-cyan-400 mt-2 flex items-center gap-2">
                    <span>Reference Tracking ID:</span>
                    <strong className="text-white text-sm">{referenceId}</strong>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <a
                      href={`https://wa.me/94771234567?text=Hi%20Raxwo%2C%20I%20just%20submitted%20inquiry%20reference%20${referenceId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speed Up via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', phone: '', product: 'mobixa', branches: '1', message: '' });
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Your Full Name / Store Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nimal Perera / Perera Super"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Phone (WhatsApp) Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 077 123 4567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Number of Outlets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. nimal@gmail.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-950 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                        Number of Counters / Outlets *
                      </label>
                      <select
                        value={formData.branches}
                        onChange={e => setFormData({ ...formData, branches: e.target.value })}
                        className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-colors cursor-pointer ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white' 
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="1" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Single Counter / 1 Outlet</option>
                        <option value="2-3" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>2 to 3 Outlets (Multi-Branch Sync)</option>
                        <option value="4-10" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>4 to 10 Outlets (Retail Chain)</option>
                        <option value="enterprise" className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>10+ Outlets &amp; Central Distribution Hub</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Target ERP Solution */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      2. Which ERP Solution Are You Interested In? *
                    </label>
                    <select
                      value={formData.product}
                      onChange={e => setFormData({ ...formData, product: e.target.value })}
                      className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-colors cursor-pointer ${
                        isDark 
                          ? 'bg-slate-900 border-slate-700 text-white' 
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      {productList.map(p => (
                        <option key={p.id} value={p.id} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Preferred Contact Method */}
                  <div>
                    <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      3. Preferred Contact Mode:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'whatsapp', label: '💬 WhatsApp' },
                        { id: 'call', label: '📞 Direct Call' },
                        { id: 'visit', label: '🏢 Colombo Lab' },
                        { id: 'email', label: '✉️ Email SLA' }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setPreferredContact(mode.id)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            preferredContact === mode.id
                              ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm'
                              : isDark
                                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                                : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Hardware Integration Tags */}
                  <div>
                    <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      4. Hardware to connect (Select all that apply):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {hardwareOptions.map(item => {
                        const isSelected = selectedHardware.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleHardware(item.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? isDark
                                  ? 'bg-blue-600/30 border-blue-500 text-blue-300 font-bold'
                                  : 'bg-blue-50 border-blue-400 text-blue-800 font-bold'
                                : isDark
                                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <item.icon className="w-3.5 h-3.5" />
                            <span>{item.id}</span>
                            {isSelected && <Check className="w-3 h-3 text-blue-400 ml-0.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 6: Custom Message / Hardware Model */}
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      5. Specific Features or Existing Equipment (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder={lang === 'si' ? 'ඔබගේ අවශ්‍යතා හෝ දැනට භාවිත කරන පරිගණක/මුද්‍රණ යන්ත්‍ර මාදිලි මෙහි සඳහන් කරන්න...' : 'Mention your receipt printer model (e.g. EPSON TM-T82, Xprinter), Sinhala/Tamil UI requirements, or custom wholesale pricing rules...'}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors resize-none ${
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
                    className="w-full mt-2 py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Dispatching to Colombo Tech Lab...' : 'Request Consultation & Book Live Demo'}</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      🔒 Zero spam guarantee. Direct engineer callback.
                    </span>
                    <span className="text-emerald-500 font-bold">
                      Avg. Response: 12 Mins
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* RIGHT: COLOMBO TECH TOWER + EMBEDDED GOOGLE MAP + GUARANTEES (5 Cols) */}
          <div className="lg:col-span-5 w-full min-w-0 space-y-6">
            
            {/* Interactive Embedded Google Map Card */}
            <div className={`rounded-3xl border overflow-hidden shadow-2xl transition-all ${
              isDark ? 'bg-[#0a0f24]/95 border-slate-800/90' : 'bg-white border-slate-200'
            }`}>
              
              <div className="relative w-full h-56 bg-slate-950 overflow-hidden">
                {/* Real Colombo 03 Google Map Embed */}
                <iframe
                  title="Raxwo Tech Tower Colombo Location Map"
                  src="https://maps.google.com/maps?q=Galle%20Road,%20Colombo%2003,%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                ></iframe>
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Raxwo Colombo HQ — Galle Road</span>
                </div>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      Official Office &amp; Demo Lab Address:
                    </span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Level 05, Raxwo Tech Tower, Galle Road, Colombo 03, Sri Lanka.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      Working &amp; Consultation Hours:
                    </span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Monday – Saturday: 8:30 AM – 7:00 PM (IST)
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5 font-bold">
                      ● 24/7 Remote Urgent Server SLA for Supermarkets &amp; Night Venues
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Laptop className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      Free Hardware Test Bench:
                    </span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Bring your receipt printer, barcode labeler, or cash drawer to our lab for free instant testing.
                    </span>
                  </div>
                </div>

                {/* Direct Google Maps Action Button */}
                <a
                  href="https://maps.google.com/?q=Galle+Road+Colombo+03+Sri+Lanka"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                  <span>Open Full Screen in Google Maps App</span>
                </a>
              </div>

            </div>

            {/* Why Contact Raxwo - Trust Guarantees */}
            <div className={`p-6 rounded-3xl border ${
              isDark ? 'bg-[#0a0f24]/95 border-slate-800/90' : 'bg-white border-slate-200'
            }`}>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                isDark ? 'text-cyan-400' : 'text-blue-700'
              }`}>
                <ShieldCheck className="w-4 h-4" />
                <span>Our 100% Commitment to Your Business</span>
              </h4>

              <div className="space-y-3 text-xs">
                {[
                  { title: 'Zero Monthly Lock-in', desc: 'You purchase the system outright with perpetual license.' },
                  { title: 'Local Server Security', desc: 'Your sales data stays in your store, never on third-party public clouds.' },
                  { title: 'Free Remote Demonstration', desc: 'See your real inventory items and sample bills generated live.' },
                  { title: 'Island-wide Field Dispatch', desc: 'On-site engineer visits available anywhere in Sri Lanka.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 font-bold" />
                    </div>
                    <div>
                      <strong className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</strong>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ISLAND-WIDE REGIONAL SUPPORT COVERAGE (Across Sri Lanka) */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-20">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-500 block mb-1">
            ISLAND-WIDE ON-SITE SERVICES
          </span>
          <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Supporting Retail Stores &amp; Factories Across Sri Lanka
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Same-day remote activation worldwide, plus dedicated mobile technical engineers for physical installations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              province: 'Western Province',
              cities: 'Colombo, Gampaha, Negombo, Kalutara, Panadura',
              sla: 'Same-Day Dispatch (< 2 Hours)',
              badge: 'HQ Primary Lab'
            },
            {
              province: 'Central Province',
              cities: 'Kandy, Peradeniya, Matale, Nuwara Eliya, Gampola',
              sla: 'Next-Morning Onsite Dispatch',
              badge: 'Central Support'
            },
            {
              province: 'Southern Province',
              cities: 'Galle, Matara, Hambantota, Hikkaduwa, Tangalle',
              sla: 'Hotel & Retail Specialist Hub',
              badge: 'Coastal Support'
            },
            {
              province: 'North Western & North',
              cities: 'Kurunegala, Chilaw, Anuradhapura, Jaffna, Vavuniya',
              sla: 'FMCG & Van Sales Field Support',
              badge: 'Regional Desk'
            }
          ].map((region, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-[#0a0f24]/80 border-slate-800' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-500">{region.province}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  {region.badge}
                </span>
              </div>
              <p className={`text-xs font-medium mb-3 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {region.cities}
              </p>
              <div className="pt-2 border-t border-slate-800/50 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <Clock className="w-3 h-3" />
                <span>{region.sla}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ ACCORDION */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-16">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-8">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-500 block mb-1">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDark 
                      ? 'bg-[#0a0f24]/90 border-slate-800' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className={`text-sm sm:text-base font-bold ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-blue-600 text-white' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className={`px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                      isDark ? 'text-slate-300 border-slate-800/80' : 'text-slate-700 border-slate-100'
                    }`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. BOTTOM PROMPT STRIP (WhatsApp Quick Action) */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 reveal-on-scroll">
        <div className={`max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left ${
          isDark 
            ? 'bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-cyan-950/40 border-slate-800' 
            : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border-blue-200'
        }`}>
          <div>
            <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Want to see a 5-minute live screen demo right now?
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Our engineers are available right now on WhatsApp. No booking forms required.
            </p>
          </div>

          <a
            href="https://wa.me/94743573333?text=Hello%20Raxwo%20Team%2C%20can%20I%20see%20a%20quick%205-minute%20live%20demo%20of%20your%20POS%20system%3F"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-2xl text-xs font-black text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>
      </section>

    </div>
  );
}
