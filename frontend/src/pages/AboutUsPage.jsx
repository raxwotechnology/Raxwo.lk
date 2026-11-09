import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Clock, 
  MapPin, 
  Check,
  Printer,
  WifiOff,
  HeartHandshake,
  Store,
  Laptop,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export default function AboutUsPage({
  theme = 'dark',
  lang = 'en',
  onExploreProducts,
  onContactClick
}) {
  const isDark = theme === 'dark';
  const isSi = lang === 'si';
  const isTa = lang === 'ta';

  // 4 Core Numbers (Simplified & Clear)
  const stats = [
    { 
      value: '500+', 
      label: isSi ? 'සාර්ථක දේශීය ව්‍යාපාර' : isTa ? 'மகிழ்ச்சியான வணிகங்கள்' : 'Happy Businesses', 
      desc: isSi ? 'සුපිරි වෙළඳසැල්, හෝටල්, ෆාමසි හා ආයතන' : isTa ? 'இலங்கை முழுவதும் கடைகள் & உணவகங்கள்' : 'Supermarkets, stores & restaurants across Sri Lanka' 
    },
    { 
      value: '14+', 
      label: isSi ? 'සූදානම් මෘදුකාංග පද්ධති' : isTa ? 'தயாரான வணிக அமைப்புகள்' : 'Ready Business Systems', 
      desc: isSi ? 'ඕනෑම ව්‍යාපාරයකට ගැළපෙන විසඳුම්' : isTa ? 'நிறுவத் தயாராக உள்ள ERP & POS அமைப்புகள்' : 'Tailored ERP & POS systems ready to deploy' 
    },
    { 
      value: 'Rs. 0', 
      label: isSi ? 'මාසික බිල්පත් ගාස්තු නෑ' : isTa ? 'மாதாந்திர கட்டணம் இல்லை' : 'Zero Monthly Fees', 
      desc: isSi ? 'එක්වරක් පමණයි ගෙවන්නේ (Pay Once, Own Forever)' : isTa ? 'ஒரு முறை செலுத்துங்கள், நிரந்தரமாக சொந்தமாக்குங்கள்' : 'Pay once, own the software permanently' 
    },
    { 
      value: '15 Min', 
      label: isSi ? 'ඉගෙනීමට ගතවන කාලය' : isTa ? 'விரைவான பயிற்சி' : 'Quick Staff Training', 
      desc: isSi ? 'ඕනෑම කෙනෙකුට විනාඩි 15න් හුරු විය හැක' : isTa ? '15 நிமிடங்களில் எளிதாகக் கற்றுக்கொள்ளலாம்' : 'Simple interface designed for any age' 
    }
  ];

  // 4 Simple Pillars (What makes Raxwo special)
  const features = [
    {
      icon: ShieldCheck,
      color: 'blue',
      badge: isSi ? 'ස්ථිර අයිතිය' : isTa ? '100% உரிமை' : '100% OWNERSHIP',
      title: isSi ? 'මාසික බිල්පත් ගෙවන්න ඕනෙ නෑ' : isTa ? 'மாதாந்திர சந்தா கட்டணங்கள் இல்லை' : 'No Monthly Software Subscriptions',
      desc: isSi 
        ? 'වෙනත් මෘදුකාංග වලට මසකට රු. 10,000 - 30,000ක් නිකරුණේ ගෙවන්න වෙනවා. Raxwo වලදී ඔබ ගෙවන්නේ එක් වරක් පමණි. මෘදුකාංගය සදහටම ඔබට හිමිවේ.'
        : isTa
        ? 'பெரும்பாலான நிறுவனங்கள் மாதாந்திர கட்டணம் வசூலிக்கின்றன. Raxwo-வில் நீங்கள் ஒரு முறை மட்டுமே செலுத்துகிறீர்கள், அது எப்போதும் உங்களுடையது.'
        : 'Most software companies charge you every single month just to use the system. With Raxwo, you pay once and it is yours forever. No hidden fees or recurring deductions.'
    },
    {
      icon: WifiOff,
      color: 'emerald',
      badge: isSi ? 'නොනවතින සේවය' : isTa ? 'ஆஃப்லைனில் இயங்கும்' : 'WORKS OFFLINE',
      title: isSi ? 'ඉන්ටනෙට් නැතත් බිල් ගහන්න පුළුවන්' : isTa ? 'இணையம் இல்லாவிட்டாலும் தொடர்ந்து இயங்கும்' : 'Keeps Running Even Without Internet',
      desc: isSi 
        ? 'වැස්සකට හෝ විදුලි විසන්ධි වීමකදී අන්තර්ජාලය නැති වුණත් බිල්පත් ගැසීම කිසි විටෙකත් නතර නොවේ. නැවත ඉන්ටනෙට් ආ විට සියල්ල ස්වයංක්‍රීයව Sync වේ.'
        : isTa
        ? 'மழை அல்லது மின்வெட்டு உங்கள் பில்லிங்கை நிறுத்தாது. Raxwo ஆஃப்லைனில் தடையின்றி செயல்படுகிறது மற்றும் இணையம் திரும்பும்போது தானாகவே ஒத்திசைக்கிறது.'
        : 'Rain, power cuts, or Wi-Fi disconnection will never stop your cashiers. Raxwo works seamlessly offline and automatically syncs sales when the connection returns.'
    },
    {
      icon: Users,
      color: 'purple',
      badge: isSi ? 'අතිශය සරලයි' : isTa ? 'மிகவும் எளிதானது' : 'SUPER SIMPLE',
      title: isSi ? 'ලොකු පොඩි ඕනෑම කෙනෙකුට පහසුයි' : isTa ? 'யாரும் எளிதாகப் பயன்படுத்தும் வகையில் வடிவமைக்கப்பட்டுள்ளது' : 'Designed So Anyone Can Use It Easily',
      desc: isSi 
        ? 'පරිගණක දැනුමක් අවශ්‍යම නෑ. ලොකු අකුරු, පැහැදිලි බොත්තම් සහ සිංහල භාෂාවෙන් ක්‍රියාත්මක වන නිසා විනාඩි 15ක් ඇතුළත ඕනෑම කෙනෙකුට බිල්පත් ගසන්න හුරු විය හැක.'
        : isTa
        ? 'IT அறிவு தேவையில்லை. தெளிவான பொத்தான்கள் மற்றும் தமிழ்/சிங்களம்/ஆங்கில விருப்பங்கள் 15 நிமிடங்களில் எளிதாகக் கற்றுக்கொள்ள உதவுகின்றன.'
        : 'You do not need an IT degree. Clear buttons, touch-screen friendly screens, and Sinhala/Tamil/English options allow cashiers to learn everything in just 15 minutes.'
    },
    {
      icon: HeartHandshake,
      color: 'cyan',
      badge: isSi ? 'සුහදශීලී සහාය' : isTa ? 'உள்ளூர் ஆதரவு' : 'LOCAL SUPPORT',
      title: isSi ? 'අපේම ශ්‍රී ලාංකීය ඉංජිනේරු සහාය' : isTa ? 'நட்பான இலங்கை வாட்ஸ்அப் & தொலைபேசி ஆதரவு' : 'Friendly Sri Lankan WhatsApp & Phone Care',
      desc: isSi 
        ? 'විදේශීය රොබෝ පිළිතුරු නෑ. කොළඹ පිහිටි අපගේ ඉංජිනේරු කණ්ඩායම WhatsApp හෝ දුරකථනයෙන් සෘජුවම සම්බන්ධ වී ඔබට සහාය ලබාදේ.'
        : isTa
        ? 'ரோபோ பதில்கள் இல்லை. உங்களுக்கு உதவி தேவைப்படும் போது எங்கள் கொழும்பு பொறியியல் குழு நேரடியாக WhatsApp அல்லது தொலைபேசி மூலம் உடனடியாக தீர்க்கிறது.'
        : 'No frustrating foreign automated hotlines. When you need help, our Colombo engineering team connects directly via WhatsApp or phone to resolve any questions instantly.'
    }
  ];

  // How It Works in 4 Easy Steps
  const steps = [
    {
      num: '1',
      title: isSi ? 'ව්‍යාපාරික පද්ධතිය තෝරන්න' : isTa ? 'வணிக அமைப்பைத் தேர்ந்தெடுக்கவும்' : 'Choose Your Business System',
      desc: isSi 
        ? 'සිල්ලර කඩ, සුපිරි වෙළඳසැල්, හෝටල්, ෆාමසි, වාහන අමතර කොටස් හෝ බෙදාහැරීම් සඳහා ගැළපෙන පද්ධතිය තෝරන්න.' 
        : isTa
        ? 'உங்கள் கடைக்கு ஏற்ற மென்பொருளைத் தேர்ந்தெடுக்கவும் - சில்லறை POS, உணவகம், மருந்தகம் அல்லது மொத்த விற்பனை.'
        : 'Pick the software designed for your store — Retail POS, Restaurant, Pharmacy, Wholesale, or Workshop.'
    },
    {
      num: '2',
      title: isSi ? 'පරිගණක හා ප්‍රින්ටර් සම්බන්ධ කිරීම' : isTa ? 'வன்பொருள் மற்றும் அச்சுப்பொறிகளை இணைத்தல்' : 'Connect Your Hardware & Printers',
      desc: isSi 
        ? 'ඔබ සතු EPSON, Xprinter බිල්පත් ප්‍රින්ටර්, බාර්කෝඩ් ස්කෑනර් සහ මුදල් පෙට්ටිය අපි නොමිලේම සකස් කර දෙන්නෙමු.' 
        : isTa
        ? 'ரசீது பிரிண்டர், பார்கோடு ஸ்கேனர் மற்றும் கேஷ் டிராயர் ஆகியவற்றை நாங்கள் இலவசமாக இணைக்கிறோம்.'
        : 'We connect your receipt printer, barcode scanner, and cash drawer — plug-and-play with zero hassle.'
    },
    {
      num: '3',
      title: isSi ? 'කාර්ය මණ්ඩලයට නොමිලේ පුහුණුව' : isTa ? 'ஊழியர்களுக்கு இலவச பயிற்சி' : 'Free Training for Your Staff',
      desc: isSi 
        ? 'මුදල් අයකැමි සහ කළමනාකාරීත්වයට බිල් ගැසීම, තොග පරීක්ෂාව සහ ලාභ ගණනය කිරීම පියවරෙන් පියවර කියාදෙන්නෙමු.' 
        : isTa
        ? 'பில்லிங், இருப்பு சரிபார்ப்பு மற்றும் தினசரி லாபத்தை நம்பிக்கையுடன் சரிபார்க்க காசாளர்களுக்கு நாங்கள் கற்பிக்கிறோம்.'
        : 'We teach your cashiers and managers how to bill, count stock, and check daily profits with confidence.'
    },
    {
      num: '4',
      title: isSi ? 'සාර්ථකව ව්‍යාපාරය දියුණු කරන්න' : isTa ? 'விற்பனையைத் தொடங்கி மகிழுங்கள்' : 'Start Selling & Grow Happily',
      desc: isSi 
        ? 'කිසිදු මාසික බිල්පත් බියකින් තොරව, ජීවිත කාලයටම හිමි පද්ධතියක් සමඟින් ඔබේ වෙළඳසැල වේගයෙන් ඉදිරියට ගෙන යන්න.' 
        : isTa
        ? 'மாதாந்திர கட்டணங்கள் இன்றி மன அமைதியுடன் வாழ்நாள் மென்பொருள் ஆதரவை அனுபவிக்கவும்.'
        : 'Enjoy lifetime ownership with 100% peace of mind and lifetime local software support.'
    }
  ];

  // Leadership Team (Friendly & Compact)
  const leadershipTeam = [
    {
      name: 'Dr. Rohan Jayasinghe',
      role: isSi ? 'ප්‍රධාන තාක්ෂණික ඉංජිනේරු (CTO)' : isTa ? 'தலைமை தொழில்நுட்ப அதிகாரி (CTO)' : 'Chief Technology Officer',
      focus: isSi ? 'පද්ධති ක්‍රියාකාරීත්වය හා ආරක්ෂාව' : isTa ? 'கணினி செயல்திறன் மற்றும் பாதுகாப்பு' : 'Core ERP Architecture & Speed',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Dineli Senanayake',
      role: isSi ? 'පරිශීලක අතුරුමුහුණත් නිර්මාණ ප්‍රධානී (UX)' : isTa ? 'பயனர் அனுபவ தலைவர் (UX)' : 'Head of User Experience (UX)',
      focus: isSi ? 'ඕනෑම කෙනෙකුට සරලව භාවිත කළ හැකි සැලසුම්' : isTa ? 'பயன்படுத்த எளிதான திரைகளை வடிவமைத்தல்' : 'Designing Easy Screens for Cashiers',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Kaveen Fernando',
      role: isSi ? 'දෘඩාංග හා ප්‍රින්ටර් විශේෂඥ (POS)' : isTa ? 'வன்பொருள் மற்றும் அச்சுப்பொறி நிபுணர்' : 'Head of POS & Hardware Systems',
      focus: isSi ? 'රිසිට්පත් ප්‍රින්ටර් හා ස්කෑනර් සම්බන්ධතා' : isTa ? 'ரசீது அச்சுப்பொறிகள் & ஸ்கேனர் இணக்கம்' : 'Receipt Printers & Barcode Scanners',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Natasha Perera',
      role: isSi ? 'පාරිභෝගික සත්කාරක ප්‍රධානී' : isTa ? 'வாடிக்கையாளர் பராமரிப்பு இயக்குனர்' : 'Director of Customer Care & Training',
      focus: isSi ? 'කාර්ය මණ්ඩල පුහුණුව හා WhatsApp සහාය' : isTa ? 'பயிற்சி மற்றும் WhatsApp ஆதரவு' : 'Client Onboarding & 24/7 Helpline',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className={`w-full pt-4 sm:pt-6 pb-28 transition-colors overflow-hidden ${
      isDark ? 'text-white bg-[#080b18]' : 'text-slate-900 bg-slate-50/70'
    }`}>
      
      {/* 1. TOP HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mb-12 sm:mb-16 reveal-on-scroll">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border shadow-sm backdrop-blur-md bg-blue-500/10 text-blue-500 border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>
              {isSi ? 'RAXWO ගැන සරලව • අපගේ කතාව' : isTa ? 'RAXWO பற்றி • எங்களின் கதை' : 'ABOUT RAXWO • HONEST BUSINESS SOFTWARE'}
            </span>
          </div>

          {/* Clean Main Title */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {isSi ? 'ඔබගේ ව්‍යාපාරයට සරල හා විශ්වාසනීය' : isTa ? 'உங்கள் வணிகத்திற்கான எளிய & நம்பகமான' : 'Simple, Reliable Software That You'}{' '}
            <span className="text-[#0094ff]">
              {isSi ? 'එක්වරක් පමණක් ගෙවන මෘදුකාංග' : isTa ? 'நிரந்தர மென்பொருள் தீர்வுகள்' : 'Truly Own Forever'}
            </span>
          </h1>

          {/* Simple, Readable Subtitle for Everyone */}
          <p className={`text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {isSi
              ? 'අපගේ අරමුණ වන්නේ සිල්ලර කඩ, සුපිරි වෙළඳසැල්, ආපනශාලා හෝ කර්මාන්තශාලා පවත්වාගෙන යන ඕනෑම කෙනෙකුට මාසික ගාස්තු හෝ පරිගණක ගැටලු නැතිව, පහසුවෙන් බිල්පත් ගසමින් ව්‍යාපාරය දියුණු කරගැනීමට අවශ්‍ය මෘදුකාංග සාධාරණ මිලකට ලබාදීමයි.'
              : isTa
              ? 'Raxwo-வில், மென்பொருள் எளிமையாகவும், மலிவாகவும் இருக்க வேண்டும் என்று நாங்கள் நம்புகிறோம். மாதாந்திர கட்டணங்கள் இன்றி, முழுமையான ஆஃப்லைன் நம்பகத்தன்மையுடன் வணிகங்களை நிர்வகிக்கக்கூடிய அமைப்புகளை நாங்கள் உருவாக்குகிறோம்.'
              : 'At Raxwo, we believe software should be simple, honest, and affordable. We build modern retail and business management systems that you pay for once and own permanently — with zero monthly fees, full offline reliability, and friendly Sri Lankan support.'}
          </p>

          {/* 3 Quick Simple Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 text-xs font-semibold">
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
              <span>{isSi ? 'මාසික ගාස්තු නෑ (One-Time Purchase)' : isTa ? 'மாதாந்திர கட்டணம் இல்லை' : 'Pay Once, Keep Forever'}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              <Check className="w-3.5 h-3.5 text-blue-500 font-bold" />
              <span>{isSi ? 'ඉන්ටනෙට් නැතත් බිල්පත් මුද්‍රණය' : isTa ? '100% ஆஃப்லைனில் இயங்கும்' : 'Works 100% Offline'}</span>
            </div>
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
              isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}>
              <Check className="w-3.5 h-3.5 text-purple-500 font-bold" />
              <span>{isSi ? 'විනාඩි 15න් හුරු විය හැකි සරල ක්‍රමය' : isTa ? '15 நிமிட விரைவு பயிற்சி' : '15-Minute Staff Training'}</span>
            </div>
          </div>

        </div>

        {/* ========================================================
            BALANCED, NEAT, MODERATE-SIZED PHOTO STRIP (3 CARDS)
            Replaces the oversized, ugly towering images
           ======================================================== */}
        <div className="max-w-5xl mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            
            {/* Card 1: Our Friendly Development Team */}
            <div className={`rounded-2xl border overflow-hidden transition-all duration-300 group shadow-md hover:shadow-xl ${
              isDark ? 'bg-[#0a0f24] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                  alt="Raxwo Software Team Colombo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 block">
                    {isSi ? 'අපගේ ඉංජිනේරු කණ්ඩායම' : isTa ? 'எங்கள் பொறியியல் குழு' : 'COLOMBO TECH LAB'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold truncate">
                    {isSi ? 'කොළඹ ප්‍රධාන තාක්ෂණික මධ්‍යස්ථානය' : isTa ? 'கொழும்பு மென்பொருள் பொறியாளர்கள்' : 'Local Software Engineers'}
                  </h4>
                </div>
              </div>
            </div>

            {/* Card 2: Hardware & POS Testing Bench */}
            <div className={`rounded-2xl border overflow-hidden transition-all duration-300 group shadow-md hover:shadow-xl ${
              isDark ? 'bg-[#0a0f24] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80" 
                  alt="POS Hardware and Receipt Printers"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                    {isSi ? 'දෘඩාංග පරීක්ෂණාගාරය' : isTa ? 'வன்பொருள் ஆய்வகம்' : 'HARDWARE TEST BENCH'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold truncate">
                    {isSi ? 'ප්‍රින්ටර් හා ස්කෑනර් අනුකූලතාව' : isTa ? 'பிரிண்டர்கள் மற்றும் ஸ்கேனர் சோதனை' : 'Printers & Scanner Testing'}
                  </h4>
                </div>
              </div>
            </div>

            {/* Card 3: Real Stores & Happy Cashiers */}
            <div className={`rounded-2xl border overflow-hidden transition-all duration-300 group shadow-md hover:shadow-xl ${
              isDark ? 'bg-[#0a0f24] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80" 
                  alt="Real Retail Stores & Friendly Staff"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 block">
                    {isSi ? 'වෙළඳසැල් මෙහෙයුම්' : isTa ? 'கடைகளின் பயன்பாடு' : 'REAL STORE WORKFLOWS'}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold truncate">
                    {isSi ? 'පාරිභෝගිකයන්ට වේගවත් සේවයක්' : isTa ? 'விரைவான சேவை & திருப்தியான வாடிக்கையாளர்கள்' : 'Fast Checkout & Happy Clients'}
                  </h4>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. STATS STRIP (Clear, Inspiring Numbers) */}
      <section className={`w-full py-10 px-4 sm:px-8 lg:px-12 xl:px-16 border-y mb-16 reveal-on-scroll ${
        isDark ? 'border-slate-800/80 bg-[#060916]' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black text-[#0094ff] tracking-tight">
                {s.value}
              </span>
              <span className={`text-sm sm:text-base font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {s.label}
              </span>
              <span className={`text-xs mt-0.5 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {s.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUR CORE PILLARS: WHY PEOPLE CHOOSE RAXWO */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mb-20 reveal-on-scroll">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-500 block mb-1">
              {isSi ? 'අපගේ විශේෂත්වය' : isTa ? 'எங்கள் சிறப்பு' : 'WHY BUSINESSES CHOOSE US'}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {isSi ? 'Raxwo අනෙක් මෘදුකාංග වලින් වෙනස් වන්නේ ඇයි?' : isTa ? 'வணிகங்கள் Raxwo-வை விரும்புவதற்கான 4 காரணங்கள்' : 'Four Reasons Businesses Love Raxwo'}
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {isSi 
                ? 'ව්‍යාපාරිකයන්ට කරදරයක් නැතිව, පහසුවෙන් භාවිත කළ හැකි සරල මෘදුකාංග නිර්මාණය කිරීම අපගේ ප්‍රතිපත්තියයි.'
                : isTa
                ? 'வணிக உரிமையாளர்களின் நலனைக் கருத்தில் கொண்டு உருவாக்கப்பட்டது. மாதாந்திர கவலைகள் இல்லை, குழப்பங்கள் இல்லை.'
                : 'Built with honesty and real-world shop owners in mind. No monthly headaches, no confusion.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isDark 
                      ? 'bg-[#0a0f24] border-slate-800 hover:border-slate-700 shadow-lg' 
                      : 'bg-white border-slate-200 hover:border-blue-300 shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-500 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                        isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-black mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {feat.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS IN 4 EASY STEPS */}
      <section className={`w-full py-16 px-4 sm:px-8 lg:px-12 xl:px-16 border-y mb-20 reveal-on-scroll ${
        isDark ? 'border-slate-800/80 bg-[#060916]' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-500 block mb-1">
              {isSi ? 'සරල පියවර 4ක්' : isTa ? '4 எளிய படிகள்' : 'HOW IT WORKS'}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {isSi ? 'ඔබගේ වෙළඳසැලට පද්ධතිය සකසා දෙන සරල ක්‍රමය' : isTa ? 'உங்கள் கடைக்கு அமைப்பை அமைக்கும் 4 எளிய வழிகள்' : 'How We Set Up Your Store in 4 Simple Steps'}
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {isSi 
                ? 'පද්ධතිය තෝරාගත් මොහොතේ සිට බිල්පත් ගැසීම ආරම්භ කරන තුරු සියලු දේ අප විසින්ම සකස් කර දෙනු ලැබේ.'
                : isTa
                ? 'மென்பொருளைத் தேர்ந்தெடுப்பது முதல் முதல் பில் அச்சிடுவது வரை, எங்கள் பொறியாளர்கள் எல்லாவற்றையும் கவனித்துக் கொள்கிறார்கள்.'
                : 'From selecting your software to printing your first bill, our engineers take care of everything.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDark ? 'bg-[#0a0f24] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-md shadow-blue-600/30">
                    {st.num}
                  </div>
                  <h3 className={`text-sm sm:text-base font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {st.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. MEET OUR FRIENDLY LEADERSHIP TEAM (Compact & Clean) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mb-20">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-500 block mb-1">
              {isSi ? 'අපගේ කණ්ඩායම' : isTa ? 'எங்கள் குழு' : 'MEET THE TEAM'}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {isSi ? 'ඔබට සහාය දෙන Raxwo ඉංජිනේරුවන්' : isTa ? 'Raxwo-வை இயக்கும் எங்கள் பொறியாளர்கள்' : 'The People Powering Raxwo'}
            </h2>
            <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {isSi 
                ? 'ඔබගේ ව්‍යාපාරික පද්ධති සුරක්ෂිතව සහ වේගවත්ව පවත්වාගෙන යාමට නිරන්තරයෙන් කැපවන අපේම ඉංජිනේරුවන්.'
                : isTa
                ? 'உங்கள் வணிக அமைப்புகளை பாதுகாப்பாகவும் விரைவாகவும் வைத்திருக்க உறுதிபூண்ட அர்ப்பணிப்புள்ள மென்பொருள் பொறியாளர்கள்.'
                : 'Dedicated software architects, UX designers, and hardware specialists who treat your business like their own.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {leadershipTeam.map((member, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group ${
                  isDark 
                    ? 'bg-[#0a0f24] border-slate-800 hover:border-slate-700 shadow-md' 
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
                }`}
              >
                {/* Compact, clean photo (h-40) */}
                <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-slate-900">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-500 mt-0.5 mb-1.5">
                      {member.role}
                    </p>
                    <p className={`text-[11px] leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {member.focus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. COMMON QUESTIONS (FAQ For Everyone) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mb-20">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-8">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-500 block mb-1">
              {isSi ? 'නිතර අසන ප්‍රශ්න' : isTa ? 'பொதுவான கேள்விகள்' : 'COMMON QUESTIONS'}
            </span>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {isSi ? 'ඔබට දැනගැනීමට අවශ්‍ය ප්‍රධාන කරුණු' : isTa ? 'வணிக உரிமையாளர்கள் அடிக்கடி கேட்கும் கேள்விகள்' : 'Questions Business Owners Often Ask Us'}
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            {[
              {
                q: isSi 
                  ? 'අපගේ පරිගණකය අක්‍රිය වුවහොත් දත්ත නැතිවෙනවාද?' 
                  : isTa 
                  ? 'கணினி பழுதானால் அல்லது திருடப்பட்டால் என்ன நடக்கும்?' 
                  : 'What if our store computer breaks down or gets stolen?',
                a: isSi 
                  ? 'කිසිසේත්ම නෑ. පද්ධතියේ දිනපතාම ස්වයංක්‍රීයව Backup සටහන් වන අතර, නව පරිගණකයකට විනාඩි 15ක් ඇතුළත ඔබගේ සියලු දත්ත අප විසින්ම නැවත පූරණය කර දෙනු ලැබේ.'
                  : isTa
                  ? 'எப்போதும் இல்லை. Raxwo தினசரி தானியங்கி காப்புப்பிரதிகளை உருவாக்குகிறது. உங்கள் சாதனம் பழுதடைந்தால், 15 நிமிடங்களுக்குள் புதிய கணினியில் உங்கள் எல்லா தரவையும் மீட்டமைப்போம்.'
                  : 'Never. Raxwo creates daily automatic local and secure backups. If your machine fails, our technicians restore all your products, sales history, and customer records onto a replacement PC in under 15 minutes.'
              },
              {
                q: isSi 
                  ? 'දැනට අප ළඟ ඇති EPSON / Xprinter ප්‍රින්ටර් භාවිත කළ හැකිද?' 
                  : isTa 
                  ? 'எங்களிடம் உள்ள தெர்மல் பிரிண்டர்களைப் பயன்படுத்த முடியுமா?' 
                  : 'Can we use our existing EPSON / Xprinter thermal printers?',
                a: isSi 
                  ? 'ඔව්, ඔබ සතු ඕනෑම රිසිට්පත් මුද්‍රණ යන්ත්‍රයක්, බාර්කෝඩ් ස්කෑනරයක් හෝ මුදල් පෙට්ටියක් (Cash Drawer) Raxwo පද්ධතිය සමඟ 100% ක් පහසුවෙන්ම සම්බන්ධ කළ හැක.'
                  : isTa
                  ? 'ஆம்! Raxwo அனைத்து நிலையான 58mm/80mm தெர்மல் ரசீது அச்சுப்பொறிகள், பார்கோடு ஸ்கேனர்கள் மற்றும் பணப்பெட்டிகளுடன் முழுமையாக பொருந்தக்கூடியது.'
                  : 'Yes! Raxwo is fully plug-and-play with all standard ESC/POS 58mm/80mm thermal receipt printers, USB/Bluetooth barcode readers, and automated cash drawers.'
              },
              {
                q: isSi 
                  ? 'අපගේ ව්‍යාපාරයට විශේෂිත අංග (Custom Features) එකතු කරගත හැකිද?' 
                  : isTa 
                  ? 'எங்கள் வணிகத்திற்கு ஏற்ப சிறப்பு அம்சங்களைக் கோர முடியுமா?' 
                  : 'Can we request special custom features for our unique business workflow?',
                a: isSi 
                  ? 'ඔව්, අපගේ මෘදුකාංග නිර්මාණය කරන්නේ අපගේම ඉංජිනේරුවන් නිසා, ඔබගේ ව්‍යාපාරයට අවශ්‍ය ඕනෑම අමතර පහසුකමක් අවශ්‍ය පරිදි සාදා දීමට අපට හැකියාව ඇත.'
                  : isTa
                  ? 'நிச்சயமாக. Raxwo மென்பொருள் எங்கள் சொந்த இலங்கை குழுவால் உருவாக்கப்பட்டு பராமரிக்கப்படுவதால், உங்கள் தேவைக்கேற்ப மாற்றியமைக்க முடியும்.'
                  : 'Absolutely. Because all Raxwo software is built and maintained by our own in-house Sri Lankan software team, we can tailor screens, tax rules, and reports to match your exact operation.'
              }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-[#0a0f24] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {faq.q}
                    </h3>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WARM & FRIENDLY BOTTOM ACTION BANNER */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 reveal-on-scroll">
        <div className={`p-8 sm:p-12 rounded-3xl border text-center max-w-4xl mx-auto relative overflow-hidden transition-colors ${
          isDark 
            ? 'bg-[#0a0f24] border-slate-800 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="relative z-10 max-w-xl mx-auto">
            <span className={`text-[11px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full border inline-block mb-3 ${
              isDark 
                ? 'bg-blue-500/20 text-cyan-300 border-blue-400/30' 
                : 'bg-blue-50 text-blue-600 border-blue-200'
            }`}>
              {isSi ? 'සජීවීව දැකබලා ගන්න' : isTa ? 'நேரடியாகப் பாருங்கள்' : 'SEE IT IN ACTION'}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mb-3 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {isSi ? 'පද්ධතිය ක්‍රියාත්මක වන අයුරු සජීවීව බලමුද?' : isTa ? 'இது எவ்வளவு எளிமையானது என்பதைப் பார்க்க வேண்டுமா?' : 'Want to See How Simple It Really Is?'}
            </h2>
            <p className={`text-xs sm:text-sm mb-6 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {isSi 
                ? 'විනාඩි 5ක සජීවී වීඩියෝවක් WhatsApp හරහා ලබාගැනීමට හෝ කොළඹ කාර්යාලයට පැමිණ අත්හදාබැලීමට අදම අප හා සම්බන්ධ වන්න.'
                : isTa
                ? 'வாட்ஸ்அப்பில் 5 நிமிட நேரடி டெமோவைக் காண அல்லது கொழும்பு அலுவலகத்தில் நேரில் சோதிக்க இன்றே தொடர்பு கொள்ளுங்கள்.'
                : 'Watch a 5-minute live screen demo on WhatsApp or visit our Colombo demo room to test with your own products.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onExploreProducts}
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-sm transition-all cursor-pointer hover:scale-105"
              >
                {isSi ? 'මෘදුකාංග 14 බලන්න' : isTa ? 'தயாரிப்புகளை ஆராய்க' : 'Explore Ready ERPs'}
              </button>
              <a
                href="https://wa.me/94743573333?text=Hello%20Raxwo%20Team%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20software%20solutions."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm transition-all cursor-pointer hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                <span>{isSi ? 'WhatsApp හරහා විමසන්න' : isTa ? 'WhatsApp இல் அரட்டையடிக்கவும்' : 'Chat on WhatsApp'}</span>
              </a>
              <button
                type="button"
                onClick={onContactClick}
                className={`px-6 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                  isDark
                    ? 'text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border-slate-700'
                    : 'text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-300'
                }`}
              >
                {isSi ? 'සම්බන්ධ වන්න' : isTa ? 'தொடர்பு கொள்ள' : 'Contact Us'}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
