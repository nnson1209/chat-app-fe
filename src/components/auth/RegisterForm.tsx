"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterForm() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            await register({ name, email, password });

            if (typeof window !== "undefined") {
                sessionStorage.setItem(
                    "auth-toast",
                    "Đăng ký thành công! Hãy đăng nhập lại",
                );
            }

            router.replace("/login");
        } catch {
            setErrorMessage("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <TextField
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    fullWidth
                />
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
                    {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
                <Typography variant="body2" color="text.secondary">
                    Already registered? <Link href="/login">Sign in</Link>
                </Typography>
            </Stack>
        </Box>
    );
}