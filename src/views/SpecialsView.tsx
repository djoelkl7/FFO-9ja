import React, { useState } from 'react';
import { PageView } from '../types';
import { createWhatsAppUrl } from '../data/menuData';
import { ArrowUpRight, Users, Utensils, Flame, Send } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface SpecialsViewProps {
  onNavigate: (page: PageView) => void;
}

export const SpecialsView: React.FC<SpecialsViewProps> = ({ onNavigate }) => {
  const [eventType, setEventType] = useState('Family Gathering');
  const [guestCount, setGuestCount] = useState('20-30 guests');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([
    'Party Jollof & Fried Rice',
    'Small Chops & Suya Platter',
  ]);
  const [eventDate, setEventDate] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const togglePackage = (pkg: string) => {
    setSelectedPackages((prev) =>
      prev.includes(pkg) ? prev.filter((p) => p !== pkg) : [...prev, pkg]
    );
  };

  const generateCateringWhatsAppMessage = () => {
    let msg = `Hello Naija Pot Kitchen & Grill Ltd, I'd like to enquire about specials/catering:\n\n`;
    msg += `• Event Type: ${eventType}\n`;
    msg += `• Number of Guests: ${guestCount}\n`;
    if (eventDate) {
      msg += `• Target Date: ${eventDate}\n`;
    }
    if (selectedPackages.length > 0) {
      msg += `• Menu Options Desired: ${selectedPackages.join(', ')}\n`;
    }
    if (specialNotes.trim()) {
      msg += `• Notes / Preferences: ${specialNotes.trim()}\n`;
    }
    msg += `\nPlease let me know your availability and packages. Thank you!`;
    return msg;
  };

  return (
    <div className="space-y-0">
      {/* Specials Hero */}
      <section
        className="relative h-96 sm:h-[440px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${getAssetUrl('assets/images/uploads/Asun-Platter-450x450.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
              CELEBRATE WITH NAIJA POT
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Make it special.
              <br />
              <em className="text-[#f2d58a] italic not-italic">Make it delicious.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed">
              Bring people together over generous food, fiery charcoal suya and unforgettable Nigerian flavour.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 h-80 sm:h-[420px]">
            <img
              src={getAssetUrl('assets/images/uploads/Mixed-Grill-450x450.jpg')}
              alt="Grilled food platter for sharing"
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>

          <div className="space-y-5">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
              THE NAIJA POT EXPERIENCE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4] leading-tight">
              Big flavour.
              <br />
              <em className="text-[#f2d58a] italic not-italic">Beautiful moments.</em>
            </h2>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">
              Whether it’s a family weekend feast, an anniversary celebration, birthday party or simply a day when you want something exceptionally satisfying, talk to us about our current specials and sharing trays.
            </p>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">
              We cater large events, office lunches, church gatherings and parties throughout Milton Keynes and surrounding areas.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={createWhatsAppUrl(
                  "Hello Naija Pot, I'd like to ask about your specials and sharing trays."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span>Ask about specials</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 bg-[#171a12] border border-[#d8ad53]/40 hover:border-[#d8ad53] text-[#f2d58a] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all cursor-pointer"
              >
                <span>View Daily Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillars List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#d8ad53]/25">
          <div className="p-6 bg-[#141711] rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[#45a866]">
              <Users className="w-5 h-5" />
              <span className="font-serif text-xl font-bold">01</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
              Family Meals & Trays
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              Generous food trays and portions for sharing around the family table. Jollof pots, stew bowls and swallows.
            </p>
          </div>

          <div className="p-6 bg-[#141711] rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[#45a866]">
              <Utensils className="w-5 h-5" />
              <span className="font-serif text-xl font-bold">02</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
              Party Favourites & Chops
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              Bring unmistakable Naija warmth to your special occasions with small chops platters, puff puff, meat pies and asun.
            </p>
          </div>

          <div className="p-6 bg-[#141711] rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[#45a866]">
              <Flame className="w-5 h-5" />
              <span className="font-serif text-xl font-bold">03</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
              Charcoal Grill Platters
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              Find out what smoky, spicy charcoal favourites are sizzling on the grill today — suya meat, tilapia, goat asun and wings.
            </p>
          </div>
        </div>

        {/* Interactive Catering Request Builder */}
        <div className="p-8 sm:p-12 bg-[#171a12] rounded-2xl border border-[#d8ad53]/35 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
              CUSTOM CATERING & LARGE ORDERS
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f6f0e4]">
              Plan your event feast with <em className="text-[#f2d58a] italic not-italic">Naija Pot.</em>
            </h3>
            <p className="text-xs sm:text-sm text-[#b9b4a8]">
              Select your event parameters below to construct an instant WhatsApp enquiry:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            {/* Event Type */}
            <div className="space-y-1.5">
              <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px]">
                Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-[#10130d] border border-white/10 rounded-lg p-3 text-white focus:border-[#d8ad53] focus:outline-none"
              >
                <option value="Family Gathering">Family Gathering</option>
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Wedding / Engagement">Wedding / Engagement</option>
                <option value="Church / Community Event">Church / Community Event</option>
                <option value="Corporate / Office Lunch">Corporate / Office Lunch</option>
                <option value="Weekend BBQ / Grill Out">Weekend BBQ / Grill Out</option>
              </select>
            </div>

            {/* Guest Count */}
            <div className="space-y-1.5">
              <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px]">
                Guest Count
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-[#10130d] border border-white/10 rounded-lg p-3 text-white focus:border-[#d8ad53] focus:outline-none"
              >
                <option value="10-15 guests">10–15 guests</option>
                <option value="20-30 guests">20–30 guests</option>
                <option value="40-60 guests">40–60 guests</option>
                <option value="75-100+ guests">75–100+ guests</option>
              </select>
            </div>

            {/* Target Date */}
            <div className="space-y-1.5">
              <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px]">
                Target Date (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Next Saturday"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-[#10130d] border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
              >
              </input>
            </div>
          </div>

          {/* Dishes Selection */}
          <div className="space-y-2">
            <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block">
              Menu Items of Interest (Click to select/unselect)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Party Jollof & Fried Rice',
                'Small Chops & Suya Platter',
                'Asun (Spicy Goat) Platter',
                'Assorted Soups & Swallows',
                'Grilled Whole Fish & Dodo',
                'Fresh Agege Bread & Meat Pies',
              ].map((item) => {
                const isSelected = selectedPackages.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => togglePackage(item)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d8ad53] text-[#090a08] font-bold shadow'
                        : 'bg-[#10130d] text-[#b9b4a8] border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block">
              Any special requirements or dietary considerations?
            </label>
            <input
              type="text"
              placeholder="e.g. Extra pepper sauce, vegetarian moi-moi, delivery to Bradville"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-[#10130d] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
            />
          </div>

          {/* CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[11px] text-[#b9b4a8]">
              Special dishes, packages and minimum quantities are confirmed directly with our catering team.
            </p>
            <a
              href={createWhatsAppUrl(generateCateringWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Catering Enquiry on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
