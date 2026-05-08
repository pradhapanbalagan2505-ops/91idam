# Module — Agent Detail

**Route:** `/our-agents/:id`
**Source:** `src/pages/AgentDetail/AgentDetail.jsx`

## Overview

Per-agent profile page. Loads the agent by ID from the URL.

## Layout

| Region | What it contains |
|---|---|
| Breadcrumb | Idam › Our Agent › `<location>` › `<name>` |
| Left column | Agent photo + Contact Me button |
| Right column | Agent header (company / name / title), tabs (About, Properties, …), tab content |
| Tab: About | Agent bio, license info, specialisations |
| Tab: Properties | Grid of the agent's active listings (clickable → property details) |

## Tour anchors

| Anchor | Element |
|---|---|
| `ad-photo` | Left photo + contact card |
| `ad-header` | Right-side agent header (company / name / title) |
| `ad-tabs` | Tab strip |
| `ad-contact` | "Contact Me" CTA |

## Backend

- `GET /agents/:id` — agent profile
- `GET /agents/:id/properties` — listings for that agent (lazy-loaded when the Properties tab is opened)
- `POST /agents/contact` — enquiry payload (login required)

## Decryption

Agent names are stored encrypted server-side. The unified approve/reject endpoint decrypts them on read so admins (and this profile page) see the human-readable name. Don't try to read the encrypted blob client-side — always go through the API.
