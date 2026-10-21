const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const Product = require('./models/Product');
const Inquiry = require('./models/Inquiry');
const Sale = require('./models/Sale');

const { router: authRouter, seedDefaultUsers } = require('./routes/auth');
const adminRouter = require('./routes/admin');
const ordersRouter = require('./routes/orders');
const { verifyToken, requireRole } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/raxwo';

let isMongoConnected = false;

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors());
app.use(express.json());

// Mount Modular Enterprise Routers
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/orders', ordersRouter);

// In-memory / mock database store
let liveStats = {
  salesToday: 148500,
  salesGrowth: "+12.5%",
  newOrders: 24,
  ordersGrowth: "+8.2%",
  lowStockCount: 8,
  lowStockStatus: "Reorder",
  mobileTodaySales: 48200,
  mobileCompletedOrders: 12,
  systemStatus: {
    status: "online",
    label: "System ready",
    subtext: "All services online",
    uptime: "99.98%",
    lastSync: new Date().toISOString()
  },
  revenueChart: [
    { day: "Mon", revenue: 95000, height: 45 },
    { day: "Tue", revenue: 110000, height: 55 },
    { day: "Wed", revenue: 84000, height: 40 },
    { day: "Thu", revenue: 135000, height: 75 },
    { day: "Fri", revenue: 160000, height: 90 },
    { day: "Sat", revenue: 148500, height: 82 },
    { day: "Sun", revenue: 120000, height: 60 }
  ]
};

