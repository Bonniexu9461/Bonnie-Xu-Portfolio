/**
 * shared-nav.js
 * ─────────────────────────────────────────────────────────────
 * Vanilla JS (no React, no Babel) navbar + footer injector.
 * Works on every plain HTML page in the Bonnie Xu portfolio.
 *
 * Usage: add ONE line just before </body> on any page:
 *   <script src="shared-nav.js"></script>
 *
 * What it does:
 *   1. Injects <nav id="shared-navbar"> at the top of <body>
 *   2. Injects <footer id="shared-footer"> at the bottom of <body>
 *   3. Auto-detects the current page and highlights the correct link
 *   4. Removes any element with id="legacy-nav" or id="legacy-footer"
 *      so you can keep old markup temporarily during migration.
 * ─────────────────────────────────────────────────────────────
 */
(function () {

  /* ── PAGE DETECTION ───────────────────────────────────────── */
  var currentFile = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (!currentFile || currentFile === 'index.html') currentFile = 'portfolio.html';

  var PAGE_KEYS = {
    'portfolio.html': 'home',
    'about.html':     'about',
    'projects.html':  'portfolio',
    'blog.html':      'blog',
  };
  var currentKey = PAGE_KEYS[currentFile] || '';

  /* ── NAV ITEMS ────────────────────────────────────────────── */
  var NAV_ITEMS = [
    { label: 'Home',      href: 'portfolio.html',         key: 'home'      },
    { label: 'About',     href: 'about.html',             key: 'about'     },
    { label: 'Projects',  href: 'projects.html',          key: 'portfolio' },
    { label: 'Blog',      href: 'blog.html',              key: 'blog'      },
  ];

  /* ── STYLES ───────────────────────────────────────────────── */
  var CSS = '\
    #shared-navbar {\
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;\
      background: rgba(244,242,241,0.92);\
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);\
      border-bottom: 1px solid rgba(170,170,170,0.2);\
      height: 72px; display: flex; align-items: center;\
      transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;\
    }\
    #shared-navbar.nav-hidden { transform: translateY(-100%); }\
    #shared-navbar.nav-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }\
    #sn-progress {\
      position: fixed; top: 0; left: 0; height: 2px; z-index: 1001;\
      background: #E8452A; width: 0%; transition: none;\
      pointer-events: none;\
    }\
    .sn-inner {\
      max-width: 1440px; margin: 0 auto; width: 100%;\
      display: flex; align-items: center; justify-content: space-between;\
      height: 100%; padding: 0 80px;\
    }\
    .sn-logo {\
      text-decoration: none; display: block; line-height: 0;\
    }\
    .sn-links { display: flex; gap: 40px; align-items: center; }\
    .sn-link {\
      font-family: "Poppins", sans-serif; font-size: 14px;\
      font-weight: 500; color: #808080; letter-spacing: -0.28px;\
      text-decoration: none; padding: 4px 0;\
      border-bottom: 1px solid transparent;\
      transition: color 0.2s, border-color 0.2s;\
    }\
    .sn-link:hover { color: #2B2B2B; }\
    .sn-link.active { color: #2B2B2B; border-bottom-color: #2B2B2B; }\
    .sn-cta {\
      background: #2B2B2B; color: #fff; padding: 10px 20px;\
      border-radius: 999px; font-family: "Poppins", sans-serif;\
      font-size: 13px; font-weight: 500; text-decoration: none;\
      white-space: nowrap; transition: background 0.2s;\
    }\
    .sn-cta:hover { background: #1a1a1a; }\
    #shared-footer { background: #2B2B2B; color: #fff; padding: 40px 0 24px 0; }\
    .sf-inner { max-width: 1440px; margin: 0 auto; padding: 0 80px; }\
    .sf-top {\
      display: flex; justify-content: space-between; align-items: flex-start;\
      gap: 40px; flex-wrap: wrap; margin-bottom: 40px;\
    }\
    .sf-brand-name {\
      font-family: "Bricolage Grotesque", sans-serif;\
      font-weight: 700; font-size: 28px; letter-spacing: -1px; margin-bottom: 8px;\
    }\
    .sf-brand-title {\
      font-family: "Poppins", sans-serif; font-size: 13px;\
      font-weight: 300; color: rgba(255,255,255,0.5);\
    }\
    .sf-sections { display: flex; gap: 64px; flex-wrap: wrap; }\
    .sf-section-title {\
      font-family: "Poppins", sans-serif; font-size: 11px; font-weight: 600;\
      color: rgba(255,255,255,0.45); letter-spacing: 1.5px;\
      text-transform: uppercase; margin-bottom: 14px;\
    }\
    .sf-link {\
      display: block; font-family: "Poppins", sans-serif;\
      font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.65);\
      text-decoration: none; margin-bottom: 10px; transition: color 0.2s;\
    }\
    .sf-link:hover { color: #fff; }\
    .sf-bottom {\
      border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;\
      display: flex; justify-content: space-between; align-items: center;\
      flex-wrap: wrap; gap: 12px;\
    }\
    .sf-copy {\
      font-family: "Poppins", sans-serif; font-size: 12px;\
      font-weight: 300; color: rgba(255,255,255,0.4);\
    }\
    .sn-hamburger {\
      display: none; background: none; border: none; cursor: pointer; padding: 8px;\
      flex-direction: column; gap: 5px; z-index: 1001;\
    }\
    .sn-hamburger span {\
      display: block; width: 22px; height: 2px; background: #2B2B2B;\
      transition: transform 0.3s, opacity 0.3s;\
    }\
    .sn-hamburger.open span:nth-child(1) { transform: rotate(45deg) translateY(7px); }\
    .sn-hamburger.open span:nth-child(2) { opacity: 0; }\
    .sn-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translateY(-7px); }\
    .sn-mobile-menu {\
      position: fixed; top: 72px; right: 0; bottom: 0; width: 80%; max-width: 320px;\
      background: #FBFAF9; z-index: 999; padding: 32px;\
      box-shadow: -8px 0 32px rgba(0,0,0,0.08);\
      display: flex; flex-direction: column; gap: 8;\
      transform: translateX(100%); transition: transform 0.3s ease;\
      pointer-events: none;\
    }\
    .sn-mobile-menu.open { transform: translateX(0); pointer-events: auto; }\
    .sn-mobile-link {\
      display: block; font-family: "Poppins", sans-serif; font-size: 20px;\
      font-weight: 500; color: #2B2B2B; padding: 12px 0; text-decoration: none;\
      border-bottom: 1px solid #F4F2F1; letter-spacing: -0.4px;\
    }\
    .sn-mobile-cta {\
      display: block; margin-top: 24px; background: #2B2B2B; color: #fff;\
      padding: 14px 24px; border-radius: 100px; font-family: "Poppins", sans-serif;\
      font-size: 15px; font-weight: 500; text-decoration: none; text-align: center;\
    }\
    #shared-nl-banner { background: #FBFAF9; border-top: 1px solid #EDEDEB; border-bottom: 1px solid #EDEDEB; }\
    .snl-inner { max-width: 1440px; margin: 0 auto; padding: 36px 80px; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px; }\
    .snl-form  { display: flex; gap: 10px; align-items: center; }\
    .snl-input { flex: 1; padding: 11px 18px; border-radius: 999px; border: 1px solid #DDDBD9; background: #fff; font-family: "Poppins", sans-serif; font-size: 13px; color: #2B2B2B; outline: none; min-width: 0; }\
    .snl-input::placeholder { color: #AAAAAA; }\
    .snl-btn   { padding: 11px 22px; border-radius: 999px; border: none; background: #E8452A; color: #fff; font-family: "Poppins", sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: opacity 0.2s; }\
    .snl-btn:hover { opacity: 0.85; }\
    .snl-btn:disabled { opacity: 0.6; cursor: default; }\
    .snl-msg   { font-family: "Poppins", sans-serif; font-size: 12px; margin-top: 8px; min-height: 16px; color: #2B2B2B; }\
    @media (max-width: 768px) {\
      .sn-links { display: none !important; }\
      .sn-hamburger { display: flex !important; }\
      .sn-inner { padding: 0 20px; }\
      .sf-inner { padding: 0 20px; }\
      .snl-inner { grid-template-columns: 1fr; padding: 32px 20px; gap: 20px; }\
      .snl-form  { flex-direction: column; align-items: flex-start; }\
      .snl-input { width: 100%; }\
      .snl-btn   { width: 100%; }\
    }\
  ';

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ── BUILD + INJECT NAVBAR ────────────────────────────────── */
  var linksHtml = NAV_ITEMS.map(function (item) {
    var isActive = item.key && item.key === currentKey;
    return '<a href="' + item.href + '" class="sn-link' + (isActive ? ' active' : '') + '">' + item.label + '</a>';
  }).join('');

  /* Mobile nav links */
   var isHome = (currentKey === 'home');
   var rootPrefix = window.location.pathname.includes('/projects/') ? '../' : '';
   var logoHref = rootPrefix + 'portfolio.html';
   var contactHref = isHome ? '#contact' : rootPrefix + 'portfolio.html#contact';

   var mobileLinksHtml = NAV_ITEMS.map(function (item) {
     var finalHref = item.href;
       if (isHome && item.scrollId) {
         finalHref = '#' + item.scrollId;
       } else if (item.key === 'home') {
         finalHref = window.location.pathname.includes('/projects/') ? '../' + item.href : item.href;
       }
       return '<a href="' + finalHref + '" class="sn-mobile-link">' + item.label + '</a>';
   }).join('');

  var navbar = document.createElement('div');
  navbar.id = 'shared-navbar';
  navbar.innerHTML =
    '<div class="sn-inner">' +
      '<a href="' + logoHref + '" class="sn-logo"><img src="' + rootPrefix + 'favicon.svg" alt="Bonnie Xu" style="height:32px;width:auto;display:block;" /></a>' +
      '<div class="sn-links">' +
        linksHtml +
        '<a href="' + contactHref + '" class="sn-cta">Work with me \u2197\uFE0E</a>' +
      '</div>' +
      '<button class="sn-hamburger" id="sn-hamburger" aria-label="Menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</div>';
  document.body.insertBefore(navbar, document.body.firstChild);

  /* Mobile menu drawer */
  var mobileMenu = document.createElement('div');
  mobileMenu.className = 'sn-mobile-menu';
  mobileMenu.id = 'sn-mobile-menu';
  mobileMenu.innerHTML = mobileLinksHtml +
    '<a href="' + contactHref + '" class="sn-mobile-cta">Work with me \u2197\uFE0E</a>';
  document.body.insertBefore(mobileMenu, navbar.nextSibling);

  /* Toggle handler */
  document.getElementById('sn-hamburger').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('sn-mobile-menu').classList.toggle('open');
  });

  /* ── READING PROGRESS BAR ────────────────────────────────── */
  var progressBar = document.createElement('div');
  progressBar.id = 'sn-progress';
  document.body.insertBefore(progressBar, document.body.firstChild);

  /* ── PUSH BODY DOWN FOR FIXED NAV ─────────────────────────── */
  if (!document.body.style.paddingTop) {
    document.body.style.paddingTop = '72px';
  }

  /* ── SCROLL-HIDE NAV + PROGRESS BAR ─────────────────────── */
  (function () {
    var nav = document.getElementById('shared-navbar');
    var progress = document.getElementById('sn-progress');
    var lastY = window.scrollY;
    var ticking = false;
    var THRESHOLD = 8; // px — ignore micro-scrolls

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var delta = y - lastY;

        // Show / hide navbar based on scroll direction
        if (delta > THRESHOLD && y > 120) {
          nav.classList.add('nav-hidden');
        } else if (delta < -THRESHOLD) {
          nav.classList.remove('nav-hidden');
        }

        // Shadow when scrolled past hero area
        if (y > 10) {
          nav.classList.add('nav-shadow');
        } else {
          nav.classList.remove('nav-shadow');
        }

        // Reading progress bar
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        if (docH > 0) {
          progress.style.width = Math.min(100, (y / docH) * 100) + '%';
        }

        lastY = y;
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ── BUILD + INJECT FOOTER ────────────────────────────────── */
  var SOCIAL = [
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/bonniexu61' },
    { label: 'Instagram', href: 'https://www.instagram.com/designer_bonniexu/' }
  ];
  var socialHtml = SOCIAL.map(function (s) {
    return '<a href="' + s.href + '" class="sf-link" target="_blank" rel="noopener noreferrer">' + s.label + ' \u2197\uFE0E</a>';
  }).join('');

  /* ── BUILD + INJECT NEWSLETTER BANNER ────────────────────── */
  var nlBanner = document.createElement('div');
  nlBanner.id = 'shared-nl-banner';
  nlBanner.innerHTML =
    '<div class="snl-inner">' +
      '<div>' +
        '<p style="font-family:\'Poppins\',sans-serif;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#808080;margin-bottom:8px;">Stay in the loop</p>' +
        '<p style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:700;font-size:20px;letter-spacing:-0.5px;color:#2B2B2B;margin-bottom:4px;">New posts on design, AI, and the thinking behind the work.</p>' +
        '<p style="font-family:\'Poppins\',sans-serif;font-size:13px;font-weight:300;color:#808080;">Get notified when I publish. No spam, no noise.</p>' +
      '</div>' +
      '<div>' +
        '<form id="snl-form" class="snl-form">' +
          '<input id="snl-email" type="email" placeholder="your@email.com" required class="snl-input" />' +
          '<button type="submit" id="snl-btn" class="snl-btn">Notify me \u2192</button>' +
        '</form>' +
        '<p id="snl-msg" class="snl-msg"></p>' +
      '</div>' +
    '</div>';
  /* Inject before #contact if it exists, otherwise before the footer anchor */
  var contactEl = document.getElementById('contact');
  if (contactEl) {
    document.body.insertBefore(nlBanner, contactEl);
  } else {
    document.body.appendChild(nlBanner);
  }

  /* Newsletter form handler */
  (function () {
    var form = document.getElementById('snl-form');
    var btn  = document.getElementById('snl-btn');
    var msg  = document.getElementById('snl-msg');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('snl-email').value.trim();
      btn.disabled = true; btn.textContent = 'Sending...';
      msg.textContent = '';
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: 'Footer' })
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data.success) {
          form.style.display = 'none';
          msg.style.color = '#2B2B2B';
          msg.textContent = 'You\'re in! I\'ll let you know when the next post drops.';
        } else {
          msg.style.color = '#E8452A';
          msg.textContent = data.error || 'Something went wrong. Please try again.';
          btn.disabled = false; btn.textContent = 'Notify me \u2192';
        }
      }).catch(function () {
        msg.style.color = '#E8452A';
        msg.textContent = 'Connection error. Please try again.';
        btn.disabled = false; btn.textContent = 'Notify me \u2192';
      });
    });
  })();

  /* ── BUILD + INJECT FOOTER ────────────────────────────────── */
  var footer = document.createElement('footer');
  footer.id = 'shared-footer';
  footer.innerHTML =
    '<div class="sf-inner">' +
      '<div class="sf-top">' +
        '<div>' +
          '<div class="sf-brand-name">Bonnie Xu</div>' +
          '<div class="sf-brand-title">Product &amp; UX Designer</div>' +
        '</div>' +
        '<div class="sf-sections">' +
          '<div>' +
            '<div class="sf-section-title">Contact Me</div>' +
            '<a href="mailto:bonniexu61@gmail.com" class="sf-link">bonniexu61@gmail.com</a>' +
          '</div>' +
          '<div>' +
            '<div class="sf-section-title">Social</div>' +
            socialHtml +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="sf-bottom">' +
        '<span class="sf-copy">\u00A9 2026 Bonnie Xu. All rights reserved.</span>' +
        '<span class="sf-copy">Designed &amp; built with \u2764\uFE0F</span>' +
      '</div>' +
    '</div>';
  document.body.appendChild(footer);

})();
