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
    <section id="partners" className="py-10 md:py-12 bg-[#141211] text-white transition-colors">
      {/* Thin trust-strip header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-semibold tracking-[0.28em] text-[#C9A227] uppercase block mb-1.5">
          In good company
        </span>
        <p className="text-sm text-white/60 font-light">
          Trusted by Palawan&apos;s leading kitchens.
        </p>
      </div>

      {/* Single grayscale logo marquee on the charcoal band */}
      <div className="partner-marquee-track relative flex overflow-hidden">
        <MarqueeRow />
      </div>
    </section>
  );
};
