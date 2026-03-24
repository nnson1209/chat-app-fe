import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/apiEndpoints";
import type { ApiResponse, PaginatedResponse, User } from "@/types";

const userService = {
    async profile(): Promise<User> {
        const response = await axiosClient.get<ApiResponse<User>>(API_ENDPOINTS.user.profile);
        return response.data.data;
    },

    async search(query: string): Promise<PaginatedResponse<User>> {
        const response = await axiosClient.get<ApiResponse<PaginatedResponse<User>>>(
            API_ENDPOINTS.user.search,
            {
                params: { q: query },
            },
        );
        return response.data.data;
    },

    async syncProfile(): Promise<User> {
        const response = await axiosClient.post<ApiResponse<User>>(API_ENDPOINTS.user.syncProfile);
        return response.data.data;
    },
};

export default userService;