import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import {
  ApiResponse,
  PageResponse,
  ConversationDetailResponse,
  CreateConversationRequest,
} from '@/types';

export const conversationService = {
  getMyConversations: async (
    page: number = 1,
    size: number = 20
  ): Promise<ApiResponse<PageResponse<ConversationDetailResponse>>> => {
    const response = await axiosClient.get<ApiResponse<PageResponse<ConversationDetailResponse>>>(
      API_ENDPOINTS.CONVERSATIONS.MY_CONVERSATIONS,
      { params: { page, size } }
    );
    return response.data;
  },

  createConversation: async (
    data: CreateConversationRequest
  ): Promise<ApiResponse<ConversationDetailResponse>> => {
    const response = await axiosClient.post<ApiResponse<ConversationDetailResponse>>(
      API_ENDPOINTS.CONVERSATIONS.CREATE,
      data
    );
    return response.data;
  },
};