// components/StatusChip.jsx
import React from 'react';
import { Chip } from '@mui/material';
import { 
  CheckCircle, 
  Schedule, 
  Warning, 
  Assignment, 
  Cancel 
} from '@mui/icons-material';

const StatusChip = ({ status, type = "rental" }) => {
  const getStatusConfig = (status, type) => {
    if (type === "rental") {
      switch (status) {
        case "Active":
          return { color: "success", icon: <CheckCircle /> };
        case "Reserved":
          return { color: "primary", icon: <Schedule /> };
        case "Overdue":
          return { color: "error", icon: <Warning /> };
        case "Returned":
          return { color: "default", icon: <Assignment /> };
        case "Cancelled":
          return { color: "secondary", icon: <Cancel /> };
        default:
          return { color: "primary", icon: <Assignment /> };
      }
    } else if (type === "maintenance") {
      switch (status) {
        case "Completed":
          return { color: "success" };
        case "In Progress":
          return { color: "warning" };
        case "Scheduled":
          return { color: "info" };
        default:
          return { color: "default" };
      }
    }
    return { color: "default" };
  };

  const config = getStatusConfig(status, type);

  return (
    <Chip
      label={status}
      color={config.color}
      size="small"
      icon={config.icon}
    />
  );
};

export default StatusChip;