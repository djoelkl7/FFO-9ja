import React, { useState, useEffect } from 'react';
import { PageView, Dish, CartItem } from './types';
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
  const [solidModalDish, setSolidModalDish] = useState<Dish | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart from localStorage if available
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
      // ignore storage error
    }
  }, [cart]);

  // Sync hash routing on load & popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'story', 'menu', 'bakery', 'specials', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageView);
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const handleAddToCart = (item: Omit<CartItem, 'cartId'>) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.customization === item.customization
      );
      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      const newCartItem: CartItem = {
        ...item,
        cartId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      };
      return [...prev, newCartItem];
    });
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a08] text-[#f6f0e4]">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentPage === 'story' && <StoryView onNavigate={navigateTo} />}
        {currentPage === 'menu' && (
          <MenuView
            onOpenSolidModal={(dish) => setSolidModalDish(dish)}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentPage === 'bakery' && <BakeryView onAddToCart={handleAddToCart} />}
        {currentPage === 'specials' && <SpecialsView onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactView onNavigate={navigateTo} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Persistent Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Interactive Swallow / Solid Dish Customizer Modal */}
      <SolidDishModal
        dish={solidModalDish}
        onClose={() => setSolidModalDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart / Order Tray Modal */}
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
