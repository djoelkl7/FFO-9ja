import React, { useEffect, useMemo, useState } from 'react';
import { Dish, MenuCategoryId, CartItem, PageView } from '../types';
import { DISHES, CATEGORIES, createWhatsAppUrl } from '../data/menuData';
import '../data/menuImageOverrides';
import { Search, ArrowUpRight, Plus, SlidersHorizontal, Check, ArrowRight } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface MenuViewProps {
  initialCategory?: MenuCategoryId;
  onOpenSolidModal: (dish: Dish) => void;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
  onNavigate?: (page: PageView) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  initialCategory,
  onOpenSolidModal,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleQuickAdd = (dish: Dish) => {
    onAddToCart({ id: dish.id, name: dish.name, price: dish.numericPrice, quantity: 1, image: dish.image });
    setAddedItemIds((previous) => ({ ...previous, [dish.id]: true }));
    window.setTimeout(() => setAddedItemIds((previous) => ({ ...previous, [dish.id]: false })), 1200);
  };

  const filteredDishes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return DISHES.filter((dish) => {
      const isBakeryProduct = dish.id === 'bakery-meat-pie' || dish.id === 'puff-puff';
      const matchesCategory = selectedCategory === 'all'
        ? dish.category !== 'bakery'
        : selectedCategory === 'bakery'
          ? isBakeryProduct
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
      <section
        className="relative min-h-[24rem] sm:min-h-[29rem] bg-cover bg-center flex items-center py-14 sm:py-16"
        style={{ backgroundImage: `url(${getAssetUrl('assets/images/uploads/Jollof-Rice-450x450.jpg')})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">FRESH FROM OUR KITCHEN · WITH NAIJA LOVE</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Real Nigerian flavour.<br /><em className="text-[#f2d58a] italic not-italic">Made to feel like home.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed mb-6">
              Discover hearty Nigerian classics, rich soups, smoky grills and generous plates prepared with care.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#menu-collection" className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-all shadow-md">Explore the menu</a>
              <button onClick={() => navigate('bakery')} className="bg-[#19834b] hover:bg-[#1f9e5b] text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-all shadow-md inline-flex items-center gap-2">
                <span>Visit the bakery</span><ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a href="#menu-order" className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-all">How to order</a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">THE NAIJA POT MENU</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">A taste of Naija.<br /><em className="text-[#f2d58a] italic not-italic">A reason to gather.</em></h2>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">From party jollof and charcoal-grilled favourites to comforting swallows and soups, every dish brings warmth and generous flavour to the table.</p>
            <p className="text-xs text-[#b9b4a8] leading-relaxed italic border-l-2 border-[#d8ad53] pl-3 py-1">Browse by category or search for a favourite, then add it to your order tray or enquire directly.</p>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3] bg-[#181c14]">
            <img src={getAssetUrl('assets/images/uploads/Mixed-Grill-450x450.jpg')} alt="A selection of Naija Pot grilled favourites" className="w-full h-full object-contain p-3" onError={handleImageError} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-5"><span className="text-xs font-serif font-bold text-[#f2d58a]">Bold flavour · generous portions</span></div>
          </div>
        </div>
      </section>

      <section id="menu-collection" className="bg-[#12160f] py-14 sm:py-16 lg:py-24 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">MADE FRESH, SERVED WITH LOVE</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4]">Find your <em className="text-[#f2d58a] italic not-italic">new favourite.</em></h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">Choose a category, search the menu, and add dishes to your order tray.</p>
          </div>

          <div className="space-y-4">
            <div className="max-w-lg mx-auto relative">
              <Search className="w-4 h-4 text-[#b9b4a8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search jollof, suya, amala, soup..." aria-label="Search menu dishes" className="w-full bg-[#0b0d09] border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#d8ad53]" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#b9b4a8] hover:text-white" aria-label="Clear search">Clear</button>}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2" aria-label="Menu categories">
              {CATEGORIES.map((category) => (
                <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} aria-pressed={selectedCategory === category.id} className={`px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${selectedCategory === category.id ? 'bg-[#d8ad53] text-[#090a08]' : 'bg-white/5 text-[#d8d2c4] hover:bg-white/10'}`}>
                  {category.num ? `${category.num} · ` : ''}{category.name}
                </button>
              ))}
            </div>
          </div>

          {categoriesToDisplay.map((category) => {
            const dishes = filteredDishes.filter((dish) => dish.category === category.id);
            if (!dishes.length) return null;
            return (
              <div key={category.id} className="pt-6 space-y-6">
                <div className="border-b border-[#d8ad53]/25 pb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {category.num && <span className="font-serif text-lg font-bold text-[#45a866]">{category.num}</span>}
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#f2d58a]">{category.name}</h3>
                  </div>
                  <span className="text-xs text-[#b9b4a8] shrink-0">{dishes.length} {dishes.length === 1 ? 'item' : 'items'}</span>
                </div>

                <div className="dish-grid">
                  {dishes.map((dish) => {
                    const isAdded = addedItemIds[dish.id];
                    return (
                      <article key={dish.id} className="dish-card">
                        <div className="dish-image-frame">
                          <img src={dish.image} alt={dish.name} className="dish-product-image" loading="lazy" onError={handleImageError} />
                          {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                          <span className="dish-price-badge">{dish.price}</span>
                        </div>
                        <div className="dish-content">
                          <div>
                            <h4 className="dish-name">{dish.name}</h4>
                            <p className="dish-desc">{dish.description}</p>
                          </div>
                          <div className="dish-footer">
                            {dish.isSolid ? (
                              <button onClick={() => onOpenSolidModal(dish)} className="dish-add-button">
                                <SlidersHorizontal className="w-3.5 h-3.5" /><span>Select &amp; Pair</span>
                              </button>
                            ) : (
                              <>
                                <button onClick={() => handleQuickAdd(dish)} className={`dish-add-button ${isAdded ? 'is-added' : ''}`}>
                                  {isAdded ? <><Check className="w-3.5 h-3.5" /><span>Added</span></> : <><Plus className="w-3.5 h-3.5" /><span>Add</span></>}
                                </button>
                                <a href={createWhatsAppUrl(`Hello Naija Pot, I would like to order ${dish.name} (${dish.price}).`)} target="_blank" rel="noopener noreferrer" className="dish-order-button">
                                  <span>Order</span><ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
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
            <div className="py-12 text-center space-y-3">
              <p className="text-sm text-[#b9b4a8]">No menu items match your search.</p>
              <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} className="text-xs text-[#d8ad53] underline font-bold uppercase tracking-wider">Reset filters</button>
            </div>
          )}
        </div>
      </section>

      <section id="menu-order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-24">
        <div className="p-6 sm:p-10 lg:p-12 bg-[#171a12] border border-[#d8ad53]/35 rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">READY TO ORDER?</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f6f0e4]">Let’s make it <em className="text-[#f2d58a] italic not-italic">delicious.</em></h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed max-w-lg">Ask about today’s availability, collection times and current prices. Add your favourites to the tray or send us a quick message.</p>
            <a href={createWhatsAppUrl("Hello Naija Pot, please send me today's menu and prices.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] text-xs font-bold uppercase tracking-wider px-5 py-3.5 shadow-md"><span>Ask for today’s menu</span><ArrowUpRight className="w-4 h-4" /></a>
          </div>
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#0f110c] rounded-xl border border-white/10 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#45a866]">EXPLORE MORE</p>
            <p className="text-xs text-[#b9b4a8]">Continue exploring Naija Pot’s kitchen and story.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => navigate('bakery')} className="flex items-center justify-center gap-2 rounded bg-[#19834b] px-3 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1f9e5b]">Bakery<ArrowRight className="w-3.5 h-3.5" /></button>
              <button onClick={() => navigate('specials')} className="flex items-center justify-center gap-2 rounded border border-[#d8ad53]/40 px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#f2d58a] hover:bg-[#d8ad53]/10">Specials<ArrowRight className="w-3.5 h-3.5" /></button>
              <button onClick={() => navigate('home')} className="sm:col-span-2 flex items-center justify-center gap-2 rounded border border-white/10 px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#d8d2c4] hover:bg-white/5">Back to home<ArrowRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
