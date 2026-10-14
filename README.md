# Mawathiq Al-Namaa — مكتب مواثيق النماء للخدمات العقارية

Bilingual (Arabic default / English) demo website. React + TypeScript + Vite + Tailwind + Framer Motion.

```bash
npm install
npm run dev        # local
npm run build      # production build (deploy dist/ to Vercel — vercel.json included)
```

## Swap in real content
- **Photos:** drop a file into `src/assets/images/` with the same name as a placeholder in
  `src/assets/placeholders/` (e.g. `hero.webp`, `about.jpg`, `prop-1.webp`). It replaces it automatically.
- **Logo:** the mark is redrawn as 3 strokes in `src/components/ui/Mark.tsx` (so it can animate). Replace with the official file if needed.
- **Contact, hours, services, demo properties, FAQ:** `src/data/site.ts`.
- **UI text:** `src/i18n/strings.ts` and inline `{ ar, en }` pairs.
