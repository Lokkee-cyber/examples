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
            sx={{
                color: themeMode === 'dark'
                    ? 'primary.light'
                    : 'primary.dark',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Box>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/#">
                    Back to Dashboard
                </Button>
                <Typography variant='h4' margin="10px 0 30px 0" textAlign="center">
                    Add Expense
                </Typography>

                <ExpenseForm />

            </Box>
        </Container></>
    )
};

export default Addexpense;