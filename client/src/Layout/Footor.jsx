
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            component="footer"
            
            sx={{
                py: 2,
                px: 2,
                mt: 'auto',          
                backgroundColor: '#1A4FD6', 
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © 2024 Manoj Gowda
            </Typography>
        </Box>
    );
};

export default Footer;
