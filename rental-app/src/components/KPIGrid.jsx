// components/KPIGrid.jsx
import React from 'react';
import { Grid, Typography, Avatar, Chip, Box } from '@mui/material';
import GlassMorphCard from './GlassMorphCard';

const KPIGrid = ({ kpiData }) => {
  return (
    <Grid container spacing={3} mb={3}>
      {kpiData.map((kpi, index) => (
        <Grid item xs={12} sm={6} md={kpi.gridSize || 2.4} key={index}>
          <GlassMorphCard sx={{ padding: 1.5 }}>
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
                  width: kpi.avatarSize || 40,
                  height: kpi.avatarSize || 40,
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
                sx={{ mb: kpi.change ? 1 : 0 }}
              >
                {kpi.value}
              </Typography>
              {kpi.change && (
                <Chip
                  label={kpi.change}
                  size="small"
                  color={
                    kpi.trend === "up"
                      ? "success"
                      : kpi.trend === "down"
                      ? "error"
                      : "default"
                  }
                  sx={{ fontSize: "0.75rem" }}
                />
              )}
            </Box>
          </GlassMorphCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPIGrid;