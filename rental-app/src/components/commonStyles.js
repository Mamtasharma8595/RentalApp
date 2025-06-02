// utils/commonStyles.js
export const glassMorphStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
};

export const backgroundGradient = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  minHeight: "100vh",
};

export const inputStyles = {
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
};

export const colors = {
  primary: "#4ECDC4",
  secondary: "#45B7D1",
  success: "#96CEB4",
  warning: "#FFD93D",
  error: "#FF6B6B",
  info: "#B19CD9",
};
