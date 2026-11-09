import React, { useState } from 'react';
import { PageView } from '../types';
import { RESTAURANT_INFO, createWhatsAppUrl } from '../data/menuData';
import { Phone, MessageSquare, MapPin, Clock, Send, ArrowRight, ArrowUpRight, ShoppingBag, Utensils, Flame, Heart, Truck, Calendar } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

interface ContactViewProps {
  onNavigate: (page: PageView) => void;
  onOpenCart?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenCart }) => {
  const [inquirerName, setInquirerName] = useState('');
  const [topic, setTopic] = useState('Order For Today');
  const [userMessage, setUserMessage] = useState('');

  const generateContactWhatsAppMessage = () => {
    let msg = `Hello Naija Pot Kitchen & Grill Ltd,\n\n`;
    if (inquirerName.trim()) {
      msg += `My name is ${inquirerName.trim()}.\n`;
    }
    msg += `Topic: ${topic}\n`;
    if (userMessage.trim()) {
      msg += `Message: ${userMessage.trim()}\n`;
    } else {
      msg += `I'd like to make an enquiry regarding your menu, availability and collection.\n`;
    }
    return msg;
  };

  return (
    <div className="space-y-0">
      {/* Page Hero */}
      <section
        className="relative h-96 sm:h-[440px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${getAssetUrl('assets/images/uploads/Small-chops-platterJ-450x450.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
              WE’D LOVE TO HEAR FROM YOU
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Say hello to
              <br />
              <em className="text-[#f2d58a] italic not-italic">Naija Pot.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed">
              Questions about our menu, today’s fresh soups, prices or an order? Our team is just a call or message away.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase mb-2">
                GET IN TOUCH
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4]">
                Let’s talk <em className="text-[#f2d58a] italic not-italic">food.</em>
              </h2>
              <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed mt-2">
                Message us for the latest menu, prices, availability and ordering information.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {/* WhatsApp */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#20c76a]/15 text-[#20c76a] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    WHATSAPP ORDERING & ENQUIRIES
                  </span>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-[#f2d58a] hover:underline"
                  >
                    {RESTAURANT_INFO.whatsappFormatted} ↗
                  </a>
                  <p className="text-[11px] text-[#b9b4a8] mt-0.5">
                    Fast response for daily orders, swallow pairs and inquiries.
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#d8ad53]/15 text-[#d8ad53] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    DIRECT TELEPHONE
                  </span>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-sm sm:text-base font-bold text-[#f2d58a] hover:underline"
                  >
                    {RESTAURANT_INFO.phone} ↗
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 text-[#f2d58a] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    KITCHEN ADDRESS
                  </span>
                  <p className="text-sm font-semibold text-[#f6f0e4]">{RESTAURANT_INFO.address}</p>
                  <p className="text-[11px] text-[#b9b4a8] mt-0.5">
                    Bradville, Milton Keynes, Buckinghamshire
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 text-[#f2d58a] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    OPENING HOURS
                  </span>
                  <p className="text-sm font-bold text-[#f2d58a]">
                    {RESTAURANT_INFO.openingHoursDisplay}
                  </p>
                  <div className="text-[11px] text-[#b9b4a8] space-y-0.5 pt-1">
                    {RESTAURANT_INFO.detailedHours.map((h, i) => (
                      <p key={i}>
                        <strong className="text-white">{h.days}:</strong> {h.hours}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Channels with Official Logos */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                  FOLLOW OUR SOCIAL MEDIA HANDLES
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Instagram */}
                  <a
                    href={RESTAURANT_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#1a1f15] hover:bg-[#252c1e] border border-[#d8ad53]/30 hover:border-[#d8ad53] text-[#f2d58a] hover:text-white transition-all text-xs font-semibold group shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center text-white shrink-0 shadow">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span>@naijapotkitchen_grill_mk</span>
                  </a>

                  {/* TikTok */}
                  <a
                    href={RESTAURANT_INFO.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#1a1f15] hover:bg-[#252c1e] border border-[#d8ad53]/30 hover:border-[#20c76a] text-[#f2d58a] hover:text-white transition-all text-xs font-semibold group shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center text-white shrink-0 shadow">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.87-4.49V8.6a8.27 8.27 0 0 0 4.84 1.55v-3.46h-.94z"/>
                      </svg>
                    </div>
                    <span>TikTok</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={RESTAURANT_INFO.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#1a1f15] hover:bg-[#252c1e] border border-[#d8ad53]/30 hover:border-[#1877f2] text-[#f2d58a] hover:text-white transition-all text-xs font-semibold group shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#1877f2] flex items-center justify-center text-white shrink-0 shadow">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Card */}
          <div className="lg:col-span-5 bg-[#14170f] border border-[#d8ad53]/35 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-1">
                START A CONVERSATION
              </p>
              <h3 className="font-serif text-2xl font-normal text-[#f6f0e4]">
                Order or Make an Enquiry
              </h3>
              <p className="text-xs text-[#b9b4a8] leading-relaxed mt-2">
                Fill in your details to launch WhatsApp with a pre-filled enquiry directly to our team.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bukola"
                  value={inquirerName}
                  onChange={(e) => setInquirerName(e.target.value)}
                  className="w-full bg-[#1b2017] border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block mb-1">
                  Subject / Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#1b2017] border border-white/10 rounded-lg p-3 text-white focus:border-[#d8ad53] focus:outline-none"
                >
                  <option value="Order For Today">Order For Today</option>
                  <option value="Swallow & Soup Pairing Enquiry">Swallow & Soup Pairing Enquiry</option>
                  <option value="Bakery & Pastries Order">Bakery & Pastries Order</option>
                  <option value="Wedding & Event Catering Quote">Wedding & Event Catering Quote</option>
                  <option value="Party Catering & Sharing Trays">Party Catering & Sharing Trays</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block mb-1">
                  Message / Dishes You Need
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. Please let me know what soups are fresh today and if amala is available for pick-up at 6pm."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="w-full bg-[#1b2017] border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none resize-none"
                />
              </div>

              <a
                href={createWhatsAppUrl(generateContactWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Message us on WhatsApp</span>
              </a>

              <p className="text-[11px] text-[#b9b4a8]/70 text-center">
                Please confirm your collection or local delivery details directly with the team.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation to All App Features */}
        <div className="mt-16 bg-[#14170f] border border-[#d8ad53]/35 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.24em] text-[#45a866] uppercase mb-1">
                NAVIGATE NAIJA POT
              </p>
              <h3 className="font-serif text-2xl font-normal text-[#f6f0e4]">
                Explore Every Kitchen Feature
              </h3>
            </div>
            <span className="text-[11px] text-[#b9b4a8] max-w-sm">
              Quick access to our food menu, artisan bakery, charcoal platters, story, and order tray.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Full Menu */}
            <button
              onClick={() => {
                onNavigate('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#d8ad53]/60 rounded-xl text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-[#d8ad53]/15 text-[#d8ad53] flex items-center justify-center mb-3">
                <Utensils className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#f2d58a] flex items-center justify-between">
                <span>Full Food Menu</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Charcoal grills, swallows &amp; soups, party jollof, snacks and cold drinks.
              </p>
            </button>

            {/* 2. Bakery Hub */}
            <button
              onClick={() => {
                onNavigate('bakery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#19834b]/60 rounded-xl text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-[#19834b]/20 text-[#20c76a] flex items-center justify-center mb-3">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#20c76a] flex items-center justify-between">
                <span>Bakery Collection</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Golden savoury meat pies and sweet pillowy puff puff made fresh.
              </p>
            </button>

            {/* 3. Specials & Sharing Platters */}
            <button
              onClick={() => {
                onNavigate('specials');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-orange-500/60 rounded-xl text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center mb-3">
                <Flame className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-orange-300 flex items-center justify-between">
                <span>Specials &amp; Platters</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Suya sharing platters, hot spicy asun goat, mixed grills &amp; small chops.
              </p>
            </button>

            {/* 4. Heritage & Story */}
            <button
              onClick={() => {
                onNavigate('story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#f2d58a]/60 rounded-xl text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-[#d8ad53]/15 text-[#f2d58a] flex items-center justify-center mb-3">
                <Heart className="w-4 h-4 text-red-400" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#f2d58a] flex items-center justify-between">
                <span>Our Story &amp; Heritage</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Rooted in authentic Nigerian culinary traditions right in Milton Keynes.
              </p>
            </button>

            {/* Event Caterers */}
            <button
              onClick={() => {
                onNavigate('event-caterers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#d8ad53]/60 rounded-xl text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-[#d8ad53]/15 text-[#f2d58a] flex items-center justify-center mb-3">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#f2d58a] flex items-center justify-between">
                <span>Event Caterers</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Bespoke wedding feasts, corporate events, private parties &amp; equipment hire.
              </p>
            </button>

            {/* 5. Order Tray / Cart */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#20c76a]/60 rounded-xl text-left transition-all group cursor-pointer shadow-md"
              >
                <div className="w-9 h-9 rounded-lg bg-[#20c76a]/20 text-[#20c76a] flex items-center justify-center mb-3">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#20c76a] flex items-center justify-between">
                  <span>Your Order Tray</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-[11px] text-[#b9b4a8] mt-1">
                  View your chosen dishes, customize portions and send order via WhatsApp.
                </p>
              </button>
            )}

            {/* 6. Food Truck & Mobile Events */}
            <a
              href={createWhatsAppUrl("Hello Naija Pot, I'd like to ask about hiring your Food Truck for an event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#20c76a]/60 rounded-xl text-left transition-all group cursor-pointer shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-[#20c76a]/15 text-[#20c76a] flex items-center justify-center mb-3">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#20c76a] flex items-center justify-between">
                <span>Book Food Truck</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#20c76a]" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Mobile catering for weddings, food festivals and outdoor corporate events.
              </p>
            </a>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 bg-[#12160f] rounded-xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="font-serif text-2xl font-normal text-[#f6f0e4]">
            Good food is always <em className="text-[#f2d58a] italic not-italic">worth talking about.</em>
          </h3>
          <button
            onClick={() => {
              onNavigate('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Browse the full menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
