import React, { useState, useMemo, useEffect } from 'react';
import { Dish, MenuCategoryId, CartItem } from '../types';
import { DISHES, CATEGORIES, createWhatsAppUrl } from '../data/menuData';
import { Search, ArrowUpRight, Plus, SlidersHorizontal, Check } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface MenuViewProps {
  initialCategory?: MenuCategoryId;
  onOpenSolidModal: (dish: Dish) => void;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const MenuView: React.FC<MenuViewProps> = ({
  initialCategory,
  onOpenSolidModal,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>(
    initialCategory || 'all'
  );

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (dish: Dish) => {
    onAddToCart({
      id: dish.id,
      name: dish.name,
      price: dish.numericPrice,
      quantity: 1,
      image: dish.image,
    });
    setAddedItemIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchesCategory =
        selectedCategory === 'all'
          ? dish.category !== 'bakery'
          : dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Group dishes by category when "all" is selected (starting with 01 The Grill Hub; Bakery displays when clicked)
  const categoriesToDisplay = useMemo(() => {
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);
      return cat ? [cat] : [];
    }
    return CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'bakery');
  }, [selectedCategory]);

  return (
    <div className="space-y-0">
      {/* Page Hero */}
      <section
        className="relative h-96 sm:h-[440px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${getAssetUrl('assets/images/uploads/Jollof-Rice-450x450.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
              FRESHLY PREPARED · FULL OF FLAVOUR
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Discover the
              <br />
              <em className="text-[#f2d58a] italic not-italic">Naija Pot menu.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed">
              From traditional swallows and rich soups to smokey suya and crowd-pleasing party rice, every plate brings you the warmth of home.
            </p>
          </div>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        {/* Intro heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
            WHAT ARE YOU CRAVING?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f6f0e4]">
            Good food for <em className="text-[#f2d58a] italic not-italic">every mood.</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
            Filter by category or search your favourite dishes. Tap on swallows to customize your soup and protein pairings.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="space-y-4">
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#b9b4a8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jollof, suya, amala, soup, pastry..."
              className="w-full bg-[#141711] border border-white/10 hover:border-[#d8ad53]/40 focus:border-[#d8ad53] rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#b9b4a8] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Desktop Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d8ad53] text-[#090a08] shadow-md font-bold'
                      : 'bg-[#141711] text-[#b9b4a8] hover:text-white hover:border-[#d8ad53]/40 border border-white/5'
                  }`}
                >
                  {cat.num ? `${cat.num} · ` : ''}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories and Dish Grids */}
        {categoriesToDisplay.map((cat) => {
          const categoryDishes = filteredDishes.filter((d) => d.category === cat.id);
          if (categoryDishes.length === 0) return null;

          return (
            <div key={cat.id} className="pt-8 space-y-6">
              {/* Category Header with Num */}
              <div className="border-b border-[#d8ad53]/25 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {cat.num && (
                    <span className="font-serif text-lg font-bold text-[#45a866]">
                      {cat.num}
                    </span>
                  )}
                  <h3 className="font-serif text-2xl font-semibold text-[#f2d58a]">
                    {cat.name}
                  </h3>
                </div>
                <span className="text-xs text-[#b9b4a8]">
                  {categoryDishes.length} {categoryDishes.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Grid of Dishes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryDishes.map((dish) => {
                  const isAdded = addedItemIds[dish.id];

                  return (
                    <article
                      key={dish.id}
                      className="dish-card bg-[#141711] rounded-xl overflow-hidden border border-white/5 hover:border-[#d8ad53]/40 shadow-lg flex flex-col justify-between"
                    >
                      {/* Image + Tag */}
                      <div className="relative h-52 bg-[#1b2017] overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                        {dish.tag && (
                          <span
                            className={`absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-md ${
                              dish.tag === 'Spicy'
                                ? 'bg-red-600/90 text-white'
                                : dish.tag === 'Bestseller' || dish.tag === 'Iconic'
                                ? 'bg-[#d8ad53] text-[#090a08]'
                                : dish.tag === 'Choose & Pair'
                                ? 'bg-[#19834b] text-white'
                                : 'bg-[#090a08]/85 text-[#f2d58a]'
                            }`}
                          >
                            {dish.tag}
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 bg-[#090a08]/85 backdrop-blur-sm text-[#f2d58a] font-serif font-bold text-sm px-2.5 py-1 rounded border border-[#d8ad53]/20">
                          {dish.price}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-[#f6f0e4] leading-snug mb-1.5">
                            {dish.name}
                          </h4>
                          <p className="text-xs text-[#b9b4a8] leading-relaxed line-clamp-3">
                            {dish.description}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                          {dish.isSolid ? (
                            <button
                              onClick={() => onOpenSolidModal(dish)}
                              className="w-full flex items-center justify-center gap-1.5 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold py-2.5 px-3 rounded uppercase tracking-wider transition-all shadow hover:-translate-y-0.5 cursor-pointer"
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5" />
                              <span>Select & Pair</span>
                            </button>
                          ) : (
                            <>
                              {/* Quick Add to Tray */}
                              <button
                                onClick={() => handleQuickAdd(dish)}
                                className={`flex items-center justify-center gap-1 py-2 px-3 rounded text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                                  isAdded
                                    ? 'bg-[#19834b] text-white flex-1'
                                    : 'bg-[#1e2319] hover:bg-[#283021] text-[#f2d58a] border border-[#d8ad53]/30 flex-1'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Added!</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                  </>
                                )}
                              </button>

                              {/* WhatsApp Order Link */}
                              <a
                                href={createWhatsAppUrl(
                                  `Hello NAIJA-POT, I'd like to order ${dish.name} (${dish.price})`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] py-2 px-3 rounded text-xs font-bold tracking-wider uppercase transition-all shadow hover:-translate-y-0.5 flex-1"
                              >
                                <span>Order</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
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
          <div className="py-16 text-center space-y-3">
            <p className="text-base text-[#b9b4a8]">No dishes found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#d8ad53] underline font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Ready to order banner */}
        <div className="p-8 sm:p-10 bg-[#171a12] border border-[#d8ad53]/35 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase">
              READY TO ORDER?
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f6f0e4]">
              Let’s get something <em className="text-[#f2d58a] italic not-italic">delicious cooking.</em>
            </h3>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed max-w-lg">
              Send us a direct message for today’s soups, fresh swallows, portion choices, and instant collection or local delivery in Milton Keynes.
            </p>
          </div>
          <div>
            <a
              href={createWhatsAppUrl("Hello Naija Pot, please send me today's menu and prices.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold uppercase tracking-wider px-6 py-3.5 shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>Get today’s menu</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
