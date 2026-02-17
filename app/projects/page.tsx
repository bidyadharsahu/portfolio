'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { ExternalLink, Github, Eye, X, Rocket, Glasses, Zap, Code2, Blocks, Cloud } from 'lucide-react';
import Link from 'next/link';

const allProjects = [
  {
    id: '1',
    title: 'Namaste Rides',
    slug: 'namaste-rides',
    description: 'A next-generation ride-hailing platform redefining the way you ride. Fair, transparent, and driver-first — with low commissions, smart safety technology, 24/7 availability, and services including corporate transport, airport pickups, city tours, and special events. Growing across 3+ cities.',
    tech: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Vercel', 'REST API'],
    live_url: 'https://namaste-ruby.vercel.app/',
    github_url: 'https://github.com/bidyadharsahu/namaste',
    category: 'Full-Stack',
    icon: <Rocket className="w-10 h-10" />,
    color: 'from-rose-500 to-orange-500',
    features: ['Real-time ride matching & tracking', 'Driver-first low commission model', 'Corporate transport & airport services', 'City tours & special event bookings', 'Multi-role support (rider, driver, admin)'],
  },
  {
    id: '2',
    title: 'NetrikXR AR App',
    slug: 'netrikxr',
    description: 'Web-based augmented reality experiences that work instantly — no apps to download. Point your phone at images, products, or packaging and watch content come alive. Offers AR photo frames, AR business cards, AR restaurant menus, 3D product visualization, and custom AR experiences for businesses.',
    tech: ['Next.js', 'WebAR', 'Three.js', 'A-Frame', 'Tailwind CSS', 'Vercel'],
    live_url: 'https://web-ar-phi.vercel.app/',
    github_url: 'https://github.com/bidyadharsahu/webAR',
    category: 'AR / VR',
    icon: <Glasses className="w-10 h-10" />,
    color: 'from-violet-500 to-purple-500',
    features: ['Browser-based AR — no app needed', 'AR photo frames for living memories', 'AR business cards with video portfolios', 'Restaurant menus with 3D food previews', 'Custom enterprise AR solutions'],
  },
  {
    id: '3',
    title: 'QR Code Menu Ordering',
    slug: 'qr-menu',
    description: 'A premium QR code ordering system for modern restaurants. Customers scan a QR code at their table, browse the full menu with images and descriptions, customize orders, and place them — all contactless from their phone. Includes a staff admin panel for real-time order management.',
    tech: ['Next.js', 'Supabase', 'Tailwind CSS', 'QR API', 'PWA', 'Vercel'],
    live_url: 'https://qr-cod-shop.vercel.app/',
    github_url: 'https://github.com/bidyadharsahu/qr_cod_shop',
    category: 'Cloud',
    icon: <Zap className="w-10 h-10" />,
    color: 'from-emerald-500 to-teal-500',
    features: ['Dynamic QR code table scanning', 'Real-time order management dashboard', 'Staff admin login & kitchen display', 'Multi-language menu support', 'Contactless end-to-end ordering'],
  },
  {
    id: '4',
    title: 'Portfolio Platform (This Site)',
    slug: 'portfolio',
    description: 'A full-featured portfolio & CRM platform with multilingual support (English, Hindi, Odia, Sanskrit), AI chatbot, donation system, meditation classes, livestreaming, calendar, and admin CRM dashboard for managing freelance clients.',
    tech: ['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Zustand', 'Vercel'],
    live_url: 'https://bidyadharsahu.tech',
    github_url: 'https://github.com/bidyadharsahu/portfolio',
    category: 'Cloud',
    icon: <Code2 className="w-10 h-10" />,
    color: 'from-pink-500 to-rose-500',
    features: ['4-language multilingual support', 'Real-time AI chatbot', 'Admin CRM dashboard', 'Customer portal & authentication', 'Calendar scheduling & event management'],
  },
];

const categories = ['All', 'Full-Stack', 'AR / VR', 'Cloud'];

export default function ProjectsPage() {
  const { locale } = useAppStore();
  const [filter, setFilter] = useState('All');
  const [previewProject, setPreviewProject] = useState<typeof allProjects[0] | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);

  const filtered = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-base-200/50 to-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">{t('projects.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('projects.subtitle', locale)}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-base-200 text-base-content/60 hover:bg-base-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <div key={project.id} className="group glass-card overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              {/* Gradient header with icon */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative`}>
                <div className="text-white/80">{project.icon}</div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">{project.category}</div>
                {/* Preview overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPreviewProject(project)}
                    className="btn btn-sm bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 gap-1"
                  >
                    <Eye className="w-4 h-4" /> {t('projects.preview', locale)}
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-base-200 rounded-md text-base-content/70">{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-base-200 rounded-md text-base-content/50">+{project.tech.length - 4}</span>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm text-white gap-1 flex-1">
                    <ExternalLink className="w-3.5 h-3.5" /> {t('projects.viewLive', locale)}
                  </a>
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm gap-1">
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setPreviewProject(null); setShowLivePreview(false); }}>
          <div className={`bg-base-100 rounded-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${showLivePreview ? 'max-w-6xl' : 'max-w-3xl'}`} onClick={(e) => e.stopPropagation()}>
            {showLivePreview ? (
              <>
                <div className="flex items-center justify-between p-4 border-b border-base-300">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${previewProject.color} flex items-center justify-center text-white`}>
                      {previewProject.icon}
                    </div>
                    <div>
                      <h3 className="font-bold">{previewProject.title}</h3>
                      <p className="text-xs text-base-content/60">{previewProject.live_url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setShowLivePreview(false)} className="btn btn-ghost btn-sm">
                      Back to Details
                    </button>
                    <a href={previewProject.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm text-white gap-1">
                      <ExternalLink className="w-3.5 h-3.5" /> Open Full Site
                    </a>
                    <button onClick={() => { setPreviewProject(null); setShowLivePreview(false); }} className="btn btn-circle btn-sm btn-ghost">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="relative bg-base-200 w-full" style={{ height: '70vh' }}>
                  <iframe
                    src={previewProject.live_url}
                    className="w-full h-full border-0 rounded-b-2xl"
                    title={`${previewProject.title} Preview`}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              </>
            ) : (
              <>
                <div className={`h-48 bg-gradient-to-br ${previewProject.color} flex items-center justify-center relative`}>
                  <div className="text-white/80">{previewProject.icon}</div>
                  <button onClick={() => { setPreviewProject(null); setShowLivePreview(false); }} className="absolute top-4 right-4 btn btn-circle btn-sm bg-white/20 text-white border-0 hover:bg-white/30">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">{previewProject.category}</span>
                    <h2 className="text-2xl font-bold mt-3">{previewProject.title}</h2>
                  </div>
                  <p className="text-base-content/70 leading-relaxed">{previewProject.description}</p>

                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {previewProject.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-base-content/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewProject.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 bg-base-200 rounded-lg text-sm">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-base-300">
                    <button onClick={() => setShowLivePreview(true)} className="btn btn-secondary gap-2 flex-1">
                      <Eye className="w-4 h-4" /> {t('projects.preview', locale)}
                    </button>
                    <a href={previewProject.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-white gap-2 flex-1">
                      <ExternalLink className="w-4 h-4" /> {t('projects.viewLive', locale)}
                    </a>
                    {previewProject.github_url && (
                      <a href={previewProject.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline gap-2 flex-1">
                        <Github className="w-4 h-4" /> {t('projects.viewCode', locale)}
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
