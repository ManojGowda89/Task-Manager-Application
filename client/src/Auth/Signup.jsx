
import React, { useState } from 'react';
import {useFirestore} from "../Store/FireStore.jsx"
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Layout } from '../Layout/Layout.jsx';
import { toast } from 'react-toastify';
const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const {Signup,GoogleAuth}= useFirestore()
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
        toast.warning("Passwords do not match");
      return;
    }
    try {
 const result = await  Signup(form.email,form.password,form.name)
   if(result){
    navigate('/');

}
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <Layout>
    <Container maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
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
          Signup
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
          />
          {/* <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
          /> */}
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            type="email"
            onChange={handleChange}
            required
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
          />
          <TextField
            label="Password"
            name="password"
            fullWidth
            margin="normal"
            type="password"
            onChange={handleChange}
            required
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            fullWidth
            margin="normal"
            type="password"
            onChange={handleChange}
            required
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="primary.contrastText">
            Already have an account? <Link to="/login" style={{ color: '#1976d2' }}>Login</Link>
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
            Signup with Google
          </Button>
        </Box>
      </Box>
    </Container>
    </Layout>
  );
};

export default Signup;
