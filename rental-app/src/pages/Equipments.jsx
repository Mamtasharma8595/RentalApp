import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  DialogActions,
  Avatar,
  Chip,
} from "@mui/material";
import { Add, Build, Construction, Engineering } from "@mui/icons-material";

// Import custom components
import GlassMorphCard from "../components/GlassMorphCard";
import KPIGrid from "../components/KPIGrid";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
import ActionButtons from "../components/ActionButtons";
import CustomDialog from "../components/CustomDialog";
import CustomTextField from "../components/CustomTextField";
import CustomSelect from "../components/CustomSelect";
import { useCommonFilters } from "../components/hooks/useCommonFilters";
import DataTable from "../components/DataTable";

const initialEquipmentData = [
  {
    id: "EQ001",
    name: "Excavator CAT320",
    category: "Heavy Machinery",
    condition: "Good",
    status: "Rented",
    dailyRate: 450,
    location: "Site A",
    lastMaintenance: "2024-04-15",
  },
  {
    id: "EQ002",
    name: "Concrete Mixer",
    category: "Light Equipment",
    condition: "Fair",
    status: "Available",
    dailyRate: 120,
    location: "Warehouse",
    lastMaintenance: "2024-05-10",
  },
  {
    id: "EQ003",
    name: "Bulldozer D6",
    category: "Heavy Machinery",
    condition: "Excellent",
    status: "Rented",
    dailyRate: 650,
    location: "Site B",
    lastMaintenance: "2024-05-20",
  },
  {
    id: "EQ004",
    name: "Power Drill Set",
    category: "Power Tools",
    condition: "Good",
    status: "Available",
    dailyRate: 25,
    location: "Warehouse",
    lastMaintenance: "2024-05-28",
  },
  {
    id: "EQ005",
    name: "Crane Liebherr",
    category: "Heavy Machinery",
    condition: "Good",
    status: "Maintenance",
    dailyRate: 800,
    location: "Service Center",
    lastMaintenance: "2024-05-30",
  },
  {
    id: "EQ006",
    name: "Angle Grinder",
    category: "Power Tools",
    condition: "New",
    status: "Available",
    dailyRate: 30,
    location: "Warehouse",
    lastMaintenance: "N/A",
  },
];

const categories = [
  "Heavy Machinery",
  "Light Equipment",
  "Power Tools",
  "Vehicles",
];
const conditions = ["New", "Excellent", "Good", "Fair", "Poor"];
const statuses = ["Available", "Rented", "Maintenance", "Out of Service"];

