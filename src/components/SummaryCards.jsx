import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses';
import { useUIStore } from '../store/useUIStore.jsx';

const SummaryCards = () => {
  const { data = [] } = useExpenses();

  const total = data.reduce((sum, exp) => sum + exp.amount, 0);
  const themeMode = useUIStore((state) => state.themeMode);

  return (
      <Grid >
        <Card sx={{ minWidth: 150,
                  marginLeft: "20px", 
                    color: themeMode === 'dark'
                    ? 'primary.light'
                    : 'primary.dark',
                 }}>
          
            <Typography variant="h6" lineHeight="30px" padding={0.6} align="center">Total Expenses: ${total}</Typography>
          
        </Card>
      </Grid>
    
  );
};

export default SummaryCards;