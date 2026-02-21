import blogData from './blog.json';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  keywords?: string;
  articleWithLinks?: string;
  linksTo?: { anchor: string; url: string }[];
}

interface JsonArticle {
  keywords: string;
  url: string;
  article_with_links: string;
  links_to?: { anchor: string; url: string }[];
}

function extractSlug(url: string): string {
  const match = url.match(/\/blog\/([^/]+)\/?$/);
  return match ? match[1] : url;
}

function extractArticleText(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  const trimmed = raw.trim();

  const extractFromJson = (str: string): string | null => {
    try {
      const parsed = JSON.parse(str);
      const inner = parsed.article_with_links;
      if (typeof inner === 'string') return inner;
      if (inner && typeof inner.article_with_links === 'string') return inner.article_with_links;
      return null;
    } catch {
      return null;
    }
  };

  if (trimmed.startsWith('{')) {
    const result = extractFromJson(trimmed);
    if (result) return result;
    const match = trimmed.match(/"article_with_links"\s*:\s*"((?:[^"\\]|\\.)*?)"\s*[,}\s]/);
    if (match) {
      return match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
  }
  return trimmed.startsWith('#') ? trimmed : '';
}

function getExcerpt(text: string, maxLen = 160): string {
  const clean = text.replace(/#{1,6}\s+/g, '').replace(/\n+/g, ' ').trim();
  const withoutMarkdown = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  return withoutMarkdown.length > maxLen ? withoutMarkdown.slice(0, maxLen) + '…' : withoutMarkdown;
}

const jsonArticles = (blogData as unknown as [{ articles: JsonArticle[] }])[0]?.articles ?? [];

const jsonPosts: BlogPost[] = jsonArticles.map((a: JsonArticle) => {
  const slug = extractSlug(a.url);
  const text = extractArticleText(a.article_with_links);
  const title = a.keywords || text.split('\n')[0]?.replace(/^#+\s*/, '') || slug;
  return {
    slug,
    title,
    excerpt: getExcerpt(text),
    date: '2025-02-15',
    keywords: a.keywords,
    articleWithLinks: text,
    linksTo: a.links_to,
  };
});

const featuredSlugs = [
  'kak-rabotayut-nano-nomera',
  'ot-kakih-kamer-zashishayut-nano-nomera',
  'gost-i-zakonnost-nano-nomerov',
];

const featuredPosts: BlogPost[] = [
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

const slugToJson = new Map(jsonPosts.map((p) => [p.slug, p]));
const allPosts: BlogPost[] = [
  ...featuredPosts.map((fp) => {
    const fromJson = slugToJson.get(fp.slug);
    return fromJson ? { ...fromJson, ...fp } : fp;
  }),
  ...jsonPosts.filter((p) => !featuredSlugs.includes(p.slug)),
];

export function getBlogPosts(): BlogPost[] {
  return allPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return featuredPosts;
}
