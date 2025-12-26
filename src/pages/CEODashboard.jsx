import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from '../components/Navbar.jsx';
import { useExpenses } from '../hooks/useExpenses.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpense } from '../api/expenses';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

const CEODashboard = () => {
  const { data = [], isLoading, isError } = useExpenses();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(null);

  // Check if user is CEO
  if (!user || user.role !== 'CEO') {
    return <Navigate to="/" />;
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateExpense(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      setOpenDialog(false);
      setSelectedExpense(null);
    },
  });

  const handleApprove = (expense) => {
    setSelectedExpense(expense);
    setAction('Approved');
    setOpenDialog(true);
  };

  const handleReject = (expense) => {
    setSelectedExpense(expense);
    setAction('Reject');
    setOpenDialog(true);
  };

  const confirmAction = () => {
    updateMutation.mutate({
      id: selectedExpense.id,
      updatedData: { status: action },
    });
  };

  const pendingExpenses = data.filter(exp => exp.status === 'Pending');

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error loading expenses</Typography>;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          CEO - Expense Approval Dashboard
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Title</TableCell>
                <TableCell sx={{ color: 'white' }}>Category</TableCell>
                <TableCell sx={{ color: 'white' }}>Amount</TableCell>
                <TableCell sx={{ color: 'white' }}>User</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pendingExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No pending expenses
                  </TableCell>
                </TableRow>
              ) : (
                pendingExpenses.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell>{exp.month}</TableCell>
                    <TableCell>{exp.title}</TableCell>
                    <TableCell>{exp.category}</TableCell>
                    <TableCell>${exp.amount}</TableCell>
                    <TableCell>{exp.userId}</TableCell>
                    <TableCell>
                      <Box sx={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px',
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        fontWeight: 'bold'
                      }}>
                        {exp.status}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleApprove(exp)}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleReject(exp)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to {action?.toLowerCase()} this expense of ${selectedExpense?.amount}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              onClick={confirmAction}
              variant="contained"
              color={action === 'Approved' ? 'success' : 'error'}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default CEODashboard;