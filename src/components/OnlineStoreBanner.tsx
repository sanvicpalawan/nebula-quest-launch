import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { SectionHeader } from './SectionHeader';

export const OnlineStoreBanner: React.FC = () => {
  const { content } = useSiteContent();
  const banner = content.onlineStoreBanner;

  return (
    <section id="online-store" className="py-20 md:py-28 bg-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={banner?.eyebrow}
          title={banner?.title}
          description={banner?.subtitle}
        />

        <div className="flex flex-wrap items-center gap-4 -mt-4 md:-mt-6">
          <a
            href={banner?.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="banner-open-online-store-btn"
            style={{ backgroundColor: content.theme.primaryColor }}
            className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-xl shadow-black/15 active:scale-[0.98] hover:brightness-110"
          >
            <span>{banner?.buttonText}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </a>
        </div>
      </div>
    </section>
  );
};
