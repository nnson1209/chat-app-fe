'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { Add, Menu as MenuIcon } from '@mui/icons-material';
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
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#36393f' }}>
      {/* Sidebar - Conversations */}
      <Box
        sx={{
          width: showSidebar ? 280 : 0,
          backgroundColor: '#2f3136',
          borderRight: '1px solid #202225',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 48,
            px: 2,
            borderBottom: '1px solid #202225',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Logo size="small" showText={false} />
          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9375rem', flex: 1 }}>
            Tin nhắn
          </Typography>
          <IconButton
            size="small"
            onClick={() => setShowNewConversation(true)}
            sx={{ color: '#b9bbbe', '&:hover': { color: '#fff' } }}
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
        <Box sx={{ borderTop: '1px solid #202225' }}>
          <UserProfile />
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Box
          sx={{
            height: 48,
            backgroundColor: '#36393f',
            borderBottom: '1px solid #202225',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => setShowSidebar(!showSidebar)}
            sx={{ color: '#b9bbbe', display: { md: 'none' } }}
            size="small"
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          {selectedConv && (
            <>
              <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9375rem' }}>
                {selectedConv.name || selectedConv.participantInfo?.map(p => p.username).join(', ')}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ borderColor: '#202225' }} />
              <Typography sx={{ color: '#b9bbbe', fontSize: '0.8125rem' }}>
                {selectedConv.participantInfo?.length} thành viên
              </Typography>
              {/* Online status */}
              <Divider orientation="vertical" flexItem sx={{ borderColor: '#202225', mx: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: selectedConv.isOnline ? '#23a55a' : '#80848e',
                    border: '2px solid #36393f',
                    boxSizing: 'border-box',
                  }}
                />
                <Typography sx={{
                  color: selectedConv.isOnline ? '#23a55a' : '#b9bbbe',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}>
                  {selectedConv.isOnline ? 'Đang hoạt động' : selectedConv.lastOnlineAt || 'Không hoạt động'}
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