# Module — Our Agents

**Route:** `/our-agents`, `/our-agents/:id`
**Source:** `src/pages/OurAgents/`, `src/pages/AgentDetail/`

## Overview

Directory of verified 91 IDAM agents. Two screens:

- `/our-agents` — grid of agent cards.
- `/our-agents/:id` — single agent profile.

## Grid card

- Profile photo (decoded server-side; encrypted names are decrypted on read)
- Name + city
- Specialisation badge(s)
- Listings count
- Rating (avg of buyer enquiries)
- "View profile" CTA → `/our-agents/:id`

## Profile page

- Header strip with photo, name, city
- About / bio
- Active listings (linked cards)
- Contact details — gated behind login to discourage scraping
- Rating + recent reviews
- Contact CTA opens `<ContactPopup>` with the agent context

## Tour anchors

| Anchor | Element |
|---|---|
| `agents-grid` | Card grid container |
| `agents-search` | Top search bar |
| `agent-card` | First card |

## Onboarding flow

Agents can sign up via the public site. The flow:

1. Public agent signup form → CRM lead.
2. Super-admin reviews under **Profile → Manage** (single approve/reject endpoint, decrypts names for review).
3. On approve, the agent record activates and shows up in this directory.

## API

- `GET /agents` — list (filters via query params).
- `GET /agents/:id` — single profile.
- `POST /agents/contact` — enquiry (login required).
