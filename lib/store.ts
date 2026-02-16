'use client';

import { create } from 'zustand';
import { type Locale } from './i18n';

interface AppState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  user: any | null;
  setUser: (user: any | null) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
  user: null,
  setUser: (user) => set({ user }),
  chatOpen: false,
  setChatOpen: (chatOpen) => set({ chatOpen }),
}));
