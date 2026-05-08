#!/usr/bin/env node
/* Capture screenshots of every public route for the docs portal.
 *
 * Usage:
 *   1. Start the dev server in a separate terminal:    npm run dev_only
 *   2. Run:                                            node scripts/screenshots/capture.js
 *
 * Override base URL or output dir:
 *   BASE_URL=http://localhost:5173 OUT_DIR=docs-portal/assets/screenshots node scripts/screenshots/capture.js
 *
 * Annotated variants (numbered callouts) are written alongside as <name>.annotated.png.
 */

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

async function loadConfig() {
  const cfgPath = path.join(__dirname, 'pages.json');
  const raw = await fs.readFile(cfgPath, 'utf8');
  const cfg = JSON.parse(raw);
  cfg.baseUrl = process.env.BASE_URL || cfg.baseUrl;
  cfg.outDir = process.env.OUT_DIR || cfg.outDir;
  return cfg;
}

async function ensureServer(baseUrl) {
  try {
    const res = await fetch(baseUrl, { method: 'HEAD' });
    if (!res.ok && res.status >= 500) throw new Error(`status ${res.status}`);
    return true;
  } catch (err) {
    console.error(`\n✖ Dev server is not reachable at ${baseUrl}`);
    console.error(`  Start it first:    npm run dev_only`);
    console.error(`  Then re-run:       node scripts/screenshots/capture.js\n`);
    console.error(`  (underlying error: ${err.message})\n`);
    process.exit(2);
  }
}

async function captureOne(page, cfg, spec) {
  const url = cfg.baseUrl + spec.path;
  console.log(`  → ${spec.name}  (${url})`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
  if (spec.wait) {
    try { await page.waitForSelector(spec.wait, { timeout: 8000 }); }
    catch { console.warn(`    (selector ${spec.wait} not found — continuing)`); }
  }
  if (spec.click) {
    try { await page.click(spec.click); } catch { /* ignore */ }
    if (spec.afterClickWait) await page.waitForTimeout(spec.afterClickWait);
  }
  const file = path.join(cfg.outDir, `${spec.name}.png`);
  await page.screenshot({ path: file, fullPage: !!spec.fullPage });
  return file;
}

async function annotate(page, cfg, shotName, callouts) {
  const url = cfg.baseUrl + (cfg.pages.find((p) => p.name === shotName)?.path ?? '/');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.evaluate((cs) => {
    const ns = document.createElement('div');
    ns.id = '__idam_callouts__';
    Object.assign(ns.style, { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999999 });
    document.body.appendChild(ns);
    cs.forEach((c) => {
      const el = document.querySelector(c.selector);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ring = document.createElement('div');
      Object.assign(ring.style, {
        position: 'fixed',
        left:   r.left   + 'px',
        top:    r.top    + 'px',
        width:  r.width  + 'px',
        height: r.height + 'px',
        border: '3px solid #B59327',
        borderRadius: '8px',
        boxShadow: '0 0 0 9999px rgba(23,89,115,0.18)',
        boxSizing: 'border-box',
      });
      ns.appendChild(ring);
      const tag = document.createElement('div');
      tag.textContent = c.label;
      Object.assign(tag.style, {
        position: 'fixed',
        left: (r.left - 14) + 'px',
        top:  (r.top  - 14) + 'px',
        width: '28px', height: '28px',
        background: '#175973',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '700', fontSize: '14px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
        fontFamily: 'system-ui, sans-serif',
      });
      ns.appendChild(tag);
    });
  }, callouts);
  const out = path.join(cfg.outDir, `${shotName}.annotated.png`);
  await page.screenshot({ path: out, fullPage: false });
  return out;
}

async function main() {
  const cfg = await loadConfig();
  await ensureServer(cfg.baseUrl);
  const outAbs = path.resolve(PROJECT_ROOT, cfg.outDir);
  await fs.mkdir(outAbs, { recursive: true });
  cfg.outDir = outAbs;

  console.log(`\n91 IDAM screenshot capture`);
  console.log(`base: ${cfg.baseUrl}`);
  console.log(`out:  ${cfg.outDir}\n`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: cfg.viewport });
  const page = await ctx.newPage();

  for (const spec of cfg.pages) {
    try { await captureOne(page, cfg, spec); }
    catch (err) { console.warn(`  ✖ ${spec.name}: ${err.message}`); }
  }

  if (Array.isArray(cfg.annotations)) {
    console.log(`\nAnnotating callout variants…`);
    for (const ann of cfg.annotations) {
      try { await annotate(page, cfg, ann.shot, ann.callouts); }
      catch (err) { console.warn(`  ✖ ${ann.shot}.annotated: ${err.message}`); }
    }
  }

  await browser.close();
  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
