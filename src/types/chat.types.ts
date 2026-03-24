import type { User } from "@/types/auth.types";

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    createdAt: string;
}

export interface Conversation {
    id: string;
    title: string;
    participants: User[];
    lastMessage: Message | null;
    updatedAt: string;
    createdAt: string;
}

export interface CreateConversationPayload {
    title?: string;
    participantIds: string[];
}

export interface SendMessagePayload {
    conversationId: string;
    content: string;
}