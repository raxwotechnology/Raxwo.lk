import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Headphones, MessageCircle, Mail, Clock } from 'lucide-react';

export default function SupportCenterPage({
  theme = 'dark',
  onContactClick
}) {
  const isDark = theme === 'dark';

  const [openFaq, setOpenFaq] = useState(0); // 0 is open by default like screenshot
  const [showContactModal, setShowContactModal] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });

  const faqs = [
    {
      question: "Do you provide source code?",
      answer: "Yes. Every package includes the complete source code for your purchased product."
    },
    {
      question: "Can I customize the project?",
      answer: "Yes, all our software solutions can be fully customized by our engineering team or your in-house developers to match your exact business workflow."
    },
    {
      question: "Do you offer training?",
      answer: "Yes, we provide hands-on remote or on-site staff training, step-by-step user manuals, and video walkthroughs with every software package."
    },
    {
      question: "What payment methods are available?",
      answer: "We support direct bank transfers, credit/debit cards via PayHere, and local mobile payment options with official VAT invoicing."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard ERP solutions are provisioned and delivered within 24 hours. Custom feature additions take 3 to 5 business days."
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
    <div className="w-full pb-28">
      
      {/* Page Header Banner — Identical #0c0827 match to Home Page Header */}
      <section 
        className="w-full pt-10 pb-14 md:pt-14 md:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#0c0827] text-white text-center overflow-hidden mb-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3 block">
            FRIENDLY, RELIABLE GUIDANCE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight leading-[1.25] mb-3 text-white">
            Support Center
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90">
            We are here to help.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Left FAQs + Right Need Help Card */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Common Questions */}
        <div className="lg:col-span-8 w-full">
          <div className="mb-8">
            <span className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2 block">
              COMMON QUESTIONS
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              How can we help?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear answers to questions customers often ask.
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
              Still Need Help?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Speak to a real person. We reply during business hours and keep things simple.
            </p>

            <div className="space-y-3 mb-6">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={() => window.open('https://wa.me/94771234567?text=Hello%20Raxwo%20Support', '_blank')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-[#0094ff] hover:bg-[#0080dd] shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
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
                <span>Send a Message</span>
              </button>
            </div>

            {/* Business Hours Footer */}
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Monday – Saturday: 8:30 AM – 6:30 PM</span>
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
            <h3 className="text-lg font-bold mb-1">Send a Message to Support</h3>
            <p className="text-xs text-slate-400 mb-5">
              Fill in your question and our engineering support team will respond shortly.
            </p>

            {inquirySent ? (
              <div className="py-8 text-center text-emerald-400 font-medium text-sm">
                Message sent successfully! We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none ${
                      isDark ? 'bg-[#11172e] border border-slate-800 text-white' : 'bg-slate-100 border border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Email</label>
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
                  <label className="text-xs font-semibold block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    placeholder="How can we help you?"
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
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
                  >
                    Send Message
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
