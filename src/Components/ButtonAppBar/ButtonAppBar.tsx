import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import './ButtonAppBar.css'

export default function ButtonAppBar() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#3eb8b4' }}>
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Puzzle Games
                </Typography>
                <Link to="/" className="custom-link">Home</Link>
                <Link to="/loginsignup" className="custom-link">Login</Link>
                <Link to="/usermanagement" className="custom-link">Manage account</Link>
            </Toolbar>
        </AppBar>
    </Box>
);
}