"use client";

import { Avatar, Stack, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";

export default function UserProfile() {
    const { user } = useUser();

    if (!user) {
        return (
            <Typography variant="body2" color="text.secondary">
                Not signed in.
            </Typography>
        );
    }

    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar src={user.avatarUrl}>{user.name[0]}</Avatar>
            <Stack>
                <Typography variant="subtitle2">{user.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                    {user.email}
                </Typography>
            </Stack>
        </Stack>
    );
}