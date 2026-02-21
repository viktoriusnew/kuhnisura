# Nanonomera — Нано номера

Продающий лендинг на Next.js + shadcn/ui. Mobile-first.

**Продукт**: Дубликаты гос номеров с нано-покрытием (невидимы для ИК-камер).

**Репозиторий**: https://github.com/viktoriusnew/nanonomera

## Структура

- `/` — главная (лендинг)
- `/blog` — список статей (SEO)
- `/blog/[slug]` — страница статьи

## Изображения

Добавьте в `app/public/images/`:
- `hero/` — фото для Hero-секции
- `reviews/` — скриншоты отзывов

## Первый запуск на новом хостинге

```bash
cp .env.example .env
# Отредактируйте .env (SITE_URL под ваш домен)
```

## Запуск

```bash
cd /path/to/nanonomera
docker compose up -d --build
```

## Команды

```bash
docker compose ps              # статус
docker compose logs -f nextjs   # логи
docker compose restart nextjs  # перезапуск
docker compose build nextjs    # пересборка после изменений
```

## Локальная разработка

```bash
cd /path/to/nanonomera/app
npm install
npm run dev
```
