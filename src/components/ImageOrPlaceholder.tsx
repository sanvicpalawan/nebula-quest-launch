import React from 'react';

interface ImageOrPlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Watermark size relative to the tile */
  watermarkClassName?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * ImageOrPlaceholder — renders the photo when available, otherwise an
 * elegant charcoal-gradient tile with a faint brand watermark.
 * Never shows a plain grey box.
 */
export const ImageOrPlaceholder: React.FC<ImageOrPlaceholderProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  watermarkClassName = 'w-2/5 max-w-[140px]',
  loading = 'lazy',
}) => {
  const hasImage = Boolean(src?.trim());

  return (
    <div className={`relative overflow-hidden bg-[#141211] ${className}`}>
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#26221E] via-[#1B1815] to-[#141211]">
          <img
            src="/jaycee-logo.svg"
            alt=""
            aria-hidden="true"
            className={`${watermarkClassName} opacity-[0.14] select-none pointer-events-none`}
          />
          {/* faint gold hairline detail */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-px w-10 bg-[#C9A227]/40" />
        </div>
      )}
    </div>
  );
};
