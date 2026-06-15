/* ============================================
   ✦ EDITORIAL PORTFOLIO — Interactions ✦
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add staggered delay for siblings
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter((el) =>
                el.classList.contains('reveal') ||
                el.classList.contains('reveal-left') ||
                el.classList.contains('reveal-right')
              )
            : [];
          const siblingIndex = siblings.indexOf(entry.target);
          const delay = siblingIndex >= 0 ? siblingIndex * 80 : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Floating Navigation Active State ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.floating-nav a');

  function updateActiveNav() {
    const scrollY = window.scrollY + window.innerHeight / 3;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // --- Smooth Scroll for Navigation ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // --- Page Fade-In Load Animation ---
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  console.log('✦ Editorial Portfolio initialized successfully ✦');
});
