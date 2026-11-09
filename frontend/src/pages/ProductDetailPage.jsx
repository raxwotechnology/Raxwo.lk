import React, { useState } from 'react';
import { 
  ArrowRight, 
  Wrench, 
  Check, 
  Star, 
  Plus, 
  CheckCircle2, 
  ShieldCheck,
  Play,
  Monitor,
  Smartphone,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Utensils,
  Coffee,
  CheckCircle,
  Clock,
  Printer,
  QrCode,
  Users,
  Grid,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function ProductDetailPage({ 
  product, 
  onBackToProducts, 
  onChoosePackage, 
  onRequestCustomize,
  onOpenSandbox,
  currency = 'LKR', 
  currencyRates,
  theme = 'dark',
  lang = 'en'
}) {
  const isDark = theme === 'dark';

  const handleBack = () => {
    if (onBackToProducts) {
      onBackToProducts();
    } else {
      window.location.hash = 'products';
    }
  };

  // Fallback product if none selected
  const p = product || {
    id: "dineflow",
    name: "DineFlow",
    subtitle: "Restaurant & Cafe ERP",
    category: "Hospitality",
    badge: "Hospitality",
    tagline: "Table management, Kitchen Display (KDS), split bills & food costings.",
    fullDescription: "Floor table plan live ordering screen, kitchen order tickets (KOT), recipe ingredient deductions, and courier orders consolidation.",
    priceLKR: 72000,
    priceUSD: 240,
    rating: 4.9,
    reviewsCount: 95,
    audience: [
      "Fine dining & family restaurants",
      "Cafes & bakeries",
      "Pubs, restobars & food trucks"
    ],
    features: [
      "Visual floor table plan & seat ordering",
      "Kitchen Display System (KDS) & kitchen printers",
      "Recipe & raw ingredient inventory depletion",
      "Delivery aggregator consolidated billing"
    ]
  };

  const formatPrice = (lkrAmount) => {
    if (!currencyRates || !currencyRates[currency]) {
      return `LKR ${Number(lkrAmount).toLocaleString()}`;
    }
    const rateInfo = currencyRates[currency];
    const converted = Math.round(lkrAmount * rateInfo.rate);
    return `${rateInfo.symbol} ${converted.toLocaleString()}`;
  };

  // Dynamic modules database matching user reference photos (DineFlow, Mobixa, Gymora, Exxplan, PharmaCare, etc.)
  const productModules = {
    dineflow: [
      {
        moduleNumber: "MODULE 01 — ORDER BILLING",
        title: "Fast Touch POS Terminal & Order Modes",
        addressUrl: "possystem.lk / restaurant-touch-pos",
        description: "Designed for extreme speed during dinner rushes. Counter staff seamlessly toggle between Dine-In, Takeaway, and Delivery orders with photo item buttons, course sequencing, custom cooking modifiers, and rapid bill settlement.",
        bullets: [
          { label: "Multi-Mode Dining", text: "Select Dine-in with table assignment, Quick Takeaway counter billing, or Phone Delivery orders in one tap." },
          { label: "Cooking Modifiers & Notes", text: "Add customer special requests (e.g. Less Spicy, No Cheese, Extra Gravy) directly to kitchen tickets." },
          { label: "Course Sequencing", text: "Fire Starters, Main Courses, and Desserts in coordinated rounds to ensure smooth food delivery." },
          { label: "Flexible Bill Splitting", text: "Split checks by specific items, split bills equally among diners, and accept split Cash/Card tenders." }
        ],
        type: "pos-terminal"
      },
      {
        moduleNumber: "MODULE 02 — DINING ROOM FLOOR",
        title: "Interactive Table Layout & Waiter Tablet Panel",
        addressUrl: "possystem.lk / interactive-table-floor-plan",
        description: "Full visual control over your dining area. Color-coded table layouts reflect real-time dining progress, while mobile tablet modes allow waiters to punch orders directly at tableside with zero handwriting mistakes.",
        bullets: [
          { label: "Color-Coded Table Status", text: "Real-time visual indicators for Available (Green), Occupied (Blue), Bill Printed (Yellow), and Cleaning (Gray)." },
          { label: "Table Merging & Shifting", text: "Merge tables together for large tour groups or transfer guest bills seamlessly when parties relocate." },
          { label: "Tableside Waiter Tablets", text: "Waiters carry Android/iPad tablets directly to tables, taking orders that transmit wirelessly to the kitchen." },
          { label: "Covers & Seating Analytics", text: "Track guest seat counts per table to evaluate dining turn rates and revenue per seat." }
        ],
        type: "table-layout"
      },
      {
        moduleNumber: "MODULE 03 — KITCHEN AUTOMATION",
        title: "Kitchen Display System (KDS) & Automated KOT Printing",
        addressUrl: "possystem.lk / kitchen-display-kot-printer",
        description: "Connect front-of-house staff directly with kitchen chefs. Orders punched at the POS or waiter tablets instantly route to thermal KOT printers at designated kitchen prep stations or appear on interactive KDS kitchen screens.",
        bullets: [
          { label: "Multi-Station Routing", text: "Automatically route steaks to Grill station, fries to Fryer station, and cocktails to the Bar (BOT)." },
          { label: "Digital Kitchen Screen (KDS)", text: "Chefs view incoming orders with elapsed prep timers and color-coded delay warnings." },
          { label: "Automated KOT Printing", text: "High-speed thermal KOT tickets print with table number, waiter name, order timestamp, and special cooking notes." },
          { label: "Order Ready Bumping", text: "Tap to mark dishes as ready; front-of-house runners receive instant notifications for prompt service." }
        ],
        type: "kds-screen"
      },
      {
        moduleNumber: "MODULE 04 — CONTACTLESS DINING",
        title: "Contactless Digital QR Menu on Guest Mobile",
        addressUrl: "possystem.lk / guest-qr-digital-menu",
        description: "Deliver a modern, contactless dining experience. Guests scan unique tabletop QR codes on their smartphones to view live food menus with rich dish photos, dietary badges, allergens, and multi-language translations.",
        bullets: [
          { label: "Instant Smartphone Access", text: "No mobile app download required; guests scan the table QR code to open the digital food menu." },
          { label: "Visual Dishes & Dietary Badges", text: "Display high-definition dish images, spice levels, vegetarian/vegan tags, and allergen warnings." },
          { label: "Self-Ordering & Waiter Calling", text: "Guests can submit orders directly from their smartphone or tap a button to request a waiter or bill." },
          { label: "Live Menu Item Out-of-Stock", text: "Mark sold-out daily specials immediately on the digital menu to avoid customer disappointment." }
        ],
        type: "qr-menu"
      }
    ],

    mobixa: [
      {
        moduleNumber: "MODULE 01 — COUNTER POS & IMEI",
        title: "IMEI Barcode Scanning & Handset Sales",
        addressUrl: "raxwo.lk / mobixa-imei-pos",
        description: "High-speed mobile phone selling interface with individual 15-digit IMEI verification. Scan handset barcodes to instantly check warranty duration, supplier source, and accessory bundling.",
        bullets: [
          { label: "Dual-IMEI Validation", text: "Track both SIM 1 & SIM 2 IMEIs per phone with TRCSL legal registration verification." },
          { label: "Warranty Serial Tracking", text: "Print manufacturer & company warranty periods directly on the customer's thermal invoice." },
          { label: "Accessory Stock Depletion", text: "Auto-deduct cases, tempered glasses, and chargers from live stock upon scanning." },
          { label: "Trade-in / Old Phone Exchange", text: "Deduct second-hand buyback valuation directly from new smartphone checkout totals." }
        ],
        type: "mobixa-pos"
      },
      {
        moduleNumber: "MODULE 02 — REPAIR WORKSHOP",
        title: "Digital Job Cards & Technician Assignment",
        addressUrl: "raxwo.lk / mobixa-repair-jobs",
        description: "Manage phone repair intake with customer fault checklists, initial diagnostic quotes, and technician job routing. Technicians track spare parts used and calculate job-level commissions.",
        bullets: [
          { label: "Intake Inspection Sheet", text: "Record screen condition, existing scratches, battery health, and PIN/pattern code with signature." },
          { label: "Automated SMS Status Alerts", text: "Send automated SMS to customer when repair begins, parts are ordered, or device is ready for pickup." },
          { label: "Spare Part Allocation", text: "Directly assign displays, batteries, or IC chips to specific jobs to prevent workshop pilferage." },
          { label: "Technician Commissions", text: "Calculate repair engineer earnings per completed repair job automatically." }
        ],
        type: "mobixa-repair"
      },
      {
        moduleNumber: "MODULE 03 — ACCESSORIES INVENTORY",
        title: "Multi-Bin Stock Control & Reorder Triggers",
        addressUrl: "raxwo.lk / mobixa-stock-management",
        description: "Eliminate accessory shortages with visual low-stock alerts. Categorize products by phone brand and model (Apple, Samsung, Xiaomi) with bulk supplier purchase orders.",
        bullets: [
          { label: "Model Compatibility Matrix", text: "Find compatible cases and cables across different phone releases instantly." },
          { label: "Automated Reorder Alerts", text: "Receive notifications when fast-moving screen protectors or cables drop below safety thresholds." },
          { label: "Supplier Ledger & Credit", text: "Track supplier outstanding balances, post-dated cheques, and warranty return RMAs." },
          { label: "Multi-Branch Stock Transfer", text: "Transfer handsets and accessories between head office and branch counters with gate passes." }
        ],
        type: "mobixa-stock"
      },
      {
        moduleNumber: "MODULE 04 — OWNER MOBILE PORTAL",
        title: "CEO Live Dashboard & Cash Audit",
        addressUrl: "raxwo.lk / mobixa-owner-portal",
        description: "Check your shop's revenue, cash register balances, and repair queue in real-time from anywhere using your smartphone.",
        bullets: [
          { label: "Real-Time Sales Feeds", text: "View today's counter cash, card transactions, and profit margins updated live." },
          { label: "Shift Drawer Reconciliation", text: "Compare expected cash against physical cashier drawer count to stop till discrepancies." },
          { label: "Uncollected Repair Warning", text: "Filter long-pending customer devices waiting over 30 days for follow-up reminders." },
          { label: "Cloud Remote Access", text: "Review multi-branch operations securely over SSL from any mobile browser." }
        ],
        type: "mobixa-owner"
      }
    ],

    gymora: [
      {
        moduleNumber: "MODULE 01 — MEMBER ACCESS",
        title: "Biometric Fingerprint & RFID Turnstile Gate",
        addressUrl: "raxwo.lk / gymora-biometric-access",
        description: "Control gym floor entry with automated hardware integration. Members tap their RFID key fob or fingerprint scanner at turnstiles; the screen validates active subscriptions in 0.2 seconds.",
        bullets: [
          { label: "Turnstile Gate Relay", text: "Direct hardware trigger via LAN/USB relay board to unlock turnstiles for valid active members." },
          { label: "Expired Member Lockout", text: "Automatically denies entry with visual alert and prompt to renew expired subscriptions." },
          { label: "Peak Hour Occupancy", text: "Monitor live gym floor head-count to optimize trainer schedules and workout flow." },
          { label: "Member Photo ID Display", text: "Shows member photo and name on front-desk monitor to prevent card sharing." }
        ],
        type: "gymora-access"
      },
      {
        moduleNumber: "MODULE 02 — SUBSCRIPTION BILLING",
        title: "Recurring Membership Plans & WhatsApp Alerts",
        addressUrl: "raxwo.lk / gymora-membership-billing",
        description: "Automate 1-month, 3-month, 6-month, and annual membership packages. Automated WhatsApp and SMS reminders keep renewal rates high and eliminate unpaid workouts.",
        bullets: [
          { label: "WhatsApp Expiry Alerts", text: "Send renewal messages with payment link 7 days and 1 day before plan expires." },
          { label: "Package Customization", text: "Define Gym Only, Gym + Cardio, VIP Personal Training, or CrossFit access tiers." },
          { label: "Freezing & Suspensions", text: "Pause memberships for traveling or medical leave with configurable freeze duration limits." },
          { label: "Online Card & Cash Receipting", text: "Accept PayHere, bank transfers, or cash payments with instant printable digital receipts." }
        ],
        type: "gymora-billing"
      },
      {
        moduleNumber: "MODULE 03 — TRAINERS & CLASSES",
        title: "Personal Trainer Schedules & Client Progress",
        addressUrl: "raxwo.lk / gymora-trainer-schedule",
        description: "Empower fitness instructors to manage one-on-one PT slots, group spinning/Zumba classes, and record client body measurements and diet progress.",
        bullets: [
          { label: "PT Slot Booking", text: "Prevent trainer double-booking with interactive visual calendar for 1-hour workout sessions." },
          { label: "Trainer Commission Matrix", text: "Calculate monthly trainer split percentage from personal training fees automatically." },
          { label: "Body Composition Logs", text: "Track weight, body fat %, muscle mass, and measurements with milestone charts." },
          { label: "Digital Workout Cards", text: "Create customized exercise routines for chest, back, legs, and cardio accessible on member mobile." }
        ],
        type: "gymora-trainers"
      },
      {
        moduleNumber: "MODULE 04 — SUPPLEMENT BAR POS",
        title: "Juice Bar, Protein Shakes & Merchandise POS",
        addressUrl: "raxwo.lk / gymora-supplement-pos",
        description: "Boost fitness center revenues with a high-speed supplement counter. Sell whey protein scoops, pre-workout drinks, water, and gym gear with barcode scanning.",
        bullets: [
          { label: "Quick Touch POS", text: "Big touch buttons for protein shakes, energy drinks, and bottled water for instant counter checkout." },
          { label: "Member Tab Accounts", text: "Allow premium members to charge supplements to their running account for month-end settlement." },
          { label: "Supplement Expiry Tracking", text: "Track batch numbers and expiration dates on vitamins, BCAAs, and protein tubs." },
          { label: "Thermal Receipt Printing", text: "Print 58mm/80mm receipts with QR codes for gym events and special promotions." }
        ],
        type: "gymora-pos"
      }
    ]
  };

  // Generate modules for products not explicitly in dictionary
  const currentModules = productModules[p.id] || [
    {
      moduleNumber: "MODULE 01 — CORE OPERATIONS",
      title: `${p.name} High-Speed POS & Transaction Engine`,
      addressUrl: `raxwo.lk / ${p.id}-pos-terminal`,
      description: `Engineered specifically for ${p.subtitle}. Process daily customer transactions with rapid barcode scanning, flexible tender methods, and compliance with Sri Lankan VAT & SSCL standards.`,
      bullets: [
        { label: "High-Speed Billing", text: "Process checkouts in under 2 seconds with keyboard shortcuts and touchscreen optimization." },
        { label: "Tax Compliance", text: "Automated VAT and SSCL calculations with RAMIS formatted receipts and reports." },
        { label: "Offline-First Engine", text: "Continuous billing during internet drops with automatic cloud syncing on reconnection." },
        { label: "Hardware Plug & Play", text: "Seamless integration with ESC/POS thermal printers, cash drawers, and barcode readers." }
      ],
      type: "generic-pos"
    },
    {
      moduleNumber: "MODULE 02 — INVENTORY & STOCK",
      title: "Real-Time Stock Depletion & Warehouse Control",
      addressUrl: `raxwo.lk / ${p.id}-inventory-management`,
      description: "Complete visibility across all stock items, batch numbers, reorder thresholds, and multi-location warehouse distribution.",
      bullets: [
        { label: "Automatic Reorder Prompts", text: "Receive notifications before key inventory lines hit critical low stock." },
        { label: "Batch & Serial Tracking", text: "Track products by expiration dates, warranty serials, or manufacturing lots." },
        { label: "Supplier Accounts Ledger", text: "Manage accounts payable, supplier credit terms, and purchase orders." },
        { label: "Stock Adjustment Audits", text: "Log wastage, damages, and physical stock-take variances with staff audit logs." }
      ],
      type: "generic-stock"
    },
    {
      moduleNumber: "MODULE 03 — MANAGEMENT ANALYTICS",
      title: "Executive Reports, Profit Margins & Staff Auditing",
      addressUrl: `raxwo.lk / ${p.id}-analytics-dashboard`,
      description: "Turn raw transaction logs into clear, actionable business intelligence. Monitor gross profit margins, top-selling items, and shift drawer reconciliations.",
      bullets: [
        { label: "Daily Shift Reconciliations", text: "Match physical cash in drawer against system totals to prevent cash leakage." },
        { label: "Profit & Loss Overview", text: "Calculate exact net profit after supplier costs, overheads, and discounts." },
        { label: "Staff Shift Tracking", text: "Monitor individual cashier performance, voided receipts, and discount approvals." },
        { label: "Exportable Statements", text: "One-click export to Excel, PDF, or direct sync with accounting packages." }
      ],
      type: "generic-analytics"
    },
    {
      moduleNumber: "MODULE 04 — CLIENT & DIGITAL PORTAL",
      title: "Customer Engagement, SMS Alerts & Digital Receipts",
      addressUrl: `raxwo.lk / ${p.id}-customer-portal`,
      description: "Build lasting customer relationships with automated SMS order notifications, loyalty discount tiers, and digital e-receipt options.",
      bullets: [
        { label: "Automated SMS Updates", text: "Send instant branded SMS confirmations upon order placement and invoice generation." },
        { label: "Customer Loyalty Points", text: "Award points on every purchase redeemable for future discount vouchers." },
        { label: "Digital QR Receipts", text: "Allow customers to scan a QR code to view their digital tax receipt on mobile." },
        { label: "Customer Purchase History", text: "Review past purchases and credit balances instantly during customer checkout." }
      ],
      type: "generic-client"
    }
  ];

  return (
    <div className={`w-full pt-8 pb-32 px-4 sm:px-8 lg:px-16 xl:px-20 transition-colors duration-300 ${
      isDark ? 'bg-[#070a16] text-white' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 max-w-7xl mx-auto">
        <button 
          onClick={() => window.location.hash = 'home'}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          {lang === 'si' ? 'මුල් පිටුව' : lang === 'ta' ? 'முகப்பு' : 'Home'}
        </button>
        <span>/</span>
        <button 
          onClick={handleBack}
          className="hover:text-cyan-400 cursor-pointer transition-colors"
        >
          {lang === 'si' ? 'ERP පද්ධති' : lang === 'ta' ? 'ERP அமைப்புகள்' : 'ERP Solutions'}
        </button>
        <span>/</span>
        <span className={isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'}>
          {p.name}
        </span>
      </nav>

      {/* 2. Top Product Header Showcase Card */}
      <div className={`max-w-7xl mx-auto rounded-3xl p-6 sm:p-10 border mb-20 transition-all ${
        isDark 
          ? 'bg-[#0a0f24]/95 border-slate-800 shadow-2xl' 
          : 'bg-white border-slate-200/90 shadow-xl'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="max-w-3xl">
            {/* Category Badge & Tech Tag */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                {p.badge || p.category}
              </span>
              <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                isDark ? 'bg-slate-900 text-cyan-400 border-slate-700' : 'bg-slate-100 text-blue-700 border-slate-200'
              }`}>
                100% Full Source Code &amp; Lifetime License
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {p.name} <span className="text-[#0094ff]">– {p.subtitle}</span>
            </h1>

            <p className={`text-base sm:text-lg mt-4 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {p.fullDescription || p.tagline}
            </p>

            {/* Star Rating & Highlights */}
            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs sm:text-sm">
              <div className="flex items-center text-amber-400 gap-1 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className={isDark ? 'text-white' : 'text-slate-900'}>{p.rating || 4.9}</span>
                <span className="text-slate-400 font-normal">({p.reviewsCount || 84}+ verified deployments)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Check className="w-4 h-4" />
                <span>Zero Monthly Fees</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Check className="w-4 h-4" />
                <span>Sri Lanka VAT &amp; SSCL Ready</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Panel */}
          <div className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between shrink-0 min-w-[280px] ${
            isDark ? 'bg-[#0f1738]/80 border-blue-500/30' : 'bg-blue-50/60 border-blue-200'
          }`}>
            <div>
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                One-Time Perpetual Investment
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-3xl sm:text-4xl font-black ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatPrice(p.priceLKR)}
                </span>
              </div>
              <span className={`text-xs block mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Includes unminified React / Node code
              </span>
            </div>

            <div className="space-y-2.5 mt-6">
              <button
                onClick={() => onChoosePackage(p)}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Choose Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onRequestCustomize(p)}
                className={`w-full py-3 px-5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border ${
                  isDark 
                    ? 'bg-slate-900/90 text-slate-200 border-slate-700 hover:bg-slate-800' 
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
                <span>Request Customization</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Section Divider with Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-400 mb-2 inline-block">
          INTERACTIVE MODULE WALKTHROUGH
        </span>
        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}>
          Explore How {p.name} Powers Your Daily Operations
        </h2>
        <p className={`text-sm sm:text-base mt-3 max-w-xl mx-auto ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Review the core operational modules below. Every module runs offline-first with high-speed POS hardware compatibility.
        </p>
      </div>

      {/* 4. Alternating Feature Modules (Exact Match to User Images 1, 2, 3, 4) */}
      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32">
        {currentModules.map((mod, index) => {
          // Even index (0, 2): Text on Left, Browser Mockup on Right
          // Odd index (1, 3): Browser Mockup on Left, Text on Right
          const isReverse = index % 2 !== 0;

          return (
            <div 
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                isReverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              {/* Text Column (5 Cols) */}
              <div className={`lg:col-span-5 flex flex-col items-start text-left ${
                isReverse ? 'lg:order-2' : 'lg:order-1'
              }`}>
                {/* Module Subtitle in Gold/Amber (Exact match to Reference Photos) */}
                <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-amber-400 mb-2.5 inline-block">
                  {mod.moduleNumber}
                </span>

                {/* Main Module Title */}
                <h3 className={`text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight leading-[1.2] mb-4 ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}>
                  {mod.title}
                </h3>

                {/* Paragraph Description */}
                <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {mod.description}
                </p>

                {/* 4 Bullets with Custom Cloche/Icon Indicators (Exact match to Photos) */}
                <div className="space-y-3.5 w-full">
                  {mod.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      </div>
                      <div className="text-xs sm:text-sm leading-relaxed">
                        <strong className={`font-bold mr-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                          {b.label}:
                        </strong>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                          {b.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Browser Window Mockup Frame Column (7 Cols) */}
              <div className={`lg:col-span-7 w-full ${
                isReverse ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <div className={`rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl transition-all ${
                  isDark 
                    ? 'bg-[#0c1026] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.8)]' 
                    : 'bg-slate-900 text-white border-slate-800 shadow-2xl'
                }`}>
                  
                  {/* macOS Browser Header Bar (Exact match to Reference Photos) */}
                  <div className="px-4 py-3 bg-[#080d1f] border-b border-slate-800 flex items-center gap-3">
                    {/* Window Controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
                      <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
                    </div>

                    {/* Address Bar Pill (Exact match to Reference Photos) */}
                    <div className="flex-1 max-w-md mx-auto">
                      <div className="w-full px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center text-[11px] font-mono text-slate-400">
                        <span>{mod.addressUrl}</span>
                      </div>
                    </div>

                    <div className="w-12 shrink-0"></div>
                  </div>

                  {/* High-Fidelity Interactive Screen Representation */}
                  <div className="p-4 sm:p-6 bg-[#0a0e22] min-h-[300px] sm:min-h-[340px] flex flex-col justify-between select-none">
                    
                    {/* 1. DineFlow / Restaurant POS Screen (Image 1 match) */}
                    {mod.type === 'pos-terminal' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-extrabold text-sm tracking-wider">POSTERMINAL</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">MAIN RESTAURANT</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">Dine-in</span>
                            <span className="text-[10px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-400">Takeaway</span>
                            <span className="text-[10px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-400">Delivery</span>
                          </div>
                        </div>

                        {/* Food Category Quick Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                          <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold">All Items</span>
                          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Burgers</span>
                          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Rice &amp; Curries</span>
                          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Beverages</span>
                          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">Desserts</span>
                        </div>

                        {/* Interactive Dish Cards Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { name: 'Beef Burger', price: 'Rs. 950.00' },
                            { name: 'Caesar Salad', price: 'Rs. 700.00' },
                            { name: 'Cheese Kotthu', price: 'Rs. 1,100.00' },
                            { name: 'Chicken Biryani', price: 'Rs. 1,350.00' }
                          ].map((item, i) => (
                            <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 transition-colors flex flex-col justify-between h-24">
                              <span className="text-xs font-bold text-slate-200 line-clamp-1">{item.name}</span>
                              <div className="flex items-baseline justify-between mt-2">
                                <span className="text-xs font-bold text-amber-400">{item.price}</span>
                                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">+ Add</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Cart Summary Strip */}
                        <div className="mt-3 p-3 rounded-xl bg-[#070b1a] border border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Current Order: Table 04 (4 Covers)</span>
                          <span className="font-extrabold text-amber-400 text-sm">Total: Rs. 4,100.00</span>
                        </div>
                      </div>
                    )}

                    {/* 2. Interactive Floor Plan / Table Layout (Image 2 match) */}
                    {mod.type === 'table-layout' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <Grid className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Select Table</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">REGULAR</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">VIP LOUNGE</span>
                          </div>
                        </div>

                        {/* Table Status Legend */}
                        <div className="flex items-center gap-4 text-[10px] text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span>Occupied</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            <span>Bill Printed</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>Selected</span>
                          </div>
                        </div>

                        {/* Tables Visual Grid (Green available tables like Image 2) */}
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                          {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((num, i) => (
                            <div 
                              key={num} 
                              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                                i === 1 || i === 4
                                  ? 'bg-rose-950/30 border-rose-600/40 text-rose-300'
                                  : i === 3
                                  ? 'bg-blue-950/40 border-blue-500 text-cyan-300'
                                  : 'bg-emerald-950/30 border-emerald-600/40 text-emerald-300 hover:border-emerald-400'
                              }`}
                            >
                              <span className="text-base font-extrabold">{num}</span>
                              <span className="text-[9px] opacity-75 mt-0.5">4 SEATS</span>
                              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                                i === 1 || i === 4 ? 'bg-rose-500' : i === 3 ? 'bg-blue-400' : 'bg-emerald-400'
                              }`}></span>
                            </div>
                          ))}
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-900 text-[11px] text-slate-400 flex items-center justify-between">
                          <span>Waiter: Suresh Perera (Station A)</span>
                          <span className="text-cyan-400 font-semibold">T-04 Assigned</span>
                        </div>
                      </div>
                    )}

                    {/* 3. Kitchen Display System (KDS) Screen (Image 3 match) */}
                    {mod.type === 'kds-screen' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black tracking-wider text-white">CENTRAL KITCHEN (KDS)</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-mono">LIVE SYNC</span>
                          </div>
                          <span className="text-xs font-mono text-slate-400">07:54:08 PM</span>
                        </div>

                        {/* KDS Station Columns */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {/* Col 1: New Orders */}
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-rose-400 uppercase">NEW ORDERS</span>
                              <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 text-[10px] flex items-center justify-center font-bold">2</span>
                            </div>
                            <div className="p-2 rounded-lg bg-[#0e142e] border border-amber-500/30 text-[10px] space-y-1">
                              <span className="font-bold text-amber-300 block">KOT #42 • T-04</span>
                              <span className="text-slate-300 block">• 2x Chicken Biryani</span>
                              <span className="text-slate-300 block">• 1x Cheese Kotthu</span>
                              <span className="text-[9px] text-rose-400 block font-mono">02m 14s elapsed</span>
                            </div>
                          </div>

                          {/* Col 2: Preparing */}
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-amber-400 uppercase">PREPARING</span>
                              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">2</span>
                            </div>
                            <div className="p-2 rounded-lg bg-[#0e142e] border border-slate-700 text-[10px] space-y-1">
                              <span className="font-bold text-slate-200 block">KOT #41 • T-08</span>
                              <span className="text-slate-300 block">• 1x Beef Burger (Well Done)</span>
                              <span className="text-[9px] text-amber-400 block font-mono">08m 42s elapsed</span>
                            </div>
                          </div>

                          {/* Col 3: Ready to Serve */}
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-emerald-400 uppercase">READY</span>
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">0</span>
                            </div>
                            <div className="h-20 flex items-center justify-center text-slate-600 text-[10px]">
                              All clear
                            </div>
                          </div>

                          {/* Col 4: Served */}
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-blue-400 uppercase">SERVED</span>
                              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center font-bold">18</span>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-900 text-[9px] text-slate-500 text-center">
                              Order queue flowing
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-2 text-slate-400">
                          <span>Thermal KOT Printer Status: Online (EPSON TM-T88)</span>
                          <span className="text-emerald-400">100% Delivery Accuracy</span>
                        </div>
                      </div>
                    )}

                    {/* 4. Digital QR Menu on Guest Mobile (Image 4 match) */}
                    {mod.type === 'qr-menu' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-2">
                            <QrCode className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-black tracking-wider text-white">DIGITAL MENU • TABLE 06</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">GUEST VIEW</span>
                        </div>

                        {/* Search bar inside QR mobile */}
                        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
                          <span>🔍 Search delicious dishes...</span>
                        </div>

                        {/* Category selector */}
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">All Items</span>
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">Rice Meals</span>
                          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold">Non-Veg Addons</span>
                        </div>

                        {/* Dish items with price and fork icon like Image 4 */}
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { name: 'Devilled Chicken', price: 'Rs. 230.00' },
                            { name: 'Fried Fish Fillet', price: 'Rs. 140.00' },
                            { name: 'Spicy Prawn Curry', price: 'Rs. 320.00' }
                          ].map((d, i) => (
                            <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col items-center justify-between h-28">
                              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mt-1">
                                <Utensils className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-200 block">{d.name}</span>
                                <span className="text-[10px] font-extrabold text-amber-400 mt-1 block">{d.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-slate-950 font-bold text-xs text-center">
                          Tap to Call Waiter or Request Bill
                        </div>
                      </div>
                    )}

                    {/* Generic / Other Products Showcase Screen */}
                    {mod.type.startsWith('generic-') && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">{p.name} {mod.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-mono">ENTERPRISE</span>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">Daily Activity</span>
                            <span className="text-base font-bold text-white mt-1 block">1,420 Ops</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">Accuracy</span>
                            <span className="text-base font-bold text-emerald-400 mt-1 block">99.98%</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">Latency</span>
                            <span className="text-base font-bold text-cyan-400 mt-1 block">&lt; 100ms</span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#070b1a] border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>Hardware Device Integration</span>
                            <span className="text-emerald-400 font-mono">Connected</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>Local Offline Data Database</span>
                            <span className="text-cyan-400 font-mono">SQLite / Realm Ready</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-300">
                            <span>Cloud Failover Endpoint</span>
                            <span className="text-blue-400 font-mono">Atlas Replication</span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center justify-between">
                          <span>Includes Full Documentation &amp; Git Repository</span>
                          <span className="text-cyan-400 font-bold">100% Unminified Code</span>
                        </div>
                      </div>
                    )}

                    {/* Mobixa / Phone Repair screens */}
                    {mod.type.startsWith('mobixa-') && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">MOBIXA WORKSHOP &bull; {mod.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600 text-white font-mono">IMEI ENGINE</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">IMEI Checked</span>
                            <span className="text-xs font-mono text-cyan-400 mt-1 block">354892019482104</span>
                            <span className="text-[10px] text-emerald-400 mt-0.5 block">✓ TRCSL Approved</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">Active Job Cards</span>
                            <span className="text-base font-bold text-amber-400 mt-1 block">14 in Workshop</span>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">3 Ready for SMS</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#070b1a] border border-slate-800 text-xs space-y-1.5">
                          <div className="flex justify-between text-slate-300">
                            <span>Job #JOB-1082 (iPhone 13 Pro Screen Replacement)</span>
                            <span className="text-amber-400 font-semibold">Tech: Kasun</span>
                          </div>
                          <div className="flex justify-between text-slate-400 text-[11px]">
                            <span>Customer: Dinuka Senanayake (077 482 9102)</span>
                            <span className="text-emerald-400">SMS Sent ✓</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gymora / Gym screens */}
                    {mod.type.startsWith('gymora-') && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">GYMORA ACCESS &bull; {mod.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-mono">BIOMETRIC READY</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5">
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">Floor Count</span>
                            <span className="text-base font-extrabold text-white mt-1 block">42 Active</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">Check-ins</span>
                            <span className="text-base font-extrabold text-cyan-400 mt-1 block">128 Today</span>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-[10px] text-slate-400 uppercase block">Turnstile</span>
                            <span className="text-base font-extrabold text-emerald-400 mt-1 block">Unlocked</span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#070b1a] border border-slate-800 text-xs space-y-1.5">
                          <div className="flex justify-between text-slate-300">
                            <span className="font-bold">Member: Nimal Perera (Card #8942)</span>
                            <span className="text-emerald-400 font-semibold">Annual VIP</span>
                          </div>
                          <div className="flex justify-between text-slate-400 text-[11px]">
                            <span>Valid until: 15 Dec 2027</span>
                            <span className="text-cyan-400">Fingerprint Verified ✓</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 5. Bottom Action CTA matching store palette */}
      <div className={`max-w-5xl mx-auto mt-28 p-8 sm:p-12 rounded-3xl border text-center transition-all ${
        isDark 
          ? 'bg-gradient-to-b from-[#0c1228] to-[#070a16] border-slate-800 shadow-2xl' 
          : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0094ff] mb-2 inline-block">
          GET THIS PRODUCTION-READY SOLUTION
        </span>
        <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}>
          Ready to Deploy {p.name} for Your Business?
        </h3>
        <p className={`text-sm sm:text-base max-w-xl mx-auto mb-8 ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Pay once, own forever. Receive the full Git repository, deployment instructions, and 12-month Sri Lankan hardware warranty.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onChoosePackage(p)}
            className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Choose Your Package</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onRequestCustomize(p)}
            className={`px-7 py-4 rounded-2xl font-bold text-sm cursor-pointer transition-all hover:scale-105 active:scale-95 border ${
              isDark 
                ? 'bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800' 
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
            }`}
          >
            Request Custom Changes
          </button>
        </div>
      </div>

    </div>
  );
}
