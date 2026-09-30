import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';
import { Reveal } from './Reveal';

export const EssentialsGrid: React.FC = () => {
  const { content } = useSiteContent();
  const essentials = content.essentials;
  const ORDER_ONLINE_URL = content.header.orderOnlineUrl;

  return (
    <section id="essentials" className="py-20 md:py-28 bg-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14">
            <div>
              <span className="text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase block mb-3">
                Keep your kitchen ready
              </span>
              <h2
                className="text-4xl sm:text-5xl text-[#141211] tracking-tight font-semibold"
                style={{ fontFamily: 'var(--dynamic-heading-font)' }}
              >
                The everyday essentials.
              </h2>
            </div>

            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="essentials-explore-all-link"
              className="mt-5 sm:mt-0 inline-flex items-center text-sm font-semibold text-[#6E6257] hover:text-[#A3161F] transition-colors shrink-0"
            >
              <span>Explore all products</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </Reveal>

        {/* 3 column cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {essentials.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 100}>
              <a
                href={item.linkUrl?.trim() || ORDER_ONLINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id={`essential-card-${idx}`}
                className="group block focus:outline-none"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-black/5 mb-4 group-hover:shadow-xl group-hover:shadow-black/15 transition-shadow">
                  <ImageOrPlaceholder
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0"
                    imgClassName="group-hover:scale-105 transition-transform duration-700 ease-out"
                    watermarkClassName="w-1/3 max-w-[110px]"
                  />
                </div>

                <h3
                  className="text-xl font-semibold text-[#141211] group-hover:text-[#A3161F] transition-colors"
                  style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                >
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#6E6257] mt-1 font-light tracking-wide">
                  {item.subTitle}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
