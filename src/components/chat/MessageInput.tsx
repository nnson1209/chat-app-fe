'use client';

import { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Send, AddCircleOutline } from '@mui/icons-material';

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
        }}
      >
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <AddCircleOutline fontSize="small" />
        </IconButton>

        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message…"
          disabled={disabled}
          variant="standard"
          sx={{
            '& .MuiInput-root': {
              color: 'text.primary',
              fontSize: '0.9375rem',
              '&:before, &:after': {
                display: 'none',
              },
            },
            '& .MuiInputBase-input': {
              padding: '8px 0',
              '&::placeholder': {
                color: (theme) => theme.palette.text.secondary,
                opacity: 1,
              },
            },
          }}
        />

        <IconButton
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="small"
          sx={{
            color: message.trim() ? 'primary.main' : 'text.disabled',
          }}
        >
          <Send fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}