import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  ApiResponse,
  PageResponse,
  ChatMessageResponse,
  ChatMessageRequest,
} from '@/types';

export const messageService = {
  getMessages: async (
    conversationId: string,
    page: number = 1,
    size: number = 50
  ): Promise<ApiResponse<PageResponse<ChatMessageResponse>>> => {
    const response = await axiosClient.get<ApiResponse<PageResponse<ChatMessageResponse>>>(
      API_ENDPOINTS.MESSAGES.GET_BY_CONVERSATION(conversationId),
      { params: { page, size } }
    );
    return response.data;
  },

  sendMessage: async (
    data: ChatMessageRequest
  ): Promise<ApiResponse<ChatMessageResponse>> => {
    const response = await axiosClient.post<ApiResponse<ChatMessageResponse>>(
      API_ENDPOINTS.MESSAGES.SEND,
      data
    );
    return response.data;
  },
};