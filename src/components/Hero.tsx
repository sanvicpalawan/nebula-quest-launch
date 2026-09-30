import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';

interface HeroProps {
  onExploreProducts?: () => void;
  onWholesaleEnquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onWholesaleEnquiry }) => {
  const { content } = useSiteContent();

  const scrollToSelection = () => {
    const section = document.getElementById('selection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroLogo = content.header.logoUrl?.trim() || '/jaycee-logo.svg';

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full bg-[#141211] text-white overflow-hidden flex flex-col justify-end"
    >
      {/* Background imagery with slow cinematic zoom */}
      <div className="absolute inset-0 z-0">
        <ImageOrPlaceholder
          src={content.hero.bgImageUrl}
          alt="Premium meat cuts and culinary preparation"
          className="w-full h-full"
          imgClassName="hero-zoom"
          watermarkClassName="w-[340px] max-w-[60%]"
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141211]/85 via-[#141211]/45 to-[#141211]/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/25 to-[#141211]/55 pointer-events-none" />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 md:pt-36 pb-12 md:pb-16">
        {/* Logo lockup above the headline */}
        <img
          src={heroLogo}
          alt="JayCee Trading & Services"
          className="h-[88px] w-auto md:h-[108px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] mb-8 md:mb-10"
        />

        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-5 md:mb-6">
            <span className="h-px w-10 bg-[#C9A227]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#C9A227] uppercase">
              {content.hero.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-semibold text-white tracking-tight leading-[0.98] text-[clamp(2.9rem,7.2vw,6.5rem)]"
            style={{ fontFamily: 'var(--dynamic-heading-font)' }}
          >
            {content.hero.headlinePart1} <br />
            {content.hero.headlinePart2} <br />
            <span className="italic font-medium text-white/90">{content.hero.headlineItalic}</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-[17px] sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
            {content.hero.subtext}
          </p>

          {/* Two pill CTAs */}
          <div className="mt-9 sm:mt-10 flex flex-wrap items-center gap-4">
            <a
              href={content.header.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-explore-products-btn"
              style={{ backgroundColor: content.theme.primaryColor }}
              className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-xl shadow-black/30 active:scale-[0.98] hover:brightness-110 cursor-pointer"
            >
              <span>{content.header.orderOnlineButtonText}</span>
              <ArrowDown className="w-4 h-4 stroke-[2.2]" />
            </a>

            <button
              id="hero-wholesale-enquiry-btn"
              onClick={onWholesaleEnquiry}
              className="inline-flex items-center space-x-2 border border-white/35 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all cursor-pointer backdrop-blur-[2px]"
            >
              <span>{content.hero.wholesaleBtnText}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-white/50 font-light tracking-wide">
          <div>{content.hero.statusBarLeft}</div>
          <button
            onClick={scrollToSelection}
            id="hero-scroll-indicator-btn"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to product selection"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <div className="hidden sm:block text-right">{content.hero.statusBarRight}</div>
        </div>
      </div>
    </section>
  );
};
