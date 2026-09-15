import React, { useRef, useState } from 'react';
import { Upload, X, Images, Eye } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { listSiteImages, uploadSiteImage } from '../../lib/site.functions';

interface LogoUploadPanelProps {
  currentLogoUrl: string;
  onLogoChange: (url: string) => void;
  label?: string;
}

/**
 * LogoUploadPanel - Dedicated admin panel for logo management
 * Features:
 * - Upload from device (PNG/SVG with transparency)
 * - Browse previously saved logos from storage
 * - Preview with dark/light mode indicators
 * - Optimized for admin visibility in both light and dark modes
 * - Responsive preview for mobile, tablet, desktop
 */
export const LogoUploadPanel: React.FC<LogoUploadPanelProps> = ({
  currentLogoUrl,
  onLogoChange,
  label = 'Website Logo (Header & Footer)',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { adminPasskey, isDarkMode } = useSiteContent();
  const [uploading, setUploading] = useState(false);
  const [showStorage, setShowStorage] = useState(false);
  const [storageImages, setStorageImages] = useState<Array<{ name: string; url: string }>>([]);
  const [loadingStorage, setLoadingStorage] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type - recommend PNG/SVG for transparency
    if (!['image/png', 'image/svg+xml'].includes(file.type)) {
      alert('Please upload a PNG or SVG file (supports transparency).\nRecommended: PNG with transparent background.');
      return;
    }

    // Check size limit (15MB — must match the storage bucket file_size_limit)
    if (file.size > 15 * 1024 * 1024) {
      alert('File size should be under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      const result = uploadEvent.target?.result;
      if (typeof result !== 'string') return;
      if (!adminPasskey) {
        alert('Please sign in again before uploading images.');
        return;
      }

      setUploading(true);
      try {
        const { url } = await uploadSiteImage({
          data: { passkey: adminPasskey, fileName: file.name, dataUrl: result },
        });
        onLogoChange(url);
      } catch (err) {
        console.error('Logo upload failed:', err);
        alert('Logo upload failed. Please try again.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    onLogoChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseStorage = async () => {
    if (!adminPasskey) {
      alert('Please sign in again before browsing saved images.');
      return;
    }
    const nextOpen = !showStorage;
    setShowStorage(nextOpen);
    if (!nextOpen || storageImages.length > 0) return;
    setLoadingStorage(true);
    try {
      setStorageImages(await listSiteImages({ data: { passkey: adminPasskey } }));
    } catch (err) {
      console.error('Could not load saved images:', err);
      alert('Saved images could not be loaded. Please try again.');
    } finally {
      setLoadingStorage(false);
    }
  };

  return (
    <div className="space-y-4 p-5 rounded-lg bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-700">
      {/* Label */}
      <label className="block text-sm font-bold text-stone-900 dark:text-white uppercase tracking-wider">
        {label}
      </label>

      {/* Helper Text */}
      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
        📌 <strong>Recommended:</strong> PNG or SVG with transparent background for uniform display in light & dark modes on all devices.
      </p>

      {/* Current Logo Preview - Dual Mode */}
      {currentLogoUrl?.trim() && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">Live Preview (Light & Dark Modes)</p>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Light Mode Preview */}
            <div className="rounded-lg border border-stone-300 dark:border-stone-600 bg-white p-4 flex flex-col items-center justify-center min-h-40">
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-2 font-semibold">Light Mode</p>
              <div className="flex items-center justify-center h-24">
                <img
                  src={currentLogoUrl}
                  alt="Light mode preview"
                  className="h-20 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Dark Mode Preview */}
            <div className="rounded-lg border border-stone-600 bg-stone-800 p-4 flex flex-col items-center justify-center min-h-40">
              <p className="text-[11px] text-stone-400 mb-2 font-semibold">Dark Mode</p>
              <div className="flex items-center justify-center h-24">
                <img
                  src={currentLogoUrl}
                  alt="Dark mode preview"
                  className="h-20 object-contain brightness-110 contrast-110"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Responsive Size Preview */}
          <div className="rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-100 dark:bg-stone-800 p-4">
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-3">Responsive Sizes</p>
            <div className="grid grid-cols-3 gap-2">
              {/* Mobile */}
              <div className="flex flex-col items-center p-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900">
                <p className="text-[10px] text-stone-500 dark:text-stone-400 mb-1.5 font-medium">📱 Mobile</p>
                <img
                  src={currentLogoUrl}
                  alt="Mobile preview"
                  className="h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Tablet */}
              <div className="flex flex-col items-center p-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900">
                <p className="text-[10px] text-stone-500 dark:text-stone-400 mb-1.5 font-medium">📱 Tablet</p>
                <img
                  src={currentLogoUrl}
                  alt="Tablet preview"
                  className="h-12 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Desktop */}
              <div className="flex flex-col items-center p-2 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900">
                <p className="text-[10px] text-stone-500 dark:text-stone-400 mb-1.5 font-medium">🖥️ Desktop</p>
                <img
                  src={currentLogoUrl}
                  alt="Desktop preview"
                  className="h-16 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Controls */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={currentLogoUrl}
              onChange={(e) => onLogoChange(e.target.value)}
              placeholder="https://... or upload from device"
              className="w-full text-xs font-mono px-3 py-2.5 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 focus:border-red-600 dark:focus:border-red-500 transition-colors"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/svg+xml"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleTriggerUpload}
            disabled={uploading}
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-white text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            title="Upload PNG/SVG from device"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading…' : 'Upload'}</span>
          </button>

          <button
            type="button"
            onClick={() => void handleBrowseStorage()}
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-stone-300 dark:border-stone-600 rounded-md bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-white text-xs font-semibold transition-colors whitespace-nowrap"
            title="Choose from saved logos"
          >
            <Images className="w-4 h-4" />
            <span>Saved</span>
          </button>

          {currentLogoUrl && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 border border-stone-300 dark:border-stone-600 rounded-md bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-800 dark:text-red-400 text-xs font-semibold transition-colors whitespace-nowrap"
              title="Clear logo"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Storage Browser */}
      {showStorage && (
        <div className="rounded-md border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 p-3">
          {loadingStorage ? (
            <p className="text-xs text-stone-600 dark:text-stone-400">Loading saved logos…</p>
          ) : storageImages.length === 0 ? (
            <p className="text-xs text-stone-600 dark:text-stone-400">No saved logos found. Upload one first.</p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">Click to select:</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                {storageImages.map((image) => (
                  <button
                    key={image.name}
                    type="button"
                    onClick={() => {
                      onLogoChange(image.url);
                      setShowStorage(false);
                    }}
                    className="aspect-square border-2 border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 rounded-md overflow-hidden hover:border-stone-600 dark:hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-red-500 transition-all hover:scale-105"
                    title={image.name}
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-contain bg-white dark:bg-stone-900 p-1"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
