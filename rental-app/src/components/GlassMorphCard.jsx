// components/GlassMorphCard.jsx
import React from 'react';
import { Card, CardContent } from '@mui/material';

const glassMorphStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
};

const GlassMorphCard = ({ children, sx = {}, ...props }) => {
  return (
    <Card sx={{ ...glassMorphStyle, ...sx }} {...props}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default GlassMorphCard;