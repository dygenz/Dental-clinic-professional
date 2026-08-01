// main.js
// Dependency-free interactions for the Solace Dental Studio site.

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const setMenu = (isOpen) => {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('.sr-only').textContent = isOpen ? 'Close navigation' : 'Open navigation';
    menu.hidden = !isOpen;
    document.body.classList.toggle('menu-open', isOpen);
  };

  toggle.addEventListener('click', () => {
    setMenu(menu.hidden);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) setMenu(false);
  }, { passive: true });
}

function initStickyHeaderShadow() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 10);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  const onScroll = () => {
    button.classList.toggle('is-visible', window.scrollY > 400);
  };

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  document.documentElement.classList.add('js');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((el) => observer.observe(el));
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('input', () => {
    if (form.classList.contains('is-submitted')) {
      status.textContent = '';
      status.classList.remove('is-success', 'is-error');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('is-submitted');

    if (!form.checkValidity()) {
      status.textContent = 'Please review the highlighted fields.';
      status.classList.add('is-error');
      status.classList.remove('is-success');
      form.querySelector(':invalid')?.focus();
      return;
    }

    const email = form.dataset.bookingEmail || 'hello@solacedental.example';
    status.textContent = `Thank you — your request is ready. Connect this form to ${email} before launch.`;
    status.classList.add('is-success');
    status.classList.remove('is-error');
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeaderShadow();
  initBackToTop();
  initScrollReveal();
  initBookingForm();
  initFooterYear();
});
