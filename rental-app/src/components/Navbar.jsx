import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Stack, 
  Avatar, 
  Badge, 
  IconButton, 
  Menu, 
  MenuItem, 
  Divider,
  Chip,
  Tooltip
} from "@mui/material";
import { 
  Bell, 
  LogOut, 
  User, 
  Settings, 
  ChevronDown, 
  Search,
  MessageCircle,
  Calendar,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const glassMorphStyle = {
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(25px)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
};

const Navbar = ({ page }) => {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);
  const navigate = useNavigate();

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const mockNotifications = [
    { id: 1, text: "Equipment maintenance due", time: "5m ago", type: "warning" },
    { id: 2, text: "New rental request received", time: "12m ago", type: "info" },
    { id: 3, text: "Payment received from ABC Corp", time: "1h ago", type: "success" }
  ];

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return '#FFD93D';
      case 'success': return '#4ECDC4';
      case 'info': return '#45B7D1';
      default: return '#96CEB4';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    handleProfileMenuClose();
    navigate("/login");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2.5}
        sx={{
          ...glassMorphStyle,
          position: "sticky",
          top: 0,
          zIndex: 1000,
          margin: "16px",
          marginBottom: "24px"
        }}
      >
        {/* Left Section - Page Info */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Box>
            <Typography 
              variant="h5" 
              fontWeight="700" 
              color="white"
              sx={{
                background: "linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px"
              }}
            >
              {page}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mt={0.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Calendar size={14} color="rgba(255,255,255,0.6)" />
                <Typography variant="caption" color="rgba(255,255,255,0.6)">
                  {currentDate}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Clock size={14} color="rgba(255,255,255,0.6)" />
                <Typography variant="caption" color="rgba(255,255,255,0.6)">
                  {currentTime}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* Right Section - Actions & Profile */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Search Button */}
          <Tooltip title="Quick Search">
            <IconButton
              sx={{
                ...glassMorphStyle,
                color: "white",
                width: 44,
                height: 44,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-1px)"
                },
                transition: "all 0.2s ease"
              }}
            >
              <Search size={20} />
            </IconButton>
          </Tooltip>

          {/* Messages */}
          <Tooltip title="Messages">
            <IconButton
              sx={{
                ...glassMorphStyle,
                color: "white",
                width: 44,
                height: 44,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-1px)"
                },
                transition: "all 0.2s ease"
              }}
            >
              <Badge badgeContent={2} color="primary">
                <MessageCircle size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={handleNotificationMenuOpen}
              sx={{
                ...glassMorphStyle,
                color: "white",
                width: 44,
                height: 44,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-1px)"
                },
                transition: "all 0.2s ease"
              }}
            >
              <Badge badgeContent={mockNotifications.length} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Section */}
          <Box
            onClick={handleProfileMenuOpen}
            sx={{
              ...glassMorphStyle,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              padding: "8px 16px",
              cursor: "pointer",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-1px)"
              },
              transition: "all 0.2s ease"
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%)",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              JD
            </Avatar>
            <Stack spacing={0}>
              <Typography 
                variant="body2" 
                fontWeight="600" 
                color="white"
                sx={{ lineHeight: 1.2 }}
              >
                John Doe
              </Typography>
              <Typography 
                variant="caption" 
                color="rgba(255,255,255,0.6)"
                sx={{ lineHeight: 1.2 }}
              >
                Administrator
              </Typography>
            </Stack>
            <ChevronDown size={16} color="rgba(255,255,255,0.6)" />
          </Box>
        </Stack>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            ...glassMorphStyle,
            mt: 1,
            minWidth: 200,
            color: "white"
          }
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <User size={18} style={{ marginRight: 12 }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <Settings size={18} style={{ marginRight: 12 }} />
          Settings
        </MenuItem>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            color: "#FF6B6B",
            "&:hover": {
              backgroundColor: "rgba(255, 107, 107, 0.1)"
            }
          }}
        >
          <LogOut size={18} style={{ marginRight: 12 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationMenuAnchor}
        open={Boolean(notificationMenuAnchor)}
        onClose={handleNotificationMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            ...glassMorphStyle,
            mt: 1,
            minWidth: 320,
            maxHeight: 400,
            color: "white"
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="white">
            Notifications
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        {mockNotifications.map((notification) => (
          <MenuItem 
            key={notification.id}
            onClick={handleNotificationMenuClose}
            sx={{ 
              flexDirection: "column",
              alignItems: "flex-start",
              py: 1.5,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" width="100%">
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: getNotificationColor(notification.type)
                }}
              />
              <Typography variant="body2" color="white" flex={1}>
                {notification.text}
              </Typography>
            </Stack>
            <Typography 
              variant="caption" 
              color="rgba(255,255,255,0.5)"
              sx={{ ml: 2, mt: 0.5 }}
            >
              {notification.time}
            </Typography>
          </MenuItem>
        ))}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <MenuItem 
          onClick={handleNotificationMenuClose}
          sx={{ 
            justifyContent: "center",
            color: "#4ECDC4",
            "&:hover": {
              backgroundColor: "rgba(78, 205, 196, 0.1)"
            }
          }}
        >
          <Typography variant="body2" fontWeight="600">
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;