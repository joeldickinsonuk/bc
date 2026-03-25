const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  const closeNav = () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open', !expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) {
      return;
    }

    if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => io.observe(item));
}

const galleries = document.querySelectorAll('[data-gallery]');

galleries.forEach((gallery) => {
  const mainImage = gallery.querySelector('[data-gallery-main]');
  const thumbs = gallery.querySelectorAll('[data-gallery-thumb]');

  if (!mainImage || !thumbs.length) {
    return;
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const nextSrc = thumb.dataset.src;
      const nextAlt = thumb.dataset.alt;

      if (!nextSrc) {
        return;
      }

      mainImage.src = nextSrc;
      mainImage.alt = nextAlt || mainImage.alt;

      thumbs.forEach((item) => {
        item.classList.toggle('is-active', item === thumb);
        item.setAttribute('aria-pressed', String(item === thumb));
      });
    });
  });
});
