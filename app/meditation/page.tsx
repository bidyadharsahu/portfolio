'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Flower2, Clock, Users, Video, ChevronRight, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const meditationClasses = [
  {
    id: '1',
    title: 'Morning Mindfulness',
    title_hi: 'सुबह की माइंडफुलनेस',
    title_od: 'ସକାଳର ମାଇଣ୍ଡଫୁଲନେସ',
    description: 'Start your day with a 30-minute guided mindfulness meditation. Perfect for beginners and experienced practitioners alike.',
    description_hi: 'अपने दिन की शुरुआत 30 मिनट की गाइडेड माइंडफुलनेस मेडिटेशन से करें।',
    instructor: 'Bidyadhar Sahu',
    scheduled_at: '2026-02-17T06:00:00',
    duration_minutes: 30,
    max_participants: 50,
    enrolled_count: 23,
    image: '🧘',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: '2',
    title: 'Breath Awareness Session',
    title_hi: 'श्वास जागरूकता सत्र',
    title_od: 'ଶ୍ୱାସ ସଚେତନତା ସତ୍ର',
    description: 'Focus on breath patterns to reduce stress and anxiety. Includes pranayama techniques from ancient yoga traditions.',
    description_hi: 'तनाव और चिंता कम करने के लिए श्वास पैटर्न पर ध्यान दें।',
    instructor: 'Bidyadhar Sahu',
    scheduled_at: '2026-02-18T18:00:00',
    duration_minutes: 45,
    max_participants: 30,
    enrolled_count: 15,
    image: '🌬️',
    color: 'from-sky-500 to-cyan-500',
  },
  {
    id: '3',
    title: 'Chakra Healing Meditation',
    title_hi: 'चक्र हीलिंग ध्यान',
    title_od: 'ଚକ୍ର ହିଲିଂ ଧ୍ୟାନ',
    description: 'A deep meditation journey through the seven chakras. Includes sound healing and visualization techniques.',
    description_hi: 'सात चक्रों के माध्यम से एक गहरी ध्यान यात्रा।',
    instructor: 'Bidyadhar Sahu',
    scheduled_at: '2026-02-20T07:00:00',
    duration_minutes: 60,
    max_participants: 40,
    enrolled_count: 31,
    image: '🔮',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: '4',
    title: 'Evening Relaxation',
    title_hi: 'शाम का विश्राम',
    title_od: 'ସନ୍ଧ୍ୟା ବିଶ୍ରାମ',
    description: 'Wind down after a long day with this gentle guided relaxation. Perfect for better sleep and stress relief.',
    description_hi: 'लंबे दिन के बाद इस कोमल गाइडेड रिलैक्सेशन से आराम करें।',
    instructor: 'Bidyadhar Sahu',
    scheduled_at: '2026-02-19T20:00:00',
    duration_minutes: 30,
    max_participants: 100,
    enrolled_count: 42,
    image: '🌙',
    color: 'from-violet-500 to-purple-500',
  },
];

export default function MeditationPage() {
  const { locale, user } = useAppStore();
  const [enrolled, setEnrolled] = useState<string[]>([]);

  const handleEnroll = (classId: string) => {
    if (!user) {
      toast.error(t('meditation.loginRequired', locale));
      return;
    }
    if (enrolled.includes(classId)) {
      toast('You are already enrolled!');
      return;
    }
    setEnrolled((prev) => [...prev, classId]);
    toast.success('Enrolled successfully! Check your email for the Google Meet link.');
  };

  const getLocalizedTitle = (cls: typeof meditationClasses[0]) => {
    if (locale === 'hi') return cls.title_hi || cls.title;
    if (locale === 'od') return cls.title_od || cls.title;
    return cls.title;
  };

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-900/20 via-base-100 to-indigo-900/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto text-4xl">🧘</div>
          <h1 className="text-4xl sm:text-5xl font-bold">{t('meditation.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('meditation.subtitle', locale)}</p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">{t('meditation.upcoming', locale)}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {meditationClasses.map((cls) => {
            const date = new Date(cls.scheduled_at);
            const isEnrolled = enrolled.includes(cls.id);
            const spotsLeft = cls.max_participants - cls.enrolled_count;

            return (
              <div key={cls.id} className="glass-card overflow-hidden hover:shadow-xl transition-all">
                <div className={`h-32 bg-gradient-to-br ${cls.color} flex items-center justify-center`}>
                  <span className="text-5xl">{cls.image}</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{getLocalizedTitle(cls)}</h3>
                      <p className="text-sm text-base-content/50">by {cls.instructor}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${spotsLeft < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {spotsLeft} spots left
                    </span>
                  </div>

                  <p className="text-sm text-base-content/60 leading-relaxed">{cls.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-base-content/50">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {cls.duration_minutes} min</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {cls.enrolled_count}/{cls.max_participants}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-base-200 rounded-full h-2">
                    <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${(cls.enrolled_count / cls.max_participants) * 100}%` }}></div>
                  </div>

                  <div className="flex gap-2">
                    {isEnrolled ? (
                      <>
                        <span className="btn btn-success btn-sm flex-1 text-white gap-1">
                          ✓ {t('meditation.enrolled', locale)}
                        </span>
                        <a href="#" className="btn btn-primary btn-sm text-white gap-1">
                          <Video className="w-4 h-4" /> {t('meditation.joinMeet', locale)}
                        </a>
                      </>
                    ) : (
                      <button onClick={() => handleEnroll(cls.id)} className="btn btn-primary btn-sm flex-1 text-white gap-1">
                        <Flower2 className="w-4 h-4" /> {t('meditation.enroll', locale)}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
