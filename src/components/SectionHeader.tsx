import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  /** dark = section on charcoal canvas */
  tone?: 'light' | 'dark';
  className?: string;
  headerId?: string;
}

/**
 * SectionHeader — the single header pattern used by every section:
 * gold eyebrow, serif title, optional quiet action link on the right.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  tone = 'light',
  className = '',
  headerId,
}) => {
  const eyebrowColor = tone === 'dark' ? 'text-[#C9A227]' : 'text-[#6E6257]';
  const titleColor = tone === 'dark' ? 'text-white' : 'text-[#141211]';
  const descColor = tone === 'dark' ? 'text-white/60' : 'text-[#6E6257]';
  const actionColor = tone === 'dark' ? 'text-white/70 hover:text-[#C9A227]' : 'text-[#6E6257] hover:text-[#A3161F]';

  return (
    <Reveal>
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 md:mb-14 ${className}`}>
        <div className="max-w-2xl">
          {eyebrow && (
            <span className={`inline-flex items-center gap-3 text-xs font-semibold tracking-[0.24em] uppercase mb-3 ${eyebrowColor}`}>
              <span className="h-px w-8 bg-[#C9A227]/70" />
              {eyebrow}
            </span>
          )}
          <h2
            id={headerId}
            className={`text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] tracking-tight font-semibold ${titleColor}`}
            style={{ fontFamily: 'var(--dynamic-heading-font)' }}
          >
            {title}
          </h2>
          {description && (
            <p className={`mt-4 text-[17px] font-light leading-relaxed ${descColor}`}>{description}</p>
          )}
        </div>

        {actionLabel && (
          <a
            href={actionHref}
            onClick={(e) => {
              if (onAction) {
                e.preventDefault();
                onAction();
              }
            }}
            target={actionHref?.startsWith('http') ? '_blank' : undefined}
            rel={actionHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap transition-colors sm:mb-1.5 ${actionColor}`}
          >
            <span>{actionLabel}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </Reveal>
  );
};
