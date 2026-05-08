# Module — Why Choose IDAM

**Route:** `/whyidam`
**Source:** `src/pages/Whyidam/Whyidam.jsx` + `Whyidam.css`

## Overview

Positioning page that explains why IDAM is different from traditional brokerages and competing portals.

## Sections

| Section | What it shows |
|---|---|
| Hero | Headline + 4 highlight chips (Legal Safety, Franchise-First, Tech-Powered, Trust) |
| Pain Points | Common real estate problems IDAM addresses |
| Solutions | How IDAM solves each problem (verified listings, transparency, CRM, mobile) |
| Comparison | Traditional vs IDAM table |
| CTA | Final call-to-action with buy/sell/partner paths |

## Tour anchors

| Anchor | Element |
|---|---|
| `why-hero` | Hero block |
| `why-problems` | Pain points |
| `why-solutions` | Solutions grid |
| `why-comparison` | Comparison table |
| `why-cta` | Bottom CTA |

## Notes

- This page uses its own `Howworks.css`-style scoped CSS (class names like `hero-section`, `solutions-title`, `cta-title`) instead of Tailwind utilities. Don't confuse with the global Tailwind classes used elsewhere.
- All copy is hard-coded — no CMS hookup.
