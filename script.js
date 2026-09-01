/* =====================================================================
   ARCWAY TEMPLATE — SCRIPT
   No build step, no dependencies. Each block below is independent,
   so you can delete any feature you don't need without breaking others.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------
     1. Mobile nav toggle
     ------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after tapping a link
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------------------------------------------------------
     2. Header shadow/background once the page has scrolled
     ------------------------------------------------------------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------------------------------------------------------------
     3. FAQ accordion — one open at a time
     ------------------------------------------------------------- */
  var faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;

      // Close any other open item so only one is expanded at a time.
      // Remove this loop if you'd rather allow several open together.
      faqButtons.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.classList.remove('is-open');
        }
      });

      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      answer.classList.toggle('is-open', !expanded);
    });
  });

  /* -------------------------------------------------------------
     4. Count-up numbers (hero stats + metrics band)
     Add data-count="120" data-suffix="+" data-decimals="1" to any
     element and it will animate up once it scrolls into view.
     ------------------------------------------------------------- */
  var countEls = document.querySelectorAll('[data-count]');

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1100;
    var start = null;

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && countEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    countEls.forEach(function (el) { observer.observe(el); });
  } else {
    // No IntersectionObserver support — just show final values
    countEls.forEach(function (el) {
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = parseFloat(el.getAttribute('data-count')).toFixed(decimals) + (el.getAttribute('data-suffix') || '');
    });
  }

  /* -------------------------------------------------------------
     5. Newsletter form — demo only, no backend wired up.
     Replace this handler with a real fetch() call to your
     email provider (Mailchimp, Buttondown, your own API, etc).
     ------------------------------------------------------------- */
  var newsletterForm = document.getElementById('newsletterForm');
  var newsletterStatus = document.getElementById('newsletterStatus');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      newsletterStatus.textContent = 'Thanks — you\u2019re on the list.';
      newsletterForm.reset();
    });
  }

  /* -------------------------------------------------------------
     6. Footer year
     ------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
