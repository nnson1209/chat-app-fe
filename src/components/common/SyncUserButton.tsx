"use client";

import { useState } from "react";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import { Button } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";

export default function SyncUserButton() {
    const { syncProfile } = useAuth();
    const [isSyncing, setIsSyncing] = useState(false);

    const handleClick = async () => {
        setIsSyncing(true);

        try {
            await syncProfile();
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <Button
            variant="outlined"
            startIcon={<SyncRoundedIcon />}
            onClick={handleClick}
            disabled={isSyncing}
        >
            {isSyncing ? "Syncing..." : "Sync profile"}
        </Button>
    );
}