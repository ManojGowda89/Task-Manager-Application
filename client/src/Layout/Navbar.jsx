
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFirestore } from "../Store/FireStore.jsx";


const Navbar = () => {
  const { LogOut, user } = useFirestore(); // Get LogOut and user from the context

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Task Manager Application
        </Typography>

        {user ? (
          <Button color="inherit" onClick={() => {
            LogOut()
            window.location.reload()
            }} component={Link}  to="/login">
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
