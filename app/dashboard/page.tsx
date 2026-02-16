'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import {
  LayoutDashboard, FolderKanban, Users, MessageSquare, Calendar, Gift, Radio, Flower2,
  BarChart3, Plus, Edit, Trash2, Eye, Search, Filter, ChevronDown, ExternalLink,
  TrendingUp, DollarSign, Star, Clock, X, Save,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';

type Tab = 'overview' | 'projects' | 'customers' | 'feedback' | 'events' | 'donations' | 'streams' | 'classes';

// Sample CRM data (customers kept as sample, donations/feedback now realtime)
const sampleCustomers = [
  { id: '1', username: 'rajesh_k', full_name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 9876543210', location: 'Mumbai', purpose: 'Need a blockchain solution for supply chain', status: 'active', created_at: '2026-01-10' },
  { id: '2', username: 'priya_s', full_name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 8765432109', location: 'Delhi', purpose: 'QR menu system for my restaurant chain', status: 'active', created_at: '2026-01-15' },
  { id: '3', username: 'amit_p', full_name: 'Amit Patel', email: 'amit@example.com', phone: '+91 7654321098', location: 'Bangalore', purpose: 'Smart contract audit for our DeFi platform', status: 'completed', created_at: '2025-12-20' },
  { id: '4', username: 'sneha_r', full_name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 6543210987', location: 'Hyderabad', purpose: 'AR app for real estate showcase', status: 'lead', created_at: '2026-02-01' },
  { id: '5', username: 'vikram_m', full_name: 'Vikram Mishra', email: 'vikram@example.com', phone: '+91 5432109876', location: 'Pune', purpose: 'Full portfolio website like yours', status: 'lead', created_at: '2026-02-12' },
];

export default function AdminDashboard() {
  const { locale, user } = useAppStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [showAddProject, setShowAddProject] = useState(false);

  // Realtime state
  const [donations, setDonations] = useState<any[]>([]);
  const [feedbackData, setFeedbackData] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>(sampleCustomers);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    const supabase = createClient();

    // Fetch donations
    supabase.from('donations').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setDonations(data);
    });

    // Fetch feedback
    supabase.from('feedback').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setFeedbackData(data);
    });

    // Fetch customers
    supabase.from('users').select('*').neq('role', 'admin').order('created_at', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setCustomers(data);
    });

    // Realtime: donations
    const donCh = supabase.channel('admin-donations').on(
      'postgres_changes', { event: '*', schema: 'public', table: 'donations' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setDonations((prev) => [payload.new, ...prev]);
          toast.success(`New donation: ₹${(payload.new as any).amount} from ${(payload.new as any).donor_name}`);
        } else if (payload.eventType === 'DELETE') {
          setDonations((prev) => prev.filter((d) => d.id !== (payload.old as any).id));
        }
      }
    ).subscribe();

    // Realtime: feedback
    const fbCh = supabase.channel('admin-feedback').on(
      'postgres_changes', { event: '*', schema: 'public', table: 'feedback' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setFeedbackData((prev) => [payload.new, ...prev]);
          toast.success(`New feedback from ${(payload.new as any).name}`);
        }
      }
    ).subscribe();

    // Realtime: users
    const userCh = supabase.channel('admin-users').on(
      'postgres_changes', { event: '*', schema: 'public', table: 'users' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setCustomers((prev) => [payload.new, ...prev]);
          toast.success(`New user registered: ${(payload.new as any).full_name || (payload.new as any).username}`);
        }
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(donCh);
      supabase.removeChannel(fbCh);
      supabase.removeChannel(userCh);
    };
  }, [user, router]);

  if (!user || user.role !== 'admin') return null;

  const tabs: { key: Tab; icon: any; label: string }[] = [
    { key: 'overview', icon: <BarChart3 className="w-4 h-4" />, label: t('dashboard.admin.analytics', locale) },
    { key: 'projects', icon: <FolderKanban className="w-4 h-4" />, label: t('dashboard.admin.projects', locale) },
    { key: 'customers', icon: <Users className="w-4 h-4" />, label: t('dashboard.admin.customers', locale) },
    { key: 'feedback', icon: <MessageSquare className="w-4 h-4" />, label: t('dashboard.admin.feedback', locale) },
    { key: 'events', icon: <Calendar className="w-4 h-4" />, label: t('dashboard.admin.events', locale) },
    { key: 'donations', icon: <Gift className="w-4 h-4" />, label: t('dashboard.admin.donations', locale) },
    { key: 'streams', icon: <Radio className="w-4 h-4" />, label: t('dashboard.admin.streams', locale) },
    { key: 'classes', icon: <Flower2 className="w-4 h-4" />, label: t('dashboard.admin.classes', locale) },
  ];

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = (c.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.purpose || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = customerFilter === 'all' || c.status === customerFilter;
    return matchesSearch && matchesFilter;
  });

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const avgRating = feedbackData.length > 0 ? (feedbackData.reduce((s, f) => s + (f.website_rating || 0), 0) / feedbackData.length).toFixed(1) : '—';

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard.admin.title', locale)}</h1>
            <p className="text-base-content/50 text-sm mt-1">Welcome back, Bidyadhar! Manage everything from here.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              B
            </div>
            <div>
              <p className="font-semibold text-sm">Bidyadhar Sahu</p>
              <p className="text-xs text-base-content/50">Admin</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Tabs */}
          <div className="lg:w-60 flex-shrink-0">
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
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Projects', value: '4', icon: <FolderKanban className="w-5 h-5" />, color: 'text-blue-500 bg-blue-500/10', change: 'Active projects' },
                    { label: 'Customers', value: String(customers.length), icon: <Users className="w-5 h-5" />, color: 'text-emerald-500 bg-emerald-500/10', change: 'Realtime synced' },
                    { label: 'Total Donations', value: `₹${totalDonations.toLocaleString()}`, icon: <Gift className="w-5 h-5" />, color: 'text-amber-500 bg-amber-500/10', change: `${donations.length} supporters` },
                    { label: 'Avg. Rating', value: String(avgRating), icon: <Star className="w-5 h-5" />, color: 'text-purple-500 bg-purple-500/10', change: `Based on ${feedbackData.length} reviews` },
                  ].map((stat, i) => (
                    <div key={i} className="glass-card p-5">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>{stat.icon}</div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-base-content/60">{stat.label}</p>
                      <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6">
                  <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { text: 'New lead: Vikram Mishra from Pune', time: '2 hours ago', icon: <Users className="w-4 h-4 text-blue-500" /> },
                      { text: 'Donation received: ₹2,500 from Tech Community', time: '6 days ago', icon: <Gift className="w-4 h-4 text-amber-500" /> },
                      { text: 'Feedback: ★★★★★ from Sneha R.', time: '1 week ago', icon: <Star className="w-4 h-4 text-purple-500" /> },
                      { text: 'Project completed: Smart Contract Audit for Amit', time: '2 weeks ago', icon: <FolderKanban className="w-4 h-4 text-emerald-500" /> },
                      { text: 'New customer: Sneha Reddy wants AR app', time: '2 weeks ago', icon: <Users className="w-4 h-4 text-blue-500" /> },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-base-300/50 last:border-0">
                        <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.text}</p>
                          <p className="text-xs text-base-content/40">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{t('dashboard.admin.projects', locale)}</h2>
                  <button onClick={() => setShowAddProject(true)} className="btn btn-primary btn-sm text-white gap-1">
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>
                <div className="grid gap-4">
                  {['Namaste Rides', 'NetrikXR AR App', 'QR Code Menu Ordering', 'Healthcare Platform', 'DeFi Yield Aggregator', 'Portfolio Platform'].map((project, i) => (
                    <div key={i} className="glass-card p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold">
                          {project[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold">{project}</h3>
                          <p className="text-xs text-base-content/50">{['Web3', 'AR/VR', 'Full-Stack', 'Cloud', 'DeFi', 'Full-Stack'][i]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          i < 3 ? 'bg-green-100 text-green-600' : i < 5 ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {i < 3 ? 'Active' : i < 5 ? 'Completed' : 'In Progress'}
                        </span>
                        <button className="btn btn-ghost btn-xs"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="btn btn-ghost btn-xs text-error"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Project Modal */}
                {showAddProject && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-2xl max-w-lg w-full p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Add New Project</h3>
                        <button onClick={() => setShowAddProject(false)} className="btn btn-ghost btn-sm btn-circle"><X className="w-4 h-4" /></button>
                      </div>
                      <input type="text" placeholder="Project Title" className="input input-bordered w-full" />
                      <textarea placeholder="Description" className="textarea textarea-bordered w-full" />
                      <input type="text" placeholder="Tech Stack (comma separated)" className="input input-bordered w-full" />
                      <input type="url" placeholder="Live URL" className="input input-bordered w-full" />
                      <input type="url" placeholder="GitHub URL" className="input input-bordered w-full" />
                      <select className="select select-bordered w-full">
                        <option>Category</option>
                        <option>Web3 / Blockchain</option>
                        <option>AR / VR</option>
                        <option>Full-Stack</option>
                        <option>Cloud / AWS</option>
                      </select>
                      <div className="flex gap-2">
                        <button onClick={() => setShowAddProject(false)} className="btn btn-ghost flex-1">Cancel</button>
                        <button onClick={() => { setShowAddProject(false); toast.success('Project added!'); }} className="btn btn-primary text-white flex-1 gap-1">
                          <Save className="w-4 h-4" /> Save Project
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CUSTOMERS CRM */}
            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{t('dashboard.admin.customers', locale)}</h2>
                  <span className="text-sm text-base-content/50">{filteredCustomers.length} customers</span>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search customers..."
                      className="input input-bordered w-full pl-10 input-sm"
                    />
                  </div>
                  <select
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                    className="select select-bordered select-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="lead">Lead</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Customer Table */}
                <div className="glass-card overflow-x-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="hover">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                                {customer.full_name[0]}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{customer.full_name}</p>
                                <p className="text-xs text-base-content/40">@{customer.username}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs">{customer.email}</p>
                            <p className="text-xs text-base-content/40">{customer.phone}</p>
                          </td>
                          <td><p className="text-xs max-w-[200px] truncate">{customer.purpose}</p></td>
                          <td>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              customer.status === 'active' ? 'bg-green-100 text-green-600' :
                              customer.status === 'lead' ? 'bg-blue-100 text-blue-600' :
                              customer.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="text-xs text-base-content/50">{new Date(customer.created_at).toLocaleDateString('en-IN', { dateStyle: 'short' })}</td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-ghost btn-xs"><Eye className="w-3.5 h-3.5" /></button>
                              <button className="btn btn-ghost btn-xs"><Edit className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FEEDBACK */}
            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">{t('dashboard.admin.feedback', locale)} <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live"></span></h2>
                {feedbackData.length === 0 ? (
                  <div className="glass-card p-12 text-center"><MessageSquare className="w-12 h-12 text-base-content/20 mx-auto mb-3" /><p className="text-base-content/50">No feedback yet</p></div>
                ) : (
                <div className="grid gap-4">
                  {feedbackData.map((fb) => (
                    <div key={fb.id} className="glass-card p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {fb.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-sm">{fb.name}</p>
                            <p className="text-xs text-base-content/40">{new Date(fb.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < fb.website_rating ? 'text-amber-400 fill-amber-400' : 'text-base-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-base-content/70 mt-2">"{fb.message}"</p>
                        <div className="flex gap-3 mt-2 text-xs text-base-content/50">
                          <span>Website: {fb.website_rating || '—'}/5</span>
                          <span>Work: {fb.work_rating || '—'}/5</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}

            {/* DONATIONS */}
            {activeTab === 'donations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">{t('dashboard.admin.donations', locale)} <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live"></span></h2>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{totalDonations.toLocaleString()}</p>
                    <p className="text-xs text-base-content/50">{donations.length} donations</p>
                  </div>
                </div>
                {donations.length === 0 ? (
                  <div className="glass-card p-12 text-center"><Gift className="w-12 h-12 text-base-content/20 mx-auto mb-3" /><p className="text-base-content/50">No donations yet</p></div>
                ) : (
                <div className="grid gap-4">
                  {donations.map((donation) => (
                    <div key={donation.id} className="glass-card p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                          <Gift className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{donation.donor_name}</p>
                          <p className="text-xs text-base-content/50">{donation.message || '—'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">₹{(donation.amount || 0).toLocaleString()}</p>
                        <p className="text-xs text-base-content/40">{new Date(donation.created_at).toLocaleDateString('en-IN', { dateStyle: 'short' })}</p>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}

            {/* EVENTS, STREAMS, CLASSES — Placeholder tabs */}
            {(activeTab === 'events' || activeTab === 'streams' || activeTab === 'classes') && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {activeTab === 'events' ? t('dashboard.admin.events', locale) :
                     activeTab === 'streams' ? t('dashboard.admin.streams', locale) :
                     t('dashboard.admin.classes', locale)}
                  </h2>
                  <button className="btn btn-primary btn-sm text-white gap-1">
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                </div>
                <div className="glass-card p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4">
                    {activeTab === 'events' ? <Calendar className="w-8 h-8 text-base-content/30" /> :
                     activeTab === 'streams' ? <Radio className="w-8 h-8 text-base-content/30" /> :
                     <Flower2 className="w-8 h-8 text-base-content/30" />}
                  </div>
                  <h3 className="text-lg font-semibold">Manage {activeTab === 'events' ? 'Events' : activeTab === 'streams' ? 'Livestreams' : 'Meditation Classes'}</h3>
                  <p className="text-sm text-base-content/50 mt-2">
                    Create, edit, and schedule {activeTab}. Data will sync with Supabase once connected.
                  </p>
                  <button onClick={() => toast.success('Connect Supabase to enable full management!')} className="btn btn-primary btn-sm text-white mt-4 gap-1">
                    <Plus className="w-4 h-4" /> Create First Entry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
