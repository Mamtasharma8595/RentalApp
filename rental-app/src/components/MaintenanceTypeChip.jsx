// components/MaintenanceTypeChip.jsx
import React from 'react';
import { Chip } from '@mui/material';

const MaintenanceTypeChip = ({ type }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "Emergency":
        return "error";
      case "Repair":
        return "warning";
      case "Inspection":
        return "info";
      case "Routine":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={type}
      color={getTypeColor(type)}
      size="small"
    />
  );
};

export default MaintenanceTypeChip;