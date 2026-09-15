import React from 'react';
import { Facebook, Instagram, Plus, Trash2 } from 'lucide-react';
import { TikTokIcon } from '../icons/TikTokIcon';
import type { SocialLinkItem, SocialPlatform } from '../../types/siteContent';

export const SOCIAL_PLATFORMS: Array<{
  value: SocialPlatform;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: 'facebook', label: 'Facebook', Icon: Facebook },
  { value: 'instagram', label: 'Instagram', Icon: Instagram },
  { value: 'tiktok', label: 'TikTok', Icon: TikTokIcon },
];

interface SocialLinksEditorProps {
  links: SocialLinkItem[];
  onChange: (links: SocialLinkItem[]) => void;
}

/**
 * Shared add / edit / delete editor for social media links.
 * Used by both the Header and Footer admin tabs — both edit the
 * same list, which is rendered as Lucide-style icons in the footer.
 */
export const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({ links, onChange }) => {
  const handleAdd = () => {
    onChange([...links, { id: `social-${Date.now()}`, platform: 'facebook', url: '' }]);
  };

  const handleDelete = (idx: number) => {
    onChange(links.filter((_, i) => i !== idx));
  };

  const handlePlatformChange = (idx: number, platform: SocialPlatform) => {
    const next = [...links];
    next[idx] = { ...next[idx], platform };
    onChange(next);
  };

  const handleUrlChange = (idx: number, url: string) => {
    const next = [...links];
    next[idx] = { ...next[idx], url };
    onChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
          Social Media Links
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center space-x-1 text-xs text-[#8B1D24] font-medium hover:underline cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Social Link</span>
        </button>
      </div>

      {links.length === 0 && (
        <p className="text-xs text-stone-400 bg-stone-50 border border-dashed border-stone-300 rounded-lg px-3 py-2.5">
          No social links yet. Add Facebook, Instagram, or TikTok with the button above — only links with a URL are shown on the site.
        </p>
      )}

      <div className="space-y-2">
        {links.map((link, idx) => {
          const platform = SOCIAL_PLATFORMS.find((p) => p.value === link.platform) || SOCIAL_PLATFORMS[0];
          const Icon = platform.Icon;
          return (
            <div
              key={link.id}
              className="flex items-center space-x-2 bg-stone-50 p-2 rounded-lg border border-stone-200"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700">
                <Icon className="w-4 h-4" />
              </span>
              <select
                value={link.platform}
                onChange={(e) => handlePlatformChange(idx, e.target.value as SocialPlatform)}
                className="shrink-0 text-xs px-2 py-1.5 border border-stone-300 rounded bg-white font-medium text-stone-700 max-w-[7.5rem]"
                aria-label="Social platform"
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleUrlChange(idx, e.target.value)}
                placeholder="https://..."
                className="flex-1 min-w-0 text-xs px-2.5 py-1.5 border border-stone-300 rounded bg-white font-mono"
              />
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-1.5 text-stone-400 hover:text-red-600 rounded shrink-0"
                title={`Delete ${platform.label} link`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
