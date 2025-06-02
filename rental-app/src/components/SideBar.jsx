import React, { useState } from "react";
import { Box, Typography, Stack, Avatar } from "@mui/material";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUp,
  Schedule,
  Build,
  People,
  Notifications,
  CalendarMonth,
} from "@mui/icons-material";

const glassMorphStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  margin: "16px",
  marginRight: "8px",
};

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [
    { name: "Dashboard", icon: <TrendingUp />, path: "/dashboard" },
    { name: "Equipment", icon: <Build />, path: "/equipment" },
    { name: "Rentals", icon: <People />, path: "/rentals" },
    { name: "Maintenance", icon: <Schedule />, path: "/maintenance" },
    { name: "Calendar", icon: <CalendarMonth />, path: "/calendar" },
    { name: "Notifications", icon: <Notifications />, path: "/notifications" },
  ];

  // Get active tab based on current location
  const getActiveTab = () => {
    const currentPath = location.pathname;
    if (currentPath === "/") return "Dashboard";
    const activeTab = tabs.find(tab => tab.path === currentPath);
    return activeTab ? activeTab.name : "Dashboard";
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      width={260}
      p={3}
      sx={{
        ...glassMorphStyle,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 32px)", // Account for margins
      }}
    >
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar sx={{ bgcolor: "#4ECDC4", mr: 2 }}>
          <Build />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" color="white">
          RentalPro
        </Typography>
      </Box>

      <Stack spacing={1}>
        {tabs.map((item) => (
          <Button
            key={item.name}
            variant="text"
            startIcon={item.icon}
            onClick={() => handleNavigation(item.path)}
            sx={{
              justifyContent: "flex-start",
              color: getActiveTab() === item.name ? "#4ECDC4" : "#fff",
              py: 1.5,
              px: 2,
              borderRadius: 2,
              backgroundColor:
                getActiveTab() === item.name
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "translateX(4px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {item.name}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default SideBar;