import React from 'react';
import { Snowflake, PackageCheck, Truck, HeartHandshake } from 'lucide-react';

export const CompanyStory: React.FC = () => {
  const pillars = [
    {
      icon: Snowflake,
      title: 'Proper cold storage',
      description: 'Care for temperature-sensitive products.',
    },
    {
      icon: PackageCheck,
      title: 'Careful packing',
      description: 'Attention to every order, big or small.',
    },
    {
      icon: Truck,
      title: 'Local delivery',
      description: 'Delivery arrangements across Palawan.',
    },
    {
      icon: HeartHandshake,
      title: 'Personal service',
      description: 'A knowledgeable team, a phone call away.',
    },
  ];

  return (
    <section id="story-detail" className="py-20 md:py-28 bg-[#FAFAFA] border-t border-[#F5F5F4] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left Column: 2017 Badge */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-start">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] uppercase block mb-3">
              LOCALLY ROOTED
            </span>
            <div className="font-serif italic text-6xl sm:text-7xl lg:text-8xl text-[#991B1B] font-normal leading-none tracking-tight my-2">
              2017
            </div>
            <p className="text-xs text-[#78716C] font-light mt-1">
              Where our story began.
            </p>
          </div>

          {/* Right Column: Narrative */}
          <div className="md:col-span-8 lg:col-span-9 max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#78716C] uppercase block mb-2">
              JAYCEE TRADING & SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight leading-tight mb-6">
              A family passion. <br />
              A Palawan story.
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed mb-6">
              Founded in 2017 by siblings with a shared passion for global food culture, JayCee brings
              local and imported food products to Palawan. From frozen goods and premium meats to dairy
              and pantry staples, we help homes and businesses keep their kitchens supplied.
            </p>
            <p className="text-base sm:text-lg font-serif italic text-[#1C1917]">
              Good products. Familiar personal service.
            </p>
          </div>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 pt-16 md:pt-20 mt-16 border-t border-[#E7E5E4]">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex flex-col space-y-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5F5F4] flex items-center justify-center text-[#991B1B]">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1C1917] pt-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#78716C] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
