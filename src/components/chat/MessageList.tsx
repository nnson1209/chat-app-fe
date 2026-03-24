"use client";

import { useEffect, useRef } from "react";
import { Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import type { Message } from "@/types";

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Stack spacing={1} sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
            {messages.length === 0 ? (
                <Typography color="text.secondary">No messages in this conversation yet.</Typography>
            ) : (
                messages.map((message) => (
                    <Stack key={message.id} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.default" }}>
                        <Typography variant="body1">{message.content}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </Typography>
                    </Stack>
                ))
            )}
            <div ref={bottomRef} />
        </Stack>
    );
}