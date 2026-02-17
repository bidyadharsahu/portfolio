'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { t, Locale } from '@/lib/i18n';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, Video, Flower2, Radio, Briefcase, Sparkles } from 'lucide-react';

// Multilingual day names
const dayNames: Record<Locale, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  od: ['ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର', 'ଶନି'],
  sa: ['रविः', 'सोमः', 'मङ्गलः', 'बुधः', 'गुरुः', 'शुक्रः', 'शनिः'],
};

const fullDayNames: Record<Locale, string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  od: ['ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧବାର', 'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'],
  sa: ['रविवासरः', 'सोमवासरः', 'मङ्गलवासरः', 'बुधवासरः', 'गुरुवासरः', 'शुक्रवासरः', 'शनिवासरः'],
};

const monthNames: Record<Locale, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'],
  od: ['ଜାନୁଆରୀ', 'ଫେବୃଆରୀ', 'ମାର୍ଚ୍ଚ', 'ଏପ୍ରିଲ', 'ମଇ', 'ଜୁନ', 'ଜୁଲାଇ', 'ଅଗଷ୍ଟ', 'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର', 'ନଭେମ୍ବର', 'ଡିସେମ୍ବର'],
  sa: ['जनवरिमासः', 'फरवरिमासः', 'मार्चमासः', 'एप्रिलमासः', 'मईमासः', 'जूनमासः', 'जुलाईमासः', 'अगस्तमासः', 'सितम्बरमासः', 'अक्टूबरमासः', 'नवम्बरमासः', 'दिसम्बरमासः'],
};

// Today label translations
const todayLabel: Record<Locale, string> = {
  en: "Today's Date",
  hi: 'आज का दिन',
  od: 'ଆଜିର ତାରିଖ',
  sa: 'अद्य दिनाङ्कः',
};

const hinduMonthLabel: Record<Locale, string> = {
  en: 'Hindu Month',
  hi: 'हिन्दू मास',
  od: 'ହିନ୍ଦୁ ମାସ',
  sa: 'हिन्दुमासः',
};

const vikramLabel: Record<Locale, string> = {
  en: 'Vikram Samvat',
  hi: 'विक्रम सम्वत्',
  od: 'ବିକ୍ରମ ସମ୍ବତ',
  sa: 'विक्रमसम्वत्',
};

const festivalLabel: Record<Locale, string> = {
  en: "Today's Festival",
  hi: 'आज का पर्व',
  od: 'ଆଜିର ପର୍ବ',
  sa: 'अद्य पर्वः',
};

// Sanskrit month names (Hindu calendar)
const hinduMonths: Record<number, string> = {
  0: 'पौष / माघ', 1: 'माघ / फाल्गुन', 2: 'फाल्गुन / चैत्र', 3: 'चैत्र / वैशाख',
  4: 'वैशाख / ज्येष्ठ', 5: 'ज्येष्ठ / आषाढ', 6: 'आषाढ / श्रावण', 7: 'श्रावण / भाद्रपद',
  8: 'भाद्रपद / आश्विन', 9: 'आश्विन / कार्तिक', 10: 'कार्तिक / मार्गशीर्ष', 11: 'मार्गशीर्ष / पौष',
};

