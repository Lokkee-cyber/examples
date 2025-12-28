import {
    Box,
    Container,
    Typography,
    Button,
    TextField   
} from '@mui/material';
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';

const Signup = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: (user) => {
      setUser(user);
      navigate('/');
    },
    onError: (error) => {
      console.error('Signup failed:', error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: Date.now(),
      firstName,
      lastName,
      email,
      password,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box sx={{ minHeight: '100vh', py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            required
          />
          
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
            {mutation.isPending ? 'Creating account...' : 'Sign Up'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;