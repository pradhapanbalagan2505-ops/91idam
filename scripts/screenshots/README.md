# Screenshot capture

Auto-capture screenshots of every public 91 IDAM route. Optional companion to the docs portal — drop the resulting PNGs into your markdown / HTML docs.

This script is **standalone** — it lives in this user-guide folder and runs against a separately-running dev server. It does not modify the React project.

## One-time setup (in this user-guide folder)

```bash
cd 91idam-user-guide
npm init -y
npm install --save-dev playwright
npx playwright install chromium
```

## Run

Start the React dev server in the project repo (in a separate terminal):

```bash
cd /path/to/91idam-react
npm run dev_only           # serves on http://localhost:3000
```

Then from this user-guide folder:

```bash
node scripts/screenshots/capture.js
```

Override base URL or output directory via env vars:

```bash
BASE_URL=http://localhost:5173 OUT_DIR=docs-portal/assets/screenshots \
  node scripts/screenshots/capture.js
```

## What you get

For each page in `pages.json`:

- `<name>.png` — full-page screenshot

Output lands in `docs-portal/assets/screenshots/` by default so the HTML portal can reference them inline.

## Configure

Edit `pages.json`:

- Add a route to `pages[]` with `name`, `path`, `fullPage`, optional `wait` selector and optional `click` interaction.

The script tolerates missing selectors — it logs a warning and moves on rather than failing the whole batch.

## Authenticated routes

`/user-profile` and `/start-selling` need a logged-in session. Two options:

1. **Storage state** — log in once manually, then `await context.storageState({ path: 'auth.json' })` and load it on subsequent runs (uncomment the corresponding lines in `capture.js` and add `auth.json` to `.gitignore`).
2. **Programmatic login** — drive the login modal in the script. Brittle; not recommended unless OTP can be bypassed in dev.

## Troubleshooting

- **Connection refused** — dev server isn't running. Start it with `npm run dev_only` first.
- **Selector timeout** — the page may not have finished loading. Bump `timeout` in `captureOne()` or add a more reliable `wait` selector.
- **Empty/blank page** — the React HashRouter sometimes needs an extra tick. Add `await page.waitForTimeout(500)` after `goto`.
