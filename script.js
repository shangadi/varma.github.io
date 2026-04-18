/* ================================================
   Shanmukha G — Portfolio
   Minimal JS: scroll reveals, live clock, journal filter
   ================================================ */

(() => {
  'use strict';

  // -------- Scroll-triggered reveals --------
  const revealTargets = document.querySelectorAll(
    '.section-head, .about-grid, .tl-item, .stack-card, .certs, .contact-body, .journal-filter, .jrn-card'
  );

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('visible'));
  }

  // -------- Live clock (Central Time) --------
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    const tick = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      clockEl.textContent = `${time} CT / Overland Park`;
    };
    tick();
    setInterval(tick, 1000 * 30);
  }

  // -------- Smooth anchor offset for sticky nav --------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 40;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // -------- Theme toggle (light / dark) --------
  // The <head> inline script has already set data-theme based on
  // stored preference or OS setting. This handler lets users override.
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const root = document.documentElement;

    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (next === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });

    // Keep in sync with OS preference changes — only if user hasn't
    // manually overridden it (no stored value).
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = (e) => {
        let stored;
        try { stored = localStorage.getItem('theme'); } catch (err) {}
        if (!stored) {
          if (e.matches) root.setAttribute('data-theme', 'dark');
          else root.removeAttribute('data-theme');
        }
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange); // older Safari
    }
  }

  // -------- Journal category filter --------
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.jrn-card');
  const empty = document.querySelector('.journal-empty');

  if (chips.length && cards.length) {
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;

        // Toggle active state
        chips.forEach((c) => {
          c.classList.toggle('is-active', c === chip);
          c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
        });

        // Filter cards
        let shown = 0;
        cards.forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !match);
          if (match) shown++;
        });

        // Toggle empty state
        if (empty) empty.hidden = shown > 0;
      });
    });
  }
})();