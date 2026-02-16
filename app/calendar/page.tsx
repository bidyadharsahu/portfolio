'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, Video, Flower2, Radio, Briefcase, Sparkles } from 'lucide-react';

// Sanskrit / Devanagari day names
const sanskritDayNames: Record<string, string> = {
  Sunday: 'रविवार (Ravivāra)',
  Monday: 'सोमवार (Somavāra)',
  Tuesday: 'मङ्गलवार (Maṅgalavāra)',
  Wednesday: 'बुधवार (Budhavāra)',
  Thursday: 'गुरुवार (Guruvāra)',
  Friday: 'शुक्रवार (Śukravāra)',
  Saturday: 'शनिवार (Śanivāra)',
};

// Sanskrit month names (approximate mapping)
const sanskritMonthNames: Record<number, string> = {
  0: 'पौष / माघ (Pauṣa / Māgha)',
  1: 'माघ / फाल्गुन (Māgha / Phālguna)',
  2: 'फाल्गुन / चैत्र (Phālguna / Caitra)',
  3: 'चैत्र / वैशाख (Caitra / Vaiśākha)',
  4: 'वैशाख / ज्येष्ठ (Vaiśākha / Jyeṣṭha)',
  5: 'ज्येष्ठ / आषाढ (Jyeṣṭha / Āṣāḍha)',
  6: 'आषाढ / श्रावण (Āṣāḍha / Śrāvaṇa)',
  7: 'श्रावण / भाद्रपद (Śrāvaṇa / Bhādrapada)',
  8: 'भाद्रपद / आश्विन (Bhādrapada / Āśvina)',
  9: 'आश्विन / कार्तिक (Āśvina / Kārtika)',
  10: 'कार्तिक / मार्गशीर्ष (Kārtika / Mārgaśīrṣa)',
  11: 'मार्गशीर्ष / पौष (Mārgaśīrṣa / Pauṣa)',
};

// Hindu holidays and festivals (key dates for 2026)
const hinduHolidays: Record<string, { name: string; nameSanskrit: string; type: 'festival' | 'tithi' | 'vrata' }> = {
  '2026-01-13': { name: 'Lohri', nameSanskrit: 'लोहड़ी', type: 'festival' },
  '2026-01-14': { name: 'Makar Sankranti', nameSanskrit: 'मकर सङ्क्रान्तिः', type: 'festival' },
  '2026-01-26': { name: 'Republic Day', nameSanskrit: 'गणतन्त्र दिवसः', type: 'festival' },
  '2026-02-02': { name: 'Vasant Panchami', nameSanskrit: 'वसन्त पञ्चमी', type: 'festival' },
  '2026-02-12': { name: 'Maha Shivaratri', nameSanskrit: 'महाशिवरात्रिः', type: 'festival' },
  '2026-02-15': { name: 'Amavasya', nameSanskrit: 'अमावास्या', type: 'tithi' },
  '2026-02-17': { name: 'Purnima', nameSanskrit: 'पूर्णिमा (माघ)', type: 'tithi' },
  '2026-02-26': { name: 'Ekadashi', nameSanskrit: 'एकादशी व्रतम्', type: 'vrata' },
  '2026-03-02': { name: 'Maha Shivaratri (Alt)', nameSanskrit: 'महाशिवरात्रिः', type: 'festival' },
  '2026-03-10': { name: 'Holika Dahan', nameSanskrit: 'होलिकादहनम्', type: 'festival' },
  '2026-03-11': { name: 'Holi', nameSanskrit: 'होलिकोत्सवः (फाल्गुन पूर्णिमा)', type: 'festival' },
  '2026-03-22': { name: 'Chaitra Navratri Begins', nameSanskrit: 'चैत्र नवरात्रि आरम्भः', type: 'festival' },
  '2026-03-30': { name: 'Ram Navami', nameSanskrit: 'श्रीरामनवमी', type: 'festival' },
  '2026-04-06': { name: 'Hanuman Jayanti', nameSanskrit: 'हनुमज्जयन्ती', type: 'festival' },
  '2026-04-14': { name: 'Pana Sankranti / Maha Vishub', nameSanskrit: 'ପଣା ସଂକ୍ରାନ୍ତି / महाविषुवः', type: 'festival' },
  '2026-05-01': { name: 'Akshaya Tritiya', nameSanskrit: 'अक्षय तृतीया', type: 'festival' },
  '2026-05-12': { name: 'Buddha Purnima', nameSanskrit: 'बुद्ध पूर्णिमा', type: 'festival' },
  '2026-06-24': { name: 'Jagannath Rath Yatra', nameSanskrit: 'श्रीजगन्नाथ रथयात्रा', type: 'festival' },
  '2026-07-07': { name: 'Guru Purnima', nameSanskrit: 'गुरु पूर्णिमा', type: 'festival' },
  '2026-08-05': { name: 'Nag Panchami', nameSanskrit: 'नाग पञ्चमी', type: 'festival' },
  '2026-08-14': { name: 'Raksha Bandhan', nameSanskrit: 'रक्षाबन्धनम्', type: 'festival' },
  '2026-08-15': { name: 'Independence Day', nameSanskrit: 'स्वातन्त्र्य दिवसः', type: 'festival' },
  '2026-08-22': { name: 'Janmashtami', nameSanskrit: 'श्रीकृष्णजन्माष्टमी', type: 'festival' },
  '2026-09-01': { name: 'Ganesh Chaturthi', nameSanskrit: 'गणेश चतुर्थी', type: 'festival' },
  '2026-10-02': { name: 'Gandhi Jayanti / Navratri', nameSanskrit: 'नवरात्रि आरम्भः', type: 'festival' },
  '2026-10-11': { name: 'Dussehra / Vijayadashami', nameSanskrit: 'विजयादशमी (दशहरा)', type: 'festival' },
  '2026-10-21': { name: 'Diwali', nameSanskrit: 'दीपावलिः (दीवाली)', type: 'festival' },
  '2026-10-23': { name: 'Govardhan Puja', nameSanskrit: 'गोवर्धन पूजा', type: 'festival' },
  '2026-10-24': { name: 'Bhai Dooj', nameSanskrit: 'भ्रातृद्वितीया', type: 'festival' },
  '2026-11-02': { name: 'Chhath Puja', nameSanskrit: 'छठ पूजा', type: 'festival' },
  '2026-11-19': { name: 'Kartik Purnima', nameSanskrit: 'कार्तिक पूर्णिमा', type: 'festival' },
  '2026-12-25': { name: 'Christmas', nameSanskrit: 'क्रिसमस', type: 'festival' },
};

