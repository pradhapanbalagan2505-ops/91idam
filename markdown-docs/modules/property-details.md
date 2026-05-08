# Module — Property Details

**Route:** `/property-details/:id`
**Source:** `src/pages/PropertyDetails/`

## Overview

Detail page for a single property. Loads by ID from the URL.

## Page sections

| Section | What it shows |
|---|---|
| Image gallery | Cover + carousel + fullscreen viewer (`src/components/PropertyImageGallery/`) |
| Summary card | Price, BHK, area, type, ownership, status, posted-by |
| Description | Free-text from the listing |
| Location | Address + Google Maps embed (URL stored verbatim) |
| Owner / Agent | Avatar, name, "Contact" CTA |
| Similar properties | Bottom strip — same locality / price band |

## Tour anchors

| Anchor | Element |
|---|---|
| `pd-gallery` | Image gallery |
| `pd-summary` | Summary card |
| `pd-contact` | Contact owner / agent button |
| `pd-location` | Location / map block |

## Contact flow

1. Click **Contact** → `<ContactPopup>` opens.
2. If unauthenticated → login modal pre-empts.
3. After login (or if already logged in), the user message + property reference is POSTed to the enquiry endpoint.
4. The owner sees the enquiry under **Profile → View Responses**.

## Map URL handling

The Google Maps URL is stored as the raw string the seller pasted — no regex extraction or iframe `src` parsing. Keep it that way; that decision was made deliberately to allow both share URLs and embed URLs.

## Notes

- Status filter — only Active properties are reachable from `/search-property`. Direct deep-links to Pending/Rejected IDs are blocked at the API layer.
- The page eagerly preloads gallery images for snappier slideshow.
