# Module — Careers

**Route:** `/careers`
**Source:** `src/pages/Careers/`

## Overview

Recruitment landing page. Lists open roles and an application form. The form is wired to Zoho CRM (commit `0f6f77b2`).

## Sections

- Hero with company-positioning copy
- "Why work with us" — culture + benefits
- Open positions list — collapsible rows
- Application form — name, email, mobile, resume upload, role of interest

## Application flow

1. User fills the form and uploads a resume (PDF/DOCX).
2. Resume is uploaded via `API_ENDPOINTS.ATTACHMENTS.UPLOAD`.
3. Form payload + resume file id are POSTed to the careers endpoint.
4. The endpoint creates a Zoho lead with `source = "Careers"`.
5. Recruiter is notified by email.

## Validation

- Name: required, ≥ 2 chars
- Email: required, RFC-style format check
- Mobile: required, 10-digit numeric
- Resume: required, PDF or DOCX, ≤ 5 MB

Duplicate email submissions are blocked at the API layer.

## Notes

The careers page does not require login. Submissions are accessible to super-admins under **Profile → Requests** (alongside other lead types).
