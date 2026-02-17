'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import {
  ArrowRight, Code2, Blocks, Glasses, Cloud, Star, Users, Briefcase,
  Zap, Shield, Rocket, Globe, Play, ChevronRight, Quote, Calendar, Heart,
} from 'lucide-react';

const featuredProjects = [
  {
    titleKey: 'projects.featured.0.title',
    descKey: 'projects.featured.0.desc',
    tech: ['React', 'Next.js', 'Node.js', 'Vercel'],
    color: 'from-rose-500 to-orange-500',
    icon: <Rocket className="w-8 h-8" />,
    category: 'Full-Stack',
    live_url: 'https://namaste-ruby.vercel.app/',
  },
  {
    titleKey: 'projects.featured.1.title',
    descKey: 'projects.featured.1.desc',
    tech: ['Next.js', 'WebAR', 'Three.js', 'Vercel'],
    color: 'from-violet-500 to-purple-500',
    icon: <Glasses className="w-8 h-8" />,
    category: 'AR / VR',
    live_url: 'https://web-ar-phi.vercel.app/',
  },
  {
    titleKey: 'projects.featured.2.title',
    descKey: 'projects.featured.2.desc',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'QR API'],
    color: 'from-emerald-500 to-teal-500',
    icon: <Zap className="w-8 h-8" />,
    category: 'Cloud',
    live_url: 'https://qr-cod-shop.vercel.app/',
  },
];

const stats = [
  { number: '15+', labelKey: 'stats.projects' },
  { number: '10+', labelKey: 'stats.clients' },
  { number: '3+', labelKey: 'stats.experience' },
  { number: '5+', labelKey: 'stats.technologies' },
];

const testimonials = [
  { nameKey: 'testimonials.0.name', roleKey: 'testimonials.0.role', messageKey: 'testimonials.0.message', rating: 5 },
  { nameKey: 'testimonials.1.name', roleKey: 'testimonials.1.role', messageKey: 'testimonials.1.message', rating: 5 },
  { nameKey: 'testimonials.2.name', roleKey: 'testimonials.2.role', messageKey: 'testimonials.2.message', rating: 5 },
];

export default function Home() {
  const { locale } = useAppStore();

  return (
    <div className="sacred-pattern">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-fade-in-up text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  {t('hero.greeting', locale)}{' '}
                  <span className="gradient-text">{t('hero.name', locale)}</span>
                </h1>
                <p className="text-lg sm:text-xl text-base-content/60 font-medium">{t('hero.tagline', locale)}</p>
                <p className="text-base text-base-content/50 max-w-lg leading-relaxed">{t('hero.subtitle', locale)}</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link href="/projects" className="btn btn-primary text-white gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                  {t('hero.cta.projects', locale)} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="btn btn-outline btn-secondary gap-2">
                  {t('hero.cta.hire', locale)} <Briefcase className="w-4 h-4" />
                </Link>
                <Link href="/donate" className="btn btn-ghost gap-2">
                  {t('hero.cta.donate', locale)} <Heart className="w-4 h-4" />
                </Link>
              </div>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['React', 'Next.js', 'AWS', 'Python', 'Node.js', 'TypeScript', 'Docker'].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium bg-base-200/80 text-base-content/60 rounded-full border border-base-300/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Profile photo */}
            <div className="flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center overflow-hidden border-2 border-base-300/30 shadow-2xl">
                  <img src="/self.png" alt="Bidyadhar Sahu" className="w-full h-full object-cover" />
                </div>
                <div className="text-center mt-4">
                  <p className="text-xs text-base-content/40 font-medium">{t('hero.photoCaption', locale)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white">
                <p className="text-3xl sm:text-4xl font-bold">{stat.number}</p>
                <p className="text-white/70 text-sm mt-1">{t(stat.labelKey, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">{t('projects.title', locale)}</h2>
            <div className="section-divider"></div>
            <p className="text-base-content/60 max-w-2xl mx-auto">{t('projects.subtitle', locale)}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <div key={i} className="group glass-card overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Gradient header */}
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
                  <div className="text-white/80">{project.icon}</div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{t(project.titleKey, locale)}</h3>
                  <p className="text-sm text-base-content/60 leading-relaxed">{t(project.descKey, locale)}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-base-200 rounded-md text-base-content/70">{tag}</span>
                    ))}
                  </div>
                  <Link href="/projects" className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">
                    {t('projects.learnMore', locale)} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="btn btn-outline btn-primary gap-2">
              {t('projects.all', locale)} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">{t('services.title', locale)}</h2>
            <div className="section-divider"></div>
            <p className="text-base-content/60 max-w-2xl mx-auto">{t('services.subtitle', locale)}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Code2 className="w-6 h-6" />, key: 'webdev' },
              { icon: <Blocks className="w-6 h-6" />, key: 'blockchain' },
              { icon: <Glasses className="w-6 h-6" />, key: 'arvr' },
              { icon: <Cloud className="w-6 h-6" />, key: 'cloud' },
              { icon: <Shield className="w-6 h-6" />, key: 'security' },
              { icon: <Globe className="w-6 h-6" />, key: 'consulting' },
            ].map((service, i) => (
              <div key={i} className="glass-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(`services.${service.key}.title`, locale)}</h3>
                <p className="text-sm text-base-content/60">{t(`services.${service.key}.desc`, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">{t('testimonials.title', locale)}</h2>
            <div className="section-divider"></div>
            <p className="text-base-content/60">{t('testimonials.subtitle', locale)}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, i) => (
              <div key={i} className="glass-card p-8 relative">
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-base-content/70 text-sm leading-relaxed mb-6">"{t(item.messageKey, locale)}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {t(item.nameKey, locale)[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t(item.nameKey, locale)}</p>
                    <p className="text-xs text-base-content/50">{t(item.roleKey, locale)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('cta.title', locale)}</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">{t('cta.subtitle', locale)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="btn bg-white text-primary hover:bg-white/90 gap-2 shadow-lg">
              {t('cta.startProject', locale)} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calendar" className="btn btn-outline border-white text-white hover:bg-white/10 gap-2">
              {t('cta.scheduleMeeting', locale)} <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/meditation', icon: <Play className="w-6 h-6" />, title: t('nav.meditation', locale), desc: t('quicklinks.meditation.desc', locale), color: 'from-purple-500 to-indigo-500' },
              { href: '/livestream', icon: <Globe className="w-6 h-6" />, title: t('nav.livestream', locale), desc: t('quicklinks.livestream.desc', locale), color: 'from-red-500 to-rose-500' },
              { href: '/calendar', icon: <Calendar className="w-6 h-6" />, title: t('nav.calendar', locale), desc: t('quicklinks.calendar.desc', locale), color: 'from-blue-500 to-cyan-500' },
              { href: '/feedback', icon: <Users className="w-6 h-6" />, title: t('nav.feedback', locale), desc: t('quicklinks.feedback.desc', locale), color: 'from-emerald-500 to-green-500' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group glass-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-base-content/50">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
