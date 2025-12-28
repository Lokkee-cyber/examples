import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useExpenses } from '../hooks/useExpenses';
import { useUIStore } from '../store/useUIStore.jsx';

const SummaryCards = () => {
  const { data = [] } = useExpenses();

  const total = data.reduce((sum, exp) => sum + exp.amount, 0);
  const themeMode = useUIStore((state) => state.themeMode);

  return (
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
                    minWidth: 150,
                    color: themeMode === 'dark'
                    ? 'primary.light'
                    : 'primary.dark',
                 }}>
            
              <Typography variant="h6" lineHeight="30px" padding={0.6} align="center" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Total Expenses: ${total}</Typography>
            
          </Card>
        </Grid>
      </Grid>
    
  );
};

export default SummaryCards;