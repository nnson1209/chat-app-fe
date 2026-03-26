'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, InputAdornment, IconButton, Link as MuiLink } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [autofilled, setAutofilled] = useState<{
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
  }>({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });
  const { register, loading, error } = useAuth();

  const handleAutofill =
    (key: 'email' | 'username' | 'password' | 'confirmPassword') =>
    (e: React.AnimationEvent<HTMLInputElement>) => {
      if (e.animationName === 'mui-auto-fill') {
        setAutofilled((prev) => ({ ...prev, [key]: true }));
      }
      if (e.animationName === 'mui-auto-fill-cancel') {
        setAutofilled((prev) => ({ ...prev, [key]: false }));
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError('');

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    await register({ email, username, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Create your account in seconds.
      </Typography>

      {(error || validationError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || validationError}
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
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
        size="medium"
        sx={(theme) => ({
          mb: 2,
          ...(autofilled.username
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
                <Person fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
          htmlInput: {
            onAnimationStart: handleAutofill('username'),
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
        autoComplete="new-password"
        size="medium"
        sx={(theme) => ({
          mb: 2,
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
              <InputAdornment
                position="end"
                sx={(theme) =>
                  autofilled.password
                    ? {
                        alignSelf: 'stretch',
                        m: 0,
                        px: 0.5,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                      }
                    : {}
                }
              >
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

      <TextField
        fullWidth
        label="Confirm password"
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
        size="medium"
        sx={(theme) => ({
          mb: 3,
          ...(autofilled.confirmPassword
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
              <InputAdornment
                position="end"
                sx={(theme) =>
                  autofilled.confirmPassword
                    ? {
                        alignSelf: 'stretch',
                        m: 0,
                        px: 0.5,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                      }
                    : {}
                }
              >
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          },
          htmlInput: {
            onAnimationStart: handleAutofill('confirmPassword'),
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
        {loading ? 'Creating account…' : 'Create account'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Already have an account?{' '}
          <MuiLink component={Link} href="/login" underline="hover" color="primary" sx={{ fontWeight: 700 }}>
            Sign in
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}