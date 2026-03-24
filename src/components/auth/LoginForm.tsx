"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isToastOpen, setIsToastOpen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const message = sessionStorage.getItem("auth-toast");
        if (message) {
            sessionStorage.removeItem("auth-toast");
            setToastMessage(message);
            setIsToastOpen(true);
        }
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            await login({ email, password });
            router.push("/");
        } catch {
            setErrorMessage("Unable to sign in. Please verify your credentials.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
                <Typography variant="body2" color="text.secondary">
                    No account yet? <Link href="/register">Create one</Link>
                </Typography>
            </Stack>

            <Snackbar
                open={isToastOpen}
                autoHideDuration={2500}
                onClose={() => setIsToastOpen(false)}
                message={toastMessage ?? undefined}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </Box>
    );
}