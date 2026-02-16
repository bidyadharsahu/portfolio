'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import {
  LayoutDashboard, FolderKanban, Flower2, Calendar, User, Edit, Save,
  Video, Clock, ChevronRight, ExternalLink, LogOut, Star, X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Tab = 'overview' | 'projects' | 'classes' | 'meetings' | 'profile';

export default function CustomerDashboard() {
  const { locale, user, setUser } = useAppStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    location: '',
    purpose: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role === 'admin') {
      router.push('/dashboard');
    } else {
      setProfileForm({
        full_name: user.full_name || '',
        phone: user.phone || '',
        email: user.email || '',
        location: user.location || '',
        purpose: user.purpose || '',
      });
    }
  }, [user, router]);

  if (!user || user.role === 'admin') return null;

  const handleLogout = () => {
    localStorage.removeItem('portfolio_user');
    setUser(null);
    router.push('/');
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...profileForm };
    localStorage.setItem('portfolio_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const tabs: { key: Tab; icon: any; label: string }[] = [
    { key: 'overview', icon: <LayoutDashboard className="w-4 h-4" />, label: t('dashboard.customer.title', locale) },
    { key: 'projects', icon: <FolderKanban className="w-4 h-4" />, label: t('dashboard.customer.projects', locale) },
    { key: 'classes', icon: <Flower2 className="w-4 h-4" />, label: t('dashboard.customer.classes', locale) },
    { key: 'meetings', icon: <Calendar className="w-4 h-4" />, label: t('dashboard.customer.meetings', locale) },
    { key: 'profile', icon: <User className="w-4 h-4" />, label: t('dashboard.customer.profile', locale) },
  ];

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.customer.title', locale)}</h1>
            <p className="text-base-content/50 text-sm mt-1">Welcome, {user.full_name || user.username}!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              {(user.full_name || user.username)?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-sm">{user.full_name || user.username}</p>
              <p className="text-xs text-base-content/50">Customer</p>
            </div>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm gap-1 ml-2">
              <LogOut className="w-4 h-4" /> {t('nav.logout', locale)}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-56 flex-shrink-0">
            <div className="glass-card p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.key ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'hover:bg-base-200 text-base-content/60'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome card */}
                <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                  <h2 className="text-2xl font-bold mb-2">Welcome to your dashboard! 🎉</h2>
                  <p className="text-base-content/60">Here you can track your projects, enrolled classes, and upcoming meetings with Bidyadhar.</p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Active Projects', value: '0', icon: <FolderKanban className="w-5 h-5" />, color: 'text-blue-500 bg-blue-500/10' },
                    { label: 'Enrolled Classes', value: '0', icon: <Flower2 className="w-5 h-5" />, color: 'text-purple-500 bg-purple-500/10' },
                    { label: 'Upcoming Meetings', value: '0', icon: <Video className="w-5 h-5" />, color: 'text-emerald-500 bg-emerald-500/10' },
                    { label: 'Profile Complete', value: user.full_name && user.email ? '100%' : '60%', icon: <User className="w-5 h-5" />, color: 'text-amber-500 bg-amber-500/10' },
                  ].map((stat, i) => (
                    <div key={i} className="glass-card p-5">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>{stat.icon}</div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-base-content/60">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Browse Projects', href: '/projects', icon: <FolderKanban className="w-5 h-5" />, desc: 'Explore portfolio projects' },
                      { label: 'Join Meditation', href: '/meditation', icon: <Flower2 className="w-5 h-5" />, desc: 'Enroll in upcoming classes' },
                      { label: 'Schedule Meeting', href: '/calendar', icon: <Calendar className="w-5 h-5" />, desc: 'Book a Google Meet session' },
                      { label: 'Watch Livestreams', href: '/livestream', icon: <Video className="w-5 h-5" />, desc: 'Live coding & tech talks' },
                      { label: 'Give Feedback', href: '/feedback', icon: <Star className="w-5 h-5" />, desc: 'Rate website & work' },
                      { label: 'Edit Profile', href: '#', icon: <User className="w-5 h-5" />, desc: 'Update your information', onClick: () => setActiveTab('profile') },
                    ].map((action, i) => (
                      <Link
                        key={i}
                        href={action.href}
                        onClick={(e) => { if (action.onClick) { e.preventDefault(); action.onClick(); }}}
                        className="glass-card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            {action.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{action.label}</p>
                            <p className="text-xs text-base-content/50">{action.desc}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">{t('dashboard.customer.projects', locale)}</h2>
                <div className="glass-card p-12 text-center">
                  <FolderKanban className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No Active Projects Yet</h3>
                  <p className="text-sm text-base-content/50 mt-2 max-w-md mx-auto">
                    Once Bidyadhar assigns a project to you, it will appear here. You can track progress, communicate, and manage deadlines.
                  </p>
                  <Link href="/projects" className="btn btn-primary btn-sm text-white mt-4 gap-1">
                    <ExternalLink className="w-4 h-4" /> Browse Projects
                  </Link>
                </div>
              </div>
            )}

            {/* CLASSES */}
            {activeTab === 'classes' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">{t('dashboard.customer.classes', locale)}</h2>
                <div className="glass-card p-12 text-center">
                  <Flower2 className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No Enrolled Classes</h3>
                  <p className="text-sm text-base-content/50 mt-2 max-w-md mx-auto">
                    Join a meditation or wellness class to see it here. You'll get Google Meet links and reminders.
                  </p>
                  <Link href="/meditation" className="btn btn-primary btn-sm text-white mt-4 gap-1">
                    <Flower2 className="w-4 h-4" /> Browse Classes
                  </Link>
                </div>
              </div>
            )}

            {/* MEETINGS */}
            {activeTab === 'meetings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">{t('dashboard.customer.meetings', locale)}</h2>
                <div className="glass-card p-12 text-center">
                  <Calendar className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No Upcoming Meetings</h3>
                  <p className="text-sm text-base-content/50 mt-2 max-w-md mx-auto">
                    Schedule a Google Meet session with Bidyadhar through the calendar to discuss your project requirements.
                  </p>
                  <Link href="/calendar" className="btn btn-primary btn-sm text-white mt-4 gap-1">
                    <Calendar className="w-4 h-4" /> Open Calendar
                  </Link>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{t('dashboard.customer.profile', locale)}</h2>
                  {!editingProfile && (
                    <button onClick={() => setEditingProfile(true)} className="btn btn-primary btn-sm text-white gap-1">
                      <Edit className="w-4 h-4" /> Edit Profile
                    </button>
                  )}
                </div>

                <div className="glass-card p-8 space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
                      {(user.full_name || user.username)?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{user.full_name || user.username}</h3>
                      <p className="text-sm text-base-content/50">@{user.username}</p>
                      <p className="text-xs text-base-content/40">Member since {new Date(user.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                    </div>
                  </div>

                  {editingProfile ? (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                          <input type="text" value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} className="input input-bordered w-full" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Phone</label>
                          <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="input input-bordered w-full" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email</label>
                          <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="input input-bordered w-full" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Location</label>
                          <input type="text" value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} className="input input-bordered w-full" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Purpose of Visit</label>
                        <textarea value={profileForm.purpose} onChange={(e) => setProfileForm({ ...profileForm, purpose: e.target.value })} className="textarea textarea-bordered w-full" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingProfile(false)} className="btn btn-ghost flex-1">Cancel</button>
                        <button onClick={handleSaveProfile} className="btn btn-primary text-white flex-1 gap-1">
                          <Save className="w-4 h-4" /> Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { label: 'Full Name', value: user.full_name },
                        { label: 'Username', value: user.username },
                        { label: 'Email', value: user.email },
                        { label: 'Phone', value: user.phone },
                        { label: 'Location', value: user.location },
                        { label: 'Purpose', value: user.purpose },
                      ].map((field, i) => (
                        <div key={i}>
                          <p className="text-xs text-base-content/40 uppercase tracking-wider">{field.label}</p>
                          <p className="font-medium mt-1">{field.value || <span className="text-base-content/30 italic">Not provided</span>}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
