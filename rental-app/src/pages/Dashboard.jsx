import React from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Grid,
  IconButton,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  Build,
  AttachMoney,
  People,
  Notifications,
} from "@mui/icons-material";

import Navbar from "@/components/Navbar";
import SideBar from "../components/SideBar";
import DataTable from "../components/DataTable";

const dataByCategory = [
  { name: "Heavy Machinery", value: 35, color: "#FF6B6B" },
  { name: "Light Equipment", value: 45, color: "#4ECDC4" },
  { name: "Power Tools", value: 40, color: "#45B7D1" },
];

const rentalTrends = [
  { name: "Jan", rentals: 30, revenue: 15000 },
  { name: "Feb", rentals: 45, revenue: 22500 },
  { name: "Mar", rentals: 60, revenue: 30000 },
  { name: "Apr", rentals: 40, revenue: 20000 },
  { name: "May", rentals: 75, revenue: 37500 },
];

const revenueData = [
  { name: "Jan", revenue: 15000 },
  { name: "Feb", revenue: 22500 },
  { name: "Mar", revenue: 30000 },
  { name: "Apr", revenue: 20000 },
  { name: "May", revenue: 37500 },
];

const recentRentals = [
  {
    id: "R001",
    customer: "ABC Construction",
    equipment: "Excavator CAT320",
    status: "Active",
    dueDate: "2024-06-15",
    amount: "$450/day",
  },
  {
    id: "R002",
    customer: "Metro Builders",
    equipment: "Concrete Mixer",
    status: "Overdue",
    dueDate: "2024-05-28",
    amount: "$120/day",
  },
  {
    id: "R003",
    customer: "City Works",
    equipment: "Bulldozer D6",
    status: "Active",
    dueDate: "2024-06-20",
    amount: "$650/day",
  },
  {
    id: "R004",
    customer: "Green Valley",
    equipment: "Crane Liebherr",
    status: "Returned",
    dueDate: "2024-05-30",
    amount: "$800/day",
  },
];

const topEquipment = [
  {
    name: "Excavator CAT320",
    rentals: 45,
    utilization: 85,
    revenue: "$20,250",
  },
  { name: "Concrete Mixer", rentals: 38, utilization: 72, revenue: "$15,200" },
  { name: "Bulldozer D6", rentals: 32, utilization: 68, revenue: "$18,900" },
  { name: "Crane Liebherr", rentals: 28, utilization: 95, revenue: "$28,400" },
];

const upcomingMaintenance = [
  {
    equipment: "Excavator CAT320",
    type: "Service",
    dueDate: "Jun 5",
    priority: "High",
  },
  {
    equipment: "Bulldozer D6",
    type: "Inspection",
    dueDate: "Jun 8",
    priority: "Medium",
  },
  {
    equipment: "Crane Liebherr",
    type: "Repair",
    dueDate: "Jun 12",
    priority: "Low",
  },
];

const glassMorphStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
};

