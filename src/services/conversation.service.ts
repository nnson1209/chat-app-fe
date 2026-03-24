import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/apiEndpoints";
import type { ApiResponse, Conversation, CreateConversationPayload, PaginatedResponse } from "@/types";

const conversationService = {
    async list(): Promise<PaginatedResponse<Conversation>> {
        const response = await axiosClient.get<ApiResponse<PaginatedResponse<Conversation>>>(
            API_ENDPOINTS.conversation.list,
        );
        return response.data.data;
    },

    async create(payload: CreateConversationPayload): Promise<Conversation> {
        const response = await axiosClient.post<ApiResponse<Conversation>>(
            API_ENDPOINTS.conversation.create,
            payload,
        );
        return response.data.data;
    },
};

export default conversationService;