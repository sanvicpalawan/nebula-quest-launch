import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { LogoDisplay } from './LogoDisplay';
import { LogoClickHandler } from './LogoClickHandler';
import { useSiteContent } from '../context/SiteContentContext';

interface NavbarProps {
  onOpenWholesale?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWholesale }) => {
  const { content, isAdminLoggedIn, openAdminPanel } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoUrl = content.header.logoUrl?.trim() || '/jaycee-logo.svg';
  const glass = scrolled || mobileMenuOpen;

  // Split nav links into left and right groups
  const allLinks = content.header?.navLinks?.length
    ? content.header.navLinks
    : [
        { id: 'nav-1', label: 'Products', href: '#selection' },
        { id: 'nav-2', label: 'Wholesale', href: '#wholesale' },
        { id: 'nav-3', label: 'Our story', href: '#story' },
        { id: 'nav-4', label: 'Delivery', href: '#location' },
        { id: 'nav-5', label: 'FAQs', href: '#faqs' },
        { id: 'nav-6', label: 'Contact', href: '#contact' },
      ];
  const midPoint = Math.ceil(allLinks.length / 2);
  const navLinksLeft = allLinks.slice(0, midPoint);
  const navLinksRight = allLinks.slice(midPoint);

  const linkClass =
    'text-[13px] font-medium text-white/75 hover:text-white transition-colors py-1 cursor-pointer tracking-wide';

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Utility row — visible over the hero, collapses on scroll */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          glass ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 flex items-center justify-between text-[11px] text-white/55">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="w-3 h-3 text-[#C9A227]" />
            {content.header.topBarText}
          </span>
          <span className="hidden sm:block">{content.header.topBarMotto}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="hidden md:inline">Orders &amp; enquiries ·</span>
            <a
              href={content.header.phoneTel}
              id="top-hotline-link"
              className="font-semibold text-white/80 hover:text-white transition-colors"
            >
              {content.header.phone}
            </a>
          </span>
        </div>
      </div>

      {/* Main nav — transparent over hero, charcoal glass on scroll */}
      <div
        className={`transition-all duration-500 ease-out ${
          glass
            ? 'bg-[#141211]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Desktop left nav links */}
            <nav className="hidden lg:flex items-center space-x-7 flex-1" aria-label="Main navigation left">
              {navLinksLeft.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => {
                    if (item.href === '#wholesale' && onOpenWholesale) {
                      e.preventDefault();
                      onOpenWholesale();
                    }
                  }}
                  className={linkClass}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Brand lockup with 3-click Admin handler */}
            <LogoClickHandler id="brand-logo-home" className="flex items-center justify-center focus:outline-none">
              <LogoDisplay size="nav" src={logoUrl} className="shrink-0" />
            </LogoClickHandler>

            {/* Desktop right nav links & actions */}
            <div className="hidden lg:flex items-center space-x-7 flex-1 justify-end">
              <nav className="flex items-center space-x-7" aria-label="Main navigation right">
                {navLinksRight.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    id={`nav-link-${item.label.toLowerCase()}`}
                    onClick={(e) => {
                      if (item.href === '#wholesale' && onOpenWholesale) {
                        e.preventDefault();
                        onOpenWholesale();
                      }
                    }}
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Quick Admin Indicator if logged in */}
              {isAdminLoggedIn && (
                <button
                  type="button"
                  onClick={openAdminPanel}
                  className="inline-flex items-center space-x-1 text-xs bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/40 px-2 py-1 rounded"
                  title="Open Admin Backoffice"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              )}

              {/* Order Online CTA */}
              <a
                href={content.header.orderOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="header-order-online-btn"
                style={{ backgroundColor: content.theme.primaryColor }}
                className="inline-flex items-center space-x-1.5 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-black/20 active:scale-[0.98] hover:brightness-110"
              >
                <span>{content.header.orderOnlineButtonText}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center lg:hidden space-x-2.5">
              <a
                href={content.header.phoneTel}
                id="mobile-nav-call-btn"
                aria-label="Call us"
                className="p-2 text-white/80 hover:text-white rounded-md transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={content.header.orderOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-header-order-btn"
                style={{ backgroundColor: content.theme.primaryColor }}
                className="inline-flex items-center space-x-1 text-white text-xs font-semibold px-3.5 py-2 rounded-full"
              >
                <span>{content.header.orderOnlineButtonText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white hover:text-white focus:outline-none rounded-md"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden border-t border-white/10 bg-[#141211]/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-1 animate-in fade-in slide-in-from-top-2"
          >
            {allLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (item.href === '#wholesale' && onOpenWholesale) {
                    e.preventDefault();
                    onOpenWholesale();
                  }
                }}
                className="flex items-center justify-between px-3 py-3.5 text-base font-medium text-white/85 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#C9A227]" />
              </a>
            ))}

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
              <a
                href={content.header.phoneTel}
                className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mr-1.5 text-[#C9A227]" />
                {content.header.phone}
              </a>
              {isAdminLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdminPanel();
                  }}
                  className="inline-flex items-center text-xs font-semibold text-[#C9A227] px-2.5 py-1.5 bg-[#C9A227]/15 border border-[#C9A227]/40 rounded"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Admin
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
