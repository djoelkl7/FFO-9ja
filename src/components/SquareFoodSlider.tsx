import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, MessageCircle, Calendar } from 'lucide-react';
import { PageView } from '../types';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import { createWhatsAppUrl } from '../data/menuData';

export interface CateringSlide {
  id: string;
  name: string;
  category: string;
  tag: string;
  subtitle: string;
  image: string;
  description: string;
}

export const CATERING_SLIDES: CateringSlide[] = [
  {
    id: 'catering-main',
    name: 'Event Catering & Banquets',
    category: 'Full Catering Group',
    tag: 'Weddings & Corporate',
    subtitle: 'Milton Keynes & UK-Wide',
    image: getAssetUrl('assets/images/uploads/Carting-Event.JPG'),
    description: 'Catering services for Weddings, Corporate/Private Events and Funerals.',
  },
  {
    id: 'catering-weddings',
    name: 'Wedding & Reception Feasts',
    category: 'Event Catering',
    tag: 'Luxury Weddings',
    subtitle: 'Lavish Table & Buffet Service',
    image: getAssetUrl('assets/images/uploads/Carting-Event1.JPG'),
    description: 'Bespoke Nigerian and fusion menus crafted for memorable celebration banquets.',
  },
  {
    id: 'catering-corporate',
    name: 'Corporate & Executive Events',
    category: 'Event Catering',
    tag: 'Corporate Banquets',
    subtitle: 'Professional Live Setup',
    image: getAssetUrl('assets/images/uploads/Carting-Event2.JPG'),
    description: 'Hot chafing buffets, premium platters and refined hospitality for company events.',
  },
  {
    id: 'catering-parties',
    name: 'Private Celebrations & Banquets',
    category: 'Event Catering',
    tag: 'Private Gatherings',
    subtitle: 'Birthdays & Family Feasts',
    image: getAssetUrl('assets/images/uploads/Carting-Event3.JPG'),
    description: 'Hearty party jollof, tender assorted meats, rich soups and celebration platters.',
  },
  {
    id: 'catering-live-food',
    name: 'Spit Roast, Paella & Finger Food',
    category: 'Event Catering',
    tag: 'Live Outdoor Cooking',
    subtitle: 'Canapes & Small Chops',
    image: getAssetUrl('assets/images/uploads/Carting-Event4.JPG'),
    description: 'Huge range of delicious food including Canapes, Finger Food, Paella and Spit Roast.',
  },
  {
    id: 'catering-mobile-bars',
    name: 'Mobile Bars & Equipment Hire',
    category: 'Event Catering',
    tag: 'Full Equipment Hire',
    subtitle: 'Chafing Dishes & Bar Hire',
    image: getAssetUrl('assets/images/uploads/Carting-Event5.JPG'),
    description: 'Mobile bars, chafing dishes, equipment rental and professional event staffing.',
  },
];

interface SquareFoodSliderProps {
  onNavigate?: (page: PageView) => void;
}

