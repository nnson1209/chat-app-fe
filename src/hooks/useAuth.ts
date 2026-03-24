"use client";

import { useCallback } from "react";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import useUserStore from "@/store/useUserStore";
import type { LoginPayload, RegisterPayload } from "@/types";

export function useAuth() {
    const user = useUserStore((state) => state.user);
    const token = useUserStore((state) => state.token);
    const setSession = useUserStore((state) => state.setSession);
    const clearSession = useUserStore((state) => state.clearSession);
    const updateUser = useUserStore((state) => state.updateUser);

    const login = useCallback(
        async (payload: LoginPayload) => {
            const session = await authService.login(payload);
            setSession(session);
            return session;
        },
        [setSession],
    );

    const register = useCallback(
        async (payload: RegisterPayload) => {
            const session = await authService.register(payload);
            return session;
        },
        [],
    );

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } finally {
            clearSession();
        }
    }, [clearSession]);

    const syncProfile = useCallback(async () => {
        const profile = await userService.syncProfile();
        updateUser(profile);
        return profile;
    }, [updateUser]);

    return {
        user,
        token,
        isAuthenticated: Boolean(token),
        login,
        register,
        logout,
        syncProfile,
    };
}

export default useAuth;