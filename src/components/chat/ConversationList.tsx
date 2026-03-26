'use client';

import { Box, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, CircularProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ConversationDetailResponse } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useState, useEffect } from 'react';

interface ConversationListProps {
  conversations: ConversationDetailResponse[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading?: boolean;
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  loading = false,
}: ConversationListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getConversationName = (conv: ConversationDetailResponse) => {
    if (conv.name) return conv.name;
    return conv.participantInfo?.map(p => p.username).join(', ') || 'Conversation';
  };

  const formatTime = (timeString: string) => {
    if (!isMounted) return '';
    return formatDistanceToNow(new Date(timeString), {
      addSuffix: false,
      locale: enUS,
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {conversations.map((conv) => (
        <ListItemButton
          key={conv.id}
          selected={selectedId === conv.id}
          onClick={() => onSelect(conv.id)}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 1,
            mx: 1,
            mb: 0.5,
            '&.Mui-selected': {
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08),
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.08),
              },
            },
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.05),
            },
          }}
        >
          <ListItemAvatar sx={{ minWidth: 48 }}>
            <Avatar
              src={conv.conversationAvatar || undefined}
              sx={{
                bgcolor: 'primary.main',
                width: 40,
                height: 40,
                fontSize: '1rem',
              }}
            >
              {getConversationName(conv)[0]?.toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ my: 0 }}
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    lineHeight: 1.2,
                  }}
                >
                  {getConversationName(conv)}
                </Typography>
                {conv.lastMessageTime && (
                  <Typography
                    component="span"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      ml: 1,
                      flexShrink: 0,
                    }}
                  >
                    {formatTime(conv.lastMessageTime)}
                  </Typography>
                )}
              </Box>
            }
            secondary={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    lineHeight: 1.3,
                  }}
                >
                  {conv.lastMessageContent || 'No messages yet'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1, flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: conv.isOnline ? 'success.main' : 'text.disabled',
                    }}
                  />
                  <Typography
                    component="span"
                    sx={{
                      color: conv.isOnline ? 'success.main' : 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {conv.isOnline ? 'Online' : 'Offline'}
                  </Typography>
                </Box>
              </Box>
            }
          />
        </ListItemButton>
      ))}
    </List>
  );
}