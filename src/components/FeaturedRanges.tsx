import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';
import { Reveal } from './Reveal';

export const FeaturedRanges: React.FC = () => {
  const { content } = useSiteContent();

  return (
    <section id="featured-ranges" className="w-full bg-[#141211] py-20 md:py-28 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <span className="text-xs font-semibold tracking-[0.24em] text-[#C9A227] uppercase block mb-3">
              Featured ranges
            </span>
            <h2
              className="text-4xl sm:text-5xl tracking-tight font-semibold"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              Curated for good kitchens.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {(content.featuredRanges || []).map((item, index) => (
            <Reveal key={item.id} delay={index * 100}>
              <a
                href={item.url || content.header.orderOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`featured-card-${index}`}
                className="group relative h-[380px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden block ring-1 ring-white/10 hover:ring-[#C9A227]/50 hover:shadow-2xl hover:shadow-black/50 transition-all"
              >
                {/* Background image with hover zoom */}
                <ImageOrPlaceholder
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0"
                  imgClassName="opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                  watermarkClassName="w-2/5 max-w-[130px]"
                />

                {/* Dark gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-[#141211]/35 to-transparent" />

                {/* Card content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white flex flex-col justify-end">
                  <span className="text-[11px] font-semibold tracking-[0.24em] text-[#C9A227] uppercase mb-2 block">
                    {item.badge}
                  </span>

                  <h3
                    className="text-2xl sm:text-[28px] font-semibold text-white mb-3 leading-tight"
                    style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/60 font-light leading-relaxed mb-4 max-w-[36ch]">
                    {item.subtitle}
                  </p>

                  <div className="inline-flex items-center text-[13px] font-semibold text-white/90 group-hover:text-[#C9A227] transition-colors">
                    <span className="underline decoration-[#C9A227]/50 underline-offset-4 group-hover:decoration-[#C9A227]">
                      {item.linkText}
                    </span>
                    <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
