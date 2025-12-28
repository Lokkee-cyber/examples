import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  colors
} from '@mui/material';
import { useUIStore } from '../store/useUIStore';
import ExpenseList from '../components/ExpenseList';
import { useState } from 'react';

const years = ['2025', '2024', '2023'];
const Filters = () => {
  const { month, category, setMonth, setCategory, year, setYear, setFilters } = useUIStore();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box display="flex" gap={3} mt={3} mb={3} >
     
      

       <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          handleFilterChange({ category: e.target.value });
        }}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="All">All Categories</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Transport">Transport</MenuItem>
        <MenuItem value="Entertainment">Entertainment</MenuItem>
        <MenuItem value="Utilities">Utilities</MenuItem>
      </TextField>

      <TextField
        type="month"
        label="Month"
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
          handleFilterChange({ month: e.target.value });
        }}
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 150 }}
      />
    </Box>
  );
};

export default Filters;