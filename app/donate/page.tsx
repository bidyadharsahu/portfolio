'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Heart, Coffee, Gift, Sparkles, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

const presetAmounts = [100, 500, 1000, 2500, 5000, 10000];

export default function DonatePage() {
  const { locale, user } = useAppStore();
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [donorName, setDonorName] = useState(user?.full_name || '');
  const [donated, setDonated] = useState(false);

  const handleDonate = () => {
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!donorName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setDonated(true);
    toast.success(t('donate.thanks', locale));
  };

  if (donated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sacred-pattern">
        <div className="glass-card p-12 text-center max-w-md space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold">{t('donate.thanks', locale)}</h2>
          <p className="text-base-content/60">Your generous contribution of ₹{customAmount || amount} will help fuel innovation and keep open-source projects alive.</p>
          <button onClick={() => setDonated(false)} className="btn btn-primary text-white">Donate Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-amber-900/20 via-base-100 to-orange-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{t('donate.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('donate.subtitle', locale)}</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card p-8 space-y-8">
          {/* Impact cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Coffee className="w-5 h-5" />, label: 'Buy a Coffee', amount: '₹100' },
              { icon: <Heart className="w-5 h-5" />, label: 'Support a Project', amount: '₹1,000' },
              { icon: <Sparkles className="w-5 h-5" />, label: 'Sponsor Innovation', amount: '₹10,000' },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 bg-base-200/50 rounded-xl">
                <div className="text-primary mb-1 flex justify-center">{item.icon}</div>
                <p className="text-xs font-medium">{item.label}</p>
                <p className="text-xs text-base-content/50">{item.amount}</p>
              </div>
            ))}
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Your Name *</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Preset amounts */}
          <div>
            <label className="text-sm font-medium mb-3 block">{t('donate.amount', locale)} (₹)</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetAmounts.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustomAmount(''); }}
                  className={`py-3 rounded-xl text-sm font-medium transition-all ${
                    amount === a && !customAmount ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-base-200 hover:bg-base-300'
                  }`}
                >
                  ₹{a.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Or enter custom amount</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="input input-bordered w-full pl-10"
                min="1"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">{t('donate.message', locale)}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a kind message..."
              className="textarea textarea-bordered w-full min-h-[80px]"
            />
          </div>

          <button onClick={handleDonate} className="btn btn-primary w-full text-white text-lg gap-2 h-14">
            <Heart className="w-5 h-5" /> {t('donate.submit', locale)} — ₹{(customAmount || amount).toLocaleString()}
          </button>

          <p className="text-center text-xs text-base-content/40">All donations are voluntary. No refunds. Thank you for your support! 🙏</p>
        </div>
      </div>
    </div>
  );
}