// Hindu holidays and festivals (key dates for 2026)
const hinduHolidays: Record<string, { name: string; nameSanskrit: string; nameHi: string; nameOd: string; type: 'festival' | 'tithi' | 'vrata' }> = {
  '2026-01-13': { name: 'Lohri', nameSanskrit: 'लोहड़ी', nameHi: 'लोहड़ी', nameOd: 'ଲୋହରୀ', type: 'festival' },
  '2026-01-14': { name: 'Makar Sankranti', nameSanskrit: 'मकर सङ्क्रान्तिः', nameHi: 'मकर संक्रांति', nameOd: 'ମକର ସଂକ୍ରାନ୍ତି', type: 'festival' },
  '2026-01-26': { name: 'Republic Day', nameSanskrit: 'गणतन्त्र दिवसः', nameHi: 'गणतंत्र दिवस', nameOd: 'ଗଣତନ୍ତ୍ର ଦିବସ', type: 'festival' },
  '2026-02-02': { name: 'Vasant Panchami', nameSanskrit: 'वसन्त पञ्चमी', nameHi: 'वसंत पंचमी', nameOd: 'ବସନ୍ତ ପଞ୍ଚମୀ', type: 'festival' },
  '2026-02-12': { name: 'Maha Shivaratri', nameSanskrit: 'महाशिवरात्रिः', nameHi: 'महाशिवरात्रि', nameOd: 'ମହାଶିବରାତ୍ରି', type: 'festival' },
  '2026-02-17': { name: 'Purnima', nameSanskrit: 'पूर्णिमा', nameHi: 'पूर्णिमा', nameOd: 'ପୂର୍ଣିମା', type: 'tithi' },
  '2026-03-11': { name: 'Holi', nameSanskrit: 'होलिकोत्सवः', nameHi: 'होली', nameOd: 'ହୋଳି', type: 'festival' },
  '2026-03-30': { name: 'Ram Navami', nameSanskrit: 'श्रीरामनवमी', nameHi: 'राम नवमी', nameOd: 'ରାମ ନବମୀ', type: 'festival' },
  '2026-04-06': { name: 'Hanuman Jayanti', nameSanskrit: 'हनुमज्जयन्ती', nameHi: 'हनुमान जयंती', nameOd: 'ହନୁମାନ ଜୟନ୍ତୀ', type: 'festival' },
  '2026-04-14': { name: 'Pana Sankranti', nameSanskrit: 'ପଣା ସଂକ୍ରାନ୍ତି', nameHi: 'पना संक्रांति', nameOd: 'ପଣା ସଂକ୍ରାନ୍ତି', type: 'festival' },
  '2026-06-24': { name: 'Rath Yatra', nameSanskrit: 'श्रीजगन्नाथ रथयात्रा', nameHi: 'रथयात्रा', nameOd: 'ରଥଯାତ୍ରା', type: 'festival' },
  '2026-07-07': { name: 'Guru Purnima', nameSanskrit: 'गुरु पूर्णिमा', nameHi: 'गुरु पूर्णिमा', nameOd: 'ଗୁରୁ ପୂର୍ଣିମା', type: 'festival' },
  '2026-08-14': { name: 'Raksha Bandhan', nameSanskrit: 'रक्षाबन्धनम्', nameHi: 'रक्षा बंधन', nameOd: 'ରକ୍ଷାବନ୍ଧନ', type: 'festival' },
  '2026-08-15': { name: 'Independence Day', nameSanskrit: 'स्वातन्त्र्य दिवसः', nameHi: 'स्वतंत्रता दिवस', nameOd: 'ସ୍ୱାଧୀନତା ଦିବସ', type: 'festival' },
  '2026-08-22': { name: 'Janmashtami', nameSanskrit: 'श्रीकृष्णजन्माष्टमी', nameHi: 'जन्माष्टमी', nameOd: 'ଜନ୍ମାଷ୍ଟମୀ', type: 'festival' },
  '2026-09-01': { name: 'Ganesh Chaturthi', nameSanskrit: 'गणेश चतुर्थी', nameHi: 'गणेश चतुर्थी', nameOd: 'ଗଣେଶ ଚତୁର୍ଥୀ', type: 'festival' },
  '2026-10-11': { name: 'Dussehra', nameSanskrit: 'विजयादशमी', nameHi: 'दशहरा', nameOd: 'ଦଶହରା', type: 'festival' },
  '2026-10-21': { name: 'Diwali', nameSanskrit: 'दीपावलिः', nameHi: 'दीवाली', nameOd: 'ଦୀପାବଳୀ', type: 'festival' },
  '2026-11-02': { name: 'Chhath Puja', nameSanskrit: 'छठ पूजा', nameHi: 'छठ पूजा', nameOd: 'ଛଠ ପୂଜା', type: 'festival' },
  '2026-12-25': { name: 'Christmas', nameSanskrit: 'क्रिसमस', nameHi: 'क्रिसमस', nameOd: 'ବଡ଼ଦିନ', type: 'festival' },
};

