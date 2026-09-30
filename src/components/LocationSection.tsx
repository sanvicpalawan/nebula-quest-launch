import React from 'react';
import { ArrowUpRight, Phone, MapPin, Clock } from 'lucide-react';
import {
  STORE_ADDRESS,
  PHONE_NUMBER,
  PHONE_TEL,
  GOOGLE_MAPS_DIRECTIONS_URL,
} from '../data/jayceeData';
import { useSiteContent } from '../context/SiteContentContext';
import { ImageOrPlaceholder } from './ImageOrPlaceholder';
import { Reveal } from './Reveal';

interface LocationSectionProps {
  onOpenMapModal?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenMapModal }) => {
  const { content } = useSiteContent();
  const location = content.location;
  const travelTimes = location?.travelTimes || [];

  return (
    <section id="location" className="py-20 md:py-28 bg-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <Reveal>
          <div className="max-w-2xl mb-12 md:mb-16">
            <span className="text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase block mb-3">
              {location?.eyebrow}
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl text-[#141211] tracking-tight leading-[1.05] mb-5 font-semibold whitespace-pre-line"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              {location?.title}
            </h2>
            <p className="text-[17px] text-[#6E6257] font-light leading-relaxed">
              {location?.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Big dark map card */}
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-[#141211] text-white shadow-2xl shadow-black/25 ring-1 ring-black/10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Storefront image / placeholder */}
              <div className="relative min-h-[280px] lg:min-h-[480px]">
                <ImageOrPlaceholder
                  src={location?.storefrontImage}
                  alt="JayCee Trading and Services storefront at B.M. Road, Puerto Princesa"
                  className="absolute inset-0"
                  imgClassName="brightness-[0.92]"
                  watermarkClassName="w-2/5 max-w-[170px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#141211]/40 pointer-events-none" />
                {/* Brand tag */}
                <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-[#141211]/75 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-white/15">
                  <MapPin className="w-3 h-3 text-[#C9A227]" />
                  {location?.storefrontTag || 'B.M. Road Storefront'}
                </div>
              </div>

              {/* Details */}
              <div className="relative p-7 sm:p-10 lg:p-12 flex flex-col">
                <span className="text-[11px] font-semibold tracking-[0.24em] text-[#C9A227] uppercase block mb-3">
                  Puerto Princesa · Palawan
                </span>

                <h3
                  className="text-3xl sm:text-4xl font-semibold leading-tight mb-4"
                  style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                >
                  {location?.bannerTitle || 'Find us on B.M. Road.'}
                </h3>

                <p className="text-[15px] sm:text-base font-semibold text-white/90 leading-relaxed">
                  {location?.address || STORE_ADDRESS}
                </p>
                <p className="text-[13px] text-white/50 italic font-light mt-1 mb-7">
                  {location?.addressNote}
                </p>

                {/* Travel time timeline */}
                {travelTimes.length > 0 && (
                  <div className="py-5 border-y border-white/10 mb-7">
                    <div className="grid grid-cols-3 gap-2">
                      {travelTimes.map((time, idx) => (
                        <div key={time.origin} className="relative">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="w-2 h-2 rounded-full border-2 border-[#C9A227] bg-transparent" />
                            {idx < travelTimes.length - 1 && (
                              <div className="hidden sm:block flex-1 h-px bg-white/15" />
                            )}
                          </div>
                          <span className="text-[11px] text-white/50 block leading-tight">
                            {time.origin}
                          </span>
                          <span className="text-sm font-semibold text-white block mt-0.5">
                            {time.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-white/40 mt-3 font-light">{location?.travelNote}</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-7">
                  <a
                    href={location?.googleMapsUrl || GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="location-get-directions-btn"
                    style={{ backgroundColor: content.theme.primaryColor }}
                    className="inline-flex items-center space-x-1.5 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg shadow-black/30 hover:brightness-110 active:scale-[0.98]"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </a>

                  <a
                    href={PHONE_TEL}
                    id="location-call-phone-btn"
                    className="inline-flex items-center space-x-1.5 border border-white/30 hover:border-white hover:bg-white/10 text-white px-5 py-3 rounded-full text-sm font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{PHONE_NUMBER}</span>
                  </a>

                  <button
                    type="button"
                    onClick={onOpenMapModal}
                    id="view-interactive-map-btn"
                    className="inline-flex items-center space-x-1.5 text-[13px] font-semibold text-[#C9A227] hover:text-white px-3 py-3 transition-colors cursor-pointer"
                  >
                    <span>View interactive map</span>
                  </button>
                </div>

                {/* Hours & pickup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 mt-auto border-t border-white/10">
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-white/45 uppercase block mb-1.5">
                      Visit the store
                    </span>
                    <p className="text-sm font-semibold text-white inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                      Monday–Saturday · 8am–5pm
                    </p>
                    <p className="text-[13px] text-white/50 mt-0.5">Closed Sunday</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-white/45 uppercase block mb-1.5">
                      Pickup &amp; delivery
                    </span>
                    <p className="text-sm font-semibold text-white">Let&apos;s arrange your next order.</p>
                    <p className="text-[13px] text-white/50 mt-0.5 mb-2 leading-relaxed">
                      {location?.pickupInfo}
                    </p>
                    <a
                      href={PHONE_TEL}
                      id="location-call-jaycee-link"
                      className="inline-flex items-center space-x-1 text-[13px] font-semibold text-[#C9A227] hover:text-white transition-colors"
                    >
                      <span>Call JayCee</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Nearby landmarks */}
        <p className="text-[12px] text-[#A8998A] leading-relaxed mt-6">
          <span className="font-semibold text-[#6E6257]">Nearby:</span>{' '}
          {location?.nearbyLandmarks?.replace(/^Nearby:\s*/, '')}
        </p>
      </div>
    </section>
  );
};
