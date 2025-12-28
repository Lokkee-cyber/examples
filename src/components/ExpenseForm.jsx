import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExpense } from '../api/expenses';
import { useAuthStore  } from '../store/useAuthStore';

const ExpenseForm = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [month, setMonth] = useState('2025-01');

  const mutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      setTitle('');
      setAmount('');
      setCategory('Food');
      setMonth('2025-01');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      title,
      amount: Number(amount),
      category,
      status: 'Pending',
      month,
      userId: user?.id,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', width: '100%' }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        size="small"
        sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(25% - 8px)' } }}
      />

      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        size="small"
        sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(25% - 8px)' } }}
      />

      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        size="small"
        sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(25% - 8px)' } }}
      >
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Rent">Rent</MenuItem>
        <MenuItem value="Transport">Transport</MenuItem>
      </TextField>

      <TextField
        label="Month"
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        size="small"
        sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(25% - 8px)' } }}
      />

      <Button type="submit" variant="contained" disabled={!user || mutation.isPending} sx={{ flex: { xs: '1 1 100%', sm: 'auto' } }}>
        {mutation.isPending ? 'Adding...' : 'Add'}
      </Button>
    </Box>
  );
};

export default ExpenseForm;