const sampleEvents = [
  { id: '1', title: 'Morning Mindfulness', type: 'class', date: '2026-02-17', time: '06:00', color: 'bg-purple-500' },
  { id: '2', title: 'DeFi Protocol Livestream', type: 'livestream', date: '2026-02-16', time: '14:00', color: 'bg-red-500' },
  { id: '3', title: 'Client Meeting - QR Project', type: 'meeting', date: '2026-02-18', time: '10:00', color: 'bg-blue-500' },
  { id: '4', title: 'Breath Awareness Session', type: 'class', date: '2026-02-18', time: '18:00', color: 'bg-indigo-500' },
  { id: '5', title: 'Next.js Masterclass Stream', type: 'livestream', date: '2026-02-20', time: '16:00', color: 'bg-red-500' },
  { id: '6', title: 'Chakra Healing Meditation', type: 'class', date: '2026-02-20', time: '07:00', color: 'bg-amber-500' },
  { id: '7', title: 'Project Review - Namaste Rides', type: 'meeting', date: '2026-02-22', time: '11:00', color: 'bg-blue-500' },
  { id: '8', title: 'AR Workshop Stream', type: 'livestream', date: '2026-02-22', time: '15:00', color: 'bg-red-500' },
  { id: '9', title: 'Evening Relaxation', type: 'class', date: '2026-02-19', time: '20:00', color: 'bg-violet-500' },
  { id: '10', title: 'Sprint Planning', type: 'deadline', date: '2026-02-25', time: '09:00', color: 'bg-emerald-500' },
];

const eventIcons: Record<string, any> = {
  class: <Flower2 className="w-3.5 h-3.5" />,
  livestream: <Radio className="w-3.5 h-3.5" />,
  meeting: <Video className="w-3.5 h-3.5" />,
  deadline: <Briefcase className="w-3.5 h-3.5" />,
  festival: <Sparkles className="w-3.5 h-3.5" />,
};

// Devanagari numerals converter
function toDevanagari(n: number): string {
  const devDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(n).split('').map((d) => devDigits[parseInt(d)] || d).join('');
}

