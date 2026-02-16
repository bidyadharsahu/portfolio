'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Heart, Coffee, Gift, Sparkles, IndianRupee, Copy, CheckCircle2, ArrowLeft, Users, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';

const UPI_ID = 'bidyadharsahu@ptyes';
const presetAmounts = [100, 500, 1000, 2500, 5000, 10000];

interface Donation {
  id: string;
  donor_name: string;
  amount: number;
  message: string;
  created_at: string;
}

export default function DonatePage() {
  const { locale, user } = useAppStore();
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [donorName, setDonorName] = useState(user?.full_name || '');
  const [step, setStep] = useState<'form' | 'pay' | 'thanks'>('form');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [donorCount, setDonorCount] = useState(0);

  const finalAmount = customAmount ? parseInt(customAmount) : amount;

  // Fetch recent donations + subscribe to realtime
  useEffect(() => {
    const supabase = createClient();

    async function fetchDonations() {
      const { data } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (data) {
        setRecentDonations(data);
        setDonorCount(data.length);
        setTotalRaised(data.reduce((s: number, d: any) => s + (d.amount || 0), 0));
      }
    }

    fetchDonations();

    // Realtime subscription
    const channel = supabase
      .channel('donations-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setRecentDonations((prev) => [payload.new as Donation, ...prev].slice(0, 10));
          setTotalRaised((prev) => prev + ((payload.new as Donation).amount || 0));
          setDonorCount((prev) => prev + 1);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success('UPI ID copied!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleProceed = () => {
    if (!finalAmount || finalAmount < 1) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!donorName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setStep('pay');
  };

  const handleConfirmDonation = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('donations').insert({
        donor_name: donorName.trim(),
        amount: finalAmount,
        message: message.trim() || null,
      });
      if (error) throw error;
      setStep('thanks');
      toast.success(t('donate.thanks', locale));
    } catch (err) {
      console.error(err);
      // Still proceed even if DB fails
      setStep('thanks');
      toast.success(t('donate.thanks', locale));
    } finally {
      setSaving(false);
    }
  };

  const handleDonateAgain = () => {
    setStep('form');
    setMessage('');
    setCustomAmount('');
    setAmount(500);
  };

  // --- STEP 3: Thank You ---
  if (step === 'thanks') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sacred-pattern">
        <div className="glass-card p-12 text-center max-w-md space-y-6 animate-fade-in-up">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto animate-bounce">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold">{t('donate.thanks', locale)} 🙏</h2>
          <p className="text-base-content/60">
            Your generous contribution of <span className="font-bold text-primary">₹{finalAmount.toLocaleString()}</span> means the world!
            It fuels innovation and keeps open-source projects alive.
          </p>
          <div className="glass-card p-4 bg-base-200/50 text-left space-y-2 text-sm">
            <p><span className="text-base-content/50">Donor:</span> <span className="font-semibold">{donorName}</span></p>
            <p><span className="text-base-content/50">Amount:</span> <span className="font-semibold text-primary">₹{finalAmount.toLocaleString()}</span></p>
            {message && <p><span className="text-base-content/50">Message:</span> <span className="italic">"{message}"</span></p>}
            <p><span className="text-base-content/50">UPI:</span> <span className="font-mono text-xs">{UPI_ID}</span></p>
          </div>
          <button onClick={handleDonateAgain} className="btn btn-primary text-white gap-2">
            <Heart className="w-4 h-4" /> Donate Again
          </button>
        </div>
      </div>
    );
  }

  // --- STEP 2: UPI Payment ---
  if (step === 'pay') {
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=Bidyadhar%20Sahu&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(message || 'Donation to Bidyadhar')}`;
    return (
      <div className="min-h-screen sacred-pattern">
        <section className="py-16 sm:py-20 bg-gradient-to-br from-amber-900/20 via-base-100 to-orange-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold">Complete Your Donation</h1>
            <p className="text-base-content/60">Pay ₹{finalAmount.toLocaleString()} via UPI</p>
          </div>
        </section>

        <div className="max-w-lg mx-auto px-4 sm:px-6 py-12 space-y-6">
          <button onClick={() => setStep('form')} className="btn btn-ghost btn-sm gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="glass-card p-8 space-y-6 text-center">
            {/* Amount display */}
            <div className="space-y-1">
              <p className="text-base-content/50 text-sm">Amount to Pay</p>
              <p className="text-5xl font-bold text-primary">₹{finalAmount.toLocaleString()}</p>
            </div>

            {/* UPI ID card */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 space-y-3">
              <p className="text-sm text-base-content/60 font-medium">Pay to UPI ID</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-lg sm:text-xl font-mono font-bold text-amber-600 dark:text-amber-400">{UPI_ID}</span>
                <button onClick={copyUPI} className="btn btn-ghost btn-sm btn-circle">
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-base-content/40">Bidyadhar Sahu • Google Pay / PhonePe / Paytm</p>
            </div>

            {/* UPI deep link button */}
            <a
              href={upiLink}
              className="btn btn-primary w-full text-white text-lg gap-2 h-14"
            >
              Open UPI App to Pay ₹{finalAmount.toLocaleString()}
            </a>

            <div className="divider text-xs text-base-content/40">After payment</div>

            {/* Confirm button */}
            <button
              onClick={handleConfirmDonation}
              disabled={saving}
              className="btn btn-outline btn-success w-full gap-2"
            >
              {saving ? <span className="loading loading-spinner loading-sm"></span> : <CheckCircle2 className="w-5 h-5" />}
              I've Completed the Payment
            </button>

            <p className="text-xs text-base-content/40">
              Click above after you've paid via UPI. Your donation will be recorded and visible in real-time.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- STEP 1: Donation Form ---
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main form - 3 cols */}
          <div className="lg:col-span-3 glass-card p-8 space-y-8">
            {/* Stats bar */}
            <div className="flex gap-6 justify-center text-center">
              <div>
                <p className="text-2xl font-bold text-primary">₹{totalRaised.toLocaleString()}</p>
                <p className="text-xs text-base-content/50">Total Raised</p>
              </div>
              <div className="h-10 w-px bg-base-300/50"></div>
              <div>
                <p className="text-2xl font-bold text-primary">{donorCount}</p>
                <p className="text-xs text-base-content/50">Supporters</p>
              </div>
            </div>

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
              <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Enter your name" className="input input-bordered w-full" />
            </div>

            {/* Preset amounts */}
            <div>
              <label className="text-sm font-medium mb-3 block">{t('donate.amount', locale)} (₹)</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {presetAmounts.map((a) => (
                  <button key={a} onClick={() => { setAmount(a); setCustomAmount(''); }} className={`py-3 rounded-xl text-sm font-medium transition-all ${amount === a && !customAmount ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-base-200 hover:bg-base-300'}`}>
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
                <input type="number" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} placeholder="Enter amount" className="input input-bordered w-full pl-10" min="1" />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('donate.message', locale)}</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a kind message..." className="textarea textarea-bordered w-full min-h-[80px]" />
            </div>

            {/* UPI Info */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-base-content/50 mb-0.5">UPI Payment</p>
                <p className="font-mono text-sm font-semibold text-amber-600 dark:text-amber-400">{UPI_ID}</p>
              </div>
              <button onClick={copyUPI} className="btn btn-ghost btn-sm gap-1.5">
                {copied ? <><CheckCircle2 className="w-4 h-4 text-green-500" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>

            <button onClick={handleProceed} className="btn btn-primary w-full text-white text-lg gap-2 h-14">
              <Heart className="w-5 h-5" /> Proceed to Pay — ₹{(finalAmount || 0).toLocaleString()}
            </button>

            <p className="text-center text-xs text-base-content/40">All donations are voluntary. Thank you for your support! 🙏</p>
          </div>

          {/* Sidebar - Recent Donations (realtime) - 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Recent Supporters
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live"></span>
            </h3>
            {recentDonations.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <Heart className="w-10 h-10 text-base-content/20 mx-auto mb-2" />
                <p className="text-sm text-base-content/50">Be the first to donate!</p>
              </div>
            ) : (
              recentDonations.map((d) => (
                <div key={d.id} className="glass-card p-4 flex items-start gap-3 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {d.donor_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm truncate">{d.donor_name}</h4>
                      <span className="text-primary font-bold text-sm">₹{d.amount?.toLocaleString()}</span>
                    </div>
                    {d.message && <p className="text-xs text-base-content/50 mt-1 italic truncate">"{d.message}"</p>}
                    <p className="text-[10px] text-base-content/40 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {new Date(d.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
