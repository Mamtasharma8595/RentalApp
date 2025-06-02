import React from 'react';
import MuiButton from '@mui/material/Button'; // Import the actual MUI Button

export const Button = ({
  children,
  variant = 'contained', // MUI supports 'contained', 'outlined', 'text'
  size = 'medium',        // MUI supports 'small', 'medium', 'large'
  sx = {},
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      size={size}
      sx={{
        background: variant === 'contained' ? 'rgba(255, 255, 255, 0.15)' : undefined,
        backdropFilter: variant === 'contained' ? 'blur(8px)' : undefined,
        border: variant !== 'text' ? '1px solid rgba(255, 255, 255, 0.2)' : undefined,
        color: '#fff',
        textTransform: 'none',
        borderRadius: '8px',
        '&:hover': {
          background:
            variant === 'contained'
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(255, 255, 255, 0.1)',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
