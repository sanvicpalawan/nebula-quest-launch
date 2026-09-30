import React, { useState } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { FAQS, PHONE_TEL } from '../data/jayceeData';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './Reveal';

export const FAQSection: React.FC = () => {
  const { content } = useSiteContent();
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs =
    content.faqs && content.faqs.length > 0
      ? content.faqs
      : FAQS.map((f) => ({ id: f.id, question: f.question, answer: f.answer }));

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 md:py-28 bg-[#F6F1EA] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left column: heading & contact link */}
          <Reveal className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-[0.24em] text-[#6E6257] uppercase block mb-3">
              A little local knowledge
            </span>
            <h2
              className="text-4xl sm:text-5xl text-[#141211] tracking-tight leading-[1.05] mb-5 font-semibold"
              style={{ fontFamily: 'var(--dynamic-heading-font)' }}
            >
              Good questions. <br />
              <span className="italic">Simple answers.</span>
            </h2>
            <a
              href={PHONE_TEL}
              id="faq-ask-team-link"
              className="inline-flex items-center space-x-1.5 text-[15px] font-semibold text-[#6E6257] hover:text-[#A3161F] transition-colors"
            >
              <span>Ask our team</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Reveal>

          {/* Right column: accordion */}
          <Reveal delay={120} className="lg:col-span-8">
            <div className="divide-y divide-[#E4D9C9] border-y border-[#E4D9C9]">
              {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      id={`faq-btn-${faq.id}`}
                      className="w-full flex items-center justify-between gap-6 text-left group py-6 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`text-lg sm:text-xl font-semibold transition-colors ${
                          isOpen ? 'text-[#A3161F]' : 'text-[#141211] group-hover:text-[#A3161F]'
                        }`}
                        style={{ fontFamily: 'var(--dynamic-heading-font)' }}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#A3161F] border-[#A3161F] text-white rotate-45'
                            : 'border-[#D8CCBA] text-[#6E6257] group-hover:border-[#A3161F] group-hover:text-[#A3161F]'
                        }`}
                      >
                        <Plus className="w-4.5 h-4.5" />
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="pb-7 pr-8 sm:pr-16 -mt-1 text-[16px] text-[#6E6257] leading-relaxed font-light animate-in fade-in slide-in-from-bottom-1 duration-300"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
