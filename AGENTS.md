# Cali K9 website (calik9.com)

Instructions for AI coding assistants (Claude Code, ChatGPT Codex) working on this repo.

## How changes go live

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Hosted on Vercel.
- **Every push to `main` deploys to production at calik9.com automatically** (Vercel project `calik9-next` in the `cali-k9` team). There is no staging step, so check your work before pushing.
- Before every push: run `npx tsc --noEmit` (must pass), and check the page in the dev server (`npm run dev`, http://localhost:3000).
- After pushing: wait for the Vercel deploy (usually 1-3 minutes), then load the live page and confirm the change is there. If no deploy starts within a few minutes, Vercel missed the push; an empty commit (`git commit --allow-empty`) re-triggers it.
- Commit only the files for the change you made, with a short message saying what changed.

## Page and content rules

- **No refunds, ever.** All sales are final. Never write money-back guarantees or refund promises.
- **No em dashes (—) in new customer-facing copy.** Use commas, colons, or periods instead.
- **Locations:** facilities are San Jose, CA · North Hollywood, CA · Brooklyn, NY · Miami, FL. Board & Train is discontinued; `/board-and-train` stays as a retired, noindexed page.
- **Customer testimonials** are real quotes; don't rewrite them.
- When a price changes, search the whole repo for the old price (`grep -rn`) and update every place it appears. Prices also live in `lib/package-checkout.ts` (used for Meta Pixel purchase values).

## Evaluation pages

- `/evaluation-with-behavior-specialist` plus city versions `-san-jose`, `-miami`, `-los-angeles` share the same layout. **Make a change on all four** unless told otherwise. `-v2` is a separate, differently built page.
- Booking happens in a GoHighLevel survey embedded with `components/FormEmbed.tsx` (`survey` prop). The survey's look is controlled by Custom CSS inside GoHighLevel, not by this site.

## Videos and images

- **Never commit video files.** Upload videos to the GoHighLevel media library and use the `assets.cdn.filesafe.space/...mp4` URL.
- Keep website videos web-sized (1080p, H.264, about 4 Mbps). Large 4K or 2 GB+ files stall on phones; re-encode before uploading.
- Video thumbnails go in `public/images/funnel/posters/<media-id>.jpg` (see `lib/video-poster.ts`).
- Resize photos before adding them (about 900-1600px wide, WebP or JPEG).

## Where things live

- Design tokens, fonts, buttons (`.btn`, `.btn-gold`, `.btn-white`, `.btn-blue`): `app/globals.css`, `lib/fonts.ts`.
- Header, footer: `components/Nav.tsx`, `components/Footer.tsx`. Funnel pages that hide the menu/footer are listed in `lib/lander-routes.ts`; new funnel/landing pages should be added there and set `robots: { index: false, follow: false }`.
- Page titles: set just the page name; the layout adds "| Cali K9®".
- Free masterclass name and weekly schedule: `lib/masterclass-sessions.ts` (the site reads dates from here; change it in one place).
- Shared sections: `ServiceHero`, `WebinarPromo` (masterclass promo), `RoadmapBonus`, `MeetJas`, `StreetDogMission`, `PaymentPlansSection`, `CtaBlock`, `PackageList`, `PriceBlock` in `components/`.
- Meta Pixel: loaded in `app/layout.tsx`; purchase events fire on thank-you pages.
- Shop products come from Shopify (`lib/shopify.ts`). Locally, the homepage shop section is empty unless the Shopify environment variables are set; that's expected.
- `app/api/shopify/ghl-order` turns GoHighLevel orders into Shopify orders for fulfillment. It has safety limits to prevent duplicate-order loops; don't remove them.

## Secrets

API keys and tokens are Vercel environment variables (Project → Settings → Environment Variables), never in code. This repo is public: never commit keys, passwords, or customer data.
