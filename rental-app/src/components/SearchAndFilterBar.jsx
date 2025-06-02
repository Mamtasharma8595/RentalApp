// components/SearchAndFilterBar.jsx
import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  InputAdornment,
  Stack 
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import GlassMorphCard from './GlassMorphCard';

const SearchAndFilterBar = ({ 
  searchValue, 
  onSearchChange, 
  filters = [], 
  onClearFilters,
  searchPlaceholder = "Search...",
  showClearButton = true 
}) => {
  const inputStyles = {
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
    "& .MuiSvgIcon-root": {
      color: "rgba(255,255,255,0.6)",
    },
  };

  return (
    <GlassMorphCard sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            placeholder={searchPlaceholder}
            variant="outlined"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            size={filters.length > 0 ? "small" : "medium"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "rgba(255,255,255,0.6)" }} />
                  </InputAdornment>
                ),
                sx: inputStyles,
              },
              inputLabel: {
                sx: { color: "rgba(255,255,255,0.6)" },
              },
            }}
          />
        </Grid>
        {filters.map((filter, index) => (
          <Grid item xs={12} md={filter.gridSize || 2} key={index}>
            <FormControl fullWidth size={filters.length > 0 ? "small" : "medium"}>
              <InputLabel sx={{ color: "rgba(255,255,255,0.6)" }}>
                {filter.label}
              </InputLabel>
              <Select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                label={filter.label}
                sx={{ ...inputStyles, minWidth: 160 }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      background: "rgba(30, 41, 59, 0.95)",
                      color: "white",
                      backdropFilter: "blur(8px)",
                      borderRadius: 2,
                    },
                  },
                }}
              >
                <MenuItem value="">{filter.allOption || "All"}</MenuItem>
                {filter.options.map((option) => (
                  <MenuItem key={option.value || option} value={option.value || option}>
                    {option.label || option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
        
        {showClearButton && (
          <Grid item xs={12} md={2}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={onClearFilters}
                startIcon={<FilterList />}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.5)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Clear
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </GlassMorphCard>
  );
};

export default SearchAndFilterBar;