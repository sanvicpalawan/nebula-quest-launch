import React from 'react';
import { Snowflake, PackageCheck, Truck, HeartHandshake } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './Reveal';

const PILLAR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Snowflake,
  PackageCheck,
  Truck,
  HeartHandshake,
};

export const CompanyStory: React.FC = () => {
  const { content } = useSiteContent();
  const story = content.companyStory;

  const pillars = (story?.pillars || []).map((pillar) => ({
    ...pillar,
    Icon: PILLAR_ICONS[pillar.iconName] || PackageCheck,
  }));

  return (
    <section id="story-detail" className="py-20 md:py-28 bg-[#F6F1EA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left column: year badge */}
          <Reveal className="md:col-span-4 lg:col-span-3">
            <span className="text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase block mb-3">
              {story?.eyebrow || 'Locally rooted'}
            </span>
            <div
              className="text-7xl sm:text-8xl lg:text-9xl text-[#A3161F] font-semibold leading-none tracking-tight my-2"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              {story?.year || '2017'}
            </div>
            <p className="text-[13px] text-[#6E6257] font-light mt-2">{story?.yearLabel}</p>
          </Reveal>

          {/* Right column: narrative */}
          <Reveal delay={120} className="md:col-span-8 lg:col-span-9 max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase block mb-3">
              {story?.brandHeading}
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl text-[#141211] tracking-tight leading-[1.05] mb-7 font-semibold whitespace-pre-line"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              {story?.title}
            </h2>
            <p className="text-[17px] text-[#6E6257] font-light leading-relaxed mb-7">
              {story?.paragraph}
            </p>
            <p
              className="text-xl sm:text-2xl font-medium italic text-[#141211] border-l-2 border-[#C9A227] pl-5"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              {story?.tagline}
            </p>
          </Reveal>
        </div>

        {/* 4 feature pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 pt-16 md:pt-20 mt-16 border-t border-[#E4D9C9]">
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.id} delay={idx * 90}>
              <div className="flex flex-col space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#141211] flex items-center justify-center text-[#C9A227]">
                  <pillar.Icon className="w-4.5 h-4.5 stroke-[1.6]" />
                </div>
                <h3 className="text-base font-semibold text-[#141211] pt-1">{pillar.title}</h3>
                <p className="text-[14px] text-[#6E6257] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
