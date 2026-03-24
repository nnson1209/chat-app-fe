"use client";

import { useEffect, useMemo, useState } from "react";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import ChatPlaceholder from "@/components/chat/ChatPlaceholder";
import ConversationList from "@/components/chat/ConversationList";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import NewConversationDialog from "@/components/chat/NewConversationDialog";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import conversationService from "@/services/conversation.service";
import messageService from "@/services/message.service";
import type { Conversation, Message, User } from "@/types";

export default function ChatPage() {
  const { isAuthenticated } = useAuthGuard();
  const { user } = useUser();
  const { logout, syncProfile } = useAuth();

  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [newConversationDialogKey, setNewConversationDialogKey] = useState(0);
  const [conversationQuery, setConversationQuery] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isConversationsLoading, setIsConversationsLoading] = useState(true);

  const [selectedConversationId, setSelectedConversationId] = useState<string>();

  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let isCancelled = false;

    conversationService
      .list()
      .then((result) => {
        if (isCancelled) {
          return;
        }
        setConversations(result.items);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }
        setConversations([]);
      })
      .finally(() => {
        if (isCancelled) {
          return;
        }
        setIsConversationsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (!selectedConversationId) {
      return;
    }

    let isCancelled = false;

    messageService
      .list(selectedConversationId)
      .then((result) => {
        if (isCancelled) {
          return;
        }
        setMessages(result.items);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }
        setMessages([]);
      })
      .finally(() => undefined);

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, selectedConversationId]);

  const filteredConversations = useMemo(() => {
    const q = conversationQuery.trim().toLowerCase();
    if (!q) {
      return conversations;
    }

    return conversations.filter((conversation) =>
      (conversation.title ?? "").toLowerCase().includes(q),
    );
  }, [conversationQuery, conversations]);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const handleSelectUserForNewConversation = async (selectedUser: User) => {
    const created = await conversationService.create({
      participantIds: [selectedUser.id],
      title: selectedUser.name,
    });

    setConversations((prev) => [created, ...prev.filter((c) => c.id !== created.id)]);
    setSelectedConversationId(created.id);
    setMessages(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversationId) {
      return;
    }

    const sent = await messageService.send({
      conversationId: selectedConversationId,
      content,
    });

    setMessages((prev) => [...(prev ?? []), sent]);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        elevation={0}
        color="default"
        sx={{ bgcolor: "background.paper" }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
            <ChatRoundedIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Chat App
            </Typography>
          </Stack>

          <IconButton aria-label="sync profile" onClick={() => syncProfile()}>
            <SyncRoundedIcon />
          </IconButton>

          <Avatar
            sx={{ width: 32, height: 32, mx: 1 }}
            src={user?.avatarUrl}
          >
            {(user?.name?.[0] ?? "?").toUpperCase()}
          </Avatar>

          <IconButton aria-label="logout" onClick={handleLogout} color="error" sx={{ opacity: 0.85 }}>
            <LogoutRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, p: 2 }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: "100%",
              flexBasis: { md: "30%" },
              maxWidth: { md: "30%" },
            }}
          >
            <Paper sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  value={conversationQuery}
                  onChange={(event) => setConversationQuery(event.target.value)}
                  placeholder="Tìm hội thoại..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton
                  aria-label="new conversation"
                  onClick={() => {
                    setNewConversationDialogKey((prev) => prev + 1);
                    setIsNewConversationOpen(true);
                  }}
                >
                  <AddRoundedIcon />
                </IconButton>
              </Stack>

              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <ConversationList
                  conversations={filteredConversations}
                  activeConversationId={selectedConversationId}
                  onSelect={(conversationId) => {
                    setSelectedConversationId(conversationId);
                    setMessages(null);
                  }}
                  loading={isConversationsLoading}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            sx={{
              height: "100%",
              flexBasis: { md: "70%" },
              maxWidth: { md: "70%" },
            }}
          >
            <Paper sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
              {selectedConversationId ? (
                <>
                  <MessageList messages={messages ?? []} />
                  <MessageInput onSend={handleSendMessage} />
                </>
              ) : (
                <ChatPlaceholder />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <NewConversationDialog
        key={newConversationDialogKey}
        open={isNewConversationOpen}
        onClose={() => setIsNewConversationOpen(false)}
        onSelectUser={handleSelectUserForNewConversation}
      />
    </Box>
  );
}
