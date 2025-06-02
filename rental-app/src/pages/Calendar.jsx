import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Badge,
  Tooltip,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import {
  CalendarToday,
  Add,
  EventNote,
  ViewWeek,
  ViewModule,
  Edit,
  Visibility,
  Delete,
  // Equipment,
  Person,
  Schedule,
  Close,
} from "@mui/icons-material";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const glassMorphStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  color: "#fff",
};

// Extended mock data with more rentals
const rentalsMock = [
  {
    id: "R001",
    date: "2024-06-05",
    startDate: "2024-06-05",
    endDate: "2024-06-10",
    equipment: "Excavator CAT320",
    customer: "ABC Construction",
    status: "Active",
    dailyRate: 450,
    location: "Site A",
  },
  {
    id: "R002",
    date: "2024-06-08",
    startDate: "2024-06-08",
    endDate: "2024-06-12",
    equipment: "Concrete Mixer",
    customer: "Metro Builders",
    status: "Confirmed",
    dailyRate: 120,
    location: "Site B",
  },
  {
    id: "R003",
    date: "2024-06-15",
    startDate: "2024-06-15",
    endDate: "2024-06-20",
    equipment: "Bulldozer D6",
    customer: "City Works",
    status: "Active",
    dailyRate: 650,
    location: "Site C",
  },
  {
    id: "R004",
    date: "2024-06-12",
    startDate: "2024-06-12",
    endDate: "2024-06-18",
    equipment: "Crane Liebherr",
    customer: "Green Valley",
    status: "Pending",
    dailyRate: 800,
    location: "Site D",
  },
  {
    id: "R005",
    date: "2024-06-20",
    startDate: "2024-06-20",
    endDate: "2024-06-25",
    equipment: "Power Drill Set",
    customer: "Quick Fix Co",
    status: "Confirmed",
    dailyRate: 25,
    location: "Warehouse",
  },
];

