'use client';

import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

function isInternalLink(href: string): boolean {
  try {
    const url = new URL(href, 'https://kuhnisura.ru');
    return url.hostname === 'kuhnisura.ru' && url.pathname.startsWith('/blog/');
  } catch {
    return href.startsWith('/blog/');
  }
}

function getBlogPath(href: string): string {
  try {
    const url = new URL(href, 'https://kuhnisura.ru');
    return url.pathname;
  } catch {
    return href.startsWith('/') ? href : `/${href}`;
  }
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children, ...props }) => {
          if (!href) return <a {...props}>{children}</a>;
          if (isInternalLink(href)) {
            return (
              <Link href={getBlogPath(href)} className="text-brand-emerald-500 hover:underline" {...props}>
                {children}
              </Link>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-emerald-500 hover:underline" {...props}>
              {children}
            </a>
          );
        },
      }}
      className="prose prose-invert prose-lg max-w-none space-y-4 [&>p]:leading-relaxed"
    >
      {content}
    </ReactMarkdown>
  );
}
