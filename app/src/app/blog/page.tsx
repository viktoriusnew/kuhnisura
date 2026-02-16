import Link from 'next/link';
import { getBlogPosts } from '@/data/blog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Блог',
  description:
    'Статьи о нано номерах, защите от камер, ГОСТе и законности. Полезная информация для водителей.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Блог
        </h1>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Полезные статьи о нано номерах, камерах и защите от штрафов
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full border-border hover:border-brand-emerald-500/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-foreground line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
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
    </main>
  );
}
