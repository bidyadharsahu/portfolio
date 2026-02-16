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
    description: 'A blockchain-based decentralized carpooling/ride-sharing platform. It connects drivers with passengers through smart contracts for secure, transparent payments and real-time ride tracking. Built to revolutionize transportation in India.',
    tech: ['Solidity', 'React', 'Node.js', 'Web3.js', 'Ethereum', 'IPFS'],
    live_url: '#',
    github_url: 'https://github.com/bidyadharsahu',
    category: 'Web3 / Blockchain',
    icon: <Rocket className="w-10 h-10" />,
    color: 'from-rose-500 to-orange-500',
    features: ['Decentralized ride matching', 'Smart contract payments', 'Real-time GPS tracking', 'Driver & rider ratings', 'Fare estimation via oracle'],
  },
  {
    id: '2',
    title: 'NetrikXR AR App',
    slug: 'netrikxr',
    description: 'An augmented reality application that delivers immersive AR experiences on mobile devices. From interactive product visualizations to immersive educational content, NetrikXR pushes the boundaries of what is possible on a smartphone.',
    tech: ['Unity', 'ARCore', 'ARKit', 'C#', 'Flutter', 'Firebase'],
    live_url: '#',
    github_url: 'https://github.com/bidyadharsahu',
    category: 'AR / VR',
    icon: <Glasses className="w-10 h-10" />,
    color: 'from-violet-500 to-purple-500',
    features: ['Marker-based AR detection', 'Image & object recognition', 'Real-time 3D rendering', 'Cross-platform support', 'Cloud anchors for shared AR'],
  },
  {
    id: '3',
    title: 'QR Code Menu Ordering',
    slug: 'qr-menu',
    description: 'A contactless digital menu & ordering system for restaurants. Customers scan a QR code at their table, browse the full menu with images and descriptions, customize orders, and pay — all from their phone.',
    tech: ['Next.js', 'Supabase', 'Tailwind CSS', 'Stripe', 'QR API', 'PWA'],
    live_url: '#',
    github_url: 'https://github.com/bidyadharsahu',
    category: 'Full-Stack',
    icon: <Zap className="w-10 h-10" />,
    color: 'from-emerald-500 to-teal-500',
    features: ['Dynamic QR code generation', 'Real-time order management', 'Kitchen display system', 'Multi-language menu', 'Analytics dashboard'],
  },
  {
    id: '4',
    title: 'Healthcare for Rural Communities',
    slug: 'rural-health',
    description: 'A telemedicine platform designed for rural India — enabling remote consultations, health record management, and medicine delivery tracking for communities with limited healthcare access.',
    tech: ['React', 'AWS Lambda', 'DynamoDB', 'Amplify', 'Cognito', 'S3'],
    live_url: '#',
    github_url: 'https://github.com/bidyadharsahu',
    category: 'Cloud / AWS',
    icon: <Cloud className="w-10 h-10" />,
    color: 'from-sky-500 to-blue-500',
    features: ['Video consultations', 'Digital health records', 'Medicine tracking', 'Multi-language support', 'Offline-first capabilities'],
  },
  {
    id: '5',
    title: 'DeFi Yield Aggregator',
    slug: 'defi-yield',
    description: 'A DeFi protocol that automatically optimizes yield farming across multiple chains by routing liquidity to the highest-earning pools using Chainlink price feeds.',
    tech: ['Solidity', 'Hardhat', 'Chainlink', 'TheGraph', 'React', 'ethers.js'],
    live_url: '#',
    github_url: 'https://github.com/bidyadharsahu',
    category: 'Web3 / DeFi',
    icon: <Blocks className="w-10 h-10" />,
    color: 'from-amber-500 to-yellow-500',
    features: ['Auto-compounding', 'Multi-chain support', 'Chainlink oracles', 'Gas optimization', 'Portfolio analytics'],
  },
  {
    id: '6',
    title: 'Portfolio Platform (This Site)',
    slug: 'portfolio',
    description: 'A full-featured portfolio/CRM platform with multilingual support (English, Hindi, Odia, Sanskrit), chatbot, donation system, meditation classes, livestreaming, and admin CRM.',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'TypeScript', 'Framer Motion'],
    live_url: '#',
    github_url: 'https://github.com/bidyadharsahu',
    category: 'Full-Stack',
    icon: <Code2 className="w-10 h-10" />,
    color: 'from-pink-500 to-rose-500',
    features: ['4 language support', 'Real-time chat bot', 'Admin CRM dashboard', 'Customer portal', 'Calendar & scheduling'],
  },
];

const categories = ['All', 'Web3 / Blockchain', 'AR / VR', 'Full-Stack', 'Cloud / AWS', 'Web3 / DeFi'];

export default function ProjectsPage() {
  const { locale } = useAppStore();
  const [filter, setFilter] = useState('All');
  const [previewProject, setPreviewProject] = useState<typeof allProjects[0] | null>(null);

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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewProject(null)}>
          <div className="bg-base-100 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className={`h-48 bg-gradient-to-br ${previewProject.color} flex items-center justify-center relative`}>
              <div className="text-white/80">{previewProject.icon}</div>
              <button onClick={() => setPreviewProject(null)} className="absolute top-4 right-4 btn btn-circle btn-sm bg-white/20 text-white border-0 hover:bg-white/30">
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

              <div className="flex gap-3 pt-4 border-t border-base-300">
                <a href={previewProject.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-white gap-2 flex-1">
                  <ExternalLink className="w-4 h-4" /> View Live Project
                </a>
                {previewProject.github_url && (
                  <a href={previewProject.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline gap-2 flex-1">
                    <Github className="w-4 h-4" /> View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
