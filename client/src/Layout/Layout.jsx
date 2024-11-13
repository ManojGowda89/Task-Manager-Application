import React from 'react';
import Navbar from './Navbar';
import Footer from './Footor';
import { Container, Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

export const Layout = ({ children }) => {
    return (
        <Box 
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Navbar />
            <Container component="main" sx={{ flex: 1, mt: 2, mb: 2 }}>
            <ToastContainer />
                {children}
            </Container>
            <Footer />
        </Box>
    );
};
