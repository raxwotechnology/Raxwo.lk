const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const STORE_PATH = path.join(__dirname, 'data', 'store.json');

// Default initial seed data
const DEFAULT_USERS = [
  {
    id: 'usr_admin',
    _id: 'usr_admin',
    name: 'Super Administrator',
    email: 'admin@raxwo.lk',
    password: bcrypt.hashSync('Admin@12345', 10),
    role: 'super_admin',
    company: 'Raxwo Next Level Tech',
    phone: '+94 77 123 4567'
  },
  {
    id: 'usr_sales',
    _id: 'usr_sales',
    name: 'Sales Manager',
    email: 'sales@raxwo.lk',
    password: bcrypt.hashSync('Sales@12345', 10),
    role: 'sales_admin',
    company: 'Raxwo Enterprise Sales',
    phone: '+94 77 234 5678'
  },
  {
    id: 'usr_buyer',
    _id: 'usr_buyer',
    name: 'Sample Buyer',
    email: 'buyer@raxwo.lk',
    password: bcrypt.hashSync('Buyer@12345', 10),
    role: 'buyer',
    company: 'Lanka Retail Mart',
    phone: '+94 77 345 6789'
  }
];

const DEFAULT_ORDERS = [
  {
    orderId: "ORD-2026-10482",
    id: "ord_demo_01",
    customer: {
      name: "Saman Kumara",
      email: "saman@gmail.com",
      phone: "077 987 6543",
      company: "Saman Textiles (Pvt) Ltd"
    },
    items: [
      {
        productId: "mobixa",
        name: "Mobixa Mobile Shop ERP",
        priceLKR: 85000,
        priceUSD: 280,
        quantity: 1
      }
    ],
    totalLKR: 85000,
    totalUSD: 280,
    currency: "LKR",
    paymentMethod: "bank_transfer",
    paymentStatus: "completed",
    status: "Active",
    licenseKey: "RAXWO-MBX-8821-KL40",
    invoiceNumber: "INV-2026-10482",
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

const DEFAULT_INQUIRIES = [
  {
    id: "INQ-1794800001",
    name: "Kasun Jayawardena",
    phone: "071 234 5678",
    email: "kasun@gmail.com",
    businessType: "Mobile & Accessories Retail",
    requirements: "Need 3 counter POS terminals with IMEI tracking",
    preferredErp: "Mobixa",
    status: "new",
    source: "website",
    submittedAt: new Date(Date.now() - 3600000).toISOString()
  }
];

let storeData = {
  users: [...DEFAULT_USERS],
  orders: [...DEFAULT_ORDERS],
  inquiries: [...DEFAULT_INQUIRIES],
  productOverrides: {}
};

// Load existing data from disk if available
function loadStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        storeData.users = Array.isArray(parsed.users) && parsed.users.length > 0 ? parsed.users : [...DEFAULT_USERS];
        storeData.orders = Array.isArray(parsed.orders) ? parsed.orders : [...DEFAULT_ORDERS];
        storeData.inquiries = Array.isArray(parsed.inquiries) ? parsed.inquiries : [...DEFAULT_INQUIRIES];
        storeData.productOverrides = (parsed.productOverrides && typeof parsed.productOverrides === 'object') ? parsed.productOverrides : {};
      }
    } else {
      saveStore();
    }
  } catch (err) {
    console.warn('[Store] Notice loading store from disk:', err.message);
    saveStore();
  }
}

// Persist data to disk safely
function saveStore() {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(storeData, null, 2), 'utf8');
  } catch (err) {
    console.error('[Store] Error saving store to disk:', err.message);
  }
}

// Initialize on module load
loadStore();

module.exports = {
  get inMemoryUsers() {
    return storeData.users;
  },
  get inMemoryOrders() {
    return storeData.orders;
  },
  get inMemoryInquiries() {
    return storeData.inquiries;
  },
  addUser(user) {
    storeData.users.push(user);
    saveStore();
    return user;
  },
  findUserByEmail(email) {
    const normalized = (email || '').toLowerCase().trim();
    return storeData.users.find(u => (u.email || '').toLowerCase().trim() === normalized);
  },
  addOrder(order) {
    // Put newest orders first
    storeData.orders.unshift(order);
    saveStore();
    return order;
  },
  updateOrder(orderId, updateFields) {
    const idx = storeData.orders.findIndex(o => o.orderId === orderId || o.id === orderId);
    if (idx !== -1) {
      storeData.orders[idx] = { ...storeData.orders[idx], ...updateFields };
      saveStore();
      return storeData.orders[idx];
    }
    return null;
  },
  addInquiry(inquiry) {
    storeData.inquiries.unshift(inquiry);
    saveStore();
    return inquiry;
  },
  updateInquiry(id, updateFields) {
    const idx = storeData.inquiries.findIndex(i => i.id === id || i._id === id);
    if (idx !== -1) {
      storeData.inquiries[idx] = { ...storeData.inquiries[idx], ...updateFields };
      saveStore();
      return storeData.inquiries[idx];
    }
    return null;
  },
  getProductOverrides() {
    return storeData.productOverrides || {};
  },
  updateProductOverride(productId, updates) {
    if (!storeData.productOverrides) storeData.productOverrides = {};
    storeData.productOverrides[productId] = {
      ...(storeData.productOverrides[productId] || {}),
      ...updates
    };
    saveStore();
    return storeData.productOverrides[productId];
  },
  saveStore
};
