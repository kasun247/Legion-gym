# LEGION — Premium Gym Landing Page

A single-page, long-scroll landing page for a premium strength brand. Built with
**plain HTML + CSS + vanilla JS — no framework, no build step**. Open
`index.html` in any browser to run it.

It is intentionally structured as a **Framer Marketplace template reference**:
every design value lives in CSS custom properties (`:root`), and every photo URL
lives in one `IMAGES` object in `script.js`. Recolor the entire site by editing a
single variable.

```
index.html    →  semantic markup, one <h1>, landmarked sections
styles.css    →  design tokens (:root) + all styling  ← the token sheet
script.js     →  IMAGES object + all interactions
README.md     →  this file
```

> The repo also contains older tutorial files (`index2.html`, `navbar.html`,
> `style.css`, `css/`, `img/`) that are unrelated to this template and were left
> untouched. The LEGION template is the four files above.

---

## 1 · Quick start

Open `index.html` directly, **or** serve the folder (recommended so the hero
video and lazy-loading behave like production):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Images load from Unsplash and fonts from Google Fonts, so you need an internet
connection on first load.

---

## 2 · Design tokens (`:root` in `styles.css`)

These map 1:1 to **Framer Styles**. Copy them into Framer Tokens/Styles.

### Color
| Token | Value | Controls |
|---|---|---|
| `--bg` | `#0E0E10` | Near-black page background |
| `--bg-elev` | `#16161A` | Elevated cards & sections (stats, results, coaches, pricing, footer) |
| `--surface` | `#1E1E24` | Inputs, slider buttons, toggle track |
| `--text` | `#F5F5F0` | Primary off-white text |
| `--text-muted` | `#9A9AA3` | Secondary / supporting text |
| `--accent` | `#C5FF3A` | **VOLT lime** — the single signature accent |
| `--accent-ink` | `#0E0E10` | Text/icons on accent fills |
| `--border` | `rgba(245,245,240,0.10)` | Hairline borders |

**Accent is used only for:** primary CTAs, key numbers (stats, results, prices),
active states (nav underline, toggle, dots), and one or two emphasis words.
Everything else is monochrome — so changing `--accent` re-themes the whole site.

### Typography
| Token | Value | Controls |
|---|---|---|
| `--font-display` | `"Anton"` | Hero H1, big statements, stat/step numbers, prices, wordmark |
| `--font-head` | `"Archivo"` | Section titles (h2), card/coach/plan titles, quotes |
| `--font-body` | `"Inter"` | Body, UI, eyebrows |
| `--fs-display` | `clamp(3rem, 8vw, 7rem)` | Hero H1 size |
| `--fs-h2` | `clamp(2rem, 4vw, 3.25rem)` | Section title size |
| `--fs-h3` | `clamp(1.25rem, 2vw, 1.6rem)` | Card title size |
| `--fs-body` | `clamp(1rem, 1.2vw, 1.125rem)` | Body size |
| `--fs-eyebrow` | `0.78rem` | Eyebrow size |
| `--fs-step` | `clamp(3rem, 9vw, 7rem)` | Method step numbers |
| `--lh-tight` / `--lh-snug` / `--lh-body` | `0.95` / `1.1` / `1.6` | Display / heading / body line-height |
| `--ls-eyebrow` | `0.14em` | Eyebrow letter-spacing (uppercase) |

Headings use `text-wrap: balance`.

### Spacing — scale `4 8 12 16 24 32 48 64 96 128`
`--sp-1 … --sp-32`. Section vertical rhythm: `--section-pad: clamp(64px, 12vh, 140px)`.
Layout: `--maxw: 1240px`, `--gutter: 24px`.

### Radius & border
`--r-sm: 10px`, `--r-md: 16px`, `--r-lg: 24px`, `--r-pill: 999px`, `--bw: 1px`,
plus `--shadow-sm` / `--shadow-md` (subtle only).

### Motion
`--dur-1: 200ms`, `--dur-2: 400ms`, `--dur-3: 600ms`, easing
`--ease: cubic-bezier(0.22, 1, 0.36, 1)`. All motion is disabled under
`@media (prefers-reduced-motion: reduce)`.

---

