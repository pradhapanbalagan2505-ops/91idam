# Module — About

**Route:** `/about`
**Source:** `src/pages/About/About.jsx`

## Overview

Company introduction and positioning page. Public, no auth required.

## Sections

| Section | What it shows |
|---|---|
| Hero | Tagline + 4 stat tiles (Established, HQ, Industry, Business Model) |
| Mission & Vision | Two-column statement cards |
| Core Values | 8-tile grid (commitment, transparency, confidentiality, integrity, employee happiness, collaboration, time value, customer-centricity) |
| What Makes Us Different | 5-card differentiator grid on a gradient backdrop |
| Growth Roadmap | Multi-year expansion timeline |
| Leadership | Founder & CEO callout (Mr. Pratheesh Kumar-E) |
| Who We Serve | 6-tile target-segment grid |

## Tour anchors

| Anchor | Element |
|---|---|
| `about-hero` | Hero stat tiles block |
| `about-mission` | Mission + vision cards |
| `about-values` | Core values grid |
| `about-differentiators` | "What makes us different" section |
| `about-roadmap` | Growth roadmap |
| `about-leadership` | Leadership block |
| `about-segments` | Who we serve grid |

## Notes

- Pure marketing page — no data fetching, no forms.
- Imagery is bundled via Vite imports (`fold2image1`, `fold4image1` etc.) so files are versioned with the build.
- Brand colour for this page is `#2C5F7E` (a slightly darker variant of the primary `#175973`).
