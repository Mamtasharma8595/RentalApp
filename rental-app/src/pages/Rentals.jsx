import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  DialogActions,
  Divider,
  Avatar,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DataTable from "../components/DataTable";

import {
  Add,
  Person,
  Build,
  Assignment,
  CheckCircle,
  Schedule,
  Warning,
  AttachMoney,
} from "@mui/icons-material";

import Navbar from "@/components/Navbar";
import SideBar from "../components/SideBar";

// Import custom components
import GlassMorphCard from "../components/GlassMorphCard";
import KPIGrid from "../components/KPIGrid";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
import StatusChip from "../components/StatusChip";
import ActionButtons from "../components/ActionButtons";
import CustomDialog from "../components/CustomDialog";
import CustomTextField from "../components/CustomTextField";
import CustomSelect from "../components/CustomSelect";
import { useCommonFilters } from "../components/hooks/useCommonFilters";
import { backgroundGradient } from "../components/commonStyles";

// Sample data
const initialRentalsData = [
  {
    id: "RNT001",
    customerName: "ABC Construction",
    customerEmail: "contact@abcconstruction.com",
    customerPhone: "+1-555-0123",
    equipmentName: "Excavator CAT320",
    equipmentId: "EQ001",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    status: "Active",
    dailyRate: 450,
    totalAmount: 6750,
    deposit: 1350,
    notes: "Construction project at downtown site",
    createdDate: "2024-05-28",
  },
  {
    id: "RNT002",
    customerName: "Metro Builders",
    customerEmail: "info@metrobuilders.com",
    customerPhone: "+1-555-0124",
    equipmentName: "Concrete Mixer",
    equipmentId: "EQ002",
    startDate: "2024-05-20",
    endDate: "2024-05-28",
    status: "Overdue",
    dailyRate: 120,
    totalAmount: 1080,
    deposit: 240,
    notes: "Residential building project",
    createdDate: "2024-05-18",
  },
  {
    id: "RNT003",
    customerName: "City Works",
    customerEmail: "projects@cityworks.gov",
    customerPhone: "+1-555-0125",
    equipmentName: "Bulldozer D6",
    equipmentId: "EQ003",
    startDate: "2024-06-10",
    endDate: "2024-06-20",
    status: "Reserved",
    dailyRate: 650,
    totalAmount: 7150,
    deposit: 1430,
    notes: "Road construction and maintenance",
    createdDate: "2024-06-05",
  },
  {
    id: "RNT004",
    customerName: "Green Valley Corp",
    customerEmail: "rental@greenvalley.com",
    customerPhone: "+1-555-0126",
    equipmentName: "Crane Liebherr",
    equipmentId: "EQ005",
    startDate: "2024-05-25",
    endDate: "2024-05-30",
    status: "Returned",
    dailyRate: 800,
    totalAmount: 4800,
    deposit: 1600,
    notes: "High-rise building construction",
    createdDate: "2024-05-22",
  },
  {
    id: "RNT005",
    customerName: "Sunrise Contractors",
    customerEmail: "operations@sunrise.com",
    customerPhone: "+1-555-0127",
    equipmentName: "Power Drill Set",
    equipmentId: "EQ004",
    startDate: "2024-06-05",
    endDate: "2024-06-08",
    status: "Active",
    dailyRate: 25,
    totalAmount: 100,
    deposit: 50,
    notes: "Interior renovation work",
    createdDate: "2024-06-03",
  },
];

const customers = [
  "ABC Construction",
  "Metro Builders",
  "City Works",
  "Green Valley Corp",
  "Sunrise Contractors",
  "Pacific Engineering",
  "Mountain View Builders",
];

const equipment = [
  {
    id: "EQ001",
    name: "Excavator CAT320",
    dailyRate: 450,
    status: "Available",
  },
  { id: "EQ002", name: "Concrete Mixer", dailyRate: 120, status: "Rented" },
  { id: "EQ003", name: "Bulldozer D6", dailyRate: 650, status: "Available" },
  { id: "EQ004", name: "Power Drill Set", dailyRate: 25, status: "Rented" },
  { id: "EQ005", name: "Crane Liebherr", dailyRate: 800, status: "Available" },
  { id: "EQ006", name: "Angle Grinder", dailyRate: 30, status: "Available" },
];

