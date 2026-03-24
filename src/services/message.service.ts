import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/apiEndpoints";
import type { ApiResponse, Message, PaginatedResponse, SendMessagePayload } from "@/types";

const messageService = {
    async list(conversationId: string): Promise<PaginatedResponse<Message>> {
        const response = await axiosClient.get<ApiResponse<PaginatedResponse<Message>>>(
            API_ENDPOINTS.message.list(conversationId),
        );
        return response.data.data;
    },

    async send(payload: SendMessagePayload): Promise<Message> {
        const response = await axiosClient.post<ApiResponse<Message>>(
            API_ENDPOINTS.message.send(payload.conversationId),
            { content: payload.content },
        );
        return response.data.data;
    },
};

export default messageService;