import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

export interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      hasHydrated: false,
      setUser: (user: User) => {
        set(() => ({ user, isAuthenticated: true }));
      },
      clearIsAuthenticated: () => {
        set(() => ({ user: null, isAuthenticated: false }));
      },
      setHasHydrated: (state: boolean) => {
        set(() => ({ hasHydrated: state }));
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
