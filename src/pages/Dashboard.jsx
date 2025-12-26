import { Container, Typography, Box, Avatar, Grid, Button } from '@mui/material';
import Navbar from '../components/Navbar.jsx';
import Filters from '../components/Filter.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import { useUIStore } from '../store/useUIStore.jsx';
import imagedp from '../assets/pic.webp';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const white = '#faf8f8ff';

const Dashboard = () => { 
    const themeMode = useUIStore((state) => state.themeMode);
    const user = useAuthStore((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('Approved');

    return (
        <>
            <Navbar />
         
            <Container 
            sx={{
                    color: themeMode === 'dark'
                    ? 'primary.light'
                    : 'primary.dark',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                 }}>

                <Box display="flex" flexDirection="row">
                       
                    <Box sx={{ ml: 4, mt: 4, flex: 1 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Expense Dashboard
                        </Typography>
                        
                        
       
                        <Grid  display="flex">
                            <Filters color={white} />
                    
                            <Button 
                                disabled={!user}
                                variant={statusFilter === 'Approved' ? 'contained' : 'outlined'}
                                onClick={() => {
                                    setStatusFilter('Approved');
                                    setIsOpen(true);
                                }}
                                sx={{ mr: '10px', height: '40px', margin: 'auto' }}
                            >
                                Approved
                            </Button>
                            
                            <Button 
                                disabled={!user}
                                variant={statusFilter === 'Pending' ? 'contained' : 'outlined'}
                                onClick={() => {
                                    setStatusFilter('Pending');
                                    setIsOpen(true);
                                }}
                                sx={{ mr: '10px', height: '40px', margin: 'auto' }}
                            >
                                Pending
                            </Button>
                            
                            <Button 
                                disabled={!user}
                                variant={statusFilter === 'Reject' ? 'contained' : 'outlined'}
                                onClick={() => {
                                    setStatusFilter('Reject');
                                    setIsOpen(true);
                                }}
                                sx={{ mr: '10px', height: '40px', margin: 'auto' }}
                            >
                                Reject
                            </Button>
                            
                            <Button 
                                disabled={!user}
                                variant={isOpen ? 'contained' : 'outlined'}
                                onClick={() => setIsOpen(!isOpen)}
                                sx={{ height: '40px', margin: 'auto' }}
                            >
                                {isOpen ? 'Hide List' : 'Show List'}
                            </Button>
                        </Grid>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 4 }}>
                    {isOpen && (
                        <ExpenseList statusFilter={statusFilter} />
                    )}
                </Box>
            </Container>
        </>
    );
};

export default Dashboard;