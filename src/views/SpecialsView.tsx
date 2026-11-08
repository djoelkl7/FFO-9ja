import React, { useState } from 'react';
import { PageView, CartItem } from '../types';
import { createWhatsAppUrl } from '../data/menuData';
import {
  ArrowUpRight,
  Users,
  Utensils,
  Flame,
  Send,
  Plus,
  Check,
  ShoppingBag,
  ArrowRight,
  Truck,
  MapPin,
  Calendar,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface SpecialsViewProps {
  onNavigate: (page: PageView) => void;
  onAddToCart?: (item: Omit<CartItem, 'cartId'>) => void;
}

interface SpecialPlatter {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  serves: string;
  tag: string;
  description: string;
  image: string;
}

const SIGNATURE_PLATTERS: SpecialPlatter[] = [
  {
    id: 'special-suya-platter',
    name: 'The Ultimate Suya Platter',
    price: '£120.00',
    numericPrice: 120.0,
    serves: '6–10 Guests',
    tag: 'Party Signature',
    description:
      'Mountain of char-grilled beef suya skewers generously seasoned with authentic northern yaji spice, fresh red onions, tomatoes and crisp cabbage.',
    image: getAssetUrl('assets/images/uploads/Suya-Platter-450x450.jpg'),
  },
  {
    id: 'special-asun-platter',
    name: 'Fiery Goat Asun Platter',
    price: '£120.00',
    numericPrice: 120.0,
    serves: '6–10 Guests',
    tag: 'Fiery Classic',
    description:
      'Smokey bite-sized goat meat roasted over hot flames and sautéed in Scotch bonnet peppers, bell peppers, aromatics and sweet caramelized onions.',
    image: getAssetUrl('assets/images/uploads/Asun-Platter-450x450.jpg'),
  },
  {
    id: 'special-small-chops',
    name: 'Grand Small Chops Platter',
    price: '£100.00',
    numericPrice: 100.0,
    serves: '8–12 Guests',
    tag: 'Event Favourite',
    description:
      'The essential Nigerian celebration platter: golden puff-puff, crispy spring rolls, golden samosas, mini flaky meat pies, sausage rolls and asun.',
    image: getAssetUrl('assets/images/uploads/Small-chops-platterJ-450x450.jpg'),
  },
  {
    id: 'special-mixed-grill',
    name: 'Naija Pot Big Mixed Grill',
    price: '£45.00',
    numericPrice: 45.0,
    serves: '2–4 Guests',
    tag: 'Grill Masterpiece',
    description:
      'The ultimate sharing feast bringing together prime beef suya, juicy chicken skewers, fiery asun goat, grilled peppers and sweet fried plantain.',
    image: getAssetUrl('assets/images/uploads/Mixed-Grill-450x450.jpg'),
  },
  {
    id: 'special-tilapia-feast',
    name: 'Whole Charcoal Tilapia Feast',
    price: '£22.00',
    numericPrice: 22.0,
    serves: '1–2 Guests',
    tag: 'Charcoal Special',
    description:
      'Whole fresh river tilapia deeply scored and grilled to flaky perfection, smothered with hot pepper sauce relish and served with golden fried dodo.',
    image: getAssetUrl('assets/images/uploads/Tilapia-FIsh-450x450.jpg'),
  },
  {
    id: 'special-chicken-suya',
    name: 'Smokey Chicken Suya Feast',
    price: '£15.00',
    numericPrice: 15.0,
    serves: '1–2 Guests',
    tag: 'Tender & Juicy',
    description:
      'Tender chicken breast fillets marinated in traditional northern Nigerian spices, grilled over coals and garnished with fresh sliced onions.',
    image: getAssetUrl('assets/images/uploads/Chickenn-Suya-450x450.jpg'),
  },
  {
    id: 'special-chicken-wings',
    name: 'Spicy Grilled Wings Platter',
    price: '£10.00',
    numericPrice: 10.0,
    serves: '1–2 Guests',
    tag: 'Crowd Favourite',
    description:
      'Char-grilled chicken wings generously glazed with hot Scotch bonnet pepper relish, garlic, and fresh Nigerian herbs.',
    image: getAssetUrl('assets/images/uploads/Grilled-Chicken-Wings-450x450.jpg'),
  },
  {
    id: 'special-peppered-turkey',
    name: 'Fiery Peppered Turkey Tray',
    price: '£18.00',
    numericPrice: 18.0,
    serves: '1–2 Guests',
    tag: 'Rich & Bold',
    description:
      'Succulent golden fried turkey steaks tossed in a fiery, aromatic stew of sweet peppers, scotch bonnets, and sliced onions.',
    image: getAssetUrl('assets/images/uploads/peppered-turkey.jpg'),
  },
];

export const SpecialsView: React.FC<SpecialsViewProps> = ({ onNavigate, onAddToCart }) => {
  const [eventType, setEventType] = useState('Family Gathering');
  const [guestCount, setGuestCount] = useState('20-30 guests');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([
    'Party Jollof & Fried Rice',
    'Small Chops & Suya Platter',
  ]);
  const [eventDate, setEventDate] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const togglePackage = (pkg: string) => {
    setSelectedPackages((prev) =>
      prev.includes(pkg) ? prev.filter((p) => p !== pkg) : [...prev, pkg]
    );
  };

  const handleAddPlatterToCart = (platter: SpecialPlatter) => {
    if (onAddToCart) {
      onAddToCart({
        id: platter.id,
        name: platter.name,
        price: platter.numericPrice,
        quantity: 1,
        image: platter.image,
      });
      setAddedItemIds((prev) => ({ ...prev, [platter.id]: true }));
      setTimeout(() => {
        setAddedItemIds((prev) => ({ ...prev, [platter.id]: false }));
      }, 1200);
    }
  };

  const generateCateringWhatsAppMessage = () => {
    let msg = `Hello Naija Pot Kitchen & Grill Ltd, I'd like to enquire about your specials & event catering:\n\n`;
    msg += `• Event Type: ${eventType}\n`;
    msg += `• Number of Guests: ${guestCount}\n`;
    if (eventDate) {
      msg += `• Target Date: ${eventDate}\n`;
    }
    if (selectedPackages.length > 0) {
      msg += `• Desired Packages: ${selectedPackages.join(', ')}\n`;
    }
    if (specialNotes.trim()) {
      msg += `• Notes / Requirements: ${specialNotes.trim()}\n`;
    }
    msg += `\nPlease let me know your packages and availability. Thank you!`;
    return msg;
  };

  return (
    <div className="space-y-0">
      {/* Specials Hero Section */}
      <section
        className="relative h-96 sm:h-[460px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${getAssetUrl('assets/images/uploads/Suya-Platter-450x450.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/55" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHARING PLATTERS · FEASTS · CATERING</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4]">
              Our Specials.
              <br />
              <em className="text-[#f2d58a] italic not-italic">Made for sharing.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed">
              Grand suya platters, sizzling goat asun, small chops boxes and custom event catering crafted with the warmth of a true Nigerian kitchen.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#platters-collection"
                className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all shadow-md hover:-translate-y-0.5"
              >
                Explore Signature Platters
              </a>
              <a
                href="#catering-planner"
                className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all"
              >
                Plan Event Catering
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Platters Showcase Grid */}
      <section id="platters-collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
            FEASTS FOR THE TABLE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4]">
            Signature Platters &amp; <em className="text-[#f2d58a] italic not-italic">Sharing Trays</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
            Prepared fresh to order using open flames and authentic Nigerian spices. Perfect for parties, family gatherings, and weekend treats.
          </p>
        </div>

        {/* 8 Platters Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNATURE_PLATTERS.map((platter) => {
            const isAdded = addedItemIds[platter.id];

            return (
              <article
                key={platter.id}
                className="bg-[#141710] rounded-xl overflow-hidden border border-white/5 hover:border-[#d8ad53]/45 shadow-xl flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="relative h-56 bg-[#1e2318] overflow-hidden">
                    <img
                      src={platter.image}
                      alt={platter.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 bg-[#090a08]/90 text-[#f2d58a] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-[#d8ad53]/40 shadow">
                      {platter.tag}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-[#19834b] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow">
                      {platter.serves}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#f6f0e4] leading-snug">
                        {platter.name}
                      </h3>
                      <span className="font-serif text-base font-bold text-[#f2d58a] shrink-0">
                        {platter.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#b9b4a8] leading-relaxed">
                      {platter.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  {onAddToCart && (
                    <button
                      onClick={() => handleAddPlatterToCart(platter)}
                      className="flex-1 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#090a08]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Tray</span>
                        </>
                      )}
                    </button>
                  )}
                  <a
                    href={createWhatsAppUrl(`Hello Naija Pot, I would like to order the ${platter.name} (${platter.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#19834b] hover:bg-[#20a75f] text-white rounded-lg transition-all shadow shrink-0"
                    title={`Enquire ${platter.name} on WhatsApp`}
                    aria-label={`Enquire ${platter.name} on WhatsApp`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Highlights & Pillars */}
      <section className="bg-[#0f120b] py-16 lg:py-24 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-80 sm:h-[440px]">
              <img
                src={getAssetUrl('assets/images/uploads/Mixed-Grill-450x450.jpg')}
                alt="Naija Pot flame-grilled feast"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>

            <div className="space-y-6">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
                THE NAIJA POT CATERING PROMISE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4] leading-tight">
                Generous portions.
                <br />
                <em className="text-[#f2d58a] italic not-italic">Pure authentic warmth.</em>
              </h2>
              <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
                Whether you’re feeding 5 or 500, we prepare every dish with the same dedication we give our own family table. From smoky jollof rice cooked in giant iron pots to skewers of charcoal suya, our food turns your gathering into a memorable celebration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-[#141710] rounded-xl border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#45a866]">
                    <Users className="w-4 h-4" />
                    <span className="font-serif text-sm font-bold">10–500+</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#f6f0e4]">Any Crowd Size</h4>
                  <p className="text-[11px] text-[#b9b4a8]">Flexible packages tailored for intimate dinners or grand weddings.</p>
                </div>
                <div className="p-4 bg-[#141710] rounded-xl border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#45a866]">
                    <Flame className="w-4 h-4" />
                    <span className="font-serif text-sm font-bold">Live Fire</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#f6f0e4]">Charcoal Grilling</h4>
                  <p className="text-[11px] text-[#b9b4a8]">Authentic northern yaji beef suya and hot goat asun.</p>
                </div>
                <div className="p-4 bg-[#141710] rounded-xl border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#45a866]">
                    <Utensils className="w-4 h-4" />
                    <span className="font-serif text-sm font-bold">Fresh Daily</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#f6f0e4]">Full Menu Reach</h4>
                  <p className="text-[11px] text-[#b9b4a8]">Party jollof, swallows, small chops, and golden pastries.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Naija Pot Food Truck & Event Catering Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#141711] border border-[#d8ad53]/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-72 bg-black">
                  <img
                    src={getAssetUrl('assets/images/uploads/Carting-Event.JPG')}
                    alt="Carting Event by Naija Pot Catering"
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141711] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-black/80 text-[#f2d58a] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                    Carting Event &amp; Catering
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
                    Naija Kitchen Pot caterers providing catering services for Weddings, Corporate/ Private Events and Funerals
                  </h3>
                  <p className="text-xs text-[#b9b4a8] leading-relaxed">
                    Event Catering Group based in Milton Keynes provides a full range of catering services for all types of events including Private Events, Weddings, Corporate and Funeral catering, Mobile bars and Equipment Hire. We provide a huge range of delicious food including Canapes, Finger Food, Paella, Spit Roast and many more.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={createWhatsAppUrl('Hello Naija Pot, I would like to book Event Catering for an upcoming event.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Book Event Catering On WHATSAPP</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="bg-[#141711] border border-[#d8ad53]/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-72 bg-black flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={getAssetUrl('assets/images/uploads/Food-Truck.png')}
                    alt="The Official Naija Pot Food Truck / Food Tank for Outdoor Festivals and Catering"
                    className="w-full h-full object-contain scale-110 sm:scale-125 transition-transform duration-700 hover:scale-135"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141711] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-[#19834b] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    MOBILE EVENTS FOOD TRUCK
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
                    MOBILE EVENTS FOOD TRUCK
                  </h3>
                  <p className="text-xs text-[#b9b4a8] leading-relaxed">
                    Hire our fully equipped mobile kitchen for outdoor UK festivals, weddings, cultural celebrations and large corporate events.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={createWhatsAppUrl("Hello Naija Pot, I would like to enquire about hiring your Food Truck for an outdoor event.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all shadow flex items-center justify-center gap-2"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Book Food Truck on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Catering Request Builder */}
      <section id="catering-planner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="p-6 sm:p-12 bg-[#171a12] rounded-2xl border border-[#d8ad53]/35 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>CUSTOM CATERING &amp; LARGE ORDERS</span>
            </span>
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
              />
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
                'Whole Charcoal Tilapia',
                'Assorted Soups & Swallows',
                'Fresh Bakery & Meat Pies',
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
              placeholder="e.g. Extra pepper sauce, delivery to Bradville, mild spices for kids"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-[#10130d] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
            />
          </div>

          {/* CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[11px] text-[#b9b4a8]">
              Platters and catering bookings are confirmed directly with our kitchen via WhatsApp.
            </p>
            <a
              href={createWhatsAppUrl(generateCateringWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Catering Enquiry on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Responsive Cross-Page Navigation Hub */}
        <div className="mt-16 bg-[#14170f] border border-[#d8ad53]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.24em] text-[#45a866] uppercase mb-1">
                NAVIGATE NAIJA POT
              </p>
              <h3 className="font-serif text-2xl font-normal text-[#f6f0e4]">
                Explore Every Part of Our Kitchen
              </h3>
            </div>
            <p className="text-xs text-[#b9b4a8] max-w-sm">
              Quickly switch between our daily menu, artisan bakery, our story, and contact details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#d8ad53]/60 rounded-xl text-left transition-all group cursor-pointer shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-[#d8ad53]/15 text-[#d8ad53] flex items-center justify-center mb-2.5">
                <Utensils className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#f2d58a] flex items-center justify-between">
                <span>The Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                The Grill Hub, rich soups, swallows, party jollof &amp; sides.
              </p>
            </button>

            <button
              onClick={() => onNavigate('bakery')}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#20c76a]/60 rounded-xl text-left transition-all group cursor-pointer shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-[#19834b]/20 text-[#20c76a] flex items-center justify-center mb-2.5">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#20c76a] flex items-center justify-between">
                <span>The Bakery</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Golden meat pies, sweet puff puff and freshly baked pastries.
              </p>
            </button>

            <button
              onClick={() => onNavigate('story')}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#f2d58a]/60 rounded-xl text-left transition-all group cursor-pointer shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-[#d8ad53]/15 text-[#f2d58a] flex items-center justify-center mb-2.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#f2d58a] flex items-center justify-between">
                <span>Our Heritage Story</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                Roots in Lagos culinary culture, brought to Milton Keynes.
              </p>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="p-4 bg-[#1b2017] hover:bg-[#232a1e] border border-white/5 hover:border-[#d8ad53]/60 rounded-xl text-left transition-all group cursor-pointer shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-[#d8ad53]/15 text-[#d8ad53] flex items-center justify-center mb-2.5">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#f6f0e4] group-hover:text-[#f2d58a] flex items-center justify-between">
                <span>Contact &amp; Visit</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-[11px] text-[#b9b4a8] mt-1">
                22 Eston Court, Bradville · Open all day in the week 9am–11pm.
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