const equipmentOptions = [
  "Excavator CAT320",
  "Concrete Mixer",
  "Bulldozer D6",
  "Crane Liebherr",
  "Power Drill Set",
  "Angle Grinder",
];

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [calendarView, setCalendarView] = useState("month");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [rentals, setRentals] = useState(rentalsMock);
  const [newRental, setNewRental] = useState({
    equipment: "",
    customer: "",
    startDate: "",
    endDate: "",
    dailyRate: "",
    location: "",
    status: "Pending",
  });

  // Get current week dates for weekly view
  const getCurrentWeekDates = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    setFilteredRentals(
      rentals.filter((rental) => {
        const rentalStart = new Date(rental.startDate);
        const rentalEnd = new Date(rental.endDate);
        const selectedDateObj = new Date(formattedDate);
        return selectedDateObj >= rentalStart && selectedDateObj <= rentalEnd;
      })
    );
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setCalendarView(newView);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Confirmed":
        return "primary";
      case "Pending":
        return "warning";
      case "Completed":
        return "default";
      default:
        return "secondary";
    }
  };

  const handleAddRental = () => {
    const id = `R${String(rentals.length + 1).padStart(3, "0")}`;
    const rental = {
      ...newRental,
      id,
      date: newRental.startDate,
      dailyRate: Number(newRental.dailyRate),
    };
    setRentals([...rentals, rental]);
    setNewRental({
      equipment: "",
      customer: "",
      startDate: "",
      endDate: "",
      dailyRate: "",
      location: "",
      status: "Pending",
    });
    setOpenAddDialog(false);
  };

  const handleEditRental = (rental) => {
    setSelectedRental(rental);
    setNewRental({
      equipment: rental.equipment,
      customer: rental.customer,
      startDate: rental.startDate,
      endDate: rental.endDate,
      dailyRate: rental.dailyRate,
      location: rental.location,
      status: rental.status,
    });
    setOpenAddDialog(true);
  };

  const handleUpdateRental = () => {
    setRentals(
      rentals.map((rental) =>
        rental.id === selectedRental.id
          ? {
              ...rental,
              ...newRental,
              date: newRental.startDate,
              dailyRate: Number(newRental.dailyRate),
            }
          : rental
      )
    );
    setSelectedRental(null);
    setNewRental({
      equipment: "",
      customer: "",
      startDate: "",
      endDate: "",
      dailyRate: "",
      location: "",
      status: "Pending",
    });
    setOpenAddDialog(false);
  };

  const handleDeleteRental = (rentalId) => {
    setRentals(rentals.filter((rental) => rental.id !== rentalId));
    setOpenDetailDialog(false);
  };

  const getRentalsForDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return rentals.filter((rental) => {
      const rentalStart = new Date(rental.startDate);
      const rentalEnd = new Date(rental.endDate);
      const dateObj = new Date(formattedDate);
      return dateObj >= rentalStart && dateObj <= rentalEnd;
    });
  };

  const renderWeeklyView = () => {
    const weekDates = getCurrentWeekDates();

    return (
      <Grid container spacing={1}>
        {weekDates.map((date, index) => {
          const dayRentals = getRentalsForDate(date);
          const isSelected =
            date.toDateString() === selectedDate.toDateString();

          return (
            <Grid item xs={12 / 7} key={index}>
              <Card
                sx={{
                  ...glassMorphStyle,
                  p: 1,
                  minHeight: 150,
                  cursor: "pointer",
                  border: isSelected
                    ? "2px solid #4ECDC4"
                    : "1px solid rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    border: "2px solid #45B7D1",
                  },
                }}
                onClick={() => onDateChange(date)}
              >
                <Typography
                  variant="subtitle2"
                  textAlign="center"
                  mb={1}
                  color={isSelected ? "#4ECDC4" : "white"}
                  fontWeight="bold"
                >
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </Typography>
                <Typography
                  variant="h6"
                  textAlign="center"
                  mb={1}
                  color={isSelected ? "#4ECDC4" : "white"}
                >
                  {date.getDate()}
                </Typography>
                <Box>
                  {dayRentals.slice(0, 3).map((rental, idx) => (
                    <Chip
                      key={idx}
                      label={rental.equipment.split(" ")[0]}
                      size="small"
                      color={getStatusColor(rental.status)}
                      sx={{
                        mb: 0.5,
                        fontSize: "0.6rem",
                        width: "100%",
                        "& .MuiChip-label": {
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                  ))}
                  {dayRentals.length > 3 && (
                    <Typography variant="caption" color="rgba(255,255,255,0.7)">
                      +{dayRentals.length - 3} more
                    </Typography>
                  )}
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box>
      <Box flex={1} display="flex" flexDirection="column">
        <Box p={3}>
          {/* View Toggle */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h5" fontWeight="bold" color="white">
              Rental Schedule
            </Typography>
            <ToggleButtonGroup
              value={calendarView}
              exclusive
              onChange={handleViewChange}
              sx={{
                "& .MuiToggleButton-root": {
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&.Mui-selected": {
                    backgroundColor: "#4ECDC4",
                    color: "white",
                  },
                },
              }}
            ></ToggleButtonGroup>
          </Box>

          <Grid container spacing={3}>
            {/* Calendar Component */}
            <Grid item xs={12} md={8}>
              <Card sx={{ ...glassMorphStyle, p: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6" fontWeight="bold">
                    <CalendarToday sx={{ mr: 1 }} />
                    {/* {calendarView === 'month' ? 'Monthly View' : 'Weekly View'}
                     */}
                    Calendar View
                  </Typography>
                </Box>

                {calendarView === "month" ? (
                  <Calendar
                    onChange={onDateChange}
                    value={selectedDate}
                    tileContent={({ date }) => {
                      const dayRentals = getRentalsForDate(date);
                      return dayRentals.length > 0 ? (
                        <Badge
                          badgeContent={dayRentals.length}
                          color="primary"
                          sx={{
                            "& .MuiBadge-badge": {
                              backgroundColor: "#4ECDC4",
                              color: "white",
                            },
                          }}
                        >
                          <EventNote fontSize="small" color="primary" />
                        </Badge>
                      ) : null;
                    }}
                    tileClassName={({ date }) => {
                      const dayRentals = getRentalsForDate(date);
                      return dayRentals.length > 0 ? "has-rentals" : "";
                    }}
                  />
                ) : (
                  renderWeeklyView()
                )}
              </Card>
            </Grid>

            {/* Rentals Details */}
            <Grid item xs={12} md={4}>
              <Card sx={{ ...glassMorphStyle }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    <Schedule sx={{ mr: 1 }} />
                    Rentals on {selectedDate.toDateString()}
                  </Typography>

                  {filteredRentals.length > 0 ? (
                    <Stack spacing={2}>
                      {filteredRentals.map((rental, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            mb={1}
                          >
                            <Box flex={1}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {rental.equipment}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="rgba(255,255,255,0.8)"
                              >
                                <Person
                                  fontSize="small"
                                  sx={{ mr: 0.5, verticalAlign: "middle" }}
                                />
                                {rental.customer}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="rgba(255,255,255,0.6)"
                              >
                                {rental.startDate} - {rental.endDate}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="#4ECDC4"
                                fontWeight="bold"
                              >
                                ${rental.dailyRate}/day
                              </Typography>
                            </Box>
                            <Chip
                              label={rental.status}
                              color={getStatusColor(rental.status)}
                              size="small"
                            />
                          </Box>

                          <Box display="flex" gap={1} mt={2}>
                            <Tooltip title="View Details">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSelectedRental(rental);
                                  setOpenDetailDialog(true);
                                }}
                                sx={{ color: "#4ECDC4" }}
                              >
                                <Visibility fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Rental">
                              <IconButton
                                size="small"
                                onClick={() => handleEditRental(rental)}
                                sx={{ color: "#45B7D1" }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Rental">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteRental(rental.id)}
                                sx={{ color: "#FF6B6B" }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  ) : (
                    <Box textAlign="center" py={4}>
                      <Typography color="rgba(255,255,255,0.6)" mb={2}>
                        No rentals scheduled for this date
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => setOpenAddDialog(true)}
                        sx={{
                          borderColor: "#4ECDC4",
                          color: "#4ECDC4",
                          "&:hover": {
                            borderColor: "#45B7D1",
                            backgroundColor: "rgba(69, 183, 209, 0.1)",
                          },
                        }}
                      >
                        Add First Rental
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
          setSelectedRental(null);
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: glassMorphStyle,
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {selectedRental ? "Edit Rental" : "Add New Rental"}
            </Typography>
            <IconButton
              onClick={() => {
                setOpenAddDialog(false);
                setSelectedRental(null);
              }}
              sx={{ color: "white" }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Equipment"
                value={newRental.equipment}
                onChange={(e) =>
                  setNewRental({ ...newRental, equipment: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              >
                {equipmentOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer"
                value={newRental.customer}
                onChange={(e) =>
                  setNewRental({ ...newRental, customer: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={newRental.startDate}
                onChange={(e) =>
                  setNewRental({ ...newRental, startDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={newRental.endDate}
                onChange={(e) =>
                  setNewRental({ ...newRental, endDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Daily Rate"
                value={newRental.dailyRate}
                onChange={(e) =>
                  setNewRental({ ...newRental, dailyRate: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={newRental.location}
                onChange={(e) =>
                  setNewRental({ ...newRental, location: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Status"
                value={newRental.status}
                onChange={(e) =>
                  setNewRental({ ...newRental, status: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setOpenAddDialog(false);
              setSelectedRental(null);
            }}
            sx={{ color: "#FF6B6B" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={selectedRental ? handleUpdateRental : handleAddRental}
            sx={{
              backgroundColor: "#4ECDC4",
              "&:hover": { backgroundColor: "#45B7D1" },
            }}
          >
            {selectedRental ? "Update" : "Add"} Rental
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rental  Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: glassMorphStyle,
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {/* <Equipment sx={{ mr: 1 }} /> */}
              Rental Details
            </Typography>
            <IconButton
              onClick={() => setOpenDetailDialog(false)}
              sx={{ color: "white" }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedRental && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: "#4ECDC4",
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {/* <Equipment /> */}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" color="white" fontWeight="bold">
                      {selectedRental.equipment}
                    </Typography>
                    <Chip
                      label={selectedRental.status}
                      color={getStatusColor(selectedRental.status)}
                      size="small"
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  Rental ID
                </Typography>
                <Typography variant="body1" color="white" mb={2}>
                  {selectedRental.id}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  Customer
                </Typography>
                <Typography variant="body1" color="white" mb={2}>
                  {selectedRental.customer}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  Start Date
                </Typography>
                <Typography variant="body1" color="white" mb={2}>
                  {new Date(selectedRental.startDate).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  End Date
                </Typography>
                <Typography variant="body1" color="white" mb={2}>
                  {new Date(selectedRental.endDate).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  Daily Rate
                </Typography>
                <Typography
                  variant="body1"
                  color="#4ECDC4"
                  fontWeight="bold"
                  mb={2}
                >
                  ${selectedRental.dailyRate}/day
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  Location
                </Typography>
                <Typography variant="body1" color="white" mb={2}>
                  {selectedRental.location}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  Duration
                </Typography>
                <Typography variant="body1" color="white" mb={2}>
                  {Math.ceil(
                    (new Date(selectedRental.endDate) -
                      new Date(selectedRental.startDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                  Total Estimated Cost
                </Typography>
                <Typography variant="h6" color="#4ECDC4" fontWeight="bold">
                  $
                  {selectedRental.dailyRate *
                    Math.ceil(
                      (new Date(selectedRental.endDate) -
                        new Date(selectedRental.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setOpenDetailDialog(false);
              handleEditRental(selectedRental);
            }}
            startIcon={<Edit />}
            sx={{ color: "#45B7D1" }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteRental(selectedRental.id)}
            startIcon={<Delete />}
            sx={{ color: "#FF6B6B" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDetailDialog(false)}
            sx={{
              backgroundColor: "#4ECDC4",
              "&:hover": { backgroundColor: "#45B7D1" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom CSS for Calendar styling */}
      <style jsx global>{`
        .react-calendar {
          background: transparent !important;
          border: none !important;
          color: white !important;
          font-family: inherit !important;
        }
        .react-calendar__tile {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          margin: 2px !important;
          border-radius: 8px !important;
          transition: all 0.2s ease !important;
        }
        .react-calendar__tile:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: #4ecdc4 !important;
        }
        .react-calendar__tile--now {
          background: rgba(78, 205, 196, 0.3) !important;
          border-color: #4ecdc4 !important;
        }
        .react-calendar__tile--active {
          background: #4ecdc4 !important;
          border-color: #4ecdc4 !important;
          color: white !important;
        }
        .react-calendar__tile.has-rentals {
          background: rgba(69, 183, 209, 0.2) !important;
          border-color: #45b7d1 !important;
        }
        .react-calendar__navigation button {
          color: white !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 8px !important;
          margin: 2px !important;
        }
        .react-calendar__navigation button:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: #4ecdc4 !important;
        }
        .react-calendar__month-view__weekdays {
          color: rgba(255, 255, 255, 0.8) !important;
        }
        .react-calendar__month-view__weekdays__weekday {
          text-decoration: none !important;
          font-weight: bold !important;
        }
      `}</style>
    </Box>
  );
};

export default CalendarPage;
