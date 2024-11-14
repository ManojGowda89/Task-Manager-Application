
import React, { useState } from 'react';
import {useFirestore} from "../Store/FireStore.jsx"
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Layout } from '../Layout/Layout.jsx';
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {Login,GoogleAuth}= useFirestore()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const result=await Login(email,password)
     if(result){
         navigate('/');

     }
    } catch (error) {
      console.error("Error logging in:", error);
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
          Login
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
          />
           <Typography variant="body2" color="primary.contrastText">
                       Forgot Password ? <Link to="/forgotpassword" style={{ color: '#1976d2' }}>Forgot</Link>
          </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
       
          <Typography variant="body2" color="primary.contrastText">
            Don't have an account? <Link to="/signup" style={{ color: '#1976d2' }}>Signup</Link>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2, color: 'white', borderColor: '#1976d2' }}
            onClick={async () => {
                try {
                  const response = await GoogleAuth();
                  if (response) {
                    navigate("/"); // Redirect to home on successful login
                  }
                } catch (error) {
                  console.error("Google login failed:", error.message);
                  toast.error("Google login failed. Check Your Internet.");
                }
              }}
          >
            <GoogleIcon sx={{ marginRight: 1 }} /> {/* Adds the Google icon */}
            <Typography variant="button" sx={{ fontWeight: 600 }}>Google</Typography> {/* Title: Google */}
          </Button>
        </Box>
      </Box>
    </Container>
    </Layout>
  );
};

export default Login;
