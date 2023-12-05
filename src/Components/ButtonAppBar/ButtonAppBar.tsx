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
import puzzle_icon from "../Assets/puzzle_small.png";

export default function ButtonAppBar({color, session}: { color: string, session: string }) {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: color}}>
                <Toolbar>
                    <img src={puzzle_icon} alt=""/>
                    <Typography variant="h6" component="div" style={{paddingLeft: '15px'}} sx={{flexGrow: 1}}>
                        Puzzle Games
                    </Typography>
                    <Link to={session === '' || session == undefined ||  session=='null' ? "/" : ("/?session=" + (session || ''))} className="custom-link">Home</Link>
                    {session === '' || session == undefined ||  session=='null'?
                        <Link to="/loginsignup" className="custom-link">Login</Link> :
                        <Link to={"/usermanagement?session=" + session} className="custom-link">Manage account</Link>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}