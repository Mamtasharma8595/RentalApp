// components/CustomDialog.jsx
import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton, 
  Typography, 
  Box 
} from '@mui/material';
import { Close } from '@mui/icons-material';

const glassMorphStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
};

const CustomDialog = ({ 
  open, 
  onClose, 
  title, 
  children, 
  actions, 
  maxWidth = "md",
  fullWidth = true 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          ...glassMorphStyle,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "white",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", p: 2 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;