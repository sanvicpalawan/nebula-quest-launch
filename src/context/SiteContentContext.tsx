import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { SiteContentState } from '../types/siteContent';
import { DEFAULT_SITE_CONTENT } from '../data/defaultSiteContent';
import { getSiteContent, saveSiteContent, verifyPasskey } from '../lib/site.functions';

const AUTH_KEY = 'jaycee_admin_auth_v1';
const THEME_MODE_KEY = 'jaycee_theme_mode_v1';

interface SiteContentContextType {
  content: SiteContentState;
  updateContent: (updater: (prev: SiteContentState) => SiteContentState) => void;
  resetToDefault: () => void;
  isAdminLoggedIn: boolean;
  adminPasskey: string | null;
  loginAdmin: (passkey: string) => Promise<boolean>;
  logoutAdmin: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isAdminPanelOpen: boolean;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSaving: boolean;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

function mergeContent(parsed: any): SiteContentState {
  try {
    if (parsed && typeof parsed === 'object') {
        // Deep merge with default to ensure no missing keys if schema expanded
        return {

          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          theme: { ...DEFAULT_SITE_CONTENT.theme, ...(parsed.theme || {}) },
          header: {
            ...DEFAULT_SITE_CONTENT.header,
            ...(parsed.header || {}),
            navLinks:
              Array.isArray(parsed.header?.navLinks) && parsed.header.navLinks.length > 0
                ? parsed.header.navLinks
                : DEFAULT_SITE_CONTENT.header.navLinks,
          },
          hero: {
            ...DEFAULT_SITE_CONTENT.hero,
            ...(parsed.hero || {}),
            bgImageUrl:
              typeof parsed.hero?.bgImageUrl === 'string' && parsed.hero.bgImageUrl.trim().length > 0
                ? parsed.hero.bgImageUrl.trim()
                : DEFAULT_SITE_CONTENT.hero.bgImageUrl,
          },
          companyStory: { ...DEFAULT_SITE_CONTENT.companyStory, ...(parsed.companyStory || {}) },
          location: { ...DEFAULT_SITE_CONTENT.location, ...(parsed.location || {}) },
          onlineStoreBanner: { ...DEFAULT_SITE_CONTENT.onlineStoreBanner, ...(parsed.onlineStoreBanner || {}) },
          preFooter: { ...DEFAULT_SITE_CONTENT.preFooter, ...(parsed.preFooter || {}) },
          footer: {
            ...DEFAULT_SITE_CONTENT.footer,
            ...(parsed.footer || {}),
            exploreLinks:
              Array.isArray(parsed.footer?.exploreLinks) && parsed.footer.exploreLinks.length > 0
                ? parsed.footer.exploreLinks
                : DEFAULT_SITE_CONTENT.footer.exploreLinks,
            productRanges:
              Array.isArray(parsed.footer?.productRanges) && parsed.footer.productRanges.length > 0
                ? parsed.footer.productRanges
                : DEFAULT_SITE_CONTENT.footer.productRanges,
            openingHoursWeekday:
              parsed.footer?.openingHoursWeekday || DEFAULT_SITE_CONTENT.footer.openingHoursWeekday,
            openingHoursWeekend:
              parsed.footer?.openingHoursWeekend || DEFAULT_SITE_CONTENT.footer.openingHoursWeekend,
            googleMapsDirectionsUrl:
              parsed.footer?.googleMapsDirectionsUrl || DEFAULT_SITE_CONTENT.footer.googleMapsDirectionsUrl,
          },
          categories: (parsed.categories?.length ? parsed.categories : DEFAULT_SITE_CONTENT.categories).map(
            (c: any, idx: number) => ({
              ...c,
              image: c.image?.trim() || DEFAULT_SITE_CONTENT.categories[idx]?.image || 'd76694265947?auto=format&fit=crop&w=600&q=80',
            })
          ),
          featuredRanges: (parsed.featuredRanges?.length ? parsed.featuredRanges : DEFAULT_SITE_CONTENT.featuredRanges).map(
            (f: any, idx: number) => ({
              ...f,
              image: f.image?.trim() || DEFAULT_SITE_CONTENT.featuredRanges[idx]?.image || 'd76694265947?auto=format&fit=crop&w=800&q=80',
            })
          ),
          partners: parsed.partners?.length ? parsed.partners : DEFAULT_SITE_CONTENT.partners,
          editorialStories: (parsed.editorialStories?.length ? parsed.editorialStories : DEFAULT_SITE_CONTENT.editorialStories).map(
            (s: any, idx: number) => ({
              ...s,
              image: s.image?.trim() || DEFAULT_SITE_CONTENT.editorialStories[idx]?.image || 'd76694265947?auto=format&fit=crop&w=800&q=80',
            })
          ),
          essentials: (parsed.essentials?.length ? parsed.essentials : DEFAULT_SITE_CONTENT.essentials).map(
            (e: any, idx: number) => ({
              ...e,
              image: e.image?.trim() || DEFAULT_SITE_CONTENT.essentials[idx]?.image || 'd76694265947?auto=format&fit=crop&w=600&q=80',
            })
          ),
          faqs: parsed.faqs?.length ? parsed.faqs : DEFAULT_SITE_CONTENT.faqs,
          ribbonImages: (parsed.ribbonImages?.length ? parsed.ribbonImages : DEFAULT_SITE_CONTENT.ribbonImages).map(
            (r: any, idx: number) => ({
              ...r,
              url: r.url?.trim() || DEFAULT_SITE_CONTENT.ribbonImages[idx]?.url || 'd76694265947?auto=format&fit=crop&w=600&q=80',
            })
          ),
          customSections: parsed.customSections || [],
        };
    }
  } catch (e) {
    console.error('Failed to parse saved site content:', e);
  }
  return DEFAULT_SITE_CONTENT;
}

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentState>(DEFAULT_SITE_CONTENT);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [adminPasskey, setAdminPasskey] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY);
    } catch {
      return null;
    }
  });
  const isAdminLoggedIn = adminPasskey !== null;


  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedMode = localStorage.getItem(THEME_MODE_KEY);
      if (savedMode !== null) {
        return savedMode === 'dark';
      }
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Sync dark mode class on document.documentElement
  useEffect(() => {
    try {
      localStorage.setItem(THEME_MODE_KEY, isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.error('Failed to save theme mode to localStorage:', e);
    }
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Load the shared content saved in the cloud
  useEffect(() => {
    let cancelled = false;
    getSiteContent()
      .then((remote) => {
        if (cancelled) return;
        if (remote) setContent(mergeContent(JSON.parse(remote)));
      })
      .catch((e) => console.error('Failed to load site content:', e))
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist admin edits centrally (debounced)
  useEffect(() => {
    if (!isLoaded || !adminPasskey) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setIsSaving(true);
    saveTimer.current = setTimeout(() => {
      saveSiteContent({ data: { passkey: adminPasskey, content } })
        .catch((e) => console.error('Failed to save site content:', e))
        .finally(() => setIsSaving(false));
    }, 800);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [content, adminPasskey, isLoaded]);


  // Apply dynamic theme custom properties and font families
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', content.theme.primaryColor);
    root.style.setProperty('--primary-hover-color', content.theme.primaryHoverColor);
    root.style.setProperty('--accent-color', content.theme.accentColor);

    // Update body and heading fonts dynamically
    let headingFont = 'var(--font-serif)';
    if (content.theme.fontFamilyHeading === 'Playfair Display') {
      headingFont = '"Playfair Display", Georgia, serif';
    } else if (content.theme.fontFamilyHeading === 'Cinzel') {
      headingFont = '"Cinzel", Georgia, serif';
    } else if (content.theme.fontFamilyHeading === 'Plus Jakarta Sans') {
      headingFont = '"Plus Jakarta Sans", system-ui, sans-serif';
    } else if (content.theme.fontFamilyHeading === 'System Serif') {
      headingFont = 'Georgia, Cambria, serif';
    } else {
      headingFont = '"Cormorant Garamond", Georgia, serif';
    }

    let bodyFont = 'var(--font-sans)';
    if (content.theme.fontFamilyBody === 'Inter') {
      bodyFont = '"Inter", system-ui, sans-serif';
    } else if (content.theme.fontFamilyBody === 'Roboto') {
      bodyFont = '"Roboto", system-ui, sans-serif';
    } else if (content.theme.fontFamilyBody === 'System Sans') {
      bodyFont = 'system-ui, -apple-system, sans-serif';
    } else {
      bodyFont = '"Plus Jakarta Sans", system-ui, sans-serif';
    }

    root.style.setProperty('--dynamic-heading-font', headingFont);
    root.style.setProperty('--dynamic-body-font', bodyFont);
  }, [content.theme]);

  const updateContent = (updater: (prev: SiteContentState) => SiteContentState) => {
    setContent((prev) => updater(prev));
  };

  const resetToDefault = () => {
    setContent(DEFAULT_SITE_CONTENT);
  };

  const loginAdmin = async (passkey: string): Promise<boolean> => {
    try {
      const { ok } = await verifyPasskey({ data: { passkey } });
      if (!ok) return false;
    } catch (e) {
      console.error('Passkey check failed:', e);
      return false;
    }
    setAdminPasskey(passkey);
    try {
      sessionStorage.setItem(AUTH_KEY, passkey);
    } catch {}
    setIsLoginModalOpen(false);
    setIsAdminPanelOpen(true);
    return true;
  };

  const logoutAdmin = () => {
    setAdminPasskey(null);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {}
    setIsAdminPanelOpen(false);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openAdminPanel = () => setIsAdminPanelOpen(true);
  const closeAdminPanel = () => setIsAdminPanelOpen(false);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateContent,
        resetToDefault,
        isAdminLoggedIn,
        adminPasskey,
        loginAdmin,
        logoutAdmin,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isAdminPanelOpen,
        openAdminPanel,
        closeAdminPanel,
        isDarkMode,
        toggleDarkMode,
        isSaving,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
