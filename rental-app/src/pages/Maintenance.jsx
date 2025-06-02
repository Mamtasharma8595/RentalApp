import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  DialogActions,
} from "@mui/material";
import {
  Build,
  Schedule,
  Warning,
  CheckCircle,
  Add,
  Edit,
  Assignment,
  EngineeringOutlined,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Navbar from "@/components/Navbar";
import SideBar from "../components/SideBar";

// Import custom components
import GlassMorphCard from "../components/GlassMorphCard";
import KPIGrid from "../components/KPIGrid";
import SearchAndFilterBar from "../components/SearchAndFilterBar";
import StatusChip from "../components/StatusChip";
import MaintenanceTypeChip from "../components/MaintenanceTypeChip";
import ActionButtons from "../components/ActionButtons";
import CustomDialog from "../components/CustomDialog";
import CustomTextField from "../components/CustomTextField";
import CustomSelect from "../components/CustomSelect";
import { useCommonFilters } from "../components/hooks/useCommonFilters";
import { backgroundGradient } from "../components/commonStyles";
import DataTable from "../components/DataTable";

const maintenanceRecords = [
  {
    id: "M001",
    equipmentName: "Excavator CAT320",
    equipmentId: "EQ001",
    date: "2024-05-25",
    maintenanceType: "Routine",
    notes:
      "Regular oil change and filter replacement. All systems functioning normally.",
    status: "Completed",
    technician: "John Smith",
    cost: "$450",
  },
  {
    id: "M002",
    equipmentName: "Concrete Mixer",
    equipmentId: "EQ002",
    date: "2024-05-28",
    maintenanceType: "Repair",
    notes: "Fixed hydraulic leak in mixing mechanism. Replaced worn seals.",
    status: "Completed",
    technician: "Mike Johnson",
    cost: "$280",
  },
  {
    id: "M003",
    equipmentName: "Bulldozer D6",
    equipmentId: "EQ003",
    date: "2024-06-01",
    maintenanceType: "Inspection",
    notes: "Annual safety inspection. Minor issues found with brake system.",
    status: "In Progress",
    technician: "Sarah Wilson",
    cost: "$150",
  },
  {
    id: "M004",
    equipmentName: "Crane Liebherr",
    equipmentId: "EQ004",
    date: "2024-05-30",
    maintenanceType: "Routine",
    notes: "Lubrication of all moving parts and cable inspection completed.",
    status: "Completed",
    technician: "David Brown",
    cost: "$320",
  },
  {
    id: "M005",
    equipmentName: "Forklift Toyota",
    equipmentId: "EQ005",
    date: "2024-06-02",
    maintenanceType: "Repair",
    notes: "Battery replacement and charging system repair required.",
    status: "Scheduled",
    technician: "Lisa Garcia",
    cost: "$680",
  },
];

const equipmentList = [
  { id: "EQ001", name: "Excavator CAT320" },
  { id: "EQ002", name: "Concrete Mixer" },
  { id: "EQ003", name: "Bulldozer D6" },
  { id: "EQ004", name: "Crane Liebherr" },
  { id: "EQ005", name: "Forklift Toyota" },
  { id: "EQ006", name: "Compactor Roller" },
  { id: "EQ007", name: "Generator Caterpillar" },
];

const maintenanceTypes = ["Routine", "Repair", "Inspection", "Emergency"];

const Maintenance = () => {
  const [records, setRecords] = useState(maintenanceRecords);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    equipmentId: "",
    date: new Date(),
    maintenanceType: "",
    notes: "",
    technician: "",
    cost: "",
  });

  // Use the custom hook for filtering
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData,
  } = useCommonFilters(records, {
    status: "",
    maintenanceType: "",
    equipmentName: "",
  });

  const handleOpenDialog = (record = null) => {
    if (record) {
      setEditingRecord(record);
      setFormData({
        equipmentId: record.equipmentId,
        date: new Date(record.date),
        maintenanceType: record.maintenanceType,
        notes: record.notes,
        technician: record.technician,
        cost: record.cost.replace("$", ""),
      });
    } else {
      setEditingRecord(null);
      setFormData({
        equipmentId: "",
        date: new Date(),
        maintenanceType: "",
        notes: "",
        technician: "",
        cost: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRecord(null);
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setViewDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setViewDialog(false);
    setSelectedRecord(null);
  };

  const handleSaveRecord = () => {
    const selectedEquipment = equipmentList.find(
      (eq) => eq.id === formData.equipmentId
    );

    if (editingRecord) {
      // Edit existing record
      setRecords((prev) =>
        prev.map((record) =>
          record.id === editingRecord.id
            ? {
                ...record,
                ...formData,
                equipmentName: selectedEquipment?.name || record.equipmentName,
                date: formData.date?.toISOString().split("T")[0] || record.date,
                cost: `$${formData.cost}`,
              }
            : record
        )
      );
    } else {
      // Add new record
      const newRecord = {
        id: `M${String(records.length + 1).padStart(3, "0")}`,
        ...formData,
        equipmentName: selectedEquipment?.name || "",
        date: formData.date?.toISOString().split("T")[0] || "",
        cost: `$${formData.cost}`,
        status: "Scheduled",
      };
      setRecords((prev) => [...prev, newRecord]);
    }
    handleCloseDialog();
  };

  const handleDeleteRecord = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  // Calculate statistics
  const totalMaintenance = records.length;
  const completedThisMonth = records.filter(
    (r) => r.status === "Completed"
  ).length;
  const scheduledThisWeek = records.filter(
    (r) => r.status === "Scheduled"
  ).length;
  const overdueTasks = records.filter((r) => r.status === "Overdue").length;
  const inProgress = records.filter((r) => r.status === "In Progress").length;
  const emergencyRepairs = records.filter(
    (r) => r.maintenanceType === "Emergency"
  ).length;

  // KPI data for the grid
  const kpiData = [
    {
      label: "Total Maintenance",
      value: totalMaintenance,
      change: "+8%",
      icon: <Build fontSize="small" />,
      color: "#4ECDC4",
    },
    {
      label: "Completed This Month",
      value: completedThisMonth,
      change: "+12%",
      icon: <CheckCircle fontSize="small" />,
      color: "#45B7D1",
    },
    {
      label: "Scheduled This Week",
      value: scheduledThisWeek,
      change: "+3%",
      icon: <Schedule fontSize="small" />,
      color: "#96CEB4",
    },
    {
      label: "Overdue Tasks",
      value: overdueTasks,
      change: "-1%",
      icon: <Warning fontSize="small" />,
      color: "#FF6B6B",
    },
    {
      label: "In Progress",
      value: inProgress,
      change: "+2%",
      icon: <Assignment fontSize="small" />,
      color: "#FFD93D",
    },
    {
      label: "Emergency Repairs",
      value: emergencyRepairs,
      change: "0%",
      icon: <EngineeringOutlined fontSize="small" />,
      color: "#B19CD9",
    },
  ];

  // Filter configuration for SearchAndFilterBar
  const filterConfig = [
    {
      label: "Maintenance Type",
      value: filters.maintenanceType,
      onChange: (value) => updateFilter("maintenanceType", value),
      options: maintenanceTypes,
      gridSize: 3,
    },
    {
      label: "Status",
      value: filters.status,
      onChange: (value) => updateFilter("status", value),
      options: ["Completed", "In Progress", "Scheduled", "Overdue"],
      gridSize: 2,
    },
    {
      label: "Equipment",
      value: filters.equipmentName,
      onChange: (value) => updateFilter("equipmentName", value),
      options: equipmentList.map((eq) => eq.name),
      gridSize: 3,
    },
  ];

  return (
    <Box>
      <Box>
        <Box p={3}>
          <KPIGrid kpiData={kpiData} />

          {/* Search and Filters */}
          <SearchAndFilterBar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filterConfig}
            onClearFilters={clearFilters}
            searchPlaceholder="Search maintenance records..."
          />

          {/* Maintenance Records Table */}
          <DataTable
            title="Maintenance Records"
            data={filteredData}
            onAdd={() => handleOpenDialog()}
            addButtonText="New Record"
            columns={[
              {
                header: "Maintenance ID",
                field: "id",
              },
              {
                header: "Equipment Name",
                field: "equipmentName",
              },
              {
                header: "Date",
                field: "date",
              },
              {
                header: "Type",
                render: (record) => (
                  <MaintenanceTypeChip type={record.maintenanceType} />
                ),
              },
              {
                header: "Status",
                render: (record) => (
                  <StatusChip status={record.status} type="maintenance" />
                ),
              },
              {
                header: "Technician",
                field: "technician",
              },
              {
                header: "Cost",
                field: "cost",
              },
              {
                header: "Actions",
                render: (record) => (
                  <ActionButtons
                    onView={() => handleViewDetails(record)}
                    onEdit={() => handleOpenDialog(record)}
                    onDelete={() => handleDeleteRecord(record.id)}
                  />
                ),
              },
            ]}
          />
          </Box>
      </Box>

      {/* Add/Edit Maintenance Dialog */}
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={
          editingRecord
            ? "Edit Maintenance Record"
            : "Add New Maintenance Record"
        }
        maxWidth="md"
        actions={
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDialog} sx={{ color: "#FF6B6B" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveRecord}
              sx={{
                backgroundColor: "#4ECDC4",
                color: "white",
                "&:hover": {
                  backgroundColor: "#45B7D1",
                },
              }}
            >
              {editingRecord ? "Save Changes" : "Save Record"}
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <CustomSelect
              label="Equipment"
              value={formData.equipmentId}
              onChange={(e) =>
                setFormData({ ...formData, equipmentId: e.target.value })
              }
              options={equipmentList.map((equipment) => ({
                value: equipment.id,
                label: `${equipment.name} (${equipment.id})`,
              }))}
              showAllOption={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Maintenance Date"
              value={formData.date}
              onChange={(newValue) =>
                setFormData({ ...formData, date: newValue })
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
            <CustomSelect
              label="Maintenance Type"
              value={formData.maintenanceType}
              onChange={(e) =>
                setFormData({ ...formData, maintenanceType: e.target.value })
              }
              options={maintenanceTypes}
              showAllOption={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Technician"
              value={formData.technician}
              onChange={(e) =>
                setFormData({ ...formData, technician: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label="Cost"
              type="number"
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
              startIcon={
                <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                  $
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Enter maintenance details and notes..."
            />
          </Grid>
        </Grid>
      </CustomDialog>

      {/* View Details Dialog */}
      <CustomDialog
        open={viewDialog}
        onClose={handleCloseDetailDialog}
        title="Maintenance Record Details"
        maxWidth="md"
        actions={
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={handleCloseDetailDialog}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFD93D",
                "&:hover": { backgroundColor: "#FFC107" },
                color: "black",
                fontWeight: "bold",
              }}
              startIcon={<Edit />}
              onClick={() => {
                handleCloseDetailDialog();
                handleOpenDialog(selectedRecord);
              }}
            >
              Edit Record
            </Button>
          </DialogActions>
        }
      >
        {selectedRecord && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Maintenance ID
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedRecord.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Equipment
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedRecord.equipmentName} ({selectedRecord.equipmentId})
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Date
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedRecord.date}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Type
              </Typography>
              <Box sx={{ mb: 2 }}>
                <MaintenanceTypeChip type={selectedRecord.maintenanceType} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Status
              </Typography>
              <Box sx={{ mb: 2 }}>
                <StatusChip status={selectedRecord.status} type="maintenance" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Technician
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedRecord.technician}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Cost
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedRecord.cost}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="rgba(255,255,255,0.7)">
                Notes
              </Typography>
              <Typography variant="body1" color="white" sx={{ mb: 2 }}>
                {selectedRecord.notes}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CustomDialog>
    </Box>
  );
};

export default Maintenance;
