import React, { useMemo } from 'react';
import { Volume2 } from 'lucide-react';

import bestWestern from '../assets/clients/best-western.png';
import astoria from '../assets/clients/astoria.png';
import robinsons from '../assets/clients/robinsons.png';
import nccc from '../assets/clients/nccc.png';
import seda from '../assets/clients/seda.png';
import elNido from '../assets/clients/elnido.png';
import funnyLion from '../assets/clients/funnylion.png';
import hue from '../assets/clients/hue.png';

type ClientLogo = { src: string; alt: string };

const CLIENT_LOGOS: ClientLogo[] = [
  { src: seda, alt: 'Seda Hotels' },
  { src: funnyLion, alt: 'The Funny Lion, El Nido' },
  { src: robinsons, alt: 'Robinsons Place Palawan' },
  { src: hue, alt: 'Hue Hotels & Resorts' },
  { src: elNido, alt: 'El Nido Resorts' },
  { src: bestWestern, alt: 'Best Western Plus — The Ivywall Hotel' },
  { src: astoria, alt: 'Astoria Palawan' },
  { src: nccc, alt: 'NCCC Supermarket' },
];

const MarqueeRow: React.FC<{ reverse?: boolean }> = ({ reverse }) => {
  // Duplicate the set so the scroll loop is seamless.
  const doubled = useMemo(() => [...CLIENT_LOGOS, ...CLIENT_LOGOS], []);

  return (
    <div
      className={`partner-marquee-row flex shrink-0 items-center gap-10 md:gap-16 px-4 md:px-6${
        reverse ? ' reverse' : ''
      }`}
    >
      {doubled.map((logo, i) => (
        <div
          key={`${logo.alt}-${i}`}
          className="flex h-10 min-w-[90px] shrink-0 items-center justify-center md:h-14 md:min-w-[130px] dark:brightness-110"
          title={logo.alt}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="max-h-full max-w-[110px] md:max-w-[150px] w-auto h-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export const PartnerLogos: React.FC = () => {
  return (
    <section id="partners" className="py-14 md:py-18 bg-white dark:bg-[#141212] border-y border-[#F5F5F4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center relative mb-10">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-1">
            IN GOOD COMPANY
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#1C1917] dark:text-white font-normal">
            Trusted by Palawan&apos;s leading kitchens.
          </h2>

          {/* Subtle audio / ambient indicator symbol from design */}
          <div className="absolute right-0 top-1 hidden md:block text-[#A8A29E] dark:text-[#78716C]" title="Verified local partner network">
            <Volume2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Motion logo marquee — background matches the section (light/dark) so it reads as one surface */}
      <div className="partner-marquee-track relative flex overflow-hidden bg-white dark:bg-[#141212]">
        <MarqueeRow />
      </div>
      <div className="h-6 md:h-8 bg-white dark:bg-[#141212]" />
      <div className="partner-marquee-track relative flex overflow-hidden bg-white dark:bg-[#141212]">
        <MarqueeRow reverse />
      </div>
    </section>
  );
};