export const SquareFoodSlider: React.FC<SquareFoodSliderProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timerTweenRef = useRef<gsap.core.Tween | null>(null);

  const totalSlides = CATERING_SLIDES.length;

  // Transition to specific slide with synchronized GSAP animation
  const transitionToSlide = useCallback((nextIndex: number) => {
    if (!containerRef.current || !activeSlideRef.current) return;

    const currentSlide = activeSlideRef.current;
    const textEl = textContentRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
      },
    });

    // Zoom out slide slightly on exit
    tl.to(currentSlide, {
      scale: 0.95,
      opacity: 0.5,
      duration: 0.25,
      ease: 'power2.in',
    });

    if (textEl) {
      tl.to(
        textEl,
        {
          y: -10,
          opacity: 0,
          duration: 0.2,
          ease: 'power1.in',
        },
        0.05
      );
    }
  }, []);

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % totalSlides;
    transitionToSlide(next);
  }, [currentIndex, totalSlides, transitionToSlide]);

  const handlePrev = useCallback(() => {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    transitionToSlide(prev);
  }, [currentIndex, totalSlides, transitionToSlide]);

  // Entrance and 3-second auto-cycle animation
  useEffect(() => {
    if (!activeSlideRef.current) return;

    const slideEl = activeSlideRef.current;
    const textEl = textContentRef.current;
    const progressEl = progressBarRef.current;

    // Entrance animation with punchy shape pop-out feedback
    const enterTl = gsap.timeline();
    enterTl
      .fromTo(
        slideEl,
        { scale: 0.88, opacity: 0.6 },
        { scale: 1.05, opacity: 1, duration: 0.38, ease: 'back.out(1.8)' }
      )
      .to(slideEl, { scale: 1, duration: 0.22, ease: 'power2.out' });

    if (textEl) {
      gsap.fromTo(
        textEl,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    }

    // 3-second progress timer as requested ("in 3sec animation")
    if (progressEl) {
      if (timerTweenRef.current) {
        timerTweenRef.current.kill();
      }

      gsap.set(progressEl, { scaleX: 0, transformOrigin: 'left center' });

      if (!isPaused) {
        timerTweenRef.current = gsap.to(progressEl, {
          scaleX: 1,
          duration: 3.0, // 3-second interval
          ease: 'none',
          onComplete: () => {
            handleNext();
          },
        });
      }
    }

    return () => {
      if (timerTweenRef.current) {
        timerTweenRef.current.kill();
      }
    };
  }, [currentIndex, isPaused, handleNext]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerTweenRef.current) {
      timerTweenRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (timerTweenRef.current) {
      timerTweenRef.current.play();
    }
  };

  const currentSlide = CATERING_SLIDES[currentIndex];

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: '4 / 5' }}
      className="relative w-full max-w-[420px] mx-auto aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#d8ad53]/45 bg-[#0f120c] shadow-[0_24px_60px_rgba(0,0,0,0.85)] group select-none transition-all duration-300 hover:border-[#d8ad53]"
      aria-label="Event Catering Shape Pop-Out Showcase Slider"
      role="region"
    >
      {/* 3-Second Auto-change Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/40 z-30 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#19834b] via-[#45a866] to-[#d8ad53]"
        />
      </div>

      {/* Main Slide Image with 3-Second Shape Pop-Out Animation */}
      <div className="relative w-full h-full overflow-hidden bg-black">
        <div
          ref={activeSlideRef}
          className="w-full h-full relative overflow-hidden shape-pop-out-animation"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={handleImageError}
          />
        </div>
      </div>

      {/* Gradient Shading Overlays for Visual Clarity */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a08] via-[#090a08]/45 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10" />

      {/* Top Floating Header: EVENT CATERING Badge & 01 / 06 Counter */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#090a08]/90 backdrop-blur-md border border-[#d8ad53]/45 px-3 py-1.5 rounded-full shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#20c76a] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-[#f2d58a]">
            EVENT CATERING
          </span>
        </div>

        {/* Slide Counter (e.g. 01 / 06) */}
        <div className="bg-[#090a08]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold text-[#b9b4a8] shadow">
          <span className="text-[#d8ad53]">0{currentIndex + 1}</span> / 0{totalSlides}
        </div>
      </div>

      {/* Responsive Left / Right Navigation Controls */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#090a08]/85 hover:bg-[#d8ad53] border border-[#d8ad53]/40 text-[#f2d58a] hover:text-[#090a08] flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
        aria-label="Previous event catering slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#090a08]/85 hover:bg-[#d8ad53] border border-[#d8ad53]/40 text-[#f2d58a] hover:text-[#090a08] flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
        aria-label="Next event catering slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Content Area with Slide Details */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6 space-y-3">
        <div ref={textContentRef} className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#19834b] text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded shadow">
              {currentSlide.tag}
            </span>
            <span className="text-[11px] font-semibold text-[#f2d58a] font-serif">
              {currentSlide.subtitle}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f6f0e4] leading-tight drop-shadow-md">
            {currentSlide.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#e1ddd3]/90 line-clamp-2 leading-relaxed">
            {currentSlide.description}
          </p>
        </div>

        {/* Footer Bar: Responsive Dots Navigation & Action Buttons */}
        <div className="pt-2 flex items-center justify-between border-t border-white/10 gap-3">
          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5" aria-label="Event slide indicators">
            {CATERING_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => transitionToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    isActive ? 'w-6 bg-[#d8ad53]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to catering slide ${idx + 1}: ${slide.name}`}
                />
              );
            })}
          </div>

          {/* Quick Event Booking / Navigation Links */}
          <div className="flex items-center gap-2">
            <a
              href={createWhatsAppUrl(`Hello Naija Pot, I would like to book Event Catering for ${currentSlide.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Book Event</span>
            </a>

            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  onNavigate('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#d8ad53] hover:text-[#f2d58a] transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Menu</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gold Signature Corner Stamp */}
      <span className="absolute bottom-0 right-0 bg-[#d8ad53] text-[#090a08] text-[9px] font-bold tracking-widest uppercase px-3 py-1 z-20 shadow-md">
        RATIO 4:5 · SHAPE POP-OUT
      </span>
    </div>
  );
};
