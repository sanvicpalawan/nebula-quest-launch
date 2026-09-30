import React from 'react';
import { RIBBON_IMAGES } from '../data/jayceeData';
import { useSiteContent } from '../context/SiteContentContext';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';

export const FoodRibbon: React.FC = () => {
  const { content } = useSiteContent();
  const images: Array<{ id?: string; url: string; alt: string }> =
    content.ribbonImages && content.ribbonImages.length > 0 ? content.ribbonImages : RIBBON_IMAGES;

  return (
    <section aria-label="Culinary gallery preview" className="w-full overflow-hidden bg-[#141211]">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0.5">
        {images.map((img, idx) => (
          <a
            key={img.id || idx}
            href={content.header.orderOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square block overflow-hidden"
            title={img.alt}
          >
            <ImageOrPlaceholder
              src={img.url}
              alt={img.alt}
              className="absolute inset-0"
              imgClassName="group-hover:scale-110 transition-transform duration-700 ease-out"
              watermarkClassName="w-1/2 max-w-[90px]"
            />
            <div className="absolute inset-0 bg-[#141211]/20 group-hover:bg-transparent transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
};
