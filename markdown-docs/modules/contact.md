# Module — Contact

**Route:** `/contact`
**Source:** `src/pages/Contact/`

## Overview

Static contact page with company details and a "send us a message" form.

## Sections

- Address block with map embed
- Phone numbers and email links
- Social media row
- Contact form (name, email, subject, message)

## Submission flow

1. Form is POSTed to the contact endpoint.
2. A thank-you toast (`<Toast>`) confirms receipt.
3. The lead is forwarded to support via email.

## Validation

- All fields required.
- Email format validation.
- Message ≥ 10 characters.

## Related

- [careers.md](./careers.md) — different lead category but similar flow.
- [USER_GUIDE.md](../USER_GUIDE.md) — for "I'm contacting an owner" use the property contact popup, not this page.
