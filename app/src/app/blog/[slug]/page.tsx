import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '@/data/blog';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const content = getBlogContent(slug);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к блогу
        </Link>

        <time
          dateTime={post.date}
          className="text-sm text-muted-foreground block mb-2"
        >
          {new Date(post.date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {post.title}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          {content}
        </div>
      </article>
    </main>
  );
}

function getBlogContent(slug: string) {
  const contents: Record<string, React.ReactNode> = {
    'kak-rabotayut-nano-nomera': (
      <div className="space-y-6">
        <p>
          Дорожные камеры, которые фиксируют номера в тёмное время суток,
          работают по простому принципу: ИК-блок посылает инфракрасный сигнал
          на автомобиль, свет отражается от номерного знака и возвращается к
          камере. Камера распознаёт не чёрную краску на цифрах, а именно
          светоотражающий слой номера.
        </p>
        <p>
          В нано номерах светоотражающий слой модифицирован — он поглощает
          ИК-излучение вместо отражения. Поэтому камера не может распознать
          символы. Для человеческого глаза номер выглядит совершенно обычным и
          полностью соответствует ГОСТу.
        </p>
        <p>
          Вечером, ночью, в дождь, в туман — в любое время, когда на номер не
          попадают прямые солнечные лучи, штрафы вы не получите.
        </p>
      </div>
    ),
    'ot-kakih-kamer-zashishayut-nano-nomera': (
      <div className="space-y-6">
        <p>
          Нано номера эффективны против всех камер, работающих в ИК-режиме:
          СТРЕЛКА-СТ, СТРЕЛКА-М, Кречет, Кордон, КРИС-П, КРИС-Р, Арена 1 и 2,
          Автодория, Jenoptik Robot и многие другие.
        </p>
        <p>
          Эффект не распространяется на камеры ВИЗИР и ПАРКОН — они управляются
          оператором и работают в RGB-режиме. Также не защищают от камер из
          машины ГИБДД, постов и шлагбаумов.
        </p>
        <p>
          В тёмное время суток RGB-камеры практически не используются из-за
          недостатка света, поэтому в большинстве случаев фиксация номера
          невозможна.
        </p>
      </div>
    ),
    'gost-i-zakonnost-nano-nomerov': (
      <div className="space-y-6">
        <p>
          Нано номера полностью соответствуют ГОСТу 50577-2018. В видимом
          спектре номер выглядит и читается как обычный — с расстояния 20 метров
          при штатном освещении.
        </p>
        <p>
          Экспертизы автомобильных номеров в административных делах не
          проводят — это делают только в уголовных делах, да и то в основном в
          Москве.
        </p>
        <p>
          Личный опыт — 4 года без проблем. Человеческий глаз не найдет
          отличий от стандартных номеров ГИБДД. Ездим спокойно и без «писем
          счастья».
        </p>
      </div>
    ),
  };

  return contents[slug] ?? <p>Контент статьи в разработке.</p>;
}
