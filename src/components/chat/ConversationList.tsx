"use client";

import {
    Avatar,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import type { Conversation } from "@/types";

interface ConversationListProps {
    conversations: Conversation[];
    activeConversationId?: string;
    onSelect: (conversationId: string) => void;
    loading?: boolean;
}

export default function ConversationList({
    conversations,
    activeConversationId,
    onSelect,
    loading,
}: ConversationListProps) {
    if (loading) {
        return (
            <List disablePadding>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ListItemButton key={index} sx={{ py: 1.25 }}>
                        <ListItemAvatar>
                            <Skeleton variant="circular" width={40} height={40} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Skeleton width="60%" />}
                            secondary={<Skeleton width="80%" />}
                        />
                        <Skeleton width={42} />
                    </ListItemButton>
                ))}
            </List>
        );
    }

    return (
        <List dense disablePadding>
            {conversations.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No conversations yet.
                </Typography>
            ) : (
                conversations.map((conversation) => (
                    <ListItemButton
                        key={conversation.id}
                        selected={conversation.id === activeConversationId}
                        onClick={() => onSelect(conversation.id)}
                        sx={{ py: 1.25 }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {(conversation.title?.trim()?.[0] ?? "?").toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle2" noWrap>
                                    {conversation.title || "(Untitled)"}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {conversation.lastMessage?.content ?? ""}
                                </Typography>
                            }
                        />
                        <Stack alignItems="flex-end" sx={{ minWidth: 64 }}>
                            <Typography variant="caption" color="text.secondary" noWrap>
                                {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
                            </Typography>
                        </Stack>
                    </ListItemButton>
                ))
            )}
        </List>
    );
}