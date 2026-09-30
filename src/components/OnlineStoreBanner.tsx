import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './Reveal';

export const OnlineStoreBanner: React.FC = () => {
  const { content } = useSiteContent();
  const banner = content.onlineStoreBanner;

  return (
    <section id="online-store" className="py-20 md:py-28 bg-[#141211] text-center text-white transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.24em] text-[#C9A227] uppercase block mb-4">
            {banner?.eyebrow}
          </span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-5 font-semibold leading-[1.05]"
            style={{ fontFamily: 'var(--dynamic-heading-font)' }}
          >
            {banner?.title}
          </h2>

          <p className="text-[17px] text-white/60 font-light max-w-lg mx-auto mb-9 leading-relaxed">
            {banner?.subtitle}
          </p>

          <a
            href={banner?.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="banner-open-online-store-btn"
            style={{ backgroundColor: content.theme.primaryColor }}
            className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-xl shadow-black/30 active:scale-[0.98] hover:brightness-110"
          >
            <span>{banner?.buttonText}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};
