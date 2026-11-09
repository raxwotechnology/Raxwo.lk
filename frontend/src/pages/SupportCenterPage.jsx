import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Headphones, MessageCircle, Mail, Clock } from 'lucide-react';

export default function SupportCenterPage({
  theme = 'dark',
  lang = 'en',
  onContactClick
}) {
  const isDark = theme === 'dark';

  const [openFaq, setOpenFaq] = useState(0); // 0 is open by default like screenshot
  const [showContactModal, setShowContactModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });

  const faqs = [
    {
      question: lang === 'si' 
        ? "ඔබ මූල කේතය (Source Code) ලබා දෙනවාද?" 
        : lang === 'ta'
        ? "மூலக் குறியீட்டை (Source Code) வழங்குகிறீர்களா?"
        : "Do you provide source code?",
      answer: lang === 'si'
        ? "ඔව්. ඔබ මිලදී ගන්නා සෑම මෘදුකාංග පැකේජයක් සමඟම සම්පූර්ණ මූල කේතය (Full Source Code) හිමිවේ."
        : lang === 'ta'
        ? "ஆம். நீங்கள் வாங்கும் ஒவ்வொரு தொகுப்பிலும் முழுமையான மூலக் குறியீடு சேர்க்கப்பட்டுள்ளது."
        : "Yes. Every package includes the complete source code for your purchased product."
    },
    {
      question: lang === 'si'
        ? "මට පද්ධතියේ වෙනස්කම් (Customization) සිදු කළ හැකිද?"
        : lang === 'ta'
        ? "நான் திட்டத்தை தனிப்பயனாக்க முடியுமா?"
        : "Can I customize the project?",
      answer: lang === 'si'
        ? "ඔව්, ඔබගේ ව්‍යාපාරික අවශ්‍යතාවයට ගැළපෙන පරිදි අපගේ ඉංජිනේරු කණ්ඩායම මගින් හෝ ඔබගේ සංවර්ධකයින් මගින් පද්ධතිය සම්පූර්ණයෙන්ම වෙනස් කරගත හැක."
        : lang === 'ta'
        ? "ஆம், உங்கள் வணிக நடைமுறைக்கு ஏற்ப எங்கள் பொறியியல் குழு அல்லது உங்கள் சொந்த டெவலப்பர்கள் மூலம் அமைப்பை முழுமையாக தனிப்பயனாக்கலாம்."
        : "Yes, all our software solutions can be fully customized by our engineering team or your in-house developers to match your exact business workflow."
    },
    {
      question: lang === 'si'
        ? "කාර්ය මණ්ඩලය සඳහා පුහුණුව ලබාදෙනවාද?"
        : lang === 'ta'
        ? "பயிற்சி வழங்குகிறீர்களா?"
        : "Do you offer training?",
      answer: lang === 'si'
        ? "ඔව්, ඔබගේ කාර්ය මණ්ඩලයට සෘජු හෝ මාර්ගගත (Remote) පුහුණුව, පරිශීලක අත්පොත් සහ වීඩියෝ මාර්ගෝපදේශ නොමිලේ සපයනු ලැබේ."
        : lang === 'ta'
        ? "ஆம், நாங்கள் நேரடி அல்லது தொலைநிலை ஊழியர் பயிற்சி, பயனர் கையேடுகள் மற்றும் வீடியோ வழிகாட்டிகளை வழங்குகிறோம்."
        : "Yes, we provide hands-on remote or on-site staff training, step-by-step user manuals, and video walkthroughs with every software package."
    },
    {
      question: lang === 'si'
        ? "ගෙවීම් සිදුකළ හැකි ක්‍රම මොනවාද?"
        : lang === 'ta'
        ? "என்ன கட்டண முறைகள் உள்ளன?"
        : "What payment methods are available?",
      answer: lang === 'si'
        ? "සෘජු බැංකු තැන්පතු (Bank Transfer), PayHere හරහා ක්‍රෙඩිට්/ඩෙබිට් කාඩ්පත් සහ දේශීය ජංගම ගෙවීම් ක්‍රම සහ නිල වැට් (VAT) බිල්පත් පහසුකම් පවතී."
        : lang === 'ta'
        ? "வங்கி பரிமாற்றங்கள், PayHere மூலம் கிரெடிட்/டெபிட் கார்டுகள் மற்றும் முறையான விலைப்பட்டியலுடன் கூடிய கட்டண முறைகளை நாங்கள் ஆதரிக்கிறோம்."
        : "We support direct bank transfers, credit/debit cards via PayHere, and local mobile payment options with official VAT invoicing."
    },
    {
      question: lang === 'si'
        ? "මෘදුකාංගය ලබා දීමට කොපමණ කාලයක් ගතවේද?"
        : lang === 'ta'
        ? "வழங்க எவ்வளவு நேரம் ஆகும்?"
        : "How long does delivery take?",
      answer: lang === 'si'
        ? "සාමාන්‍ය ERP පද්ධති පැය 24ක් ඇතුළත සූදානම් කර ලබා දේ. අමතර විශේෂාංග එක් කිරීම සඳහා ව්‍යාපාරික දින 3 සිට 5 දක්වා කාලයක් ගතවේ."
        : lang === 'ta'
        ? "நிலையான ERP தீர்வுகள் 24 மணி நேரத்திற்குள் வழங்கப்படுகின்றன. கூடுதல் சிறப்பு அம்சங்களைச் சேர்க்க 3 முதல் 5 வணிக நாட்கள் ஆகும்."
        : "Standard ERP solutions are provisioned and delivered within 24 hours. Custom feature additions take 3 to 5 business days."
    }
  ];

  const handleSendInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setShowContactModal(false);
      setInquirySent(false);
      setInquiryForm({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="w-full pt-8 pb-28 px-6 sm:px-10 lg:px-16 xl:px-20">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 block">
          {lang === 'si' ? 'සුහදශීලී, විශ්වාසනීය මඟපෙන්වීම' : lang === 'ta' ? 'நட்பான, நம்பகமான வழிகாட்டுதல்' : 'FRIENDLY, RELIABLE GUIDANCE'}
        </span>
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.25] mb-3 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          {lang === 'si' ? 'පාරිභෝගික සහාය මධ්‍යස්ථානය' : lang === 'ta' ? 'ஆதரவு மையம்' : 'Support Center'}
        </h1>
        <p className={`text-sm sm:text-base ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {lang === 'si' ? 'අප ඔබට සහාය වීමට සූදානම්.' : lang === 'ta' ? 'நாங்கள் உங்களுக்கு உதவ இங்கே இருக்கிறோம்.' : 'We are here to help.'}
        </p>
      </div>

      {/* Main Content Grid: Left FAQs + Right Need Help Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Common Questions */}
        <div className="lg:col-span-8 w-full">
          <div className="mb-8">
            <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2 block">
              {lang === 'si' ? 'පොදු ගැටලු සහ ප්‍රශ්න' : lang === 'ta' ? 'பொதுவான கேள்விகள்' : 'COMMON QUESTIONS'}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {lang === 'si' ? 'අපට ඔබට උදව් කළ හැක්කේ කෙසේද?' : lang === 'ta' ? 'நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?' : 'How can we help?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'si' ? 'පාරිභෝගිකයන් නිතර විමසන ප්‍රශ්න සඳහා පැහැදිලි පිළිතුරු.' : lang === 'ta' ? 'வாடிக்கையாளர்கள் அடிக்கடி கேட்கும் கேள்விகளுக்கான தெளிவான பதில்கள்.' : 'Clear answers to questions customers often ask.'}
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`border-b transition-all pb-4 ${
                    isDark ? 'border-slate-800/80' : 'border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-2 cursor-pointer group"
                  >
                    <span className={`text-sm sm:text-base font-semibold transition-colors ${
                      isOpen
                        ? 'text-cyan-400'
                        : isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {faq.question}
                    </span>
                    <span className={`p-1 rounded-lg transition-transform ${
                      isOpen ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-2 pr-6 text-xs sm:text-sm text-slate-400 leading-relaxed animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Still Need Help Card */}
        <div className="lg:col-span-4 w-full">
          <div className={`rounded-3xl p-7 sm:p-8 border text-center transition-all ${
            isDark 
              ? 'bg-[#0a0f22]/90 border-slate-800/80 shadow-2xl' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Headphone Icon */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0094ff]/10 border border-[#0094ff]/30 flex items-center justify-center text-[#0094ff] mb-6">
              <Headphones className="w-7 h-7" />
            </div>

            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lang === 'si' ? 'තවදුරටත් උදව් අවශ්‍යද?' : lang === 'ta' ? 'இன்னும் உதவி தேவையா?' : 'Still Need Help?'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              {lang === 'si' ? 'අපගේ සහායක කණ්ඩායම අමතන්න. සේවා කාලය තුළ සරලව හා කඩිනමින් පිළිතුරු සපයනු ලැබේ.' : lang === 'ta' ? 'உண்மையான ஒருவருடன் பேசுங்கள். வணிக நேரங்களில் நாங்கள் விரைவாக பதிலளிப்போம்.' : 'Speak to a real person. We reply during business hours and keep things simple.'}
            </p>

            <div className="space-y-3 mb-6">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={() => window.open('https://wa.me/94771234567?text=Hello%20Raxwo%20Support', '_blank')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-[#0094ff] hover:bg-[#0080dd] shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'si' ? 'WhatsApp සංවාදය' : lang === 'ta' ? 'WhatsApp அரட்டை' : 'Chat on WhatsApp'}</span>
              </button>

              {/* Send a Message Button */}
              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-xs sm:text-sm border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#11172e]/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>{lang === 'si' ? 'පණිවිඩයක් එවන්න' : lang === 'ta' ? 'செய்தி அனுப்பவும்' : 'Send a Message'}</span>
              </button>
            </div>

            {/* Business Hours Footer */}
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'si' ? 'සඳුදා – සෙනසුරාදා: පෙ.ව. 8:30 – ප.ව. 6:30' : lang === 'ta' ? 'திங்கள் – சனி: காலை 8:30 – மாலை 6:30' : 'Monday – Saturday: 8:30 AM – 6:30 PM'}</span>
            </div>

          </div>
        </div>

      </div>

      {/* Message Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md rounded-3xl p-6 sm:p-7 border shadow-2xl relative ${
            isDark ? 'bg-[#0b1026] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-lg font-bold mb-1">
              {lang === 'si' ? 'තාක්ෂණික සහාය වෙත පණිවිඩයක් එවන්න' : lang === 'ta' ? 'ஆதரவுக்கு ஒரு செய்தியை அனுப்பவும்' : 'Send a Message to Support'}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              {lang === 'si' ? 'ඔබගේ ප්‍රශ්නය ඇතුළත් කරන්න, අපගේ ඉංජිනේරු කණ්ඩායම කඩිනමින් ප්‍රතිචාර දක්වනු ඇත.' : lang === 'ta' ? 'உங்கள் கேள்வியை நிரப்பவும், எங்கள் ஆதரவுக் குழு விரைவில் பதிலளிக்கும்.' : 'Fill in your question and our engineering support team will respond shortly.'}
            </p>

            {inquirySent ? (
              <div className="py-8 text-center text-emerald-400 font-medium text-sm">
                {lang === 'si' ? 'පණිවිඩය සාර්ථකව යවන ලදී! කඩිනමින් ඔබව සම්බන්ධ කරගන්නෙමු.' : lang === 'ta' ? 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! விரைவில் உங்களைத் தொடர்புகொள்வோம்.' : 'Message sent successfully! We will get back to you shortly.'}
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1">
                    {lang === 'si' ? 'ඔබගේ නම' : lang === 'ta' ? 'உங்கள் பெயர்' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder={lang === 'si' ? 'නම ඇතුළත් කරන්න' : lang === 'ta' ? 'பெயரை உள்ளிடவும்' : 'Enter your name'}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none ${
                      isDark ? 'bg-[#11172e] border border-slate-800 text-white' : 'bg-slate-100 border border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">
                    {lang === 'si' ? 'විද්‍යුත් තැපෑල' : lang === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none ${
                      isDark ? 'bg-[#11172e] border border-slate-800 text-white' : 'bg-slate-100 border border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">
                    {lang === 'si' ? 'පණිවිඩය' : lang === 'ta' ? 'செய்தி' : 'Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    placeholder={lang === 'si' ? 'අපට ඔබට උපකාර කළ හැක්කේ කෙසේද?' : lang === 'ta' ? 'நாங்கள் உங்களுக்கு எப்படி உதவ முடியும்?' : 'How can we help you?'}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none ${
                      isDark ? 'bg-[#11172e] border border-slate-800 text-white' : 'bg-slate-100 border border-slate-300 text-slate-900'
                    }`}
                  ></textarea>
                </div>
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    {lang === 'si' ? 'අවලංගු කරන්න' : lang === 'ta' ? 'ரத்து செய்' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 cursor-pointer"
                  >
                    {lang === 'si' ? 'පණිවිඩය යවන්න' : lang === 'ta' ? 'செய்தி அனுப்பவும்' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
