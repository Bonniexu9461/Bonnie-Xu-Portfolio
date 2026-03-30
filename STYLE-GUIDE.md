# Bonnie Xu Portfolio — Style Guide
**bonniexu.com · Version 1.0.0**

---

## Files in this design system

| File | Purpose |
|---|---|
| `design-tokens.json` | All design tokens in W3C DTCG format — import into Style Dictionary, Theo, Tokens Studio, or Figma |
| `design-system.css` | Full CSS — paste into any IDE or bundler |
| `STYLE-GUIDE.md` | This file — conventions, components, and patterns |

---

## Fonts

Both fonts are loaded via Google Fonts. Add this to every `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,600;12..96,700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

| Variable | Value | Use |
|---|---|---|
| `--font-display` | Bricolage Grotesque | All headings, nav brand, stat numbers |
| `--font-body` | Poppins | Labels, body copy, nav links, meta text |

---

## Colour Tokens

| CSS Variable | Hex | Use |
|---|---|---|
| `--bg-page` | `#F4F2F1` | Page background |
| `--bg-card` | `#FBFAF9` | Card / surface background |
| `--text-1` | `#2B2B2B` | Primary text, dark buttons |
| `--text-2` | `#808080` | Labels, secondary text, muted UI |
| `--accent` | `#E8452A` | Section numbers, stat values, brand highlight |
| `--border` | `#DDDBD9` | Default borders, dividers |
| `--border-lt` | `#EDEDEB` | Light borders on cards / chips |
| `--shadow` | `0px 0px 20px 0px rgba(0,0,0,0.03)` | Subtle card shadow |

Body copy (inside `.t-body` and `.t-body-lg`) uses `#555555` — slightly softer than `--text-1`.

---

## Typography Classes

Apply these classes directly to elements:

```css
.t-label     /* 12px · Poppins 500 · UPPERCASE · letter-spacing 2px · --text-2 */
.t-display   /* clamp(36px–64px) · Bricolage 700 · letter-spacing -2.5px */
.t-h2        /* clamp(26px–36px) · Bricolage 700 · letter-spacing -1.5px */
.t-h3        /* clamp(20px–28px) · Bricolage 700 · letter-spacing -1px */
.t-h4        /* 18px · Bricolage 700 · letter-spacing -0.5px */
.t-body-lg   /* 16px · Poppins 300 · #555 · line-height 1.85 */
.t-body      /* 14px · Poppins 300 · #555 · line-height 1.8 */
```

---

## Border Radius

| Variable | Value | Use |
|---|---|---|
| `--r-sm` | `15px` | Image cards, chips, small containers |
| `--r-md` | `24px` | Medium cards |
| `--r-lg` | `32px` | Large section panels |
| `999px` (inline) | — | Pill buttons (nav CTA, next-project buttons) |

---

## Layout

### `.cs-inner`
The main content wrapper — 1440px max-width, 80px horizontal padding on desktop, 20px on mobile.

```html
<div class="cs-inner">
  <!-- page content -->
</div>
```

### `.wid-section`
Two-column work section: 220px numbered label column on the left, content on the right. Gap 64px.

```html
<div class="wid-section">
  <div>
    <div class="wid-num">01</div>
    <h3 class="t-h3">Section Title</h3>
  </div>
  <div>
    <!-- images and body copy -->
  </div>
</div>
```

### `.two-col`
Equal two-column image grid. Gap 16px.

```html
<div class="two-col">
  <img src="..." />
  <img src="..." />
</div>
```

---

## Case Study Page Template

Every case study page follows this exact structure:

```
Nav (fixed 72px)
  ↓
Page wrapper (padding-top: 72px)
  ↓
  cs-inner
    ↓
    Header section
      Label          → "Case Study · [Company]"
      .t-display     → Project title
      Subtitle       → Bricolage Grotesque 300, ~22px, --text-2
      <Divider />    → 1px solid --border
      .cs-meta       → Project Overview (flex:2) | Tools/Role/etc grid (flex:1)
    ↓
    Hero image       → <Img> component, height=480, rounded corners
    ↓
    Work sections    → .wid-section × N  (numbered 01, 02, 03…)
    ↓
    Reflection /
    Impact section   → No box/border — plain text with .t-h2 heading
    ↓
    Next Project     → Dark pill "View project →" + Outlined pill "Back to all work"
  ↓
Footer (dark background)
```

### Case study header markup pattern:

```jsx
<Label>Case Study · Company Name</Label>
<h1 className="t-display" style={{ marginBottom: 16 }}>Project Title</h1>
<p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 22, color: 'var(--text-2)', marginBottom: 32 }}>
  One-line tagline describing the project
</p>
<Divider />
<div className="cs-meta" style={{ display: 'flex', gap: 48, padding: '28px 0', flexWrap: 'wrap' }}>
  <div style={{ flex: 2 }}>
    <p className="t-label" style={{ marginBottom: 10 }}>Project Overview</p>
    <p className="t-body-lg">2–3 sentence description of the project and context.</p>
  </div>
  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
    <MetaItem label="Tools" value="Figma, Adobe CC" />
    <MetaItem label="Role" value="Brand Designer" />
    <MetaItem label="Timeline" value="Jan 2023 – Jun 2023" />
    <MetaItem label="[Custom label]" value="[Custom value]" />
  </div>
</div>
```

