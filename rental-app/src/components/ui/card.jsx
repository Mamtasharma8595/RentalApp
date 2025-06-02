import React from 'react';
import { Card as MUICard, CardContent as MUICardContent } from '@mui/material';

export const Card = ({ children, sx = {}, ...props }) => (
  <MUICard
    elevation={3}
    sx={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      color: '#fff',
      ...sx,
    }}
    {...props}
  >
    {children}
  </MUICard>
);

export const CardContent = ({ children, sx = {}, ...props }) => (
  <MUICardContent sx={{ p: 2, ...sx }} {...props}>
    {children}
  </MUICardContent>
);
