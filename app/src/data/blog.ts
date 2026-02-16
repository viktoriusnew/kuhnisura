export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'kak-rabotayut-nano-nomera',
    title: 'Как работают нано номера без светоотражения',
    excerpt:
      'Принцип действия ИК-камер и почему нано-покрытие делает номер невидимым для фиксации. Объяснение простым языком.',
    date: '2025-02-10',
  },
  {
    slug: 'ot-kakih-kamer-zashishayut-nano-nomera',
    title: 'От каких камер защищают нано номера',
    excerpt:
      'Полный список камер: СТРЕЛКА, Кречет, Платон, ПАРКОН и другие. Какие работают в ИК-режиме, а какие — нет.',
    date: '2025-02-08',
  },
  {
    slug: 'gost-i-zakonnost-nano-nomerov',
    title: 'Почему за нано номера не лишат прав',
    excerpt:
      'Соответствие ГОСТу, отсутствие экспертизы номеров в административных делах. Личный опыт 4 года без проблем.',
    date: '2025-02-05',
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
