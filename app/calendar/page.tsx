'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, Video, Flower2, Radio, Briefcase } from 'lucide-react';

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
};

export default function CalendarPage() {
  const { locale } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-02-16');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('en', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const getEventsForDay = (day: number) => sampleEvents.filter((e) => e.date === getDateStr(day));

  const selectedEvents = selectedDate ? sampleEvents.filter((e) => e.date === selectedDate) : [];

  return (
    <div className="min-h-screen sacred-pattern">
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-900/20 via-base-100 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto">
            <CalIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">{t('calendar.title', locale)}</h1>
          <div className="section-divider"></div>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">{t('calendar.subtitle', locale)}</p>
        </div>
      </section>

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
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-base-content/50 py-2">{day}</div>
              ))}
            </div>

            {/* Days */}
            <div className="calendar-grid">
              {days.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className="p-2"></div>;
                const dateStr = getDateStr(day);
                const events = getEventsForDay(day);
                const isSelected = dateStr === selectedDate;
                const isToday = dateStr === '2026-02-16';

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 rounded-xl text-center transition-all min-h-[70px] flex flex-col items-center ${
                      isSelected ? 'bg-primary text-white shadow-lg shadow-primary/25' :
                      isToday ? 'bg-primary/10 text-primary' :
                      'hover:bg-base-200'
                    }`}
                  >
                    <span className={`text-sm font-medium ${isToday && !isSelected ? 'text-primary' : ''}`}>{day}</span>
                    <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
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
                    <p className="text-xs text-base-content/50 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {event.time}
                    </p>
                    <span className="text-xs px-2 py-0.5 bg-base-200 rounded-full mt-1 inline-block capitalize">{event.type}</span>
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
