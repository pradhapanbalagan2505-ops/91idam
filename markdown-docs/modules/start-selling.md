# Module — Start Selling

**Route:** `/start-selling`
**Source:** `src/pages/start-selling/StartSellingForm.jsx`

## Overview

The property listing form. Login required. On submit, a Pending property is created and goes to super-admin for approval.

## Form sections

| Section | Fields |
|---|---|
| Identity | Title (required) |
| Property Type | Residential / Commercial radio |
| Category & BHK | Plot / Apartment / Villa / Individual House (BHK shown for non-Plot) |
| Location | Address, locality, city, pincode (required), state, Google Maps URL |
| Price Details | Selling price (required), area (sq.ft, required), negotiable toggle |
| Specs | Bathrooms, parking, facing, road width, floors, age |
| Approval & Ownership | Approved by, ownership type |
| Upload Media | Up to 10 images (JPG/PNG, ≤5 MB each), main image flag |
| Description | Free text |

Required fields are marked `*`. Validation runs on submit; errors are inline under each field.

## Tour anchors

| Anchor | Element |
|---|---|
| `sell-form` | Form root container |
| `sell-type` | Property type block |
| `sell-location` | Location Details section |
| `sell-price` | Price Details section |
| `sell-images` | Upload Your Media section |
| `sell-submit` | Submit button |

## Image upload pipeline

1. User selects up to 10 images.
2. Each file is POSTed to `API_ENDPOINTS.ATTACHMENTS.UPLOAD` with `org_id` = user's super-org.
3. Server returns a file id; the form keeps a `propertyImages: [{ id, name, … }]` array.
4. On submit, the property API is called with the image id list (not the binaries).
5. Per-file upload state is tracked in `uploadStates` so partial failures can retry.

## Map URL handling

Stored exactly as the seller pasted. No regex extraction; iframe `src` is not parsed out. Both `https://www.google.com/maps/...` share URLs and `https://www.google.com/maps/embed?pb=…` URLs are accepted as-is.

## Submission outcome

| Result | What the user sees |
|---|---|
| Success | Confirmation screen with "Continue" → returns to `/user-profile?section=my-listings` |
| Validation error | Inline messages, scroll-to-first-error |
| API error | Red banner with retry button |

The new listing appears in **My Listings** with status = Pending.