const Dashboard = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Overdue":
        return "error";
      case "Returned":
        return "default";
      default:
        return "primary";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Box p={3}>
      <Grid container spacing={3} mb={3}>
        {[
          {
            label: "Total Equipment",
            value: "240",
            change: "+12%",
            icon: <Build fontSize="small" />,
            color: "#4ECDC4",
            trend: "up",
          },
          {
            label: "Available Now",
            value: "156",
            change: "+8%",
            icon: <CheckCircle fontSize="small" />,
            color: "#45B7D1",
            trend: "up",
          },
          {
            label: "Currently Rented",
            value: "84",
            change: "+15%",
            icon: <TrendingUp fontSize="small" />,
            color: "#96CEB4",
            trend: "up",
          },
          {
            label: "Overdue Rentals",
            value: "7",
            change: "-3%",
            icon: <Warning fontSize="small" />,
            color: "#FF6B6B",
            trend: "down",
          },
          {
            label: "Monthly Revenue",
            value: "$87.5K",
            change: "+22%",
            icon: <AttachMoney fontSize="small" />,
            color: "#FFD93D",
            trend: "up",
          },
          {
            label: "Maintenance Due",
            value: "12",
            change: "+5%",
            icon: <Schedule fontSize="small" />,
            color: "#B19CD9",
            trend: "up",
          },
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
            <Card
              sx={{
                ...glassMorphStyle,
                padding: 1.5,
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Avatar
                    sx={{
                      bgcolor: kpi.color,
                      width: 32,
                      height: 32,
                      mb: 1,
                    }}
                  >
                    {kpi.icon}
                  </Avatar>
                  <Typography
                    variant="body2"
                    color="rgba(255,255,255,0.8)"
                    sx={{ mb: 0.5 }}
                  >
                    {kpi.label}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="white"
                    sx={{ mb: 1 }}
                  >
                    {kpi.value}
                  </Typography>
                  <Chip
                    label={kpi.change}
                    size="small"
                    color={kpi.trend === "up" ? "success" : "error"}
                    sx={{ fontSize: "0.75rem" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mb={3}>
        {/* Equipment by Category */}
        <Grid item xs={12} md={6}>
          <Card sx={{ ...glassMorphStyle }}>
            <CardContent>
              <Typography variant="h6" mb={2} color="white" fontWeight="bold">
                Equipment by Category
              </Typography>
              <Box
                sx={{
                  minWidth: { xs: "90vw", sm: "60vw", md: "30vw" },
                  height: 320,
                  marginX: "auto",
                }}
              >
                <ResponsiveContainer height="100%">
                  <PieChart>
                    <Pie
                      data={dataByCategory}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={50}
                      paddingAngle={5}
                    >
                      {dataByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rental Trends */}
        <Grid item xs={12} md={6}>
          <Card sx={{ ...glassMorphStyle }}>
            <CardContent>
              <Typography variant="h6" mb={2} color="white" fontWeight="bold">
                Rental Trends
              </Typography>
              <Box
                sx={{
                  minWidth: { xs: "90vw", sm: "60vw", md: "30vw" },
                  height: 320,
                  marginX: "auto",
                }}
              >
                <ResponsiveContainer height="100%">
                  <BarChart data={rentalTrends}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="rentals" fill="#4ECDC4" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Maintenance */}
      <Typography variant="h6" mb={1} mt={4} color="white" fontWeight="bold">
        Upcoming Maintenance
      </Typography>
      <Grid container spacing={3} mb={4}>
        {upcomingMaintenance.map((task, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ ...glassMorphStyle }}>
              <CardContent>
                <Typography variant="subtitle1" color="white" fontWeight="bold">
                  {task.equipment}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Type: {task.type}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.6)">
                  Due: {task.dueDate}
                </Typography>
                <Chip
                  label={task.priority}
                  color={getPriorityColor(task.priority)}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Rentals Table */}
      <Typography variant="h6" mb={2} color="white" fontWeight="bold">
        Recent Rentals
      </Typography>
      <Box sx={{ mb: 5 }}>
        <DataTable
          title=""
          data={recentRentals}
          showAddButton={false}
          columns={[
            {
              header: "Rental ID",
              field: "id",
            },
            {
              header: "Customer",
              field: "customer",
            },
            {
              header: "Equipment",
              field: "equipment",
            },
            {
              header: "Status",
              render: (rental) => (
                <Chip
                  label={rental.status}
                  color={getStatusColor(rental.status)}
                  size="small"
                />
              ),
            },
            {
              header: "Due Date",
              field: "dueDate",
            },
            {
              header: "Amount",
              field: "amount",
            },
          ]}
        />
      </Box>
      <Typography variant="h6" mb={2} color="white" fontWeight="bold">
        Top Performing Equipment
      </Typography>
      <Grid container spacing={3} mb={8}>
        {topEquipment.map((eq, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ ...glassMorphStyle }}>
              <CardContent>
                <Typography variant="subtitle1" color="white" fontWeight="bold">
                  {eq.name}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  Rentals: {eq.rentals}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.6)">
                  Revenue: {eq.revenue}
                </Typography>
                <Box mt={1}>
                  <Typography variant="caption" color="rgba(255,255,255,0.6)">
                    Utilization
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={eq.utilization}
                    sx={{
                      backgroundColor: "#2c3e50",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#4ECDC4",
                      },
                    }}
                  />
                  <Typography variant="caption" color="white">
                    {eq.utilization}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
