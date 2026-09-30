import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';
import { Reveal } from './Reveal';

interface EditorialStoryProps {
  onOpenWholesale?: () => void;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({ onOpenWholesale }) => {
  const { content } = useSiteContent();

  return (
    <section id="story" className="py-20 md:py-28 bg-[#F6F1EA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase block mb-3">
              From our shelves to your kitchen
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl text-[#141211] tracking-tight leading-[1.05] font-semibold"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              Good food. <span className="italic">Great company.</span>
            </h2>
            <p className="mt-5 text-[17px] text-[#6E6257] font-light">
              For the everyday. The special occasion. And every service in between.
            </p>
          </div>
        </Reveal>

        {/* Staggered editorial feature rows */}
        <div className="space-y-20 md:space-y-28">
          {(content.editorialStories || []).map((story, idx) => {
            const isImageRight = story.imageOnRight;

            const renderCta = () => {
              const ctaClass =
                'inline-flex items-center space-x-1.5 text-[15px] font-semibold text-[#141211] hover:text-[#A3161F] transition-colors';

              if (story.ctaType === 'wholesale') {
                return (
                  <button
                    type="button"
                    id={`story-btn-${idx}`}
                    onClick={onOpenWholesale}
                    className={`${ctaClass} cursor-pointer`}
                  >
                    <span>{story.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                );
              }

              if (story.ctaType === 'phone') {
                return (
                  <a href={content.header.phoneTel} id={`story-link-${idx}`} className={ctaClass}>
                    <span>{story.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                );
              }

              return (
                <a
                  href={story.ctaUrl || content.header.orderOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`story-link-${idx}`}
                  className={ctaClass}
                >
                  <span>{story.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              );
            };

            return (
              <div
                key={story.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Image column */}
                <Reveal
                  className={`${isImageRight ? 'order-1 md:order-2' : ''}`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-xl shadow-black/10">
                    <ImageOrPlaceholder
                      src={story.image}
                      alt={story.headline.replace(/\n/g, ' ')}
                      className="absolute inset-0"
                      watermarkClassName="w-1/3 max-w-[120px]"
                    />
                  </div>
                </Reveal>

                {/* Content column */}
                <Reveal
                  delay={120}
                  className={`${
                    isImageRight ? 'order-2 md:order-1 md:pr-4 lg:pr-8' : 'md:pl-4 lg:pl-8'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-[0.24em] text-[#C9A227] uppercase block mb-4">
                    {story.stepNumber}
                  </span>
                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl text-[#141211] leading-[1.08] mb-5 whitespace-pre-line font-semibold tracking-tight"
                    style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                  >
                    {story.headline}
                  </h3>
                  <p className="text-[17px] text-[#6E6257] leading-relaxed mb-7 font-light max-w-md">
                    {story.description}
                  </p>
                  {renderCta()}
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
