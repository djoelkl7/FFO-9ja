import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import { createWhatsAppUrl } from '../data/menuData';

const SLIDER_IMAGES = [
  {
    url: getAssetUrl('assets/images/uploads/Carting-Event1.JPG'),
    title: 'Wedding & Reception Catering',
  },
  {
    url: getAssetUrl('assets/images/uploads/Carting-Event2.JPG'),
    title: 'Corporate & Executive Events',
  },
  {
    url: getAssetUrl('assets/images/uploads/Carting-Event3.JPG'),
    title: 'Private Celebrations & Banquets',
  },
  {
    url: getAssetUrl('assets/images/uploads/Carting-Event4.JPG'),
    title: 'Spit Roast, Paella & Finger Food',
  },
  {
    url: getAssetUrl('assets/images/uploads/Carting-Event5.JPG'),
    title: 'Mobile Bars & Full Equipment Hire',
  },
];

interface CartingEventSliderProps {
  showInfoCard?: boolean;
}

export const CartingEventSlider: React.FC<CartingEventSliderProps> = ({ showInfoCard = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 3000); // 3 seconds interval requested by user
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  };

  return (
    <div className="w-full space-y-6">
      {/* 3-second auto-rotating slider */}
      <div
        className="relative h-72 sm:h-96 md:h-[440px] w-full rounded-2xl overflow-hidden border border-[#d8ad53]/35 shadow-2xl bg-[#0d100b] group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="Carting Event service showcase gallery"
      >
        {SLIDER_IMAGES.map((slide, idx) => (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#45a866] bg-[#090a08]/80 px-2.5 py-1 rounded border border-[#45a866]/30 mb-2 inline-block">
                  CATERING SERVICE GALLERY · 3s ROTATING
                </span>
                <p className="font-serif text-lg sm:text-2xl font-bold text-[#f2d58a] drop-shadow-md">
                  {slide.title}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-white/80 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                {idx + 1} / {SLIDER_IMAGES.length}
              </span>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#d8ad53] text-white hover:text-black flex items-center justify-center transition-all opacity-70 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#d8ad53] text-white hover:text-black flex items-center justify-center transition-all opacity-70 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDER_IMAGES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-[#d8ad53]' : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info Card with User's Exact Copy & Booking Button */}
      {showInfoCard && (
        <div className="bg-[#141710] border border-[#d8ad53]/35 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8ad53]/20 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#45a866]">
                FULL EVENT CATERING GROUP · MILTON KEYNES &amp; UK-WIDE
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#f6f0e4] mt-1">
                Naija Kitchen Pot caterers providing catering services for Weddings, Corporate/ Private Events and Funerals
              </h4>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
            Event Catering Group based in Milton Keynes provides a full range of catering services for all types of events including Private Events, Weddings, Corporate and Funeral catering, Mobile bars and Equipment Hire. We provide a huge range of delicious food including Canapes, Finger Food, Paella, Spit Roast and many more.
          </p>

          <div className="pt-2">
            <a
              href={createWhatsAppUrl('Hello Naija Pot, I would like to book Event Catering for an upcoming event.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Book Event Catering On WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
