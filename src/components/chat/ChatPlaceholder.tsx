'use client';

import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ChatBubbleOutline, Forum, Send } from '@mui/icons-material';

interface ChatPlaceholderProps {
  variant?: 'no-conversation' | 'no-messages';
}

export default function ChatPlaceholder({ variant = 'no-conversation' }: ChatPlaceholderProps) {
  if (variant === 'no-messages') {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          px: 4,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 120,
            height: 120,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'translate(-50%, -50%) scale(1)',
                  opacity: 0.5,
                },
                '50%': {
                  transform: 'translate(-50%, -50%) scale(1.2)',
                  opacity: 0.3,
                },
              },
            }}
          />
          <ChatBubbleOutline
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 48,
              color: 'primary.main',
            }}
          />
        </Box>

        <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
          <Typography
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              mb: 1,
            }}
          >
            No messages yet
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
            }}
          >
            Start the conversation by sending the first message.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        px: 4,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 160,
          height: 160,
        }}
      >
        {/* Animated circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.5,
              },
              '50%': {
                transform: 'translate(-50%, -50%) scale(1.3)',
                opacity: 0.2,
              },
            },
          }}
        />

        {/* Icons */}
        <Forum
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 64,
            color: 'primary.main',
          }}
        />
        
        <Send
          sx={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            fontSize: 28,
            color: 'success.main',
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': {
                transform: 'translateY(0px)',
              },
              '50%': {
                transform: 'translateY(-10px)',
              },
            },
          }}
        />
      </Box>

      <Box sx={{ textAlign: 'center', maxWidth: 480 }}>
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            mb: 1.5,
          }}
        >
          Select a conversation
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: '1rem',
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          Pick one from the sidebar, or create a new chat using the
          {' '}
          <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>
            +
          </Box>
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12),
            }}
          >
            <ChatBubbleOutline sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Direct messages
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: (theme) => alpha(theme.palette.success.main, 0.12),
            }}
          >
            <Forum sx={{ fontSize: 20, color: 'success.main' }} />
            <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Group chats
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}