import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import type { CategoryItem } from '../types/siteContent';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';

interface CategorySelectionProps {
  onSelectCategory?: (category: CategoryItem) => void;
}

/**
 * Magazine grid: one wide feature tile + one tall tile on the first row,
 * three equal tiles below. All rows align to the same 4:3 rhythm.
 */
export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory }) => {
  const { content } = useSiteContent();
  const categories = content.categories || [];

  const spans = [
    'col-span-2 md:col-span-4 aspect-[4/3] md:aspect-auto',
    'col-span-1 md:col-span-2 aspect-[4/3]',
    'col-span-1 md:col-span-2 aspect-[4/3]',
    'col-span-1 md:col-span-2 aspect-[4/3]',
    'col-span-1 md:col-span-2 aspect-[4/3]',
  ];

  return (
    <section id="selection" className="py-20 md:py-28 bg-[#F6F1EA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The JayCee Selection"
          title="Everything your kitchen needs."
          actionLabel="View selection"
          actionHref={content.header.orderOnlineUrl}
        />

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={Math.min(i, 3) * 80} className={spans[i] ?? 'col-span-1 aspect-[4/3]'}>
              <div
                onClick={() => onSelectCategory?.(cat)}
                className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer focus:outline-none ring-1 ring-black/5 hover:ring-[#C9A227]/60 hover:shadow-2xl hover:shadow-black/25 transition-all duration-300"
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
                  imgClassName="group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  watermarkClassName="w-1/3 max-w-[110px]"
                />

                {/* Legibility gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/85 via-[#141211]/10 to-transparent pointer-events-none" />

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </div>

                {/* Name overlay */}
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
