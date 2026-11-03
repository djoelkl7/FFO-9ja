import React from 'react';
import { PageView } from '../types';
import { HeroSlider } from '../components/HeroSlider';
import { SquareFoodSlider } from '../components/SquareFoodSlider';
import { createWhatsAppUrl } from '../data/menuData';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      {/* Hero Carousel */}
      <HeroSlider onNavigate={onNavigate} />

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Circular Stamp / Logo Emblem */}
          <div className="lg:col-span-2 flex justify-start lg:justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#d8ad53] relative bg-[#141711] shadow-xl shrink-0 group">
              <img
                src="./logo.png"
                alt="Naija Pot Kitchen & Grill Seal"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
              WELCOME TO NAIJA POT
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              A little taste of home,
              <br />
              <em className="text-[#f2d58a] italic not-italic">wherever you are.</em>
            </h2>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">
              At Naija Pot Kitchen & Grill Ltd, food is more than a meal — it is culture, connection and the comfort of home. We celebrate the richness of Nigerian cooking with hearty favourites, vibrant ingredients and flavour in every bite.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('story')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d8ad53] hover:text-[#f2d58a] border-b border-[#d8ad53]/50 pb-1 transition-all cursor-pointer"
              >
                <span>Read our story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GSAP Animated Square Food Slider */}
          <div className="lg:col-span-5 flex justify-center">
            <SquareFoodSlider onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* Featured Categories Grid Section (Warm Sand Background like original) */}
      <section className="bg-[#f0eadf] text-[#090a08] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#19834b] uppercase mb-2">
                MADE FRESH, SERVED WITH LOVE
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                Explore our <em className="text-[#19834b] italic not-italic">menu</em>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#68665e] max-w-sm leading-relaxed">
              Discover the dishes that bring people together. Our menu celebrates Nigerian classics and much-loved grill favourites.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Soups */}
            <article className="menu-card bg-white rounded-lg overflow-hidden shadow-md border border-[#090a08]/5 flex flex-col">
              <img
                src="./assets/images/uploads/Amala-450x450.jpg"
                alt="Traditional soup and swallow meal"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#19834b] block mb-1">
                    01 / SOUPS & SWALLOWS
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#090a08] mb-2">
                    Soups & Swallows
                  </h3>
                  <p className="text-xs text-[#6f6b62] leading-relaxed mb-4">
                    Egusi · Efo Riro · Ogbono · Okro · Ewedu with smooth pounded yam or amala.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#986d24] hover:text-[#090a08] border-b border-[#d8ad53] pb-1 w-max cursor-pointer"
                >
                  <span>Explore swallows</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Card 2: Grills & Suya */}
            <article className="menu-card bg-white rounded-lg overflow-hidden shadow-md border border-[#090a08]/5 flex flex-col">
              <img
                src="./assets/images/uploads/Suya-meat-450x450.jpg"
                alt="Charcoal grilled suya"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#19834b] block mb-1">
                    02 / FROM THE GRILL
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#090a08] mb-2">
                    Grills & Suya
                  </h3>
                  <p className="text-xs text-[#6f6b62] leading-relaxed mb-4">
                    Charcoal beef suya, spicy asun goat, grilled fish and smoky chicken wings.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#986d24] hover:text-[#090a08] border-b border-[#d8ad53] pb-1 w-max cursor-pointer"
                >
                  <span>View grill corner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Card 3: Rice & Specials */}
            <article className="menu-card bg-white rounded-lg overflow-hidden shadow-md border border-[#090a08]/5 flex flex-col">
              <img
                src="./assets/images/uploads/Jollof-Rice-450x450.jpg"
                alt="Nigerian Party Jollof Rice"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#19834b] block mb-1">
                    03 / RICE & SPECIALS
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#090a08] mb-2">
                    Rice & Specials
                  </h3>
                  <p className="text-xs text-[#6f6b62] leading-relaxed mb-4">
                    Legendary party jollof, savoury fried rice, ofada with ayamase and dodo.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#986d24] hover:text-[#090a08] border-b border-[#d8ad53] pb-1 w-max cursor-pointer"
                >
                  <span>View rice dishes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Card 4: Bakery */}
            <article className="menu-card bg-white rounded-lg overflow-hidden shadow-md border border-[#090a08]/5 flex flex-col">
              <img
                src="./assets/images/uploads/Meatpie-450x450.jpg"
                alt="Nigerian meat pies and Agege loaf"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#19834b] block mb-1">
                    04 / BAKERY & TREATS
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#090a08] mb-2">
                    Bakery & Treats
                  </h3>
                  <p className="text-xs text-[#6f6b62] leading-relaxed mb-4">
                    Flaky golden meat pies, Agege loaf, tear & share rolls and sweet mini loaves.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('bakery')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#986d24] hover:text-[#090a08] border-b border-[#d8ad53] pb-1 w-max cursor-pointer"
                >
                  <span>Explore bakery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          </div>

          <p className="text-[11px] text-[#777267] mt-8 text-center sm:text-left">
            Menu availability and seasonal prices may vary. Message us directly on WhatsApp for daily specials and instant collection.
          </p>
        </div>
      </section>

      {/* Specials Highlight Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] bg-[#12150f]">
        <div
          className="bg-cover bg-center min-h-[300px] lg:min-h-full"
          style={{
            backgroundImage:
              "url('./assets/images/uploads/Suya-meat-450x450.jpg')",
          }}
        />
        <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
          <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
            A LITTLE EXTRA NAIJA MAGIC
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4] mb-5">
            Our flavour.
            <br />
            <em className="text-[#f2d58a] italic not-italic">Your favourite moments.</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed mb-8 max-w-md">
            Planning a family meal, birthday party, celebration or get-together? Talk to us about our sharing platters, custom party trays and let Naija Pot bring something delicious to your table.
          </p>
          <div>
            <a
              href={createWhatsAppUrl("Hello Naija Pot, I'd like to ask about your specials and platters.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] text-xs font-bold uppercase tracking-wider px-6 py-3.5 shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>Ask about our specials</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* The Naija Pot Promise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase mb-3">
          THE NAIJA POT PROMISE
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4] mb-14">
          Good food. Good people.
          <br />
          <em className="text-[#f2d58a] italic not-italic">That feeling of home.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-[#141711] rounded-xl border border-white/5 space-y-3">
            <span className="text-[#19834b] text-3xl block">✦</span>
            <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
              Authentic flavour
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed max-w-xs mx-auto">
              Inspired by the traditional recipes, indigenous seasonings and slow-cooked culinary craft we know and cherish.
            </p>
          </div>

          <div className="p-6 bg-[#141711] rounded-xl border border-white/5 space-y-3">
            <span className="text-[#19834b] text-3xl block">✦</span>
            <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
              Made with care
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed max-w-xs mx-auto">
              Every swallow, soup, charcoal grill and baked loaf is prepared fresh with heartfelt warmth and generous hospitality.
            </p>
          </div>

          <div className="p-6 bg-[#141711] rounded-xl border border-white/5 space-y-3">
            <span className="text-[#19834b] text-3xl block">✦</span>
            <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
              Made to share
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed max-w-xs mx-auto">
              Hearty portions and sharing platters designed to bring family, friends and the Milton Keynes community together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