## 3 · Images (`IMAGES` in `script.js`)

Every photo URL + alt text lives in the `IMAGES` object — the single source of
truth. HTML `<img>` tags carry a `data-img="key"` attribute and JS fills `src`
and `alt` on load. To swap imagery, edit only `IMAGES`.

- Helper `U(id, width)` builds an Unsplash URL, so you usually paste just the
  photo id.
- All imagery is **gym-only** (interiors, athletes, equipment, coaching).
- Decorative avatars use empty `alt=""`; all content images have descriptive alt.
- **Exception:** the hero **poster** + **background fallback** are set directly
  in `index.html` (`<video poster>`) and `styles.css` (`.hero__video` background)
  because they are above-the-fold critical assets. The hero **video clip** is a
  swappable `<source>` in `index.html`; if it fails to load, the poster remains.

---

## 4 · Section order → Framer mapping

| # | Section | `id` | Future Framer section | CMS? |
|---|---|---|---|---|
| 0 | Announcement bar | — | Top utility bar (Component, dismissible w/ variant) | — |
| 1 | Navbar | `#nav` | Sticky Nav component (transparent → solid scroll variant) | — |
| 2 | Hero | `#hero` | Hero stack — Background Video + overlay + text | — |
| 3 | Stats strip | `#stats` | Stats row (count-up via Framer effect/code component) | — |
| 4 | Programs | `#programs` | Card grid | **Programs collection** (title, desc, image, link) |
| 5 | Method | `#method` | Stepped/staggered layout | optional **Steps collection** |
| 6 | Results | `#results` | Transformation grid/slider | **Results collection** (name, age, weeks, program, before, after, kg→kg) |
| 7 | Coaches | `#coaches` | Team grid | **Coaches collection** (name, role, specialty, photo, IG link) |
| 8 | Gallery | `#gallery` | Marquee (Framer Ticker component) | optional **Gallery collection** |
| 9 | Pricing | `#pricing` | Pricing cards + toggle | **Pricing collection** (name, monthly price, features[], featured flag) |
| 10 | Testimonials | `#testimonials` | Slider / Ticker | **Testimonials collection** (name, role, quote, rating, photo) |
| 11 | FAQ | `#faq` | Accordion (Framer's built-in) | optional **FAQ collection** (question, answer) |
| 12 | Final CTA | `#cta` | CTA band + Form component (connect to Framer Forms) | — |
| — | Footer | — | Footer component | — |

**Recommended CMS collections:** Programs, Coaches, Testimonials, Results,
Pricing (FAQ, Steps, Gallery optional). In Framer, bind these collections to the
corresponding grid/slider and the cards become CMS-driven.

---

## 5 · Interactions (`script.js`)

- **Announcement bar** — dismissible, remembered for the session (`sessionStorage`).
- **Sticky nav** — transparent over hero, solid (`--bg-elev` + blur) after scroll.
- **Mobile menu** — animated full-screen overlay, hamburger morphs to ✕, `Esc`
  closes, body scroll locked while open.
- **Scroll-reveal** — `IntersectionObserver` adds `.is-visible` (fade + 16px
  rise), staggered for card groups.
- **Stat count-up** — animates from 0 when the strip scrolls in.
- **Pricing toggle** — monthly ↔ annual. Annual = `10 × monthly` (2 months free)
  with a "billed annually" note. Prices are computed from one `data-monthly`
  value per plan.
- **Testimonial slider** — prev/next + dots, keyboard arrows, wraps, responsive
  per-page (1 / 2 / 3).
- **FAQ accordion** — accessible (`aria-expanded`), animated max-height.
- **Card hovers** — program image zoom + accent underline; coach photos
  grayscale → color.
- **Gallery marquee** — CSS auto-scroll, pauses on hover.
- **Lead form** — fully styled with focus states; shows a success message
  (no network call).

All of the above are no-ops or instant under `prefers-reduced-motion: reduce`.

---

## 6 · Accessibility & performance

- Exactly one `<h1>` (hero); logical h2–h4 order; landmark elements
  (`<header><nav>`, `<main>`, `<section aria-label>`, `<footer>`).
- Visible `:focus-visible` rings; keyboard-operable nav, menu, accordion, toggle,
  slider; skip link to content.
- Every content image has descriptive alt; decorative images use `alt=""`.
- All form fields have associated `<label>`s.
- Below-the-fold images use `loading="lazy"`; the hero ships a poster; `<img>`
  elements have width/height to reduce layout shift.
- Colors meet WCAG AA: `--accent-ink` on `--accent`, and `--text` on dark
  surfaces. Text over photos sits on a dark gradient overlay for legibility.

---

## 7 · How to rebrand

1. **Recolor** — change `--accent` in `styles.css` `:root`. (Optionally adjust the
   dark palette `--bg` / `--bg-elev` / `--surface`.) The whole site re-themes.
2. **Rename** — replace the word `LEGION` (nav `.nav__brand`, mobile menu,
   footer `.footer__wordmark`) and the copy in `index.html`. Update `<title>` and
   the meta description.
3. **Re-image** — edit URLs in the `IMAGES` object in `script.js` (and the hero
   poster in `index.html` + the hero background in `styles.css`).
4. **Re-type** — swap the Google Fonts `<link>` in `index.html` and the three
   `--font-*` tokens.

---

## 8 · Token & section summary (for Framer Styles)

**Colors:** bg `#0E0E10` · bg-elev `#16161A` · surface `#1E1E24` · text `#F5F5F0`
· text-muted `#9A9AA3` · accent `#C5FF3A` · accent-ink `#0E0E10` · border
`rgba(245,245,240,.10)`

**Type:** Display **Anton** (`clamp(3rem,8vw,7rem)`, lh 0.95, uppercase) ·
Headings **Archivo** 600–700 (`clamp(2rem,4vw,3.25rem)`) · Body **Inter** 400–500
(`clamp(1rem,1.2vw,1.125rem)`, lh 1.6) · Eyebrow Inter 600 uppercase, tracking
0.14em.

**Spacing:** 4 8 12 16 24 32 48 64 96 128 · section pad `clamp(64px,12vh,140px)`
· max-width 1240 · gutter 24.

**Radius:** 10 / 16 / 24 / 999. **Motion:** 200 / 400 / 600ms ·
`cubic-bezier(0.22,1,0.36,1)`.

**Section order:** Announcement → Nav → Hero → Stats → Programs → Method →
Results → Coaches → Gallery → Pricing → Testimonials → FAQ → Final CTA → Footer.

---

## 9 · Deploy to GitHub Pages

The site is fully static (HTML/CSS/JS), so GitHub Pages hosts it for free.

### Option A — automated (recommended)
The workflow at `.github/workflows/deploy.yml` assembles a clean `_site/`
(only `index.html`, `styles.css`, `script.js`, `favicon.svg`, `robots.txt`) and
publishes it on every push to `master`/`main`.

1. Push this repo to GitHub:
   ```bash
   git add .
   git commit -m "LEGION landing page + Pages deploy"
   git push origin master
   ```
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The **Deploy to GitHub Pages** action runs and prints the live URL
   (`https://<user>.github.io/<repo>/`). Re-runs automatically on each push.

Because the workflow copies only the template files, the old tutorial files in
this repo are **never published** — the live site stays clean either way.

### Option B — deploy from a branch (no Actions)
**Settings → Pages → Source: Deploy from a branch → `master` / `/ (root)`.**
This serves the repo root as-is, so first remove the unrelated tutorial files
(below). The included `.nojekyll` makes Pages serve every file verbatim.

### Recommended cleanup (optional)
These leftover tutorial files aren't part of the template and bloat the repo
(`css/bootstrap.css` ≈ 178 KB, `img/bookshelves.jpg` ≈ 2.4 MB):

```bash
git rm -r index2.html navbar.html style.css css img
git commit -m "Remove old tutorial files"
```
They remain recoverable from git history. Not required for Option A.

### Custom domain
Add a `CNAME` file containing your domain (or set it under Settings → Pages),
then update the `og:url` / Twitter meta in `index.html`.

### Notes
- External assets (Unsplash images, Google Fonts) load fine over HTTPS on Pages.
- The hero video clip is optional; if it doesn't load, the poster image shows.
