# Arcway — software company template

A single-page marketing site for a software company: engineering studio,
platform vendor, or dev agency all fit. Plain HTML/CSS/JS — no build step,
no framework, no npm install. Open `index.html` in a browser and it works;
drop the folder on any static host (Netlify, Vercel, GitHub Pages, S3, your
own server) and it works there too.

## Files

```
arcway-template/
├── index.html    all page content, organized into commented sections
├── styles.css    all styling, tokens at the top
├── script.js     small vanilla-JS behaviors, one feature per block
└── README.md     this file
```

There are no images to source or manage — the hero graphic, service icons,
and case-study visuals are all hand-drawn inline SVG, and the "trusted by"
row is styled text rather than logo files. That's deliberate: nothing to
break, nothing to optimize, nothing to replace before you have real assets.
When you do have real client logos or photography, swap them in gradually;
the layout doesn't depend on them.

## The fastest way to reskin it

Almost everything visual is controlled by the CSS custom properties at the
top of `styles.css`, under `:root`. Change these and the whole site follows:

```css
--ink:      #12161C   /* dark backgrounds, headings, body text */
--paper:    #F5F4F1   /* main background */
--accent:   #2F5DFF   /* buttons, links, highlighted diagram nodes */
--font-display: 'Space Grotesk', ...   /* headings */
--font-body:    'IBM Plex Sans', ...   /* paragraphs, nav, buttons */
```

To change fonts, swap the Google Fonts `<link>` in `index.html`'s `<head>`
and update the two `--font-*` variables to match. If you'd rather not
depend on Google Fonts at all, delete the `<link>` tags and the variables
will fall back to system fonts automatically.

## Editing content

Every section in `index.html` is wrapped in a comment like:

```html
<!-- ============================== HERO ============================== -->
```

Find the section by name, edit the text or links in place. Sections are
independent — you can delete one entirely (open and closing `<section>`
tags and everything between them) without touching any other part of the
page. Nothing depends on section order except the on-page nav anchors
(`#platform`, `#work`, `#process`, `#faq`) — if you rename a section's
`id`, update the matching `href` in the header nav.

**Stat counters** — any element with `data-count="120"` will animate up
from 0 when it scrolls into view (used in the hero and the metrics band).
Add `data-suffix="+"` or `data-decimals="1"` as needed. To make a number
static instead, just delete the `data-count` attribute and hardcode the
text.

**FAQ items** — copy one `.faq-item` block and paste it into the list;
the accordion behavior is handled automatically by `script.js`, nothing
to wire up.

**Work / case study cards** — each `.work-card` has its own small inline
SVG in `.work-visual`. Replace the `<svg>` with an `<img>` tag if you'd
rather use real screenshots or photography — the surrounding card styling
doesn't change.

## Forms

The newsletter form in the footer and the "Book a call" / "Email us"
buttons in the final CTA are not wired to a backend. The newsletter form
currently just shows a thank-you message client-side (see block 5 in
`script.js`) — replace that with a real request to your email provider.
The CTA buttons use `mailto:` links as a working placeholder; swap them
for a real contact form, a Calendly-style booking link, or your own
`/contact` page.

## Accessibility notes already built in

- Skip-to-content link, visible keyboard focus ring, semantic landmarks
- `aria-expanded` on the mobile menu and FAQ toggles
- Decorative SVGs are `aria-hidden`
- All animation respects `prefers-reduced-motion` (see the bottom of
  `styles.css` and the top of `script.js`)

## Browser support

Uses modern-but-safe CSS (`grid`, `clamp()`, `backdrop-filter`) and
vanilla JS (`IntersectionObserver`, `requestAnimationFrame`). Works in
all current evergreen browsers. `backdrop-filter` on the sticky header
degrades gracefully to a solid background if unsupported.
