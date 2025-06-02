import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Badge,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Assignment,
  Build,
  CheckCircle,
  Schedule,
  Warning,
  Info,
  MarkEmailRead,
  MarkEmailUnread,
  Delete,
  FilterList,
  Clear,
  Circle,
} from "@mui/icons-material";

import Navbar from "@/components/Navbar";
import SideBar from "../components/SideBar";
import GlassMorphCard from "../components/GlassMorphCard";
import KPIGrid from "../components/KPIGrid";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
import DataTable from "../components/DataTable";
import { useCommonFilters } from "../components/hooks/useCommonFilters";
import { backgroundGradient } from "../components/commonStyles";

const initialNotifications = [
  {
    id: "N001",
    type: "rental_created",
    title: "New Rental Created",
    message: "ABC Construction has rented Excavator CAT320 for 15 days",
    timestamp: "2024-06-01T10:30:00Z",
    isRead: false,
    priority: "medium",
    relatedEntity: "RNT001",
    customer: "ABC Construction",
    equipment: "Excavator CAT320",
  },
  {
    id: "N002",
    type: "rental_returned",
    title: "Equipment Returned",
    message: "Green Valley Corp returned Crane Liebherr on time",
    timestamp: "2024-06-01T09:15:00Z",
    isRead: true,
    priority: "low",
    relatedEntity: "RNT004",
    customer: "Green Valley Corp",
    equipment: "Crane Liebherr",
  },
  {
    id: "N003",
    type: "maintenance_due",
    title: "Maintenance Due",
    message: "Excavator CAT320 requires routine maintenance within 3 days",
    timestamp: "2024-06-01T08:45:00Z",
    isRead: false,
    priority: "high",
    relatedEntity: "EQ001",
    equipment: "Excavator CAT320",
  },
  {
    id: "N004",
    type: "rental_overdue",
    title: "Rental Overdue",
    message: "Metro Builders has not returned Concrete Mixer (2 days overdue)",
    timestamp: "2024-05-30T16:20:00Z",
    isRead: false,
    priority: "high",
    relatedEntity: "RNT002",
    customer: "Metro Builders",
    equipment: "Concrete Mixer",
  },
  {
    id: "N005",
    type: "maintenance_completed",
    title: "Maintenance Completed",
    message: "Bulldozer D6 annual inspection completed successfully",
    timestamp: "2024-05-30T14:10:00Z",
    isRead: true,
    priority: "low",
    relatedEntity: "M003",
    equipment: "Bulldozer D6",
  },
  {
    id: "N006",
    type: "rental_created",
    title: "New Rental Created",
    message: "Sunrise Contractors rented Power Drill Set for 3 days",
    timestamp: "2024-05-30T11:30:00Z",
    isRead: false,
    priority: "medium",
    relatedEntity: "RNT005",
    customer: "Sunrise Contractors",
    equipment: "Power Drill Set",
  },
  {
    id: "N007",
    type: "equipment_available",
    title: "Equipment Available",
    message: "Angle Grinder is now available for rental after maintenance",
    timestamp: "2024-05-29T13:45:00Z",
    isRead: true,
    priority: "low",
    relatedEntity: "EQ006",
    equipment: "Angle Grinder",
  },
  {
    id: "N008",
    type: "rental_reminder",
    title: "Rental Reminder",
    message: "City Works rental of Bulldozer D6 ends in 2 days",
    timestamp: "2024-05-29T09:00:00Z",
    isRead: false,
    priority: "medium",
    relatedEntity: "RNT003",
    customer: "City Works",
    equipment: "Bulldozer D6",
  },
];

const notificationTypes = [
  "rental_created",
  "rental_returned",
  "rental_overdue",
  "rental_reminder",
  "maintenance_due",
  "maintenance_completed",
  "equipment_available",
];

