// src/components/Auth/Login.tsx

import React, { useState } from 'react';
import { authService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, Stack } from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await authService.login(username, password);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setError(null);
      navigate('/');  // Redirect after login
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Assuming authService has a register method
      await authService.register(username, password, email);
      setError(null);
      setIsRegistering(false); // Switch back to login after successful registration
      navigate('/'); // Redirect after registration
    } catch (err: any) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Box p={4} maxWidth="400px" mx="auto">
      <Typography variant="h4" gutterBottom>
        {isRegistering ? 'Register' : 'Login'}
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <Stack spacing={3}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {isRegistering && (
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Switch to Login' : 'Switch to Register'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
