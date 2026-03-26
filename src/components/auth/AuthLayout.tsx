"use client";

import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Chat, ChatBubbleOutline, Forum, Send } from "@mui/icons-material";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
    return (
        <Box
            sx={{
                minHeight: "100dvh",
                width: "100%",
                display: "grid",
                placeItems: "center",
                px: { xs: 2, sm: 3 },
                position: "relative",
                overflow: "hidden",
                backgroundImage: (theme) =>
                    `radial-gradient(980px circle at 18% 14%, ${alpha(
                        theme.palette.primary.main,
                        0.3,
                    )} 0%, transparent 60%),
                     radial-gradient(900px circle at 82% 86%, ${alpha(
                         theme.palette.success.main,
                         0.22,
                     )} 0%, transparent 60%),
                     radial-gradient(1200px circle at 50% 105%, ${alpha(
                         theme.palette.common.white,
                         0.07,
                     )} 0%, transparent 55%),
                     linear-gradient(180deg, ${alpha(
                         theme.palette.common.white,
                         0.07,
                     )} 0%, ${alpha(theme.palette.background.default, 0.82)} 42%, ${alpha(
                         theme.palette.background.paper,
                         0.97,
                     )} 100%)`,
            }}
        >
            {/* Decorative background (subtle icons across the screen) */}
            <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <ChatBubbleOutline
                    sx={{
                        position: "absolute",
                        top: { xs: 40, sm: 60 },
                        left: { xs: 16, sm: 48 },
                        fontSize: { xs: 140, sm: 220 },
                        color: (theme) => alpha(theme.palette.common.white, 0.055),
                        transform: "rotate(-12deg)",
                    }}
                />
                <Forum
                    sx={{
                        position: "absolute",
                        bottom: { xs: 30, sm: 48 },
                        right: { xs: 18, sm: 54 },
                        fontSize: { xs: 160, sm: 260 },
                        color: (theme) => alpha(theme.palette.common.white, 0.05),
                        transform: "rotate(10deg)",
                    }}
                />
                <Send
                    sx={{
                        position: "absolute",
                        top: { xs: 140, sm: 180 },
                        right: { xs: 46, sm: 140 },
                        fontSize: { xs: 44, sm: 56 },
                        color: (theme) => alpha(theme.palette.primary.main, 0.11),
                        transform: "rotate(8deg)",
                    }}
                />
            </Box>

            <Container maxWidth="sm" sx={{ position: "relative" }}>
                <Paper
                    variant="outlined"
                    sx={{
                        width: "100%",
                        p: { xs: 3, sm: 4 },
                        borderRadius: 4,
                        borderColor: (theme) => alpha(theme.palette.common.white, 0.08),
                        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                                    color: "primary.main",
                                    width: 48,
                                    height: 48,
                                }}
                            >
                                <Chat />
                            </Avatar>

                            <Box sx={{ minWidth: 0 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 900,
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    Chat Application
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Secure, real-time messaging
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="h5" sx={{ mt: 2, mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {subtitle}
                        </Typography>
                    </Box>
                    {children}
                </Paper>
            </Container>
        </Box>
    );
}