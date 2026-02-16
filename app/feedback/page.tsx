'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Star, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import toast from 'react-hot-toast';

const StarRating = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => {
  const [hover, setHover] = useState(0);
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= (hover || value) ? 'text-amber-400 fill-amber-400' : 'text-base-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-base-content/50 self-center">
          {value > 0 ? ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][value] : ''}
        </span>
      </div>
    </div>
  );
};

const existingFeedback = [
  { name: 'Rajesh K.', websiteRating: 5, workRating: 5, message: 'Absolutely stunning portfolio! The design is modern and the multilingual support is impressive.', date: '2026-01-15' },
  { name: 'Priya S.', websiteRating: 4, workRating: 5, message: 'Great work on the QR menu system. The live preview feature is very innovative!', date: '2026-01-20' },
  { name: 'Amit P.', websiteRating: 5, workRating: 5, message: 'One of the best developer portfolios I\'ve seen. Love the meditation section!', date: '2026-02-01' },
  { name: 'Sneha R.', websiteRating: 5, workRating: 4, message: 'Very professional and well-organized. The chatbot is a nice touch!', date: '2026-02-10' },
];

export default function FeedbackPage() {
  const { locale } = useAppStore();
  const [websiteRating, setWebsiteRating] = useState(0);
  const [workRating, setWorkRating] = useState(0);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteRating || !workRating) {
      toast.error('Please provide both ratings');
      return;
    }
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setSubmitted(true);
    toast.success(t('feedback.thanks', locale));
  };

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-900/20 via-base-100 to-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mx-auto">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{t('feedback.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('feedback.subtitle', locale)}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Leave Your Feedback</h2>
            {submitted ? (
              <div className="glass-card p-12 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto">
                  <ThumbsUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{t('feedback.thanks', locale)}</h3>
                <p className="text-base-content/60">Your feedback helps me grow and improve.</p>
                <button onClick={() => { setSubmitted(false); setWebsiteRating(0); setWorkRating(0); setMessage(''); setName(''); }} className="btn btn-primary text-white">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                  />
                </div>

                <StarRating value={websiteRating} onChange={setWebsiteRating} label={t('feedback.website', locale) + ' *'} />
                <StarRating value={workRating} onChange={setWorkRating} label={t('feedback.work', locale) + ' *'} />

                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t('feedback.message', locale)}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts, suggestions, or experience..."
                    className="textarea textarea-bordered w-full min-h-[120px]"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full text-white gap-2">
                  <Send className="w-4 h-4" /> {t('feedback.submit', locale)}
                </button>
              </form>
            )}
          </div>

          {/* Existing Feedback */}
          <div>
            <h2 className="text-2xl font-bold mb-6">What Others Say</h2>
            <div className="space-y-4">
              {existingFeedback.map((fb, i) => (
                <div key={i} className="glass-card p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                        {fb.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{fb.name}</p>
                        <p className="text-xs text-base-content/50">{new Date(fb.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3.5 h-3.5 ${j < fb.websiteRating ? 'text-amber-400 fill-amber-400' : 'text-base-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-base-content/70 leading-relaxed">"{fb.message}"</p>
                  <div className="flex gap-4 text-xs text-base-content/50">
                    <span>Website: {fb.websiteRating}/5</span>
                    <span>Work: {fb.workRating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
