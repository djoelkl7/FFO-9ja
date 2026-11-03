import React, { useState, useEffect, useRef } from 'react';
import { PageView } from '../types';
import { HERO_SLIDES, createWhatsAppUrl } from '../data/menuData';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { handleImageError } from '../utils/assetHelper';

interface HeroSliderProps {
  onNavigate: (page: PageView) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  return (
    <section
      className="relative h-[580px] sm:h-[680px] lg:h-[720px] overflow-hidden bg-[#15150f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Nigerian Dishes Carousel"
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover absolute inset-0"
              onError={handleImageError}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/25" />

            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center">
              <div className="max-w-2xl py-12">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4 sm:mb-5">
                  {slide.eyebrow}
                </p>
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f6f0e4] mb-5">
                  {slide.title}
                  <br />
                  <em className="text-[#f2d58a] not-italic italic font-normal">{slide.italic}</em>
                </h1>
                <p className="text-sm sm:text-base text-[#e1ddd3] max-w-lg mb-8 leading-relaxed">
                  {slide.desc}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => onNavigate(slide.actionPrimary.target as PageView)}
                    className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
                  >
                    {slide.actionPrimary.label}
                  </button>

                  {slide.actionSecondary.isExternal ? (
                    <a
                      href={createWhatsAppUrl("Hello Naija Pot, I'd like to order.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all inline-flex items-center gap-1.5"
                    >
                      <span>{slide.actionSecondary.label}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate(slide.actionSecondary.target as PageView)}
                      className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all cursor-pointer"
                    >
                      {slide.actionSecondary.label}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slider Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-6 sm:left-12 lg:left-16 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 rounded transition-all cursor-pointer ${
              currentSlide === i ? 'w-10 bg-[#d8ad53]' : 'w-6 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Note badge */}
      <div className="hidden sm:flex items-center gap-3 absolute bottom-6 right-8 lg:right-16 z-20 text-[10px] tracking-widest text-[#e8dfce]/80 uppercase">
        <span className="w-8 h-[1px] bg-[#d8ad53]" />
        <span>AUTHENTIC · GENEROUS · UNFORGETTABLE</span>
      </div>
    </section>
  );
};
