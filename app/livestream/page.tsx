'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Radio, Bell, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LivestreamPage() {
  const { locale } = useAppStore();

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-red-900/20 via-base-100 to-rose-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mx-auto">
            <Radio className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{t('livestream.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('livestream.subtitle', locale)}</p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card p-12 sm:p-16 text-center space-y-8">
          <div className="relative inline-block">
            <Radio className="w-20 h-20 text-red-400 mx-auto" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-pulse" />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
              Going Live Soon
            </h2>
            <p className="text-base-content/60 text-lg max-w-md mx-auto leading-relaxed">
              Live coding sessions, tech talks, and interactive workshops are being prepared. Get ready for real-time learning experiences with Bidyadhar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/calendar" className="btn btn-primary text-white gap-2 shadow-lg shadow-primary/25">
              <Bell className="w-4 h-4" /> Stay Updated via Calendar
            </Link>
            <Link href="/" className="btn btn-ghost gap-2">
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-base-content/30 pt-4">
            — The stream will begin when the time is right —
          </p>
        </div>
      </section>
    </div>
  );
}
