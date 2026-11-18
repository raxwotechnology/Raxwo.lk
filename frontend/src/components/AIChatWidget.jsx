import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronDown } from 'lucide-react';

// ─── Raxwo Knowledge Base ───────────────────────────────────────────────────
const KB = [
  // Greetings
  { patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'ayubowan', 'vanakkam'],
    answer: "Hello! 👋 Welcome to Raxwo! I'm here to help you with any questions about our business software products, pricing, or support. What can I assist you with today?" },

  // What is Raxwo
  { patterns: ['what is raxwo', 'about raxwo', 'tell me about', 'who are you', 'what do you do', 'raxwo company'],
    answer: "**Raxwo** is a Sri Lankan business software company that builds simple, reliable, and affordable management systems for local businesses. 🇱🇰\n\nWe believe software should be:\n• **Pay once, own forever** – no monthly fees\n• **Works offline** – full reliability without internet\n• **Locally supported** – friendly Sri Lankan support team\n\nOur products help retail shops, pharmacies, gyms, hotels, and more run their business smoothly." },

  // Products overview
  { patterns: ['products', 'software', 'what do you sell', 'solutions', 'systems', 'what products'],
    answer: "We offer **5 specialized business management systems**:\n\n1. 🛒 **Mobixa** – Mobile shop & repair center POS\n2. 💊 **Pharmora** – Pharmacy management system\n3. 🏋️ **Gymora** – Gym & fitness center management\n4. 🏨 **Hotelia** – Hotel & guesthouse management\n5. 🧵 **Textila** – Textile & fabric shop management\n\nEach product has **Starter, Professional, and Premium** packages. Would you like details on any specific product?" },

  // Mobixa
  { patterns: ['mobixa', 'mobile shop', 'mobile repair', 'phone shop'],
    answer: "**Mobixa** – Mobile Shop & Repair Center POS 📱\n\nPerfect for mobile phone shops and repair centers.\n\n**Key Features:**\n• IMEI tracking & barcode scanning\n• Repair job tracking with customer SMS alerts\n• Inventory management\n• Multi-counter cash drawer reconciliation\n• Accounting ledger & tax invoice export\n\n**Pricing (LKR):**\n• Starter: LKR 45,000\n• Professional: LKR 85,000\n• Premium: LKR 120,000\n\nType 'pricing' for full pricing details." },

  // Pharmora
  { patterns: ['pharmora', 'pharmacy', 'medicine', 'drug store', 'chemist'],
    answer: "**Pharmora** – Pharmacy Management System 💊\n\nDesigned specifically for pharmacies and medical stores.\n\n**Key Features:**\n• Drug inventory with expiry alerts\n• Prescription management\n• Supplier ordering & GRN\n• Tax invoice & daily sales reports\n• MOH compliance reporting\n\n**Pricing (LKR):**\n• Starter: LKR 50,000\n• Professional: LKR 95,000\n• Premium: LKR 140,000" },

  // Gymora
  { patterns: ['gymora', 'gym', 'fitness', 'membership', 'workout'],
    answer: "**Gymora** – Gym & Fitness Center Management 🏋️\n\nBuilt for gyms, fitness studios, and sports centers.\n\n**Key Features:**\n• Member registration & attendance tracking\n• Membership plan management\n• Payment & renewal reminders\n• Trainer scheduling\n• Revenue & attendance reports\n\n**Pricing (LKR):**\n• Starter: LKR 40,000\n• Professional: LKR 75,000\n• Premium: LKR 150,000" },

  // Hotelia
  { patterns: ['hotelia', 'hotel', 'guesthouse', 'room booking', 'reservation', 'hospitality'],
    answer: "**Hotelia** – Hotel & Guesthouse Management 🏨\n\nIdeal for hotels, boutique guesthouses, and resorts.\n\n**Key Features:**\n• Room booking & reservation calendar\n• Check-in / check-out management\n• Room service & billing\n• Housekeeping task tracking\n• Revenue & occupancy reports\n\n**Pricing (LKR):**\n• Starter: LKR 55,000\n• Professional: LKR 100,000\n• Premium: LKR 160,000" },

  // Textila
  { patterns: ['textila', 'textile', 'fabric', 'cloth', 'garment', 'fashion'],
    answer: "**Textila** – Textile & Fabric Shop Management 🧵\n\nDesigned for textile shops, fabric stores, and garment retailers.\n\n**Key Features:**\n• Fabric inventory by roll, meter & color\n• Customer order tracking\n• Supplier management\n• Sales & profit reports\n• Barcode-based billing\n\n**Pricing (LKR):**\n• Starter: LKR 42,000\n• Professional: LKR 80,000\n• Premium: LKR 125,000" },

  // Pricing
  { patterns: ['price', 'pricing', 'cost', 'how much', 'lkr', 'package', 'starter', 'professional', 'premium', 'affordable'],
    answer: "**Raxwo Product Pricing (LKR) – One-time payment, own forever!** 💰\n\n| Product | Starter | Professional | Premium |\n|---------|---------|-------------|--------|\n| Mobixa | 45,000 | 85,000 | 120,000 |\n| Pharmora | 50,000 | 95,000 | 140,000 |\n| Gymora | 40,000 | 75,000 | 150,000 |\n| Hotelia | 55,000 | 100,000 | 160,000 |\n| Textila | 42,000 | 80,000 | 125,000 |\n\n✅ **No monthly fees. Pay once, own forever.**\n\nVisit our [Pricing page](#pricing) for full details." },

  // No monthly fee
  { patterns: ['monthly fee', 'subscription', 'recurring', 'rent', 'saas', 'monthly payment'],
    answer: "Great news! 🎉 Raxwo products have **NO monthly fees**.\n\nYou pay **once** and own the software **forever**. This makes Raxwo much more cost-effective than subscription-based software over time.\n\nAll updates within the same major version are included at no extra cost." },

  // Offline
  { patterns: ['offline', 'internet', 'no internet', 'without internet', 'work offline'],
    answer: "Yes! All Raxwo products are designed to **work offline**. 🔌\n\nYour business operations won't stop if the internet goes down. Data is stored locally and syncs when connectivity is restored.\n\nThis is especially useful in Sri Lanka where internet reliability can vary." },

  // Customization
  { patterns: ['customiz', 'custom', 'tailor', 'specific', 'requirement', 'module'],
    answer: "Raxwo products are **fully customizable** to your business needs! ⚙️\n\nWhen ordering, you can:\n• Choose specific **modules** to include\n• Add your **business name & logo**\n• Set the **number of users**\n• Request **specific features**\n\nOur team will customize the software to match your exact workflow. Click **'Customize'** on any product page to get started." },

  // Support
  { patterns: ['support', 'help', 'technical', 'issue', 'problem', 'assistance', 'contact support'],
    answer: "We offer **friendly Sri Lankan support**! 🤝\n\n**Support Channels:**\n• 📞 WhatsApp: +94 76 123 4567\n• 📧 Email: support@raxwo.lk\n• 🌐 Support Center: Visit the Support page\n• 🕐 Hours: Mon–Sat, 9 AM – 6 PM\n\nOur local team speaks **Sinhala, Tamil, and English**.\n\nWould you like to visit our [Support Center](#support)?" },

  // Contact
  { patterns: ['contact', 'phone', 'email', 'address', 'reach', 'get in touch', 'whatsapp', 'call'],
    answer: "**Contact Raxwo** 📬\n\n• 📞 **Phone/WhatsApp:** +94 76 123 4567\n• 📧 **Email:** info@raxwo.lk\n• 🌐 **Website:** raxwo.lk\n• 📍 **Location:** Sri Lanka\n\nYou can also use the green WhatsApp button at the bottom-right of this page to chat with us directly!" },

  // How to order / buy
  { patterns: ['order', 'buy', 'purchase', 'how to get', 'how to order', 'get started', 'sign up', 'register'],
    answer: "**How to get Raxwo software:** 🛒\n\n1. **Browse products** – Go to the Products page\n2. **Choose your package** – Starter, Professional, or Premium\n3. **Customize** – Select your modules and preferences\n4. **Create an account** – Sign up on the Sign In page\n5. **Checkout** – Complete your order\n6. **Installation** – Our team contacts you within 24 hours\n\nReady to start? Visit [Products](#products) or [Pricing](#pricing)!" },

  // Installation / delivery
  { patterns: ['install', 'delivery', 'deploy', 'setup', 'how long', 'when', 'timeline'],
    answer: "**Installation & Delivery** 🚀\n\nAfter your order is confirmed:\n• Our team contacts you within **24–48 hours**\n• Installation is done **on-site or remotely**\n• Training is provided to your staff\n• Full setup typically takes **1–3 business days**\n\nWe serve customers all across Sri Lanka!" },

  // Training
  { patterns: ['training', 'learn', 'how to use', 'tutorial', 'guide', 'easy', 'difficult'],
    answer: "Yes, **training is included** with every purchase! 📚\n\nOur team will:\n• Train your staff on how to use the software\n• Provide user guides in Sinhala/Tamil/English\n• Offer follow-up support during the first month\n\nRaxwo software is designed to be **simple and easy to learn**, even for first-time users." },

  // Language
  { patterns: ['sinhala', 'tamil', 'language', 'sinhalen', 'english', 'multilanguage', 'multi language'],
    answer: "Yes! Raxwo supports **multiple languages** 🌐\n\n• 🇱🇰 Sinhala\n• 🇮🇳 Tamil\n• 🇬🇧 English\n\nYou can switch languages from the top navigation bar on our website. Our support team also communicates in all three languages." },

  // Demo / trial
  { patterns: ['demo', 'trial', 'test', 'try', 'sample', 'free trial'],
    answer: "We offer a **live demo** of our products! 🎯\n\nYou can:\n• Browse product features on our Products page\n• See a demo of any product – contact us via WhatsApp: **+94 76 123 4567**\n• Our team will walk you through the software live\n\nWant to schedule a demo? [Contact us](#contact)!" },

  // Sri Lanka specific
  { patterns: ['sri lanka', 'local', 'colombo', 'srilanka', 'lk'],
    answer: "Raxwo is a **100% Sri Lankan** company! 🇱🇰\n\nWe build software specifically for Sri Lankan businesses:\n• Priced in **LKR** (Sri Lankan Rupees)\n• Works in **Sinhala, Tamil & English**\n• Local support team\n• Understands local business needs\n• Compliant with local tax & reporting standards\n\nProud to serve businesses across Sri Lanka!" },

  // Warranty / guarantee
  { patterns: ['warranty', 'guarantee', 'refund', 'money back', 'return'],
    answer: "**Raxwo Quality Guarantee** ✅\n\n• **1-year warranty** on all software products\n• Free bug fixes and patches within warranty period\n• Dedicated support for setup & initial use\n• We stand behind the quality of our software\n\nIf you experience any issues, our support team will resolve them promptly. Contact us at support@raxwo.lk" },

  // Compare packages
  { patterns: ['difference', 'compare', 'vs', 'better', 'which package', 'starter vs', 'professional vs', 'premium vs'],
    answer: "**Package Comparison** 📊\n\n| Feature | Starter | Professional | Premium |\n|---------|---------|-------------|--------|\n| Core modules | ✅ Basic | ✅ Full | ✅ Full |\n| Users | 1–2 | Up to 5 | Unlimited |\n| Reports | Basic | Advanced | Custom |\n| Support | Email | Priority | Dedicated |\n| Customization | Limited | Standard | Full |\n\n**Recommendation:**\n• Small business just starting → **Starter**\n• Growing business with staff → **Professional**\n• Large operation with custom needs → **Premium**" },

  // Thanks / bye
  { patterns: ['thank', 'thanks', 'thank you', 'bye', 'goodbye', 'see you', 'appreciate'],
    answer: "You're welcome! 😊 Thank you for choosing Raxwo!\n\nIf you have any more questions, feel free to ask anytime. You can also reach us on WhatsApp: **+94 76 123 4567**\n\nHave a great day! 🌟" },
];

