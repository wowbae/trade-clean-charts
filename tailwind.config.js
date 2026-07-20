/** @type {import('tailwindcss').Config} */
/*
 * ═══════════════════════════════════════════
 * ДИЗАЙН-СИСТЕМА — Neutral Dark
 * ═══════════════════════════════════════════
 *
 * Тёплая off-white типографика на глубоком тёмном фоне.
 * Базовая палитра для любого лендинга — замените accent под бренд.
 */
export default {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      /* ─── ЦВЕТОВАЯ ПАЛИТРА ─── */
      colors: {
        // Основная: фон и текст
        ink:   '#0f0f0f',     // глубокий тёмный фон
        paper: '#e8e4df',     // тёплый текст
        mist:  '#1a1a1a',     // поверхности/карточки
        smoke: '#6b6661',     // приглушённый текст

        // Тёплый акцент (бежево-золотистый)
        accent: {
          DEFAULT: '#d4a574',
          hover:   '#c49464',
          light:   '#e0be94',
          muted:   'rgba(212, 165, 116, 0.08)',
        },

        // Дополнительные акценты
        warm: {
          DEFAULT: '#d4a574',
          hover:   '#c49464',
          light:   '#e0be94',
        },
        gold:  '#c9b896',
        green: '#7a9e6d',

        // Семантические (формы, уведомления)
        success: '#22C55E',
        warning: '#F59E0B',
        error:   '#EF4444',
      },

      /* ─── ТИПОГРАФИКА ─── */
      fontFamily: {
        // IBM Plex Sans — современный гротеск
        sans: ['IBM Plex Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        // Cormorant Garamond — изысканный display
        serif: ['Cormorant Garamond', 'Cormorant', 'Georgia', 'Times New Roman', 'serif'],
        display: ['Cormorant Garamond', 'Cormorant', 'Georgia', 'Times New Roman', 'serif'],
      },

      /* ─── МЕЖБУКВЕННЫЙ ИНТЕРВАЛ ─── */
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.02em',
        wide:     '0.05em',
        wider:    '0.1em',
        widest:   '0.25em',
      },

      /* ─── СКРУГЛЕНИЯ ─── */
      borderRadius: {
        button: '9999px',  // pill-кнопки
        card:   '12px',     // карточки
        input:  '0.75rem',  // поля ввода
      },

      /* ─── ТЕНИ ─── */
      boxShadow: {
        soft:     '0 2px 8px rgba(0, 0, 0, 0.06)',
        card:     '0 4px 20px rgba(0, 0, 0, 0.08)',
        elevated: '0 20px 60px rgba(0, 0, 0, 0.12)',
        glow:     '0 0 30px rgba(212, 165, 116, 0.2)',
      },

      /* ─── ГАБАРИТЫ ─── */
      maxWidth: {
        mobile:   '480px',   // мобильный контейнер
        readable: '65ch',    // комфортная длина строки
      },
      minHeight: {
        touch: '44px',       // минимальный тач-таргет (WCAG)
      },

      /* ─── АНИМАЦИИ ─── */
      transitionTimingFunction: {
        // Apple-style замедление
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          '0%':   { opacity: '0', filter: 'blur(14px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
      },
      animation: {
        'fade-in':  'fade-in 0.9s var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)) forwards',
        'scale-in': 'scale-in 0.9s var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)) forwards',
        'blur-in':  'blur-in 1.3s var(--ease-expo, cubic-bezier(0.16, 1, 0.3, 1)) forwards',
      },
    },
  },
  plugins: [],
};
