import { create } from 'zustand';
import { User } from '../interface/user';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: (user: User) => {
    set({
      user: user,
      isAuthenticated: true,
    });
  },
  setUser: (user: User) => {
    set({
      user: user,
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      accessToken: null,
    });
  },
  setAccessToken: (accessToken: string) => {
    set({
      accessToken,
    });
  },
}));
