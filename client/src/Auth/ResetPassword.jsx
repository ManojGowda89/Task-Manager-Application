
import React, { useState } from 'react';
import { useFirestore } from '../Store/FireStore.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Layout } from '../Layout/Layout.jsx';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const { sendPasswordReset } = useFirestore();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
          navigate('/login'); 
          toast.success("Password reset email sent! Check your inbox.");
  
    } catch (error) {
        toast.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <Layout>
      <Container maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Box
          sx={{
            mt: 5,
            p: 4,
            border: '2px solid #1976d2',
            borderRadius: '8px',
            backgroundColor: '#1e1e1e',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom color="primary.contrastText">
            Reset Password
          </Typography>
          <form onSubmit={handleResetPassword} noValidate>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
          </form>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="primary.contrastText">
              Remembered your password? <Link href="/login" style={{ color: '#1976d2' }}>Login</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default ResetPassword;
