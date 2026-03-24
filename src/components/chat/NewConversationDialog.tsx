"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import type { User } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import userService from "@/services/user.service";
import UserSearchList from "@/components/chat/UserSearchList";

interface NewConversationDialogProps {
    open: boolean;
    onClose: () => void;
    onSelectUser: (user: User) => void;
}

export default function NewConversationDialog({
    open,
    onClose,
    onSelectUser,
}: NewConversationDialogProps) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    const debouncedQuery = useDebounce(query, 500);
    const trimmedQuery = useMemo(() => debouncedQuery.trim(), [debouncedQuery]);

    useEffect(() => {
        if (!open) {
            return;
        }

        if (!trimmedQuery) {
            return;
        }

        let isCancelled = false;

        userService
            .search(trimmedQuery)
            .then((result) => {
                if (isCancelled) {
                    return;
                }
                setUsers(result.items);
            })
            .catch(() => {
                if (isCancelled) {
                    return;
                }
                setUsers([]);
            });

        return () => {
            isCancelled = true;
        };
    }, [open, trimmedQuery]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Tìm bạn bè</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    value={query}
                    onChange={(event) => {
                        const next = event.target.value;
                        setQuery(next);

                        if (!next.trim()) {
                            setUsers([]);
                        }
                    }}
                    label="Tìm kiếm"
                    placeholder="Nhập tên hoặc email..."
                    fullWidth
                />

                <UserSearchList
                    users={users}
                    onSelect={(user) => {
                        onSelectUser(user);
                        onClose();
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}