import React from 'react';
import { createWhatsAppUrl } from '../data/menuData';

export const FloatingWhatsApp: React.FC = () => (
  <a
    href={createWhatsAppUrl('Hello Naija Pot, I would like to make an enquiry.')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Naija Pot on WhatsApp"
    title="Chat on WhatsApp"
    className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#20c76a] text-[#062b17] shadow-lg transition-transform hover:scale-105 hover:bg-[#2fe27c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2d58a]"
  >
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 fill-current"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16 3.2A12.8 12.8 0 0 0 5.1 22.4L3.3 28.8l6.6-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2c-1.9 0-3.8-.5-5.5-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.4 10.4 0 1 1 16 26.4Zm5.7-7.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.2 3.1 1.3 3.3.2.2 2.3 3.5 5.5 4.9.8.4 1.4.6 1.9.7.8.3 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  </a>
);
