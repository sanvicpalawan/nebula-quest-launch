import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './Reveal';

export const PreFooterCTA: React.FC = () => {
  const { content } = useSiteContent();
  const preFooter = content.preFooter;

  return (
    <section className="py-20 md:py-28 bg-[#F6F1EA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-[#E4D9C9] pb-14 md:pb-20">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase mb-4">
                <span className="h-px w-8 bg-[#C9A227]/70" />
                {preFooter?.eyebrow}
              </span>
              <h2
                className="text-[clamp(2.2rem,4.5vw,3.8rem)] text-[#141211] tracking-tight leading-[1.05] font-semibold"
                style={{ fontFamily: 'var(--dynamic-heading-font)' }}
              >
                {preFooter?.title}{' '}
                <span className="italic">{preFooter?.titleItalic}</span>
              </h2>
            </div>

            <div className="shrink-0">
              <a
                href={preFooter?.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="prefooter-order-online-btn"
                style={{ backgroundColor: content.theme.primaryColor }}
                className="inline-flex items-center space-x-2 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-xl shadow-black/15 active:scale-[0.98] hover:brightness-110"
              >
                <span>{preFooter?.buttonText}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
