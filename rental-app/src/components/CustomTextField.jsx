
// components/CustomTextField.jsx
import { TextField, InputAdornment } from '@mui/material';

const CustomTextField = ({ 
  startIcon, 
  endIcon, 
  sx = {}, 
  inputSlotProps = {}, 
  inputLabelSlotProps = {},
  ...props 
}) => {
  const defaultStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.3)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4ECDC4",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.6)",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(255,255,255,0.7)",
      opacity: 1,
    },
    ...sx
  };

  const enhancedInputSlotProps = {
    ...inputSlotProps,
    ...(startIcon && {
      startAdornment: (
        <InputAdornment position="start">
          {startIcon}
        </InputAdornment>
      )
    }),
    ...(endIcon && {
      endAdornment: (
        <InputAdornment position="end">
          {endIcon}
        </InputAdornment>
      )
    })
  };

  const defaultLabelSlotProps = {
    sx: { color: "rgba(255,255,255,0.6)" },
    ...inputLabelSlotProps
  };

  return (
    <TextField
      sx={defaultStyles}
      slotProps={{
        input: enhancedInputSlotProps,
        inputLabel: defaultLabelSlotProps,
      }}
      {...props}
    />
  );
};

export default CustomTextField;