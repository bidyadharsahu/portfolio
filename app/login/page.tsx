'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { locale, setUser } = useAppStore();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error('Please enter username and password');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      localStorage.setItem('portfolio_user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success(data.message || 'Welcome back!');
      router.push(data.user.role === 'admin' ? '/dashboard' : '/customer');
    } catch {
      toast.error('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 sacred-pattern">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{t('auth.login', locale)}</h1>
            <p className="text-base-content/50 text-sm">{t('auth.welcome', locale)}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('auth.username', locale)}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('placeholder.username', locale)}
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('auth.password', locale)}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('placeholder.password', locale)}
                  className="input input-bordered w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full text-white gap-2">
              {loading ? <span className="loading loading-spinner loading-sm"></span> : <LogIn className="w-4 h-4" />}
              {t('auth.loginBtn', locale)}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50">
            {t('auth.noAccount', locale)}{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              {t('auth.register', locale)}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
