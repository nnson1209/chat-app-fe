'use client';

import {
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Check } from '@mui/icons-material';
import { UserDetailResponse } from '@/types';

interface UserSearchListProps {
  users: UserDetailResponse[];
  loading: boolean;
  keyword: string;
  creating: boolean;
  onSelectUser: (user: UserDetailResponse) => void;
  selectedUserIds?: string[];
  selectionMode?: 'single' | 'multiple';
}

export default function UserSearchList({
  users,
  loading,
  keyword,
  creating,
  onSelectUser,
  selectedUserIds = [],
  selectionMode = 'single',
}: UserSearchListProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress color="primary" size={32} />
      </Box>
    );
  }

  if (users.length > 0) {
    return (
      <List sx={{ p: 0 }}>
        {users.map((user) => {
          const isSelected = selectedUserIds.includes(user.userId);

          return (
            <ListItemButton
              key={user.userId}
              onClick={() => onSelectUser(user)}
              disabled={creating}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                ...(selectionMode === 'multiple' && isSelected
                  ? {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.14),
                  }
                  : null),
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.white, 0.06),
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 40,
                    height: 40,
                  }}
                >
                  {user.username[0]?.toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 700 }}>
                    {user.username}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    {user.email}
                  </Typography>
                }
              />

              {selectionMode === 'multiple' && isSelected && (
                <Chip
                  size="small"
                  color="primary"
                  icon={<Check />}
                  label="Selected"
                  sx={{ ml: 1 }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    );
  }

  if (keyword.trim()) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
          color: 'text.secondary',
        }}
      >
        <Typography>No users found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        color: 'text.secondary',
      }}
    >
      <Typography>Type to search</Typography>
    </Box>
  );
}