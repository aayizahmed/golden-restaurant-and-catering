## Golden Restaurant (Fujairah, UAE)

Luxury restaurant website built with **Next.js 14+ (App Router)**, Tailwind CSS, SCSS modules, React Three Fiber, GSAP, Framer Motion, **Leaflet + OpenStreetMap**, React Hook Form, and Zod.

## Getting Started

Install and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Map setup (Location section)

The Location section uses **Leaflet + OpenStreetMap** (no API keys required).

## AI image prompt library (copy/paste)

- **Hero**: “Golden Arabic dallah coffee pot pouring coffee, dark atmospheric background, cinematic lighting, luxury brand aesthetic, hyper-realistic, 8k --ar 16:9”
- **Mezze**: “Premium Middle Eastern mezze platter, black marble, candlelight, Michelin quality --ar 4:3”
- **Interior**: “Elegant Middle Eastern restaurant interior, gold chandeliers, dark wood tables, ambient warm lighting, depth of field --ar 3:2”
- **Lamb**: “Grilled lamb presentation, fine dining, golden plating, macro shot --ar 4:3”
- **Kunafa**: “Kunafa dessert with edible gold leaf, Arabic sweets, elegant plating, macro food photography --ar 4:3”

## Asset process

1. Generate images
2. Remove backgrounds (if needed)
3. Color grade toward warm gold tones
4. Export WebP + transparent PNG
5. Replace placeholders under `public/images/` and update references in `src/content/site.ts`

## Notes

- 3D hero and signature carousel are **lazy-loaded** and respect **prefers-reduced-motion**.
- Events inquiry submits to `/api/events` (demo endpoint). Replace with email/CRM integration when ready.

## Deploy

Deploy to Vercel (no map env vars needed).
