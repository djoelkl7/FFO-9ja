import React, { useState } from 'react';
import { PageView } from '../types';
import { RESTAURANT_INFO, createWhatsAppUrl } from '../data/menuData';
import { Phone, MessageSquare, MapPin, Clock, Send, ArrowRight } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (page: PageView) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [inquirerName, setInquirerName] = useState('');
  const [topic, setTopic] = useState('Order For Today');
  const [userMessage, setUserMessage] = useState('');

  const generateContactWhatsAppMessage = () => {
    let msg = `Hello Naija Pot Kitchen & Grill Ltd,\n\n`;
    if (inquirerName.trim()) {
      msg += `My name is ${inquirerName.trim()}.\n`;
    }
    msg += `Topic: ${topic}\n`;
    if (userMessage.trim()) {
      msg += `Message: ${userMessage.trim()}\n`;
    } else {
      msg += `I'd like to make an enquiry regarding your menu, availability and collection.\n`;
    }
    return msg;
  };

  return (
    <div className="space-y-0">
      {/* Page Hero */}
      <section
        className="relative h-96 sm:h-[440px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('./assets/images/uploads/Small-chops-platterJ-450x450.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/95 via-[#050705]/80 to-[#050705]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-4">
              WE’D LOVE TO HEAR FROM YOU
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#f6f0e4] mb-4">
              Say hello to
              <br />
              <em className="text-[#f2d58a] italic not-italic">Naija Pot.</em>
            </h1>
            <p className="text-sm sm:text-base text-[#e4dfd4] max-w-lg leading-relaxed">
              Questions about our menu, today’s fresh soups, prices or an order? Our team is just a call or message away.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#45a866] uppercase mb-2">
                GET IN TOUCH
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f6f0e4]">
                Let’s talk <em className="text-[#f2d58a] italic not-italic">food.</em>
              </h2>
              <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed mt-2">
                Message us for the latest menu, prices, availability and ordering information.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {/* WhatsApp */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#20c76a]/15 text-[#20c76a] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    WHATSAPP ORDERING & ENQUIRIES
                  </span>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-bold text-[#f2d58a] hover:underline"
                  >
                    {RESTAURANT_INFO.whatsappFormatted} ↗
                  </a>
                  <p className="text-[11px] text-[#b9b4a8] mt-0.5">
                    Fast response for daily orders, swallow pairs and inquiries.
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#d8ad53]/15 text-[#d8ad53] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    DIRECT TELEPHONE
                  </span>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-sm sm:text-base font-bold text-[#f2d58a] hover:underline"
                  >
                    {RESTAURANT_INFO.phone} ↗
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 text-[#f2d58a] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    KITCHEN ADDRESS
                  </span>
                  <p className="text-sm font-semibold text-[#f6f0e4]">{RESTAURANT_INFO.address}</p>
                  <p className="text-[11px] text-[#b9b4a8] mt-0.5">
                    Bradville, Milton Keynes, Buckinghamshire
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 text-[#f2d58a] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block">
                    OPENING HOURS
                  </span>
                  <p className="text-sm font-bold text-[#f2d58a]">
                    {RESTAURANT_INFO.openingHoursDisplay}
                  </p>
                  <div className="text-[11px] text-[#b9b4a8] space-y-0.5 pt-1">
                    {RESTAURANT_INFO.detailedHours.map((h, i) => (
                      <p key={i}>
                        <strong className="text-white">{h.days}:</strong> {h.hours}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-4 bg-[#141711] rounded-xl border border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#45a866] uppercase block mb-1">
                    FOLLOW OUR KITCHEN
                  </span>
                  <div className="flex items-center gap-4 text-[#f2d58a]">
                    <a
                      href={RESTAURANT_INFO.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-semibold"
                    >
                      Instagram (@naijapotkitchen_grill_mk)
                    </a>
                    <a
                      href={RESTAURANT_INFO.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-semibold"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message Card */}
          <div className="lg:col-span-5 bg-[#14170f] border border-[#d8ad53]/35 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.24em] text-[#d8ad53] uppercase mb-1">
                START A CONVERSATION
              </p>
              <h3 className="font-serif text-2xl font-normal text-[#f6f0e4]">
                Order or Make an Enquiry
              </h3>
              <p className="text-xs text-[#b9b4a8] leading-relaxed mt-2">
                Fill in your details to launch WhatsApp with a pre-filled enquiry directly to our team.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bukola"
                  value={inquirerName}
                  onChange={(e) => setInquirerName(e.target.value)}
                  className="w-full bg-[#1b2017] border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block mb-1">
                  Subject / Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#1b2017] border border-white/10 rounded-lg p-3 text-white focus:border-[#d8ad53] focus:outline-none"
                >
                  <option value="Order For Today">Order For Today</option>
                  <option value="Swallow & Soup Pairing Enquiry">Swallow & Soup Pairing Enquiry</option>
                  <option value="Bakery & Agege Bread Order">Bakery & Agege Bread Order</option>
                  <option value="Party Catering & Sharing Trays">Party Catering & Sharing Trays</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="text-[#b9b4a8] uppercase font-bold tracking-wider text-[11px] block mb-1">
                  Message / Dishes You Need
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. Please let me know what soups are fresh today and if amala is available for pick-up at 6pm."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="w-full bg-[#1b2017] border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:border-[#d8ad53] focus:outline-none resize-none"
                />
              </div>

              <a
                href={createWhatsAppUrl(generateContactWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Message us on WhatsApp</span>
              </a>

              <p className="text-[11px] text-[#b9b4a8]/70 text-center">
                Please confirm your collection or local delivery details directly with the team.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 bg-[#12160f] rounded-xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="font-serif text-2xl font-normal text-[#f6f0e4]">
            Good food is always <em className="text-[#f2d58a] italic not-italic">worth talking about.</em>
          </h3>
          <button
            onClick={() => {
              onNavigate('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="border border-[#f2d58a]/75 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-6 py-3.5 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Browse the full menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
