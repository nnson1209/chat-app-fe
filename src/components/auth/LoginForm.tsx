'use client';

import { useState, type AnimationEvent, type FormEvent } from 'react';
import { TextField, Button, Typography, Box, Alert, InputAdornment, IconButton, Link as MuiLink } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autofilled, setAutofilled] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const { login, loading, error } = useAuth();

  const handleAutofill =
    (key: 'email' | 'password') => (e: AnimationEvent<HTMLInputElement>) => {
      if (e.animationName === 'mui-auto-fill') {
        setAutofilled((prev) => ({ ...prev, [key]: true }));

        // Browser autofill may not trigger onChange for controlled inputs.
        // Sync DOM value back into React state so labels/layout stay correct.
        const nextValue = e.currentTarget.value;
        if (key === 'email') {
          if (nextValue && nextValue !== email) setEmail(nextValue);
        } else {
          if (nextValue && nextValue !== password) setPassword(nextValue);
        }
      }
      if (e.animationName === 'mui-auto-fill-cancel') {
        setAutofilled((prev) => ({ ...prev, [key]: false }));
      }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        size="medium"
        sx={(theme) => ({
          mb: 2,
          ...(autofilled.email
            ? {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
                '& .MuiOutlinedInput-root:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.11),
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.primary.main, 0.26),
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                },
              }
            : null),
        })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Email fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
          htmlInput: {
            onAnimationStart: handleAutofill('email'),
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        size="medium"
        sx={(theme) => ({
          mb: 3,
          ...(autofilled.password
            ? {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
                '& .MuiOutlinedInput-root:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.11),
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.primary.main, 0.26),
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                },
              }
            : null),
        })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock fontSize="small" color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ m: 0, alignSelf: 'center' }}>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  color="inherit"
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  })}
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          },
          htmlInput: {
            onAnimationStart: handleAutofill('password'),
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ py: 1.25 }}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don’t have an account?{' '}
          <MuiLink component={Link} href="/register" underline="hover" color="primary" sx={{ fontWeight: 700 }}>
            Create one
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}