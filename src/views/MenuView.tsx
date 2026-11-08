import React, { useEffect, useMemo, useState } from 'react';
import { Dish, MenuCategoryId, CartItem, PageView } from '../types';
import { DISHES, CATEGORIES, createWhatsAppUrl } from '../data/menuData';
import { Search, ArrowUpRight, Plus, SlidersHorizontal, Check, ArrowRight, X } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import { CartingEventSlider } from '../components/CartingEventSlider';

interface MenuViewProps {
  initialCategory?: MenuCategoryId;
  onOpenSolidModal: (dish: Dish) => void;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
  onNavigate?: (page: PageView) => void;
}

const MENU_PRICE_OVERRIDES: Record<string, { price: string; numericPrice: number }> = {
  'suya-meat': { price: '£15.00', numericPrice: 15 },
  'asun-goat': { price: '£18.00', numericPrice: 18 },
  'grilled-fish-main': { price: '£20.00', numericPrice: 20 },
  'chicken-suya-whole': { price: '£30.00', numericPrice: 30 },
  'peppered-turkey-wings': { price: '£8.00', numericPrice: 8 },
  'grilled-chicken-wings': { price: '£8.00', numericPrice: 8 },
  'mixed-grill-platter': { price: '£120.00', numericPrice: 120 },
  'peppered-meat': { price: '£20.00', numericPrice: 20 },
  'jollof-rice-beef-chicken': { price: '£17.00', numericPrice: 17 },
  'fried-rice-beef-chicken': { price: '£18.00', numericPrice: 18 },
  'white-rice-assorted': { price: '£17.00', numericPrice: 17 },
  'ofada-ayamase': { price: '£18.00', numericPrice: 18 },
  'white-rice-ayamase': { price: '£18.00', numericPrice: 18 },
  'rice-with-assorted-meat': { price: '£17.00', numericPrice: 17 },
  'jollof-suya-beef': { price: '£22.00', numericPrice: 22 },
  'jollof-suya-chicken': { price: '£22.00', numericPrice: 22 },
  'rice-meal-custom': { price: '£10–£22', numericPrice: 16 },
  amala: { price: '£18.00', numericPrice: 18 },
  'pounded-yam': { price: '£18.00', numericPrice: 18 },
  'white-eba': { price: '£18.00', numericPrice: 18 },
  'yellow-eba': { price: '£18.00', numericPrice: 18 },
  asaro: { price: '£18.00', numericPrice: 18 },
  'yam-and-sauce': { price: '£17.00', numericPrice: 17 },
  'fried-yam-chilli': { price: '£15.00', numericPrice: 15 },
  'plantain-chilli-sauce': { price: '£15.00', numericPrice: 15 },
  'ewa-agoyin': { price: '£15.00', numericPrice: 15 },
  'moin-moin': { price: '£5.00', numericPrice: 5 },
  'plantain-omelette-chilli': { price: '£18.00', numericPrice: 18 },
  'assorted-fried-meat': { price: '£20.00', numericPrice: 20 },
  'omelette-single': { price: '£10.00', numericPrice: 10 },
  'croaker-fish-whole': { price: '£30.00', numericPrice: 30 },
  'tilapia-fish-whole': { price: '£30.00', numericPrice: 30 },
  'assorted-meat-pepper-soup': { price: '£15.00', numericPrice: 15 },
  'fish-pepper-soup': { price: '£15.00', numericPrice: 15 },
  'fried-plantain-dodo': { price: '£5.00', numericPrice: 5 },
  'suya-platter': { price: '£100.00', numericPrice: 100 },
  'asun-platter': { price: '£120.00', numericPrice: 120 },
  'small-chops-platter': { price: '£100.00', numericPrice: 100 },
  'puff-puff': { price: '£10.00', numericPrice: 10 },
  'meat-pie': { price: '£2.50', numericPrice: 2.5 },
  'sausage-roll': { price: '£2.50', numericPrice: 2.5 },
  'fish-roll': { price: '£2.00', numericPrice: 2 },
  'chicken-scotch-egg': { price: '£2.00', numericPrice: 2 },
  'chin-chin': { price: '£2.00', numericPrice: 2 },
  'plantain-chips': { price: '£1.50', numericPrice: 1.5 },
  'roasted-peanuts': { price: '£4.99', numericPrice: 4.99 },
  'moimoi-pouch': { price: '£3.50', numericPrice: 3.5 },
  'coke-can': { price: '£1.50', numericPrice: 1.5 },
  'coke-zero': { price: '£1.50', numericPrice: 1.5 },
  'fanta-orange': { price: '£1.50', numericPrice: 1.5 },
  'malta-guinness': { price: '£2.00', numericPrice: 2 },
  fayrouz: { price: '£1.50', numericPrice: 1.5 },
  'sprite-can': { price: '£2.00', numericPrice: 2 },
  'ribena-bottle': { price: '£2.00', numericPrice: 2 },
  'still-water': { price: '£1.00', numericPrice: 1 },
};

