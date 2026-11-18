# Dheeran Movers Singapore website

React + Vite + Tailwind CSS landing site for the 30 requested moving-service and area routes. The workspace had no pre-existing website source, so this is a fresh, deployable implementation. The editorial content, illustrations and navigation are original. The page structure takes general customer-journey inspiration from the publicly visible [Move Move Movers website](https://movemove.biz/): service discovery, planning information, FAQs and direct enquiry paths.

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env` and set the production/site details below.
3. Run `npm install`, then `npm run dev`.
4. Visit the local URL printed by Vite. The root page links to all 30 landing pages.

## Configure before launch

Set these Vercel Project Environment Variables (and locally in `.env`):

- `VITE_SITE_URL`: the final HTTPS origin, with no trailing slash. The build uses it for the sitemap and robots file; page metadata uses it for canonicals and structured data.
- `VITE_PHONE_NUMBER`: phone number for tap-to-call. Defaults to `+65 8164 6269`.
- `VITE_WHATSAPP_NUMBER`: WhatsApp number in international digits only. Defaults to `6581646269`.
- `VITE_EMAIL`: public contact email. Defaults to `dheeranmovers@gmail.com`.
- `VITE_GA_ID`: optional Google Analytics 4 measurement ID. Leave blank to disable GA.
- `VITE_QUOTE_ENDPOINT`: optional HTTPS form endpoint accepting JSON POST and returning a 2xx response. If blank, the quote form opens WhatsApp with the user's message prefilled. Test the endpoint and privacy notice before launch.

The site deliberately contains no invented street address, hours, reviews, credentials or service guarantees. The public phone, WhatsApp and email defaults are set above. The quote form currently gathers name, phone, addresses, date and move notes; deploy an endpoint and add a privacy notice appropriate to your data handling before production use.

## Build and deploy to Vercel

1. Push this folder to a Git repository or import it into Vercel.
2. Set the environment variables above in Vercel for Production and Preview as appropriate.
3. Use **Framework Preset: Vite**, **Build Command: `npm run build`**, **Output Directory: `dist`**, and install command `npm install`.
4. Deploy. `vercel.json` provides SPA route fallback and immutable caching for built assets.
5. Check `/sitemap.xml`, `/robots.txt`, and all paths listed below on the deployed hostname. Submit `https://YOUR-HOST/sitemap.xml` in Google Search Console and verify the domain there.

## SEO and analytics

Each route is pre-rendered into its own HTML document with its page content, title, description, canonical, Open Graph title/description/type/url and JSON-LD for the moving company, service and breadcrumb in the initial response. FAQs are visible on the pages; FAQPage rich-result markup is omitted because Google currently limits those search treatments to well-known authoritative government and health sites. Verify the deployed pages in Search Console URL Inspection and a structured data validator.

`npm run build` writes `public/sitemap.xml` and `public/robots.txt` for the configured origin, builds the assets, and pre-renders the home page plus all 30 routes. The site includes an optional GA4 loader, responsive navigation, downloadable moving checklist, internal service/area links, and a quote form with WhatsApp fallback.

## Routes

`/house-moving-singapore`, `/hdb-moving-services`, `/condo-moving-singapore`, `/landed-house-moving`, `/office-relocation-singapore`, `/commercial-moving-services`, `/furniture-moving-singapore`, `/packing-services-singapore`, `/disposal-services-singapore`, `/moving-and-storage-singapore`, `/hdb-movers-tampines`, `/movers-bedok`, `/movers-pasir-ris`, `/movers-sengkang`, `/movers-punggol`, `/movers-hougang`, `/movers-ang-mo-kio`, `/movers-yishun`, `/movers-woodlands`, `/movers-jurong`, `/cheap-movers-singapore`, `/professional-movers-singapore`, `/small-move-singapore`, `/same-day-moving-singapore`, `/weekend-moving-singapore`, `/student-moving-singapore`, `/senior-moving-services`, `/international-relocation-singapore`, `/moving-company-singapore`, `/moving-quotation-singapore`.
