import './AdminPanel.css';import React from 'react';
import { AppBar, Tab, Tabs, Typography, Box, Paper, Button } from '@mui/material';

// Sample data for users and games (replace this with your actual data)
const users = [
    { id: 1, username: 'user1', blocked: false },
    { id: 2, username: 'user2', blocked: true },
    // Add more users as needed
];

const games = [
    { id: 1, name: 'Game 1' },
    { id: 2, name: 'Game 2' },
    // Add more games as needed
];

const AdminPanel = () => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleBlockUser = (userId: number) => {
        // Toggle the block status of the user (For demo purposes, update state directly)
        const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, blocked: !user.blocked } : user
        );
        // Replace this with your actual logic to update user block status
        console.log(`User with ID ${userId} blocked/unblocked`);
        console.log(updatedUsers); // Updated user list
    };

    const renderUsersTab = () => (
        <Paper>
            <Typography variant="h5">List of Users</Typography>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.blocked ? 'Blocked' : 'Active'}
                        <Button onClick={() => handleBlockUser(user.id)}>
                            {user.blocked ? 'Unblock' : 'Block'}
                        </Button>
                    </li>
                ))}
            </ul>
        </Paper>
    );

    const renderGamesTab = () => (
        <Paper>
            <Typography variant="h5">List of Games</Typography>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </Paper>
    );

    const renderTabContent = (index: number) => {
        switch (index) {
            case 0:
                return renderUsersTab();
            case 1:
                return renderGamesTab();
            default:
                return null;
        }
    };

    return (
        <div className='container'>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Users" />
                    <Tab label="Games" />
                </Tabs>
            </AppBar>
            {renderTabContent(tabValue)}
        </Box>
        </div>
    );
};

export default AdminPanel;
