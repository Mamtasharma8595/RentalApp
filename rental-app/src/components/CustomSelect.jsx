
// components/CustomSelect.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  allOption = "All",
  showAllOption = true,
  sx = {},
  size = "medium",
  ...props 
}) => {
  const defaultStyles = {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.3)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.5)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4ECDC4",
    },
    "& .MuiSvgIcon-root": {
      color: "rgba(255,255,255,0.6)",
    },
    ...sx
  };

  return (
    <FormControl fullWidth size={size} {...props}>
      <InputLabel sx={{ color: "rgba(255,255,255,0.6)" }}>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        sx={defaultStyles}
      >
        {showAllOption && <MenuItem value="">{allOption}</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option.value || option} value={option.value || option}>
            {option.label || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;