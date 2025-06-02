import React from "react";
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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import GlassMorphCard from "./GlassMorphCard";

const DataTable = ({
  title,
  data,
  columns,
  onAdd,
  addButtonText = "Add New",
  showAddButton = true,
}) => {
  return (
    <GlassMorphCard sx={{ mb: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" color="white" fontWeight="bold">
          {title} ({data.length} {title.toLowerCase().includes('record') ? 'records' : title.toLowerCase().includes('rental') ? 'orders' : 'items'})
        </Typography>
        {showAddButton && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAdd}
            sx={{
              backgroundColor: "#4ECDC4",
              "&:hover": {
                backgroundColor: "#45B7D1",
              },
            }}
          >
            {addButtonText}
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} sx={{ background: "transparent" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={{ color: "white" }}>
                    {column.render ? column.render(row) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GlassMorphCard>
  );
};

export default DataTable;