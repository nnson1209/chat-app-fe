"use client";

import { Box, Container, Paper, Typography } from "@mui/material";
import Logo from "@/components/common/Logo";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
    return (
        <Container maxWidth="sm" sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 2 }}>
            <Paper sx={{ width: "100%", p: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Logo />
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>
                {children}
            </Paper>
        </Container>
    );
}