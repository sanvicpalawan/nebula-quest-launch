import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { TopBar } from "../components/TopBar";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { CategorySelection } from "../components/CategorySelection";
import { FeaturedRanges } from "../components/FeaturedRanges";
import { PartnerLogos } from "../components/PartnerLogos";
import { EditorialStory } from "../components/EditorialStory";
import { EssentialsGrid } from "../components/EssentialsGrid";
import { CompanyStory } from "../components/CompanyStory";
import { LocationSection } from "../components/LocationSection";
import { FAQSection } from "../components/FAQSection";
import { OnlineStoreBanner } from "../components/OnlineStoreBanner";
import { FoodRibbon } from "../components/FoodRibbon";
import { PreFooterCTA } from "../components/PreFooterCTA";
import { Footer } from "../components/Footer";
import { WholesaleModal } from "../components/WholesaleModal";
import { InteractiveMapModal } from "../components/InteractiveMapModal";
import { CategoryDetailModal } from "../components/CategoryDetailModal";
import { BackToTop } from "../components/BackToTop";
import { CustomSectionsRenderer } from "../components/CustomSectionsRenderer";
import { AdminLoginModal } from "../components/admin/AdminLoginModal";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { SiteContentProvider, useSiteContent } from "../context/SiteContentContext";
import type { CategoryItem } from "../types/siteContent";

const DESCRIPTION =
  "Quality food and reliable supply delivered across Palawan. Imported meats, frozen seafood, dairy, and kitchen essentials for homes and businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JayCee Trading & Services | Food Supply in Palawan" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "JayCee Trading & Services" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function MainSite() {
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const { isLoginModalOpen, isAdminPanelOpen } = useSiteContent();

  const handleOpenWholesale = () => setWholesaleModalOpen(true);
  const handleOpenMap = () => setMapModalOpen(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#121110] text-[#1C1917] dark:text-[#F5F5F4] font-sans antialiased selection:bg-[#991B1B] selection:text-white flex flex-col justify-between transition-colors duration-200">
      <TopBar />
      <Navbar onOpenWholesale={handleOpenWholesale} />

      <main className="flex-1">
        <Hero onWholesaleEnquiry={handleOpenWholesale} />
        <CategorySelection onSelectCategory={(cat) => setSelectedCategory(cat)} />
        <FeaturedRanges />
        <PartnerLogos />
        <EditorialStory onOpenWholesale={handleOpenWholesale} />
        <CustomSectionsRenderer />
        <EssentialsGrid />
        <CompanyStory />
        <LocationSection onOpenMapModal={handleOpenMap} />
        <FAQSection />
        <OnlineStoreBanner />
        <FoodRibbon />
        <PreFooterCTA />
      </main>

      <Footer onOpenWholesale={handleOpenWholesale} />

      <WholesaleModal isOpen={wholesaleModalOpen} onClose={() => setWholesaleModalOpen(false)} />
      <InteractiveMapModal isOpen={mapModalOpen} onClose={() => setMapModalOpen(false)} />

      {selectedCategory && (
        <CategoryDetailModal
          category={selectedCategory as never}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      {isLoginModalOpen && <AdminLoginModal />}
      {isAdminPanelOpen && <AdminDashboard />}

      <BackToTop />
    </div>
  );
}

function Index() {
  return (
    <SiteContentProvider>
      <MainSite />
    </SiteContentProvider>
  );
}
