import React from 'react';
import { Snowflake, Truck, HeartHandshake, CalendarClock } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './Reveal';

/**
 * StatsBand — charcoal band with large numerals + icons:
 * "Since 2017 / Cold-chain storage / Local delivery / Personal service"
 */
export const StatsBand: React.FC = () => {
  const { content } = useSiteContent();
  const year = content.companyStory?.year || '2017';
  const yearLabel = content.companyStory?.yearLabel || 'Where our story began.';

  const stats = [
    {
      Icon: CalendarClock,
      big: year,
      label: 'Since',
      description: yearLabel,
    },
    {
      Icon: Snowflake,
      big: null,
      label: 'Cold-chain storage',
      description: 'Temperature-controlled, end to end.',
    },
    {
      Icon: Truck,
      big: null,
      label: 'Local delivery',
      description: 'Puerto Princesa & across Palawan.',
    },
    {
      Icon: HeartHandshake,
      big: null,
      label: 'Personal service',
      description: 'A knowledgeable team, a call away.',
    },
  ];

  return (
    <section
      id="stats"
      aria-label="JayCee at a glance"
      className="w-full bg-[#141211] text-white border-y border-white/10 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-y-0">
          {stats.map((stat, idx) => {
            const Icon = stat.Icon;
            return (
              <Reveal key={stat.label} delay={idx * 90}>
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227]">
                      <Icon className="w-4.5 h-4.5 stroke-[1.6]" />
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/50">
                      {stat.label}
                    </span>
                  </div>
                  {stat.big ? (
                    <span
                      className="text-6xl md:text-7xl font-semibold text-white leading-none tracking-tight"
                      style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                    >
                      {stat.big}
                    </span>
                  ) : (
                    <span
                      className="text-2xl md:text-3xl font-semibold text-white leading-tight tracking-tight"
                      style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                    >
                      {stat.label}
                    </span>
                  )}
                  <p className="mt-2 text-[13px] md:text-sm text-white/55 font-light leading-relaxed max-w-[220px]">
                    {stat.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
