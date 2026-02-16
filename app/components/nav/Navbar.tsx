'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t, localeNames, type Locale } from '@/lib/i18n';
import DarkModeToggle from '../DarkModeToggle';
import { Menu, X, Globe, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, user, setUser } = useAppStore();

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('portfolio_user');
    setUser(null);
    setMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.home', locale), href: '/' },
    { label: t('nav.projects', locale), href: '/projects' },
    { label: t('nav.about', locale), href: '/about' },
    { label: t('nav.meditation', locale), href: '/meditation' },
    { label: t('nav.livestream', locale), href: '/livestream' },
    { label: t('nav.calendar', locale), href: '/calendar' },
    { label: t('nav.donate', locale), href: '/donate' },
    { label: t('nav.feedback', locale), href: '/feedback' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-xl bg-base-100/80 shadow-lg border-b border-base-300/50' : 'bg-base-100/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
            <span className="font-bold text-xl group-hover:scale-105 transition-transform">
              <span className="text-primary">Bidyadhar</span><span className="text-base-content/50">.tech</span>
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-base-content/70 hover:text-primary rounded-lg hover:bg-base-200/50 transition-all">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="btn btn-ghost btn-sm gap-1">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-xs">{localeNames[locale]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-base-100 border border-base-300 rounded-xl shadow-xl p-2 min-w-[140px] z-50">
                  {(Object.keys(localeNames) as Locale[]).map((loc) => (
                    <button key={loc} onClick={() => { setLocale(loc); setLangOpen(false); }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-base-200 transition-colors ${locale === loc ? 'bg-primary/10 text-primary font-medium' : ''}`}>
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <DarkModeToggle />
            {user ? (
              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-sm gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                    {user.full_name?.[0] || user.username?.[0] || 'U'}
                  </div>
                  <span className="hidden sm:inline text-sm">{user.username}</span>
                </button>
                <ul className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-xl border border-base-300 w-52 mt-2 z-50">
                  <li><Link href={user.role === 'admin' ? '/dashboard' : '/customer'}><LayoutDashboard className="w-4 h-4" />{t('nav.dashboard', locale)}</Link></li>
                  <li><button onClick={handleLogout}><LogOut className="w-4 h-4" />{t('nav.logout', locale)}</button></li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary btn-sm text-white gap-1">
                <User className="w-4 h-4" /><span className="hidden sm:inline">{t('nav.login', locale)}</span>
              </Link>
            )}
            <button className="xl:hidden btn btn-ghost btn-sm" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="xl:hidden bg-base-100 border-t border-base-300 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-base-content/70 hover:text-primary hover:bg-base-200 rounded-xl transition-all">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
