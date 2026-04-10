'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Chip,
  Button,
  Alert,
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { userService } from '@/services/user.service';
import { conversationService } from '@/services/conversation.service';
import { UserDetailResponse, ConversationType } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import UserSearchList from './UserSearchList';

interface NewConversationDialogProps {
  open: boolean;
  onClose: () => void;
  onConversationCreated: (conversationId: string) => void;
}

export default function NewConversationDialog({
  open,
  onClose,
  onConversationCreated,
}: NewConversationDialogProps) {
  const [conversationType, setConversationType] = useState<ConversationType>(ConversationType.PRIVATE);
  const [groupName, setGroupName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState<UserDetailResponse[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserDetailResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    const searchUsers = async () => {
      if (!debouncedKeyword.trim()) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        const response = await userService.searchUsers(debouncedKeyword, 1, 10);
        setUsers(response.data.data.content);
      } catch (error) {
        console.error('Failed to search users:', error);
      } finally {
        setLoading(false);
      }
    };

    searchUsers();
  }, [debouncedKeyword]);

  const handleSelectUser = async (user: UserDetailResponse) => {
    if (conversationType === ConversationType.GROUP) {
      setSelectedUsers((prev) => {
        const exists = prev.some((u) => u.userId === user.userId);
        if (exists) {
          return prev.filter((u) => u.userId !== user.userId);
        }
        return [...prev, user];
      });
      return;
    }

    setError(null);

    try {
      setCreating(true);
      const response = await conversationService.createConversation({
        participantIds: [user.userId],
        conversationType: ConversationType.PRIVATE,
      });

      onConversationCreated(response.data.id);
      handleClose();
    } catch (error) {
      console.error('Failed to create conversation:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleCreateGroup = async () => {
    const trimmedName = groupName.trim();
    if (!trimmedName) {
      setError('Please enter a group name');
      return;
    }

    if (selectedUsers.length < 2) {
      setError('Please select at least 2 members for a group');
      return;
    }

    setError(null);

    try {
      setCreating(true);
      const response = await conversationService.createConversation({
        name: trimmedName,
        conversationType: ConversationType.GROUP,
        participantIds: selectedUsers.map((user) => user.userId),
      });

      onConversationCreated(response.data.id);
      handleClose();
    } catch (createError) {
      console.error('Failed to create group conversation:', createError);
      setError('Failed to create group. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleConversationTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: ConversationType | null,
  ) => {
    if (!value) return;

    setConversationType(value);
    setError(null);
    setSelectedUsers([]);
    setGroupName('');
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.userId !== userId));
  };

  const handleClose = () => {
    setConversationType(ConversationType.PRIVATE);
    setGroupName('');
    setKeyword('');
    setUsers([]);
    setSelectedUsers([]);
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundImage: 'none',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
          fontWeight: 600,
        }}
      >
        New conversation
        <IconButton onClick={handleClose} size="small" sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <ToggleButtonGroup
          value={conversationType}
          exclusive
          onChange={handleConversationTypeChange}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        >
          <ToggleButton value={ConversationType.PRIVATE}>Direct chat</ToggleButton>
          <ToggleButton value={ConversationType.GROUP}>Group chat</ToggleButton>
        </ToggleButtonGroup>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {conversationType === ConversationType.GROUP && (
          <TextField
            fullWidth
            label="Group name"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          fullWidth
          placeholder="Search by email or username..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
          slotProps={{
            input: {
              startAdornment: <Search color="action" sx={{ mr: 1 }} />,
            },
          }}
          sx={{
            '& .MuiInputBase-input::placeholder': {
              color: (theme) => theme.palette.text.secondary,
              opacity: 1,
            },
          }}
        />

        {conversationType === ConversationType.GROUP && selectedUsers.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1 }}>
              Selected members ({selectedUsers.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedUsers.map((user) => (
                <Chip
                  key={user.userId}
                  label={user.username}
                  onDelete={() => removeSelectedUser(user.userId)}
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 2, minHeight: 200, maxHeight: 400, overflowY: 'auto' }}>
          <UserSearchList
            users={users}
            loading={loading}
            keyword={keyword}
            creating={creating}
            onSelectUser={handleSelectUser}
            selectedUserIds={selectedUsers.map((user) => user.userId)}
            selectionMode={conversationType === ConversationType.GROUP ? 'multiple' : 'single'}
          />
        </Box>

        {conversationType === ConversationType.GROUP && (
          <Typography sx={{ mt: 1, color: 'text.secondary', fontSize: '0.8125rem' }}>
            Select at least 2 members, then click Create group.
          </Typography>
        )}
      </DialogContent>

      {conversationType === ConversationType.GROUP && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="inherit" disabled={creating}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateGroup}
            disabled={creating || !groupName.trim() || selectedUsers.length < 2}
          >
            {creating ? 'Creating...' : 'Create group'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}