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
    try { localStorage.setItem('naija_pot_tray', JSON.stringify(cart)); } catch { /* ignore storage error */ }
  }, [cart]);

  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '').toLowerCase();
      if (rawHash === 'bakery' || rawHash === 'bakery-page' || rawHash === 'bakery-hub') {
        setCurrentPage('bakery');
        return;
      }
      if (rawHash === 'menu-bakery') {
        setCurrentPage('menu');
        setMenuInitialCategory('bakery');
        return;
      }
      if (['home', 'story', 'menu', 'bakery', 'specials', 'contact'].includes(rawHash)) {
        if (rawHash === 'menu') setMenuInitialCategory('all');
        setCurrentPage(rawHash as PageView);
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('popstate', handleHash);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const navigateTo = (page: PageView) => {
    if (page === 'menu') setMenuInitialCategory('all');
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMenuCategory = (category: MenuCategoryId) => {
    setMenuInitialCategory(category);
    setCurrentPage('menu');
    window.location.hash = category === 'bakery' ? 'menu-bakery' : `menu-${category}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: Omit<CartItem, 'cartId'>) => {
    setCart((previous) => {
      const existing = previous.find((cartItem) => cartItem.id === item.id && cartItem.customization === item.customization);
      if (existing) {
        return previous.map((cartItem) => cartItem.cartId === existing.cartId ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem);
      }
      return [...previous, { ...item, cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}` }];
    });
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((previous) => previous.filter((item) => item.cartId !== cartId));
      return;
    }
    setCart((previous) => previous.map((item) => item.cartId === cartId ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (cartId: string) => setCart((previous) => previous.filter((item) => item.cartId !== cartId));
  const handleClearCart = () => setCart([]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a08] text-[#f6f0e4]">
      <Header currentPage={currentPage} onNavigate={navigateTo} cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      <main className="flex-1">
        {currentPage === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentPage === 'story' && <StoryView onNavigate={navigateTo} />}
        {currentPage === 'menu' && <MenuView initialCategory={menuInitialCategory} onOpenSolidModal={setSolidModalDish} onAddToCart={handleAddToCart} onNavigate={navigateTo} />}
        {currentPage === 'bakery' && <BakeryView onAddToCart={handleAddToCart} onNavigateToMenuCategory={navigateToMenuCategory} onNavigate={navigateTo} />}
        {currentPage === 'specials' && <SpecialsView onNavigate={navigateTo} onAddToCart={handleAddToCart} />}
        {currentPage === 'contact' && <ContactView onNavigate={navigateTo} onOpenCart={() => setIsCartOpen(true)} />}
      </main>
      <Footer onNavigate={navigateTo} />
      <FloatingWhatsApp />
      <SolidDishModal dish={solidModalDish} onClose={() => setSolidModalDish(null)} onAddToCart={handleAddToCart} />
      <OrderCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} />
    </div>
  );
};
export default App;
