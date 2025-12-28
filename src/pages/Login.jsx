import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);


  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      console.log('Login successful, user data:', user);
      setUser(user);
      // Redirect to CEO dashboard if user is CEO, otherwise to regular dashboard
      setTimeout(() => {
        if (user?.role === 'CEO') {
          console.log('Redirecting to CEO dashboard');
          navigate('/ceo-dashboard');
        } else {
          console.log('Redirecting to regular dashboard');
          navigate('/');
        }
      }, 100);
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <Container maxWidth="sm" 
            sx={{
                    minHeight: "100vh",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: { xs: 2, sm: 3 }
                 }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          Login
        </Typography>

        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {mutation.error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </Button>

          <Button
            component={Link}
            to="/signup"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Create an account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;