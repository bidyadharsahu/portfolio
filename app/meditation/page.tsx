'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Flower2, Bell, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function MeditationPage() {
  const { locale } = useAppStore();

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-900/20 via-base-100 to-indigo-900/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto text-4xl">🧘</div>
          <h1 className="text-4xl sm:text-5xl font-bold">{t('meditation.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('meditation.subtitle', locale)}</p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card p-12 sm:p-16 text-center space-y-8">
          <div className="relative inline-block">
            <Flower2 className="w-20 h-20 text-purple-400 mx-auto" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-pulse" />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {t('meditation.launchingSoon', locale)}
            </h2>
            <p className="text-base-content/60 text-lg max-w-md mx-auto leading-relaxed">
              {t('meditation.launchingDesc', locale)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/calendar" className="btn btn-primary text-white gap-2 shadow-lg shadow-primary/25">
              <Bell className="w-4 h-4" /> {t('meditation.stayUpdated', locale)}
            </Link>
            <Link href="/" className="btn btn-ghost gap-2">
              {t('meditation.backHome', locale)}
            </Link>
          </div>

          <p className="text-xs text-base-content/30 pt-4">
            {t('meditation.peace', locale)}
          </p>
        </div>
      </section>
    </div>
  );
}
