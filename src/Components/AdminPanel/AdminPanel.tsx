import './AdminPanel.css';import React, {useEffect, useState} from 'react';
import {AppBar, Tab, Tabs, Typography, Box, Paper, Button, ThemeProvider, createTheme} from '@mui/material';
import background from "../Assets/adminpanel_page.jpg";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import {motion} from "framer-motion";
import Rating from "@mui/material/Rating";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";
import {host_back, host_front} from "../../Constants/global";

const AdminPanel = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const session = queryParameters.get("session")

    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermUser, setSearchTermUser] = useState('');
    const [games, setGames] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [doRemoveGame, setDoRemoveGame] = useState({
        doRemove: false,
        gameId: ''
    });
    const [doBlockUser, setDoBlockUser] = useState({
        doBlock: false,
        userId: ''
    });
    const [doUnblockUser, setDoUnblockUser] = useState({
        doUnblock: false,
        userId: ''
    });
    const [doRemoveUser, setDoRemoveUser] = useState({
        doRemove: false,
        userId: ''
    });

    const notify_success_block = () => toast.success("User blocked successfully!");
    const notify_success_unblock = () => toast.success("User unblocked successfully!");
    const notify_success_removeuser = () => toast.success("User removed successfully!");

    const themeError = createTheme({
        palette: {
            primary: {
                main: '#a10000',
                contrastText: '#fff'
            },
            secondary: {
                main: '#a10000'
            }
        }
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: '#2e2e2e',
                contrastText: '#fff'
            },
            secondary: {
                main: '#2e2e2e'
            }
        }
    });

    useEffect(() => {
        fetch(host_back + "/game/admin/getAll")
            .then(res => res.json())
            .then(result => {
                setGames(result);
            })
    }, [])

    useEffect(() => {
        fetch(host_back + "/user/getAll")
            .then(res => res.json())
            .then(result => {
                setUsers(result);
            })
    }, [doUnblockUser, doBlockUser])

    useEffect(() => {
        if (doBlockUser.doBlock) {
            fetch(host_back + "/user/" + doBlockUser.userId + "/block/true")
                .then(res => res.text())
                .then(result => {
                    setDoBlockUser({doBlock: false, userId: ''})
                    notify_success_block()
                })
        }
    }, [doBlockUser])

    useEffect(() => {
        if (doUnblockUser.doUnblock) {
            fetch(host_back + "/user/" + doUnblockUser.userId + "/block/false")
                .then(res => res.text())
                .then(() => {
                    setDoUnblockUser({doUnblock: false, userId: ''})
                    notify_success_unblock();
                })
        }
    }, [doUnblockUser])

    const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchUser = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTermUser(event.target.value);
    };

    const filteredData = games.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDataUsers = users.filter((item) =>
        item.login.toLowerCase().includes(searchTermUser.toLowerCase())
    );



    if (doRemoveGame.doRemove) {
        return <Navigate to={"/removegame?session=" + session + "&id=" + doRemoveGame.gameId}/>
    }

    if (doRemoveUser.doRemove) {
        return <Navigate to={"/removeuser?session=" + session + "&id=" + doRemoveUser.userId}/>
    }

    return (
        <div style={{ backgroundImage:`url('${background}')`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, height: `100vh`}}>
            <ButtonAppBar color={'#2e2e2e'} session={session || ''}/>
            <motion.div className="container"
                        initial={{ opacity: 0, y: -100}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                <div className="header">
                    <div className="text-ad">Manage Games</div>
                    <div className="underline-ad"></div>
                </div>
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <table className="table">
                    <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Rating name="read-only" defaultValue={item.rating} precision={0.5} readOnly/>
                            </td>
                            <td>
                                <a className="gamelink" href={host_front + "/gamepanel?id=" + item.id + "&session=" + session} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </td>
                            <td>
                                <ThemeProvider theme={themeError}>
                                    <Button variant="contained"
                                            style={{fontSize: '15px', textTransform: 'none'}}
                                            onClick={() => setDoRemoveGame({doRemove: true, gameId: item.id})}>
                                        Delete
                                    </Button>
                                </ThemeProvider>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="header">
                    <div className="text-ad">Manage Users</div>
                    <div className="underline-ad"></div>
                </div>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTermUser}
                    onChange={handleSearchUser}
                    className="search-bar"
                />
                <table className="table">
                    <thead>
                    <tr>
                        <th>Login</th>
                        <th>Number of games</th>
                        <th>Blocked</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredDataUsers.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Typography>{item.login}</Typography>
                            </td>
                            <td>
                                <Typography>{item.numberOfGames}</Typography>
                            </td>
                            <td>
                                <Typography>{item.isBlocked ? "Yes" : "No"}</Typography>
                            </td>
                            <td>
                                <ThemeProvider theme={theme}>
                                    <Button variant="contained" disabled={!(item.isBlocked)}
                                            style={{fontSize: '15px', textTransform: 'none', marginRight: '10px'}}
                                            onClick={() => setDoUnblockUser({doUnblock: true, userId: item.id})}>
                                        Unblock
                                    </Button>
                                </ThemeProvider>
                                <ThemeProvider theme={theme}>
                                    <Button variant="contained" disabled={item.isBlocked}
                                            style={{fontSize: '15px', textTransform: 'none', marginRight: '10px'}}
                                            onClick={() => setDoBlockUser({doBlock: true, userId: item.id})}>
                                        Block
                                    </Button>
                                </ThemeProvider>
                                <ThemeProvider theme={themeError}>
                                    <Button variant="contained" disabled={!(item.isBlocked)}
                                            style={{fontSize: '15px', textTransform: 'none'}}
                                            onClick={() => setDoRemoveUser({doRemove: true, userId: item.id})}>
                                        Delete
                                    </Button>
                                </ThemeProvider>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default AdminPanel;
