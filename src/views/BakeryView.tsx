import React, { useState } from 'react';
import { CartItem, BakeryProduct, MenuCategoryId, PageView } from '../types';
import { BAKERY_PRODUCTS, DISHES, RESTAURANT_INFO, createWhatsAppUrl } from '../data/menuData';
import { ArrowUpRight, Plus, Check, Clock, Phone, MapPin, ArrowRight } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface BakeryViewProps {
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
  onNavigateToMenuCategory?: (category: MenuCategoryId) => void;
  onNavigate?: (page: PageView) => void;
}

const bakeryDishIds = [
  'meat-pie',
  'puff-puff',
  'sausage-roll',
  'fish-roll',
  'chicken-scotch-egg',
  'chin-chin',
  'plantain-chips',
];

const bakeryProducts: BakeryProduct[] = [
  ...DISHES.filter((dish) => bakeryDishIds.includes(dish.id)).map((dish, index) => ({
    id: dish.id,
    kicker: `${String(index + 1).padStart(2, '0')} · FRESH FROM OUR KITCHEN`,
    name: dish.name,
    description: dish.description,
    image: dish.image,
    tag: dish.tag || 'Bakery favourite',
    price: dish.price,
  })),
  ...BAKERY_PRODUCTS.filter((product) => product.id === 'mini-cake-loaves'),
];

export const BakeryView: React.FC<BakeryViewProps> = ({
  onAddToCart,
  onNavigateToMenuCategory,
  onNavigate,
}) => {
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const handleAddBakeryItem = (product: BakeryProduct) => {
    const numericPrice = product.price ? parseFloat(product.price.replace('£', '')) : 0;
    onAddToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      quantity: 1,
      image: product.image,
    });
    setAddedItemIds((previous) => ({ ...previous, [product.id]: true }));
    window.setTimeout(() => setAddedItemIds((previous) => ({ ...previous, [product.id]: false })), 1200);
  };

  const viewMenu = () => {
    if (onNavigateToMenuCategory) onNavigateToMenuCategory('bakery');
    else onNavigate?.('menu');
  };

  return (
    <div className="space-y-0">
      <section
        className="relative min-h-[24rem] sm:min-h-[29rem] bg-cover bg-center flex items-center py-14 sm:py-16"
        style={{ backgroundImage: `url(${getAssetUrl('assets/images/uploads/Meat-Pie.png')})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
              FROM OUR OVEN · WITH NAIJA LOVE
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Freshly baked.<br />
              <em className="text-[#f2d58a] italic not-italic">Made to feel like home.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed mb-6">
              Nigerian savoury pastries, golden snacks and sweet treats — freshly prepared with care.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#bakery-collection" className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-all shadow-md">
                Explore the bakery
              </a>
              <button onClick={viewMenu} className="bg-[#19834b] hover:bg-[#1f9e5b] text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-all shadow-md inline-flex items-center gap-2">
                <span>View full menu</span><ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a href="#bakery-order" className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-all">
                How to order
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">THE BAKERY COLLECTION</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              Savoury bites.<br /><em className="text-[#f2d58a] italic not-italic">Sweet moments.</em>
            </h2>
            <p className="text-sm text-[#b9b4a8] leading-relaxed max-w-xl">
              Browse our freshly prepared meat pies, puff puff, sausage rolls, fish rolls, Scotch eggs, chin chin, plantain chips and mini cake loaves. Bread is listed separately on our full menu.
            </p>
            <button onClick={viewMenu} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d8ad53] hover:text-[#f2d58a] border-b border-[#d8ad53]/50 pb-1">
              <span>Browse all menu categories</span><ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3] bg-[#181c14] flex items-center justify-center">
            <img
              src={getAssetUrl('assets/images/uploads/Meatpie-450x450.jpg')}
              alt="Freshly baked Nigerian meat pie"
              className="w-full h-full object-contain p-3"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5 pointer-events-none">
              <span className="text-xs font-serif font-bold text-[#f2d58a]">Fresh favourites · made with Naija love</span>
            </div>
          </div>
        </div>
      </section>

      <section id="bakery-collection" className="bg-[#12160f] py-14 sm:py-16 lg:py-24 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">BAKED & PREPARED WITH CARE</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4]">
              Fresh picks <em className="text-[#f2d58a] italic not-italic">from our bakery.</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
              Choose a favourite, add it to your order tray or message us to confirm availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {bakeryProducts.map((product) => {
              const isAdded = addedItemIds[product.id];
              return (
                <article key={product.id} className="bakery-product-card bg-[#181c14] rounded-xl overflow-hidden border border-white/5 hover:border-[#d8ad53]/40 shadow-lg flex flex-col">
                  <div className="relative aspect-square bg-[#20251b] overflow-hidden flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3" loading="lazy" onError={handleImageError} />
                    <span className="absolute top-3 left-3 max-w-[75%] bg-[#090a08]/85 text-[#f2d58a] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-md border border-[#d8ad53]/20">
                      {product.tag}
                    </span>
                    {product.price && <span className="absolute bottom-3 right-3 bg-[#19834b] text-white font-serif font-bold text-sm px-2.5 py-0.5 rounded shadow">{product.price}</span>}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase mb-1">{product.kicker}</p>
                      <h3 className="font-serif text-lg font-bold text-[#f6f0e4] mb-2">{product.name}</h3>
                      <p className="text-xs text-[#b9b4a8] leading-relaxed">{product.description}</p>
                    </div>
                    <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                      <button onClick={() => handleAddBakeryItem(product)} className={`flex-1 py-2.5 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${isAdded ? 'bg-[#19834b] text-white' : 'bg-[#22281c] hover:bg-[#2c3324] text-[#f2d58a] border border-[#d8ad53]/30'}`}>
                        {isAdded ? <><Check className="w-3.5 h-3.5" /><span>Added</span></> : <><Plus className="w-3.5 h-3.5" /><span>Add</span></>}
                      </button>
                      <a href={createWhatsAppUrl(`Hello Naija Pot, please confirm availability and price for ${product.name}.`)} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 px-3 rounded bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1">
                        <span>Enquire</span><ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="bakery-order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-24">
        <div className="p-6 sm:p-10 lg:p-12 bg-[#171a12] border border-[#d8ad53]/35 rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">PLANNING A PICK-UP OR BULK ORDER?</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f6f0e4]">Let’s make it <em className="text-[#f2d58a] italic not-italic">fresh for you.</em></h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed max-w-lg">Message us to confirm availability, collection times and current prices. For events and larger orders, please give us 24–48 hours notice.</p>
            <a href={createWhatsAppUrl('Hello Naija Pot, I would like to ask about your bakery menu.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-5 py-3 transition-all">
              <span>Ask about bakery availability</span><ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#0f110c] rounded-xl border border-white/10 space-y-3 text-xs text-[#b9b4a8]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#45a866] block">CONTACT &amp; VISIT</span>
            <div className="flex flex-wrap items-center gap-2 text-white font-bold text-sm"><span>WhatsApp:</span><a href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-[#f2d58a] hover:underline">{RESTAURANT_INFO.whatsappFormatted}</a></div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#d8ad53] shrink-0" /><a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:underline">Direct phone: {RESTAURANT_INFO.phone}</a></div>
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-[#d8ad53] shrink-0 mt-0.5" /><span>{RESTAURANT_INFO.address}</span></div>
            <div className="flex items-start gap-2"><Clock className="w-4 h-4 text-[#d8ad53] shrink-0 mt-0.5" /><span>{RESTAURANT_INFO.openingHoursDisplay}</span></div>
          </div>
        </div>
      </section>
    </div>
  );
};
