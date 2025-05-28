import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials, RegisterData } from '@/types';
import { apiClient } from '@/lib/api';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        
        try {
          const response = await apiClient.login(credentials);
          
          if (response.success && response.data) {
            const { token, user } = response.data;
            
            // Store token in localStorage
            localStorage.setItem('token', token);
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        
        try {
          const response = await apiClient.register(data);
          
          if (response.success && response.data) {
            const { token, user } = response.data;
            
            // Store token in localStorage
            localStorage.setItem('token', token);
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Registration error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
      },

      clearAuth: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      initializeAuth: () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            console.error('Error parsing stored user data:', error);
            get().clearAuth();
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 