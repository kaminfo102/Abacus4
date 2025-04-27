"use client";

import { create } from 'zustand';
import type { User } from './types';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => set({ user, isAdmin: user?.email === 'admin@example.com' }),
  login: async (email, password) => {
    // TODO: Implement actual authentication
    const mockUser: User = {
      id: '1',
      name: email === 'admin@example.com' ? 'ادمین' : 'کاربر نمونه',
      email,
      term: '1',
      avatar: '/avatars/default.png',
      username: email.split('@')[0],
      role: email === 'admin@example.com' ? 'admin' : 'user'
    };
    set({ user: mockUser, isAdmin: email === 'admin@example.com' });
  },
  logout: () => set({ user: null, isAdmin: false }),
}));