function getHolidayName(h: typeof hinduHolidays[string], locale: Locale): string {
  if (locale === 'hi') return h.nameHi;
  if (locale === 'od') return h.nameOd;
  if (locale === 'sa') return h.nameSanskrit;
  return h.name;
}

const sampleEvents = [
  { id: '1', title: 'Morning Mindfulness', type: 'class', date: '2026-02-17', time: '06:00', color: 'bg-purple-500' },
  { id: '2', title: 'DeFi Protocol Livestream', type: 'livestream', date: '2026-02-16', time: '14:00', color: 'bg-red-500' },
  { id: '3', title: 'Client Meeting', type: 'meeting', date: '2026-02-18', time: '10:00', color: 'bg-blue-500' },
  { id: '4', title: 'Breath Awareness', type: 'class', date: '2026-02-18', time: '18:00', color: 'bg-indigo-500' },
  { id: '5', title: 'Next.js Masterclass', type: 'livestream', date: '2026-02-20', time: '16:00', color: 'bg-red-500' },
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
  const monthDisplay = `${monthNames[locale][month]} ${year}`;

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Merge sample events + Hindu holidays for the current view
  const allEvents = useMemo(() => {
    const holidayEvents = Object.entries(hinduHolidays).map(([date, h], idx) => ({
      id: `holiday-${idx}`,
      title: getHolidayName(h, locale),
      type: 'festival' as const,
      date,
      time: '—',
      color: h.type === 'festival' ? 'bg-orange-500' : h.type === 'vrata' ? 'bg-yellow-500' : 'bg-pink-500',
    }));
    return [...sampleEvents, ...holidayEvents];
  }, [locale]);

  const getEventsForDay = (day: number) => allEvents.filter((e) => e.date === getDateStr(day));

  const selectedEvents = selectedDate ? allEvents.filter((e) => e.date === selectedDate) : [];

  // Today's multilingual info
  const todayDayIndex = now.getDay();
  const todayDayName = fullDayNames[locale][todayDayIndex];
  const todayMonthName = monthNames[locale][now.getMonth()];
  const todayHinduMonth = hinduMonths[now.getMonth()] || '';
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

      {/* Today's Date — Multilingual Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="glass-card p-6 sm:p-8 border border-orange-500/20 bg-gradient-to-r from-orange-500/5 to-amber-500/5">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shrink-0">
              <span className="text-3xl font-bold">{locale === 'sa' || locale === 'hi' ? toDevanagari(now.getDate()) : now.getDate()}</span>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
                🙏 {todayLabel[locale]} — {todayDayName}
              </h2>
              <p className="text-base-content/70 text-lg">
                {todayMonthName} {now.getDate()}, {now.getFullYear()}
              </p>
              <p className="text-base-content/60 text-sm">
                {hinduMonthLabel[locale]}: <span className="font-semibold text-amber-500">{todayHinduMonth}</span> &nbsp;•&nbsp; {vikramLabel[locale]}: <span className="font-semibold text-amber-500">{locale === 'sa' || locale === 'hi' ? toDevanagari(vikramYear) : vikramYear}</span>
              </p>
              {hinduHolidays[todayStr] && (
                <p className="mt-1 text-orange-500 font-semibold text-base">
                  🪔 {festivalLabel[locale]}: {getHolidayName(hinduHolidays[todayStr], locale)}
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
              <h2 className="text-xl font-bold">{monthDisplay}</h2>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="btn btn-ghost btn-sm btn-circle">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day labels */}
            <div className="calendar-grid mb-2">
              {dayNames[locale].map((day, i) => (
                <div key={day} className="text-center text-xs font-medium text-base-content/50 py-2" title={fullDayNames.en[i]}>{day}</div>
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
              {selectedDate ? (() => {
                const selDate = new Date(selectedDate + 'T00:00:00');
                const selDayIndex = selDate.getDay();
                const selMonthIndex = selDate.getMonth();
                return `${fullDayNames[locale][selDayIndex]}, ${monthNames[locale][selMonthIndex]} ${selDate.getDate()}`;
              })() : t('calendar.selectDate', locale)}
            </h3>
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
