"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "@/theme/theme";

interface ThemeRegistryProps {
    children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}