const priorities = ["high", "medium", "low"];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Use the custom hook for filtering
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData,
  } = useCommonFilters(notifications, {
    type: "",
    priority: "",
    isRead: "",
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case "rental_created":
        return <Assignment fontSize="small" />;
      case "rental_returned":
        return <CheckCircle fontSize="small" />;
      case "rental_overdue":
        return <Warning fontSize="small" />;
      case "rental_reminder":
        return <Schedule fontSize="small" />;
      case "maintenance_due":
        return <Build fontSize="small" />;
      case "maintenance_completed":
        return <CheckCircle fontSize="small" />;
      case "equipment_available":
        return <Info fontSize="small" />;
      default:
        return <NotificationsIcon fontSize="small" />;
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "high") return "#FF6B6B";
    if (priority === "medium") return "#FFD93D";

    switch (type) {
      case "rental_created":
        return "#4ECDC4";
      case "rental_returned":
        return "#45B7D1";
      case "rental_overdue":
        return "#FF6B6B";
      case "rental_reminder":
        return "#96CEB4";
      case "maintenance_due":
        return "#FFD93D";
      case "maintenance_completed":
        return "#45B7D1";
      case "equipment_available":
        return "#4ECDC4";
      default:
        return "#B19CD9";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: false }
          : notification
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const clearAllRead = () => {
    setNotifications((prev) =>
      prev.filter((notification) => !notification.isRead)
    );
  };

  // Calculate statistics
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const highPriorityCount = notifications.filter(
    (n) => n.priority === "high" && !n.isRead
  ).length;
  const rentalNotifications = notifications.filter((n) =>
    n.type.includes("rental")
  ).length;
  const maintenanceNotifications = notifications.filter((n) =>
    n.type.includes("maintenance")
  ).length;

  // KPI data for the grid
  const kpiData = [
    {
      label: "Total Notifications",
      value: totalNotifications,
      icon: <NotificationsIcon fontSize="small" />,
      color: "#4ECDC4",
    },
    {
      label: "Unread",
      value: unreadCount,
      icon: <Circle fontSize="small" />,
      color: "#FF6B6B",
    },
    {
      label: "High Priority",
      value: highPriorityCount,
      icon: <Warning fontSize="small" />,
      color: "#FFD93D",
    },
    {
      label: "Rental Related",
      value: rentalNotifications,
      icon: <Assignment fontSize="small" />,
      color: "#45B7D1",
    },
    {
      label: "Maintenance Related",
      value: maintenanceNotifications,
      icon: <Build fontSize="small" />,
      color: "#96CEB4",
    },
  ];

  // Filter configuration for SearchAndFilterBar
  const filterConfig = [
    {
      label: "Type",
      value: filters.type,
      onChange: (value) => updateFilter("type", value),
      options: notificationTypes.map((type) => ({
        value: type,
        label: type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      })),
      gridSize: 3,
    },
    {
      label: "Priority",
      value: filters.priority,
      onChange: (value) => updateFilter("priority", value),
      options: priorities.map((priority) => ({
        value: priority,
        label: priority.charAt(0).toUpperCase() + priority.slice(1),
      })),
      gridSize: 2,
    },
    {
      label: "Status",
      value: filters.isRead,
      onChange: (value) => updateFilter("isRead", value),
      options: [
        { value: "false", label: "Unread" },
        { value: "true", label: "Read" },
      ],
      gridSize: 2,
    },
  ];

  return (
    <Box p={3}>
      {/* Statistics Cards */}
      <KPIGrid kpiData={kpiData} />

      {/* Action Buttons */}
      <GlassMorphCard sx={{ mb: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            Notification Actions
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<MarkEmailRead />}
              onClick={markAllAsRead}
              sx={{
                backgroundColor: "#45B7D1",
                "&:hover": {
                  backgroundColor: "#4ECDC4",
                },
              }}
            >
              Mark All Read
            </Button>
            <Button
              variant="contained"
              startIcon={<Clear />}
              onClick={clearAllRead}
              sx={{
                backgroundColor: "#FF6B6B",
                "&:hover": {
                  backgroundColor: "#FF5252",
                },
              }}
            >
              Clear Read
            </Button>
          </Stack>
        </Box>
      </GlassMorphCard>

      {/* Search and Filters */}
      <SearchAndFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filterConfig}
        onClearFilters={clearFilters}
        searchPlaceholder="Search notifications..."
      />

      {/* Notifications Table */}
      <DataTable
        title="Notifications"
        data={filteredData}
        showAddButton={false}
        columns={[
          {
            header: "Status",
            render: (notification) => (
              <Box display="flex" alignItems="center" gap={1}>
                <Circle
                  fontSize="small"
                  sx={{
                    color: notification.isRead
                      ? "rgba(255,255,255,0.3)"
                      : "#FF6B6B",
                  }}
                />
              </Box>
            ),
          },
          {
            header: "Type",
            render: (notification) => (
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  sx={{
                    bgcolor: getNotificationColor(
                      notification.type,
                      notification.priority
                    ),
                    width: 32,
                    height: 32,
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </Avatar>
                <Typography variant="body2" color="white">
                  {notification.type
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Typography>
              </Box>
            ),
          },
          {
            header: "Title",
            render: (notification) => (
              <Box>
                <Typography
                  variant="body2"
                  color="white"
                  fontWeight={notification.isRead ? "normal" : "bold"}
                >
                  {notification.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="rgba(255,255,255,0.6)"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {notification.message}
                </Typography>
              </Box>
            ),
          },
          {
            header: "Priority",
            render: (notification) => (
              <Chip
                label={notification.priority.toUpperCase()}
                color={getPriorityColor(notification.priority)}
                size="small"
              />
            ),
          },
          {
            header: "Related Entity",
            render: (notification) => (
              <Box>
                <Typography variant="body2" color="white">
                  {notification.relatedEntity}
                </Typography>
                {notification.customer && (
                  <Typography variant="caption" color="rgba(255,255,255,0.6)">
                    {notification.customer}
                  </Typography>
                )}
                {notification.equipment && (
                  <Typography variant="caption" color="rgba(255,255,255,0.6)">
                    {notification.equipment}
                  </Typography>
                )}
              </Box>
            ),
          },
          {
            header: "Time",
            render: (notification) => (
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                {formatTimestamp(notification.timestamp)}
              </Typography>
            ),
          },
          {
            header: "Actions",
            render: (notification) => (
              <Stack direction="row" spacing={1}>
                <Tooltip
                  title={
                    notification.isRead ? "Mark as unread" : "Mark as read"
                  }
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      notification.isRead
                        ? markAsUnread(notification.id)
                        : markAsRead(notification.id)
                    }
                    sx={{ color: "#45B7D1" }}
                  >
                    {notification.isRead ? (
                      <MarkEmailUnread fontSize="small" />
                    ) : (
                      <MarkEmailRead fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Dismiss notification">
                  <IconButton
                    size="small"
                    onClick={() => dismissNotification(notification.id)}
                    sx={{ color: "#FF6B6B" }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ),
          },
        ]}
      />
    </Box>
  );
};

export default Notifications;
