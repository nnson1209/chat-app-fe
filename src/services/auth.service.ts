import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/apiEndpoints";
import type { ApiResponse, AuthSession, LoginPayload, RegisterPayload } from "@/types";

const authService = {
    async login(payload: LoginPayload): Promise<AuthSession> {
        const response = await axiosClient.post<ApiResponse<AuthSession>>(
            API_ENDPOINTS.auth.login,
            payload,
        );
        return response.data.data;
    },

    async register(payload: RegisterPayload): Promise<AuthSession> {
        const response = await axiosClient.post<ApiResponse<AuthSession>>(
            API_ENDPOINTS.auth.register,
            payload,
        );
        return response.data.data;
    },

    async me(): Promise<AuthSession> {
        const response = await axiosClient.get<ApiResponse<AuthSession>>(API_ENDPOINTS.auth.me);
        return response.data.data;
    },

    async logout(): Promise<void> {
        await axiosClient.post(API_ENDPOINTS.auth.logout);
    },
};

export default authService;