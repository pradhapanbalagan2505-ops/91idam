# Features

Master feature list for 91 IDAM. The detailed feature spec lives at `../../91IDAM_Project_Features.md`; this doc summarises and links to per-module guides.

## 1. Authentication

- Email + password login with OTP MFA
- Remember-me 30-day sessions
- Forgot-password with 24 h IP-bound reset link
- Brute-force lockouts (5 failed OTPs → 24 h)
- Multi-device session management with remote terminate

→ [authentication.md](./modules/authentication.md)

## 2. Property search

- Hero search bar with debounced autocomplete
- 10 filter facets, 7 sort options
- Mobile filter overlay
- Result cards with cover image, price, BHK, area, owner

→ [search-property.md](./modules/search-property.md)

## 3. Property details

- Image gallery (full-screen)
- Structured summary
- Map embed
- Owner / agent contact (login-gated)

→ [property-details.md](./modules/property-details.md)

## 4. List a property

- Multi-section form: type, location, price/area, images
- Up to 10 images, 5 MB each
- Goes through admin approval

→ [start-selling.md](./modules/start-selling.md)

## 5. User dashboard

- Profile editor with avatar upload
- Password change
- My Listings (CRUD on own properties)
- View Responses (enquiries grouped by property, approve/reject)
- Contacted (agents you've reached out to)
- Manage tab for super-admins
- Requests tab for super-admins

→ [user-profile.md](./modules/user-profile.md)

## 6. Agents directory

- Verified agent grid
- Per-agent detail pages
- Filter/search by city, specialisation, rating

→ [our-agents.md](./modules/our-agents.md)

## 7. Partner registration

- Individuals, Franchise Partners, Vendors, Enterprise dropdowns
- Modal form goes to Zoho CRM
- Surfaces in admin's Requests tab

## 8. Admin operations

- Property approval (pending → active / rejected)
- Agent approval (CRM-driven)
- Org/franchise management
- Mail-template-driven notifications

→ [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## 9. This documentation set

- Static HTML docs portal — `../docs-portal/`
- Markdown docs (this directory)
- Optional Playwright-based screenshot pipeline — `../scripts/screenshots/`
