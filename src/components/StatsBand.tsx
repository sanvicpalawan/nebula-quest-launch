import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './Reveal';

/**
 * StatsBand — charcoal band, hairline-divided columns:
 * Since 2017 / Cold-chain storage / Local delivery / Personal service.
 */
export const StatsBand: React.FC = () => {
  const { content } = useSiteContent();
  const year = content.companyStory?.year || '2017';

  const stats = [
    {
      big: year,
      label: 'Since',
      description: 'Where our story began.',
    },
    {
      big: 'Sub-zero',
      label: 'Cold-chain storage',
      description: 'Monitored at optimal sub-zero temperatures, end to end.',
    },
    {
      big: 'Palawan-wide',
      label: 'Local delivery',
      description: 'Delivery arrangements across Puerto Princesa and Palawan.',
    },
    {
      big: 'Direct',
      label: 'Personal service',
      description: 'A knowledgeable team, a phone call away.',
    },
  ];

  return (
    <section
      id="stats"
      aria-label="JayCee at a glance"
      className="w-full bg-[#141211] text-white transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 80}>
              <div
                className={`flex flex-col items-start lg:px-8 ${idx === 0 ? 'lg:pl-0' : ''} ${
                  idx > 0 ? 'lg:border-l lg:border-white/12' : ''
                } ${idx === 1 ? 'border-l border-white/12 lg:border-l pl-6 lg:pl-8' : ''} ${
                  idx === 3 ? 'border-l border-white/12 lg:border-l pl-6 lg:pl-8' : ''
                }`}
              >
                <span
                  className="text-4xl md:text-5xl font-semibold text-white leading-none tracking-tight"
                  style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                >
                  {stat.big}
                </span>
                <span className="mt-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#C9A227]">
                  {stat.label}
                </span>
                <p className="mt-2 text-[13px] md:text-sm text-white/50 font-light leading-relaxed max-w-[220px]">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
