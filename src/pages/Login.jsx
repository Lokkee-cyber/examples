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
      setUser(user);
      navigate('/');
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
                    height: "100vh"
                 }}
    >
      <Box
        sx={{
          
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, mt: 5 }}>
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
            sx={{ mt: 3 }}
          >
            Create an account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;