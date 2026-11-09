import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronDown,
  Copy,
  CheckCheck
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

  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: 'mobixa',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const productList = [
    { id: 'mobixa', name: 'Mobixa — Mobile Shop & Phone Repair ERP' },
    { id: 'dineflow', name: 'DineFlow — Multi-Branch Restaurant & Cafe POS' },
    { id: 'lankapos', name: 'LankaPOS — Supermarket & Retail Point of Sale' },
    { id: 'exxplan', name: 'Exxplan — Wholesale & FMCG Distribution ERP' },
    { id: 'pharmacare', name: 'PharmaCare — Pharmacy & Clinic Inventory Suite' },
    { id: 'custom', name: 'Custom Software Development & Web/Mobile Apps' },
    { id: 'general', name: 'General Business Consultation' }
  ];

  const faqs = [
    {
      q: lang === 'si' 
        ? 'අපගේ වෙළඳසැලට පද්ධතිය ස්ථාපනය කිරීමට කොපමණ කාලයක් ගතවේද?' 
        : lang === 'ta'
        ? 'எங்கள் வணிகத்தில் மென்பொருளை எவ்வளவு விரைவாக நிறுவ முடியும்?'
        : 'How quickly can your system be deployed in our business?',
      a: lang === 'si' 
        ? 'දුරස්ථව (Remote - AnyDesk) පැය 1ක් ඇතුළත සම්පූර්ණයෙන්ම සකසා දිය හැක. සෘජුවම පැමිණ (On-site setup) පැය 3-4ක් ඇතුළත ප්‍රින්ටර්, බාර්කෝඩ් ස්කෑනර් සහ පරිගණක සියල්ල සම්බන්ධ කර සේවකයන්ට පුහුණුව ලබාදේ.' 
        : lang === 'ta'
        ? 'AnyDesk வழியாக 1 மணி நேரத்திற்குள் தொலைநிலையாக அமைப்பை முடிக்க முடியும். நேரடி நிறுவலுக்கு, 3 மணி நேரத்திற்குள் ரசீது அச்சுப்பொறிகள், பார்கோடு ஸ்கேனர்கள் கட்டமைக்கப்பட்டு பயிற்சி அளிக்கப்படும்.'
        : 'Remote setup can be completed within 1 hour via AnyDesk. For on-site installations across Sri Lanka, our engineers configure receipt printers, barcode scanners, and cash drawers, plus train your staff in under 3 hours.'
    },
    {
      q: lang === 'si' 
        ? 'දැනට අප සතුව ඇති EPSON හෝ වෙනත් බිල්පත් ප්‍රින්ටර් මේ සඳහා භාවිත කළ හැකිද?' 
        : lang === 'ta'
        ? 'எங்களிடம் உள்ள POS வன்பொருள், பிரிண்டர்கள் மற்றும் ஸ்கேனர்களைப் பயன்படுத்த முடியுமா?'
        : 'Can we use our existing POS hardware, thermal printers & scanners?',
      a: lang === 'si' 
        ? 'ඔව්, නිසැකවම! Raxwo පද්ධති EPSON, Xprinter, Rongta, Bixolon සහ ඕනෑම USB/Ethernet/Bluetooth තාප මුද්‍රණ යන්ත්‍ර සහ සියලුම බාර්කෝඩ් ස්කෑනර් සමඟ 100% ක් අනුකූලව ක්‍රියා කරයි.' 
        : lang === 'ta'
        ? 'ஆம், 100%! Raxwo மென்பொருள் அனைத்து முன்னணி ESC/POS தெர்மல் ரசீது அச்சுப்பொறிகள் (EPSON, Xprinter, Rongta), பணப் பெட்டிகள் மற்றும் பார்கோடு ஸ்கேனர்களுடன் பொருந்தக்கூடியது.'
        : 'Yes, 100%! Raxwo software is plug-and-play compatible with all major ESC/POS thermal receipt printers (EPSON, Xprinter, Rongta, Bixolon), cash drawers, digital scales, and 1D/2D barcode scanners.'
    },
    {
      q: lang === 'si' 
        ? 'පැරණි Excel හෝ වෙනත් මෘදුකාංගවල ඇති භාණ්ඩ (Stock) මාරු කරගත හැකිද?' 
        : lang === 'ta'
        ? 'எங்கள் பழைய Excel அல்லது பிற அமைப்பிலிருந்து சரக்குகளை இறக்குமதி செய்ய முடியுமா?'
        : 'Can we import our existing inventory and stock lists from Excel?',
      a: lang === 'si' 
        ? 'ඔව්, ඔබගේ දැනට පවතින සියලුම අයිතම නාම, මිල ගණන් සහ බාර්කෝඩ් Excel ගොනුවක් මගින් අපගේ ඉංජිනේරුවන් නොමිලේම පද්ධතියට ඇතුළත් කර දෙනු ලැබේ.' 
        : lang === 'ta'
        ? 'ஆம்! எங்கள் பொறியியல் குழு உங்கள் முழு தயாரிப்பு சரக்குகள், பார்கோடுகள் மற்றும் விலைகளை Excel-லிருந்து கூடுதல் கட்டணமின்றி இறக்குமதி செய்யும்.'
        : 'Yes! Our engineering team will format and import your complete product inventory, barcodes, cost prices, and current stock counts from Excel at zero extra cost.'
    },
    {
      q: lang === 'si' 
        ? 'මාසික ගාස්තු හෝ සැඟවුණු වියදම් තිබේද?' 
        : lang === 'ta'
        ? 'மாதாந்திர சந்தா கட்டணங்கள் அல்லது மறைக்கப்பட்ட கட்டணங்கள் ஏதேனும் உள்ளதா?'
        : 'Are there any monthly subscription fees or hidden recurrent charges?',
      a: lang === 'si' 
        ? 'කිසිසේත්ම නැත! ඔබ ගෙවන්නේ එක් වරක් පමණි (One-time payment). සම්පූර්ණ මෘදුකාංගය සහ එහි හිමිකාරිත්වය (Lifetime License & Source Code) ඔබට හිමිවේ. කිසිදු මාසික බිල්පතක් නොමැත.' 
        : lang === 'ta'
        ? 'எதுவுமில்லை. நீங்கள் ஒரு முறை செலுத்தி வாழ்நாள் உரிம உரிமையுடன் கணினியை நிரந்தரமாக சொந்தமாக்கிக் கொள்ளலாம். தொடர்ச்சியான மாதாந்திர கட்டணம் எதுவும் இல்லை.'
        : 'None whatsoever. You pay once and own the system permanently with lifetime license ownership. No recurring monthly or annual subscription fees.'
    },
    {
      q: lang === 'si' 
        ? 'කාර්ය මණ්ඩලයට සිංහල භාෂාවෙන් භාවිත කළ හැකිද සහ පුහුණුව ලබාදෙනවාද?' 
        : lang === 'ta'
        ? 'மென்பொருள் தமிழ்/சிங்கள மொழிகளில் கிடைக்குமா மற்றும் பயிற்சி அளிக்கப்படுமா?'
        : 'Is the software available in Sinhala/Tamil and is training included?',
      a: lang === 'si' 
        ? 'ඔව්, පද්ධතිය සම්පූර්ණයෙන්ම සිංහල, ඉංග්‍රීසි හෝ දෙමළ භාෂාවෙන් ක්‍රියාත්මක කළ හැක. ඔබගේ කාර්ය මණ්ඩලයට සම්පූර්ණ පුහුණුවක් නොමිලේ ලබාදෙනු ලැබේ.' 
        : lang === 'ta'
        ? 'ஆம், Raxwo தமிழ், சிங்களம் மற்றும் ஆங்கில பயனர் இடைமுகங்களை ஆதரிக்கிறது. காசாளர்கள் மற்றும் மேலாளர்களுக்கான முழு பயிற்சி இலவசமாக சேர்க்கப்பட்டுள்ளது.'
        : 'Yes, Raxwo supports Sinhala, Tamil, and English user interfaces, as well as Sinhala receipt printing. Full training for cashiers and managers is included free.'
    }
  ];

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `RX-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(ref);

    const submissionData = {
      ...formData,
      referenceId: ref,
      submittedAt: new Date().toISOString()
    };

    if (onSubmitInquiry) {
      onSubmitInquiry(submissionData);
    }

    setIsSuccess(true);
  };

  return (
    <div className={`w-full pt-10 pb-28 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      {/* 1. HERO HEADER (Spacious & Clean) */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-16 sm:mb-20">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5 bg-[#0094ff]/10 text-[#0094ff] border border-[#0094ff]/30">
            <span>{lang === 'si' ? 'සම්බන්ධ වන්න' : lang === 'ta' ? 'எங்களைத் தொடர்பு கொள்ள' : 'GET IN TOUCH'}</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-[#0a0827]'
          }`}>
            {lang === 'si' ? 'ඔබගේ ව්‍යාපාරික අවශ්‍යතා සාකච්ඡා කරන්න' : lang === 'ta' ? 'உங்கள் வணிகத் தேவைகளைப் பற்றி விவாதிக்கவும்' : 'Discuss Your Business Requirements'}
            <span className="text-[#0094ff] block mt-1.5">
              {lang === 'si' ? 'Raxwo ඉංජිනේරුවන් සමඟ' : lang === 'ta' ? 'Raxwo பொறியாளர்களுடன்' : 'with Raxwo Engineers'}
            </span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {lang === 'si' 
              ? 'ඔබගේ ව්‍යාපෘතිය, ව්‍යාපාරික අවශ්‍යතා, ඉලක්ක සහ අභියෝග අපට කියන්න. අපගේ කණ්ඩායම ඔබගේ අවශ්‍යතා හඳුනාගෙන ඔබගේ ව්‍යාපාරයට වඩාත් සුදුසු තාක්ෂණය සහ ඩිජිටල් විසඳුම නිර්දේශ කරනු ඇත.'
              : lang === 'ta'
              ? 'உங்கள் திட்டம், வணிகத் தேவைகள், இலக்குகள் மற்றும் சவால்கள் பற்றி எங்களிடம் கூறுங்கள். எங்கள் குழு உங்கள் தேவைகளைப் புரிந்து கொண்டு உங்கள் வணிகத்திற்கான சரியான தொழில்நுட்ப தீர்வை பரிந்துரைக்கும்.'
              : 'Tell us about your project, business requirements, goals, and challenges. Our team will understand your needs and recommend the right technology and digital solution for your business.'}
          </p>

        </div>
      </section>

      {/* 2. DIRECT CONTACT CARDS (4 Spacious Cards) */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-16 sm:mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: WhatsApp */}
          <div className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-[#25D366]/60' 
              : 'bg-white border-slate-200 hover:border-[#25D366] shadow-sm'
          }`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'si' ? 'WhatsApp සහාය' : lang === 'ta' ? 'WhatsApp ஆதரவு' : 'WhatsApp Support'}
              </h3>
              <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'si' ? 'ආදර්ශන, තිරපිටපත් සහ මිල ගණන් සඳහා කඩිනම් ප්‍රතිචාර.' : lang === 'ta' ? 'மாதிரிகள் மற்றும் தனிப்பயன் விலைகளுக்கான விரைவான பதில்.' : 'Fastest response for demos, screenshots, and custom pricing.'}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm font-bold text-[#25D366]">
                <span>+94 74 357 3333</span>
                <button
                  type="button"
                  onClick={() => handleCopy('+94743573333', 'whatsapp')}
                  className="text-slate-400 hover:text-[#25D366] transition-colors p-1 cursor-pointer"
                  title="Copy number"
                >
                  {copiedField === 'whatsapp' ? <CheckCheck className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href="https://wa.me/94743573333?text=Hi%20Raxwo%20Team%2C%20I%20would%20like%20to%20discuss%20my%20business%20software%20requirements."
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-[#25D366] hover:bg-[#20ba59] text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{lang === 'si' ? 'WhatsApp සංවාදය' : lang === 'ta' ? 'WhatsApp அரட்டை' : 'Chat on WhatsApp'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Phone Hotline */}
          <div className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-[#0094ff]/60' 
              : 'bg-white border-slate-200 hover:border-[#0094ff] shadow-sm'
          }`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0094ff]/15 text-[#0094ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'si' ? 'සෘජු ඇමතුම්' : lang === 'ta' ? 'நேரடி அழைப்பு' : 'Direct Call'}
              </h3>
              <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'si' ? 'ජ්‍යෙෂ්ඨ මෘදුකාංග ඉංජිනේරුවන් සහ උපදේශකයින් සමඟ සෘජුවම කතා කරන්න.' : lang === 'ta' ? 'பொறியாளர்கள் மற்றும் ஆலோசகர்களுடன் நேரடியாக பேசுங்கள்.' : 'Speak directly with senior software architects and sales consultants.'}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm font-bold text-[#0094ff]">
                <span>+94 74 357 3333</span>
                <button
                  type="button"
                  onClick={() => handleCopy('+94743573333', 'phone')}
                  className="text-slate-400 hover:text-[#0094ff] transition-colors p-1 cursor-pointer"
                  title="Copy number"
                >
                  {copiedField === 'phone' ? <CheckCheck className="w-4 h-4 text-[#0094ff]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href="tel:+94743573333"
              className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-[#0094ff] hover:bg-[#0080e0] text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{lang === 'si' ? 'දැන්ම අමතන්න' : lang === 'ta' ? 'இப்போதே அழைக்கவும்' : 'Call Us Now'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Email */}
          <div className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-purple-500/60' 
              : 'bg-white border-slate-200 hover:border-purple-500 shadow-sm'
          }`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'si' ? 'විද්‍යුත් තැපැල් විමසීම්' : lang === 'ta' ? 'மின்னஞ்சல் விசாரணைகள்' : 'Email Inquiries'}
              </h3>
              <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'si' ? 'නිල පද්ධති විස්තර, මිල ගණන් සහ නිල යෝජනා සඳහා.' : lang === 'ta' ? 'முறைசார்ந்த விவரக்குறிப்புகள் மற்றும் மேற்கோள்களுக்கு.' : 'For formal system specifications, quotations, and official proposals.'}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm font-bold text-purple-400">
                <span>sales@raxwo.lk</span>
                <button
                  type="button"
                  onClick={() => handleCopy('sales@raxwo.lk', 'email')}
                  className="text-slate-400 hover:text-purple-400 transition-colors p-1 cursor-pointer"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <CheckCheck className="w-4 h-4 text-purple-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <a
              href="mailto:sales@raxwo.lk?subject=Inquiry%20about%20Raxwo%20ERP%20Solutions"
              className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300'
              }`}
            >
              <span>{lang === 'si' ? 'ඊමේල් එකක් යවන්න' : lang === 'ta' ? 'மின்னஞ்சல் அனுப்பவும்' : 'Send an Email'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: Location */}
          <div className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between group hover:shadow-xl ${
            isDark 
              ? 'bg-[#0b1226]/90 border-slate-800 hover:border-amber-500/60' 
              : 'bg-white border-slate-200 hover:border-amber-500 shadow-sm'
          }`}>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'si' ? 'ප්‍රධාන කාර්යාලය' : lang === 'ta' ? 'தலைமை அலுவலகம்' : 'Head Office'}
              </h3>
              <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {lang === 'si' ? 'දෘඩාංග පරීක්ෂා කිරීම සහ සජීවී ආදර්ශන සඳහා අප කාර්යාලයට පැමිණෙන්න.' : lang === 'ta' ? 'வன்பொருள் சோதனை மற்றும் நேரடி காட்சிகளுக்கு அலுவலகத்திற்கு வருகை தரவும்.' : 'Visit our tech desk for hardware testing and live counter simulations.'}
              </p>
              <div className="mt-4 text-sm font-bold text-amber-400">
                <span>{lang === 'si' ? 'වැලිවේරිය, ශ්‍රී ලංකාව' : lang === 'ta' ? 'வெலிவேரிய, இலங்கை' : 'Weliweriya, Sri Lanka'}</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Weliweriya+Sri+Lanka"
              target="_blank"
              rel="noreferrer"
              className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300'
              }`}
            >
              <span>{lang === 'si' ? 'සිතියම බලන්න' : lang === 'ta' ? 'வரைபடத்தில் காண்க' : 'View on Map'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 3. MAIN FORM & LOCATION SECTION (Comfortable 2-Column Grid) */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20 mb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: Clean, Friendly Contact Form (7 Cols) */}
          <div className="lg:col-span-7 w-full">
            <div className={`p-8 sm:p-10 rounded-3xl border shadow-xl transition-all ${
              isDark 
                ? 'bg-[#0a0f24]/95 border-slate-800' 
                : 'bg-white border-slate-200'
            }`}>
              
              <div className="mb-8">
                <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lang === 'si' ? 'අපට පණිවිඩයක් එවන්න' : lang === 'ta' ? 'எங்களுக்கு ஒரு செய்தி அனுப்பவும்' : 'Send Us a Message'}
                </h2>
                <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {lang === 'si' 
                    ? 'ගැටලුවක් ඇත්නම් හෝ මිල ගණන් අවශ්‍ය නම් පහත පෝරමය පුරවන්න. ඉංජිනේරුවෙකු කඩිනමින් ඔබව සම්බන්ධ කර ගනු ඇත.'
                    : lang === 'ta'
                    ? 'கேள்வி உள்ளதா அல்லது மேற்கோள் தேவையா? படிவத்தை நிரப்பவும், பொறியாளர் உடனடியாக உங்களைத் தொடர்புகொள்வார்.'
                    : 'Have a question or need a quote? Fill out the form below and an engineer will get back to you promptly.'}
                </p>
              </div>

              {isSuccess ? (
                <div className="py-12 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lang === 'si' ? 'පණිවිඩය සාර්ථකව ලැබිණි!' : lang === 'ta' ? 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!' : 'Message Sent Successfully!'}
                  </h3>
                  <p className={`text-sm max-w-md ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {lang === 'si' ? (
                      <>ස්තූතියි, <strong>{formData.name}</strong>. ඔබගේ විමසීම අප වෙත ලැබිණි (අංකය: <span className="font-mono text-emerald-400 font-bold">{referenceId}</span>). අපගේ ඉංජිනේරු කණ්ඩායම එය පරීක්ෂා කර කඩිනමින් ඔබව අමතනු ඇත.</>
                    ) : lang === 'ta' ? (
                      <>நன்றி, <strong>{formData.name}</strong>. உங்கள் விசாரணை பெறப்பட்டது (குறிப்பு எண்: <span className="font-mono text-emerald-400 font-bold">{referenceId}</span>). எங்கள் பொறியியல் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.</>
                    ) : (
                      <>Thank you, <strong>{formData.name}</strong>. We have received your inquiry (Ref: <span className="font-mono text-emerald-400 font-bold">{referenceId}</span>). Our engineering team will review it and reach out shortly.</>
                    )}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <a
                      href={`https://wa.me/94743573333?text=Hi%20Raxwo%2C%20I%20just%20sent%20an%20inquiry%20reference%20${referenceId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <span>{lang === 'si' ? 'WhatsApp මගින් කඩිනම් කරන්න' : lang === 'ta' ? 'WhatsApp இல் விரைவுபடுத்துங்கள்' : 'Speed Up on WhatsApp'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({ name: '', email: '', phone: '', product: 'mobixa', message: '' });
                      }}
                      className={`px-5 py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {lang === 'si' ? 'තවත් පණිවිඩයක් එවන්න' : lang === 'ta' ? 'மற்றொரு செய்தி அனுப்பவும்' : 'Send Another Message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs sm:text-sm font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {lang === 'si' ? 'ඔබගේ සම්පූර්ණ නම *' : lang === 'ta' ? 'உங்கள் முழுப் பெயர் *' : 'Your Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'si' ? 'උදා: නිමල් පෙරේරා' : lang === 'ta' ? 'எ.கா: நிமல் பெரேரா' : 'e.g. Nimal Perera'}
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0094ff] font-medium transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {lang === 'si' ? 'දුරකථන / WhatsApp අංකය *' : lang === 'ta' ? 'தொலைபேசி / WhatsApp *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 077 123 4567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0094ff] font-medium transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs sm:text-sm font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {lang === 'si' ? 'විද්‍යුත් තැපැල් ලිපිනය (විකල්ප)' : lang === 'ta' ? 'மின்னஞ்சல் முகவரி (விருப்பத்தேர்வு)' : 'Email Address (Optional)'}
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. nimal@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0094ff] font-medium transition-colors ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {lang === 'si' ? 'අවශ්‍ය පද්ධතිය / මෘදුකාංගය' : lang === 'ta' ? 'தேவையான தீர்வு' : 'Solution of Interest'}
                      </label>
                      <select
                        value={formData.product}
                        onChange={e => setFormData({ ...formData, product: e.target.value })}
                        className={`w-full px-4 py-3.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0094ff] font-medium transition-colors cursor-pointer ${
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
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {lang === 'si' ? 'ඔබගේ පණිවිඩය හෝ අවශ්‍යතා' : lang === 'ta' ? 'உங்கள் செய்தி அல்லது தேவைகள்' : 'Your Message or Requirements'}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={lang === 'si' ? 'ඔබගේ ව්‍යාපෘතිය, දැනට පවතින ක්‍රමය හෝ විශේෂ අවශ්‍යතා මෙහි සඳහන් කරන්න...' : lang === 'ta' ? 'உங்கள் திட்டம், கவுண்டர்கள் அல்லது குறிப்பிட்ட தேவைகள் பற்றி விவரிக்கவும்...' : 'Tell us about your project, current setup, counters, or specific requirements...'}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#0094ff] font-medium transition-colors resize-none ${
                        isDark 
                          ? 'bg-slate-900/90 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full !mt-6 py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-[#0094ff] hover:bg-[#0080e0] shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? (lang === 'si' ? 'පණිවිඩය යවමින් පවතී...' : lang === 'ta' ? 'செய்தி அனுப்பப்படுகிறது...' : 'Sending Message...') : (lang === 'si' ? 'පණිවිඩය යවන්න' : lang === 'ta' ? 'செய்தி அனுப்பவும்' : 'Send Message')}</span>
                  </button>

                  <p className="text-center text-xs text-slate-400 pt-1">
                    {lang === 'si' ? '🔒 ශ්‍රී ලංකාවේ ඉංජිනේරු කණ්ඩායමෙන් සෘජු ප්‍රතිචාර. කිසිදු අනවශ්‍ය කරදරකාරී ඇමතුම් නොලැබේ.' : lang === 'ta' ? '🔒 கொழும்பு பொறியியல் குழுவிடமிருந்து நேரடி பதில். ஸ்பேம் எதுவும் இல்லை.' : '🔒 Zero spam guarantee. Direct response from our Colombo engineering team.'}
                  </p>

                </form>
              )}

            </div>
          </div>

          {/* RIGHT: Office Location, Hours & Map (5 Cols) */}
          <div className="lg:col-span-5 w-full space-y-6">
            
            {/* Map & Office Card */}
            <div className={`rounded-3xl border overflow-hidden shadow-xl transition-all ${
              isDark ? 'bg-[#0a0f24]/95 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              <div className="relative w-full h-64 bg-slate-950 overflow-hidden">
                <iframe
                  title="Raxwo Office Location Map"
                  src="https://maps.google.com/maps?q=Weliweriya,%20Sri%20Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                ></iframe>
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#0094ff]" />
                  <span>{lang === 'si' ? 'Raxwo ප්‍රධාන කාර්යාලය' : lang === 'ta' ? 'Raxwo தலைமை அலுவலகம்' : 'Raxwo Head Office'}</span>
                </div>
              </div>

              <div className="p-7 space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <Building2 className="w-5 h-5 text-[#0094ff] shrink-0 mt-0.5" />
                  <div>
                    <strong className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'si' ? 'ප්‍රධාන කාර්යාලය:' : lang === 'ta' ? 'தலைமை அலுவலகம்:' : 'Head Office:'}
                    </strong>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                      {lang === 'si' ? 'වැලිවේරිය, ශ්‍රී ලංකාව' : lang === 'ta' ? 'வெலிவேரிய, இலங்கை' : 'Weliweriya, Sri Lanka'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'si' ? 'සේවා කාලය:' : lang === 'ta' ? 'வேலை நேரம்:' : 'Working Hours:'}
                    </strong>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                      {lang === 'si' ? 'සඳුදා – සෙනසුරාදා: පෙ.ව. 8:30 – ප.ව. 7:00' : lang === 'ta' ? 'திங்கள் – சனி: காலை 8:30 – மாலை 7:00' : 'Monday – Saturday: 8:30 AM – 7:00 PM (IST)'}
                    </span>
                    <span className="text-xs text-emerald-400 block mt-1 font-semibold">
                      {lang === 'si' ? '● සක්‍රීය වෙළඳසැල් සඳහා 24/7 WhatsApp හදිසි තාක්ෂණික සහාය' : lang === 'ta' ? '● செயலில் உள்ள கடைகளுக்கு 24/7 WhatsApp அவசர உதவி' : '● 24/7 WhatsApp emergency support for active stores'}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Weliweriya+Sri+Lanka"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      isDark 
                        ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-300'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#0094ff]" />
                    <span>{lang === 'si' ? 'Google සිතියමෙන් විවෘත කරන්න' : lang === 'ta' ? 'Google வரைபடத்தில் திறக்கவும்' : 'Open in Google Maps'}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Trust Highlights */}
            <div className={`p-7 rounded-3xl border ${
              isDark ? 'bg-[#0a0f24]/95 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${
                isDark ? 'text-cyan-400' : 'text-[#0094ff]'
              }`}>
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'si' ? 'Raxwo තෝරාගත යුත්තේ ඇයි' : lang === 'ta' ? 'Raxwo-வை ஏன் தேர்ந்தெடுக்க வேண்டும்' : 'Why Partner with Raxwo'}</span>
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {(lang === 'si' ? [
                  { title: '100% පූර්ණ හිමිකාරිත්වය', desc: 'එක්වරක් පමණක් ගෙවන්න, මාසික ගාස්තු නොමැතිව සදහටම හිමිකරගන්න.' },
                  { title: 'අන්තර්ජාලය නොමැතිවත් ක්‍රියාකාරීත්වය (Offline)', desc: 'අන්තර්ජාලය විසන්ධි වුවද බිල්පත් සහ POS පද්ධතිය බාධාවකින් තොරව ක්‍රියා කරයි.' },
                  { title: 'ශ්‍රී ලාංකීය විශේෂඥ කණ්ඩායම', desc: 'ඕනෑම ගැටලුවකට සෘජු WhatsApp සහ දුරකථන තාක්ෂණික සහාය.' }
                ] : lang === 'ta' ? [
                  { title: '100% நிரந்தர உரிமை', desc: 'ஒரு முறை செலுத்துங்கள், மாதாந்திர கட்டணமின்றி நிரந்தரமாக சொந்தமாக்குங்கள்.' },
                  { title: 'ஆஃப்லைன் நம்பகத்தன்மை', desc: 'இணையம் இல்லாதபோதும் பில்லிங் மற்றும் POS கவுண்டர்கள் இயங்கும்.' },
                  { title: 'அர்ப்பணிப்புள்ள இலங்கை குழு', desc: 'உங்களுக்கு உதவி தேவைப்படும் போதெல்லாம் நேரடி WhatsApp மற்றும் தொலைபேசி உதவி.' }
                ] : [
                  { title: '100% Perpetual Ownership', desc: 'Pay once, own the software forever without monthly seat taxes.' },
                  { title: 'Local Offline Reliability', desc: 'Bills and POS counters never stop, even during internet outages.' },
                  { title: 'Dedicated Sri Lankan Team', desc: 'Direct WhatsApp and phone assistance whenever you need help.' }
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</strong>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (Clean & Spacious Accordion) */}
      <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-10">
            <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'si' ? 'නිතර අසන ප්‍රශ්න' : lang === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
            </h2>
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {lang === 'si' ? 'අපගේ මෘදුකාංග, බලපත්‍ර සහ දෘඩාංග පිළිබඳ පොදු ප්‍රශ්න.' : lang === 'ta' ? 'மென்பொருள், உரிமங்கள் மற்றும் வன்பொருள் பற்றிய பொதுவான கேள்விகள்.' : 'Common questions about our software deployments, licenses, and hardware.'}
            </p>
          </div>

          <div className="space-y-4">
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
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className={`text-sm sm:text-base font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#0094ff] text-white' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className={`px-5 sm:px-6 pb-6 pt-1 text-sm leading-relaxed border-t ${
                      isDark ? 'text-slate-300 border-slate-800/80' : 'text-slate-600 border-slate-100'
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

    </div>
  );
}
