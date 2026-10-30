// NEXUS.AI — main.js

/* Sticky nav state ------------------------------------------------------- */
const header = document.querySelector('header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Stat counter ----------------------------------------------------------- */
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target; // ensure exact final value
  };
  requestAnimationFrame(update);
}

const statsSection = document.querySelector('#stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-count]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.count, 10));
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

/* Scroll reveal ---------------------------------------------------------- */
const REVEAL_CLASSES = ['reveal', 'visible', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add('visible');
      revealObserver.unobserve(el); // animate once only

      // Once the entrance finishes, drop the reveal classes so the element's
      // own hover transitions (cards) are not slowed by the reveal transition.
      el.addEventListener('transitionend', function done(e) {
        if (e.target !== el || e.propertyName !== 'transform') return;
        el.classList.remove(...REVEAL_CLASSES);
        el.removeEventListener('transitionend', done);
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* Mobile menu ------------------------------------------------------------ */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function setMenu(open) {
  header.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    setMenu(!header.classList.contains('nav-open'));
  });
  // close when a link is chosen
  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });
  // reset if the window grows past the mobile breakpoint
  window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
}

/* Case study popups ------------------------------------------------------ */
document.querySelectorAll('[data-case]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const dialog = document.getElementById(link.dataset.case);
    if (dialog) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
  });
});

document.querySelectorAll('.case-dialog').forEach(dialog => {
  // clicking the dimmed area outside the card closes it
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  // close button and in-popup links
  dialog.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
  });
});
