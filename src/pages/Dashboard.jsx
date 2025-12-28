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

                <Box display="flex" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} gap={{ xs: 2, md: 0 }}>
                       
                    <Box sx={{ ml: { xs: 0, md: 1 }, mt: 4, flex: 1 }}>
                        <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                            Expense Dashboard
                        </Typography>
                        
                        
       
                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 2, sm: 1.5 }} alignItems={{ xs: 'stretch', sm: 'center' }}>
                            <Filters color={white} />
                    
                            <Box display="flex" flexDirection={{ xs: 'row', sm: 'row' }} gap={{ xs: 1, sm: 1.5 }} flex={{ xs: 1, sm: 'auto' }} width={{ xs: '100%', sm: 'auto' }}>
                                <Button 
                                    disabled={!user}
                                    fullWidth={{ xs: true, sm: false }}
                                    variant={statusFilter === 'Approved' ? 'contained' : 'outlined'}
                                    onClick={() => {
                                        setStatusFilter('Approved');
                                        setIsOpen(true);
                                    }}
                                    sx={{ height: '40px', width: '80px' }}
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
                                    sx={{ height: '40px', width: '80px' }}
                                >
                                    Pending
                                </Button>
                                
                                <Button 
                                    disabled={!user}
                                    fullWidth={{ xs: true, sm: false }}
                                    variant={statusFilter === 'Reject' ? 'contained' : 'outlined'}
                                    onClick={() => {
                                        setStatusFilter('Reject');
                                        setIsOpen(true);
                                    }}
                                    sx={{ height: '40px', width: '80px' }}
                                >
                                    Reject
                                </Button>
                                
                                <Button 
                                    disabled={!user}
                                    fullWidth={{ xs: true, sm: false }}
                                    variant={isOpen ? 'contained' : 'outlined'}
                                    onClick={() => setIsOpen(!isOpen)}
                                    sx={{ height: '40px', width: '140px', color:'white',backgroundColor: 'green' }}
                                >
                                    {isOpen ? 'Hide List' : 'Show List'}
                                </Button>
                            </Box>
                        </Box>
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