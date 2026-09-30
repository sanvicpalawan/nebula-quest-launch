import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import type { CategoryItem } from '../types/siteContent';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';
import { Reveal } from './Reveal';

interface CategorySelectionProps {
  onSelectCategory?: (category: CategoryItem) => void;
}

/** Bento spans for the classic 5-category layout; extra categories flow as standard tiles. */
const BENTO_SPANS = [
  'col-span-2 row-span-2',
  'col-span-2 md:col-span-2',
  'col-span-1',
  'col-span-1',
  'col-span-2 md:col-span-4',
];

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory }) => {
  const { content } = useSiteContent();
  const categories = content.categories || [];

  return (
    <section id="selection" className="py-20 md:py-28 bg-[#F6F1EA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14">
            <div>
              <span className="text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase block mb-3">
                The JayCee Selection
              </span>
              <h2
                className="text-4xl sm:text-5xl text-[#141211] tracking-tight font-semibold"
                style={{ fontFamily: 'var(--dynamic-heading-font)' }}
              >
                Everything your kitchen needs.
              </h2>
            </div>

            <a
              href={content.header.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="view-selection-top-link"
              className="mt-5 sm:mt-0 inline-flex items-center text-sm font-semibold text-[#6E6257] hover:text-[#A3161F] transition-colors shrink-0"
            >
              <span>View selection</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[170px] md:auto-rows-[190px] gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.id}
              delay={Math.min(i, 4) * 80}
              className={`${BENTO_SPANS[i] ?? 'col-span-1'} h-full`}
            >
              <div
                onClick={() => onSelectCategory?.(cat)}
                className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer focus:outline-none ring-1 ring-black/5 hover:ring-[#C9A227]/50 transition-shadow hover:shadow-2xl hover:shadow-black/25"
                role="button"
                tabIndex={0}
                aria-label={`${cat.name} — ${cat.count || cat.subTitle || ''}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectCategory?.(cat);
                }}
              >
                <ImageOrPlaceholder
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0"
                  imgClassName="group-hover:scale-105 transition-transform duration-700 ease-out"
                  watermarkClassName="w-1/3 max-w-[110px]"
                />

                {/* Legibility gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/85 via-[#141211]/15 to-transparent pointer-events-none" />

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </div>

                {/* Name overlay bottom-left */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3
                    className="text-white text-xl sm:text-2xl font-semibold leading-tight"
                    style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-[12px] text-white/65 mt-1 font-light tracking-wide">
                    {cat.subTitle}
                    {cat.count ? <span className="text-[#C9A227]"> · {cat.count}</span> : null}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
