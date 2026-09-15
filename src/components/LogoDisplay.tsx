import React from 'react';

interface LogoDisplayProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  isDarkMode?: boolean;
  variant?: 'full' | 'compact' | 'icon-only';
}

/**
 * LogoDisplay - Unified logo component for header, footer, and admin
 * Handles transparent PNGs/SVGs with dark/light mode contrast
 * Ensures consistent display across all devices
 */
export const LogoDisplay: React.FC<LogoDisplayProps> = ({
  className = '',
  size = 'md',
  src,
  isDarkMode = false,
  variant = 'full',
}) => {
  const sizeConfig = {
    sm: { height: 'h-8', width: 'w-[7.5rem]', maxHeight: 'max-h-32' },
    md: { height: 'h-14', width: 'w-[10rem]', maxHeight: 'max-h-56' },
    lg: { height: 'h-16', width: 'w-[12rem]', maxHeight: 'max-h-64' },
    xl: { height: 'h-20', width: 'w-[15rem]', maxHeight: 'max-h-80' },
  }[size];

  if (!src?.trim()) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center justify-center bg-transparent ${className}`}
    >
      {/* Container with backdrop for transparent images */}
      <div
        className={`
          ${sizeConfig.height} ${sizeConfig.width}
          flex items-center justify-center
          rounded-lg
          transition-all duration-200
          ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#1a1a1a]/0 to-[#2d2d2d]/0'
              : 'bg-gradient-to-br from-white/0 to-gray-50/0'
          }
        `}
      >
        <img
          src={src}
          alt="Logo"
          className={`
            ${sizeConfig.height} ${sizeConfig.width}
            block object-contain
            bg-transparent
            ${isDarkMode ? 'brightness-110 contrast-110' : 'brightness-100'}
            drop-shadow-sm
            transition-all duration-300
            hover:drop-shadow-md
          `}
          loading="lazy"
          onError={(e) => {
            console.warn('Logo failed to load:', src);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};