export default function CalendarPage() {
  const { locale } = useAppStore();
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const [currentDate, setCurrentDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(todayStr);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('en', { month: 'long', year: 'numeric' });

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Merge sample events + Hindu holidays for the current view
  const allEvents = useMemo(() => {
    const holidayEvents = Object.entries(hinduHolidays).map(([date, h], idx) => ({
      id: `holiday-${idx}`,
      title: `${h.nameSanskrit} — ${h.name}`,
      type: 'festival' as const,
      date,
      time: '—',
      color: h.type === 'festival' ? 'bg-orange-500' : h.type === 'vrata' ? 'bg-yellow-500' : 'bg-pink-500',
    }));
    return [...sampleEvents, ...holidayEvents];
  }, []);

  const getEventsForDay = (day: number) => allEvents.filter((e) => e.date === getDateStr(day));

  const selectedEvents = selectedDate ? allEvents.filter((e) => e.date === selectedDate) : [];

  // Today's Sanskrit info
  const todayEnDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const todaySanskrit = sanskritDayNames[todayEnDay] || todayEnDay;
  const todayMonthSanskrit = sanskritMonthNames[now.getMonth()] || '';
  const vikramYear = now.getFullYear() + 57; // approximate Vikram Samvat

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-900/20 via-base-100 to-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto">
            <CalIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{t('calendar.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('calendar.subtitle', locale)}</p>
        </div>
      </section>

      {/* Today's Date — Sanskrit / Devanagari Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="glass-card p-6 sm:p-8 border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-amber-500/5">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shrink-0">
              <span className="text-3xl font-bold">{toDevanagari(now.getDate())}</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
                🙏 आज का दिन — {todaySanskrit}
              </h2>
              <p className="text-base-content/70 text-lg">
                {now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-base-content/60 text-sm">
                हिन्दू मास: <span className="font-semibold text-amber-500">{todayMonthSanskrit}</span> &nbsp;•&nbsp; विक्रम सम्वत्: <span className="font-semibold text-amber-500">{toDevanagari(vikramYear)}</span>
              </p>
              {hinduHolidays[todayStr] && (
                <p className="mt-1 text-orange-500 font-semibold text-base">
                  🪔 आज का पर्व: {hinduHolidays[todayStr].nameSanskrit} ({hinduHolidays[todayStr].name})
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 glass-card p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="btn btn-ghost btn-sm btn-circle">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">{monthName}</h2>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="btn btn-ghost btn-sm btn-circle">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day labels */}
            <div className="calendar-grid mb-2">
              {['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'].map((day, i) => (
                <div key={day} className="text-center text-xs font-medium text-base-content/50 py-2" title={['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][i]}>{day}</div>
              ))}
            </div>

            {/* Days */}
            <div className="calendar-grid">
              {days.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className="p-2"></div>;
                const dateStr = getDateStr(day);
                const events = getEventsForDay(day);
                const isSelected = dateStr === selectedDate;
                const isToday = dateStr === todayStr;
                const holiday = hinduHolidays[dateStr];

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 rounded-xl text-center transition-all min-h-[70px] flex flex-col items-center relative ${
                      isSelected ? 'bg-primary text-white shadow-lg shadow-primary/25' :
                      isToday ? 'ring-2 ring-primary bg-primary/10 text-primary' :
                      holiday ? 'bg-orange-500/10' :
                      'hover:bg-base-200'
                    }`}
                    title={holiday ? `${holiday.nameSanskrit} — ${holiday.name}` : undefined}
                  >
                    <span className={`text-sm font-medium ${isToday && !isSelected ? 'text-primary font-bold' : ''} ${holiday && !isSelected ? 'text-orange-600 dark:text-orange-400' : ''}`}>{day}</span>
                    {holiday && !isSelected && (
                      <span className="text-[8px] leading-tight text-orange-500 mt-0.5 truncate w-full px-0.5">🪔</span>
                    )}
                    <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                      {events.slice(0, 3).map((e) => (
                        <div key={e.id} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : e.color}`}></div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span> 🪔 Hindu Festival</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span> Meditation</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span> Livestream</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> Meeting</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Deadline</span>
            </div>
          </div>

          {/* Selected Day Events */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">
              {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
            </h3>
            {selectedDate && (
              <p className="text-sm text-base-content/50">
                {sanskritDayNames[new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' })] || ''}
              </p>
            )}
            {selectedEvents.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <CalIcon className="w-12 h-12 text-base-content/20 mx-auto mb-3" />
                <p className="text-base-content/50">{t('calendar.noEvents', locale)}</p>
              </div>
            ) : (
              selectedEvents.map((event) => (
                <div key={event.id} className="glass-card p-4 flex items-start gap-3 hover:shadow-lg transition-shadow">
                  <div className={`w-10 h-10 rounded-xl ${event.color} flex items-center justify-center text-white flex-shrink-0`}>
                    {eventIcons[event.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{event.title}</h4>
                    {event.time !== '—' && (
                      <p className="text-xs text-base-content/50 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {event.time}
                      </p>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block capitalize ${event.type === 'festival' ? 'bg-orange-500/10 text-orange-600' : 'bg-base-200'}`}>{event.type === 'festival' ? '🪔 Festival' : event.type}</span>
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