const MENU_DISHES: Dish[] = [
  ...DISHES.map((dish) => ({ ...dish, ...(MENU_PRICE_OVERRIDES[dish.id] || {}) })),
  {
    id: 'diet-coke-can', name: 'Diet Coke Can', category: 'drinks', price: '£1.50', numericPrice: 1.5,
    description: 'Chilled Diet Coke can.', image: getAssetUrl('assets/images/uploads/drinks/diet-coke.jpg'),
  },
  {
    id: 'pepsi-can', name: 'Pepsi Can', category: 'drinks', price: '£1.50', numericPrice: 1.5,
    description: 'Chilled Pepsi can.', image: getAssetUrl('assets/images/uploads/drinks/pepsi.jpg'),
  },
  {
    id: 'juice-burst-orange-carrot', name: 'Juice Burst Orange & Carrot', category: 'drinks', price: '£2.00', numericPrice: 2,
    description: 'Refreshing orange and carrot juice drink.', image: getAssetUrl('assets/images/uploads/drinks/juice-burst-orange.jpg'),
  },
  {
    id: 'juice-burst-apple', name: 'Juice Burst Apple', category: 'drinks', price: '£2.00', numericPrice: 2,
    description: 'Refreshing apple juice drink.', image: getAssetUrl('assets/images/uploads/drinks/juice-burst-apple.jpg'),
  },
  {
    id: 'rani-float-can', name: 'Rani Float Can', category: 'drinks', price: '£1.50', numericPrice: 1.5,
    description: 'Fruity Rani Float drink.', image: getAssetUrl('assets/images/uploads/drinks/rani.jpg'),
  },
  {
    id: 'cake-mini-loaves-menu', name: 'Cake Mini Loaves', category: 'snacks-and-extras', price: '£12.00', numericPrice: 12,
    description: 'Moist variety cake mini loaves — gently sweet and rich.', image: getAssetUrl('assets/images/uploads/Cake-450x450.jpg'),
  },
];

