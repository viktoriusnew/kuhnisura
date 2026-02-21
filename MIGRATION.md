# Перенос сайта на другой сервер и домен

## Краткая сводка

| Место | Действие |
|-------|----------|
| `.env` | `SITE_URL=https://nanonomera.ru` |
| `docker-compose.yml` | Traefik labels: `Host()`, `SSLHost` |
| `app/src/data/blog.json` | Уже настроен под `nanonomera.ru` |
| `app/src/components/MarkdownContent.tsx` | Уже настроен под `nanonomera.ru` |
| `app/src/app/layout.tsx` | Уже использует `NEXT_PUBLIC_SITE_URL` |

---

## Что нужно изменить при смене домена

### 1. Переменные окружения и Docker

В `docker-compose.yml` или в `.env`:

```env
SITE_URL=https://nanonomera.ru
```

Traefik labels уже настроены под `nanonomera.ru` (роутер и middleware — `nanonomera`).

### 2. blog.json — замена домена

Все URL в статьях уже используют `https://nanonomera.ru/blog/...`.

### 3. MarkdownContent.tsx

`MarkdownContent.tsx` уже настроен под `nanonomera.ru`.

### 4. layout.tsx (metadata)

`metadataBase` берётся из `NEXT_PUBLIC_SITE_URL` (fallback `https://nanonomera.ru`).

---

## Пошаговый план миграции

### Подготовка на новом сервере

1. **Требования:** Docker, Docker Compose, Traefik (если используется).

2. **Скопировать проект:**
   ```bash
   rsync -avz --exclude node_modules --exclude .next ./ user@НОВЫЙ_СЕРВЕР:/path/to/nanonomera/
   ```
   Или через git, если репозиторий настроен.

3. **Создать `.env` на новом сервере** (или скопировать `.env.example`):
   ```env
   SITE_URL=https://nanonomera.ru
   ```
   Эта переменная используется в `docker-compose.yml` и в `layout.tsx` (metadataBase).

4. **Обновить `docker-compose.yml`** — домен в Traefik labels.

5. **Сборка и запуск:**
   ```bash
   docker compose build nextjs
   docker compose up -d nextjs
   ```

### DNS и SSL

7. **DNS:** A-запись для `nanonomera.ru` и `www.nanonomera.ru` на IP нового сервера.

8. **SSL:** Traefik с `tls.certresolver=mytlschallenge` обычно получает сертификаты Let's Encrypt автоматически после настройки DNS.

### Проверка

9. Открыть https://nanonomera.ru
10. Проверить главную, блог, несколько статей
11. Проверить внутренние ссылки в статьях
12. Проверить кнопку «Заказать в Telegram» и другие внешние ссылки

---

## Опционально: сделать сайт независимым от домена

Чтобы при следующем переносе не менять `blog.json`, можно:

1. **В blog.json** можно использовать относительные пути: `/blog/slug` вместо полных URL.
2. **В blog.ts** — `extractSlug` уже извлекает slug из пути, относительные пути будут работать.
3. **В MarkdownContent** — `isInternalLink` и `getBlogPath` корректно обрабатывают `/blog/...`.

Потребуется скрипт или ручная правка для замены полных URL на относительные в `blog.json` и в тексте `article_with_links`.
