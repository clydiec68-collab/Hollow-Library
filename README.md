# Clydie Cronjé — Author Website ("Storm Catalogue")

A Next.js site with one job: **sell The Hollow Library, Book 1** (paperback via
IngramSpark) — while presenting the rest of the catalogue honestly, as library
cards with status stamps.

## Design — Storm Catalogue

Palette sampled from the Book 1 cover: storm ink-blue background, sea-mist text,
window-light **amber** accent, rubber-stamp red for in-progress statuses.
Type: **Cinzel** (display — same engraved caps as the cover titling),
**EB Garamond** (body), **IBM Plex Mono** (catalogue metadata & stamps).
Fonts are self-hosted in `public/fonts/` (SIL Open Font License) — no Google
Fonts request, no font flash.

The Hollow Library books use real cover art in `public/covers/hl1–7.jpg`
(white edges trimmed, web-optimised). All other books show storm-blue
placeholder bindings until covers exist — drop a file in `public/covers/` and
add `image: "/covers/yourfile.jpg"` to the book in `src/data/books.js`.

## Publishing flow (IngramSpark paperback)

When Book 1 goes live:

1. Add the ISBN to the book in `src/data/books.js`: `isbn: "978-..."` —
   it appears in the "ask your local bookshop" line so readers can order at a counter.
2. As each retail listing appears, add it:
   ```js
   retailers: [
     { name: "Amazon", url: "https://www.amazon.com/dp/..." },
     { name: "Takealot", url: "https://www.takealot.com/..." },
     { name: "Exclusive Books", url: "https://..." },
   ]
   ```
3. Flip `status: "launching"` → `status: "available"`.

The buy row renders automatically: "Paperback available from" + retailer
buttons + the local-bookshop line. Books without retailers show
"Read chapter one free" (newsletter) instead — never a dead end.

## Status system

| Status | Stamp | Meaning |
|---|---|---|
| `available` | Available now (amber) | Published, retailer links live |
| `launching` | Launching soon (amber) | Publish-ready |
| `final` | Final edits (red) | Nearly there |
| `revision` | In revision (red) | Being reworked |
| `drafting` | Drafting (grey) | Still being written |

## Launch checklist

1. Retailer links + ISBN for Book 1 (above).
2. **Newsletter** — form is a front-end stub; connect MailerLite/Mailchimp via
   `src/app/api/subscribe/route.js` and update the TODO in
   `src/components/Newsletter.jsx`. The free chapter-one PDF must exist.
3. **Contact form** — stub; use Formspree or `src/app/api/contact/route.js`.
4. **Socials** — add URLs in `config.social` (`src/data/books.js`); empty = hidden.
5. **Photos** — author photo + gallery in `src/app/about/page.jsx`.
6. **Domain** — set `NEXT_PUBLIC_SITE_URL` in Vercel (sitemap/robots/OG use it).

## Quick start

```bash
npm install
npm run dev
```

## Deploy (GitHub + Vercel)

Push to GitHub → import at vercel.com/new → add `NEXT_PUBLIC_SITE_URL` →
point DNS (e.g. Cloudflare CNAME) at `cname.vercel-dns.com`. Every push to
`main` auto-deploys.

© 2026 Clydie Cronjé. All rights reserved.
