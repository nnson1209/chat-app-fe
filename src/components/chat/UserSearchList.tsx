"use client";

import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import type { User } from "@/types";

interface UserSearchListProps {
    users: User[];
    onSelect: (user: User) => void;
}

export default function UserSearchList({ users, onSelect }: UserSearchListProps) {
    return (
        <List dense>
            {users.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Search users to start a conversation.
                </Typography>
            ) : (
                users.map((user) => (
                    <ListItemButton key={user.id} onClick={() => onSelect(user)}>
                        <ListItemText primary={user.name} secondary={user.email} />
                    </ListItemButton>
                ))
            )}
        </List>
    );
}