"use client";

import { FormEvent, KeyboardEvent, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface MessageInputProps {
    onSend: (content: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
    const [content, setContent] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmed = content.trim();
        if (!trimmed) {
            return;
        }

        onSend(trimmed);
        setContent("");
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "Enter") {
            return;
        }

        if (event.shiftKey) {
            return;
        }

        event.preventDefault();

        const trimmed = content.trim();
        if (!trimmed) {
            return;
        }

        onSend(trimmed);
        setContent("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Nhập tin nhắn..."
                multiline
                minRows={1}
                maxRows={5}
                onKeyDown={handleKeyDown}
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 999,
                    },
                }}
            />
            <IconButton type="submit" color="primary" aria-label="send message">
                <SendRoundedIcon />
            </IconButton>
        </Box>
    );
}