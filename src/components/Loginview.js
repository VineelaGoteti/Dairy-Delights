import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const navigate = useNavigate();
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');

  // Hardcoded security code for demo
  const validSecurityCode = 'admin123';

  const handleSecurityCodeChange = (e) => {
    setSecurityCode(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate the security code
    if (securityCode === validSecurityCode) {
      // Store the login status in localStorage or state
      localStorage.setItem('isAuthenticated', 'true');
      // Redirect to order-requests page
      navigate('/order-requests');
    } else {
      setError('Invalid security code. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Enter Security Code"
          variant="outlined"
          type='password'
          fullWidth
          value={securityCode}
          onChange={handleSecurityCodeChange}
          style={{ marginBottom: '20px' }}
        />
        {error && (
          <Typography color="error" style={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginView;
