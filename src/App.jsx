import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useUIStore } from './store/useUIStore.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Addexpense from './pages/Addexpense.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { useAuthStore } from './store/useAuthStore';
import CEODashboard from './pages/CEODashboard';

function App() {
  const themeMode = useUIStore((state) => state.themeMode);
  const user = useAuthStore((state) => state.user);

  const theme = createTheme({
    palette: { mode: themeMode },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add-expense" element={user ? <Addexpense /> : <Navigate to="/login" />} />
          <Route path="/ceo-dashboard" element={user?.role === 'CEO' ? <CEODashboard /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;