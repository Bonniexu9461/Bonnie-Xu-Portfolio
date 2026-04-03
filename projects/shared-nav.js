/**
 * projects/shared-nav.js
 * ─────────────────────────────────────────────────────────────
 * Vanilla JS (no React, no Babel) navbar + footer injector for
 * project case-study pages inside the projects/ subfolder.
 *
 * Usage: add ONE line just before </body> on any project page:
 *   <script src="shared-nav.js"></script>
 *
 * What it does:
 *   1. Injects <div id="shared-navbar"> at the top of <body>
 *   2. "Portfolio" link is always active (we're in a project page)
 *   3. Injects <footer id="shared-footer"> at the bottom of <body>
 * ─────────────────────────────────────────────────────────────
 */
(function () {

  /* ── NAV ITEMS ────────────────────────────────────────────── */
  var NAV_ITEMS = [
    { label: 'Home',      href: '../portfolio.html',         active: false },
    { label: 'About',     href: '../about.html',             active: false },
    { label: 'Projects',  href: '../projects.html',          active: true  },
    { label: 'Blog',      href: '../blog.html',              active: false },
  ];

  /* ── STYLES ───────────────────────────────────────────────── */
  var CSS = '\
    #shared-navbar {\
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;\
      background: rgba(244,242,241,0.92);\
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);\
      border-bottom: 1px solid rgba(170,170,170,0.2);\
      height: 72px; display: flex; align-items: center;\
    }\
    .sn-inner {\
      max-width: 1440px; margin: 0 auto; width: 100%;\
      display: flex; align-items: center; justify-content: space-between;\
      height: 100%; padding: 0 80px;\
    }\
    .sn-logo {\
      font-family: "Bricolage Grotesque", sans-serif;\
      font-weight: 700; font-size: 18px; letter-spacing: -0.5px;\
      color: #2B2B2B; text-decoration: none;\
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
    #shared-footer { background: #2B2B2B; color: #fff; padding: 40px 0 24px 0; }\
    .sf-inner { max-width: 1440px; margin: 0 auto; padding: 0 80px; }\
    .sf-cols {\
      display: flex; justify-content: space-between;\
      align-items: flex-start; flex-wrap: wrap; gap: 40px; margin-bottom: 40px;\
    }\
    .sf-brand-name {\
      font-family: "Bricolage Grotesque", sans-serif;\
      font-weight: 700; font-size: 28px; letter-spacing: -1px; margin-bottom: 8px;\
    }\
    .sf-brand-role {\
      font-family: "Poppins", sans-serif;\
      font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5);\
    }\
    .sf-links-group { display: flex; gap: 64px; flex-wrap: wrap; }\
    .sf-col-label {\
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
      border-top: 1px solid rgba(255,255,255,0.1);\
      padding-top: 24px;\
      display: flex; justify-content: space-between;\
      align-items: center; flex-wrap: wrap; gap: 12px;\
    }\
    .sf-copy {\
      font-family: "Poppins", sans-serif; font-size: 12px;\
      font-weight: 300; color: rgba(255,255,255,0.4);\
    }\
    @media (max-width: 768px) {\
      .sn-links { display: none !important; }\
      .sn-hamburger { display: flex !important; }\
      .sn-inner { padding: 0 20px; }\
      .sf-inner { padding: 0 20px; }\
    }\
  ';

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  /* ── BUILD + INJECT NAVBAR ────────────────────────────────── */
    var linksHtml = NAV_ITEMS.map(function (item) {
      var cls = item.active ? 'sn-link active' : 'sn-link';
      var finalHref = window.location.pathname.includes('/projects/') ? '../' + item.href : item.href;
      return '<a href="' + finalHref + '" class="' + cls + '">' + item.label + '</a>';
    }).join('');

    /* Mobile nav links */
    var mobileLinksHtml = NAV_ITEMS.map(function (item) {
      var finalHref = window.location.pathname.includes('/projects/') ? '../' + item.href : item.href;
      return '<a href="' + finalHref + '" class="sn-mobile-link">' + item.label + '</a>';
    }).join('');

  var rootPrefix = window.location.pathname.includes('/projects/') ? '../' : '';
  var logoHref = rootPrefix + 'portfolio.html';
  var contactHref = (typeof isHome !== 'undefined' && isHome) ? '#contact' : rootPrefix + 'portfolio.html#contact';

  var navbar = document.createElement('div');
  navbar.id = 'shared-navbar';
  navbar.innerHTML =
    '<div class="sn-inner">' +
      '<a href="' + logoHref + '" class="sn-logo">Bonnie Xu</a>' +
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

  function bindContactCta(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    el.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.assign(contactHref);
    });
  }

  bindContactCta('.sn-cta');
  bindContactCta('.sn-mobile-cta');

  /* Toggle handler */
  document.getElementById('sn-hamburger').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('sn-mobile-menu').classList.toggle('open');
  });

  /* ── BUILD + INJECT FOOTER ────────────────────────────────── */
  var footer = document.createElement('footer');
  footer.id = 'shared-footer';
  footer.innerHTML =
    '<div class="sf-inner">' +
      '<div class="sf-cols">' +
        '<div>' +
          '<div class="sf-brand-name">Bonnie Xu</div>' +
          '<p class="sf-brand-role">Product &amp; UX Designer</p>' +
        '</div>' +
        '<div class="sf-links-group">' +
          '<div>' +
            '<p class="sf-col-label">Contact Me</p>' +
            '<a href="mailto:bonniexu61@gmail.com" class="sf-link">bonniexu61@gmail.com</a>' +
          '</div>' +
          '<div>' +
            '<p class="sf-col-label">Social</p>' +
            '<a href="https://www.linkedin.com/in/bonniexu61" target="_blank" rel="noopener noreferrer" class="sf-link">LinkedIn \u2197\uFE0E</a>' +
            '<a href="https://www.instagram.com/designer_bonniexu/" target="_blank" rel="noopener noreferrer" class="sf-link">Instagram \u2197\uFE0E</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="sf-bottom">' +
        '<p class="sf-copy">\u00A9 2026 Bonnie Xu. All rights reserved.</p>' +
        '<p class="sf-copy">Designed &amp; built with \u2764\uFE0F</p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(footer);

  /* NOTE: project pages handle their own top padding via <main style={{paddingTop:72}}>
     so we don't set body.style.paddingTop here */

})();
