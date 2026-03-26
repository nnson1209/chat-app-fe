import { Box, Typography } from '@mui/material';
import { darken } from '@mui/material/styles';
import { Chat } from '@mui/icons-material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const sizes = {
    small: { icon: 32, text: '1rem' },
    medium: { icon: 48, text: '1.5rem' },
    large: { icon: 64, text: '2rem' },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Logo Icon */}
      <Box
        sx={{
          width: sizes[size].icon,
          height: sizes[size].icon,
          borderRadius: '50%',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${darken(
              theme.palette.primary.main,
              0.25,
            )} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: (theme) => theme.shadows[6],
          transition: (theme) =>
            theme.transitions.create(['transform', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <Chat
          sx={{
            color: (theme) => theme.palette.common.white,
            fontSize: sizes[size].icon * 0.6,
          }}
        />
      </Box>

      {/* Logo Text */}
      {showText && (
        <Box>
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: sizes[size].text,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Chat
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: `calc(${sizes[size].text} * 0.6)`,
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            MESSENGER
          </Typography>
        </Box>
      )}
    </Box>
  );
}