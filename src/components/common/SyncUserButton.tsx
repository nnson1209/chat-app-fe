'use client';

import { Button, CircularProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Refresh } from '@mui/icons-material';
import { useUser } from '@/hooks/useUser';

export default function RefreshUserButton() {
  const { myInfo, loading } = useUser();

  const handleRefresh = async () => {
    try {
      await myInfo();
    } catch (error) {
      console.error('Failed to refresh user info:', error);
    }
  };

  return (
    <Button
      onClick={handleRefresh}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={16} /> : <Refresh />}
      sx={{
        color: 'text.secondary',
        '&:hover': {
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.06),
        },
      }}
    >
      {loading ? 'Refreshing…' : 'Refresh profile'}
    </Button>
  );
}