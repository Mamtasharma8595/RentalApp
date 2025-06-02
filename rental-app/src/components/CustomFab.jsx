// components/CustomFab.jsx
import React from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

const CustomFab = ({ 
  onClick, 
  icon = <Add />, 
  color = "#4ECDC4",
  hoverColor = "#45B7D1",
  position = { bottom: 16, right: 16 },
  ...props 
}) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: position.bottom,
        right: position.right,
        backgroundColor: color,
        "&:hover": {
          backgroundColor: hoverColor,
        },
      }}
      {...props}
    >
      {icon}
    </Fab>
  );
};

export default CustomFab;