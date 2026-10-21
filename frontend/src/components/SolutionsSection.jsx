import React from 'react';
import { 
  Languages, 
  Printer, 
  Server, 
  ShieldCheck, 
  Smartphone, 
  Zap 
} from 'lucide-react';
import { getTranslation } from '../i18n/translations';

export default function SolutionsSection({ onOpenInquiry, theme = 'dark', lang = 'en' }) {
  const isDark = theme === 'dark';
  const t = (k) => getTranslation(lang, k);

  const capabilities = lang === 'si' ? [
    {
      icon: Languages,
      title: "භාෂා ත්‍රිත්ව අතුරුමුහුණත",
      description: "මුදල් අයකැමි, ගබඩා සේවක සහ කළමනාකාරීත්වය සඳහා සිංහල, දෙමළ සහ ඉංග්‍රීසි භාෂා අතර පහසුවෙන් මාරු විය හැක."
    },
    {
      icon: Printer,
      title: "දෘඩාංග සමඟ සෘජු සබඳතාව (Plug & Play)",
      description: "ESC/POS 58mm/80mm රිසිට්පත් මුද්‍රණ යන්ත්‍ර, බාර්කෝඩ් ස්කෑනර් සහ තරාදි සමඟ පහසුවෙන් සම්බන්ධ වේ."
    },
    {
      icon: Server,
      title: "අන්තර්ජාලය නොමැතිව ක්‍රියාත්මක වීම (Offline-First)",
      description: "අන්තර්ජාල විසන්ධි වීමකදී පවා බිල්පත් නිකුත් කළ හැක. සබඳතාව ලැබුණු වහාම Cloud සේවාදායකය සමඟ ස්වයංක්‍රීයව සමමුහුර්ත වේ."
    },
    {
      icon: ShieldCheck,
      title: "දේශීය බදු සහ නීතිමය අනුකූලතාව",
      description: "ශ්‍රී ලංකා වැට් (VAT 18%) සහ සමාජ ආරක්ෂණ බද්ද (SSCL 2.5%) ඇතුළත් නිවැරදි ඉන්වොයිස් සහ බිල්පත් නිකුත් කිරීමේ හැකියාව."
    },
    {
      icon: Smartphone,
      title: "ඕනෑම උපාංගයකින් ප්‍රවේශය",
      description: "Windows පරිගණක, Mac, Android ටැබ්ලට් සහ ජංගම දුරකථන හරහා බාධාවකින් තොරව භාවිත කළ හැක."
    },
    {
      icon: Zap,
      title: "මූල කේතයේ (Source Code) පූර්ණ අයිතිය",
      description: "මාසික ගාස්තු හෝ සීමාවන් නැත. සම්පූර්ණ මූල කේතය, දත්ත සමුදාය සහ ලේඛන ඔබ සතු වේ."
    }
  ] : lang === 'ta' ? [
    {
      icon: Languages,
      title: "மும்மொழி இடைமுகம்",
      description: "பணம் செலுத்துபவர், கிடங்கு ஊழியர்கள் மற்றும் நிர்வாகத்திற்காக தமிழ், சிங்களம் மற்றும் ஆங்கிலத்திற்கு இடையே எளிதாக மாறலாம்."
    },
    {
      icon: Printer,
      title: "வன்பொருள் இணைப்பு (Plug & Play)",
      description: "ESC/POS 58mm/80mm ரசீது அச்சுப்பொறிகள், பார்கோடு லேபிளர்கள் மற்றும் எடை அளவீடுகளுடன் நேரடி இணைப்பு."
    },
    {
      icon: Server,
      title: "இணையம் இல்லாமலும் செயல்படும் திறன் (Offline-First)",
      description: "இணையம் இல்லாதபோதும் பில்லிங் செய்யலாம். இணைப்பு கிடைத்தவுடன் தானாகவே Cloud சேவையகத்துடன் ஒத்திசைக்கப்படும்."
    },
    {
      icon: ShieldCheck,
      title: "உள்ளூர் வரி மற்றும் இணக்கம்",
      description: "இலங்கை VAT (18%) மற்றும் சமூக பாதுகாப்பு வரி (SSCL 2.5%) ஆகியவற்றுக்கான விரிவான விலைப்பட்டியல்கள்."
    },
    {
      icon: Smartphone,
      title: "அனைத்து சாதனங்களிலும் அணுகல்",
      description: "Windows, Mac, Android டேப்லெட்கள் மற்றும் மொபைல் போன்களில் மென்மையான பயன்பாட்டு அனுபவம்."
    },
    {
      icon: Zap,
      title: "முழு மூலக் குறியீடு உரிமை",
      description: "மாதாந்திர கட்டணங்கள் இல்லை. முழுமையான மூலக் குறியீடு மற்றும் தரவுத்தள திட்டம் உங்களுக்கு வழங்கப்படுகிறது."
    }
  ] : [
    {
      icon: Languages,
      title: "Tri-Lingual Interface",
      description: "Switch seamlessly between English, සිංහල, and தமிழ் for cashier, warehouse workers, and executives."
    },
    {
      icon: Printer,
      title: "Hardware Plug & Play",
      description: "Direct connection with ESC/POS 58mm/80mm thermal receipt printers, zebra barcode labelers, and weighing scales."
    },
    {
      icon: Server,
      title: "Offline-First Local Sync",
      description: "Keep billing customers even when internet breaks down. Automatically synchronizes to the cloud server once reconnected."
    },
    {
      icon: ShieldCheck,
      title: "Local Tax & RAMIS Compliance",
      description: "Built-in Sri Lanka VAT (18%), Social Security Contribution Levy (SSCL 2.5%), and customizable tax breakdown invoices."
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Access",
      description: "Native responsive experience on Windows, macOS, Android tablets, iPads, and mobile phones with zero lag."
    },
    {
      icon: Zap,
      title: "Full Source Code Ownership",
      description: "No recurring vendor lock-in. You receive the complete source code, documentation, and database schema."
    }
  ];

  return (
    <section id="solutions" className={`relative w-full py-20 px-6 sm:px-10 lg:px-16 xl:px-20 transition-colors duration-300 ${
      isDark ? 'bg-[#060815]' : 'bg-[#ffffff]'
    }`}>
      


      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className={`text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-3 inline-block ${
          isDark 
            ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
            : 'text-cyan-800 bg-cyan-100 border border-cyan-300'
        }`}>
          {lang === 'si' ? 'ශ්‍රී ලාංකීය සහ ගෝලීය ව්‍යාපාර සඳහාම විශේෂිතයි' : lang === 'ta' ? 'இலங்கை மற்றும் உலகளாவிய வணிகங்களுக்காக உருவாக்கப்பட்டது' : 'ENGINEERED FOR SRI LANKAN & GLOBAL WORKFLOWS'}
        </span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {lang === 'si' ? (
            <>
              Raxwo{' '}
              <span className="text-[#0094ff]">
                ඔබගේ ව්‍යාපාරික මෙහෙයුම් නව මඟකට යොමු කරන්නේ කෙසේද
              </span>
            </>
          ) : lang === 'ta' ? (
            <>
              Raxwo{' '}
              <span className="text-[#0094ff]">
                உங்கள் செயல்பாடுகளை எவ்வாறு மாற்றுகிறது
              </span>
            </>
          ) : (
            <>
              How Raxwo{' '}
              <span className="text-[#0094ff]">
                Transforms Your Operations
              </span>
            </>
          )}
        </h2>
        <p className={`text-sm sm:text-base mt-3 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {lang === 'si' ? 'මාස ගණන් බලා නොසිට පැය 48ක් ඇතුළත ඔබේ ව්‍යාපාරයට ගැළපෙන පූර්ණ ERP පද්ධතියක් සක්‍රීය කරගත හැක.' : lang === 'ta' ? 'மாதக்கணக்கில் காத்திருக்காமல் 48 மணி நேரத்திற்குள் உங்கள் வணிகத்திற்கான முழுமையான ERP அமைப்பை செயல்படுத்தலாம்.' : 'We combine ready-made modular templates with tailored customization so you can deploy an enterprise ERP within 48 hours instead of months.'}
        </p>
      </div>

      {/* 6 Capabilities Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((item, index) => {
          const Icon = item.icon;
          const iconColorThemes = [
            {
              // 1. Tri-Lingual Interface (Blue)
              light: 'bg-blue-50 border border-blue-200 text-blue-600',
              dark: 'bg-blue-950/60 border border-blue-800/40 text-blue-400',
              hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700/60',
              hoverTitle: 'group-hover:text-blue-600 dark:group-hover:text-blue-300'
            },
            {
              // 2. Hardware Plug & Play (Emerald Green)
              light: 'bg-emerald-50 border border-emerald-200 text-emerald-600',
              dark: 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400',
              hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700/60',
              hoverTitle: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-300'
            },
            {
              // 3. Offline-First Local Sync (Cyan / Sky)
              light: 'bg-cyan-50 border border-cyan-200 text-cyan-600',
              dark: 'bg-cyan-950/60 border border-cyan-800/40 text-cyan-400',
              hoverBorder: 'hover:border-cyan-300 dark:hover:border-cyan-700/60',
              hoverTitle: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
            },
            {
              // 4. Local Tax & Compliance (Purple / Violet)
              light: 'bg-purple-50 border border-purple-200 text-purple-600',
              dark: 'bg-purple-950/60 border border-purple-800/40 text-purple-400',
              hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-700/60',
              hoverTitle: 'group-hover:text-purple-600 dark:group-hover:text-purple-300'
            },
            {
              // 5. Cross-Platform Access (Rose / Pink)
              light: 'bg-rose-50 border border-rose-200 text-rose-600',
              dark: 'bg-rose-950/60 border border-rose-800/40 text-rose-400',
              hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-700/60',
              hoverTitle: 'group-hover:text-rose-600 dark:group-hover:text-rose-300'
            },
            {
              // 6. Full Source Code Ownership (Amber / Yellow)
              light: 'bg-amber-50 border border-amber-200 text-amber-600',
              dark: 'bg-amber-950/60 border border-amber-800/40 text-amber-400',
              hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700/60',
              hoverTitle: 'group-hover:text-amber-600 dark:group-hover:text-amber-300'
            }
          ];
          const themeColor = iconColorThemes[index % iconColorThemes.length];

          return (
            <div
              key={index}
              className={`p-6 rounded-3xl transition-all duration-300 group flex flex-col justify-between border interactive-card ${
                isDark 
                  ? `bg-[#0c1024]/75 border-slate-800 hover:bg-slate-800/40 ${themeColor.hoverBorder}` 
                  : `bg-white border-slate-200 shadow-md hover:shadow-2xl ${themeColor.hoverBorder}`
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                  isDark ? themeColor.dark : themeColor.light
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold transition-colors ${
                  isDark 
                    ? `text-white ${themeColor.hoverTitle}` 
                    : `text-slate-900 ${themeColor.hoverTitle}`
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm mt-2 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Customization Banner */}
      <div className={`mt-14 p-8 sm:p-10 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-cyan-900/40' 
          : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800 text-white'
      }`}>
        <div className="max-w-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Need custom features or unique branch workflow?
          </h3>
          <p className="text-sm text-slate-300 mt-2">
            Our software engineers can customize any module, connect your existing hardware, or integrate with accounting systems like QuickBooks, Xero, or custom databases.
          </p>
        </div>
        <button
          onClick={() => onOpenInquiry()}
          className="shrink-0 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105"
        >
          Request Custom Build
        </button>
      </div>

    </section>
  );
}
