"use client";

import useUserStore from "@/store/useUserStore";

export function useUser() {
    const user = useUserStore((state) => state.user);
    const token = useUserStore((state) => state.token);
    const updateUser = useUserStore((state) => state.updateUser);

    return {
        user,
        token,
        isAuthenticated: Boolean(token),
        updateUser,
    };
}

export default useUser;