const QUICK_QUESTIONS = [
  "What products do you offer?",
  "How much does it cost?",
  "Is there a monthly fee?",
  "How do I order?",
  "Contact support",
];

const WELCOME_MSG = {
  id: 'welcome',
  role: 'bot',
  text: "👋 Hi! I'm **Raxwo AI Assistant**.\n\nI can help you with information about our business software products, pricing, support, and more.\n\nWhat would you like to know?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

function findAnswer(input) {
  const q = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.patterns.some(p => q.includes(p))) {
      return entry.answer;
    }
  }
  return "I'm not sure about that specific question. 🤔\n\nHere are some things I can help with:\n• Product information & features\n• Pricing & packages\n• How to order\n• Support & contact\n\nOr contact us directly:\n📞 **+94 76 123 4567** (WhatsApp)\n📧 **info@raxwo.lk**";
}

// Simple markdown renderer for bold and line breaks
function renderText(text) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function AIChatWidget({ isAdmin, isDark }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Don't show for admins
  if (isAdmin) return null;

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: findAnswer(userText),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread(prev => prev + 1);
    }, 700 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const bg = isDark
    ? 'bg-slate-900 border-slate-700 text-white'
    : 'bg-white border-slate-200 text-slate-900';

  const msgBg = {
    bot: isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-800',
    user: 'bg-[#0094ff] text-white',
  };

  const inputBg = isDark
    ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-[#0094ff]'
    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#0094ff]';

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-52 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl border flex flex-col overflow-hidden ${bg}`}
          style={{ height: '520px', maxHeight: 'calc(100vh - 160px)' }}
        >
          {/* Header */}
          <div className="bg-[#0094ff] px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">Raxwo AI Assistant</p>
              <p className="text-blue-100 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block"></span>
                Online – here to help
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#0094ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${msgBg[msg.role]} ${msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                >
                  <div className="whitespace-pre-wrap">{renderText(msg.text)}</div>
                  <p className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-blue-100 text-right' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {msg.time}
                  </p>
                </div>
                {msg.role === 'user' && (
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-[#0094ff] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${msgBg.bot}`}>
                  <div className="flex gap-1 items-center h-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions */}
          <div className={`px-3 pb-2 shrink-0 border-t ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
            <div className="flex gap-1.5 overflow-x-auto py-2 no-scrollbar">
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className={`text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full border cursor-pointer transition-colors shrink-0 ${
                    isDark
                      ? 'border-slate-600 text-slate-300 hover:border-[#0094ff] hover:text-[#0094ff]'
                      : 'border-slate-300 text-slate-600 hover:border-[#0094ff] hover:text-[#0094ff]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className={`px-3 pb-3 shrink-0 flex gap-2 items-center`}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Raxwo..."
              className={`flex-1 text-xs rounded-xl border px-3 py-2.5 outline-none transition-colors ${inputBg}`}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-xl bg-[#0094ff] text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-36 right-6 z-50 w-13 h-13 rounded-full bg-[#0094ff] text-white shadow-2xl flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all hover:scale-110 active:scale-95"
        style={{ width: '52px', height: '52px' }}
        aria-label="Open AI Chat"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
    </>
  );
}
