/* 91 IDAM interactive product tour controller.
 * driver.js drives one tooltip at a time over a fullscreen mockup app.
 * Each step references one screen + one anchor inside it; the controller
 * swaps the visible screen before driver.js highlights the anchor.
 */

(function () {
  'use strict';

  if (!window.driver || !window.driver.js) {
    console.error('driver.js failed to load');
    return;
  }
  const { driver } = window.driver.js;

  /* ============================================================
     TOUR STEPS — comprehensive walk through every tab.
     ============================================================ */
  const STEPS = [
    // ============= HOME =============
    {
      screen: 'home',
      anchor: '[data-anchor="logo"]',
      title: '👋 Welcome to 91 IDAM',
      desc: 'A tech-enabled real-estate platform — search verified properties, list your own, talk to agents, manage everything from one dashboard. The logo always returns you home.',
      side: 'bottom',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="nav-properties"]',
      title: 'Browse Properties',
      desc: 'Click <strong>Properties</strong> for the full search page with filters, sorting and 10,000+ listings.',
      side: 'bottom',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="nav-individuals"]',
      title: 'Individual registration',
      desc: 'Buyer, seller, or renter? Register here to access verified properties and agents in your area.',
      side: 'bottom',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="nav-franchise"]',
      title: 'Franchise Partners',
      desc: 'Want to start your own 91 IDAM franchise? Drops a lead with our partnerships team via Zoho CRM.',
      side: 'bottom',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="nav-agents"]',
      title: 'Our Agents',
      desc: 'Browse every certified agent on the platform. Each agent is vetted by a super-admin before going live.',
      side: 'bottom',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="hero-search"]',
      title: 'Quick search',
      desc: 'Type a city, locality or project name. Live suggestions after 2 characters; press <kbd>Enter</kbd> to see all results.',
      side: 'top',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="login-btn"]',
      title: 'Sign in',
      desc: 'Login with email + password and a 6-digit OTP. New users can sign up from the same modal.',
      side: 'left',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="places"]',
      title: 'Who 91 IDAM serves',
      desc: 'Four customer segments: individual buyers/sellers/NRIs/tenants, franchise entrepreneurs, vendor professionals (builders, lawyers, loan agents), and institutional clients.',
      side: 'top',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="sellers"]',
      title: 'Browse by who\'s selling',
      desc: 'Plots and land filtered by seller type — Dealer, Owner or Builder. 3,000+ properties under each.',
      side: 'top',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="services"]',
      title: 'Beyond property listings',
      desc: 'The full 91 IDAM ecosystem: legal verification ("Property. Done Right."), franchise programs, verified vendor onboarding, and enterprise SLA delivery.',
      side: 'top',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="list-cta"]',
      title: 'Got a property to sell?',
      desc: 'Click here to start a listing in 5 minutes. We verify documents and bring serious buyers within 48 hours.',
      side: 'top',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="comparison"]',
      title: 'Why us vs traditional brokers',
      desc: 'Quick side-by-side: legal verification, transparency, time-to-close, tech enablement.',
      side: 'top',
    },
    {
      screen: 'home',
      anchor: '[data-anchor="testimonials"]',
      title: 'Customer trust',
      desc: 'Real customer testimonials plus trust badges — Government Registered, ISO Certified, Legal Compliance.',
      side: 'top',
    },

    // ============= LOGIN MODAL =============
    {
      screen: 'login',
      anchor: '[data-anchor="login-card"]',
      title: 'The login modal',
      desc: 'Email + password is the first factor. After this we email a 6-digit OTP for the second factor. "Remember me" extends the session to 30 days.',
      side: 'right',
    },
    {
      screen: 'login',
      anchor: '[data-anchor="login-cta"]',
      title: 'Send OTP',
      desc: 'Click <strong>Send OTP</strong> to email yourself a one-time code. Max 3 sends per 15 minutes; 5 wrong attempts → 24h account lock.',
      side: 'top',
    },

    // ============= OTP =============
    {
      screen: 'otp',
      anchor: '[data-anchor="otp-input"]',
      title: 'Enter the 6-digit code',
      desc: 'Code arrives in your inbox within seconds. Auto-advance + paste support; <kbd>Enter</kbd> submits.',
      side: 'bottom',
    },

    // ============= SEARCH =============
    {
      screen: 'search',
      anchor: '[data-anchor="filters"]',
      title: '10 filter facets',
      desc: 'Budget, type, area, posted-by, locality, approvals (DTCP/RERA/CMDA), ownership, facing, road width — multi-select chips.',
      side: 'right',
    },
    {
      screen: 'search',
      anchor: '[data-anchor="sort"]',
      title: 'Sort the results',
      desc: 'Newest first, price low/high, area small/large, or alphabetical.',
      side: 'left',
    },
    {
      screen: 'search',
      anchor: '[data-anchor="result-card"]',
      title: 'Result card',
      desc: 'Each card shows price, area, BHK, owner/agent and description. Click to open property details.',
      side: 'top',
    },
    {
      screen: 'search',
      anchor: '[data-anchor="results-list"]',
      title: 'Pagination + density',
      desc: '24 results per page. The agent name on each card links to their profile. The phone icon contacts them directly (login-gated).',
      side: 'left',
    },

    // ============= PROPERTY DETAILS =============
    {
      screen: 'property-details',
      anchor: '[data-anchor="gallery"]',
      title: 'Photo gallery',
      desc: 'Up to 10 images. Click the cover for fullscreen, or scrub through thumbnails.',
      side: 'bottom',
    },
    {
      screen: 'property-details',
      anchor: '[data-anchor="summary"]',
      title: 'Summary',
      desc: 'Price (with negotiable flag), category, area, status — at a glance.',
      side: 'right',
    },
    {
      screen: 'property-details',
      anchor: '[data-anchor="attrs"]',
      title: 'Property attributes',
      desc: 'Bathrooms, parking, facing, floors, age, furnishing, plot area, road width — every detail buyers ask about.',
      side: 'right',
    },
    {
      screen: 'property-details',
      anchor: '[data-anchor="facilities"]',
      title: 'Amenities',
      desc: 'Pool, gym, security, garden, power backup — visual tags so buyers can scan in seconds.',
      side: 'right',
    },
    {
      screen: 'property-details',
      anchor: '[data-anchor="location"]',
      title: 'Location',
      desc: 'Full address + Google Maps link. Stored verbatim — no parsing — so both share URLs and embed URLs work.',
      side: 'right',
    },
    {
      screen: 'property-details',
      anchor: '[data-anchor="similar"]',
      title: 'Similar properties',
      desc: 'Auto-recommended properties near this one. Helps buyers compare without leaving the page.',
      side: 'top',
    },
    {
      screen: 'property-details',
      anchor: '[data-anchor="contact-card"]',
      title: 'Contact the agent',
      desc: 'Sticky contact card with the verified agent. Login required to send an enquiry — keeps spam out.',
      side: 'left',
    },

    // ============= OUR AGENTS =============
    {
      screen: 'agents',
      anchor: '[data-anchor="agents-hero"]',
      title: 'Verified agents directory',
      desc: 'Every agent here is vetted by a super-admin. Encrypted names are decrypted server-side so the real name shows up.',
      side: 'bottom',
    },
    {
      screen: 'agents',
      anchor: '[data-anchor="agent-card"]',
      title: 'Agent card',
      desc: 'Photo, city, certification, rating and sales history. <strong>DETAILS</strong> opens the full profile.',
      side: 'right',
    },

    // ============= AGENT DETAIL =============
    {
      screen: 'agent-detail',
      anchor: '[data-anchor="ad-photo"]',
      title: 'Photo + Contact CTA',
      desc: 'The left rail with the agent\'s headshot and a direct Contact Me button.',
      side: 'right',
    },
    {
      screen: 'agent-detail',
      anchor: '[data-anchor="ad-header"]',
      title: 'Agent profile header',
      desc: 'Company, name, rating + earned badges (DTCP, RERA, top-agent recognitions).',
      side: 'bottom',
    },
    {
      screen: 'agent-detail',
      anchor: '[data-anchor="ad-tabs"]',
      title: 'About / Properties / Reviews',
      desc: 'About has the bio + specialties; Properties tab loads their active listings; Reviews show buyer feedback.',
      side: 'bottom',
    },
    {
      screen: 'agent-detail',
      anchor: '[data-anchor="ad-contact"]',
      title: 'Contact Me',
      desc: 'Opens the contact popup pre-filled with this agent. Login is required before sending — anti-spam guard.',
      side: 'right',
    },

    // ============= ABOUT =============
    {
      screen: 'about',
      anchor: '[data-anchor="about-hero"]',
      title: 'About 91 IDAM',
      desc: 'Founded 2025, headquartered in Coimbatore. Operating on a franchise model with a tech-first approach.',
      side: 'bottom',
    },
    {
      screen: 'about',
      anchor: '[data-anchor="about-mission"]',
      title: 'Mission & Vision',
      desc: 'Our mission is end-to-end real-estate services through tech and franchise. Vision is 100+ franchise locations across India.',
      side: 'top',
    },
    {
      screen: 'about',
      anchor: '[data-anchor="about-values"]',
      title: '8 Core Values',
      desc: 'Public commitment, transparency, confidentiality, integrity, employee happiness, collaboration, time value, customer-centricity.',
      side: 'top',
    },
    {
      screen: 'about',
      anchor: '[data-anchor="about-leadership"]',
      title: 'Leadership',
      desc: 'Founded by Mr. Pratheesh Kumar-E. 40+ years of combined real-estate wisdom on the leadership team.',
      side: 'top',
    },
    {
      screen: 'about',
      anchor: '[data-anchor="about-segments"]',
      title: 'Who we serve',
      desc: '6 customer segments: home buyers, tenants, NRIs, brokers, developers, and franchise entrepreneurs.',
      side: 'top',
    },

    // ============= WHY IDAM =============
    {
      screen: 'whyidam',
      anchor: '[data-anchor="why-hero"]',
      title: 'Why IDAM',
      desc: 'Tech-first solutions, legal verification, franchise opportunities, 40+ years of industry wisdom — combined in one platform.',
      side: 'bottom',
    },
    {
      screen: 'whyidam',
      anchor: '[data-anchor="why-problems"]',
      title: 'Real estate\'s pain points',
      desc: 'Legal disputes, hidden brokerage, slow closings, no follow-up. The status quo costs buyers and sellers time and money.',
      side: 'top',
    },
    {
      screen: 'whyidam',
      anchor: '[data-anchor="why-solutions"]',
      title: 'How we solve them',
      desc: 'Verified listings, fixed transparent fees, 2-6 week closings, full lifecycle from registration to handover.',
      side: 'top',
    },
    {
      screen: 'whyidam',
      anchor: '[data-anchor="why-cta"]',
      title: 'Get started',
      desc: 'Three doors: buy, list, partner. Each opens a guided flow.',
      side: 'top',
    },

    // ============= HOW IT WORKS =============
    {
      screen: 'howitworks',
      anchor: '[data-anchor="how-hero"]',
      title: 'How IDAM works',
      desc: 'Streamlined, tech-enabled processes for every real-estate journey — buying, selling, partnering, vendor onboarding.',
      side: 'bottom',
    },
    {
      screen: 'howitworks',
      anchor: '[data-anchor="how-tabs"]',
      title: 'Choose your path',
      desc: '4 workflows: Property Transactions (default), Franchise Partnership, Service Providers, Enterprise Solutions.',
      side: 'bottom',
    },
    {
      screen: 'howitworks',
      anchor: '[data-anchor="how-steps"]',
      title: '4-step process',
      desc: 'Discovery → Legal Verification → Buyer-Seller Matching → Agreement & Registration. Each step has expected duration and key features.',
      side: 'top',
    },

    // ============= CAREERS =============
    {
      screen: 'careers',
      anchor: '[data-anchor="careers-hero"]',
      title: 'Careers',
      desc: 'Apply to join 91 IDAM. HR responds within 48 hours. Submissions go through Zoho CRM.',
      side: 'bottom',
    },
    {
      screen: 'careers',
      anchor: '[data-anchor="careers-form"]',
      title: 'Application form',
      desc: 'Required: name, email, phone, position. Optional: experience and a cover-letter message.',
      side: 'right',
    },
    {
      screen: 'careers',
      anchor: '[data-anchor="careers-submit"]',
      title: 'Submit application',
      desc: 'Creates a Zoho lead with source=Careers. Duplicate-email submissions are blocked at the API.',
      side: 'top',
    },

    // ============= CONTACT =============
    {
      screen: 'contact',
      anchor: '[data-anchor="contact-hero"]',
      title: 'Contact us',
      desc: 'Reach the team — phone, email, or the contact form. Response within 1-2 business days.',
      side: 'bottom',
    },
    {
      screen: 'contact',
      anchor: '[data-anchor="contact-map"]',
      title: 'Our office',
      desc: 'Coimbatore HQ. Click "Open in Maps" for directions.',
      side: 'right',
    },
    {
      screen: 'contact',
      anchor: '[data-anchor="contact-info"]',
      title: 'Phone & email',
      desc: 'Live tel: + mailto: links. Office hours Mon-Sat 9 AM – 7 PM.',
      side: 'right',
    },
    {
      screen: 'contact',
      anchor: '[data-anchor="contact-form"]',
      title: 'Contact form',
      desc: 'For non-urgent enquiries. Validates email format; messages must be ≥10 characters.',
      side: 'left',
    },

    // ============= USER PROFILE — MY LISTINGS =============
    {
      screen: 'user-profile',
      anchor: '[data-anchor="profile-sidebar"]',
      title: 'Your dashboard',
      desc: 'After login this is your home base. The sidebar swaps between My Listings, Responses, Contacted, Profile and Change Password. Super-admins see Manage too.',
      side: 'right',
    },
    {
      screen: 'user-profile',
      anchor: '[data-anchor="my-listing"]',
      title: 'My Listings — listing card',
      desc: 'Each row shows status (Active / Pending / Rejected), price, enquiry count, view count, edit + delete actions.',
      side: 'top',
    },
    {
      screen: 'user-profile',
      anchor: '[data-anchor="nav-responses"]',
      title: 'View Responses',
      desc: 'Click here to see who has reached out about your listings.',
      side: 'right',
    },

    // ============= START SELLING =============
    {
      screen: 'start-selling',
      anchor: '[data-anchor="sell-form"]',
      title: 'List a property',
      desc: 'Multi-section form — identity, type, location, price, specs, photos. Submission goes to admin for approval (24-48 hours).',
      side: 'right',
    },
    {
      screen: 'start-selling',
      anchor: '[data-anchor="sell-type"]',
      title: 'Property type',
      desc: 'Choose <strong>Residential Plot/Land</strong> or <strong>Commercial Plot/Land</strong>. This drives the rest of the form (state, city, pincode, road width and amenity options change accordingly).',
      side: 'right',
    },
    {
      screen: 'start-selling',
      anchor: '[data-anchor="sell-road-width"]',
      title: 'Road Width Type',
      desc: 'Pick the unit your road width is measured in — typically <strong>Feet</strong> in Tamil Nadu. Buyers filter properties by this on the search page.',
      side: 'right',
    },
    {
      screen: 'start-selling',
      anchor: '[data-anchor="sell-location"]',
      title: 'Location Details',
      desc: 'State, City/District and Pincode are required. Locality is free text. Google Maps URL is optional and stored verbatim — both share URLs and embed URLs work.',
      side: 'top',
    },
    {
      screen: 'start-selling',
      anchor: '[data-anchor="sell-price"]',
      title: 'Price & area',
      desc: 'Price in rupees, area in sq.ft. The platform formats lakhs / crores automatically.',
      side: 'top',
    },
    {
      screen: 'start-selling',
      anchor: '[data-anchor="sell-images"]',
      title: 'Upload photos',
      desc: 'Up to 10 images, JPG/PNG, ≤5 MB each. The first image is used as the cover.',
      side: 'top',
    },
    {
      screen: 'start-selling',
      anchor: '[data-anchor="sell-submit"]',
      title: 'Submit for approval',
      desc: 'Once approved, the listing appears in /search-property and you start receiving enquiries.',
      side: 'top',
    },

    // ============= VIEW RESPONSES =============
    {
      screen: 'responses',
      anchor: '[data-anchor="enquiry-group"]',
      title: 'Grouped by property',
      desc: 'Buyer enquiries are grouped under each listing. Click the header to expand or collapse. Counter chip shows total enquiries per group.',
      side: 'top',
    },
    {
      screen: 'responses',
      anchor: '[data-anchor="enquiry-row"]',
      title: 'A buyer enquiry',
      desc: 'Buyer name, contact, message and status badge (PENDING / APPROVED / CONTACTED). Email + phone are visible only after the buyer submits.',
      side: 'top',
    },
    {
      screen: 'responses',
      anchor: '[data-anchor="enquiry-action"]',
      title: 'Mark Contacted',
      desc: 'Once you have called the buyer, mark the enquiry contacted. Closed enquiries drop to the bottom of the list.',
      side: 'top',
    },

    // ============= CONTACTED =============
    {
      screen: 'contacted',
      anchor: '[data-anchor="contact-row"]',
      title: 'Contacted tab',
      desc: 'People who reached out via the agent\'s Contact-Me form. Shows the originating agent, contact info, and message.',
      side: 'top',
    },

    // ============= MANAGE — AGENTS TAB (super-admin) =============
    {
      screen: 'manage',
      anchor: '[data-anchor="manage-tabs"]',
      title: 'Manage — super-admin only',
      desc: 'This entire section is visible <strong>only to super-admins</strong>. It has two tabs: <strong>Agents</strong> — every agent in the application — and <strong>Properties</strong> — every property posted by those agents.',
      side: 'bottom',
    },
    {
      screen: 'manage',
      anchor: '[data-anchor="manage-tab-agents"]',
      title: 'Agents tab',
      desc: 'Lists <strong>every agent registered on the platform</strong> — Active, Pending and Rejected combined. Only super-admins can see this list. Use it to monitor who\'s on the platform, approve newcomers, or remove anyone who shouldn\'t be here.',
      side: 'bottom',
    },
    {
      screen: 'manage',
      anchor: '[data-anchor="manage-table"]',
      title: 'Agent moderation table',
      desc: 'One row per agent: ID, decrypted name, email, status badge, joined date, plus their listing count and lead count so you can spot inactive accounts at a glance.',
      side: 'top',
    },
    {
      screen: 'manage',
      anchor: '[data-anchor="manage-delete"]',
      title: 'Delete an agent',
      desc: 'Permanently removes that agent from the platform. Cascades to all their properties and enquiries. Approve / reject for pending agents runs through a single endpoint that decrypts the name server-side. Confirmation modal required.',
      side: 'left',
    },

    // ============= MANAGE — PROPERTIES TAB =============
    {
      screen: 'manage-properties',
      anchor: '[data-anchor="manage-tab-properties-p"]',
      title: 'Properties tab',
      desc: 'Click <strong>Properties</strong> to switch from the agent list to the property list. The page now shows every property listed on the platform.',
      side: 'bottom',
    },
    {
      screen: 'manage-properties',
      anchor: '[data-anchor="manage-prop-table"]',
      title: 'All agent properties',
      desc: 'Lists <strong>every property posted by every agent</strong> across the platform — Active (live in search), Pending (awaiting approval) and Rejected combined. Only super-admins can see this view. Columns show ID, title, city, owning agent, status, file count, enquiry count and submission date.',
      side: 'top',
    },
    {
      screen: 'manage-properties',
      anchor: '[data-anchor="manage-prop-delete"]',
      title: 'Delete a property',
      desc: 'Removes the listing from the public site immediately. Use it to clear duplicates, fraud, or low-quality submissions. The owning agent is notified by email and any open enquiries are archived.',
      side: 'left',
    },

    // ============= WRAP =============
    {
      screen: 'home',
      anchor: '[data-anchor="logo"]',
      title: "🎉 You're set!",
      desc: "That's 91 IDAM end-to-end — every tab, every flow. Click <strong>Restart tour</strong> any time, or <strong>Exit</strong> to dive into the docs.",
      side: 'bottom',
    },
  ];

  /* ============================================================
     Screen swap helper
     ============================================================ */
  const screens = Array.from(document.querySelectorAll('.app-screen'));
  let currentScreen = null;

  function showScreen(name) {
    if (currentScreen === name) return;
    screens.forEach((el) => { el.hidden = el.dataset.screen !== name; });
    currentScreen = name;
    void document.body.offsetHeight;
  }

  /* ============================================================
     localStorage flag
     ============================================================ */
  const KEY = 'idam.demo.tour.v1';
  function readState() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
  }
  function writeState(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  }
  function isFirstVisit() { return !readState().completed; }
  function markCompleted() { writeState({ ...readState(), completed: Date.now() }); }

  /* ============================================================
     Driver.js
     ============================================================ */
  let d = null;

  function makeDriverSteps() {
    return STEPS.map((s, idx) => ({
      element: s.anchor,
      popover: {
        title: s.title,
        description: s.desc,
        side: s.side || 'bottom',
        align: 'start',
        showProgress: true,
        progressText: `${idx + 1} of ${STEPS.length}`,
        nextBtnText: idx === STEPS.length - 1 ? 'Done ✓' : 'Next →',
        prevBtnText: '← Back',
      },
      onHighlightStarted: () => {
        if (s.screen) showScreen(s.screen);
      },
    }));
  }

  function startTour(jumpTo = 0) {
    if (d && d.isActive && d.isActive()) d.destroy();
    const startScreen = STEPS[jumpTo]?.screen || STEPS[0].screen;
    showScreen(startScreen);

    d = driver({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      allowClose: true,
      overlayOpacity: 0.65,
      stagePadding: 8,
      stageRadius: 10,
      popoverClass: 'idam-tour-popover',
      onCloseClick: () => { d.destroy(); },
      onHighlighted: () => {
        // Sync the steps-panel highlight whenever the active step changes.
        renderStepsPanelHighlight();
      },
      onDestroyed: () => {
        const idx = d.getActiveIndex?.();
        if (typeof idx === 'number' && idx >= STEPS.length - 1) {
          markCompleted();
        }
      },
      steps: makeDriverSteps(),
    });

    d.drive(jumpTo);
  }

  /* ============================================================
     Jump-to-any-step panel
     ============================================================ */
  const stepsBtn = document.getElementById('steps-btn');
  const stepsPanel = document.getElementById('steps-panel');
  const stepsBackdrop = document.getElementById('steps-panel-backdrop');
  const stepsCloseBtn = document.getElementById('steps-panel-close');
  const stepsList = document.getElementById('steps-panel-list');

  // Pretty screen labels for the group headers.
  const SCREEN_LABELS = {
    home: '🏠 Home',
    login: '🔐 Login',
    otp: '✉️ OTP verification',
    search: '🔍 Search Properties',
    'property-details': '📋 Property Details',
    agents: '👥 Our Agents',
    'agent-detail': '👤 Agent Detail',
    about: 'ℹ️ About',
    whyidam: '✨ Why IDAM',
    howitworks: '⚙️ How It Works',
    careers: '💼 Careers',
    contact: '📞 Contact',
    'user-profile': '🧑‍💼 User Profile',
    'start-selling': '🏷️ Start Selling',
    responses: '📬 View Responses',
    contacted: '📇 Contacted',
    manage: '🛡️ Manage — Agents tab',
    'manage-properties': '🛡️ Manage — Properties tab',
  };

  function buildStepsPanel() {
    // Group consecutive steps by screen so users can scan by section.
    const groups = [];
    let cur = null;
    STEPS.forEach((s, idx) => {
      if (!cur || cur.screen !== s.screen) {
        cur = { screen: s.screen, items: [] };
        groups.push(cur);
      }
      cur.items.push({ idx, ...s });
    });

    stepsList.innerHTML = groups
      .map((g) => `
        <li class="steps-group">
          <div class="steps-group-head">${SCREEN_LABELS[g.screen] || g.screen}</div>
          <ol class="steps-group-items">
            ${g.items
              .map(
                (it) => `
                <li class="steps-item" data-idx="${it.idx}" tabindex="0" role="button">
                  <span class="steps-num">${it.idx + 1}</span>
                  <div class="steps-item-body">
                    <div class="steps-item-title">${escapeHtml(it.title)}</div>
                    <div class="steps-item-desc">${stripTags(it.desc)}</div>
                  </div>
                </li>`
              )
              .join('')}
          </ol>
        </li>
      `)
      .join('');

    stepsList.querySelectorAll('.steps-item').forEach((el) => {
      el.addEventListener('click', () => jumpToStep(Number(el.dataset.idx)));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          jumpToStep(Number(el.dataset.idx));
        }
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function stripTags(s) {
    return String(s).replace(/<[^>]+>/g, '');
  }

  function renderStepsPanelHighlight() {
    if (!d || !d.isActive || !d.isActive()) return;
    const idx = d.getActiveIndex?.();
    stepsList.querySelectorAll('.steps-item').forEach((el) => {
      el.classList.toggle('current', Number(el.dataset.idx) === idx);
    });
  }

  function openStepsPanel() {
    stepsPanel.hidden = false;
    stepsBackdrop.hidden = false;
    stepsBtn.setAttribute('aria-expanded', 'true');
    renderStepsPanelHighlight();
    // Scroll the current step into view inside the panel.
    const cur = stepsList.querySelector('.steps-item.current');
    if (cur) cur.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
  function closeStepsPanel() {
    stepsPanel.hidden = true;
    stepsBackdrop.hidden = true;
    stepsBtn.setAttribute('aria-expanded', 'false');
  }

  function jumpToStep(idx) {
    if (idx < 0 || idx >= STEPS.length) return;
    closeStepsPanel();
    if (d && d.isActive && d.isActive()) {
      // Driver already running — just move.
      showScreen(STEPS[idx].screen);
      d.moveTo(idx);
    } else {
      // Tour was closed — restart from the chosen step.
      startTour(idx);
    }
  }

  stepsBtn.addEventListener('click', () => {
    if (stepsPanel.hidden) openStepsPanel();
    else closeStepsPanel();
  });
  stepsCloseBtn.addEventListener('click', closeStepsPanel);
  stepsBackdrop.addEventListener('click', closeStepsPanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !stepsPanel.hidden) closeStepsPanel();
  });

  document.getElementById('restart-btn').addEventListener('click', () => {
    writeState({});
    startTour();
  });

  buildStepsPanel();

  window.addEventListener('load', () => {
    showScreen('home');
    if (isFirstVisit()) {
      setTimeout(startTour, 500);
    }
  });
})();
