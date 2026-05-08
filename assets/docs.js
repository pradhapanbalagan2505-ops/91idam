/* 91 IDAM docs portal — single-page renderer.
   Loads markdown by hash route, renders with marked, builds a simple
   client-side search index over titles + headings + paragraphs. */

(function () {
  'use strict';

  if (typeof marked === 'undefined') {
    document.querySelector('#article').innerHTML =
      '<p style="color:#b91c1c">Could not load <code>marked.min.js</code>. ' +
      'Run <code>npm run docs:portal</code> or open <code>docs-portal/assets/README.md</code> for setup.</p>';
    return;
  }

  // Configure marked: GFM tables, breaks off so prose looks normal.
  marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });

  const navLinks = Array.from(document.querySelectorAll('.nav-link[data-doc]'));
  const article = document.getElementById('article');
  const breadcrumb = document.getElementById('breadcrumb');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.querySelector('.menu-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const editLink = document.getElementById('edit-link');
  const searchInput = document.getElementById('docs-search');
  const searchResults = document.getElementById('search-results');

  // ---------- Theme ----------
  const THEME_KEY = 'idam.docs.theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  });

  // ---------- Sidebar (mobile) ----------
  menuToggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  // ---------- Routing ----------
  const docCache = new Map(); // doc path → markdown text

  function pathFromHash() {
    const h = location.hash.replace(/^#\/?/, '');
    return h || 'readme';
  }

  function findLinkByPath(p) {
    return navLinks.find((a) => a.getAttribute('href') === '#/' + p);
  }

  async function loadMarkdown(path) {
    if (docCache.has(path)) return docCache.get(path);
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    const text = await res.text();
    docCache.set(path, text);
    return text;
  }

  async function render() {
    const p = pathFromHash();
    const link = findLinkByPath(p);
    if (!link) {
      article.innerHTML = `<h1>Not found</h1><p>No doc registered for <code>#/${p}</code>.</p>`;
      return;
    }

    navLinks.forEach((a) => a.classList.toggle('active', a === link));
    sidebar.classList.remove('open');

    const docPath = link.getAttribute('data-doc');
    breadcrumb.textContent = `Docs / ${link.textContent.trim()}`;
    editLink.href = docPath;
    editLink.textContent = `Edit ${docPath.split('/').pop()} on disk`;

    try {
      const md = await loadMarkdown(docPath);
      article.innerHTML = marked.parse(md);
      // Hash anchor on a heading? Scroll into view.
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      attachImageModal();
      rewriteInternalLinks();
    } catch (err) {
      article.innerHTML =
        `<h1>Couldn't load page</h1>` +
        `<p>${err.message}</p>` +
        `<p>If you're opening <code>index.html</code> via the file:// protocol, browsers block ` +
        `<code>fetch()</code> on local markdown files. Serve the folder over HTTP:</p>` +
        `<pre><code>cd 91idam-react/docs-portal\npython3 -m http.server 8000\n# open http://localhost:8000</code></pre>`;
    }
  }

  // Convert links like ./modules/home.md or ../markdown-docs/USER_GUIDE.md
  // into hash routes that the SPA understands.
  function rewriteInternalLinks() {
    const map = new Map(navLinks.map((a) => [a.getAttribute('data-doc').replace(/^\.\.\//, ''), a.getAttribute('href')]));
    article.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#')) return;
      // Resolve relative to ../markdown-docs (where md files live).
      const cleaned = href
        .replace(/^\.\//, 'markdown-docs/')
        .replace(/^markdown-docs\//, 'markdown-docs/')
        .replace(/^modules\//, 'markdown-docs/modules/')
        .replace(/^\.\.\/markdown-docs\//, 'markdown-docs/')
        .replace(/^\.\.\/\.\.\//, '')
        .replace(/^\.\.\//, '');
      const target = map.get(cleaned);
      if (target) a.setAttribute('href', target);
    });
  }

  function attachImageModal() {
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('img-modal-img');
    article.querySelectorAll('img').forEach((img) => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modalImg.alt = img.alt || '';
        modal.hidden = false;
      });
    });
  }

  document.querySelector('.img-modal-close').addEventListener('click', () => {
    document.getElementById('img-modal').hidden = true;
  });
  document.getElementById('img-modal').addEventListener('click', (e) => {
    if (e.target.id === 'img-modal') e.currentTarget.hidden = true;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('img-modal').hidden = true;
      hideSearch();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = '#/readme';
  render();

  // ---------- Search ----------
  let searchIndex = null;
  async function buildSearchIndex() {
    if (searchIndex) return searchIndex;
    const docs = navLinks
      .map((a) => ({
        path: a.getAttribute('data-doc'),
        title: a.textContent.trim(),
        href: a.getAttribute('href'),
      }))
      .filter((d) => d.path);

    const settled = await Promise.all(
      docs.map(async (d) => {
        try {
          const md = await loadMarkdown(d.path);
          const sections = parseSections(md);
          return sections.map((s) => ({ ...s, docTitle: d.title, href: d.href }));
        } catch {
          return [];
        }
      })
    );
    searchIndex = settled.flat();
    return searchIndex;
  }

  function parseSections(md) {
    const out = [];
    const lines = md.split(/\r?\n/);
    let cur = { heading: '', anchor: '', body: [] };
    for (const line of lines) {
      const m = /^(#{1,4})\s+(.+?)\s*$/.exec(line);
      if (m) {
        if (cur.heading || cur.body.length) out.push(cur);
        const heading = m[2];
        cur = { heading, anchor: slugify(heading), body: [] };
      } else if (line.trim()) {
        cur.body.push(line);
      }
    }
    if (cur.heading || cur.body.length) out.push(cur);
    return out.filter((s) => s.heading || s.body.length);
  }

  function slugify(s) {
    return s
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  function highlight(text, q) {
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return escapeHtml(text.slice(0, 140));
    const start = Math.max(0, idx - 40);
    const slice = text.slice(start, start + 160);
    return escapeHtml(slice).replace(
      new RegExp(escapeRegExp(q), 'ig'),
      (m) => `<mark>${escapeHtml(m)}</mark>`
    );
  }
  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function showResults(html) {
    searchResults.innerHTML = html;
    searchResults.hidden = false;
  }
  function hideSearch() {
    searchResults.hidden = true;
  }

  let searchTimer = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(runSearch, 100);
  });
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) runSearch();
  });
  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) hideSearch();
  });

  async function runSearch() {
    const q = searchInput.value.trim();
    if (q.length < 2) { hideSearch(); return; }
    showResults('<div class="empty">Searching…</div>');
    const idx = await buildSearchIndex();
    const ql = q.toLowerCase();
    const hits = [];
    for (const sec of idx) {
      const headingHit = sec.heading.toLowerCase().includes(ql) ? 3 : 0;
      const body = sec.body.join(' ');
      const bodyHit = body.toLowerCase().includes(ql) ? 1 : 0;
      const score = headingHit + bodyHit;
      if (score > 0) hits.push({ sec, score, body });
    }
    hits.sort((a, b) => b.score - a.score);
    if (!hits.length) { showResults('<div class="empty">No matches.</div>'); return; }
    showResults(
      hits
        .slice(0, 12)
        .map(
          ({ sec, body }) => `
        <a class="result" href="${sec.href}#${sec.anchor}">
          <div class="result-title">${escapeHtml(sec.heading || '(untitled)')}</div>
          <div class="result-section">${escapeHtml(sec.docTitle)}</div>
          <div class="result-snippet">${highlight(body, q)}</div>
        </a>`
        )
        .join('')
    );
  }
})();
