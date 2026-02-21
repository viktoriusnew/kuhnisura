# Перенос сайта на другой сервер и домен

## Краткая сводка

| Место | Действие |
|-------|----------|
| `.env` | `SITE_URL=https://nanonomera.ru` |
| `docker-compose.yml` | Traefik labels: `Host()`, `SSLHost` |
| `app/src/data/blog.json` | Заменить `kuhnisura.ru` на новый домен |
| `app/src/components/MarkdownContent.tsx` | Опционально (работает с любым доменом) |
| `app/src/app/layout.tsx` | Уже использует `NEXT_PUBLIC_SITE_URL` |

---

## Что нужно изменить при смене домена

### 1. Переменные окружения и Docker

В `docker-compose.yml` или в `.env`:

```env
SITE_URL=https://nanonomera.ru
```

Изменить Traefik labels (строки 21–29) — заменить `kuhnisura.ru` на новый домен:

```yaml
- traefik.http.routers.kuhnisura.rule=Host(`nanonomera.ru`) || Host(`www.nanonomera.ru`)
- traefik.http.middlewares.kuhnisura.headers.SSLHost=nanonomera.ru
```

Либо переименовать роутер (например, `nanonomera` вместо `kuhnisura`).

### 2. blog.json — замена домена

Во всех статьях используются полные URL `https://kuhnisura.ru/blog/...`. Их нужно заменить на новый домен.

**Вариант A — массовая замена при миграции:**
```bash
sed -i 's|https://kuhnisura.ru|https://nanonomera.ru|g' app/src/data/blog.json
```

**Вариант B — использовать относительные пути** (потребует доработки кода, см. ниже).

### 3. MarkdownContent.tsx

В `app/src/components/MarkdownContent.tsx` домен `kuhnisura.ru` используется только для парсинга URL. Внутренние ссылки вида `/blog/slug` будут работать на любом домене. Если в `blog.json` оставить полные URL с новым доменом, менять компонент не нужно.

### 4. layout.tsx (metadata)

`metadataBase` уже берётся из `NEXT_PUBLIC_SITE_URL` (fallback `https://kuhnisura.ru`). При задании `SITE_URL` в `.env` на новом сервере metadata подстроится автоматически.

---

## Пошаговый план миграции

### Подготовка на новом сервере

1. **Требования:** Docker, Docker Compose, Traefik (если используется).

2. **Скопировать проект:**
   ```bash
   rsync -avz --exclude node_modules --exclude .next /opt/beget/kuhnisura/ user@НОВЫЙ_СЕРВЕР:/path/to/nanonomera/
   ```
   Или через git, если репозиторий настроен.

3. **Создать `.env` на новом сервере** (или скопировать `.env.example`):
   ```env
   SITE_URL=https://nanonomera.ru
   ```
   Эта переменная используется в `docker-compose.yml` и в `layout.tsx` (metadataBase).

4. **Обновить `docker-compose.yml`** — домен в Traefik labels.

5. **Заменить домен в blog.json:**
   ```bash
   cd /path/to/nanonomera
   sed -i 's|https://kuhnisura.ru|https://nanonomera.ru|g' app/src/data/blog.json
   ```

6. **Сборка и запуск:**
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

1. **В blog.json** использовать относительные пути: `/blog/slug` вместо `https://kuhnisura.ru/blog/slug`.
2. **В blog.ts** — `extractSlug` уже извлекает slug из пути, относительные пути будут работать.
3. **В MarkdownContent** — `isInternalLink` и `getBlogPath` корректно обрабатывают `/blog/...`.

Потребуется скрипт или ручная правка для замены полных URL на относительные в `blog.json` и в тексте `article_with_links`.
