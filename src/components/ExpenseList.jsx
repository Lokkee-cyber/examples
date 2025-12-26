import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense } from '../api/expenses';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses.js';

function ExpenseList({ statusFilter = 'Approved' }) {
  const { data = [], isLoading, isError } = useExpenses();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const filteredData = data.filter(expense => expense.status === statusFilter);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error loading expenses</Typography>;
  if (filteredData.length === 0) return <Typography>No {statusFilter} expenses found</Typography>;

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredData.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>{exp.month}</TableCell>
              <TableCell>{exp.title}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>${exp.amount}</TableCell>
              <TableCell>{exp.status}</TableCell>
              <TableCell>
                <IconButton 
                  color="error" 
                  onClick={() => deleteMutation.mutate(exp.id)}
                  disabled={deleteMutation.isPending}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseList;