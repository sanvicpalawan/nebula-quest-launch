# JayCee Trading & Services — rebuild with a cloud backend

Rebuild the uploaded site exactly as designed, running on this project's stack, with a cloud database behind the admin editor and the wholesale enquiry form.

## What gets built

**The public site, unchanged**
All sections ported as-is: top bar, navigation, hero, category selection, featured ranges, partner logos, editorial story, custom sections, essentials grid, company story, location + map modal, FAQ, online store banner, food ribbon, pre-footer, footer, back-to-top, plus the category detail and wholesale modals. Same colours, fonts, animations, dark mode, and the triple-click-logo admin entry.

**Content saved centrally**
The admin panel currently saves edits only in the editor's own browser. Instead, all site content lives in the cloud so every visitor sees the latest version. The page loads content from the cloud, falls back to the built-in defaults if nothing is saved yet, and dark-mode preference stays per-browser.

**Admin access with the 4-digit passkey**
Triple-click the logo, enter the passkey. The passkey is checked on the server (not in the browser code), and only a successful check can save content. This keeps the same simple experience while preventing anyone from editing the live site by poking at the page.

**Wholesale enquiries**
Submissions are stored in the cloud and listed in a new "Enquiries" tab inside the admin panel, showing business, contact, email, phone, type, message and date, with a status you can mark as pending / contacted / fulfilled.

**Images in the admin panel**
The existing image upload field keeps working; uploaded images are stored in cloud file storage and served by URL, so they persist for all visitors.

## Not included

- The Gemini/AI capability declared in the uploaded project's metadata is unused in the code, so nothing AI-related is carried over.
- Product/FAQ tables from the uploaded type definitions are only used where the site actually reads them; FAQ and category content stay part of the editable site content.

## Technical notes

- Port `src/` into TanStack Start: the single page becomes `src/routes/index.tsx` with a proper page title, description and social tags; components move under `src/components/`, data/types kept as-is. Tailwind v4 tokens from `index.css` merged into `src/styles.css`.
- Enable Lovable Cloud. Tables:
  - `site_content` — single row, `jsonb` document + `updated_at`. Public `SELECT` to anon; no anon write.
  - `inquiries` — anon `INSERT` only; reads restricted (served through a passkey-checked server function).
- Server functions in `src/lib/site.functions.ts`: `getSiteContent` (public read via publishable client), `verifyPasskey`, `saveSiteContent`, `listInquiries`, `updateInquiryStatus`. Passkey stored as a project secret and compared server-side; admin session held client-side for the editing UI only, with every write re-verified server-side.
- Storage bucket `site-images`, public read; uploads go through a passkey-checked server function.
- `WholesaleModal` posts through a server function instead of the browser Supabase client; existing "not configured" fallback removed.
- Express server, `.env.example`, vitest config and other stack-specific files from the upload are dropped; the project's own build setup is used.
