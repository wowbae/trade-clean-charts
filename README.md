# html-landing-template

Универсальный mobile-first шаблон лендинга. **HTML5 + Tailwind CSS v3 + Vanilla JS** — никаких фреймворков. Берёте, меняете текст и картинки, деплоите.

---

## Быстрый старт

```bash
# Установка
cd html-landing && bun install

# Разработка (Tailwind в watch-режиме)
bun run dev

# Открыть в браузере
open src/index.html
```

## Команды

| Команда | Действие |
|---|---|
| `bun run dev` | Tailwind watch → `src/assets/styles.css` |
| `bun run build` | Минифицированная сборка в `dist/` |
| `bun run preview` | Сборка + открытие `dist/index.html` |
| `bun run clean` | Удалить `dist/` |

## Деплой на GitHub Pages

При пуше в ветку `main` GitHub Actions автоматически:
1. Устанавливает зависимости (`bun install`)
2. Собирает проект в `dist/` (`bun run build`)
3. Публикует на GitHub Pages

### Первоначальная настройка (один раз)

1. Зайдите в **Settings → Pages** вашего репозитория на GitHub
2. В разделе **Source** выберите **GitHub Actions**
3. Всё — следующий пуш в `main` запустит деплой

Сайт будет доступен по адресу `https://<username>.github.io/<repo>/`.

### Ручной запуск

В репозитории: **Actions → Deploy to GitHub Pages → Run workflow**.

## Структура

```
html-landing/
├── src/
│   ├── index.html       # 7 секций лендинга (см. ниже)
│   ├── input.css        # Анимации + компонентные классы (@layer)
│   ├── main.js          # Модульный JS (5 функций)
│   └── assets/          # Сюда класть изображения
├── dist/                # Продакшн-сборка (gitignored)
├── tailwind.config.js   # ДИЗАЙН-СИСТЕМА (цвета, шрифты, радиусы, тени)
├── postcss.config.js
├── package.json
├── AGENTS.md            # Правила для AI-ассистентов
└── README.md
```

## Секции

| # | Секция | id | Назначение |
|---|---|---|---|
| 1 | Hero | `#hero` | Захват внимания, h1, CTA |
| 2 | Проблема | `#pain` | Эмоциональный триггер, боль клиента |
| 3 | Решение | `#solution` | Продукт/услуга как выход |
| 4 | Преимущества | `#features` | Детали и выгоды |
| 5 | Отзывы | `#testimonials` | Социальное доказательство |
| 6 | FAQ | `#faq` | Снятие возражений |
| 7 | Финал | `#final` | Цена, дедлайн, покупка |

Лишние секции можно удалить — остальные не сломаются.

## Дизайн-система

Все токены — в `tailwind.config.js`:

- **Цвета:** `ink` (#000), `paper` (#FFF), `mist` (#F5F5F7), `smoke` (#86868B), `accent` (оранжевый)
- **Шрифты:** Inter (основной), Cormorant (антиквенный)
- **Радиусы:** `rounded-button` (pill), `rounded-card` (16px), `rounded-input` (12px)
- **Тени:** `shadow-soft`, `shadow-card`, `shadow-elevated`, `shadow-glow`
- **Анимации:** `ease-expo`, `animate-fade-in`, `animate-scale-in`, `animate-blur-in`
- **Компоненты:** `btn-primary`, `btn-sticky`, `card`, `overlay-left`, `divider`, `noise`

## Кастомизация: чек-лист

1. [ ] `src/index.html` — найти все `FIXME` и заполнить
2. [ ] `tailwind.config.js` — сменить `accent` под свой бренд
3. [ ] Заменить изображения в `src/assets/` (hero-bg.jpg, section-bg.jpg, cta-bg.jpg)
4. [ ] `bun run build` и проверить `dist/`
5. [ ] Сменить `href="#"` на финальной CTA на ссылку оплаты
6. [ ] Обновить мета-теги: title, description, Open Graph
7. [ ] **Проверить `.github/workflows/deploy.yml`:** ветка, команда сборки
