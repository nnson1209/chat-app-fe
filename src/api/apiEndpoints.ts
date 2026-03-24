export const API_ENDPOINTS = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
        me: "/auth/me",
    },
    conversation: {
        list: "/conversations",
        create: "/conversations",
        details: (conversationId: string) => `/conversations/${conversationId}`,
    },
    message: {
        list: (conversationId: string) => `/conversations/${conversationId}/messages`,
        send: (conversationId: string) => `/conversations/${conversationId}/messages`,
    },
    user: {
        profile: "/users/me",
        search: "/users/search",
        syncProfile: "/users/sync",
    },
} as const;

export default API_ENDPOINTS;