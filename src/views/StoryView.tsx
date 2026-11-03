import React from 'react';
import { PageView } from '../types';
import { createWhatsAppUrl } from '../data/menuData';
import { ArrowRight, ArrowUpRight, Heart, UtensilsCrossed, Users2 } from 'lucide-react';

interface StoryViewProps {
  onNavigate: (page: PageView) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      {/* Page Hero */}
      <section
        className="relative h-96 sm:h-[440px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('./assets/images/uploads/Rice-with-suya-beef-450x450.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
              OUR STORY · OUR HERITAGE
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Rooted in culture.
              <br />
              <em className="text-[#f2d58a] italic not-italic">Made with love.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed">
              Every plate tells a story of home, family and the flavours that bring us together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
              WELCOME TO NAIJA POT
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4] leading-tight">
              Food is our language.
              <br />
              <em className="text-[#f2d58a] italic not-italic">Flavour is our story.</em>
            </h2>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">
              Naija Pot Kitchen & Grill Ltd celebrates the richness, warmth and diversity of Nigerian food. From comforting soups and swallows to party favourites and smoky grills, our inspiration comes from the meals that make a house feel like home.
            </p>
            <p className="text-sm text-[#b9b4a8] leading-relaxed">
              We believe good food creates connection. It brings family and friends around the table, turns ordinary days into special moments and keeps treasured traditions alive right here in Milton Keynes.
            </p>
            <div className="pt-3 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  onNavigate('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore the menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={createWhatsAppUrl('Hello Naija Pot, I would like to know more about your kitchen.')}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all inline-flex items-center gap-1.5"
              >
                <span>Talk to our team</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-[460px] group">
            <img
              src="./assets/images/uploads/Jollof-with-assorted-meat-450x450.jpg"
              alt="A colourful meal prepared with care"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#f2d58a]">
                A TASTE OF NAIJA · BRADVILLE, MILTON KEYNES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Band */}
      <section className="bg-[#12160f] border-y border-[#d8ad53]/20 py-20 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase">
            THE HEART OF NAIJA POT
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#f6f0e4] leading-tight">
            A taste of home,
            <br />
            <em className="text-[#f2d58a] italic not-italic">wherever life takes you.</em>
          </h2>
          <p className="text-xs sm:text-sm tracking-widest text-[#b9b4a8] uppercase pt-2">
            Authentic inspiration · Generous hospitality · Food made with care
          </p>
        </div>
      </section>

      {/* Traditions / Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#141711] rounded-xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#19834b]/20 flex items-center justify-center text-[#45a866]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f2d58a]">
              Cooked with Heart
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              We prepare each soup, swallow and grill with the exact seasonings, depth of flavour and warmth that remind you of meals in Lagos, Abuja and across Nigeria.
            </p>
          </div>

          <div className="p-8 bg-[#141711] rounded-xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#d8ad53]/20 flex items-center justify-center text-[#d8ad53]">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f2d58a]">
              Finest Ingredients
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              We source authentic dried crayfish, egusi seeds, ogbono, scotch bonnets, yaji suya spice and fresh meats to ensure the aroma and taste never compromise.
            </p>
          </div>

          <div className="p-8 bg-[#141711] rounded-xl border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#45a866]/20 flex items-center justify-center text-[#45a866]">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f2d58a]">
              Community & Warmth
            </h3>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              Whether you are an MK local eager to try authentic West African cuisine or homesick for genuine jollof, our doors and kitchen welcome you with open arms.
            </p>
          </div>
        </div>

        {/* Come to the table CTA */}
        <div className="mt-16 text-center space-y-5 max-w-xl mx-auto">
          <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase">
            COME TO THE TABLE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#f6f0e4]">
            Let’s make your next meal
            <br />
            <em className="text-[#f2d58a] italic not-italic">one to remember.</em>
          </h2>
          <div>
            <a
              href={createWhatsAppUrl("Hello Naija Pot, I'd love to know more.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-6 py-3.5 shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>Talk to our team</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
