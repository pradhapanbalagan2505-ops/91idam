# 91 IDAM Docs Portal

Static documentation site rendering the markdown files from `../markdown-docs/`.

## Run locally

The portal uses `fetch()` to load markdown, so you need a static server (file:// won't work):

```bash
cd 91idam-react/docs-portal
python3 -m http.server 8000
# open http://localhost:8000
```

…or any other static server (`npx serve`, `caddy file-server`, etc.).

## Features

- Sticky header + sidebar
- Sidebar grouped by Get Started / Guides / Modules / Resources
- Light + dark theme (auto-detects `prefers-color-scheme`, persisted to `localStorage`)
- Client-side search (Ctrl/⌘ + K) over headings and body text
- Hash routing (`#/readme`, `#/modules/home`, …)
- Image preview modal (click any image)
- Mobile responsive — sidebar collapses behind a hamburger
- "Edit on disk" link for each page

## Add a new page

1. Drop a new `*.md` into `../markdown-docs/` (or `../markdown-docs/modules/`).
2. Add a `<a class="nav-link" href="#/<slug>" data-doc="../markdown-docs/<file>.md">…</a>` to `index.html`'s sidebar.
3. Reload — it's picked up automatically.

## How search works

On first focus, the JS fetches every doc referenced by a sidebar link, splits each file by headings, and indexes both heading text and body text. The index is built once per session (in-memory, ~50 KB).

## Files

```
docs-portal/
├── index.html              — shell + sidebar
├── assets/
│   ├── docs.css            — design tokens, layout, typography
│   ├── docs.js             — routing, render, theme, search, image modal
│   └── marked.min.js       — markdown parser (vendored from CDN)
└── README.md               — this file
```

## Vendoring policy

`marked.min.js` is vendored (committed) so the portal works offline and has no third-party runtime dependencies. To upgrade:

```bash
curl -L -o assets/marked.min.js https://cdn.jsdelivr.net/npm/marked@<version>/marked.min.js
```
