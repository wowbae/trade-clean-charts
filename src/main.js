/* ════════════════════════════════════════
   ШАБЛОН ЛЕНДИНГА — main.js
   ════════════════════════════════════════
   Все функции модульные — можно удалить
   ненужные без риска сломать остальное.
   ════════════════════════════════════════ */

// ─── 1. Scroll Reveal (Intersection Observer) ─────────────
const initRevealAnimations = (selector = '[data-reveal]') => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  // Fallback: без IO показываем всё
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  elements.forEach((el) => observer.observe(el));
};

// ─── 2. Sticky CTA ────────────────────────────────────────
// Показывается когда hero ушёл, скрывается на финале
const initStickyCta = (config = {}) => {
  const {
    stickySelector = '[data-sticky-cta]',
    heroSelector = '#hero',
    finalSelector = '#final',
  } = config;

  const sticky = document.querySelector(stickySelector);
  if (!sticky) return;

  const hero = document.querySelector(heroSelector);
  const final = document.querySelector(finalSelector);
  if (!hero || !final) return;

  // Показать sticky когда hero не виден
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      sticky.classList.toggle('translate-y-full', entry.isIntersecting);
    },
    { threshold: 0.1 },
  );
  heroObserver.observe(hero);

  // Скрыть sticky когда финал в поле зрения
  const finalObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) sticky.classList.add('translate-y-full');
    },
    { threshold: 0.3 },
  );
  finalObserver.observe(final);
};

// ─── 3. Плавный скролл к якорям ──────────────────────────
const initSmoothScroll = () => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href');
    if (id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

// ─── 4. Авто-обновление года в футере ───────────────────
const initCurrentYear = (selector = '[data-year]') => {
  const el = document.querySelector(selector);
  if (el) el.textContent = String(new Date().getFullYear());
};

// ─── 5. FAQ аккордеон (details/summary) ─────────────────
// details/summary работают нативно. Этот код добавляет
// микро-анимацию при открытии/закрытии.
const initFaq = (selector = '.faq-item') => {
  document.querySelectorAll(selector).forEach((item) => {
    const summary = item.querySelector('summary');
    const details = item;
    if (!summary) return;

    summary.addEventListener('click', (e) => {
      // Закрываем другие открытые пункты
      if (!details.open) {
        document.querySelectorAll(`${selector}[open]`).forEach((el) => {
          if (el !== details) el.removeAttribute('open');
        });
      }
    });
  });
};

// ─── 6. SNAP-НАВИГАЦИЯ (dots + progress + counter + keyboard) ──
const initSnapNav = () => {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const total = sections.length;
  const progress = document.getElementById('snap-progress');
  const counter = document.getElementById('snap-counter');
  const dotsContainer = document.getElementById('snap-dots');

  if (!progress || !counter || !dotsContainer) return;

  // Создаём навигационные точки
  const dots = [];
  sections.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'snap-dot';
    dot.setAttribute('aria-label', `Секция ${i + 1}`);
    dot.addEventListener('click', () => {
      sections[i].scrollIntoView({ behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  // Определяем активную секцию по положению относительно viewport
  const getActiveIndex = () => {
    let idx = 0;
    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        idx = i;
      }
    });
    return idx;
  };

  // Обновление UI
  const update = () => {
    const current = getActiveIndex();

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });

    const pct = ((current + 1) / total) * 100;
    progress.style.width = `${pct}%`;

    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  };

  // Слушатель скролла (passive, rAF-throttled)
  let ticking = false;
  document.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Клавиатурная навигация (стрелки + PageUp/Down + Home/End)
  document.addEventListener('keydown', (e) => {
    // Не перехватываем, если фокус в поле ввода
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;

    const key = e.key;
    const ctrl = e.ctrlKey || e.metaKey;

    if (key === 'ArrowDown' || key === 'PageDown') {
      e.preventDefault();
      const next = Math.min(getActiveIndex() + 1, total - 1);
      if (next !== getActiveIndex()) sections[next].scrollIntoView({ behavior: 'smooth' });
    }

    if (key === 'ArrowUp' || key === 'PageUp') {
      e.preventDefault();
      const prev = Math.max(getActiveIndex() - 1, 0);
      if (prev !== getActiveIndex()) sections[prev].scrollIntoView({ behavior: 'smooth' });
    }

    if (key === 'Home' && !ctrl) {
      e.preventDefault();
      sections[0].scrollIntoView({ behavior: 'smooth' });
    }

    if (key === 'End' && !ctrl) {
      e.preventDefault();
      sections[total - 1].scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Первоначальное обновление
  update();
};

// ─── ЗАПУСК ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initStickyCta();
  initSmoothScroll();
  initCurrentYear();
  initFaq();
  initSnapNav();
});
