
// components/ActionButtons.jsx
import React from 'react';
import { Stack, IconButton, Tooltip } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const ActionButtons = ({ 
  onView, 
  onEdit, 
  onDelete, 
  showView = true, 
  showEdit = true, 
  showDelete = true,
  size = "small" 
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {showView && onView && (
        <Tooltip title="View Details">
          <IconButton
            size={size}
            sx={{ color: "#4ECDC4" }}
            onClick={onView}
          >
            <Visibility fontSize={size} />
          </IconButton>
        </Tooltip>
      )}
      {showEdit && onEdit && (
        <Tooltip title="Edit">
          <IconButton
            size={size}
            sx={{ color: "#45B7D1" }}
            onClick={onEdit}
          >
            <Edit fontSize={size} />
          </IconButton>
        </Tooltip>
      )}
      {showDelete && onDelete && (
        <Tooltip title="Delete">
          <IconButton
            size={size}
            sx={{ color: "#FF6B6B" }}
            onClick={onDelete}
          >
            <Delete fontSize={size} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default ActionButtons;