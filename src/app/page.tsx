
'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Divider, IconButton, useMediaQuery } from '@mui/material';
import { Add, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useWebSocket } from '@/hooks/useWebSocket';
import { conversationService } from '@/services/conversation.service';
import { messageService } from '@/services/message.service';
import { ConversationDetailResponse, ChatMessageResponse, MessageType } from '@/types';
import ConversationList from '@/components/chat/ConversationList';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import UserProfile from '@/components/common/UserProfile';
import Logo from '@/components/common/Logo';
import NewConversationDialog from '@/components/chat/NewConversationDialog';
import ChatPlaceholder from '@/components/chat/ChatPlaceholder';

export default function HomePage() {
  const { isAuthenticated } = useAuthGuard();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const [conversations, setConversations] = useState<ConversationDetailResponse[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showNewConversation, setShowNewConversation] = useState(false);

  // Connect WebSocket và subscribe
  useWebSocket((message: ChatMessageResponse) => {
    if (selectedConversation && message.conversationId === selectedConversation) {
      setMessages((prev) => [...prev, message]);
    }
  });

  // Load conversations
  useEffect(() => {
    if (isAuthenticated) {
      loadConversations();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setShowSidebar(mdUp);
  }, [mdUp]);

  // Load messages when conversation selected
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    try {
      setLoadingConversations(true);
      const response = await conversationService.getMyConversations(1, 50);
      setConversations(response.data.content);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoadingConversations(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      setLoadingMessages(true);
      const response = await messageService.getMessages(conversationId, 1, 20);
      setMessages(response.data.content.reverse());
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation) return;

    const tempId = `temp-${crypto.randomUUID()}`;

    try {
      setSendingMessage(true);
      const response = await messageService.sendMessage({
        conversationId: selectedConversation,
        content,
        messageType: MessageType.TEXT,
        tempId,
      });

      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleConversationCreated = (conversationId: string) => {
    loadConversations();
    setSelectedConversation(conversationId);
  };

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100dvh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Sidebar - Conversations */}
      <Box
        sx={{
          width: { xs: showSidebar ? '80vw' : 0, sm: showSidebar ? 320 : 0, md: 320 },
          maxWidth: 360,
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          transition: (t) => t.transitions.create('width', { duration: t.transitions.duration.shortest }),
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 48,
            px: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Logo size="small" showText={false} />
          <Typography sx={{ fontWeight: 800, fontSize: '0.9375rem', flex: 1 }}>
            Messages
          </Typography>
          <IconButton
            size="small"
            onClick={() => setShowNewConversation(true)}
            sx={{ color: 'text.secondary' }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>

        {/* Conversation List */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
            loading={loadingConversations}
          />
        </Box>

        {/* User Profile */}
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <UserProfile />
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Box
          sx={{
            height: 48,
            backgroundColor: 'background.default',
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => setShowSidebar(!showSidebar)}
            sx={{ color: 'text.secondary', display: { md: 'none' } }}
            size="small"
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          {selectedConv && (
            <>
              <Typography sx={{ fontWeight: 800, fontSize: '0.9375rem' }}>
                {selectedConv.name || selectedConv.participantInfo?.map(p => p.username).join(', ')}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                {selectedConv.participantInfo?.length} members
              </Typography>
              {/* Online status */}
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: selectedConv.isOnline ? 'success.main' : 'text.disabled',
                    border: '2px solid',
                    borderColor: 'background.default',
                    boxSizing: 'border-box',
                  }}
                />
                <Typography
                  sx={{
                    color: selectedConv.isOnline ? 'success.main' : 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                  }}
                >
                  {selectedConv.isOnline ? 'Online' : selectedConv.lastOnlineAt || 'Offline'}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        {/* Messages */}
        {selectedConversation ? (
          <>
            <MessageList messages={messages} loading={loadingMessages} />
            <MessageInput onSend={handleSendMessage} disabled={sendingMessage} />
          </>
        ) : (
          <ChatPlaceholder variant="no-conversation" />
        )}
      </Box>

      {/* New Conversation Dialog */}
      <NewConversationDialog
        open={showNewConversation}
        onClose={() => setShowNewConversation(false)}
        onConversationCreated={handleConversationCreated}
      />
    </Box>
  );
}