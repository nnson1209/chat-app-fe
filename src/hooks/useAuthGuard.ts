"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

const PUBLIC_ROUTES = ["/login", "/register"];

export function useAuthGuard() {
    const router = useRouter();
    const pathname = usePathname();
    const token = useUserStore((state) => state.token);
    const isAuthenticated = Boolean(token);

    useEffect(() => {
        if (!isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
            router.replace("/login");
            return;
        }

        if (isAuthenticated && PUBLIC_ROUTES.includes(pathname)) {
            router.replace("/");
        }
    }, [isAuthenticated, pathname, router]);

    return { isAuthenticated };
}

export default useAuthGuard;