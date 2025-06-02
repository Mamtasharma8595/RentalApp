import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Container,
  Avatar,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Build,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const glassMorphStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Static validation
    if (formData.username === "admin" && formData.password === "password") {
      setError("");
      setIsLoading(true);

      // Simulate login process
      setTimeout(() => {
        onLogin(); // Call the parent function to set authentication
        navigate("/dashboard"); // Navigate to dashboard
      }, 1000);
    } else {
      setError(
        'Invalid credentials. Please use username: "admin" and password: "password"'
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #232526 0%, #414345 40%,rgb(46, 60, 131) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ ...glassMorphStyle, textAlign: "center", p: 4 }}>
            <CardContent>
              <Avatar
                sx={{
                  bgcolor: "#4ECDC4",
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <Build fontSize="large" />
              </Avatar>
              <Typography variant="h4" color="white" fontWeight="bold" mb={2}>
                Login Successful!
              </Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.8)" mb={3}>
                Redirecting to Equipment Rental Dashboard...
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 4,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#4ECDC4",
                    animation: "loading 1s ease-in-out",
                    "@keyframes loading": {
                      "0%": { width: "0%" },
                      "100%": { width: "100%" },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #232526 0%, #414345 40%,rgb(46, 60, 131) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ ...glassMorphStyle }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box textAlign="center" mb={4}>
              <Avatar
                sx={{
                  bgcolor: "#4ECDC4",
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <Build fontSize="large" />
              </Avatar>
              <Typography variant="h4" color="white" fontWeight="bold" mb={1}>
                Equipment Rental
              </Typography>
              <Typography variant="h6" color="rgba(255,255,255,0.8)" mb={1}>
                Management System
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.6)">
                Sign in to access your dashboard
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                  border: "1px solid rgba(244, 67, 54, 0.3)",
                  color: "#ff6b6b",
                  "& .MuiAlert-icon": {
                    color: "#ff6b6b",
                  },
                }}
              >
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={formData.username}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4ECDC4",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                      "&.Mui-focused": {
                        color: "#4ECDC4",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4ECDC4",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                      "&.Mui-focused": {
                        color: "#4ECDC4",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<LoginIcon />}
                  sx={{
                    backgroundColor: "#4ECDC4",
                    "&:hover": {
                      backgroundColor: "#3bb9b0",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(78, 205, 196, 0.5)",
                    },
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Box>
            {/* Footer */}
            <Box textAlign="center" mt={4}>
              <Typography variant="body2" color="rgba(255,255,255,0.6)">
                © {new Date().getFullYear()} Equipment Rental Management System
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
export default Login;
