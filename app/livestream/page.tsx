'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Radio, Play, Clock, Eye, Calendar } from 'lucide-react';

const streams = [
  {
    id: '1',
    title: 'Building a DeFi Protocol from Scratch',
    description: 'Live coding session where we build a complete DeFi yield aggregator using Solidity, Hardhat, and React.',
    thumbnail: null,
    status: 'live' as const,
    viewers: 142,
    scheduled_at: '2026-02-16T14:00:00',
    stream_url: 'https://youtube.com/live',
    color: 'from-red-500 to-rose-500',
  },
  {
    id: '2',
    title: 'Next.js 14 + Supabase: Full Stack Masterclass',
    description: 'Building a real-world application with Next.js App Router, Supabase, and Tailwind CSS from zero to production.',
    thumbnail: null,
    status: 'scheduled' as const,
    viewers: 0,
    scheduled_at: '2026-02-20T16:00:00',
    stream_url: '#',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: '3',
    title: 'AR Development with Unity & ARCore',
    description: 'Learn how to create augmented reality experiences for Android using Unity and Google ARCore SDK.',
    thumbnail: null,
    status: 'scheduled' as const,
    viewers: 0,
    scheduled_at: '2026-02-22T15:00:00',
    stream_url: '#',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: '4',
    title: 'Smart Contract Security Best Practices',
    description: 'Deep dive into common vulnerabilities in Solidity smart contracts and how to prevent them. Reentrancy, overflow, and more.',
    thumbnail: null,
    status: 'ended' as const,
    viewers: 358,
    scheduled_at: '2026-02-10T14:00:00',
    stream_url: 'https://youtube.com/watch?v=replay',
    color: 'from-emerald-500 to-green-500',
  },
];

export default function LivestreamPage() {
  const { locale } = useAppStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-red-500 px-3 py-1 rounded-full pulse-live">
            <Radio className="w-3 h-3" /> {t('livestream.live', locale)}
          </span>
        );
      case 'scheduled':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            <Clock className="w-3 h-3" /> {t('livestream.scheduled', locale)}
          </span>
        );
      case 'ended':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
            <Play className="w-3 h-3" /> {t('livestream.ended', locale)}
          </span>
        );
    }
  };

  const liveStreams = streams.filter((s) => s.status === 'live');
  const upcoming = streams.filter((s) => s.status === 'scheduled');
  const past = streams.filter((s) => s.status === 'ended');

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Live Now */}
        {liveStreams.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full pulse-live"></span> Live Now
            </h2>
            <div className="grid gap-8">
              {liveStreams.map((stream) => (
                <div key={stream.id} className="glass-card overflow-hidden">
                  <div className={`h-64 sm:h-80 bg-gradient-to-br ${stream.color} flex items-center justify-center relative`}>
                    <Play className="w-16 h-16 text-white/80" />
                    <div className="absolute top-4 left-4">{getStatusBadge(stream.status)}</div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
                      <Eye className="w-3.5 h-3.5" /> {stream.viewers} watching
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-bold">{stream.title}</h3>
                    <p className="text-base-content/60">{stream.description}</p>
                    <a href={stream.stream_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-white gap-2">
                      <Play className="w-4 h-4" /> Watch Live
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Streams</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {upcoming.map((stream) => (
                <div key={stream.id} className="glass-card overflow-hidden hover:shadow-xl transition-all">
                  <div className={`h-40 bg-gradient-to-br ${stream.color} flex items-center justify-center relative`}>
                    <Calendar className="w-10 h-10 text-white/80" />
                    <div className="absolute top-3 left-3">{getStatusBadge(stream.status)}</div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold">{stream.title}</h3>
                    <p className="text-sm text-base-content/60">{stream.description}</p>
                    <p className="text-sm text-base-content/50 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(stream.scheduled_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Streams */}
        {past.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Past Streams (Replays)</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((stream) => (
                <div key={stream.id} className="glass-card overflow-hidden hover:shadow-xl transition-all group">
                  <div className={`h-36 bg-gradient-to-br ${stream.color} flex items-center justify-center relative`}>
                    <Play className="w-10 h-10 text-white/80 group-hover:scale-125 transition-transform" />
                    <div className="absolute top-3 left-3">{getStatusBadge(stream.status)}</div>
                    <div className="absolute bottom-3 right-3 text-white text-xs bg-black/30 px-2 py-1 rounded">
                      {stream.viewers} views
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold">{stream.title}</h3>
                    <p className="text-xs text-base-content/50">{new Date(stream.scheduled_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                    <a href={stream.stream_url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Watch Replay <Play className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
