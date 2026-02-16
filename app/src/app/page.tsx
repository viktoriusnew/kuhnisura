'use client';

import Link from 'next/link';
import { ArrowRight, Check, Shield, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TelegramIcon } from '@/components/ui/telegram-icon';
import { getBlogPosts } from '@/data/blog';

const TG_GROUP_URL = 'https://t.me/nanonomera';

export default function Home() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-emerald-500/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-emerald-600/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-emerald-500/10 border border-brand-emerald-500/20 mb-6 sm:mb-8">
            <Shield className="h-4 w-4 text-brand-emerald-500" />
            <span className="text-sm text-brand-emerald-400">
              Эксклюзивные нано дубликаты
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6">
            Будь невидим
            <br />
            <span className="text-brand-emerald-500">для камер</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10">
            Уникальная технология изменённой степени светоотражения: камера
            фиксирует, но номер не видит. Для человеческого глаза — никаких
            изменений, полное соответствие ГОСТу!
          </p>

          <Button
            size="xl"
            className="group w-full sm:w-auto"
            asChild
          >
            <a href={TG_GROUP_URL} target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="mr-2 h-5 w-5" />
              Заказать в Telegram
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 sm:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Что это даёт?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Реальные цифры эффективности
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '98%', text: 'штрафов не приходят в тёмное время' },
              { value: '60%', text: 'меньше штрафов в дождь и туман' },
              { value: '30%', text: 'меньше штрафов днём' },
              { value: '0', text: 'проблем с ГИБДД — соответствуют ГОСТу' },
            ].map((item) => (
              <Card
                key={item.value}
                className="border-border text-center hover:border-brand-emerald-500/50 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl text-brand-emerald-500">
                    {item.value}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {item.text}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm sm:text-base text-muted-foreground text-center">
              Больше не нужно притормаживать перед автобусными полосами,
              камерами на скорость, парковочными камерами, светофорами и
              Платонами. Особенно актуально для дальнобойщиков и частых поездок
              по трассе!
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Как это работает?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Принцип действия ИК-камер
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-emerald-500/20 text-brand-emerald-500 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <div>
                <p className="text-foreground">
                  ИК-блок камеры посылает инфракрасный сигнал на автомобиль, свет
                  отражается и возвращается обратно.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-emerald-500/20 text-brand-emerald-500 flex items-center justify-center text-sm font-bold">
                2
              </span>
              <div>
                <p className="text-foreground">
                  Камера реагирует не на черную краску, а на светоотражающий слой
                  номера.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-emerald-500/20 text-brand-emerald-500 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <div>
                <p className="text-foreground">
                  В нано номерах светоотражающий слой поглощает ИК-свет — камеры
                  не могут распознать номер.

                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            По внешнему виду нано номера не отличаются от стандартных. Для
            человеческого глаза — никаких изменений.
          </p>
        </div>
      </section>

      {/* Cameras */}
      <section id="cameras" className="py-16 sm:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              От каких камер защищают?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Работают со всеми камерами, которые фиксируют штрафы
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-border border-brand-emerald-500/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Check className="h-5 w-5 text-brand-emerald-500" />
                  Защищают от
                </CardTitle>
                <CardContent className="pt-2">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Светофор</li>
                    <li>• Скорость</li>
                    <li>• Выделенная полоса</li>
                    <li>• Платон (грузовая)</li>
                    <li>• Парковка</li>
                    <li>• СТРЕЛКА-СТ / СТРЕЛКА-М</li>
                    <li>• Кречет, Кордон, КРИС-П/Р</li>
                    <li>• Арена, Автодория, Jenoptik Robot</li>
                  </ul>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Не работают
                </CardTitle>
                <CardContent className="pt-2">
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Из машины ГИБДД</li>
                    <li>• Из поста ГИБДД</li>
                    <li>• Камера на шлагбаум</li>
                    <li>• Городские камеры безопасности</li>
                    <li>• ВИЗИР, ПАРКОН (RGB-режим)</li>
                  </ul>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Варианты номеров
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Любые варианты по ГОСТу 50577-2018
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              'Стандартные 1:1 как в ГИБДД',
              'Без флага',
              'С жирным шрифтом',
              'Квадратные',
            ].map((variant) => (
              <Card
                key={variant}
                className="border-border text-center hover:border-brand-emerald-500/50 transition-colors"
              >
                <CardHeader>
                  <CardDescription className="text-sm">{variant}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="py-16 sm:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Сроки и доставка
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              РФ и Москва
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-brand-emerald-500" />
                  По России
                </CardTitle>
                <CardContent className="pt-2 space-y-2 text-sm text-muted-foreground">
                  <p>• Изготовление и передача в СДЕК — 1–3 рабочих дня</p>
                  <p>• Доставка СДЕК из Москвы — 2–6 рабочих дней</p>
                </CardContent>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-brand-emerald-500" />
                  По Москве
                </CardTitle>
                <CardContent className="pt-2 space-y-2 text-sm text-muted-foreground">
                  <p>• В пределах МКАД: курьер 600₽ — 1–2 дня</p>
                  <p>• За МКАД: только через СДЕК</p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Why not rights */}
      <section id="legal" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Почему не лишат прав?
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              'Человеческий глаз не найдёт отличий от номеров ГИБДД',
              'Полностью соответствуют ГОСТу',
              'Экспертизы номеров в административных делах не проводят',
              'Личный опыт — 4 года без проблем',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <Check className="h-5 w-5 text-brand-emerald-500 shrink-0 mt-0.5" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section id="blog" className="py-16 sm:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Статьи
              </h2>
              <p className="text-muted-foreground">
                Полезная информация о нано номерах и камерах
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">Все статьи</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full border-border hover:border-brand-emerald-500/50 transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="inline-flex items-center gap-1 text-sm text-brand-emerald-500 font-medium">
                      Читать
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-brand-emerald-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Готовы заказать?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Переходите в Telegram — получите скидку 10% на первый заказ и
            узнайте первыми о новостях
          </p>
          <Button size="xl" className="group w-full sm:w-auto" asChild>
            <a href={TG_GROUP_URL} target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="mr-2 h-5 w-5" />
              Перейти в Telegram
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </section>

      {/* Floating Telegram */}
      <a
        href={TG_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand-emerald-500 text-white shadow-lg shadow-brand-emerald-500/30 flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all"
        aria-label="Telegram"
      >
        <TelegramIcon className="h-6 w-6" />
      </a>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Nanonomera. Не нарушайте ПДД.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
