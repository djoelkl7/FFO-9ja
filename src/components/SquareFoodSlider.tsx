import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { PageView } from '../types';

export interface FoodSlide {
  id: string;
  name: string;
  category: string;
  tag: string;
  price: string;
  image: string;
  description: string;
}

export const SLIDER_DISHES: FoodSlide[] = [
  {
    id: 'jollof-assorted',
    name: 'Party Jollof & Assorted Meat',
    category: 'Rice & Specials',
    tag: 'Iconic Home Taste',
    price: '£17.00',
    image: './assets/images/uploads/Jollof-with-assorted-meat-450x450.jpg',
    description: 'Smokey party jollof with fried plantain and tender assorted meat.',
  },
  {
    id: 'suya-beef',
    name: 'Charcoal Suya Skewers',
    category: 'From The Grill',
    tag: 'Smokey & Spicy',
    price: '£15.00',
    image: './assets/images/uploads/Suya-meat-450x450.jpg',
    description: 'Tender beef grilled over hot charcoal with northern yaji spice.',
  },
  {
    id: 'amala-swallow',
    name: 'Yam Powder (Amala) & Soup',
    category: 'Solid Dishes',
    tag: 'Traditional Classic',
    price: '£18.00',
    image: './assets/images/uploads/Amala-450x450.jpg',
    description: 'Smooth, steaming amala paired with rich Efo Riro or Ogbono.',
  },
  {
    id: 'naija-meatpie',
    name: 'Golden Naija Meat Pie',
    category: 'Bakery Treats',
    tag: 'Fresh From Oven',
    price: '£2.50',
    image: './assets/images/uploads/Meatpie-450x450.jpg',
    description: 'Buttery flaky pastry filled with seasoned minced meat & potato.',
  },
  {
    id: 'asun-spicy-goat',
    name: 'Hot & Spicy Goat (Asun)',
    category: 'Grills Corner',
    tag: 'Party Favourite',
    price: '£18.00',
    image: './assets/images/uploads/Asun-450x450.jpg',
    description: 'Fire-grilled goat meat diced and tossed in scotch bonnet peppers.',
  },
];

interface SquareFoodSliderProps {
  onNavigate?: (page: PageView) => void;
}

export const SquareFoodSlider: React.FC<SquareFoodSliderProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const slidesWrapperRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timerTweenRef = useRef<gsap.core.Tween | null>(null);

  const totalSlides = SLIDER_DISHES.length;

  // Animate slide transition with GSAP
  const transitionToSlide = useCallback((nextIndex: number) => {
    if (!containerRef.current || !activeSlideRef.current) return;

    const currentSlide = activeSlideRef.current;
    const textEl = textContentRef.current;

    // Timeline for coordinated slide and text transition
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
      },
    });

    // 1. Zoom out current slide and fade slightly
    tl.to(currentSlide, {
      scale: 0.94,
      opacity: 0.4,
      duration: 0.35,
      ease: 'power2.in',
    });

    // 2. Animate out current text
    if (textEl) {
      tl.to(
        textEl,
        {
          y: -15,
          opacity: 0,
          duration: 0.25,
          ease: 'power1.in',
        },
        0.1
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

  // Entrance animation when currentIndex changes
  useEffect(() => {
    if (!activeSlideRef.current) return;

    const slideEl = activeSlideRef.current;
    const textEl = textContentRef.current;
    const progressEl = progressBarRef.current;

    // Entrance animation
    gsap.fromTo(
      slideEl,
      { scale: 1.08, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }
    );

    if (textEl) {
      gsap.fromTo(
        textEl,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.15 }
      );
    }

    // Reset and start progress bar animation (4.5 seconds duration)
    if (progressEl) {
      if (timerTweenRef.current) {
        timerTweenRef.current.kill();
      }

      gsap.set(progressEl, { scaleX: 0, transformOrigin: 'left center' });

      if (!isPaused) {
        timerTweenRef.current = gsap.to(progressEl, {
          scaleX: 1,
          duration: 4.5,
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

  // Handle pause/resume
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

  const currentDish = SLIDER_DISHES[currentIndex];

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[440px] mx-auto aspect-square rounded-2xl overflow-hidden border-2 border-[#d8ad53]/40 bg-[#12150f] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group select-none"
      aria-label="Naija Pot Signature Dishes Slider"
    >
      {/* Top progress line indicating time to next slide */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
        <div ref={progressBarRef} className="h-full bg-gradient-to-r from-[#19834b] to-[#d8ad53]" />
      </div>

      {/* Main Slide Image */}
      <div ref={slidesWrapperRef} className="relative w-full h-full overflow-hidden">
        <div ref={activeSlideRef} className="w-full h-full relative">
          <img
            src={currentDish.image}
            alt={currentDish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                './assets/images/uploads/Jollof-with-assorted-meat-450x450.jpg';
            }}
          />
        </div>
      </div>

      {/* Gradient Shading & Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a08] via-[#090a08]/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none z-10" />

      {/* Top Floating Badges: Official Logo Watermark & Slide Counter */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Subtle Brand Crest Badge */}
        <div className="flex items-center gap-2 bg-[#090a08]/85 backdrop-blur-md border border-[#d8ad53]/40 px-2.5 py-1 rounded-full shadow-lg">
          <img
            src="./logo.png"
            alt="Naija Pot Seal"
            className="w-5 h-5 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#f2d58a]">
            Naija Pot Favourites
          </span>
        </div>

        {/* Slide Counter (e.g. 01 / 05) */}
        <div className="bg-[#090a08]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#b9b4a8] shadow">
          <span className="text-[#d8ad53]">0{currentIndex + 1}</span> / 0{totalSlides}
        </div>
      </div>

      {/* Left / Right Interactive Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#090a08]/80 hover:bg-[#d8ad53] border border-[#d8ad53]/40 text-[#f2d58a] hover:text-[#090a08] flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
        aria-label="Previous food photo"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#090a08]/80 hover:bg-[#d8ad53] border border-[#d8ad53]/40 text-[#f2d58a] hover:text-[#090a08] flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
        aria-label="Next food photo"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Content Area with GSAP Text Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 space-y-2">
        <div ref={textContentRef} className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#19834b] text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow">
              {currentDish.tag}
            </span>
            <span className="text-[11px] font-semibold text-[#f2d58a] font-serif">
              {currentDish.price}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f6f0e4] leading-tight drop-shadow-md">
            {currentDish.name}
          </h3>

          <p className="text-xs text-[#e1ddd3]/90 line-clamp-1 text-shadow">
            {currentDish.description}
          </p>
        </div>

        {/* Footer Bar: 5 Dot Navigation & Explore CTA */}
        <div className="pt-2 flex items-center justify-between border-t border-white/10">
          {/* 5 Indicators */}
          <div className="flex items-center gap-1.5">
            {SLIDER_DISHES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => transitionToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    isActive ? 'w-6 bg-[#d8ad53]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.name}`}
                />
              );
            })}
          </div>

          {/* Quick Menu Action */}
          {onNavigate && (
            <button
              onClick={() => {
                onNavigate('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d8ad53] hover:text-[#f2d58a] transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Full Menu</span>
            </button>
          )}
        </div>
      </div>

      {/* Gold Signature Corner Stamp "A TASTE OF HOME" matching original screenshot */}
      <span className="absolute bottom-0 right-0 bg-[#d8ad53] text-[#090a08] text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 z-20 shadow-md">
        A TASTE OF HOME
      </span>
    </div>
  );
};
