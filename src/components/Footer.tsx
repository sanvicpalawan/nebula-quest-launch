import React from 'react';
import { ArrowUpRight, ArrowUp, Facebook, Instagram, MapPin } from 'lucide-react';
import { TikTokIcon } from './icons/TikTokIcon';
import { LogoDisplay } from './LogoDisplay';
import { LogoClickHandler } from './LogoClickHandler';
import { useSiteContent } from '../context/SiteContentContext';
import type { SocialPlatform } from '../types/siteContent';

const SOCIAL_META: Record<SocialPlatform, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  facebook: { label: 'Facebook', Icon: Facebook },
  instagram: { label: 'Instagram', Icon: Instagram },
  tiktok: { label: 'TikTok', Icon: TikTokIcon },
};

interface FooterProps {
  onOpenWholesale?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWholesale }) => {
  const { content, openLoginModal, isAdminLoggedIn, openAdminPanel } = useSiteContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = (content.footer?.socialLinks || []).filter((link) => link.url?.trim());

  return (
    <footer
      id="contact"
      className="relative bg-[#141211] text-white overflow-hidden pt-14 pb-24 md:pt-20 md:pb-14 transition-colors"
    >
      {/* Faint oversized logo watermark */}
      <img
        src="/jaycee-logo.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-12 w-[380px] md:w-[540px] opacity-[0.06] select-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 md:gap-10 lg:gap-12 mb-12 md:mb-16">
          {/* Brand info with 3-click trigger */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            <LogoClickHandler id="footer-brand-logo" className="inline-block">
              <LogoDisplay size="lg" src={content.header.logoUrl?.trim() || '/jaycee-logo.svg'} />
            </LogoClickHandler>
            <p className="text-[13px] sm:text-sm text-white/55 font-light max-w-xs pt-1 whitespace-pre-line leading-relaxed">
              {content.footer?.tagline || 'Quality food. Personal service.\nProudly Palawan.'}
            </p>
            <div className="pt-2 flex items-center gap-2.5">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => {
                  const meta = SOCIAL_META[link.platform] || SOCIAL_META.facebook;
                  const Icon = meta.Icon;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${meta.label} — JayCee Trading & Services`}
                      aria-label={`${meta.label} — JayCee Trading & Services`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/60 hover:text-white hover:bg-[#A3161F] hover:border-[#A3161F] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })
              ) : (
                <a
                  href={content.footer?.instagramUrl || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[13px] text-white/55 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>{content.footer?.instagramHandle || '@jaycee.tradingservices'}</span>
                </a>
              )}
            </div>
          </div>

          {/* Explore links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] text-[#C9A227] uppercase mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {(content.footer?.exploreLinks || [
                { id: 'f-exp-1', label: 'Products', href: '#selection' },
                { id: 'f-exp-2', label: 'Wholesale', href: '#wholesale' },
                { id: 'f-exp-3', label: 'Our story', href: '#story' },
                { id: 'f-exp-4', label: 'Delivery', href: '#location' },
                { id: 'f-exp-5', label: 'FAQs', href: '#faqs' },
                { id: 'f-exp-6', label: 'Contact', href: '#contact' },
              ]).map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === '#wholesale' && onOpenWholesale) {
                        e.preventDefault();
                        onOpenWholesale();
                      }
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product range */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] text-[#C9A227] uppercase mb-5">
              Product range
            </h4>
            <ul className="space-y-3">
              {(content.footer?.productRanges || [
                { id: 'f-rng-1', label: 'Meats', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-2', label: 'Seafood', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-3', label: 'Dairy & Cheese', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-4', label: 'Sausages & Cold Cuts', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-5', label: 'Frozen & Fries', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
                { id: 'f-rng-6', label: 'Baking & Pantry', href: content.header?.orderOnlineUrl || 'https://jayceetrading.com' },
              ]).map((range) => (
                <li key={range.id}>
                  <a
                    href={range.href || content.header?.orderOnlineUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center group"
                  >
                    <span>{range.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Come find us */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] text-[#C9A227] uppercase mb-5">
              Come find us
            </h4>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              {content.footer?.address || 'National Highway, Brgy. San Pedro, Puerto Princesa, Palawan'}
            </p>
            <p className="text-sm text-white font-semibold">
              <a href={content.header?.phoneTel || 'tel:+639171234567'} className="hover:text-[#C9A227] transition-colors">
                {content.header?.phone || '+63 917 123 4567'}
              </a>
            </p>
            <p className="text-sm text-white/60">
              <a href={`mailto:${content.footer?.email || 'info@jayceetrading.com'}`} className="hover:text-white transition-colors">
                {content.footer?.email || 'info@jayceetrading.com'}
              </a>
            </p>
            <div className="pt-1 text-[13px] text-white/50 font-light">
              <p>{content.footer?.openingHoursWeekday || content.footer?.hours || 'Monday–Saturday 8am–5pm'}</p>
              <p>{content.footer?.openingHoursWeekend || content.footer?.closedDay || 'Closed Sunday'}</p>
            </div>
            <div className="pt-2">
              <a
                href={content.footer?.googleMapsDirectionsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-get-directions-link"
                className="inline-flex items-center space-x-1.5 text-[13px] font-semibold text-white/70 hover:text-white transition-colors"
              >
                <span>Get Directions</span>
                <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom legal & copyright bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[12px] text-white/40 gap-4">
          <p>{content.footer?.copyrightText || '© 2026 JayCee Trading & Services. All rights reserved.'}</p>

          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-white/80 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-white/80 transition-colors">
              Terms
            </a>
            {/* Direct discrete admin button */}
            <button
              onClick={isAdminLoggedIn ? openAdminPanel : openLoginModal}
              id="footer-admin-access-btn"
              className="text-white/35 hover:text-white/70 transition-colors cursor-pointer text-[11px]"
              title="Admin Portal (Triple-click Logo or click here)"
            >
              Backoffice
            </button>
            <button
              onClick={scrollToTop}
              id="footer-back-to-top-btn"
              className="inline-flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
