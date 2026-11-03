import React, { useState } from 'react';
import { PageView } from '../types';
import { createWhatsAppUrl } from '../data/menuData';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Our Story', page: 'story' },
    { label: 'Full Menu', page: 'menu' },
    { label: 'Bakery', page: 'bakery' },
    { label: 'Our Specials', page: 'specials' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#19834b] text-white text-center py-2 px-3 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <span>Authentic Nigerian flavour. Made with love.</span>
        <span className="text-[#f2d58a]">·</span>
        <span>Order fresh today</span>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#090a08]/95 backdrop-blur-md border-b border-[#d8ad53]/20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="Naija Pot Home"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#d8ad53] bg-[#141711] shrink-0 transition-transform group-hover:scale-105 shadow-md">
              <img
                src="./logo.png"
                alt="Naija Pot Kitchen & Grill Ltd Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-[#f2d58a] leading-tight">
                NAIJA POT
              </span>
              <span className="text-[10px] tracking-widest text-[#f6f0e4]/80 uppercase mt-0.5">
                Kitchen & Grill Ltd
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-[#e9e3d8]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`transition-colors py-2 relative cursor-pointer ${
                    isActive ? 'text-[#d8ad53]' : 'hover:text-[#d8ad53]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d8ad53] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Cart Tray & WhatsApp Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart / Order Tray Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-3 sm:py-2 rounded-md bg-[#191d15] border border-[#d8ad53]/30 hover:border-[#d8ad53] text-[#f2d58a] transition-all flex items-center gap-2 cursor-pointer"
              title="View your order tray"
              aria-label="View order tray"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-[#f6f0e4]">
                Tray
              </span>
              {cartCount > 0 && (
                <span className="bg-[#19834b] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              href={createWhatsAppUrl("Hello Naija Pot, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold px-4 py-2.5 tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
            >
              <span>Order on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#d8ad53] hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0e0b] border-b border-[#d8ad53]/25 px-6 py-5 space-y-3 animate-rise">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`w-full text-left py-2.5 text-sm font-semibold tracking-wider uppercase border-b border-white/5 transition-colors cursor-pointer ${
                    isActive ? 'text-[#d8ad53] font-bold' : 'text-[#f6f0e4]/90 hover:text-[#d8ad53]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <a
              href={createWhatsAppUrl("Hello Naija Pot, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold py-3 mt-4 tracking-wider uppercase transition-all"
            >
              <span>Order on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>
    </>
  );
};
