"use client";

import { createContext, useContext, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import type { LoginPayload, RegisterPayload, User } from "@/types";

interface AuthContextValue {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => Promise<unknown>;
    register: (payload: RegisterPayload) => Promise<unknown>;
    logout: () => Promise<void>;
    syncProfile: () => Promise<User>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const { user, token } = useUser();
    const { login, register, logout, syncProfile } = useAuth();

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            token,
            isAuthenticated: Boolean(token),
            login,
            register,
            logout,
            syncProfile,
        }),
        [login, logout, register, syncProfile, token, user],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }

    return context;
}