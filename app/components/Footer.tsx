'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';

const Footer = () => {
  const { locale } = useAppStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="animated-border h-1"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl"><span className="text-primary">Bidyadhar</span>.me</span>
            </div>
            <p className="text-neutral-content/60 text-sm leading-relaxed">{t('footer.bio', locale)}</p>
            <div className="flex gap-3">
              <a href="https://github.com/bidyadharsahu" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"><Github className="w-4 h-4" /></a>
              <a href="https://in.linkedin.com/in/bidyadhar-sahu" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"><Linkedin className="w-4 h-4" /></a>
              <a href="mailto:bidyadhar.sahu.cse.2022@nist.edu" className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"><Mail className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.quickLinks', locale)}</h4>
            <ul className="space-y-2">
              {[{href:'/projects', label:t('nav.projects',locale)},{href:'/about', label:t('nav.about',locale)},{href:'/meditation', label:t('nav.meditation',locale)},{href:'/livestream', label:t('nav.livestream',locale)}].map(link => (
                <li key={link.href}><Link href={link.href} className="text-neutral-content/60 hover:text-primary transition-colors text-sm">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.servicesTitle', locale)}</h4>
            <ul className="space-y-2 text-sm text-neutral-content/60">
              <li>{t('footer.service.webmobile', locale)}</li>
              <li>{t('footer.service.blockchain', locale)}</li>
              <li>{t('footer.service.arvr', locale)}</li>
              <li>{t('footer.service.cloud', locale)}</li>
              <li>{t('footer.service.consulting', locale)}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.connect', locale)}</h4>
            <ul className="space-y-2 text-sm text-neutral-content/60">
              <li>📍 {t('footer.location', locale)}</li>
              <li>📧 bidyadhar.sahu.cse.2022@nist.edu</li>
              <li className="pt-2"><Link href="/donate" className="btn btn-primary btn-sm text-white">{t('nav.donate', locale)}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-content/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-content/40 flex items-center gap-1">
            {t('footer.tagline', locale)} <Heart className="w-3 h-3 text-primary fill-primary" /> &copy; {new Date().getFullYear()} {t('footer.rights', locale)}
          </p>
          <button onClick={scrollToTop} className="btn btn-circle btn-sm btn-ghost"><ArrowUp className="w-4 h-4" /></button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
