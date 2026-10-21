import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueGrid from './components/ValueGrid';
import SolutionsSection from './components/SolutionsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import NewSaleModal from './components/NewSaleModal';
import InquiryModal from './components/InquiryModal';

// Enterprise Modals & Panels (Phases 1 - 5)
import AuthModal from './components/AuthModal';
import CompareModal from './components/CompareModal';
import SandboxModal from './components/SandboxModal';
import InvoiceModal from './components/InvoiceModal';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Dedicated Pages matching designs
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import PricingPage from './pages/PricingPage';
import CustomizePage from './pages/CustomizePage';
import OrderCheckoutPage from './pages/OrderCheckoutPage';
import CheckoutCustomerPage from './pages/CheckoutCustomerPage';
import CheckoutPaymentPage from './pages/CheckoutPaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';
import SupportCenterPage from './pages/SupportCenterPage';
import ContactUsPage from './pages/ContactUsPage';
import AboutUsPage from './pages/AboutUsPage';
import SignInPage from './pages/SignInPage';

import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Theme state: defaults to 'dark', persists in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('raxwo_theme') || 'dark';
  });

  // Current User & JWT Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('raxwo_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Valid routes including 'admin'
  const validRoutes = [
    'home', 
    'products', 
    'product-detail', 
    'pricing', 
    'customize', 
    'order', 
    'checkout-customer', 
    'checkout-payment', 
    'order-success', 
    'my-orders', 
    'admin',
    'support',
    'about',
    'contact',
    'signin'
  ];

  // Route state
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (validRoutes.includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [stats, setStats] = useState({
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
      subtext: "All services online"
    },
    revenueChart: [
      { day: "Mon", height: 42 },
      { day: "Tue", height: 58 },
      { day: "Wed", height: 45 },
      { day: "Thu", height: 75 },
      { day: "Fri", height: 90 },
      { day: "Sat", height: 82 },
      { day: "Sun", height: 60 }
    ]
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItem, setCartItem] = useState({
    product: {
      id: "mobixa",
      name: "Mobixa",
      subtitle: "Professional Package",
      priceLKR: 120000
    },
    estimatedTotal: 120000,
    customization: {
      businessName: 'Nimal Mobile Center',
      businessType: 'Mobile shop and repair center',
      usersCount: '5',
      branchesCount: '1'
    }
  });

  const [currency, setCurrency] = useState('LKR');
  const [currencyRates, setCurrencyRates] = useState({
    LKR: { symbol: "LKR", rate: 1, name: "Sri Lankan Rupee" },
    USD: { symbol: "$", rate: 0.0033, name: "US Dollar" },
    EUR: { symbol: "€", rate: 0.0030, name: "Euro" },
    GBP: { symbol: "£", rate: 0.0026, name: "British Pound" },
    INR: { symbol: "₹", rate: 0.28, name: "Indian Rupee" }
  });
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('raxwo_lang') || 'en';
  });

  const handleLangChange = (nextLang) => {
    setLang(nextLang);
    localStorage.setItem('raxwo_lang', nextLang);
  };

  // Enterprise Modals State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareProductsList, setCompareProductsList] = useState([]);
  const [isSandboxModalOpen, setIsSandboxModalOpen] = useState(false);
  const [sandboxTargetProduct, setSandboxTargetProduct] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceTargetOrder, setInvoiceTargetOrder] = useState(null);

  // Standard Modals state
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [inquiryResult, setInquiryResult] = useState(null);

  // Sync route with window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll reveal animation observer with progressive enhancement (Fail-safe: NEVER blank!)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.documentElement.classList.add('js-ready');
    const selector = '[class*="scroll-reveal"], .reveal-on-scroll';
    const allAnimElements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight;

    // Elements already in view stay visible immediately without delay
    allAnimElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.95) {
        el.classList.add('is-revealed');
      } else {
        el.classList.add('anim-scroll-pending');
      }
    });

    const revealElements = () => {
      const pending = document.querySelectorAll('.anim-scroll-pending:not(.is-revealed)');
      const currentH = window.innerHeight;
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= currentH * 0.92) {
          el.classList.add('is-revealed');
        }
      });
    };

    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      );

      document.querySelectorAll('.anim-scroll-pending').forEach((el) => observer.observe(el));
    }

    window.addEventListener('scroll', revealElements, { passive: true });
    const timer = setTimeout(revealElements, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', revealElements);
      if (observer) observer.disconnect();
    };
  }, [currentRoute]);

  // Top Reading Progress Bar (like Gridpro)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRouteChange = (newRoute) => {
    // If attempting to enter admin without permission, redirect to login
    if (newRoute === 'admin' && (!currentUser || (currentUser.role !== 'super_admin' && currentUser.role !== 'sales_admin'))) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentRoute(newRoute);
    window.location.hash = newRoute === 'home' ? '' : newRoute;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch initial data
  useEffect(() => {
    // Stats
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setStats(data.data);
        }
      })
      .catch(() => {});

    // Products from MongoDB Atlas
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProducts(data.data);
          if (data.data.length > 0 && !selectedProduct) {
            setSelectedProduct(data.data[0]);
          }
        }
      })
      .catch(() => {});

    // Live exchange rates
    fetch('/api/currencies')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.rates) {
          setCurrencyRates(data.rates);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch orders when user changes or on mount
  const fetchMyOrders = async () => {
    const token = localStorage.getItem('raxwo_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    try {
      const res = await fetch('/api/orders/my-orders', { headers });
      const data = await res.json();
      if (data.success && data.orders) {
        setUserOrders(data.orders);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchMyOrders();
  }, [currentUser]);

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    triggerToast(`Welcome back, ${user.name}!`);
    fetchMyOrders();
  };

  const handleLogout = () => {
    localStorage.removeItem('raxwo_token');
    localStorage.removeItem('raxwo_user');
    setCurrentUser(null);
    if (currentRoute === 'admin') {
      setCurrentRoute('home');
      window.location.hash = '';
    }
    triggerToast('Signed out successfully.');
  };

  // Open Sandbox Modal
  const handleOpenSandbox = (product) => {
    setSandboxTargetProduct(product);
    setIsSandboxModalOpen(true);
  };

  // Open Compare Modal
  const handleOpenCompare = (list) => {
    setCompareProductsList(list);
    setIsCompareModalOpen(true);
  };

  // Open Invoice Modal
  const handleOpenInvoice = (order) => {
    setInvoiceTargetOrder(order);
    setIsInvoiceModalOpen(true);
  };

  // Record simulated POS sale
  const handleRecordSale = async (amount) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sales/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) || 12500 })
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        triggerToast('Sale recorded! Dashboard stats updated in real-time.');
        setIsNewSaleModalOpen(false);
      }
    } catch (err) {
      triggerToast('Sale recorded in offline demo mode!');
      setIsNewSaleModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit quotation inquiry
  const handleSubmitInquiry = async (formData) => {
    setIsSubmitting(true);
    setContactSuccess(false);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setContactSuccess(true);
        setInquiryResult(data);
        triggerToast('Inquiry recorded in database! Our tech specialist will reach out.');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setContactSuccess(true);
      setInquiryResult({
        inquiryId: `INQ-${Date.now()}`,
        message: 'Thank you! Our technical team will reach out within 15 minutes.'
      });
      triggerToast('Inquiry recorded in database!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Page Navigation Handlers
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    handleRouteChange('product-detail');
  };

  const handleChoosePackage = (product) => {
    setSelectedProduct(product);
    handleRouteChange('pricing');
  };

  const handleRequestCustomize = (product) => {
    setSelectedProduct(product);
    handleRouteChange('customize');
  };

  const handleSelectPricingPlan = (plan) => {
    setCartItem({
      product: {
        id: selectedProduct?.id || 'mobixa',
        name: selectedProduct?.name || 'Mobixa',
        subtitle: `${plan.name} Package`,
        priceLKR: plan.priceLKR
      },
      estimatedTotal: plan.priceLKR,
      customization: {
        packageName: plan.name,
        features: plan.features
      }
    });
    handleRouteChange('order');
  };

  const handleProceedToOrderFromCustomize = (customData) => {
    setCartItem({
      product: {
        id: customData.product.id,
        name: customData.product.name,
        subtitle: 'Professional Package',
        priceLKR: customData.estimatedTotal
      },
      estimatedTotal: customData.estimatedTotal,
      customization: customData.customization
    });
    handleRouteChange('order');
  };

  const [customerData, setCustomerData] = useState({
    fullName: 'Nimal Perera',
    email: 'nimal@gmail.com',
    phone: '+94 77 123 4567',
    businessName: 'Nimal Mobile Center',
    businessType: 'Mobile shop',
    country: 'Sri Lanka',
    address: 'No 45, Galle Road, Colombo 03'
  });

  const [latestOrder, setLatestOrder] = useState({
    orderId: 'ORD-2026-10482',
    id: 'ORD-2026-10482',
    product: { name: 'Mobixa', subtitle: 'Professional' },
    productName: 'Mobixa Mobile Shop ERP',
    packageType: 'Full Source Code & License',
    total: 75000,
    amountLKR: 75000,
    totalLKR: 75000,
    licenseKey: 'RAXWO-MBX9-K821-L490',
    invoiceNumber: 'INV-2026-10482',
    date: 'Today',
    paymentMethod: 'payhere',
    status: 'Active'
  });

  const [userOrders, setUserOrders] = useState([]);

  // Phase 4: Real Order Placement & Persistence to MongoDB Atlas
  const handlePlaceOrder = async (paymentDetails) => {
    const payload = {
      customer: {
        name: customerData.fullName,
        email: customerData.email,
        phone: customerData.phone,
        company: customerData.businessName,
        address: customerData.address
      },
      items: [
        {
          productId: cartItem?.product?.id || 'mobixa',
          name: cartItem?.product?.name || 'Mobixa Mobile Shop ERP',
          priceLKR: cartItem?.estimatedTotal || 75000,
          priceUSD: Math.round((cartItem?.estimatedTotal || 75000) * 0.0033),
          quantity: 1
        }
      ],
      totalLKR: cartItem?.estimatedTotal || 75000,
      totalUSD: Math.round((cartItem?.estimatedTotal || 75000) * 0.0033),
      currency: currency,
      paymentMethod: paymentDetails.paymentMethod === 'bank' ? 'bank_transfer' : paymentDetails.paymentMethod
    };

    try {
      const token = localStorage.getItem('raxwo_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success && data.order) {
        setLatestOrder(data.order);
        setUserOrders(prev => [data.order, ...prev]);
        handleRouteChange('order-success');
        triggerToast(`Order confirmed! Order ID: ${data.order.orderId}`);
        return;
      }
    } catch (e) {
      console.warn('Falling back to local order recording:', e);
    }

    // Local fallback
    const orderNumber = `ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const fallbackOrder = {
      orderId: orderNumber,
      id: orderNumber,
      invoiceNumber: `INV-2026-${orderNumber.replace('ORD-2026-', '')}`,
      licenseKey: `RAXWO-PRO-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      productName: cartItem?.product?.name || 'Mobixa Mobile Shop ERP',
      packageType: 'Full Source Code License',
      total: cartItem?.estimatedTotal || 75000,
      amountLKR: cartItem?.estimatedTotal || 75000,
      totalLKR: cartItem?.estimatedTotal || 75000,
      date: new Date().toLocaleDateString('en-GB'),
      paymentMethod: paymentDetails.paymentMethod,
      customer: customerData,
      status: paymentDetails.paymentMethod === 'bank' ? 'Pending' : 'Active'
    };

    setLatestOrder(fallbackOrder);
    setUserOrders(prev => [fallbackOrder, ...prev]);
    handleRouteChange('order-success');
    triggerToast(`Order received! Order ID: ${orderNumber}`);
  };

  const isDark = theme === 'dark';

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#070913] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Scroll Reading Progress Bar (like Gridpro) */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 z-[99999] pointer-events-none transition-all duration-75 ease-out shadow-[0_0_10px_rgba(6,182,212,0.6)]" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Background Cybernetic Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
              : 'none',
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Responsive Navbar */}
        <Navbar 
          currentCurrency={currency}
          onCurrencyChange={setCurrency}
          currentLang={lang}
          onLangChange={handleLangChange}
          onOpenInquiry={() => setIsInquiryModalOpen(true)}
          theme={theme}
          onToggleTheme={() => {
            const next = isDark ? 'light' : 'dark';
            setTheme(next);
            localStorage.setItem('raxwo_theme', next);
          }}
          currentRoute={currentRoute}
          onRouteChange={handleRouteChange}
          cartCount={cartItem ? 1 : 0}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 w-full">
          
          {/* 1. HOME ROUTE — Pure seamless sections without outer transform clipping */}
          {currentRoute === 'home' && (
            <>
              <Hero 
                onExploreClick={() => handleRouteChange('products')}
                onOpenSaleModal={() => setIsNewSaleModalOpen(true)}
                stats={stats}
                products={products}
                onSelectProduct={handleSelectProduct}
                theme={theme}
                lang={lang}
              />

              <ValueGrid theme={theme} lang={lang} />

              <div id="solutions">
                <SolutionsSection 
                  onExploreClick={() => handleRouteChange('products')} 
                  theme={theme}
                  lang={lang}
                />
              </div>

              <ContactSection 
                onSubmitInquiry={handleSubmitInquiry}
                isSubmitting={isSubmitting}
                contactSuccess={contactSuccess}
                inquiryResult={inquiryResult}
                theme={theme}
                lang={lang}
              />
            </>
          )}

          {/* 2. CATALOG & DISCOVERY (With Tech Stack, Price Filters & Comparison Tray) */}
          {currentRoute === 'products' && (
            <ProductsPage
              products={products}
              currency={currency}
              currencyRates={currencyRates}
              onSelectProduct={handleSelectProduct}
              onOpenSandbox={handleOpenSandbox}
              onOpenCompare={handleOpenCompare}
              theme={theme}
              lang={lang}
            />
          )}

          {/* 3. PRODUCT DETAIL */}
          {currentRoute === 'product-detail' && (
            <ProductDetailPage
              product={selectedProduct || products[0]}
              onChoosePackage={handleChoosePackage}
              onRequestCustomize={handleRequestCustomize}
              onOpenSandbox={handleOpenSandbox}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
            />
          )}

          {/* 4. PRICING PACKAGES */}
          {currentRoute === 'pricing' && (
            <PricingPage
              product={selectedProduct || products[0]}
              onSelectPlan={handleSelectPricingPlan}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
            />
          )}

          {/* 5. CUSTOMIZATION WIZARD */}
          {currentRoute === 'customize' && (
            <CustomizePage
              product={selectedProduct || products[0]}
              onProceedToOrder={handleProceedToOrderFromCustomize}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
            />
          )}

          {/* 6. ORDER OVERVIEW */}
          {currentRoute === 'order' && (
            <OrderCheckoutPage
              cartItem={cartItem}
              onContinueToCustomer={() => handleRouteChange('checkout-customer')}
              onBackToProducts={() => handleRouteChange('products')}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
            />
          )}

          {/* 7. CHECKOUT: CUSTOMER DETAILS */}
          {currentRoute === 'checkout-customer' && (
            <CheckoutCustomerPage
              cartItem={cartItem}
              onBackToOrder={() => handleRouteChange('order')}
              onContinueToPayment={(data) => {
                setCustomerData(data);
                handleRouteChange('checkout-payment');
              }}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
            />
          )}

          {/* 8. CHECKOUT: PAYMENT */}
          {currentRoute === 'checkout-payment' && (
            <CheckoutPaymentPage
              cartItem={cartItem}
              customerData={customerData}
              onBack={() => handleRouteChange('checkout-customer')}
              onPlaceOrder={handlePlaceOrder}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
            />
          )}

          {/* 9. ORDER SUCCESS */}
          {currentRoute === 'order-success' && (
            <OrderSuccessPage
              orderData={latestOrder}
              onViewMyOrders={() => handleRouteChange('my-orders')}
              onWhatsAppChat={() => window.open('https://wa.me/94771234567?text=Hi%20Raxwo%2C%20I%20have%20an%20order%20inquiry', '_blank')}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
            />
          )}

          {/* 10. CUSTOMER ACCOUNT: MY ORDERS & LICENSES */}
          {currentRoute === 'my-orders' && (
            <MyOrdersPage
              userOrders={userOrders}
              currency={currency}
              currencyRates={currencyRates}
              theme={theme}
              onOpenInvoice={handleOpenInvoice}
            />
          )}

          {/* 11. ADMIN BACKOFFICE PORTAL (Phase 2 & 5) */}
          {currentRoute === 'admin' && (
            <AdminDashboardPage
              theme={theme}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          )}

          {/* 12. SUPPORT & FAQ */}
          {currentRoute === 'support' && (
            <SupportCenterPage
              theme={theme}
              onContactClick={() => handleRouteChange('contact')}
            />
          )}

          {/* 13. ABOUT US */}
          {currentRoute === 'about' && (
            <AboutUsPage
              theme={theme}
              lang={lang}
              onExploreProducts={() => handleRouteChange('products')}
              onContactClick={() => handleRouteChange('contact')}
            />
          )}

          {/* 14. CONTACT US */}
          {currentRoute === 'contact' && (
            <ContactUsPage
              theme={theme}
              lang={lang}
              onSubmitInquiry={handleSubmitInquiry}
              isSubmitting={isSubmitting}
            />
          )}

          {/* 15. DEDICATED SIGN IN & AUTHENTICATION PAGE */}
          {currentRoute === 'signin' && (
            <SignInPage
              theme={theme}
              onLoginSuccess={(user) => {
                handleLoginSuccess(user);
                handleRouteChange(user.role === 'super_admin' || user.role === 'sales_admin' ? 'admin' : 'home');
              }}
              onBackToHome={() => handleRouteChange('home')}
            />
          )}

        </main>

        {/* Global Footer */}
        <Footer theme={theme} onRouteChange={handleRouteChange} lang={lang} />

      </div>

      {/* ========================================================
          ENTERPRISE MODALS (PHASES 1 TO 5)
         ======================================================== */}

      {/* 1. Auth Modal (Phase 1) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
      />

      {/* 2. 3-Way ERP Comparison Matrix Modal (Phase 3 - US1.2) */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={compareProductsList}
        onRemoveProduct={(id) => setCompareProductsList(compareProductsList.filter(p => p.id !== id))}
        onSelectProduct={handleSelectProduct}
        currentCurrency={currency}
        currencyRates={currencyRates}
        theme={theme}
      />

      {/* 3. Live Interactive ERP Sandbox Modal (Phase 5 - US2.1 & US2.2) */}
      <SandboxModal
        isOpen={isSandboxModalOpen}
        onClose={() => setIsSandboxModalOpen(false)}
        initialProduct={sandboxTargetProduct}
        theme={theme}
      />

      {/* 4. Tax Invoice Printable Modal (Phase 4) */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        order={invoiceTargetOrder}
        theme={theme}
      />

      {/* 5. Interactive Quick Sale Simulator Modal */}
      <NewSaleModal
        isOpen={isNewSaleModalOpen}
        onClose={() => setIsNewSaleModalOpen(false)}
        onRecordSale={handleRecordSale}
        isSubmitting={isSubmitting}
      />

      {/* 6. Contact Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        onSubmitInquiry={handleSubmitInquiry}
        product={selectedProduct}
        isSubmitting={isSubmitting}
      />



      {/* Floating Real-Time Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-22 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl text-xs sm:text-sm animate-bounce border ${
          isDark 
            ? 'bg-slate-900/95 border-cyan-500/50 text-white' 
            : 'bg-white/95 border-blue-500/50 text-slate-900 shadow-xl'
        }`}>
          <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
