import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const APP_URL = 'https://findit-hdb8.netlify.app';

const NAV_ITEMS = [
  { href: '#com-funciona', label: 'Com funciona' },
  { href: '#prova-mapa', label: 'Mapa interactiu' },
  { href: '#establiments', label: 'Establiments' },
  { href: '#preguntes', label: 'Preguntes' },
];

export const LandingHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E3E8F0]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#inici"
          className="text-[20px] font-extrabold tracking-tight text-[#174A91] font-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#246BCE] rounded"
        >
          FINDIT
        </a>

        <nav
          aria-label="Navegació principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#174A91] hover:underline underline-offset-4 decoration-[#246BCE]/50 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#246BCE] rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-[#246BCE] hover:bg-[#174A91] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174A91]"
          >
            <span>Accedir a l&apos;app</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tancar el menú' : 'Obrir el menú'}
            className="md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-[#E3E8F0] text-[#202A36] hover:bg-[#F5F9FF] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Navegació mòbil"
          className="md:hidden border-t border-[#E3E8F0] bg-white px-5 py-4 flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="min-h-[44px] flex items-center text-[15px] font-medium text-[#202A36] hover:text-[#246BCE] border-b border-[#F1F5F9] last:border-b-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
