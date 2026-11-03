import React from 'react';
import { PageView } from '../types';
import { RESTAURANT_INFO, createWhatsAppUrl } from '../data/menuData';
import { ArrowUpRight, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#050604] border-t border-[#d8ad53]/25 text-[#f6f0e4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          {/* Brand Info */}
          <div className="space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d8ad53] bg-[#141711] shrink-0 shadow-md">
                <img
                  src={getAssetUrl('logo.png')}
                  alt="Naija Pot Kitchen & Grill Ltd Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-[#f2d58a]">NAIJA POT</span>
                <span className="text-[10px] tracking-widest text-[#f6f0e4]/80 uppercase">
                  Kitchen & Grill Ltd
                </span>
              </div>
            </button>
            <p className="text-xs text-[#b9b4a8] leading-relaxed max-w-sm">
              {RESTAURANT_INFO.tagline}
            </p>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              Bringing authentic Nigerian home cooking, smokey grills and artisanal bakery treats to Bradville & Milton Keynes.
            </p>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-[#f2d58a] text-base font-semibold tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2 text-xs text-[#b9b4a8]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#d8ad53] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('story')}
                  className="hover:text-[#d8ad53] transition-colors cursor-pointer"
                >
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-[#d8ad53] transition-colors cursor-pointer"
                >
                  Full Nigerian Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('bakery')}
                  className="hover:text-[#d8ad53] transition-colors cursor-pointer"
                >
                  Bakery & Bread Rolls
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('specials')}
                  className="hover:text-[#d8ad53] transition-colors cursor-pointer"
                >
                  Specials & Catering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#d8ad53] transition-colors cursor-pointer"
                >
                  Contact & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="font-serif text-[#f2d58a] text-base font-semibold tracking-wide">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-xs text-[#b9b4a8]">
              <li className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-[#45a866] shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d8ad53] transition-colors"
                >
                  WhatsApp: {RESTAURANT_INFO.whatsappFormatted}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#d8ad53] shrink-0 mt-0.5" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#d8ad53] transition-colors">
                  Phone: {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d8ad53] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#d8ad53] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.openingHoursDisplay}</span>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href={RESTAURANT_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b9b4a8] hover:text-[#d8ad53] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a
                  href={RESTAURANT_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b9b4a8] hover:text-[#d8ad53] text-xs font-semibold"
                >
                  TikTok
                </a>
                <a
                  href={RESTAURANT_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b9b4a8] hover:text-[#d8ad53] text-xs font-semibold"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Order CTA */}
          <div className="space-y-4">
            <h3 className="font-serif text-[#f2d58a] text-base font-semibold tracking-wide">
              Place an Order
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              For today’s freshly made menu, availability, swallow pairings and fast collection/delivery, message our kitchen team directly.
            </p>
            <a
              href={createWhatsAppUrl("Hello Naija Pot, I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold px-5 py-3 tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8f8b81]">
          <span>
            © {currentYear} Naija Pot Kitchen & Grill Ltd. All rights reserved.
          </span>
          <span className="text-[#f2d58a]/70">
            Authentic Nigerian taste · A taste of home
          </span>
        </div>
      </div>
    </footer>
  );
};
