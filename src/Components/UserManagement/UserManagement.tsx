import React, {useEffect, useState} from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box, createTheme, ThemeProvider
} from '@mui/material';
import './UserManagement.css'
import background from "../Assets/management_page.jpg";
import {motion} from 'framer-motion';
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

const UserManagement = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const session = queryParameters.get("session")

    const [doLogout, setDoLogout] = useState(false);
    const [doAddGame, setDoAddGame] = useState(false);
    const [doRedirectHome, setDoRedirectHome] = useState(false);
    const [user, setUser] = useState({
        login: '',
        scores: [['']]
    });

    const [gameList, setGameList] = useState(
        [{
            name: '',
            isPublic: false,
            rating: 0
        }]
    );


    const notify_success_logout = () => toast.success("Successfully logged out!");


    useEffect(() => {
        fetch("http://localhost:8080/user/logged/" + session)
            .then(res => res.json())
            .then(result => {
                setUser(result);
            })
    }, [])

    useEffect(() => {
        if (user.login != undefined && user.login.length > 0) {
            fetch("http://localhost:8080/game/" + user.login + "/list")
                .then(res => res.json())
                .then(result => {
                    setGameList(result);
                })
        }
    }, [user])

    useEffect(() => {
        if (doLogout) {
            fetch("http://localhost:8080/session/remove/" + session)
                .then(res => res.json())
                .then(result => {
                    setUser(result);
                })
                .then(() => notify_success_logout())
                .then(() => setDoRedirectHome(true))
        }
    }, [doLogout])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#b82248',
                contrastText: '#fff'
            },
            secondary: {
                main: '#b82248'
            }
        }
    });

    if (doRedirectHome) {
        return <Navigate to={"/"}/>
    }

    if (doAddGame) {
        return <Navigate to={"/addgame?session=" + session}/>
    }

    return (
        <div style={{
            backgroundImage: `url('${background}')`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            height: `100vh`
        }}>
            <ButtonAppBar color={'#b82248'} session={session || ''}/>
            <motion.div className='container'
                        initial={{opacity: 0, y: -100}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                <div className="header">
                    <div className="text-m">My Account</div>
                    <div className="underline-m"></div>
                </div>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="greeting">
                                <Typography variant="h4">Hi</Typography>
                                <Typography style={{marginLeft: '15px'}} color={'#b82248'}
                                            variant="h4">{" " + user.login}</Typography>
                                <Typography variant="h4">!</Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" className="logout"
                                        style={{fontSize: '20px', textTransform: 'none'}}
                                        onClick={() => setDoLogout(true)}>
                                    Log out
                                </Button>
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" className="logout"
                                        style={{fontSize: '20px', textTransform: 'none'}}
                                        onClick={() => setDoAddGame(true)}>
                                    Add Games
                                </Button>
                            </ThemeProvider>
                        </Grid>

                        {gameList != undefined ?
                            <Grid item xs={12}>
                                <Typography style={{marginBottom: '10px'}} variant="h4">My Games</Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Game Name</TableCell>
                                                <TableCell>Rating</TableCell>
                                                <TableCell>Public</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {gameList.map((game) => (
                                                <TableRow>
                                                    <TableCell>{game.name}</TableCell>
                                                    <TableCell>{game.rating}</TableCell>
                                                    <TableCell>{game.isPublic ? "Yes" : "No"}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid> :
                            <div></div>
                        }
                        <Grid item xs={12}>
                            <Typography style={{marginBottom: '10px'}} variant="h4">Game History</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Game Name</TableCell>
                                            <TableCell>Score</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.scores.map((score) => (
                                            <TableRow>
                                                <TableCell>{score[0]}</TableCell>
                                                <TableCell>{score[1]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </div>
    );
};

export default UserManagement;

