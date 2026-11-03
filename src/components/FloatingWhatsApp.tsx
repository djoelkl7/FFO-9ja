import React from 'react';
import { createWhatsAppUrl } from '../data/menuData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={createWhatsAppUrl('Hello Naija Pot, I would like to make an enquiry.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Naija Pot on WhatsApp"
      className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 flex items-center gap-2.5 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs sm:text-sm py-3 px-4 sm:px-5 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-green-900/50 group"
    >
      <div className="w-5 h-5 rounded-full overflow-hidden border border-[#062b17]/30 shrink-0">
        <img
          src="./logo.png"
          alt="Naija Pot"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <svg
        viewBox="0 0 32 32"
        className="w-5 h-5 fill-current shrink-0 transition-transform group-hover:scale-110"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M16 3.2A12.8 12.8 0 0 0 5.1 22.4L3.3 28.8l6.6-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2c-1.9 0-3.8-.5-5.5-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.4 10.4 0 1 1 16 26.4Zm5.7-7.8c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.1-.8 1-.9 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.6l.5-.6.3-.5c.1-.2.1-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1-1.1 2.5 1.1 3 1.3 3.2 2.2 3.3 5.3 4.7c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.3.2-1.5s-.3-.2-.6-.3Z" />
      </svg>
      <span className="hidden sm:inline tracking-wide">Chat on WhatsApp</span>
    </a>
  );
};
