import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

/**
 * MobileOrderBar — sticky bottom "Order Online" bar on mobile.
 */
export const MobileOrderBar: React.FC = () => {
  const { content } = useSiteContent();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none">
      <div className="pointer-events-auto bg-[#141211]/92 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a
            href={content.header.phoneTel}
            id="mobile-order-bar-call-btn"
            aria-label={`Call ${content.header.phone}`}
            className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/25 text-white active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
          </a>
          <a
            href={content.header.orderOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-order-bar-order-btn"
            style={{ backgroundColor: content.theme.primaryColor }}
            className="flex-1 inline-flex items-center justify-center space-x-2 text-white rounded-full px-6 py-3.5 text-sm font-semibold shadow-lg active:scale-[0.98] transition-transform"
          >
            <span>{content.header.orderOnlineButtonText}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </a>
        </div>
      </div>
    </div>
  );
};
