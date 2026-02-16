'use client';

import Link from 'next/link';
import { MessageCircle, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PHONE = '79939533354';
const WHATSAPP_URL = `https://wa.me/${PHONE}`;
const TELEGRAM_URL = 'https://t.me/evakosti';
const TG_GROUP_URL = 'https://t.me/nanonomera';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between py-3 sm:py-0 sm:h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-lg sm:text-xl font-bold text-foreground">
              Nano<span className="text-brand-emerald-500">nomera</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Link
              href="/blog"
              className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              Блог
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-emerald-500 transition-colors touch-target px-3 py-2 rounded-lg hover:bg-muted/50"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href={`tel:+${PHONE}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-emerald-500 transition-colors touch-target px-3 py-2 rounded-lg hover:bg-muted/50"
              aria-label="Позвонить Макс"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Макс +7 (993) 953-33-54</span>
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-emerald-500 transition-colors touch-target px-3 py-2 rounded-lg hover:bg-muted/50"
              aria-label="Telegram @evakosti"
            >
              <Send className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">TG: @evakosti</span>
            </a>
            <Button size="sm" asChild className="shrink-0">
              <a href={TG_GROUP_URL} target="_blank" rel="noopener noreferrer">
                В Telegram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
