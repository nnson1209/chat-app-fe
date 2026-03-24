"use client";

import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Box, Stack, Typography } from "@mui/material";

export default function ChatPlaceholder() {
    return (
        <Box
            sx={{
                height: "100%",
                display: "grid",
                placeItems: "center",
            }}
        >
            <Stack spacing={1.5} alignItems="center">
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 72, opacity: 0.25 }} />
                <Typography variant="h6" color="text.secondary">
                    Hãy chọn một người để bắt đầu chém gió
                </Typography>
            </Stack>
        </Box>
    );
}