---

## Components

### `<Img>` (React)
Smart image component with loading state and error fallback placeholder.

```jsx
function Img({ filename, height = 320, hint = '' }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState(false);
  const src = `../images/${filename}`;
  return err ? (
    <div className="img-placeholder" style={{ minHeight: height }}>
      <span style={{ fontSize: 22, opacity: 0.35 }}>🖼</span>
      <div className="ph-name">{filename}</div>
      {hint && <div className="ph-hint">{hint}</div>}
    </div>
  ) : (
    <div style={{ borderRadius: 15, overflow: 'hidden', background: '#EBEBEA', minHeight: ok ? 0 : height }}>
      {!ok && (
        <div className="img-placeholder" style={{ minHeight: height }}>
          <span style={{ fontSize: 22, opacity: 0.35 }}>🖼</span>
          <div className="ph-name">{filename}</div>
          {hint && <div className="ph-hint">{hint}</div>}
        </div>
      )}
      <img src={src} alt={filename}
        onLoad={() => setOk(true)}
        onError={() => setErr(true)}
        style={{ width: '100%', display: ok ? 'block' : 'none', objectFit: 'cover' }} />
    </div>
  );
}
```

Usage: `<Img filename="entain-hero.png" height={480} hint="Hero image" />`

All images live in the `images/` folder, one level up from `projects/`. Path resolves as `../images/[filename]`.

### `<Label>` (React)
Thin wrapper for the uppercase `.t-label` class.

```jsx
function Label({ children }) {
  return <p className="t-label" style={{ marginBottom: 14 }}>{children}</p>;
}
```

### `<Divider>` (React)
Horizontal rule using `--border`.

```jsx
function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0' }} />;
}
```

### `<Nav>` (React)
Fixed frosted-glass navigation bar, 72px tall.

- Left: "Bonnie Xu" brand link → `../portfolio.html`
- Right: "← All work" text link + optional hire/contact CTA pill button

### `<Footer>` (React)
Dark background (`--text-1`) footer with Bonnie Xu branding, tagline, and copyright.

---

## Scroll Animation

Uses `IntersectionObserver` to add `.visible` to `.fade-up` elements as they enter the viewport.

```js
useEffect(() => {
  const els = document.querySelectorAll('.fade-up');
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  els.forEach(el => io.observe(el));
  return () => io.disconnect();
}, []);
```

Apply `className="fade-up"` to any section wrapper you want to animate in.

---

## Image Naming Convention

Images are stored in the `images/` folder at the portfolio root. Naming pattern:

```
[project]-[sequence]-[descriptor].[ext]

Examples:
  entain-hero.png
  entain-01-logos.png
  entain-02-social.png
  dominos-hero.jpg
  raywhite-01-social.png
  freelance-01-fx-tablet.png
  freelance-01-fx-screens.png
```

---

## Project Order (portfolio.html)

The work grid displays projects in this order:

1. **Domino's** — Core Website Redesign · Gamification Series · Brand & Marketing Design
2. **Entain** — Digital & Campaign Design
3. **Ray White** — Social & Print Design
4. **Freelance** — Website Design

---

## Next Project Chain

Case study pages link to each other in this circular chain:

```
Domino's Core Website Redesign
  → Entain Digital & Campaign Design
    → Ray White Social & Print Design
      → Freelance Website Design
        → Domino's Core Website Redesign  (loops back)
```

Each "Up next" section has two buttons:
- **Dark pill** `View project →` — links to next case study
- **Outlined pill** `Back to all work` — links to `../portfolio.html#work`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (via CDN — no build step) |
| JSX transpiler | Babel Standalone 7.23.2 (via CDN) |
| Styling | Vanilla CSS + CSS custom properties |
| Fonts | Google Fonts (Bricolage Grotesque + Poppins) |
| Hosting target | Static HTML files (Framer replacement) |
| File structure | `portfolio.html` + `projects/[name].html` |
| Images | `images/[project]-[descriptor].[ext]` |

Each page is a **single self-contained `.html` file** — React and Babel are loaded from CDN, no npm, no bundler.

---

## Spacing Reference

| Token | Value | Common use |
|---|---|---|
| xs | 8px | Small gaps, icon spacing |
| sm | 16px | Two-col gap, meta item gap |
| md | 24px | Section margins, button padding |
| lg | 32px | Between header elements |
| xl | 48px | Section padding, meta flex gap |
| 2xl | 64px | .wid-section column gap |
| 3xl | 80px | .cs-inner horizontal padding |
| 4xl | 96px | Between major page sections |
| 5xl | 120px | Large section separators |
| 6xl | 160px | Top/bottom page padding |
