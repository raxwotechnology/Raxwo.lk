const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const Product = require('./models/Product');

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
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-swiftlogix"
  },
  {
    id: "goldenspa",
    name: "GoldenSpa",
    subtitle: "Salon & Spa ERP",
    category: "Beauty & Wellness",
    tagline: "Appointment calendar, stylist commission, package deals and loyalty points.",
    fullDescription: "Visual appointment timeline booking, therapist commission split, membership punch cards, and beauty cosmetics counter POS.",
    priceLKR: 62000,
    priceUSD: 205,
    badge: "Beauty & Wellness",
    rating: 4.9,
    reviewsCount: 67,
    iconColor: "from-pink-500 to-rose-500",
    features: [
      "Visual appointment timeline & chairs planner",
      "Therapist & stylist commission breakdown",
      "Prepaid treatment package redemption tracking",
      "Client hair/skin treatment formula notes"
    ],
    audience: [
      "Hair & beauty salons",
      "Day spas & wellness centers",
      "Barber shops"
    ],
    techStack: ["React", "FastAPI", "PostgreSQL"],
    demoUrl: "#demo-goldenspa"
  },
  {
    id: "apparelpro",
    name: "ApparelPro",
    subtitle: "Garment & Boutique ERP",
    category: "Manufacturing & Retail",
    tagline: "Size & Color Matrix (SKU variant), alterations and seasonal discounts.",
    fullDescription: "Multi-dimensional Color x Size grid matrix, tailor alteration task tickets, seasonal markdown automation, and boutique barcode tagging.",
    priceLKR: 78000,
    priceUSD: 258,
    badge: "Manufacturing & Retail",
    rating: 4.8,
    reviewsCount: 58,
    iconColor: "from-violet-600 to-indigo-600",
    features: [
      "Size x Color grid matrix inventory indexing",
      "Barcode tag printing with price & size specifications",
      "Garment alteration tracking tickets",
      "Seasonal sales promotions & bundle discounts"
    ],
    audience: [
      "Clothing boutiques",
      "Textile showrooms",
      "Shoe & footwear stores"
    ],
    techStack: ["React", "Express", "PostgreSQL"],
    demoUrl: "#demo-apparelpro"
  },
  {
    id: "autofix",
    name: "AutoFix",
    subtitle: "Garage & Spares ERP",
    category: "Automotive",
    tagline: "Vehicle service records, job estimation, spare parts catalog & technician log.",
    fullDescription: "Number plate service history lookup, spare parts inventory with OEM part cross-referencing, mechanical labor estimates, and gate pass printouts.",
    priceLKR: 88000,
    priceUSD: 290,
    badge: "Automotive",
    rating: 4.9,
    reviewsCount: 73,
    iconColor: "from-orange-500 to-red-600",
    features: [
      "Vehicle registration plate job history card",
      "OEM spare part number cross-reference lookup",
      "Technician labor hours & estimate generator",
      "Printed vehicle gate pass & invoice"
    ],
    audience: [
      "Auto repair workshops",
      "Motorcycle service centers",
      "Automobile spare parts dealers"
    ],
    techStack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-autofix"
  },
  {
    id: "luxstay",
    name: "LuxStay",
    subtitle: "Hotel & Resort PMS",
    category: "Hospitality",
    tagline: "Front desk room grid, housekeeping status, restaurant POS & guest billing.",
    fullDescription: "Front-desk visual room calendar, direct guest check-in/out, housekeeping room status updates, minibar charging, and consolidated checkout invoice.",
    priceLKR: 98000,
    priceUSD: 325,
    badge: "Hospitality",
    rating: 4.9,
    reviewsCount: 49,
    iconColor: "from-teal-600 to-emerald-700",
    features: [
      "Interactive front desk room calendar grid",
      "Live housekeeping cleaning status toggle",
      "Direct room folio bill charging from restaurant/spa",
      "Guest passport scan record & police report export"
    ],
    audience: [
      "Boutique hotels & villas",
      "Guest houses & resorts",
      "Apartment rentals"
    ],
    techStack: ["React", "Express", "PostgreSQL"],
    demoUrl: "#demo-luxstay"
  },
  {
    id: "microloan",
    name: "MicroLoan",
    subtitle: "Microfinance & Leasing ERP",
    category: "Financial Services",
    tagline: "Daily/weekly loan collector route, interest schedules, penalties and ledger.",
    fullDescription: "Field collection agent Android integration, daily loan installment schedules, automated penalty interest calculators, and defaulter tracking.",
    priceLKR: 95000,
    priceUSD: 315,
    badge: "Financial Services",
    rating: 4.7,
    reviewsCount: 39,
    iconColor: "from-emerald-600 to-cyan-700",
    features: [
      "Daily / weekly / monthly installment amortization planner",
      "Field collector route management & payment receipts",
      "Default penalty interest automated calculation",
      "Guarantor details & collateral asset record"
    ],
    audience: [
      "Microfinance companies",
      "Money lending institutions",
      "Leasing agents"
    ],
    techStack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "#demo-microloan"
  },
  {
    id: "warehousehub",
    name: "WarehouseHub",
    subtitle: "Wholesale & Distribution ERP",
    category: "Logistics & Supply",
    tagline: "Pallet racking, bin locations, pick & pack dispatch and courier integration.",
    fullDescription: "Multi-warehouse stock transfers, bin/rack slot locations, handheld wireless barcode picking, bulk wholesale price tiers, and invoice packing slips.",
    priceLKR: 110000,
    priceUSD: 365,
    badge: "Logistics & Supply",
    rating: 5.0,
    reviewsCount: 34,
    iconColor: "from-indigo-600 to-blue-800",
    features: [
      "Bin & aisle location tracking for 10,000+ items",
      "Pick, pack and ship automated workflow",
      "Tiered wholesale quantity discounts",
      "Inter-branch transfer requests & transit slips"
    ],
    audience: [
      "Wholesale distributors",
      "Import & export warehouses",
      "Central dispatch distribution centers"
    ],
    techStack: ["React", "Express", "PostgreSQL"],
    demoUrl: "#demo-warehousehub"
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('Connected!');

  await Product.deleteMany({});
  const inserted = await Product.insertMany(erpProducts);
  console.log(`Successfully seeded ${inserted.length} ERP products into MongoDB Atlas!`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