const rentalStatuses = [
  "Reserved",
  "Active",
  "Overdue",
  "Returned",
  "Cancelled",
];

const Rentals = () => {
  const [rentalsData, setRentalsData] = useState(initialRentalsData);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [editingRental, setEditingRental] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    equipmentId: "",
    startDate: null,
    endDate: null,
    status: "Reserved",
    notes: "",
    deposit: "",
  });

  // Use the custom hook for filtering
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData,
  } = useCommonFilters(rentalsData, {
    status: "",
    customerName: "",
    equipmentName: "",
  });

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotalAmount = (equipmentId, startDate, endDate) => {
    const selectedEquipment = equipment.find((eq) => eq.id === equipmentId);
    if (!selectedEquipment || !startDate || !endDate) return 0;

    const days = calculateDays(startDate, endDate);
    return selectedEquipment.dailyRate * days;
  };

  const handleOpenDialog = (rental = null) => {
    if (rental) {
      setEditingRental(rental);
      setFormData({
        customerName: rental.customerName,
        customerEmail: rental.customerEmail,
        customerPhone: rental.customerPhone,
        equipmentId: rental.equipmentId,
        startDate: new Date(rental.startDate),
        endDate: new Date(rental.endDate),
        status: rental.status,
        notes: rental.notes,
        deposit: rental.deposit,
      });
    } else {
      setEditingRental(null);
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        equipmentId: "",
        startDate: null,
        endDate: null,
        status: "Reserved",
        notes: "",
        deposit: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRental(null);
  };

  const handleOpenDetailDialog = (rental) => {
    setSelectedRental(rental);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedRental(null);
  };

  const handleSaveRental = () => {
    const selectedEquipment = equipment.find(
      (eq) => eq.id === formData.equipmentId
    );
    const totalAmount = calculateTotalAmount(
      formData.equipmentId,
      formData.startDate,
      formData.endDate
    );

    if (editingRental) {
      // Edit existing rental
      setRentalsData((prev) =>
        prev.map((rental) =>
          rental.id === editingRental.id
            ? {
                ...rental,
                ...formData,
                equipmentName: selectedEquipment?.name || rental.equipmentName,
                startDate:
                  formData.startDate?.toISOString().split("T")[0] ||
                  rental.startDate,
                endDate:
                  formData.endDate?.toISOString().split("T")[0] ||
                  rental.endDate,
                totalAmount: totalAmount || rental.totalAmount,
                dailyRate: selectedEquipment?.dailyRate || rental.dailyRate,
                deposit: Number(formData.deposit) || rental.deposit,
              }
            : rental
        )
      );
    } else {
      // Add new rental
      const newRental = {
        id: `RNT${String(rentalsData.length + 1).padStart(3, "0")}`,
        ...formData,
        equipmentName: selectedEquipment?.name || "",
        startDate: formData.startDate?.toISOString().split("T")[0] || "",
        endDate: formData.endDate?.toISOString().split("T")[0] || "",
        totalAmount: totalAmount,
        dailyRate: selectedEquipment?.dailyRate || 0,
        deposit: Number(formData.deposit) || 0,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setRentalsData((prev) => [...prev, newRental]);
    }
    handleCloseDialog();
  };

  const handleDeleteRental = (id) => {
    setRentalsData((prev) => prev.filter((rental) => rental.id !== id));
  };

  // Calculate statistics
  const totalRentals = rentalsData.length;
  const activeRentals = rentalsData.filter((r) => r.status === "Active").length;
  const overdueRentals = rentalsData.filter(
    (r) => r.status === "Overdue"
  ).length;
  const reservedRentals = rentalsData.filter(
    (r) => r.status === "Reserved"
  ).length;
  const totalRevenue = rentalsData.reduce(
    (sum, rental) => sum + rental.totalAmount,
    0
  );

  // KPI data for the grid
  const kpiData = [
    {
      label: "Total Rentals",
      value: totalRentals,
      icon: <Assignment fontSize="small" />,
      color: "#4ECDC4",
    },
    {
      label: "Active Rentals",
      value: activeRentals,
      icon: <CheckCircle fontSize="small" />,
      color: "#45B7D1",
    },
    {
      label: "Reserved",
      value: reservedRentals,
      icon: <Schedule fontSize="small" />,
      color: "#96CEB4",
    },
    {
      label: "Overdue",
      value: overdueRentals,
      icon: <Warning fontSize="small" />,
      color: "#FF6B6B",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <AttachMoney fontSize="small" />,
      color: "#FFD93D",
    },
  ];

  // Filter configuration for SearchAndFilterBar
  const filterConfig = [
    {
      label: "Status",
      value: filters.status,
      onChange: (value) => updateFilter("status", value),
      options: rentalStatuses,
      gridSize: 2,
    },
    {
      label: "Customer",
      value: filters.customerName,
      onChange: (value) => updateFilter("customerName", value),
      options: customers,
      gridSize: 2,
    },
    {
      label: "Equipment",
      value: filters.equipmentName,
      onChange: (value) => updateFilter("equipmentName", value),
      options: equipment.map((eq) => eq.name),
      gridSize: 3,
    },
  ];

  return (
    <Box p={2}>
      {/* Statistics Cards */}
      <KPIGrid kpiData={kpiData} />

      {/* Search and Filters */}
      <SearchAndFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filterConfig}
        onClearFilters={clearFilters}
        searchPlaceholder="Search rentals..."
      />

      {/* Rentals Table */}
      <DataTable
        title="Rental Orders"
        data={filteredData}
        onAdd={() => handleOpenDialog()}
        addButtonText="New Rental"
        columns={[
          {
            header: "Rental ID",
            field: "id",
          },
          {
            header: "Customer",
            render: (rental) => (
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  sx={{
                    bgcolor: "#4ECDC4",
                    width: 32,
                    height: 32,
                  }}
                >
                  <Person fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="white">
                    {rental.customerName}
                  </Typography>
                  <Typography variant="caption" color="rgba(255,255,255,0.6)">
                    {rental.customerEmail}
                  </Typography>
                </Box>
              </Box>
            ),
          },
          {
            header: "Equipment",
            render: (rental) => (
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  sx={{
                    bgcolor: "#45B7D1",
                    width: 32,
                    height: 32,
                  }}
                >
                  <Build fontSize="small" />
                </Avatar>
                {rental.equipmentName}
              </Box>
            ),
          },
          // {
          //   header: "Rental Period",
          //   render: (rental) => (
          //     <Box>
          //       <Typography variant="caption" color="rgba(255,255,255,0.6)">
          //         {calculateDays(rental.startDate, rental.endDate)} days
          //       </Typography>
          //     </Box>
          //   ),
          // },
          {
            header: "Status",
            render: (rental) => (
              <StatusChip status={rental.status} type="rental" />
            ),
          },
          {
            header: "Daily Rate",
            render: (rental) => `$${rental.dailyRate}/day`,
          },
          {
            header: "Total Amount",
            render: (rental) => `$${rental.totalAmount.toLocaleString()}`,
          },
          {
            header: "Actions",
            render: (rental) => (
              <ActionButtons
                onView={() => handleOpenDetailDialog(rental)}
                onEdit={() => handleOpenDialog(rental)}
                onDelete={() => handleDeleteRental(rental.id)}
              />
            ),
          },
        ]}
      />

      {/* Add/Edit Rental Dialog */}
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={editingRental ? "Edit Rental" : "Create New Rental"}
        maxWidth="md"
        actions={
          <DialogActions
            sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", p: 2 }}
          >
            <Button onClick={handleCloseDialog} sx={{ color: "#FF6B6B" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveRental}
              sx={{
                backgroundColor: "#4ECDC4",
                color: "white",
                "&:hover": {
                  backgroundColor: "#45B7D1",
                },
              }}
            >
              {editingRental ? "Save Changes" : "Create Rental"}
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="white"
              fontWeight="bold"
              mb={1}
            >
              Customer Information
            </Typography>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Customer Name"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              options={customers}
              showAllOption={false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Customer Email"
              value={formData.customerEmail}
              onChange={(e) =>
                setFormData({ ...formData, customerEmail: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Customer Phone"
              value={formData.customerPhone}
              onChange={(e) =>
                setFormData({ ...formData, customerPhone: e.target.value })
              }
            />
          </Grid>

          {/* Equipment Information */}
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="white"
              fontWeight="bold"
              mb={1}
              mt={2}
            >
              Equipment & Rental Details
            </Typography>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Equipment"
              value={formData.equipmentId}
              onChange={(e) =>
                setFormData({ ...formData, equipmentId: e.target.value })
              }
              options={equipment
                .filter((eq) => eq.status === "Available")
                .map((eq) => ({
                  value: eq.id,
                  label: `${eq.name} - $${eq.dailyRate}/day`,
                }))}
              showAllOption={false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              options={rentalStatuses}
              showAllOption={false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(newValue) =>
                setFormData({ ...formData, startDate: newValue })
              }
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
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
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.6)",
                },
                "& .MuiSvgIcon-root": {
                  color: "rgba(255,255,255,0.6)",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(newValue) =>
                setFormData({ ...formData, endDate: newValue })
              }
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
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
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255,255,255,0.6)",
                },
                "& .MuiSvgIcon-root": {
                  color: "rgba(255,255,255,0.6)",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Deposit Amount"
              type="number"
              value={formData.deposit}
              onChange={(e) =>
                setFormData({ ...formData, deposit: e.target.value })
              }
              startIcon={
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  $
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <GlassMorphCard
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "56px",
              }}
            >
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Estimated Total
              </Typography>
              <Typography variant="h6" color="white" fontWeight="bold">
                $
                {calculateTotalAmount(
                  formData.equipmentId,
                  formData.startDate,
                  formData.endDate
                ).toLocaleString()}
              </Typography>
            </GlassMorphCard>
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </CustomDialog>

      {/* Rental Details Dialog */}
      <CustomDialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        title="Rental Details"
        maxWidth="sm"
      >
        {selectedRental && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="white"
                fontWeight="bold"
                mb={1}
              >
                Customer Information
              </Typography>
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="white">
                <strong>Name:</strong> {selectedRental.customerName}
              </Typography>
              <Typography color="white">
                <strong>Email:</strong> {selectedRental.customerEmail}
              </Typography>
              <Typography color="white">
                <strong>Phone:</strong> {selectedRental.customerPhone}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="white">
                <strong>Rental ID:</strong> {selectedRental.id}
              </Typography>
              <Typography color="white">
                <strong>Status:</strong> {selectedRental.status}
              </Typography>
              <Typography color="white">
                <strong>Created:</strong> {selectedRental.createdDate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="white"
                fontWeight="bold"
                mb={1}
                mt={2}
              >
                Equipment & Rental Details
              </Typography>
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="white">
                <strong>Equipment:</strong> {selectedRental.equipmentName}
              </Typography>
              <Typography color="white">
                <strong>Rental Period:</strong> {selectedRental.startDate} to{" "}
                {selectedRental.endDate}
              </Typography>
              <Typography color="white">
                <strong>Days:</strong>{" "}
                {calculateDays(
                  selectedRental.startDate,
                  selectedRental.endDate
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography color="white">
                <strong>Daily Rate:</strong> ${selectedRental.dailyRate}
              </Typography>
              <Typography color="white">
                <strong>Total Amount:</strong> $
                {selectedRental.totalAmount.toLocaleString()}
              </Typography>
              <Typography color="white">
                <strong>Deposit:</strong> ${selectedRental.deposit}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="white">
                <strong>Notes:</strong> {selectedRental.notes}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CustomDialog>
    </Box>
  );
};

export default Rentals;