const erpProducts = [
  {
    id: "mobixa",
    name: "Mobixa",
    subtitle: "Mobile Shop ERP",
    category: "Retail",
    tagline: "Manage sales, inventory, accessories and service jobs in one place.",
    fullDescription: "A complete, easy-to-use system for mobile sales, accessories, repairs, inventory and customer care.",
    priceLKR: 75000,
    priceUSD: 249,
    badge: "Retail",
    rating: 4.9,
    reviewsCount: 126,
    iconColor: "from-blue-600 to-cyan-500",
    features: [
      "Mobile IMEI tracking & barcode scanning",
      "Repair service job cards & technician commissions",
      "Accessory stock depletion & warranty serials",
      "Customer SMS alerts upon repair completion"
    ],
    audience: [
      "Mobile shop owners",
      "Mobile accessory stores",
      "Smartphone repair & service centers"
    ],
    techStack: ["React", "Node.js", "Electron", "PostgreSQL"],
    demoUrl: "#demo-mobixa"
  },
  {
    id: "gymora",
    name: "Gymora",
    subtitle: "Gym Management ERP",
    category: "Business Services",
    tagline: "Simplify memberships, payments, trainers, attendance and reports.",
    fullDescription: "All-in-one fitness center platform with biometric RFID check-in, subscription plans, trainer schedules and POS supplement counter.",
    priceLKR: 68000,
    priceUSD: 225,
    badge: "Business Services",
    rating: 4.8,
    reviewsCount: 84,
    iconColor: "from-amber-500 to-orange-600",
    features: [
      "Biometric fingerprint & RFID gate access",
      "Monthly & annual recurring membership billing",
      "Personal trainer booking & commissions",
      "Supplement shake bar POS billing"
    ],
    audience: [
      "Gym & fitness centers",
      "Crossfit boxes & studios",
      "Sports clubs"
    ],
    techStack: ["React", "Express", "PostgreSQL"],
    demoUrl: "#demo-gymora"
  },
  {
    id: "exxplan",
    name: "Exxplan",
    subtitle: "Grocery & Retail ERP",
    category: "Retail",
    tagline: "Fast POS, stock, supplier, sales and reporting tools for busy stores.",
    fullDescription: "Ultra-fast barcode scanning, weigh-scale electronic integration, multi-counter cash registers, and automated supplier reorder prompts.",
    priceLKR: 82000,
    priceUSD: 270,
    badge: "Retail",
    rating: 4.9,
    reviewsCount: 110,
    iconColor: "from-blue-700 to-indigo-600",
    features: [
      "Fractional weight barcode scale reading",
      "High-speed 0.5s barcode bill checkout",
      "Automatic supplier purchase order generation",
      "Daily shift closing & drawer reconciliation"
    ],
    audience: [
      "Supermarkets & grocery stores",
      "Departmental stores",
      "Retail marts & boutiques"
    ],
    techStack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-exxplan"
  },
  {
    id: "dineflow",
    name: "DineFlow",
    subtitle: "Restaurant & Cafe ERP",
    category: "Hospitality",
    tagline: "Table management, Kitchen Display (KDS), split bills & food costings.",
    fullDescription: "Floor table plan live ordering screen, kitchen order tickets (KOT), recipe ingredient deductions, and courier orders consolidation.",
    priceLKR: 72000,
    priceUSD: 240,
    badge: "Hospitality",
    rating: 4.9,
    reviewsCount: 95,
    iconColor: "from-red-500 to-rose-600",
    features: [
      "Visual floor table plan & seat ordering",
      "Kitchen Display System (KDS) & kitchen printers",
      "Recipe & raw ingredient inventory depletion",
      "Delivery aggregator consolidated billing"
    ],
    audience: [
      "Fine dining & family restaurants",
      "Cafes & bakeries",
      "Pubs & bars"
    ],
    techStack: ["React", "Express", "MongoDB"],
    demoUrl: "#demo-dineflow"
  },
  {
    id: "pharmacare",
    name: "PharmaCare",
    subtitle: "Pharmacy & Clinic ERP",
    category: "Healthcare",
    tagline: "Drug dosage notes, batch expiry alerts, NMRA compliance tracking.",
    fullDescription: "Government health authority compliant drug registry, generic alternative search, doctor prescription history, and near-expiry alerts.",
    priceLKR: 79000,
    priceUSD: 260,
    badge: "Healthcare",
    rating: 5.0,
    reviewsCount: 78,
    iconColor: "from-emerald-500 to-teal-600",
    features: [
      "Generic drug lookup & active molecule match",
      "Expiry warning 30/60/90 days in advance",
      "Doctor prescription scans & patient history",
      "NMRA audit formatted reporting"
    ],
    audience: [
      "Pharmacies & dispensaries",
      "Medical clinics",
      "Ayurvedic drug stores"
    ],
    techStack: ["Vue.js", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-pharmacare"
  },
  {
    id: "buildtrack",
    name: "BuildTrack",
    subtitle: "Hardware & Construction ERP",
    category: "Construction",
    tagline: "Fractional units (meters, kg, bundles), contractor credit & transport billing.",
    fullDescription: "Multiple units of measurement for cement, sand, paint, steel rods, contractor running credit accounts, and lorry delivery tracking.",
    priceLKR: 89000,
    priceUSD: 295,
    badge: "Construction",
    rating: 4.9,
    reviewsCount: 54,
    iconColor: "from-amber-600 to-yellow-600",
    features: [
      "Multiple units of measurement (Feet, Meter, Tonne)",
      "Contractor credit accounts & payment milestones",
      "Lorry delivery tracking & unloading slips",
      "Paint tinting formulas & base stock deduction"
    ],
    audience: [
      "Hardware stores",
      "Construction material suppliers",
      "Paint dealers"
    ],
    techStack: ["React", "Node.js", "SQLite"],
    demoUrl: "#demo-buildtrack"
  },
  {
    id: "eduportal",
    name: "EduPortal",
    subtitle: "Academy & School ERP",
    category: "Education",
    tagline: "Student admissions, class card attendance, fees ledger & parent SMS.",
    fullDescription: "Barcode ID card student attendance tapping, monthly tuition fee arrears, automated parent SMS alerts, and report card generation.",
    priceLKR: 65000,
    priceUSD: 215,
    badge: "Education",
    rating: 4.8,
    reviewsCount: 62,
    iconColor: "from-blue-600 to-indigo-700",
    features: [
      "Barcode ID card student attendance tapping",
      "Monthly tuition fee receipts & arrears reports",
      "Exam mark sheets & report card generation",
      "Parent communication portal & automatic SMS alerts"
    ],
    audience: [
      "Tuition institutes",
      "Private schools & academies",
      "Vocational training colleges"
    ],
    techStack: ["React", "Express", "MySQL"],
    demoUrl: "#demo-eduportal"
  },
  {
    id: "swiftlogix",
    name: "SwiftLogix",
    subtitle: "Transport & Fleet ERP",
    category: "Transport",
    tagline: "Vehicle dispatch, fuel monitoring, driver shifts and route GPS.",
    fullDescription: "Complete logistics, van sales, freight trip planning, fuel consumption tracking and vehicle maintenance records.",
    priceLKR: 92000,
    priceUSD: 305,
    badge: "Transport",
    rating: 4.7,
    reviewsCount: 41,
    iconColor: "from-purple-600 to-pink-600",
    features: [
      "Vehicle trip dispatch & waybill logs",
      "Fuel consumption & mileage audit",
      "Driver overtime & trip allowances",
      "Service & revenue license renewal alerts"
    ],
    audience: [
      "Van sales distributors",
      "Logistics & transport companies",
      "Courier fleets"
    ],
    techStack: ["React Native", "Next.js", "MySQL"],
    demoUrl: "#demo-swiftlogix"
  },
  {
    id: "manufacturing-erp",
    name: "Industrial Core Manufacturing ERP",
    category: "Manufacturing",
    tagline: "Bill of materials (BOM), production cycles, work orders & scrap auditing",
    priceLKR: 125000,
    priceUSD: 410,
    badge: "Enterprise",
    rating: 4.9,
    reviewsCount: 19,
    features: [
      "Multi-level Bill of Materials (BOM)",
      "Assembly line work orders & worker tracking",
      "Raw materials procurement planning (MRP)",
      "Quality assurance & batch inspection records"
    ],
    techStack: ["Next.js", "Go / Node", "PostgreSQL"],
    demoUrl: "#demo-manufacturing"
  },
  {
    id: "garment-apparel",
    name: "StitchERP Garment & Fashion",
    category: "Textile & Garment",
    tagline: "Size/color matrices, cutting orders, fabric wastage & CMT job tracking",
    priceLKR: 110000,
    priceUSD: 365,
    badge: "Pro",
    rating: 4.8,
    reviewsCount: 22,
    features: [
      "Size, colour and style matrix inventory",
      "Subcontractor CMT tracking & billings",
      "Fabric roll stock with GSM & yield calculations",
      "Barcode swing tag printing"
    ],
    techStack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-garment"
  },
  {
    id: "auto-spare-parts",
    name: "GearMaster Auto & Spares ERP",
    category: "Automotive",
    tagline: "OEM part number cross-reference, job cards & mechanic commissions",
    priceLKR: 85000,
    priceUSD: 280,
    badge: "High Demand",
    rating: 4.9,
    reviewsCount: 31,
    features: [
      "Part numbers & interchangeable parts lookup",
      "Workshop service job cards & inspection check-list",
      "Technician labor time tracking & commissions",
      "Vehicle service history by chassis/reg number"
    ],
    techStack: ["React", "Express", "PostgreSQL"],
    demoUrl: "#demo-auto"
  },
  {
    id: "hotel-resort-pms",
    name: "VillaStay Hotel & Resort PMS",
    category: "Hospitality",
    tagline: "Room booking engine, check-in/out, housekeeping & guest folios",
    priceLKR: 98000,
    priceUSD: 325,
    badge: "Popular",
    rating: 4.8,
    reviewsCount: 17,
    features: [
      "Interactive room calendar & reservation matrix",
      "Direct booking engine widget for website",
      "Housekeeping clean/dirty status real-time update",
      "Restaurant & spa room-charge billing"
    ],
    techStack: ["Next.js", "Express", "Supabase"],
    demoUrl: "#demo-hotel"
  },
  {
    id: "hardware-construction",
    name: "BuildTrack Hardware & Paint ERP",
    category: "Construction & Hardware",
    tagline: "Fractional units (meters, kg, bundles), contractor credit & transport billing",
    priceLKR: 79000,
    priceUSD: 260,
    badge: "Reliable",
    rating: 4.9,
    reviewsCount: 25,
    features: [
      "Multiple units of measurement (Feet, Meter, Tonne)",
      "Contractor credit accounts & payment milestones",
      "Lorry delivery tracking & unloading slips",
      "Paint tinting formulas & base stock deduction"
    ],
    techStack: ["React", "Node.js", "SQLite"],
    demoUrl: "#demo-hardware"
  },
  {
    id: "microfinance-leasing",
    name: "LendPro Micro-Finance ERP",
    category: "FinTech & Banking",
    tagline: "Loan installment schedules, collector mobile app & penalty calculations",
    priceLKR: 135000,
    priceUSD: 445,
    badge: "Enterprise",
    rating: 5.0,
    reviewsCount: 15,
    features: [
      "Daily / weekly / monthly installment schedules",
      "Field recovery collector Android app",
      "Automated late penalty & interest calculations",
      "Guarantor & collateral document vaults"
    ],
    techStack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-finance"
  },
  {
    id: "salon-spa-erp",
    name: "GlowDesk Salon & Spa ERP",
    category: "Beauty & Wellness",
    tagline: "Stylist appointment calendar, commission splits & membership packages",
    priceLKR: 58000,
    priceUSD: 190,
    badge: "Best Value",
    rating: 4.9,
    reviewsCount: 28,
    features: [
      "Appointment scheduling with SMS reminders",
      "Therapist commission & tips calculation",
      "Client treatment notes & before/after gallery",
      "Gift vouchers & prepaid packages"
    ],
    techStack: ["React", "Express", "MongoDB"],
    demoUrl: "#demo-salon"
  },
  {
    id: "school-institute",
    name: "EduPortal Academy & School ERP",
    category: "Education",
    tagline: "Student admissions, class card attendance, fees ledger & parent SMS",
    priceLKR: 65000,
    priceUSD: 215,
    badge: "Popular",
    rating: 4.7,
    reviewsCount: 21,
    features: [
      "Barcode ID card student attendance tapping",
      "Monthly tuition fee receipts & arrears reports",
      "Exam mark sheets & report card generation",
      "Parent communication portal & automatic SMS alerts"
    ],
    techStack: ["React", "Express", "MySQL"],
    demoUrl: "#demo-school"
  },
  {
    id: "realestate-rental",
    name: "PropertyNexus Real Estate ERP",
    category: "Real Estate",
    tagline: "Tenant lease agreements, rent arrears, maintenance tickets & utility splits",
    priceLKR: 89000,
    priceUSD: 295,
    badge: "Modern",
    rating: 4.8,
    reviewsCount: 14,
    features: [
      "Lease agreement digital signing & expiry alerts",
      "Automated monthly rent invoice emailing",
      "Electricity & water meter reading distribution",
      "Landlord payout statements & expense logs"
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-property"
  },
  {
    id: "warehouse-3pl",
    name: "Swift3PL Warehouse Management",
    category: "Wholesale & Logistics",
    tagline: "Pallet racking, bin locations, pick & pack dispatch and courier integration",
    priceLKR: 115000,
    priceUSD: 380,
    badge: "Advanced",
    rating: 4.9,
    reviewsCount: 18,
    features: [
      "Bin / aisle / shelf 3D location indexing",
      "Wave picking & barcode hand scanner app",
      "Waybill generation & tracking numbers",
      "Damaged goods & return merchandise logs"
    ],
    techStack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-warehouse"
  }
];

const currencyRates = {
  LKR: { symbol: "LKR", rate: 1, name: "Sri Lankan Rupee" },
  USD: { symbol: "$", rate: 0.0033, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.0030, name: "Euro" },
  GBP: { symbol: "£", rate: 0.0026, name: "British Pound" },
  INR: { symbol: "₹", rate: 0.28, name: "Indian Rupee" }
};

const defaultProductImages = {
  mobixa: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
  gymora: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  exxplan: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
  dineflow: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  pharmacare: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
  buildtrack: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  eduportal: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  swiftlogix: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  'manufacturing-erp': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  'garment-apparel': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  'auto-spare-parts': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
  'hotel-resort-pms': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'hardware-construction': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  'microfinance-leasing': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  'salon-spa-erp': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  'school-institute': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  'realestate-rental': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  'warehouse-3pl': 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80'
};

erpProducts.forEach(p => {
  if (!p.image && defaultProductImages[p.id]) {
    p.image = defaultProductImages[p.id];
  }
});

let userInquiries = [];

// MongoDB Connection & Seeding
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 6000
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully (${MONGODB_URI.split('@').pop()})`);
    await seedProductsIfEmpty();
    await seedDefaultUsers();
  } catch (err) {
    isMongoConnected = false;
    console.warn(`[MongoDB] Notice: Could not connect to MongoDB (${err.message}). Using in-memory fallback store.`);
  }
}

async function seedProductsIfEmpty() {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(erpProducts);
      console.log(`[MongoDB] Seeded ${erpProducts.length} ERP products into database.`);
    } else {
      for (const [id, img] of Object.entries(defaultProductImages)) {
        await Product.updateMany({ id, $or: [{ image: null }, { image: { $exists: false } }] }, { $set: { image: img } });
      }
    }
  } catch (err) {
    console.error('[MongoDB] Error seeding products:', err.message);
  }
}

connectDB();

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: "online",
    message: "Raxwo ERP Platform API is operational",
    database: isMongoConnected ? "connected" : "in-memory-fallback",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: liveStats
  });
});

app.post('/api/sales/new', async (req, res) => {
  const { amount = 12500, customer = "Walk-in Customer", itemsCount = 1 } = req.body || {};
  const added = Number(amount) || 12500;
  liveStats.salesToday += added;
  liveStats.newOrders += 1;
  liveStats.mobileTodaySales += Math.round(added * 0.4);
  liveStats.mobileCompletedOrders += 1;

  // Update current day in chart
  const currentDay = liveStats.revenueChart[5]; // Saturday/Today
  currentDay.revenue += added;

  // Persist to MongoDB if connected
  if (isMongoConnected) {
    try {
      await Sale.create({ amount: added, customer, itemsCount });
    } catch (e) {
      console.warn('[MongoDB] Failed to persist sale:', e.message);
    }
  }

  res.json({
    success: true,
    message: `Sale of LKR ${added.toLocaleString()} recorded successfully!`,
    stats: liveStats
  });
});

app.get('/api/products', async (req, res) => {
  const { category, search } = req.query;

  if (isMongoConnected) {
    try {
      const query = {};
      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { tagline: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } }
        ];
      }
      const dbProducts = await Product.find(query).lean();
      return res.json({
        success: true,
        count: dbProducts.length,
        source: 'mongodb',
        data: dbProducts
      });
    } catch (err) {
      console.warn('[MongoDB] Query failed, falling back to memory:', err.message);
    }
  }

  let filtered = [...erpProducts];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    source: 'in-memory',
    data: filtered
  });
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (isMongoConnected) {
    try {
      await Product.findOneAndUpdate(
        { $or: [{ id: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { $set: updates },
        { new: true }
      );
    } catch (e) {
      console.warn('[MongoDB] Update product error:', e.message);
    }
  }

  const idx = erpProducts.findIndex(p => p.id === id);
  if (idx !== -1) {
    erpProducts[idx] = { ...erpProducts[idx], ...updates };
    return res.json({ success: true, message: 'Product updated successfully', data: erpProducts[idx] });
  }

  res.status(404).json({ success: false, message: 'Product not found' });
});

app.post('/api/products', async (req, res) => {
  const newProduct = {
    id: req.body.id || `erp-${Date.now()}`,
    ...req.body
  };

  if (isMongoConnected) {
    try {
      await Product.create(newProduct);
    } catch (e) {
      console.warn('[MongoDB] Create product error:', e.message);
    }
  }

  erpProducts.unshift(newProduct);
  res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
});

let cachedRates = { ...currencyRates };
let lastRateFetch = 0;

app.get('/api/currencies', async (req, res) => {
  const now = Date.now();
  if (now - lastRateFetch > 3600000) {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/LKR');
      if (response.ok) {
        const data = await response.json();
        if (data && data.rates) {
          if (data.rates.USD) cachedRates.USD.rate = Number(data.rates.USD.toFixed(6));
          if (data.rates.EUR) cachedRates.EUR.rate = Number(data.rates.EUR.toFixed(6));
          if (data.rates.GBP) cachedRates.GBP.rate = Number(data.rates.GBP.toFixed(6));
          if (data.rates.INR) cachedRates.INR.rate = Number(data.rates.INR.toFixed(4));
          lastRateFetch = now;
        }
      }
    } catch (e) {
      // Gracefully fall back to preset rates
    }
  }
  res.json({
    success: true,
    rates: cachedRates,
    lastUpdated: new Date(lastRateFetch || Date.now()).toISOString()
  });
});

app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, businessType, requirements, preferredErp } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: "Name and phone number are required." });
  }

  const inquiry = {
    id: `INQ-${Date.now()}`,
    name,
    phone,
    email: email || "N/A",
    businessType: businessType || "Retail",
    requirements: requirements || "Custom ERP configuration",
    preferredErp: preferredErp || "General ERP",
    submittedAt: new Date().toISOString()
  };

  userInquiries.push(inquiry);

  if (isMongoConnected) {
    try {
      await Inquiry.create(inquiry);
    } catch (e) {
      console.warn('[MongoDB] Failed to persist inquiry:', e.message);
    }
  }

  res.status(201).json({
    success: true,
    message: "Thank you! Our technical specialist will contact you within 15 minutes.",
    inquiryId: inquiry.id
  });
});

app.get('/api/inquiries', verifyToken, requireRole(['super_admin', 'sales_admin']), async (req, res) => {
  if (isMongoConnected) {
    try {
      const dbInquiries = await Inquiry.find().sort({ submittedAt: -1 }).lean();
      return res.json({
        success: true,
        count: dbInquiries.length,
        source: 'mongodb',
        data: dbInquiries
      });
    } catch (e) {
      console.warn('[MongoDB] Failed to fetch inquiries:', e.message);
    }
  }

  res.json({
    success: true,
    count: userInquiries.length,
    source: 'in-memory',
    data: userInquiries
  });
});

// ==========================================
// Serve Static Frontend Assets in Production
// ==========================================
const fs = require('fs');
const candidateDistPaths = [
  path.resolve(__dirname, '../frontend/dist'),
  path.resolve(__dirname, './dist'),
  path.resolve(__dirname, '../dist'),
  path.resolve(__dirname, './public')
];

const distPath = candidateDistPaths.find(p => fs.existsSync(p));

if (distPath) {
  console.log(`[Raxwo] Serving static frontend files from: ${distPath}`);
  app.use(express.static(distPath));

  // SPA fallback for client-side routing (React / Vite)
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err && !res.headersSent) {
        next(err);
      }
    });
  });
} else {
  console.warn('[Raxwo] Notice: No static frontend dist folder found. Serving API status fallback.');
  app.get('/', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Raxwo.lk Backend</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:50px;background:#0c0827;color:#fff;">
          <h2>Raxwo ERP Platform API is Online</h2>
          <p>Static build is being generated. Please run build:frontend.</p>
        </body>
      </html>
    `);
  });
}

// Global Express Error Handler (prevents hung requests and 504 timeouts)
app.use((err, req, res, next) => {
  console.error('[Raxwo Server Error]:', err.message || err);
  if (!res.headersSent) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Process-level unhandled exception/rejection safety nets
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err.message || err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[Unhandled Rejection]:', reason);
});

const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`[Raxwo Backend] Server running on http://${HOST}:${PORT}`);
});
