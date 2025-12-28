import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense } from '../api/expenses';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box, useMediaQuery, useTheme, Card, CardContent, Stack } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses.js';

function ExpenseList({ statusFilter = 'Approved' }) {
  const { data = [], isLoading, isError } = useExpenses();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  // Mobile card view
  if (isMobile) {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        {filteredData.map((exp) => (
          <Card key={exp.id}>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                <strong>Date:</strong> {exp.month}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Title:</strong> {exp.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Category:</strong> {exp.category}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Amount:</strong> ${exp.amount}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Status:</strong> {exp.status}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <IconButton 
                  color="error" 
                  size="small"
                  onClick={() => deleteMutation.mutate(exp.id)}
                  disabled={deleteMutation.isPending}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  // Desktop table view
  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>Date</TableCell>
            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>Title</TableCell>
            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>Category</TableCell>
            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>Amount</TableCell>
            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>Status</TableCell>
            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredData.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{exp.month}</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{exp.title}</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{exp.category}</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>${exp.amount}</TableCell>
              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{exp.status}</TableCell>
              <TableCell>
                <IconButton 
                  color="error" 
                  size="small"
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