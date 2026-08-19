/* ============================================
   Eleanor Hope Foundation — Site Scripts
   ============================================ */

(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');
  var backdrop = document.getElementById('nav-backdrop');

  function openNav() {
    nav.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    var isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', toggleNav);
    if (backdrop) backdrop.addEventListener('click', closeNav);

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        hamburger.focus();
      }
    });

    // Close mobile menu automatically if viewport grows past breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && nav.classList.contains('open')) {
        closeNav();
      }
    });
  }

  /* ---------- Impact stats count-up ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  if (statNumbers.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      statNumbers.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      statNumbers.forEach(animateCount);
    }
  }

  /* ---------- Scroll reveal (about, programs, gallery, CTA) ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('in-view');
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var galleryTriggers = document.querySelectorAll('.gallery-media');
  var lastFocusedEl = null;

  function openLightbox(trigger) {
    var img = trigger.querySelector('img');
    var card = trigger.closest('.gallery-card');
    var caption = card ? card.querySelector('figcaption') : null;

    if (!img) return;

    lastFocusedEl = trigger;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = caption ? caption.textContent : '';

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';

    if (lastFocusedEl) {
      lastFocusedEl.focus();
    }
  }

  if (lightbox && galleryTriggers.length) {
    galleryTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        openLightbox(trigger);
      });
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(trigger);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }
})();

/* ============================================
   Eleanor Hope Foundation — Site Scripts
   ============================================ */

(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');
  var backdrop = document.getElementById('nav-backdrop');

  function openNav() {
    nav.classList.add('open');
    backdrop.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('open');
    backdrop.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    var isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (hamburger && nav && backdrop) {
    hamburger.addEventListener('click', toggleNav);
    backdrop.addEventListener('click', closeNav);

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        hamburger.focus();
      }
    });

    // Close the mobile menu automatically if the viewport grows past the breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && nav.classList.contains('open')) {
        closeNav();
      }
    });
  }

  /* ---------- Impact stats count-up ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }

    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  if (statNumbers.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      statNumbers.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      statNumbers.forEach(animateCount);
    }
  }

  /* ---------- Scroll reveal (about, programs, gallery, CTA) ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // No motion preference (or no observer support): show everything immediately.
      revealEls.forEach(function (el) {
        el.classList.add('in-view');
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var galleryTriggers = document.querySelectorAll('.gallery-media');
  var lastFocusedEl = null;

  function openLightbox(trigger) {
    var img = trigger.querySelector('img');
    var card = trigger.closest('.gallery-card');
    var caption = card ? card.querySelector('figcaption') : null;

    if (!img) return;

    lastFocusedEl = trigger;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = caption ? caption.textContent : '';

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';

    if (lastFocusedEl) {
      lastFocusedEl.focus();
    }
  }

  if (lightbox && galleryTriggers.length) {
    galleryTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        openLightbox(trigger);
      });
      // Keyboard support: Enter / Space activates the focused gallery item
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(trigger);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Click on the dark backdrop (but not the image/figure itself) closes it
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  /* ---------- Donate page: copy bank details ---------- */
  var copyButtons = document.querySelectorAll('.bank-copy-btn');

  if (copyButtons.length) {
    copyButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var row = button.closest('.bank-info-row');
        var valueEl = row ? row.querySelector('[data-copy-value]') : null;
        if (!valueEl) return;

        var text = valueEl.textContent.trim();
        var showCopied = function () {
          button.classList.add('copied');
          button.setAttribute('aria-label', 'Copied to clipboard');
          window.setTimeout(function () {
            button.classList.remove('copied');
            button.setAttribute('aria-label', 'Copy ' + (row.querySelector('.bank-info-label') ? row.querySelector('.bank-info-label').textContent.toLowerCase() : 'value'));
          }, 1600);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(showCopied).catch(function () {
            /* Clipboard permissions denied or unavailable; fail silently */
          });
        } else {
          // Fallback for browsers without the async Clipboard API
          var temp = document.createElement('textarea');
          temp.value = text;
          temp.setAttribute('readonly', '');
          temp.style.position = 'absolute';
          temp.style.left = '-9999px';
          document.body.appendChild(temp);
          temp.select();
          try {
            document.execCommand('copy');
            showCopied();
          } catch (err) {
            /* Copy not supported; fail silently */
          }
          document.body.removeChild(temp);
        }
      });
    });
  }
})();