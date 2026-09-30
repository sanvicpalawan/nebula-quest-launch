import React, { useMemo } from 'react';

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

const MarqueeRow: React.FC = () => {
  // Duplicate the set so the scroll loop is seamless.
  const doubled = useMemo(() => [...CLIENT_LOGOS, ...CLIENT_LOGOS], []);

  return (
    <div className="partner-marquee-row flex shrink-0 items-center gap-14 md:gap-20 px-7 md:px-10">
      {doubled.map((logo, i) => (
        <div
          key={`${logo.alt}-${i}`}
          className="flex h-10 w-auto shrink-0 items-center justify-center"
          title={logo.alt}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="h-10 w-auto object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export const PartnerLogos: React.FC = () => {
  return (
    <section id="partners" className="py-14 md:py-16 bg-[#141211] text-white border-b border-white/10 transition-colors">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C9A227] uppercase block mb-2">
          In good company
        </span>
        <h2
          className="text-xl sm:text-2xl font-medium text-white/90"
          style={{ fontFamily: 'var(--dynamic-heading-font)' }}
        >
          Trusted by Palawan&apos;s leading kitchens.
        </h2>
      </div>

      {/* Single grayscale logo marquee on the charcoal band */}
      <div className="partner-marquee-track relative flex overflow-hidden">
        <MarqueeRow />
      </div>
    </section>
  );
};
