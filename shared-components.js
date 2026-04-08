/**
 * shared-components.js
 * ─────────────────────────────────────────────────────────
 * Single source of truth for Navbar + Footer (+ helpers).
 * Pure React.createElement — no JSX, no Babel needed.
 * Load AFTER react / react-dom CDN scripts, BEFORE any
 * page-specific <script type="text/babel"> block.
 *
 * Exports to window:
 *   window.Navbar        — smart navbar (auto-detects active page)
 *   window.Footer        — shared footer
 *   window.Avatar        — avatar helper component
 *   window.Tag           — pill tag helper component
 *   window.useScrollSpy  — intersection-observer hook
 *   window.NAV_ITEMS     — nav config array (read-only)
 * ─────────────────────────────────────────────────────────
 */
(function () {
  const h = React.createElement;
  const { useState, useEffect, Fragment } = React;

  /* ── INJECT SHARED CSS ───────────────────────────────────
   * Makes this file self-contained — no page needs to pre-
   * define .nav-inner, .mobile-menu, .page-wrap, etc.
   * ──────────────────────────────────────────────────────── */
  (function injectCSS() {
    if (document.getElementById('shared-components-css')) return; // already injected
    const style = document.createElement('style');
    style.id = 'shared-components-css';
    style.textContent = [
      /* nav bar inner wrapper */
      '.nav-inner{max-width:1440px;margin:0 auto;width:100%;display:flex;align-items:center;justify-content:space-between;height:100%;padding:0 80px;}',
      /* footer / section inner wrapper */
      '.page-wrap{max-width:1440px;margin:0 auto;width:100%;}',
      /* mobile drawer — hidden by default, slides in when .open */
      '.mobile-menu{transform:translateX(100%);transition:transform 0.3s ease;pointer-events:none;}',
      '.mobile-menu.open{transform:translateX(0);pointer-events:auto;}',
      /* hamburger hidden on desktop */
      '.hamburger{display:none!important;}',
      /* newsletter banner */
      '.nl-banner{background:#FBFAF9;border-top:1px solid #EDEDEB;border-bottom:1px solid #EDEDEB;}',
      '.nl-inner{max-width:1440px;margin:0 auto;padding:36px 80px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px;}',
      '.nl-form{display:flex;gap:10px;align-items:center;}',
      '.nl-input{flex:1;padding:11px 18px;border-radius:999px;border:1px solid #DDDBD9;background:#fff;font-family:\'Poppins\',sans-serif;font-size:13px;color:#2B2B2B;outline:none;min-width:0;}',
      '.nl-btn{padding:11px 22px;border-radius:999px;border:none;background:#E8452A;color:#fff;font-family:\'Poppins\',sans-serif;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;flex-shrink:0;}',
      '.nl-btn:disabled{opacity:0.6;}',
      '.nl-msg{font-family:\'Poppins\',sans-serif;font-size:12px;margin-top:8px;min-height:16px;}',
      /* responsive */
      '@media(max-width:768px){',
        '.nav-inner .links{display:none!important;}',
        '.hamburger{display:block!important;}',
        '.nav-inner{padding:0 20px!important;}',
        'footer .page-wrap{padding:0 20px!important;}',
        '.nl-inner{grid-template-columns:1fr;padding:28px 20px;gap:20px;}',
        '.nl-form{flex-direction:column;align-items:flex-start;}',
        '.nl-input,.nl-btn{width:100%;}',
        '.nl-react-inner{grid-template-columns:1fr!important;padding:28px 20px!important;gap:20px!important;}',
      '}',
    ].join('');
    document.head.appendChild(style);
  })();

  /* ── NAV CONFIG ─────────────────────────────────────────
   * scrollId  = section ID to smooth-scroll to (homepage only)
   * href      = fallback link used on all other pages
   * pageKey   = string used to detect which page is "active"
   * ──────────────────────────────────────────────────────── */
  window.NAV_ITEMS = [
    { label: 'Home',      pageKey: 'home',      scrollId: 'hero',    href: 'portfolio.html' },
    { label: 'About',     pageKey: 'about',                          href: 'about.html' },
    { label: 'Projects',  pageKey: 'portfolio',                      href: 'projects.html' },
    { label: 'Blog',      pageKey: 'blog',                           href: 'blog.html' },
  ];

  /* ── PAGE DETECTION ─────────────────────────────────────
   * Reads window.location to know which nav item to highlight.
   * ──────────────────────────────────────────────────────── */
  function getPageKey() {
    const p = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (!p || p === 'portfolio.html' || p === 'index.html') return 'home';
    if (p === 'about.html')    return 'about';
    if (p === 'projects.html') return 'portfolio';
    if (p === 'blog.html')     return 'blog';
    
    // Check if we are in a sub-page
    if (p.startsWith('blog-') || window.location.pathname.includes('/blog/')) return 'blog';
    if (window.location.pathname.includes('/projects/')) return 'portfolio';

    return 'home';
  }

  function getContactHref() {
    return '#contact';
  }

  function navigateToContact(e, contactHref, scrollTo) {
    if (contactHref === '#contact') {
      e.preventDefault();
      scrollTo('contact');
      return;
    }
    e.preventDefault();
    window.location.assign(contactHref);
  }

  /* ── SCROLL SPY ─────────────────────────────────────────
   * Returns the ID of the section currently in the viewport.
   * ──────────────────────────────────────────────────────── */
  window.useScrollSpy = function useScrollSpy(ids) {
    const [active, setActive] = useState('');
    useEffect(() => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
        { rootMargin: '-40% 0px -55% 0px' }
      );
      ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
      return () => obs.disconnect();
    }, []);
    return active;
  };

  /* ── AVATAR ─────────────────────────────────────────────
   * Shows a photo if available, otherwise a coloured initial.
   * ──────────────────────────────────────────────────────── */
  window.Avatar = function Avatar({ initials, color, size = 40, photo }) {
    const [err, setErr] = useState(false);
    if (photo && !err) {
      return h('img', {
        src: photo, alt: initials, className: 'avatar-photo',
        style: { width: size, height: size },
        onError: () => setErr(true),
      });
    }
    return h('div', {
      style: {
        width: size, height: size, borderRadius: '50%', background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }
    }, h('span', {
      style: { color: '#fff', fontSize: size * 0.35, fontWeight: 600, fontFamily: "'Poppins', sans-serif" }
    }, initials));
  };

  /* ── TAG ────────────────────────────────────────────────
   * Small pill label used on work cards.
   * ──────────────────────────────────────────────────────── */
  window.Tag = function Tag({ label }) {
    return h('span', {
      style: {
        display: 'inline-block', padding: '4px 12px', borderRadius: 100,
        border: '1px solid #AAAAAA', fontSize: 11, color: '#555',
        fontFamily: "'Poppins', sans-serif", fontWeight: 500, whiteSpace: 'nowrap',
      }
    }, label);
  };

  /* ── NAVBAR ─────────────────────────────────────────────
   * Fixed top bar with logo, nav links, CTA, and mobile menu.
   * Automatically highlights the current page link.
   * On the homepage, Contact and Home use smooth-scroll.
   * On all other pages, every item is a standard <a> link.
   * Features: scroll-hide on down, reveal on up, shadow, progress bar.
   * ──────────────────────────────────────────────────────── */
  window.Navbar = function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [navShadow, setNavShadow] = useState(false);
    const [progress, setProgress] = useState(0);
    const currentPage = getPageKey();
    const isHome = currentPage === 'home';
    const contactHref = getContactHref(currentPage);

    // Scroll-hide + progress bar effect
    useEffect(() => {
      let lastY = window.scrollY;
      let ticking = false;
      const THRESHOLD = 8;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const delta = y - lastY;
          if (delta > THRESHOLD && y > 120) setNavHidden(true);
          else if (delta < -THRESHOLD) setNavHidden(false);
          setNavShadow(y > 10);
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          if (docH > 0) setProgress(Math.min(100, (y / docH) * 100));
          lastY = y;
          ticking = false;
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
      if (window.location.hash !== '#contact') return;
      let attempts = 0;
      const maxAttempts = 20;

      function scrollToHashTarget() {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        if (attempts < maxAttempts) {
          attempts += 1;
          window.requestAnimationFrame(scrollToHashTarget);
        }
      }

      scrollToHashTarget();
    }, []);

    const scrollTo = id => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    };

    // "Contact" never shows as highlighted — it's a CTA
    const isActive = item => item.pageKey !== 'contact' && item.pageKey === currentPage;

    const getHref = item => {
      if (isHome && item.scrollId) return '#' + item.scrollId;
      // If we are in a subfolder (like /projects/), we need to prepend ../ to the root links
      const isSubfolder = window.location.pathname.includes('/projects/');
      return isSubfolder ? '../' + item.href : item.href;
    };

    const handleClick = (e, item) => {
      if (isHome && item.scrollId) { e.preventDefault(); scrollTo(item.scrollId); }
      else setMobileOpen(false);
    };

    const linkStyle = item => ({
      fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500,
      color: isActive(item) ? '#2B2B2B' : '#808080',
      letterSpacing: '-0.28px', padding: '4px 0', textDecoration: 'none',
      display: 'inline-block', cursor: 'pointer',
      borderBottom: isActive(item) ? '1px solid #2B2B2B' : '1px solid transparent',
    });

    const mobileItemStyle = {
      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
      fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 500,
      color: '#2B2B2B', padding: '12px 0', letterSpacing: '-0.4px',
      borderBottom: '1px solid #F4F2F1', display: 'block', textDecoration: 'none',
    };

    return h(Fragment, null,

      /* reading progress bar */
      h('div', {
        style: {
          position: 'fixed', top: 0, left: 0, height: 2, zIndex: 101,
          background: '#E8452A', width: progress + '%',
          pointerEvents: 'none', transition: 'none',
        }
      }),

      /* desktop nav bar */
      h('nav', {
        style: {
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(244,242,241,0.92)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(170,170,170,0.2)',
          height: 72, display: 'flex', alignItems: 'center',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
          transform: navHidden ? 'translateY(-100%)' : 'translateY(0)',
          boxShadow: navShadow ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        }
      },
        h('div', { className: 'nav-inner' },
          h('a', {
            href: window.location.pathname.includes('/projects/') ? '../portfolio.html' : 'portfolio.html',
            style: { textDecoration: 'none', display: 'block', lineHeight: 0 }
          },
            h('img', {
              src: window.location.pathname.includes('/projects/') ? '../favicon.svg' : 'favicon.svg',
              alt: 'Bonnie Xu',
              style: { height: 32, width: 'auto', display: 'block' }
            })
          ),

          h('div', { className: 'links', style: { display: 'flex', gap: 40, alignItems: 'center' } },
            ...window.NAV_ITEMS.map(item =>
              h('a', {
                key: item.label,
                href: getHref(item),
                onClick: (e) => {
                  if (isHome && item.scrollId) {
                    e.preventDefault();
                    scrollTo(item.scrollId);
                  } else if (!isHome) {
                  // Ensure explicit navigation on React pages when clicking links from another page
                  e.preventDefault();
                  const isSubfolder = window.location.pathname.includes('/projects/');
                  const targetUrl = isSubfolder ? '../' + item.href : item.href;
                  window.location.href = targetUrl;
                }
                },
                style: linkStyle(item),
              }, item.label)
            ),
            h('a', {
              href: contactHref,
              onClick: e => navigateToContact(e, contactHref, scrollTo),
              style: {
                background: '#2B2B2B', color: '#fff', padding: '10px 20px',
                borderRadius: 999, fontFamily: "'Poppins', sans-serif",
                fontSize: 13, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap',
              }
            }, 'Work with me \u2197\uFE0E')
          ),

          /* hamburger icon */
          h('button', {
            className: 'hamburger',
            onClick: () => setMobileOpen(o => !o),
            style: { display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }
          },
            h('div', { style: { width: 22, height: 2, background: '#2B2B2B', marginBottom: 5, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none' } }),
            h('div', { style: { width: 22, height: 2, background: '#2B2B2B', marginBottom: 5, opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s' } }),
            h('div', { style: { width: 22, height: 2, background: '#2B2B2B', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' } })
          )
        )
      ),

      /* mobile drawer */
      h('div', {
        className: 'mobile-menu' + (mobileOpen ? ' open' : ''),
        style: {
          position: 'fixed', top: 72, right: 0, bottom: 0, width: '80%', maxWidth: 320,
          background: '#FBFAF9', zIndex: 99, padding: 32,
          boxShadow: '-8px 0 32px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', gap: 8,
        }
      },
        ...window.NAV_ITEMS.map(item =>
            h('a', {
              key: item.label,
              href: getHref(item), 
              style: mobileItemStyle,
              onClick: (e) => {
                if (isHome && item.scrollId) {
                  e.preventDefault();
                  scrollTo(item.scrollId);
                } else if (!isHome) {
                  // Ensure explicit navigation on React pages when clicking Home from another page
                  e.preventDefault();
                  const isSubfolder = window.location.pathname.includes('/projects/');
                  const targetUrl = isSubfolder ? '../' + item.href : item.href;
                  window.location.href = targetUrl;
                }
                setMobileOpen(false);
              }
            }, item.label)
          ),
        h('a', {
          href: contactHref,
          onClick: e => navigateToContact(e, contactHref, scrollTo),
          style: {
            marginTop: 24, background: '#2B2B2B', color: '#fff', padding: '14px 24px',
            borderRadius: 100, fontFamily: "'Poppins', sans-serif", fontSize: 15,
            fontWeight: 500, textDecoration: 'none', display: 'block', textAlign: 'center',
          }
        }, 'Work with me \u2197\uFE0E')
      )
    );
  };

  /* ── NEWSLETTER BANNER ──────────────────────────────────
   * Two-column slim banner: text left, form right.
   * Renders before the contact/footer section on every page.
   * ──────────────────────────────────────────────────────── */
  window.NewsletterBanner = function NewsletterBanner() {
    const [email,   setEmail]   = useState('');
    const [status,  setStatus]  = useState('idle'); // idle | sending | success | error
    const [message, setMessage] = useState('');

    const bodyFont    = "'Poppins', sans-serif";
    const displayFont = "'Bricolage Grotesque', sans-serif";

    const handleSubmit = function(e) {
      e.preventDefault();
      setStatus('sending');
      setMessage('');
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: 'Footer' }),
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data.success) {
          setStatus('success');
          setMessage("You're in! I'll let you know when the next post drops.");
        } else {
          setStatus('error');
          setMessage(data.error || 'Something went wrong. Please try again.');
        }
      }).catch(function() {
        setStatus('error');
        setMessage('Connection error. Please try again.');
      });
    };

    return h('div', {
      style: {
        background: '#FBFAF9',
        borderTop: '1px solid #EDEDEB',
        borderBottom: '1px solid #EDEDEB',
      }
    },
      h('div', {
        style: {
          maxWidth: 1440, margin: '0 auto',
          padding: 'clamp(28px,4vw,36px) 80px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          alignItems: 'center', gap: 40,
        },
        className: 'nl-react-inner',
      },
        /* Left: text */
        h('div', null,
          h('p', { style: { fontFamily: bodyFont, fontSize: 12, fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#808080', marginBottom: 8 } }, 'Stay in the loop'),
          h('p', { style: { fontFamily: displayFont, fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#2B2B2B', marginBottom: 4 } }, 'New posts on design, AI, and the thinking behind the work.'),
          h('p', { style: { fontFamily: bodyFont, fontSize: 13, fontWeight: 300, color: '#808080' } }, 'Get notified when I publish. No spam, no noise.')
        ),
        /* Right: form or success */
        status === 'success'
          ? h('p', { style: { fontFamily: bodyFont, fontSize: 14, color: '#2B2B2B' } }, message)
          : h('div', null,
              h('form', {
                onSubmit: handleSubmit,
                style: { display: 'flex', gap: 10, alignItems: 'center' },
              },
                h('input', {
                  type: 'email', placeholder: 'your@email.com', required: true,
                  value: email, onChange: function(e) { setEmail(e.target.value); },
                  style: {
                    flex: 1, padding: '11px 18px', borderRadius: 999,
                    border: '1px solid #DDDBD9', background: '#fff',
                    fontFamily: bodyFont, fontSize: 13, color: '#2B2B2B',
                    outline: 'none', minWidth: 0,
                  },
                }),
                h('button', {
                  type: 'submit', disabled: status === 'sending',
                  style: {
                    padding: '11px 22px', borderRadius: 999, border: 'none',
                    background: '#E8452A', color: '#fff', fontFamily: bodyFont,
                    fontSize: 13, fontWeight: 500, cursor: status === 'sending' ? 'default' : 'pointer',
                    whiteSpace: 'nowrap', flexShrink: 0,
                    opacity: status === 'sending' ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                  },
                }, status === 'sending' ? 'Sending...' : 'Notify me \u2192')
              ),
              status === 'error' && h('p', { style: { fontFamily: bodyFont, fontSize: 12, color: '#E8452A', marginTop: 8 } }, message)
            )
      )
    );
  };

  /* ── FOOTER ─────────────────────────────────────────────
   * Dark footer with contact info, social links, copyright.
   * ──────────────────────────────────────────────────────── */
  window.ContactSection = function ContactSection() {
    const bodyFont = "'Poppins', sans-serif";
    const displayFont = "'Bricolage Grotesque', sans-serif";
    const inputStyle = {
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid rgba(255,255,255,0.25)',
      color: '#fff',
      fontFamily: bodyFont,
      fontSize: 14,
      padding: '12px 0',
      width: '100%',
    };

    return h('section', { id: 'contact', style: { background: '#2B2B2B' } },
      h('div', { className: 'page-wrap', style: { paddingTop: 80, paddingBottom: 80, paddingLeft: 80, paddingRight: 80 } },
        h('div', { className: 'contact-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80 } },
          h('div', { className: 'fade-up' },
            h('h2', {
              style: {
                fontFamily: displayFont, fontWeight: 700, fontSize: 'clamp(42px,6vw,72px)',
                letterSpacing: '-3px', lineHeight: 1.0, color: '#fff',
              }
            }, 'Let\'s be', h('br'), 'creative', h('br'), 'together.')
          ),
          h('div', { className: 'fade-up' },
            h('form', {
              action: 'https://api.web3forms.com/submit',
              method: 'POST',
              style: { display: 'flex', flexDirection: 'column', gap: 20 },
            },
              h('input', { type: 'hidden', name: 'access_key', value: 'c706f602-bfd6-4810-aa0f-da098552839d' }),
              h('label', { htmlFor: 'shared-contact-name', style: { position: 'absolute', left: -9999 } }, 'Your name'),
              h('input', { id: 'shared-contact-name', type: 'text', name: 'name', placeholder: 'Your name', required: true, autoComplete: 'name', style: inputStyle, className: 'contact-input' }),
              h('label', { htmlFor: 'shared-contact-email', style: { position: 'absolute', left: -9999 } }, 'Your email'),
              h('input', { id: 'shared-contact-email', type: 'email', name: 'email', placeholder: 'Your email', required: true, autoComplete: 'email', style: inputStyle, className: 'contact-input' }),
              h('label', { htmlFor: 'shared-contact-message', style: { position: 'absolute', left: -9999 } }, 'Message'),
              h('textarea', { id: 'shared-contact-message', name: 'message', placeholder: 'Message', rows: 5, required: true, style: { ...inputStyle, resize: 'none' }, className: 'contact-input' }),
              h('button', {
                type: 'submit',
                style: {
                  background: '#fff', color: '#2B2B2B', fontFamily: bodyFont, fontSize: 14, fontWeight: 500,
                  padding: '14px', borderRadius: 999, border: 'none', cursor: 'pointer', width: '100%', marginTop: 8,
                }
              }, 'Submit ↗︎︎')
            )
          )
        )
      )
    );
  };

  window.Footer = function Footer() {
    const SOCIAL = [
      { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/bonniexu61' },
      { label: 'Instagram', href: 'https://www.instagram.com/designer_bonniexu/' }
    ];

    const bodyFont    = "'Poppins', sans-serif";
    const displayFont = "'Bricolage Grotesque', sans-serif";
    const mutedLink   = { display: 'block', fontFamily: bodyFont, fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: 6 };

    const shouldRenderContact = window.location.pathname.includes('/projects/');

    return h(Fragment, null,
        shouldRenderContact && h(window.ContactSection),
        h('footer', { style: { background: '#2B2B2B', color: '#fff', padding: '40px 0 24px 0' } },
        h('div', { className: 'page-wrap', style: { padding: '0 80px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap', marginBottom: 40 } },
            h('div', null,
              h('div', { style: { fontFamily: displayFont, fontWeight: 700, fontSize: 28, letterSpacing: '-1px', marginBottom: 8 } }, 'Bonnie Xu'),
              h('p', { style: { fontFamily: bodyFont, fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)' } }, 'Product & UX Designer')
            ),
            h('div', { style: { display: 'flex', gap: 64, flexWrap: 'wrap' } },
              h('div', null,
                h('p', { style: { fontFamily: bodyFont, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 } }, 'Contact Me'),
                h('a', { href: 'mailto:bonniexu61@gmail.com', style: mutedLink }, 'bonniexu61@gmail.com')
              ),
              h('div', null,
                h('p', { style: { fontFamily: bodyFont, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 } }, 'Social'),
                ...SOCIAL.map(s =>
                  h('a', { key: s.label, href: s.href, target: '_blank', rel: 'noopener noreferrer', style: mutedLink }, s.label + ' \u2197\uFE0E')
                )
              )
            )
          )
          ,
          h('div', { style: { borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 } },
            h('p', { style: { fontFamily: bodyFont, fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.4)' } }, '\u00A9 2026 Bonnie Xu. All rights reserved.'),
            h('p', { style: { fontFamily: bodyFont, fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.4)' } }, 'Designed & built with \u2764\uFE0F')
          )
        )
      )
    );
  };

})();
