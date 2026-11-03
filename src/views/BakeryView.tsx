import React, { useState } from 'react';
import { CartItem, BakeryProduct } from '../types';
import { BAKERY_PRODUCTS, RESTAURANT_INFO, createWhatsAppUrl } from '../data/menuData';
import { ArrowUpRight, Plus, Check, Clock, Phone, MapPin } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface BakeryViewProps {
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const BakeryView: React.FC<BakeryViewProps> = ({ onAddToCart }) => {
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const handleAddBakeryItem = (product: BakeryProduct) => {
    const numericPrice = product.price ? parseFloat(product.price.replace('£', '')) : 3.0;
    onAddToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      quantity: 1,
      image: product.image,
    });
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section
        className="relative h-96 sm:h-[460px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${getAssetUrl('assets/images/uploads/Bread-450x450.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
              FROM OUR OVEN · WITH NAIJA LOVE
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Freshly baked.
              <br />
              <em className="text-[#f2d58a] italic not-italic">Made to feel like home.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed mb-6">
              Golden pastries, soft Agege-style bread and sweet bakery treats — inspired by the aromas, memories and warmth of a Nigerian kitchen.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#bakery-collection"
                className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all shadow-md hover:-translate-y-0.5"
              >
                Explore the bakery
              </a>
              <a
                href="#bakery-order"
                className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all"
              >
                How to order
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Collection Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
              THE BAKERY COLLECTION
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              A little taste of
              <br />
              <em className="text-[#f2d58a] italic not-italic">something special.</em>
            </h2>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">
              From a savoury flaky meat pie on the go to warm Agege bread for the family table, our bakery range celebrates familiar Nigerian comfort with a fresh-from-the-oven feel.
            </p>
            <p className="text-xs text-[#b9b4a8] leading-relaxed italic border-l-2 border-[#d8ad53] pl-3 py-1">
              "Nothing brings back memories quite like the gentle sweetness of warm Agege bread paired with hot stew, butter or tea on a quiet morning."
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl relative h-80 sm:h-96">
            <img
              src={getAssetUrl('assets/images/uploads/Bread-450x450.jpg')}
              alt="Freshly baked Nigerian bread and pastries"
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <span className="text-xs font-serif font-bold text-[#f2d58a]">
                Fresh-baked inspiration from the Naija Pot kitchen
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="bakery-collection" className="bg-[#12160f] py-20 lg:py-28 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
              BAKED WITH CARE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4]">
              Meet the <em className="text-[#f2d58a] italic not-italic">bakery favourites.</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
              Made in small batches using premium flour and authentic methods. Enquire or add to your order tray.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BAKERY_PRODUCTS.map((product) => {
              const isAdded = addedItemIds[product.id];

              return (
                <article
                  key={product.id}
                  className="bakery-product-card bg-[#181c14] rounded-xl overflow-hidden border border-white/5 hover:border-[#d8ad53]/40 shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-56 bg-[#20251b] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                    <span className="absolute top-3 left-3 bg-[#090a08]/85 text-[#f2d58a] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow-md border border-[#d8ad53]/20">
                      {product.tag}
                    </span>
                    {product.price && (
                      <span className="absolute bottom-3 right-3 bg-[#19834b] text-white font-serif font-bold text-sm px-2.5 py-0.5 rounded shadow">
                        {product.price}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase mb-1">
                        {product.kicker}
                      </p>
                      <h3 className="font-serif text-lg font-bold text-[#f6f0e4] mb-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#b9b4a8] leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                      <button
                        onClick={() => handleAddBakeryItem(product)}
                        className={`flex-1 py-2 px-3 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isAdded
                            ? 'bg-[#19834b] text-white'
                            : 'bg-[#22281c] hover:bg-[#2c3324] text-[#f2d58a] border border-[#d8ad53]/30'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                      <a
                        href={createWhatsAppUrl(
                          `Hello Naija Pot, please confirm availability and price for ${product.name}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 shadow transition-all hover:-translate-y-0.5"
                      >
                        <span>Enquire</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="text-[11px] text-[#b9b4a8] text-center max-w-xl mx-auto">
            Agege bread is freshly baked on Sundays. For weekday family loaves and advance bulk catering, please message the kitchen in advance.
          </p>
        </div>
      </section>

      {/* Order & Contact Panel */}
      <section id="bakery-order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="p-8 sm:p-12 bg-[#171a12] border border-[#d8ad53]/35 rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
              PLANNING A PICK-UP OR BULK ORDER?
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f6f0e4]">
              Let’s make it <em className="text-[#f2d58a] italic not-italic">fresh for you.</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed max-w-lg">
              Send an enquiry to confirm what is currently baking, collection times and current prices. For church events, weddings, parties and large orders, please give us 24–48 hours notice.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 bg-[#0f110c] rounded-xl border border-white/10 space-y-3 text-xs text-[#b9b4a8]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#45a866] block">
              CONTACT & VISIT
            </span>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span>WhatsApp:</span>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f2d58a] hover:underline"
              >
                {RESTAURANT_INFO.whatsappFormatted}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#d8ad53]" />
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:underline">
                Direct phone: {RESTAURANT_INFO.phone}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#d8ad53] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#d8ad53] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.openingHoursDisplay}</span>
            </div>
            <div className="pt-2">
              <a
                href={createWhatsAppUrl(
                  'Hello Naija Pot, I would like to ask about your bakery items.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider py-3 rounded transition-all shadow"
              >
                <span>Send bakery enquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
