'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { User, Lock, Mail, Phone, MapPin, FileText, Eye, EyeOff, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { locale, setUser } = useAppStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    email: '',
    location: '',
    purpose: '',
  });

  const updateForm = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleStep1 = () => {
    if (!form.username.trim() || !form.password.trim()) {
      toast.error('Username and password are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      localStorage.setItem('portfolio_user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Account created successfully! 🎉');
      router.push('/customer');
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mx-auto mb-4">
              <UserPlus className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold">{t('auth.register', locale)}</h1>
            <p className="text-base-content/50 text-sm">
              {step === 1 ? 'Create your credentials' : 'Tell us about yourself'}
            </p>
            {/* Progress */}
            <div className="flex gap-2 justify-center pt-2">
              <div className={`w-12 h-1.5 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-base-300'}`}></div>
              <div className={`w-12 h-1.5 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-base-300'}`}></div>
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.username', locale)} *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input type="text" value={form.username} onChange={(e) => updateForm('username', e.target.value)} placeholder="Choose a username" className="input input-bordered w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.password', locale)} *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => updateForm('password', e.target.value)} placeholder="Create a password" className="input input-bordered w-full pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.confirmPassword', locale)} *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input type="password" value={form.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)} placeholder="Confirm password" className="input input-bordered w-full pl-10" />
                </div>
              </div>
              <button onClick={handleStep1} className="btn btn-primary w-full text-white">Next Step →</button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.fullName', locale)} *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input type="text" value={form.full_name} onChange={(e) => updateForm('full_name', e.target.value)} placeholder="Your full name" className="input input-bordered w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.phone', locale)}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input type="tel" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="Phone number" className="input input-bordered w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.email', locale)}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="Email address" className="input input-bordered w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.location', locale)}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input type="text" value={form.location} onChange={(e) => updateForm('location', e.target.value)} placeholder="Your location" className="input input-bordered w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">{t('auth.purpose', locale)}</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-base-content/40" />
                  <textarea value={form.purpose} onChange={(e) => updateForm('purpose', e.target.value)} placeholder="Why are you visiting? (e.g., looking for a developer, interested in meditation classes, exploring projects...)" className="textarea textarea-bordered w-full pl-10 min-h-[80px]" />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="btn btn-ghost flex-1">← Back</button>
                <button type="submit" disabled={loading} className="btn btn-primary text-white flex-1 gap-2">
                  {loading ? <span className="loading loading-spinner loading-sm"></span> : <UserPlus className="w-4 h-4" />}
                  {t('auth.registerBtn', locale)}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-base-content/50">
            {t('auth.hasAccount', locale)}{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">{t('auth.login', locale)}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
