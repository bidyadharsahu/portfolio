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
    title: 'Namaste Rides',
    description: 'Blockchain-based decentralized carpooling platform with smart contract payments and real-time ride tracking.',
    tech: ['Solidity', 'React', 'Node.js', 'Web3'],
    color: 'from-rose-500 to-orange-500',
    icon: <Rocket className="w-8 h-8" />,
    category: 'Web3 / Blockchain',
    live_url: '#',
  },
  {
    title: 'NetrikXR AR App',
    description: 'Augmented reality application delivering immersive AR experiences for mobile devices using cutting-edge technology.',
    tech: ['Unity', 'ARCore', 'C#', 'Flutter'],
    color: 'from-violet-500 to-purple-500',
    icon: <Glasses className="w-8 h-8" />,
    category: 'AR / VR',
    live_url: '#',
  },
  {
    title: 'QR Code Menu System',
    description: 'Contactless restaurant ordering — scan, browse, and order directly from your phone. No app download needed.',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'QR API'],
    color: 'from-emerald-500 to-teal-500',
    icon: <Zap className="w-8 h-8" />,
    category: 'Full-Stack',
    live_url: '#',
  },
];

const services = [
  { icon: <Code2 className="w-6 h-6" />, title: 'Web Development', desc: 'Modern, responsive web applications using React, Next.js, and cutting-edge frameworks.' },
  { icon: <Blocks className="w-6 h-6" />, title: 'Blockchain & Web3', desc: 'Smart contracts, DApps, and decentralized solutions on Ethereum and beyond.' },
  { icon: <Glasses className="w-6 h-6" />, title: 'AR/VR Solutions', desc: 'Immersive augmented and virtual reality experiences for mobile and web.' },
  { icon: <Cloud className="w-6 h-6" />, title: 'Cloud Architecture', desc: 'Scalable cloud solutions using AWS Lambda, DynamoDB, Amplify, and more.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Security Audits', desc: 'Smart contract audits and security best practices for blockchain projects.' },
  { icon: <Globe className="w-6 h-6" />, title: 'Freelance Consulting', desc: 'End-to-end project consulting, from ideation to deployment and beyond.' },
];

const stats = [
  { number: '15+', label: 'Projects Delivered' },
  { number: '10+', label: 'Happy Clients' },
  { number: '3+', label: 'Years Experience' },
  { number: '5+', label: 'Technologies' },
];

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Startup Founder', message: 'Bidyadhar delivered our blockchain project ahead of schedule. Exceptional quality and communication!', rating: 5 },
  { name: 'Priya Sharma', role: 'Restaurant Owner', message: 'The QR menu system transformed our business. Customers love the contactless experience!', rating: 5 },
  { name: 'Amit Patel', role: 'Tech Lead', message: 'Solid understanding of Web3 concepts. The smart contract implementation was flawless.', rating: 5 },
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Available for freelance work
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  {t('hero.greeting', locale)}{' '}
                  <span className="gradient-text">{t('hero.name', locale)}</span>
                  <span className="inline-block animate-wave ml-2">🙏</span>
                </h1>
                <p className="text-lg sm:text-xl text-base-content/60 font-medium">{t('hero.tagline', locale)}</p>
                <p className="text-base text-base-content/50 max-w-lg leading-relaxed">{t('hero.subtitle', locale)}</p>
              </div>

              <div className="flex flex-wrap gap-3">
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
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Solidity', 'AWS', 'Python', 'Node.js', 'TypeScript'].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium bg-base-200/80 text-base-content/60 rounded-full border border-base-300/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Profile visual */}
            <div className="flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center overflow-hidden border-2 border-base-300/30 shadow-2xl">
                  <img src="/self.png" alt="Bidyadhar Sahu" className="w-full h-full object-cover" />
                </div>
                {/* Floating cards */}
                <div className="absolute -top-4 -right-4 glass-card px-4 py-3 float-animation">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">15+ Projects</p>
                      <p className="text-[10px] text-base-content/50">Delivered</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 float-animation" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">5.0 Rating</p>
                      <p className="text-[10px] text-base-content/50">Client Reviews</p>
                    </div>
                  </div>
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
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
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
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-base-content/60 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 bg-base-200 rounded-md text-base-content/70">{t}</span>
                    ))}
                  </div>
                  <Link href="/projects" className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
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
            <h2 className="text-3xl sm:text-4xl font-bold">What I Do</h2>
            <div className="section-divider"></div>
            <p className="text-base-content/60 max-w-2xl mx-auto">From concept to deployment, I offer end-to-end development services</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="glass-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Client Testimonials</h2>
            <div className="section-divider"></div>
            <p className="text-base-content/60">What people say about working with me</p>
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
                <p className="text-base-content/70 text-sm leading-relaxed mb-6">"{item.message}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-base-content/50">{item.role}</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">Whether you need a blockchain solution, an AR experience, or a full-stack app,  I'm here to help bring your vision to life.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="btn bg-white text-primary hover:bg-white/90 gap-2 shadow-lg">
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calendar" className="btn btn-outline border-white text-white hover:bg-white/10 gap-2">
              Schedule a Meeting <Calendar className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/meditation', icon: <Play className="w-6 h-6" />, title: t('nav.meditation', locale), desc: 'Join guided sessions for inner peace', color: 'from-purple-500 to-indigo-500' },
              { href: '/livestream', icon: <Globe className="w-6 h-6" />, title: t('nav.livestream', locale), desc: 'Watch live coding & tech talks', color: 'from-red-500 to-rose-500' },
              { href: '/calendar', icon: <Calendar className="w-6 h-6" />, title: t('nav.calendar', locale), desc: 'View events & schedule meetings', color: 'from-blue-500 to-cyan-500' },
              { href: '/feedback', icon: <Users className="w-6 h-6" />, title: t('nav.feedback', locale), desc: 'Share your experience & rate my work', color: 'from-emerald-500 to-green-500' },
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