const Equipment = () => {
  const [equipmentData, setEquipmentData] = useState(initialEquipmentData);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    condition: "",
    status: "",
    dailyRate: "",
    location: "",
  });

  // Use the custom hook for filtering
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData,
  } = useCommonFilters(equipmentData, {
    status: "",
    condition: "",
    category: "",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "success";
      case "Rented":
        return "primary";
      case "Maintenance":
        return "warning";
      case "Out of Service":
        return "error";
      default:
        return "default";
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "New":
      case "Excellent":
        return "success";
      case "Good":
        return "primary";
      case "Fair":
        return "warning";
      case "Poor":
        return "error";
      default:
        return "default";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Heavy Machinery":
        return <Construction fontSize="small" />;
      case "Light Equipment":
        return <Engineering fontSize="small" />;
      case "Power Tools":
        return <Build fontSize="small" />;
      default:
        return <Build fontSize="small" />;
    }
  };

  const handleOpenDialog = (equipment = null) => {
    if (equipment) {
      setEditingEquipment(equipment);
      setFormData({
        name: equipment.name,
        category: equipment.category,
        condition: equipment.condition,
        status: equipment.status,
        dailyRate: equipment.dailyRate,
        location: equipment.location,
      });
    } else {
      setEditingEquipment(null);
      setFormData({
        name: "",
        category: "",
        condition: "",
        status: "",
        dailyRate: "",
        location: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEquipment(null);
  };

  const handleOpenDetailDialog = (equipment) => {
    setSelectedEquipment(equipment);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedEquipment(null);
  };

  const handleSaveEquipment = () => {
    if (editingEquipment) {
      // Edit existing equipment
      setEquipmentData((prev) =>
        prev.map((eq) =>
          eq.id === editingEquipment.id
            ? { ...eq, ...formData, dailyRate: Number(formData.dailyRate) }
            : eq
        )
      );
    } else {
      // Add new equipment
      const newEquipment = {
        id: `EQ${String(equipmentData.length + 1).padStart(3, "0")}`,
        ...formData,
        dailyRate: Number(formData.dailyRate),
        lastMaintenance: "N/A",
      };
      setEquipmentData((prev) => [...prev, newEquipment]);
    }
    handleCloseDialog();
  };

  const handleDeleteEquipment = (id) => {
    setEquipmentData((prev) => prev.filter((eq) => eq.id !== id));
  };

  // Calculate statistics
  const totalEquipment = equipmentData.length;
  const availableCount = equipmentData.filter(
    (eq) => eq.status === "Available"
  ).length;
  const rentedCount = equipmentData.filter(
    (eq) => eq.status === "Rented"
  ).length;
  const maintenanceCount = equipmentData.filter(
    (eq) => eq.status === "Maintenance"
  ).length;

  // KPI data for the grid
  const kpiData = [
    {
      label: "Total Equipment",
      value: totalEquipment,
      icon: <Build fontSize="small" />,
      color: "#4ECDC4",
    },
    {
      label: "Available",
      value: availableCount,
      icon: <Construction fontSize="small" />,
      color: "#45B7D1",
    },
    {
      label: "Currently Rented",
      value: rentedCount,
      icon: <Engineering fontSize="small" />,
      color: "#96CEB4",
    },
    {
      label: "In Maintenance",
      value: maintenanceCount,
      icon: <Build fontSize="small" />,
      color: "#FFD93D",
    },
  ];

  // Filter configuration for SearchAndFilterBar
  const filterConfig = [
    {
      label: "Status",
      value: filters.status,
      onChange: (value) => updateFilter("status", value),
      options: statuses,
      gridSize: 2,
    },
    {
      label: "Condition",
      value: filters.condition,
      onChange: (value) => updateFilter("condition", value),
      options: conditions,
      gridSize: 2,
    },
    {
      label: "Category",
      value: filters.category,
      onChange: (value) => updateFilter("category", value),
      options: categories,
      gridSize: 2,
    },
  ];

  return (
    <Box p={3}>
      {/* Statistics Cards */}
      <KPIGrid kpiData={kpiData} />

      {/* Search and Filters */}
      <SearchAndFilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filterConfig}
        onClearFilters={clearFilters}
        searchPlaceholder="Search equipment..."
      />

      {/* Equipment Table */}
      <DataTable
        title="Equipment Inventory"
        data={filteredData}
        onAdd={() => handleOpenDialog()}
        addButtonText="Add Equipment"
        columns={[
          {
            header: "Equipment ID",
            field: "id",
          },
          {
            header: "Name",
            render: (equipment) => (
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  sx={{
                    bgcolor: "#4ECDC4",
                    width: 32,
                    height: 32,
                  }}
                >
                  {getCategoryIcon(equipment.category)}
                </Avatar>
                {equipment.name}
              </Box>
            ),
          },
          // {
          //   header: "Category",
          //   field: "category",
          // },
          {
            header: "Condition",
            render: (equipment) => (
              <Chip
                label={equipment.condition}
                color={getConditionColor(equipment.condition)}
                size="small"
              />
            ),
          },
          {
            header: "Status",
            render: (equipment) => (
              <Chip
                label={equipment.status}
                color={getStatusColor(equipment.status)}
                size="small"
              />
            ),
          },
          {
            header: "Daily Rate",
            render: (equipment) => `$${equipment.dailyRate}/day`,
          },
          // {
          //   header: "Location",
          //   field: "location",
          // },
          {
            header: "Last Maintenance",
            field: "lastMaintenance",
          },
          {
            header: "Actions",
            render: (equipment) => (
              <ActionButtons
                onView={() => handleOpenDetailDialog(equipment)}
                onEdit={() => handleOpenDialog(equipment)}
                onDelete={() => handleDeleteEquipment(equipment.id)}
              />
            ),
          },
        ]}
      />

      {/* Equipment Grid View */}
      <Typography variant="h6" mb={2} color="white" fontWeight="bold">
        Equipment Grid View
      </Typography>
      <Grid container spacing={3} mb={5}>
        {filteredData.slice(0, 8).map((equipment) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={equipment.id}>
            <GlassMorphCard>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
              >
                <Avatar
                  sx={{
                    bgcolor: "#4ECDC4",
                    width: 48,
                    height: 48,
                  }}
                >
                  {getCategoryIcon(equipment.category)}
                </Avatar>
                <ActionButtons
                  onEdit={() => handleOpenDialog(equipment)}
                  onDelete={() => handleDeleteEquipment(equipment.id)}
                  showView={false}
                  size="small"
                />
              </Box>

              <Typography
                variant="subtitle1"
                color="white"
                fontWeight="bold"
                mb={1}
              >
                {equipment.name}
              </Typography>

              <Typography
                variant="body2"
                color="rgba(255,255,255,0.8)"
                mb={1}
              >
                {equipment.category}
              </Typography>

              <Box display="flex" gap={1} mb={2}>
                <Chip
                  label={equipment.status}
                  color={getStatusColor(equipment.status)}
                  size="small"
                />
                <Chip
                  label={equipment.condition}
                  color={getConditionColor(equipment.condition)}
                  size="small"
                />
              </Box>

              <Typography
                variant="h6"
                color="#4ECDC4"
                fontWeight="bold"
                mb={1}
              >
                ${equipment.dailyRate}/day
              </Typography>

              <Typography variant="caption" color="rgba(255,255,255,0.6)">
                Location: {equipment.location}
              </Typography>
            </GlassMorphCard>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Equipment Dialog */}
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={editingEquipment ? "Edit Equipment" : "Add New Equipment"}
        maxWidth="md"
        actions={
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDialog} sx={{ color: "#FF6B6B" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveEquipment}
              sx={{
                backgroundColor: "#4ECDC4",
                color: "white",
                "&:hover": {
                  backgroundColor: "#45B7D1",
                },
              }}
            >
              {editingEquipment ? "Update" : "Add"} Equipment
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Equipment Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              options={categories}
              showAllOption={false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Condition"
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
              options={conditions}
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
              options={statuses}
              showAllOption={false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Daily Rate"
              type="number"
              value={formData.dailyRate}
              onChange={(e) =>
                setFormData({ ...formData, dailyRate: e.target.value })
              }
              startIcon={
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  $
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </CustomDialog>

      {/* Equipment Details Dialog */}
      <CustomDialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        title="Equipment Details"
        maxWidth="sm"
      >
        {selectedEquipment && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Equipment ID
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Name
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Category
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.category}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Condition
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={selectedEquipment.condition}
                  color={getConditionColor(selectedEquipment.condition)}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Status
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={selectedEquipment.status}
                  color={getStatusColor(selectedEquipment.status)}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Daily Rate
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                ${selectedEquipment.dailyRate}/day
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Location
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.location}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Last Maintenance
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.lastMaintenance}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CustomDialog>

      {/* Add/Edit Equipment Dialog */}
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={editingEquipment ? "Edit Equipment" : "Add New Equipment"}
        maxWidth="md"
        actions={
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDialog} sx={{ color: "#FF6B6B" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveEquipment}
              sx={{
                backgroundColor: "#4ECDC4",
                color: "white",
                "&:hover": {
                  backgroundColor: "#45B7D1",
                },
              }}
            >
              {editingEquipment ? "Update" : "Add"} Equipment
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Equipment Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              options={categories}
              showAllOption={false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Condition"
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
              options={conditions}
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
              options={statuses}
              showAllOption={false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Daily Rate"
              type="number"
              value={formData.dailyRate}
              onChange={(e) =>
                setFormData({ ...formData, dailyRate: e.target.value })
              }
              startIcon={
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  $
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </CustomDialog>

      {/* Equipment Details Dialog */}
      <CustomDialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        title="Equipment Details"
        maxWidth="sm"
      >
        {selectedEquipment && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Equipment ID
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Name
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Category
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.category}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Condition
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={selectedEquipment.condition}
                  color={getConditionColor(selectedEquipment.condition)}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Status
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={selectedEquipment.status}
                  color={getStatusColor(selectedEquipment.status)}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Daily Rate
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                ${selectedEquipment.dailyRate}/day
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Location
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.location}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Last Maintenance
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedEquipment.lastMaintenance}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CustomDialog>
    </Box>
  );
};

export default Equipment;