'use client';

import { Box, Avatar, Typography, Menu, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Logout, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useAuth } from '@/hooks/useAuth';

export default function UserProfile() {
  const { user } = useUserStore();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  if (!user) return null;

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          cursor: 'pointer',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.06),
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 40,
            height: 40,
          }}
        >
          {user.username?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            {user.username || 'User'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Settings sx={{ mr: 1, fontSize: 20 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <Logout sx={{ mr: 1, fontSize: 20 }} />
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
}