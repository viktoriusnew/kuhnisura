# Деплой на новый VPS

Пошаговая инструкция для развёртывания сайта nanonomera.ru на чистом VPS.

**Быстрый старт (после установки Docker):**
```bash
git clone https://github.com/viktoriusnew/nanonomera.git nanonomera && cd nanonomera
cp .env.example .env
docker compose -f docker-compose.standalone.yml up -d --build
```
Не забудьте настроить DNS (A-записи на IP сервера).

---

## 1. Требования к VPS

- **ОС:** Ubuntu 22.04 или 24.04 (или любой Linux с Docker)
- **RAM:** минимум 1 GB (рекомендуется 2 GB)
- **Порты:** 80, 443 должны быть открыты

---

## 2. Подготовка сервера

Подключитесь по SSH и выполните:

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# Выйдите и зайдите снова, чтобы применилась группа
```

---

## 3. Два варианта деплоя

### Вариант A: У вас уже есть Traefik (n8n, другой проект)

Если на VPS уже запущен Traefik в сети `n8n_default`:

```bash
git clone https://github.com/viktoriusnew/nanonomera.git nanonomera
cd nanonomera
cp .env.example .env
# .env уже содержит SITE_URL=https://nanonomera.ru
docker compose up -d --build
```

### Вариант B: Чистый VPS (Traefik + сайт с нуля)

Используйте `docker-compose.standalone.yml` — он поднимает Traefik и сайт вместе:

```bash
git clone https://github.com/viktoriusnew/nanonomera.git nanonomera
cd nanonomera
cp .env.example .env
# Опционально в .env: ACME_EMAIL=ваш@email.ru (для Let's Encrypt)
docker compose -f docker-compose.standalone.yml up -d --build
```

---

## 4. DNS

В панели управления доменом (где куплен nanonomera.ru) создайте A-записи:

| Тип | Имя | Значение    | TTL  |
|-----|-----|-------------|------|
| A   | @   | IP_ВАШЕГО_VPS | 300  |
| A   | www | IP_ВАШЕГО_VPS | 300  |

Подождите 5–30 минут, пока DNS обновится.

---

## 5. SSL (HTTPS)

**Вариант A (Traefik):** Сертификаты Let's Encrypt получаются автоматически через HTTP-01 challenge. Убедитесь, что порты 80 и 443 открыты.

**Вариант B (standalone):** То же самое — Traefik в `docker-compose.standalone.yml` настроен на автоматический SSL.

---

## 6. Проверка

```bash
# Статус контейнеров
docker compose ps

# Логи при ошибках
docker compose logs -f nextjs
```

Откройте в браузере: https://nanonomera.ru

---

## 7. Полезные команды

```bash
# Пересборка после изменений в коде
docker compose build nextjs && docker compose up -d nextjs

# Обновление с GitHub
git pull origin main
docker compose build nextjs && docker compose up -d nextjs

# Перезапуск
docker compose restart nextjs
```
