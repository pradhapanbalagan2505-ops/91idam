# Module — User Profile

**Route:** `/user-profile?section=…`
**Source:** `src/pages/user-profile/`, `src/components/profile/`

## Overview

The signed-in user's dashboard. Sidebar on the left switches between sections; the URL `?section=` query param is the source of truth for the active section.

## Sections

| Sidebar id | URL section | Heading | Component |
|---|---|---|---|
| `profile` | `profile` | Profile | `ProfileSection.jsx` |
| `security` | `change-password` | Change Password | `ChangePassword.jsx` |
| `requests` | `requests` | Requests *(super-admin)* | inline in `Fold1.jsx` |
| `orders` | `my-listings` | My Listings | inline in `Fold1.jsx` |
| `wishlist` | `responses` | View Responses | inline in `Fold1.jsx` |
| `payments` | `contacted` | Contacted | inline in `Fold1.jsx` |
| `manage` | `manage` | Manage *(super-admin)* | `Manage.jsx` |

The default section is `my-listings`.

## My Listings

- Lists the user's own properties (formatted with `formatPropertyForDisplay`).
- Status badge per item (Pending / Active / Rejected).
- Actions: edit, delete (with `<DeleteConfirmationModal>`), view enquiries.
- "Add new property" CTA at the page header, links to `/start-selling`.

## View Responses

Buyer enquiries on your properties, grouped by property. Each group expands to show enquiries with:

- Buyer name, email
- Submitted message
- Approve / Reject (super-admin level approval shows extra controls)

Per-enquiry status updates immediately via optimistic UI.

## Contacted

Agents that the user has reached out to. Useful as a "saved contacts" view.

## Manage *(super-admin only)*

Super-admin moderation surface:

- Pending agents — approve / reject (single endpoint).
- Pending properties — approve / reject / delete.
- Decrypted names visible for review.

## Requests *(super-admin only)*

Pending public-form submissions (Individuals, Franchise Partners, Vendor, Enterprise). Each row is a Zoho lead snapshot.

## Tour anchors

| Anchor | Element |
|---|---|
| `profile-sidebar` | Sidebar root |
| `profile-my-listings` | Sidebar item: My Listings |
| `profile-responses` | Sidebar item: View Responses |
| `profile-profile` | Sidebar item: Profile |
| `profile-change-password` | Sidebar item: Change password |
| `profile-manage` | Sidebar item: Manage *(super-admin only)* |
| `profile-content` | Right-hand content pane |

## Mobile behaviour

Below `lg`, the sidebar collapses behind a hamburger button (top-left of the page). Tap to slide in; tap the dimmed overlay to close.
