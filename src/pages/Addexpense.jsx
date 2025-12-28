import { Container, Typography, Box } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm.jsx';
import { useUIStore } from '../store/useUIStore.jsx';
import Navbar from '../components/Navbar.jsx';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Addexpense = () => {
    const themeMode = useUIStore((state) => state.themeMode);
    return (
        <><Navbar />
        <Container
            maxWidth="sm"
            sx={{
                color: themeMode === 'dark'
                    ? 'primary.light'
                    : 'primary.dark',
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: { xs: 2, sm: 4 },
                px: { xs: 1, sm: 2 }
            }}>
            <Box sx={{ width: '100%' }}>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/"
                    sx={{ mb: 2 }}>
                    Back to Dashboard
                </Button>
                <Typography variant='h4' margin="10px 0 30px 0" textAlign="center" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                    Add Expense
                </Typography>

                <ExpenseForm />

            </Box>
        </Container></>
    )
};

export default Addexpense;