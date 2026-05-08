# Module — Search Property

**Route:** `/search-property`
**Source:** `src/pages/SearchProperty/SearchProperty.jsx`

## Overview

Full-featured property browser. The page reads URL params for the initial filter state, then maintains client-side filtering and sorting for everything else.

```
URL → useSearchParams → initial filter
                      → fetchPropertiesAPI()
                          ↓
                      properties[]   ← server source of truth
                          ↓
              filter (budget, type, area)
                          ↓
                  filteredProperties[]
                          ↓
                       sort
                          ↓
                       render
```

## Filters (left sidebar)

| Filter | Implementation |
|---|---|
| Budget | Multi-select preset ranges |
| Property type | Multi-select (Residential / Commercial) |
| Area (sq.ft) | Multi-select range presets |
| Posted by | Owner / Builder / Dealer (server param) |
| Localities | Free text |
| Approved by | DTCP / RERA / CMDA |
| Ownership | Freehold / DTCP / CMDA / Patta / Leasehold |
| Facing | N / S / E / W combinations |
| Road width | Range |
| New project | Toggle |

Applied filters render as removable chips at the top of the sidebar with a **CLEAR ALL** action.

## Sort options

Located above the result list:

- Newest First (default)
- Price: Low → High / High → Low
- Area: Small → Large / Large → Small
- Title: A → Z / Z → A

## Result cards

Each card shows:

- Cover image (clickable → `/property-details/:id`)
- "FOR SALE" tag
- Price (highlighted, with "Negotiable" annotation if applicable)
- Title
- Location (icon + text)
- Area, BHK, type
- Owner avatar + name (clickable → owner page)
- **Contact** button → opens `<ContactPopup>` (login-gated)

## Tour anchors

| Anchor | Element |
|---|---|
| `search-input` | Mobile filter toggle bar |
| `search-filters` | Left sidebar |
| `search-sort` | Sort dropdown wrapper |
| `search-results` | First result card |
| `search-card-action` | First card image (drives navigation) |

## API

`GET <base>/properties` — returns full list. Search query is appended as `?search=…` and category as `&property_type=1|2`. See `src/services/api/apiendpoints.js` for the endpoint constant.

Properties are normalised through `formatPropertyForDisplay()` (`src/utils/propertyHelpers.js`) before render.

## Edge cases

- **No properties returned** — shows centered "No properties found" with a clear-filters CTA.
- **Loading** — full-row spinner above the result area.
- **API error** — red banner "Error: …" above the result area.
