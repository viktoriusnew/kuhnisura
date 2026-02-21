import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nanonomera — Нано номера невидимые для камер',
    template: '%s | Nanonomera',
  },
  description:
    'Эксклюзивные нано дубликаты гос номеров. 98% штрафов не приходят в тёмное время. Соответствуют ГОСТу. Защита от СТРЕЛКА, Кречет, Платон и других камер.',
  keywords: [
    'нано номера',
    'номера без светоотражения',
    'дубликаты гос номеров',
    'защита от камер',
    'невидимые номера',
    'номера для камер',
    'штрафы камеры',
  ],
  authors: [{ name: 'Nanonomera' }],
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL('https://nanonomera.ru'),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'Nanonomera',
    title: 'Nanonomera — Нано номера невидимые для камер',
    description:
      'Эксклюзивные нано дубликаты гос номеров. 98% штрафов не приходят в тёмное время. Соответствуют ГОСТу.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
