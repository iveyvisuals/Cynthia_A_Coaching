document.addEventListener('DOMContentLoaded', () => {
  // Header scroll state
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    }));
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Carousel arrow controls
  document.querySelectorAll('[data-carousel]').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel');
    const prev = wrapper.querySelector('[data-prev]');
    const next = wrapper.querySelector('[data-next]');
    if (!track) return;
    const scrollAmount = () => Math.min(360, track.clientWidth * 0.85);
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  });

  // Free-offer form (front-end only, no backend wired up)
  const offerForm = document.querySelector('.offer-form');
  if (offerForm) {
    offerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = offerForm.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Sent — check your inbox';
      offerForm.querySelector('input').value = '';
      setTimeout(() => { btn.textContent = original; }, 3200);
    });
  }
});
