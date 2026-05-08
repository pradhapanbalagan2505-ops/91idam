# 91 IDAM — User & Admin Guide

A standalone documentation pack for [91idam.com](https://91idam.com). This folder is **independent of the production codebase** — drop it anywhere, share it with anyone, nothing in the React app or backend depends on it.

## What's inside

```
91idam-user-guide/
├── README.md                    ← you are here
├── markdown-docs/               ← all written documentation
│   ├── README.md                  index of every doc
│   ├── INSTALLATION.md            setup & deployment notes
│   ├── USER_GUIDE.md              end-user workflows
│   ├── ADMIN_GUIDE.md             super-admin / franchise-admin operations
│   ├── FEATURES.md                feature inventory
│   ├── FAQ.md                     common questions
│   ├── TROUBLESHOOTING.md         known issues + fixes
│   ├── CHANGELOG.md               recent commits summary
│   └── modules/                   per-screen guides (13 files)
│
├── docs-portal/                 ← static HTML site that renders the markdown
│   ├── index.html
│   └── assets/
│       ├── docs.css
│       ├── docs.js
│       └── marked.min.js
│
└── scripts/                     ← optional Playwright screenshot pipeline
    └── screenshots/
        ├── capture.js
        ├── pages.json
        └── README.md
```

## How to use

### Option 1 — Just read the markdown

Open any `.md` file in `markdown-docs/` in your editor or VS Code preview (Ctrl+Shift+V).
Start with [`markdown-docs/README.md`](./markdown-docs/README.md).

### Option 2 — Browse the HTML portal (recommended)

The portal renders all the markdown with sidebar navigation, search and dark mode.

```bash
cd 91idam-user-guide
python3 -m http.server 8000
```

Open **http://localhost:8000/docs-portal/** in your browser (the trailing slash matters).

> Two important gotchas:
> - Run the server from the `91idam-user-guide` folder itself, **not** from inside `docs-portal/`. The portal references markdown at `../markdown-docs/`, so the server root must be one level above.
> - Opening `docs-portal/index.html` directly via `file://` will **not** work — browsers block `fetch()` on local files. Always serve over HTTP.

### Option 3 — Capture fresh screenshots (optional)

If you want updated screenshots inside the docs:

```bash
cd 91idam-user-guide
npm init -y
npm install --save-dev playwright
npx playwright install chromium

# in another terminal, start the dev server in the project repo:
cd /path/to/91idam/91idam-react && npm run dev_only

# then back here:
node scripts/screenshots/capture.js
```

See [`scripts/screenshots/README.md`](./scripts/screenshots/README.md) for full options.

## What this isn't

- **Not part of the codebase.** Nothing here imports from the React app, and the React app doesn't import from here. Sharing or losing this folder has zero effect on the running site.
- **Not a runtime dependency.** No code is injected into the app. No tour libraries are installed. No `data-*` attributes were added to any component.
- **Not auto-generated.** The markdown is hand-curated from reading the codebase and the existing `91IDAM_Project_Features.md`.

## Sharing it

Zip this folder and send it. The recipient only needs:

- a markdown reader (or VS Code) for **Option 1**
- Python 3 *or* any static-file server for **Option 2**
- Node 18+ and Playwright for **Option 3** (only if they want to regenerate screenshots)
