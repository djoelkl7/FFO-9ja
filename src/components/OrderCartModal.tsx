import React, { useState } from 'react';
import { CartItem } from '../types';
import { createWhatsAppUrl } from '../data/menuData';
import { X, Plus, Minus, Trash2, ArrowUpRight, ShoppingBag } from 'lucide-react';

interface OrderCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const OrderCartModal: React.FC<OrderCartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'collection' | 'delivery'>('collection');
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `Hello Naija Pot Kitchen & Grill Ltd, I'd like to place an order:\n\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. ${item.quantity}x ${item.name}`;
      if (item.customization) {
        msg += ` (${item.customization})`;
      }
      msg += ` — £${(item.price * item.quantity).toFixed(2)}\n`;
    });

    msg += `\nEstimated Total: £${totalAmount.toFixed(2)}`;
    msg += `\nOrder Type: ${orderType === 'delivery' ? 'Local Delivery (Milton Keynes area)' : 'Collection / Takeaway'}`;
    if (customerName.trim()) {
      msg += `\nName: ${customerName.trim()}`;
    }
    if (orderType === 'delivery' && deliveryAddress.trim()) {
      msg += `\nAddress: ${deliveryAddress.trim()}`;
    }
    if (notes.trim()) {
      msg += `\nSpecial Notes: ${notes.trim()}`;
    }

    return msg;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-rise">
      <div className="relative w-full max-w-xl bg-[#141711] border border-[#d8ad53]/40 rounded-xl overflow-hidden shadow-2xl text-[#f6f0e4] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0f110c] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#d8ad53]/50 shrink-0 bg-black">
              <img
                src="./logo.png"
                alt="Naija Pot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#f2d58a] leading-tight">
                Your Order Tray
              </h2>
              <span className="text-[10px] text-[#b9b4a8] uppercase tracking-wider block">
                Naija Pot Kitchen
              </span>
            </div>
            <span className="text-xs bg-[#19834b] text-white px-2 py-0.5 rounded-full font-bold ml-1">
              {cart.reduce((count, i) => count + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-[#f2d58a] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#b9b4a8]/30 mx-auto" />
              <p className="text-[#b9b4a8] text-sm">Your order tray is currently empty.</p>
              <button
                onClick={onClose}
                className="inline-block bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold px-4 py-2 uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3 bg-[#191d15] rounded-lg border border-white/5 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-[#f6f0e4]">{item.name}</h4>
                      {item.customization && (
                        <p className="text-xs text-[#45a866] mt-0.5 font-medium">
                          {item.customization}
                        </p>
                      )}
                      <p className="text-xs text-[#d8ad53] font-bold mt-1">
                        £{(item.price * item.quantity).toFixed(2)}{' '}
                        <span className="text-[10px] text-[#b9b4a8] font-normal">
                          (£{item.price.toFixed(2)} each)
                        </span>
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-white/20 rounded bg-[#10130d]">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1 hover:text-[#d8ad53] text-[#b9b4a8] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1 hover:text-[#d8ad53] text-[#b9b4a8] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="p-1.5 text-[#b9b4a8] hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('collection')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center border transition-all cursor-pointer ${
                      orderType === 'collection'
                        ? 'border-[#d8ad53] bg-[#d8ad53]/15 text-[#f2d58a]'
                        : 'border-white/10 bg-[#1b2017] text-[#b9b4a8]'
                    }`}
                  >
                    Collection / Takeaway
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center border transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'border-[#d8ad53] bg-[#d8ad53]/15 text-[#f2d58a]'
                        : 'border-white/10 bg-[#1b2017] text-[#b9b4a8]'
                    }`}
                  >
                    Local MK Delivery
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#b9b4a8] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Tunde"
                      className="w-full bg-[#1b2017] border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
                    />
                  </div>
                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#b9b4a8] mb-1">
                        Delivery Postcode / Street
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. MK13 area"
                        className="w-full bg-[#1b2017] border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#b9b4a8] mb-1">
                    Special Instructions / Allergies (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Mild pepper, extra shaki, etc."
                    className="w-full bg-[#1b2017] border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#0f110c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center justify-between w-full sm:w-auto sm:block">
              <span className="text-[11px] uppercase tracking-wider text-[#b9b4a8] block">
                Estimated Total
              </span>
              <span className="font-serif font-bold text-2xl text-[#f2d58a]">
                £{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClearCart}
                className="px-3 py-2.5 rounded text-xs text-[#b9b4a8] hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                Clear
              </button>
              <a
                href={createWhatsAppUrl(generateWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded transition-all shadow-lg hover:-translate-y-0.5"
              >
                <span>Send Order via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
