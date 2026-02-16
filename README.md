# kuhnisura.ru

Лендинг на Next.js + shadcn/ui. Домен: kuhnisura.ru, www.kuhnisura.ru.

**Репозиторий**: https://github.com/viktoriusnew/kuhnisura

## Первый запуск на новом хостинге

```bash
cp .env.example .env
# Отредактируйте .env (SITE_URL под ваш домен)
```

## Запуск

```bash
cd /opt/beget/kuhnisura
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
cd /opt/beget/kuhnisura/app
npm install
npm run dev
```

## DNS

Добавьте A-записи для kuhnisura.ru и www.kuhnisura.ru → 45.130.212.210
