
// hooks/useCommonFilters.js
import { useState, useEffect } from 'react';

export const useCommonFilters = (data, initialFilters = {}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => {
        return Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        filtered = filtered.filter(item => {
          if (key.includes('.')) {
            // Handle nested properties like 'customer.name'
            const keys = key.split('.');
            let nestedValue = item;
            keys.forEach(k => {
              nestedValue = nestedValue?.[k];
            });
            return nestedValue === value || nestedValue?.includes?.(value);
          }
          return item[key] === value || item[key]?.includes?.(value);
        });
      }
    });

    setFilteredData(filtered);
  }, [data, searchTerm, filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters(initialFilters);
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData
  };
};