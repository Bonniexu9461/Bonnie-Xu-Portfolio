# Image Upload Guide — Bonnie Xu Portfolio

## Where to put your images

All images go in a single folder called **`images/`** at the same level as `portfolio.html`.

```
📁 your-portfolio/
 ├── portfolio.html
 ├── about.html
 ├── projects.html
 ├── blog.html
 ├── work-with-me.html
 ├── blog-article.html
 ├── 📁 projects/
 │    ├── dominos-core-website-redesign.html
 │    ├── dominos-gamification-series.html
 │    ├── dominos-brand-marketing-design.html
 │    ├── entain-digital-campaign-design.html
 │    ├── raywhite-brand-marketing-design.html
 │    └── freelance-website-design.html
 └── 📁 images/   ← PUT ALL YOUR IMAGES HERE
      ├── hero-photo.jpg
      ├── about-hero.jpg
      └── ... (all images listed below)
```

> **Note:** Pages inside `projects/` automatically look for images at `../images/` — so they all pull from the same `images/` folder. You never need to put images in two places.

---

## File format tips

- **PNG** — best for screenshots, UI mockups, anything with sharp edges or transparent backgrounds
- **JPG** — best for photos, portraits, lifestyle shots
- **GIF** — for animated/motion examples only (e.g. Domino's Gamification animated mockup)
- **Recommended max file size:** 500 KB–1 MB per image for fast loading

---

## Complete Image List

### 🏠 Homepage (`portfolio.html`)

| Filename | Where it appears | What to put here |
|---|---|---|
| `hero-photo.jpg` | Hero section — your portrait | Your headshot or a candid photo of you working. Roughly square crop works best. |
| `dominos-web.png` | Work grid — Domino's Core Website card | Cover/thumbnail for the Domino's website redesign project |
| `dominos-brand.png` | Work grid — Domino's Brand & Marketing card | Cover thumbnail for Domino's brand work |
| `dominos-gamification.gif` | Work grid — Domino's Gamification card | Animated GIF showing gamification motion/interaction |
| `entain.jpg` | Work grid — Entain card | Cover thumbnail for Entain campaign design |
| `raywhite.png` | Work grid — Ray White card | Cover thumbnail for Ray White social/print work |
| `freelance.png` | Work grid — Freelance card | Cover thumbnail for freelance website projects |
| `Rachel.jpeg` | Testimonials — Rachel Khoo photo | Headshot of Rachel Khoo |
| `Brenton.jpeg` | Testimonials — Brenton Quinn photo | Headshot of Brenton Quinn |
| `David.jpeg` | Testimonials — David Turk photo | Headshot of David Turk |
| `Celene.jpeg` | Testimonials — Celene Grantham photo | Headshot of Celene Grantham |
| `blog-01.jpg` | Blog previews — Post 1 cover | Cover image for blog post 1 |
| `blog-02.jpg` | Blog previews — Post 2 cover | Cover image for blog post 2 |
| `blog-03.jpg` | Blog previews — Post 3 cover | Cover image for blog post 3 |

---

### 👤 About Page (`about.html`)

| Filename | Where it appears | What to put here |
|---|---|---|
| `about-hero.jpg` | About page hero — full-width top photo | A lifestyle or portrait photo of you. Good options: working at your desk, in a café, or a clean headshot. Landscape works well (approx 1440×700 px). |
| `about-badge.png` | Badge/credential section | Your industry award, certification badge, or a logo of a conference/award you've won |
| `about-journey.jpg` | "My journey" section | A photo that represents your career story — could be a team photo, an early work, or a meaningful moment |
| `about-howwork.jpg` | "How I work" section | Photo of you presenting, working on a whiteboard, in a workshop, or collaborating with a team |
| `about-bonbon.jpg` | Personal/fun section | Photo of your cat Bonbon, or any personal photo you'd like to include |

---

### 💼 Work with Me Page (`work-with-me.html`)

| Filename | Where it appears | What to put here |
|---|---|---|
| `about-hero.jpg` | About section portrait | Same file as the about page — your headshot |
| `about-work.jpg` | About section — working photo | Photo of you doing design work |
| `about-cat.jpg` | About section — personal photo | Casual/personal photo (or same as `about-bonbon.jpg`) |
| `dominos-brand.png` | Past work examples | Same file as homepage — reused here |
| `entain.jpg` | Past work examples | Same file as homepage — reused here |

---

### 📝 Blog (`blog.html` and article pages)

| Filename | Where it appears | What to put here |
|---|---|---|
| `blog-01.jpg` | Blog listing page — Post 1 cover | Article cover image (1200×675 px recommended for 16:9 ratio) |
| `blog-02.jpg` | Blog listing page — Post 2 cover | Article cover image |
| `blog-03.jpg` | Blog listing page — Post 3 cover | Article cover image |
| `blog-04.jpg` | Blog listing page — Post 4 cover | Article cover image |
| `blog-05.jpg` | Blog listing page — Post 5 cover | Article cover image |
| `blog-06.jpg` | Blog listing page — Post 6 cover | Article cover image |

**For individual blog articles**, the pattern is: `blog-[slug]-hero.jpg` for the main cover, and `blog-[slug]-01.jpg`, `blog-[slug]-02.jpg` etc. for inline images. Example for the accessibility article already in `blog-article.html`:

| Filename | What to put here |
|---|---|
| `blog-accessibility-hero.jpg` | Wide hero image (1440×630 px recommended) |
| `blog-accessibility-01-curbcut.jpg` | Curb-cut effect diagram or illustration |
| `blog-accessibility-02-contrast.jpg` | Screenshot of contrast checker |

---

### 🍕 Case Study: Domino's Core Website Redesign

| Filename | Where it appears | What to put here |
|---|---|---|
| `dominos-hero.png` | Hero image | Full-width project hero (1440×480 px recommended) |
| `dominos-01-before.png` | Section 01 — Before redesign | Screenshot of the old Domino's website |
| `dominos-01-after.png` | Section 01 — After redesign | Screenshot of the new/redesigned website |
| `dominos-02-before.png` | Section 02 — Before | Detail before shot |
| `dominos-02-after.png` | Section 02 — After | Detail after shot |
| `dominos-02-markets.png` | Section 02 — Market variations | Screenshots showing different market adaptations |
| `dominos-03-deals.png` | Section 03 — Deals feature | Deals/offers UI design |
| `dominos-03-locator.png` | Section 03 — Store locator | Store locator feature design |
| `dominos-04-japan.png` | Section 04 — Japan market | Japan market version |
| `dominos-04-netherlands.png` | Section 04 — Netherlands market | Netherlands market version |
| `dominos-04-system.png` | Section 04 — Design system | Design system documentation or component library |

---

### 🎮 Case Study: Domino's Gamification Series

| Filename | Where it appears | What to put here |
|---|---|---|
| `gamification-hero.png` | Hero image | Project hero (1440×480 px) |
| `gamification-01-mystery.png` | Section 01 — Mystery Deal | Mystery deal game UI/screens |
| `gamification-02-flipcard-flow.png` | Section 02 — Flip card user flow | Flip card game flow diagram or wireframes |
| `gamification-02-flipcard-mobile.png` | Section 02 — Flip card mobile | Flip card on mobile screens |
| `gamification-03-calendar-screens.png` | Section 03 — Advent calendar screens | Advent calendar UI screens |
| `gamification-03-calendar-final.png` | Section 03 — Advent calendar final | Final/polished advent calendar design |

---

### 🎨 Case Study: Domino's Brand & Marketing Design

| Filename | Where it appears | What to put here |
|---|---|---|
| `brand-hero.png` | Hero image | Project hero (1440×480 px) |
| `brand-01-edm.png` | Section 01 — Email/EDM | Email marketing design examples |
| `brand-02-moretolove.png` | Section 02 — "More to Love" campaign | More to Love campaign visuals |
| `brand-02-offers.png` | Section 02 — Offers design | Offers and promotions design assets |
| `brand-03-animated.png` | Section 03 — Animated assets | Animated banner or digital ad examples |

---

### 🎰 Case Study: Entain Digital & Campaign Design

| Filename | Where it appears | What to put here |
|---|---|---|
| `entain-hero.png` | Hero image | Project hero (1440×480 px) |
| `entain-01-logos.png` | Section 01 — Logo overview | Multiple brand logos from the Entain portfolio |
| `entain-01-logo-system.png` | Section 01 — Logo system | Logo system/guidelines document |
| `entain-02-social.png` | Section 02 — Social media | Social media post designs |
| `entain-02-edm.png` | Section 02 — EDM/Email | Email marketing templates |
| `entain-03-presentations.png` | Section 03 — Presentations | Presentation deck slides or templates |
| `entain-04-motion.png` | Section 04 — Motion design | Motion design stills or storyboard |
| `entain-04-animation.png` | Section 04 — Animation | Animation frames or preview |

---

### 🏠 Case Study: Ray White Social & Print Design

| Filename | Where it appears | What to put here |
|---|---|---|
| `raywhite-hero.png` | Hero image | Project hero (1440×480 px) |
| `raywhite-01-social.png` | Section 01 — Social media | Social media post designs for Ray White |
| `raywhite-02-print-collateral.png` | Section 02 — Print collateral | Brochures, flyers, or DL cards |
| `raywhite-02-print-mockup.png` | Section 02 — Print mockup | Mockup/in-context photo of print materials |

---

### 💻 Case Study: Freelance Website Design

| Filename | Where it appears | What to put here |
|---|---|---|
| `freelance-hero.png` | Hero image | Project hero (1440×480 px) |
| `freelance-01-fx-tablet.png` | Section 01 — FX Trade tablet | FX Trade website shown on tablet |
| `freelance-01-fx-screens.png` | Section 01 — FX Trade screens | FX Trade multiple screen views |
| `freelance-02-landitude-tablet.png` | Section 02 — Landitude tablet | Landitude website on tablet |
| `freelance-02-landitude-screens.png` | Section 02 — Landitude screens | Landitude multiple screens |
| `freelance-03-digitalaccord-tablet.png` | Section 03 — Digital Accord tablet | Digital Accord website on tablet |
| `freelance-03-digitalaccord-screens.png` | Section 03 — Digital Accord screens | Digital Accord multiple screens |
| `freelance-04-pixeltouch-tablet.png` | Section 04 — PixelTouch tablet | PixelTouch website on tablet |
| `freelance-04-pixeltouch-screens.png` | Section 04 — PixelTouch screens | PixelTouch multiple screens |

---

## Quick checklist before uploading

- [ ] File is named exactly as listed (lowercase, hyphens not spaces, correct extension)
- [ ] File is saved to the `images/` folder (not `images/subfolders/`)
- [ ] Hero images are at least 1440px wide
- [ ] Thumbnails/card images are at least 800px wide
- [ ] Portrait photos are clear and well-lit
- [ ] GIF files are kept under 3 MB if possible

---

## Image size reference

| Image type | Recommended dimensions |
|---|---|
| Page hero (full-width) | 1440 × 480 px |
| Blog article hero | 1440 × 630 px |
| Blog post card cover | 800 × 450 px (16:9) |
| Project card thumbnail | 800 × 600 px (4:3) |
| Portrait / headshot | 400 × 400 px (square or close) |
| Inline article image | 1200 × 800 px max |
| Print mockup | 1200 × 800 px |
