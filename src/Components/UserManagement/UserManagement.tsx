import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box } from '@mui/material';
import './UserManagement.css'

const UserManagement = () => {
    // State for password change field
    const [newPassword, setNewPassword] = useState('');

    // Sample data for played games (replace this with your actual data)
    const playedGames = [
        { id: 1, name: 'Game 1', score: 150 },
        { id: 2, name: 'Game 2', score: 200 },
        // Add more games as needed
    ];

    // Handler for password change
    const handlePasswordChange = () => {
        // Implement password change logic here
        console.log('New password:', newPassword);
        // You may want to send this to an API or update state accordingly
    };

    return (
        <div className='container'>
            <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
            {/* Password Change Field */}
            <Grid item xs={12}>
                <Typography variant="h5">Change Password</Typography>
                <TextField
                    className="newpasswordfield"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button variant="contained" onClick={handlePasswordChange}>
                    Change Password
                </Button>
            </Grid>

            {/* List of Played Games */}
            <Grid item xs={12}>
                <Typography variant="h5">Played Games</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Game ID</TableCell>
                                <TableCell>Game Name</TableCell>
                                <TableCell>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playedGames.map((game) => (
                                <TableRow key={game.id}>
                                    <TableCell>{game.id}</TableCell>
                                    <TableCell>{game.name}</TableCell>
                                    <TableCell>{game.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
            </Box>
        </div>
    );
};

export default UserManagement;

