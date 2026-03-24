import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthSession, User } from "@/types/auth.types";

interface UserStoreState {
    user: User | null;
    token: string | null;
    setSession: (session: AuthSession | null) => void;
    clearSession: () => void;
    updateUser: (partial: Partial<User>) => void;
}

export const useUserStore = create<UserStoreState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setSession: (session) =>
                set({
                    user: session?.user ?? null,
                    token: session?.tokens.accessToken ?? null,
                }),
            clearSession: () => set({ user: null, token: null }),
            updateUser: (partial) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...partial } : state.user,
                })),
        }),
        {
            name: "chat-user-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user, token: state.token }),
        },
    ),
);

export default useUserStore;