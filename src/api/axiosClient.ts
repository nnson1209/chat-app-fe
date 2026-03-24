import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
    timeout: 15000,
});

axiosClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const persisted = localStorage.getItem("chat-user-store");

            if (persisted) {
                try {
                    const parsed = JSON.parse(persisted) as {
                        state?: { token?: string | null };
                    };
                    const token = parsed.state?.token;

                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch {
                    localStorage.removeItem("chat-user-store");
                }
            }
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined") {
            const status = error?.response?.status as number | undefined;

            if (status === 401) {
                try {
                    useUserStore.getState().clearSession();
                } finally {
                    localStorage.removeItem("chat-user-store");
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    },
);

export default axiosClient;