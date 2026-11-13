import React, { useState, useEffect } from 'react';
import { PageView, Dish, CartItem, MenuCategoryId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SolidDishModal } from './components/SolidDishModal';
import { OrderCartModal } from './components/OrderCartModal';
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { BakeryView } from './views/BakeryView';
import { SpecialsView } from './views/SpecialsView';
import { StoryView } from './views/StoryView';
import { ContactView } from './views/ContactView';
import { EventCaterersView } from './views/EventCaterersView';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [menuInitialCategory, setMenuInitialCategory] = useState<MenuCategoryId | undefined>(undefined);
  const [solidModalDish, setSolidModalDish] = useState<Dish | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('naija_pot_tray');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('naija_pot_tray', JSON.stringify(cart));
    } catch {
      // Ignore storage errors (for example, private browsing restrictions).
    }
  }, [cart]);

  // Scroll to the top and sync page-level SEO metadata (title, description, canonical, og:url)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const SEO_META: Record<PageView, { title: string; description: string; path: string }> = {
      home: {
        title: 'Naija Pot Kitchen & Grill Ltd | Nigerian Food in Milton Keynes',
        description:
          'Authentic Nigerian cuisine, soups, party jollof, charcoal grills, bakery treats and event catering in Milton Keynes. Order fresh today on WhatsApp.',
        path: '/',
      },
      story: {
        title: 'Our Story & Heritage | Naija Pot Kitchen & Grill Ltd',
        description:
          'Discover the story behind Naija Pot Kitchen & Grill Ltd — bringing authentic Nigerian home cooking and warm hospitality to Bradville, Milton Keynes.',
        path: '/story/',
      },
      menu: {
        title: 'Full Menu | Naija Pot Kitchen & Grill Ltd',
        description:
          'Explore our full Nigerian menu: The Grill Hub, party jollof rice, traditional soups & swallows, platters, small chops, bakery and drinks.',
        path: '/menu/',
      },
      bakery: {
        title: 'Artisanal Nigerian Bakery | Naija Pot Kitchen & Grill Ltd',
        description:
          'Freshly baked Nigerian meat pies and golden puff puff made daily for collection and pre-order in Milton Keynes.',
        path: '/bakery/',
      },
      specials: {
        title: 'Our Specials & Food Truck | Naija Pot Kitchen & Grill Ltd',
        description:
          'Discover our signature platters, weekend specials, and mobile Nigerian events food truck serving Milton Keynes and UK events.',
        path: '/specials/',
      },
      'event-caterers': {
        title: 'Event Caterers & Banquet Services | Naija Pot Kitchen & Grill Ltd',
        description:
          'Professional Nigerian event catering for weddings, corporate events, private parties and funerals in Milton Keynes and across the UK.',
        path: '/event-caterers/',
      },
      contact: {
        title: 'Contact & Orders | Naija Pot Kitchen & Grill Ltd',
        description:
          'Visit 22 Eston Court, Bradville, Milton Keynes or order fresh Nigerian cuisine directly via WhatsApp. Open daily 9am – 11pm.',
        path: '/contact/',
      },
    };

    const meta = SEO_META[currentPage] || SEO_META.home;
    document.title = meta.title;

    const origin =
      typeof window !== 'undefined' && window.location.origin.startsWith('http')
        ? window.location.origin
        : 'https://naijapotkitchengrill.co.uk';
    const isGhPages = typeof window !== 'undefined' && window.location.pathname.startsWith('/FFO-9ja');
    const canonicalUrl = isGhPages
      ? `https://naijapotkitchengrill.co.uk${meta.path}`
      : `${origin}${meta.path}`;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalUrl);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('href', canonicalUrl);
  }, [currentPage]);

  useEffect(() => {
    const handleRoute = () => {
      const pathname = window.location.pathname.toLowerCase().replace(/^\/|\/$/g, '');
      const rawHash = window.location.hash.replace('#', '').toLowerCase();

      if (
        pathname === 'event-caterers' ||
        pathname.endsWith('/event-caterers') ||
        rawHash === 'event-caterers' ||
        rawHash === 'catering' ||
        rawHash === 'event-catering'
      ) {
        setCurrentPage('event-caterers');
        return;
      }
      if (rawHash === 'bakery' || rawHash === 'bakery-page' || rawHash === 'bakery-hub' || pathname === 'bakery') {
        setCurrentPage('bakery');
        return;
      }
      if (rawHash === 'menu-bakery') {
        setCurrentPage('menu');
        setMenuInitialCategory('bakery');
        return;
      }
      if (['home', 'story', 'menu', 'bakery', 'specials', 'contact', 'event-caterers'].includes(rawHash)) {
        if (rawHash === 'menu') setMenuInitialCategory('all');
        setCurrentPage(rawHash as PageView);
        return;
      }
      if (['home', 'story', 'menu', 'bakery', 'specials', 'contact', 'event-caterers'].includes(pathname)) {
        if (pathname === 'menu') setMenuInitialCategory('all');
        setCurrentPage(pathname as PageView);
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, []);

  const navigateTo = (page: PageView) => {
    if (page === 'menu') setMenuInitialCategory('all');
    setCurrentPage(page);
    window.location.hash = page;
  };

  const navigateToMenuCategory = (category: MenuCategoryId) => {
    // The Bakery page's “View full menu” CTA should open the full menu, not
    // filter it down to the Bakery category.
    const targetCategory = category === 'bakery' ? 'all' : category;
    setMenuInitialCategory(targetCategory);
    setCurrentPage('menu');
    window.location.hash = targetCategory === 'all' ? 'menu' : `menu-${targetCategory}`;
  };

  const handleAddToCart = (item: Omit<CartItem, 'cartId'>) => {
    setCart((previous) => {
      const existing = previous.find(
        (cartItem) => cartItem.id === item.id && cartItem.customization === item.customization
      );
      if (existing) {
        return previous.map((cartItem) =>
          cartItem.cartId === existing.cartId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [
        ...previous,
        { ...item, cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` },
      ];
    });
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((previous) => previous.filter((item) => item.cartId !== cartId));
      return;
    }
    setCart((previous) =>
      previous.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((previous) => previous.filter((item) => item.cartId !== cartId));
  };
  const handleClearCart = () => setCart([]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a08] text-[#f6f0e4]">
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main className="flex-1">
        {currentPage === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentPage === 'story' && <StoryView onNavigate={navigateTo} />}
        {currentPage === 'menu' && (
          <MenuView
            initialCategory={menuInitialCategory}
            onOpenSolidModal={setSolidModalDish}
            onAddToCart={handleAddToCart}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'bakery' && (
          <BakeryView
            onAddToCart={handleAddToCart}
            onNavigateToMenuCategory={navigateToMenuCategory}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'specials' && <SpecialsView onNavigate={navigateTo} onAddToCart={handleAddToCart} />}
        {currentPage === 'event-caterers' && <EventCaterersView onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactView onNavigate={navigateTo} onOpenCart={() => setIsCartOpen(true)} />}
      </main>
      <Footer onNavigate={navigateTo} />
      <FloatingWhatsApp />
      <SolidDishModal dish={solidModalDish} onClose={() => setSolidModalDish(null)} onAddToCart={handleAddToCart} />
      <OrderCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};
export default App;
