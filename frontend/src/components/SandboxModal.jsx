import React, { useState } from 'react';
import { 
  X, RotateCcw, ShoppingCart, Package, CheckCircle2, 
  Printer, Plus, Trash2, Smartphone, Utensils, Pill, Store,
  Zap, ArrowRight, ShieldCheck, DollarSign
} from 'lucide-react';

export default function SandboxModal({ isOpen, onClose, initialProduct, theme = 'dark' }) {
  if (!isOpen) return null;

  const isDark = theme === 'dark';

  // Demo environments presets
  const demoSystems = {
    mobixa: {
      id: 'mobixa',
      name: 'Mobixa Mobile ERP',
      icon: Smartphone,
      accent: 'from-blue-600 to-cyan-500',
      initialItems: [
        { id: 1, name: 'iPhone 15 Screen Replacement', category: 'Repair Job', price: 28500, stock: 12 },
        { id: 2, name: '20W USB-C Original Adapter', category: 'Accessory', price: 6200, stock: 35 },
        { id: 3, name: 'Tempered Glass 9D Armor', category: 'Accessory', price: 1200, stock: 84 },
        { id: 4, name: 'Samsung Galaxy A54 Battery Service', category: 'Repair Job', price: 14500, stock: 8 }
      ]
    },
    dineflow: {
      id: 'dineflow',
      name: 'DineFlow Restaurant KDS',
      icon: Utensils,
      accent: 'from-red-500 to-rose-600',
      initialItems: [
        { id: 1, name: 'Sri Lankan Seafood Kottu (Double)', category: 'Kitchen', price: 2400, stock: 50 },
        { id: 2, name: 'Butter Chicken Masala & Naan', category: 'Kitchen', price: 3100, stock: 30 },
        { id: 3, name: 'Fresh Passion Fruit Mojito', category: 'Beverage', price: 950, stock: 120 },
        { id: 4, name: 'Chocolate Lava Fondant', category: 'Dessert', price: 1400, stock: 25 }
      ]
    },
    pharmacare: {
      id: 'pharmacare',
      name: 'PharmaCare Drug ERP',
      icon: Pill,
      accent: 'from-emerald-500 to-teal-600',
      initialItems: [
        { id: 1, name: 'Amoxicillin 500mg (Batch EXP: 2027)', category: 'Prescription', price: 650, stock: 240 },
        { id: 2, name: 'Paracetamol 500mg Blister (10s)', category: 'OTC', price: 180, stock: 500 },
        { id: 3, name: 'Cetirizine 10mg Tablets', category: 'Allergy', price: 320, stock: 180 },
        { id: 4, name: 'Digital Infrared Thermometer', category: 'Device', price: 4200, stock: 15 }
      ]
    }
  };

  const currentSystemKey = (initialProduct && demoSystems[initialProduct.id]) 
    ? initialProduct.id 
    : 'mobixa';

  const [activeSystemId, setActiveSystemId] = useState(currentSystemKey);
  const activeSystem = demoSystems[activeSystemId];

  // Active state
  const [inventory, setInventory] = useState(activeSystem.initialItems);
  const [cart, setCart] = useState([]);
  const [salesLog, setSalesLog] = useState([
    { id: 'TX-802', time: '10:14 AM', total: 6200, itemsCount: 1, payment: 'Cash' }
  ]);
  const [notification, setNotification] = useState('');

  // Switch sandbox environment
  const handleSwitchSystem = (sysKey) => {
    setActiveSystemId(sysKey);
    setInventory(demoSystems[sysKey].initialItems);
    setCart([]);
    setNotification(`Loaded demo environment: ${demoSystems[sysKey].name}`);
    setTimeout(() => setNotification(''), 2500);
  };

  // Add item to cart
  const addToCart = (item) => {
    if (item.stock <= 0) {
      setNotification('Item is out of stock in demo inventory!');
      setTimeout(() => setNotification(''), 2000);
      return;
    }
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c.id !== itemId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Complete Simulated POS Sale
  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Deduct stock
    setInventory(prev => prev.map(invItem => {
      const sold = cart.find(c => c.id === invItem.id);
      if (sold) {
        return { ...invItem, stock: Math.max(0, invItem.stock - sold.qty) };
      }
      return invItem;
    }));

    // Record sale
    const newTx = {
      id: `TX-${Math.floor(100 + Math.random() * 900)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      total: cartTotal,
      itemsCount: cart.reduce((s, i) => s + i.qty, 0),
      payment: 'Card (RAMIS ESC/POS Bill #0042)'
    };

    setSalesLog([newTx, ...salesLog]);
    setCart([]);
    setNotification(`✅ Bill Printed & Inventory Deducted (LKR ${cartTotal.toLocaleString()})!`);
    setTimeout(() => setNotification(''), 3000);
  };

  // US2.2 One-Click Sandbox Reset
  const handleResetSandbox = () => {
    setInventory(activeSystem.initialItems);
    setCart([]);
    setSalesLog([
      { id: 'TX-802', time: '10:14 AM', total: 6200, itemsCount: 1, payment: 'Cash' }
    ]);
    setNotification('🔄 Sandbox restored to default baseline (US2.2 Reset Complete)!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className={`relative w-full max-w-5xl my-auto rounded-3xl shadow-2xl border p-5 sm:p-8 overflow-hidden transition-all ${
        isDark ? 'bg-[#090d19] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>

        {/* Top Bar with US2.2 Reset Button */}
        <div className={`flex flex-wrap items-center justify-between gap-4 pb-5 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-1.5 border ${
              isDark 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <Zap className="w-3.5 h-3.5" />
              US2.1 Live Interactive ERP Sandbox
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
              <span>Testing: {activeSystem.name}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* US2.2 One-click reset */}
            <button
              onClick={handleResetSandbox}
              title="US2.2: Reset demo database and inventory back to default"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-sm ${
                isDark
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 hover:text-amber-900'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>1-Click Sandbox Reset</span>
            </button>

            <button 
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Environment Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`text-xs font-semibold self-center mr-1 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>Switch System:</span>
          {Object.keys(demoSystems).map(key => {
            const sys = demoSystems[key];
            const Icon = sys.icon;
            const isActive = activeSystemId === key;
            return (
              <button
                key={key}
                onClick={() => handleSwitchSystem(key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
                    : isDark 
                      ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sys.name}</span>
              </button>
            );
          })}
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`mt-3 p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 animate-fadeIn ${
            isDark 
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' 
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{notification}</span>
          </div>
        )}

        {/* Sandbox Working Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
          
          {/* Left Column: Live POS Catalog & Stock (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0f1424]/80 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-700'
                }`}>
                  <Package className="w-3.5 h-3.5 text-blue-500" />
                  Live Counter Catalog (Click to Add to Bill)
                </span>
                <span className={`text-[11px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>Real-Time Inventory</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {inventory.map(item => (
                  <button
                    key={item.id}
                    onClick={() => addToCart(item)}
                    disabled={item.stock === 0}
                    className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                      item.stock === 0
                        ? isDark 
                          ? 'opacity-40 border-slate-800 bg-slate-900/30 cursor-not-allowed' 
                          : 'opacity-50 border-slate-200 bg-slate-100 cursor-not-allowed'
                        : isDark 
                          ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900' 
                          : 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] uppercase font-semibold block mb-0.5 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {item.category}
                      </span>
                      <h4 className={`text-xs font-bold line-clamp-1 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>{item.name}</h4>
                    </div>
                    <div className={`flex items-center justify-between mt-2 pt-2 border-t ${
                      isDark ? 'border-slate-800/60' : 'border-slate-100'
                    }`}>
                      <span className={`text-xs font-extrabold ${
                        isDark ? 'text-cyan-400' : 'text-blue-600'
                      }`}>
                        LKR {item.price.toLocaleString()}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        item.stock > 10 
                          ? isDark 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.stock > 0 
                            ? isDark 
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                            : isDark 
                              ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                              : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {item.stock} in stock
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transaction Log */}
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0f1424]/80 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-xs font-bold uppercase tracking-wider block mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                Audit Trail & Shift Register
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {salesLog.map(tx => (
                  <div key={tx.id} className={`flex items-center justify-between text-xs py-2 px-2.5 rounded-lg border ${
                    isDark ? 'bg-slate-900/50 border-slate-800/50' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{tx.id}</span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{tx.time}</span>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>({tx.itemsCount} items)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>LKR {tx.total.toLocaleString()}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        isDark 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>Settled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: POS Terminal & Current Bill (5 cols) */}
          <div className="lg:col-span-5">
            <div className={`p-4 rounded-2xl border flex flex-col h-full justify-between ${
              isDark ? 'bg-[#0f1424]/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              
              <div>
                <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                    <ShoppingCart className="w-4 h-4 text-blue-500" />
                    <span>Current Sale Bill #0042</span>
                  </div>
                  {cart.length > 0 && (
                    <button 
                      onClick={() => setCart([])}
                      className="text-[11px] text-red-500 hover:text-red-600 font-semibold hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Cart list */}
                <div className="mt-3 space-y-2 min-h-40 max-h-56 overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className={`h-40 flex flex-col items-center justify-center text-xs text-center px-4 ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <ShoppingCart className="w-8 h-8 mb-2 opacity-40" />
                      <span>Select products from the catalog on the left to add to bill</span>
                    </div>
                  ) : (
                    cart.map(c => (
                      <div key={c.id} className={`flex items-center justify-between text-xs p-2 rounded-lg border ${
                        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                      }`}>
                        <div className="flex-1 pr-2">
                          <h5 className={`font-bold line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.name}</h5>
                          <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {c.qty} × LKR {c.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            LKR {(c.qty * c.price).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(c.id)}
                            className={`p-1 cursor-pointer transition-colors ${
                              isDark ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-600'
                            }`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bill Totals & Print button */}
              <div className={`pt-4 border-t mt-4 space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>Subtotal:</span>
                  <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>LKR {cartTotal.toLocaleString()}</span>
                </div>
                <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span>RAMIS VAT Exemption (0%):</span>
                  <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>LKR 0</span>
                </div>
                <div className={`flex items-center justify-between text-base font-extrabold pt-2 border-t ${
                  isDark ? 'text-white border-slate-800/60' : 'text-slate-900 border-slate-200'
                }`}>
                  <span>Bill Total:</span>
                  <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>LKR {cartTotal.toLocaleString()}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className={`w-full mt-3 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    cart.length === 0
                      ? isDark 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-md shadow-blue-600/25 active:scale-[0.99]'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  <span>Process Payment & Print ESC/POS Bill</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
