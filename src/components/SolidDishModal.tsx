import React, { useState, useEffect } from 'react';
import { Dish, CartItem } from '../types';
import { SOUP_OPTIONS, PROTEIN_OPTIONS, EXTRA_OPTIONS, createWhatsAppUrl } from '../data/menuData';
import { X, Check, Plus, ArrowUpRight } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

interface SolidDishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'cartId'>) => void;
}

export const SolidDishModal: React.FC<SolidDishModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [selectedSoup, setSelectedSoup] = useState<string>('');
  const [selectedProtein, setSelectedProtein] = useState<string>('');
  const [selectedExtra, setSelectedExtra] = useState<string>('none');
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (dish) {
      setSelectedSoup('Efo Riro'); // friendly default
      setSelectedProtein('Peppered Fried Fish'); // friendly default
      setSelectedExtra('none');
      setAddedSuccess(false);
    }
  }, [dish]);

  if (!dish) return null;

  const basePrice = dish.numericPrice || 18.0;
  const extraObj = EXTRA_OPTIONS.find((e) => e.id === selectedExtra) || EXTRA_OPTIONS[0];
  const totalPrice = basePrice + extraObj.cost;

  const isValid = selectedSoup.length > 0 && selectedProtein.length > 0;

  const whatsAppMessage = `Hello NAIJA-POT, I'd like to order ${dish.name} with ${selectedSoup}, ${selectedProtein}${
    selectedExtra !== 'none' ? ` and ${selectedExtra}` : ''
  } (£${totalPrice.toFixed(2)})`;

  const handleAddToTray = () => {
    if (!isValid) return;
    onAddToCart({
      id: dish.id,
      name: dish.name,
      price: totalPrice,
      quantity: 1,
      customization: `${selectedSoup} · ${selectedProtein}${
        selectedExtra !== 'none' ? ` · ${selectedExtra} (+£${extraObj.cost})` : ''
      }`,
      image: dish.image,
    });
    setAddedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-rise">
      <div className="relative w-full max-w-lg bg-[#141711] border border-[#d8ad53]/40 rounded-xl overflow-hidden shadow-2xl text-[#f6f0e4] max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="relative h-44 sm:h-52 bg-[#1a1e16] overflow-hidden shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141711] via-[#141711]/40 to-transparent" />
          {/* Official Logo Brand Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#090a08]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#d8ad53]/40 shadow-lg">
            <img
              src={getAssetUrl('logo.png')}
              alt="Naija Pot"
              className="w-5 h-5 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="text-[10px] font-bold text-[#f2d58a] tracking-wider uppercase">
              Naija Pot
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-[#f2d58a] transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-5 right-5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#45a866] bg-[#090a08]/80 px-2 py-0.5 rounded">
              Swallow & Soup Pairing
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#f2d58a] mt-1 leading-tight">
              {dish.name}
            </h3>
            <p className="text-xs text-[#b9b4a8]">Choose your soup and protein combination.</p>
          </div>
        </div>

        {/* Modal Body / Scrollable options */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Step 1: Soup Selection */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-5 rounded-full bg-[#d8ad53] text-[#090a08] font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="font-semibold text-[#f6f0e4] text-xs uppercase tracking-wider">
                Choose your soup <span className="text-[#d8ad53]">*</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SOUP_OPTIONS.map((soup) => {
                const isSelected = selectedSoup === soup;
                return (
                  <button
                    key={soup}
                    type="button"
                    onClick={() => setSelectedSoup(soup)}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#d8ad53] bg-[#d8ad53]/15 text-[#f2d58a] font-bold'
                        : 'border-white/10 bg-[#1b2017] hover:border-[#d8ad53]/50 text-[#e1ddd3]'
                    }`}
                  >
                    <span>{soup}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#d8ad53]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Protein Selection */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-5 rounded-full bg-[#d8ad53] text-[#090a08] font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="font-semibold text-[#f6f0e4] text-xs uppercase tracking-wider">
                Choose your protein <span className="text-[#d8ad53]">*</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PROTEIN_OPTIONS.map((protein) => {
                const isSelected = selectedProtein === protein;
                return (
                  <button
                    key={protein}
                    type="button"
                    onClick={() => setSelectedProtein(protein)}
                    className={`py-2.5 px-3 rounded-lg border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#d8ad53] bg-[#d8ad53]/15 text-[#f2d58a] font-bold'
                        : 'border-white/10 bg-[#1b2017] hover:border-[#d8ad53]/50 text-[#e1ddd3]'
                    }`}
                  >
                    <span>{protein}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#d8ad53]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Optional Extras */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-5 rounded-full bg-[#45a866] text-[#090a08] font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span className="font-semibold text-[#f6f0e4] text-xs uppercase tracking-wider">
                Add an extra <span className="text-[#b9b4a8] font-normal text-[11px]">(Optional)</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {EXTRA_OPTIONS.map((extra) => {
                const isSelected = selectedExtra === extra.id;
                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => setSelectedExtra(extra.id)}
                    className={`py-2.5 px-2 rounded-lg border text-xs text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'border-[#45a866] bg-[#45a866]/15 text-[#45a866] font-bold'
                        : 'border-white/10 bg-[#1b2017] hover:border-white/30 text-[#e1ddd3]'
                    }`}
                  >
                    <span className="leading-tight">{extra.label}</span>
                    {extra.cost > 0 ? (
                      <span className="text-[11px] text-[#f2d58a] font-semibold">+£{extra.cost}</span>
                    ) : (
                      <span className="text-[11px] text-[#b9b4a8]">Included</span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#b9b4a8] mt-2 italic">
              Adding extra meat or fish is +£3.00 (total £{totalPrice.toFixed(2)}).
            </p>
          </div>
        </div>

        {/* Modal Footer / Price & Order Buttons */}
        <div className="p-4 sm:p-5 bg-[#0f110c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#b9b4a8] block">Total</span>
            <span className="font-serif font-bold text-2xl text-[#f2d58a]">
              £{totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Add to Tray Button */}
            <button
              onClick={handleAddToTray}
              disabled={!isValid}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                addedSuccess
                  ? 'bg-[#19834b] text-white'
                  : 'bg-[#23291d] hover:bg-[#2d3425] text-[#f2d58a] border border-[#d8ad53]/40'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Tray</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Order Button */}
            <a
              href={createWhatsAppUrl(whatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                isValid
                  ? 'bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08]'
                  : 'bg-white/10 text-white/40 pointer-events-none'
              }`}
            >
              <span>Order on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