export const MenuView: React.FC<MenuViewProps> = ({ initialCategory, onOpenSolidModal, onAddToCart, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [previewDish, setPreviewDish] = useState<Dish | null>(null);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (!previewDish) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewDish(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [previewDish]);

  const handleQuickAdd = (dish: Dish) => {
    onAddToCart({ id: dish.id, name: dish.name, price: dish.numericPrice, quantity: 1, image: dish.image });
    setAddedItemIds((previous) => ({ ...previous, [dish.id]: true }));
    window.setTimeout(() => setAddedItemIds((previous) => ({ ...previous, [dish.id]: false })), 1200);
  };

  const filteredDishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MENU_DISHES.filter((dish) => {
      const matchesCategory = selectedCategory === 'all'
        ? dish.category !== 'bakery'
        : selectedCategory === 'bakery'
          ? dish.category === 'bakery'
          : dish.category === selectedCategory;
      const matchesSearch = !query || dish.name.toLowerCase().includes(query) || dish.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoriesToDisplay = useMemo(() => {
    if (selectedCategory !== 'all') {
      const category = CATEGORIES.find((item) => item.id === selectedCategory);
      return category ? [category] : [];
    }
    return CATEGORIES.filter((category) => category.id !== 'all' && category.id !== 'bakery');
  }, [selectedCategory]);

  const navigate = (page: PageView) => {
    if (onNavigate) onNavigate(page);
    else window.location.hash = page;
  };

  return (
    <div className="space-y-0">
      <section className="relative h-96 sm:h-[460px] bg-cover bg-center flex items-center" style={{ backgroundImage: `url(${getAssetUrl('assets/images/uploads/Jollof-Rice-450x450.jpg')})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">FRESH FROM OUR KITCHEN · WITH NAIJA LOVE</p>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">Real Nigerian flavour.<br /><em className="text-[#f2d58a] italic not-italic">Made to feel like home.</em></h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed mb-6">Discover hearty Nigerian classics, rich soups, smoky grills and generous plates prepared with care.</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#menu-collection" className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all shadow-md">Explore the menu</a>
              <button onClick={() => navigate('bakery')} className="bg-[#19834b] hover:bg-[#1f9e5b] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all shadow-md inline-flex items-center gap-2"><span>Visit the bakery</span><ArrowRight className="w-3.5 h-3.5" /></button>
              <a href="#menu-order" className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all">How to order</a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">THE NAIJA POT MENU</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">A taste of Naija.<br /><em className="text-[#f2d58a] italic not-italic">A reason to gather.</em></h2>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">From party jollof and charcoal-grilled favourites to comforting swallows and soups, every dish brings warmth and generous flavour to your table.</p>
            <p className="text-xs text-[#b9b4a8] leading-relaxed italic border-l-2 border-[#d8ad53] pl-3 py-1">Browse by category or search for a favourite, then add it to your order tray or enquire directly on WhatsApp.</p>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative h-80 sm:h-96 bg-[#181c14]">
            <img src={getAssetUrl('assets/images/uploads/Mixed-Grill-450x450.jpg')} alt="A selection of Naija Pot grilled favourites" className="w-full h-full object-cover" onError={handleImageError} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-5"><span className="text-xs font-serif font-bold text-[#f2d58a]">Bold flavour, freshly prepared with Naija love</span></div>
          </div>
        </div>
      </section>

      <section id="menu-collection" className="bg-[#12160f] py-16 lg:py-24 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">MADE FRESH, SERVED WITH LOVE</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4]">Find your <em className="text-[#f2d58a] italic not-italic">new favourite.</em></h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">Choose a category, search the menu, and add dishes to your order tray. Select a food image to preview it in full size.</p>
          </div>
          <div className="space-y-4">
            <div className="max-w-lg mx-auto relative">
              <Search className="w-4 h-4 text-[#b9b4a8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search jollof, suya, amala, soup..." aria-label="Search menu dishes" className="w-full bg-[#141711] border border-white/10 hover:border-[#d8ad53]/40 focus:border-[#d8ad53] rounded-full py-3 pl-10 pr-16 text-sm text-white placeholder-white/40 focus:outline-none" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#b9b4a8] hover:text-white" aria-label="Clear search">Clear</button>}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2" aria-label="Menu categories">
              {CATEGORIES.map((category) => (
                <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} aria-pressed={selectedCategory === category.id} className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${selectedCategory === category.id ? 'bg-[#d8ad53] text-[#090a08] shadow-md font-bold' : 'bg-[#141711] text-[#b9b4a8] hover:text-white hover:border-[#d8ad53]/40 border border-white/5'}`}>
                  {category.num ? `${category.num} · ` : ''}{category.name}
                </button>
              ))}
            </div>
          </div>

          {categoriesToDisplay.map((category) => {
            const dishes = selectedCategory === 'bakery' ? filteredDishes : filteredDishes.filter((dish) => dish.category === category.id);
            if (!dishes.length && category.id !== 'carting-event') return null;

            if (category.id === 'carting-event') {
              return (
                <div key={category.id} className="pt-6 space-y-8">
                  <div className="border-b border-[#d8ad53]/25 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {category.num && <span className="font-serif text-lg font-bold text-[#45a866]">{category.num}</span>}
                      <h3 className="font-serif text-2xl font-semibold text-[#f2d58a]">{category.name}</h3>
                    </div>
                    <span className="text-xs text-[#45a866] font-bold uppercase tracking-wider">Event Catering Service</span>
                  </div>

                  {/* Primary Carting Event Feature Hero */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141710] border border-[#d8ad53]/35 rounded-2xl p-6 sm:p-8 shadow-2xl">
                    <div className="lg:col-span-5 rounded-xl overflow-hidden border border-[#d8ad53]/25 relative h-72 sm:h-80 md:h-96 shadow-lg bg-black">
                      <img
                        src={getAssetUrl('assets/images/uploads/Carting-Event.JPG')}
                        alt="Carting Event by Naija Pot Catering"
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                        <span className="text-xs font-serif font-bold text-[#f2d58a]">Naija Kitchen Pot Event Catering</span>
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#45a866] bg-[#19834b]/15 px-3 py-1 rounded border border-[#45a866]/30 inline-block">
                        WEDDINGS · CORPORATE · FUNERALS · PRIVATE PARTIES
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#f6f0e4] leading-snug">
                        Naija Kitchen Pot caterers providing catering services for Weddings, Corporate/ Private Events and Funerals
                      </h4>
                      <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
                        Event Catering Group based in Milton Keynes provides a full range of catering services for all types of events including Private Events, Weddings, Corporate and Funeral catering, Mobile bars and Equipment Hire. We provide a huge range of delicious food including Canapes, Finger Food, Paella, Spit Roast and many more.
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <a
                          href={createWhatsAppUrl('Hello Naija Pot, I would like to book Event Catering for an upcoming event.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5"
                        >
                          <span>Book Event Catering On WHATSAPP</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 3-Second Auto-Rotating Image Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold tracking-wider text-[#d8ad53] uppercase">
                        CATERING SERVICES GALLERY (3s ROTATING SLIDER)
                      </p>
                      <span className="text-[11px] text-[#b9b4a8]">Hover to pause</span>
                    </div>
                    <CartingEventSlider showInfoCard={false} />
                  </div>
                </div>
              );
            }

            return (
              <div key={category.id} className="pt-6 space-y-6">
                <div className="border-b border-[#d8ad53]/25 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">{category.num && <span className="font-serif text-lg font-bold text-[#45a866]">{category.num}</span>}<h3 className="font-serif text-2xl font-semibold text-[#f2d58a]">{category.name}</h3></div>
                  <span className="text-xs text-[#b9b4a8]">{dishes.length} {dishes.length === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="dish-grid">
                  {dishes.map((dish) => {
                    const isAdded = addedItemIds[dish.id];
                    return (
                      <article key={dish.id} className="dish-card">
                        <button
                          type="button"
                          className="dish-image-frame cursor-zoom-in border-0 p-0 text-left"
                          onClick={() => setPreviewDish(dish)}
                          aria-label={`Preview full-size image of ${dish.name}`}
                        >
                          <img src={dish.image} alt={dish.name} className="dish-product-image" loading="lazy" onError={handleImageError} />
                          {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                          <span className="dish-price-badge">{dish.price}</span>
                        </button>
                        <div className="dish-content">
                          <div><h4 className="dish-name">{dish.name}</h4><p className="dish-desc">{dish.description}</p></div>
                          <div className="dish-footer">
                            {dish.isSolid ? (
                              <button onClick={() => onOpenSolidModal(dish)} className="dish-add-button"><SlidersHorizontal className="w-3.5 h-3.5" /><span>Select &amp; Pair</span></button>
                            ) : (
                              <>
                                <button onClick={() => handleQuickAdd(dish)} className={`dish-add-button ${isAdded ? 'is-added' : ''}`}>
                                  {isAdded ? <><Check className="w-3.5 h-3.5" /><span>Added</span></> : <><Plus className="w-3.5 h-3.5" /><span>Add</span></>}
                                </button>
                                <a href={createWhatsAppUrl(`Hello Naija Pot, I would like to order ${dish.name} (${dish.price}).`)} target="_blank" rel="noopener noreferrer" className="dish-order-button"><span>Order</span><ArrowUpRight className="w-3.5 h-3.5" /></a>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredDishes.length === 0 && (
            <div className="py-12 text-center space-y-3"><p className="text-sm text-[#b9b4a8]">No menu items match your search.</p><button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} className="text-xs text-[#d8ad53] underline font-bold uppercase tracking-wider">Reset filters</button></div>
          )}
        </div>
      </section>

      <section id="menu-order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="p-8 sm:p-12 bg-[#171a12] border border-[#d8ad53]/35 rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">READY TO ORDER?</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f6f0e4]">Let’s make it <em className="text-[#f2d58a] italic not-italic">delicious.</em></h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed max-w-lg">Ask about today’s availability, collection times and current prices. Add your favourites to the tray or send an enquiry directly to our kitchen.</p>
            <a href={createWhatsAppUrl("Hello Naija Pot, please send me today's menu and prices.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded shadow-md"><span>Ask about today’s menu</span><ArrowUpRight className="w-4 h-4" /></a>
          </div>
          <div className="lg:col-span-5 p-6 bg-[#0f110c] rounded-xl border border-white/10 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#45a866]">EXPLORE MORE</p>
            <p className="text-xs text-[#b9b4a8]">Continue exploring Naija Pot’s kitchen and story.</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate('bakery')} className="flex items-center justify-center gap-2 rounded bg-[#19834b] px-3 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1f9e5b]">Bakery <ArrowRight className="h-3.5 w-3.5" /></button>
              <button onClick={() => navigate('specials')} className="flex items-center justify-center gap-2 rounded border border-[#d8ad53]/40 px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#f2d58a] hover:bg-[#d8ad53]/10">Specials <ArrowRight className="h-3.5 w-3.5" /></button>
              <button onClick={() => navigate('home')} className="col-span-2 flex items-center justify-center gap-2 rounded border border-white/10 px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#f6f0e4] hover:border-[#d8ad53]/50">Back to home <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </section>

      {previewDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Full-size preview: ${previewDish.name}`}
          onClick={() => setPreviewDish(null)}
        >
          <button type="button" onClick={() => setPreviewDish(null)} className="absolute right-4 top-4 z-10 rounded-full bg-[#141711] p-3 text-[#f6f0e4] hover:bg-[#252a20]" aria-label="Close image preview">
            <X className="h-6 w-6" />
          </button>
          <div className="flex max-h-full w-full max-w-6xl flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
            <img src={previewDish.image} alt={previewDish.name} className="max-h-[80vh] max-w-full object-contain" onError={handleImageError} />
            <div className="flex w-full max-w-4xl items-center justify-between gap-4 text-[#f6f0e4]">
              <h2 className="font-serif text-lg sm:text-2xl font-bold">{previewDish.name}</h2>
              <span className="shrink-0 rounded bg-[#19834b] px-3 py-1 font-serif font-bold text-[#f2d58a]">{previewDish.price}</span>
            </div>
            <p className="w-full max-w-4xl text-sm text-[#b9b4a8]">{previewDish.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
