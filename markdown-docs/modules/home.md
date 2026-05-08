# Module — Home

**Route:** `/home` (default redirect from `/`)
**Source:** `src/pages/Home/`

## Overview

The home page is the marketing surface and primary entry point. It bundles eight sections, in order:

1. **HeroSection** — headline + property search bar
2. **PlacesSection** — featured cities/localities
3. **SellerCategoriesSection** — Buy / Sell / Rent CTAs
4. **ListPropertySection** — "List your property in 5 mins" banner
5. **EnhancedServicesSection** — 4 service cards (Property, Franchise, Vendor, Enterprise)
6. **ComparisonSection** — 91 IDAM vs other portals
7. **TestimonialsSection** — customer quotes
8. **ToolsFeaturesSection** — supporting tools strip

## Key UI elements (with tour anchors)

| Element | Anchor | Purpose |
|---|---|---|
| Logo | `header-logo` | Returns to `/home` |
| Home link | `nav-home` | Active link in nav |
| Properties link | `nav-properties` | Goes to `/search-property` |
| Individuals dropdown | `nav-individuals` | Opens registration modal |
| Franchise Partners dropdown | `nav-franchise` | Opens partner registration modal |
| Our Agents link | `nav-agents` | Goes to `/our-agents` |
| Login button | `header-login` | Opens login modal |
| Hero search | `hero-search` | Live property suggestions |

## Search bar behaviour

- Min 2 characters before suggestions trigger
- 300 ms debounce
- Category toggle: All / Residential / Commercial (filters via `property_type` query param)
- Keyboard: ↑ ↓ Enter Esc
- On submit, navigates to `/search-property?query=…`
- Empty result state shows "No matches found" with a fallback CTA

## Auth gating

The page itself is public. Some CTAs (e.g. "List your property") prompt login if the user is not authenticated.

## Related

- [search-property.md](./search-property.md)
- [authentication.md](./authentication.md)
