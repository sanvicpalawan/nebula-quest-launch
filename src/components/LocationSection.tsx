import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import {
  STORE_ADDRESS,
  PHONE_NUMBER,
  PHONE_TEL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  TRAVEL_TIMES,
} from '../data/jayceeData';
import { useSiteContent } from '../context/SiteContentContext';

interface LocationSectionProps {
  onOpenMapModal?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenMapModal }) => {
  const { content } = useSiteContent();
  const storefrontImage = content.location.storefrontImage;

  return (
    <section id="location" className="py-20 md:py-28 bg-white dark:bg-[#141212] border-t border-[#F5F5F4] dark:border-[#262322] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Store Location Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-24">
          {/* Left Column: Real Store Front Facade Image */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F5F5F4] dark:bg-[#23201F] shadow-xs">
            {storefrontImage?.trim() ? (
              <img
                src={storefrontImage}
                alt="JayCee Trading and Services storefront at B.M. Road, Puerto Princesa"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            ) : null}

            {/* Subtle brand tag in image */}
            <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
              B.M. Road Storefront
            </div>
          </div>

          {/* Right Column: Location Details & Distances */}
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-3">
              OUR NEW LOCATION
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] dark:text-white tracking-tight leading-tight mb-4">
              We&apos;ve moved. <br />
              Come find us.
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed mb-6">
              Same great products and personal service, now in a new location.
            </p>

            <div className="mb-6 space-y-1">
              <p className="text-sm sm:text-base font-semibold text-[#1C1917] dark:text-[#F5F5F4]">
                {STORE_ADDRESS}
              </p>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] italic font-light">
                Continue straight to the end of the road.
              </p>
            </div>

            {/* Travel Time Timeline */}
            <div className="py-5 border-y border-[#E7E5E4] dark:border-[#262322] my-6">
              <div className="grid grid-cols-3 gap-2">
                {TRAVEL_TIMES.map((time, idx) => (
                  <div key={time.origin} className="relative">
                    {/* Circle marker */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="w-2 h-2 rounded-full border-2 border-[#A8A29E] dark:border-[#78716C] bg-white dark:bg-[#1C1917]" />
                      {idx < TRAVEL_TIMES.length - 1 && (
                        <div className="hidden sm:block flex-1 h-px bg-[#E7E5E4] dark:bg-[#262322]" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#78716C] dark:text-[#A8A29E] block leading-tight">
                      {time.origin}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#1C1917] dark:text-white block mt-0.5">
                      {time.duration}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#A8A29E] dark:text-[#78716C] mt-3 font-light">
                Approximate travel time via B.M. Road.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="location-get-directions-btn"
                className="inline-flex items-center space-x-1.5 bg-[#8B1D24] hover:bg-[#74151B] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all shadow-sm"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>

              <a
                href={PHONE_TEL}
                id="location-call-phone-btn"
                className="inline-flex items-center space-x-1.5 border border-[#D6D3D1] dark:border-[#44403C] hover:border-[#1C1917] dark:hover:border-white text-[#1C1917] dark:text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Landmarks list */}
            <p className="text-[11px] text-[#A8A29E] dark:text-[#78716C] leading-relaxed">
              <span className="font-medium text-[#78716C] dark:text-[#A8A29E]">Nearby:</span> J&T Express Puerto
              Princesa · Christine Tan Building · A&G Homebuilders · Riben Enterprise Palawan
            </p>
          </div>
        </div>

        {/* Map Callout Banner Card */}
        <div className="rounded-xl bg-[#F5F5F4] dark:bg-[#181615] p-6 sm:p-8 lg:p-10 border border-[#E7E5E4] dark:border-[#262322] transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-1.5">
                PUERTO PRINCESA · PALAWAN
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917] dark:text-white font-normal mb-2">
                Find us on B.M. Road.
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#D6D3D1] mb-6 font-light">
                {STORE_ADDRESS}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenMapModal}
                  id="view-interactive-map-btn"
                  className="inline-flex items-center space-x-1.5 bg-[#8B1D24] hover:bg-[#74151B] text-white px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer"
                >
                  <span>View larger map</span>
                </button>

                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="map-card-directions-link"
                  className="inline-flex items-center space-x-1 text-xs sm:text-sm font-medium text-[#1C1917] dark:text-[#D6D3D1] hover:text-[#991B1B] dark:hover:text-[#F87171] px-3 py-2"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-64 sm:h-80 overflow-hidden rounded-lg border border-[#E7E5E4] dark:border-[#3A3532] bg-[#E7E5E4]">
              <iframe
                title="Map showing JayCee Trading & Services on B.M. Road, Puerto Princesa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.022030908181!2d118.74953547502824!3d9.764200990329519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b563000ff94ee5%3A0x361d56d8cceee597!2sJayCee%20Trading%20%26%20Services!5e0!3m2!1sen!2sph!4v1793161997156!5m2!1sen!2sph"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Store Hours & Pickup Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-[#E7E5E4] dark:border-[#262322]">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-1">
                VISIT THE STORE
              </span>
              <p className="text-sm font-semibold text-[#1C1917] dark:text-white">
                Monday–Saturday · 8am–5pm
              </p>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-0.5">
                Closed Sunday
              </p>
            </div>

            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#78716C] dark:text-[#A8A29E] uppercase block mb-1">
                PICKUP & DELIVERY
              </span>
              <p className="text-sm font-semibold text-[#1C1917] dark:text-white">
                Let&apos;s arrange your next order.
              </p>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-0.5 mb-2">
                Call ahead for pickup or to confirm delivery to your location.
              </p>
              <a
                href={PHONE_TEL}
                id="location-call-jaycee-link"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-[#991B1B] dark:text-[#F87171] hover:underline"
              >
                <span>Call JayCee</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
