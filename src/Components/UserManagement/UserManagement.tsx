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
    const [isAdmin, setIsAdmin] = useState(false);
    const [doShareGame, setDoShareGame] = useState({
        doShare: false,
        gameId: ''
    });
    const [doRemoveGame, setDoRemoveGame] = useState({
        doRemove: false,
        gameId: ''
    });
    const [doChangeVisible, setDoChangeVisible] = useState({
        doChange: false,
        gameId: ''
    });
    const [doRemoveUser, setDoRemoveUser] = useState({
        doRemove: false,
        userId: ''
    });

    const [doRedirectHome, setDoRedirectHome] = useState(false);
    const [doRedirectAdmin, setDoRedirectAdmin] = useState(false);
    const [user, setUser] = useState({
        id: '',
        login: '',
        scores: [['']]
    });

    const [scores, setScores] = useState(
        [{
            title: '',
            score: 0,
            id: ''
        }]
    );

    const [gameList, setGameList] = useState(
        [{
            id: '',
            name: '',
            isPublic: false,
            rating: 0
        }]
    );

    const notify_success_logout = () => toast.success("Successfully logged out!");
    const notify_success_visible = () => toast.success("Visibility changed successfully!");
    const notify_success_linkcopy = () => toast.success("Link copied to clipboard!");


    useEffect(() => {
        fetch("http://localhost:8080/user/logged/" + session)
            .then(res => res.json())
            .then(result => {
                setUser(result);
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/user/isAdmin/" + session)
            .then(res => res.json())
            .then(result => {
                setIsAdmin(result);
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/user/" + session + "/scores/get")
            .then(res => res.json())
            .then(result => {
                setScores(result);
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
    }, [user, doChangeVisible])

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

    useEffect(() => {
        if (doChangeVisible.doChange) {
            fetch("http://localhost:8080/game/visibility/" + doChangeVisible.gameId)
                .then(res => res.json())
                .then(() => {
                    notify_success_visible();
                    setDoChangeVisible({doChange: false, gameId: ''});
                })
        }
    }, [doChangeVisible])

    useEffect(() => {
        if (doShareGame.doShare) {
            navigator.clipboard.writeText('http://localhost:3000/gamepanel?id=' + doShareGame.gameId)
            notify_success_linkcopy()
            setDoShareGame({doShare: false, gameId: ''})
        }
    }, [doShareGame])

    const theme = createTheme({
        palette: {
            primary: {
                main: '#b82248',
                contrastText: '#fff'
            },
            secondary: {
                main: '#b82248'
            },
            error: {
                main: '#a10000'
            }
        }
    });
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

    if (doRedirectHome) {
        return <Navigate to={"/"}/>
    }

    if (doRedirectAdmin) {
        return <Navigate to={"/adminpanel?session=" + session}/>
    }

    if (doAddGame) {
        return <Navigate to={"/addgame?session=" + session}/>
    }

    if (doRemoveGame.doRemove) {
        return <Navigate to={"/removegame?session=" + session + "&id=" + doRemoveGame.gameId}/>
    }

    if (doRemoveUser.doRemove) {
        return <Navigate to={"/removeuser?session=" + session + "&id=" + doRemoveUser.userId}/>
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
                        {isAdmin ?
                            <Grid item xs={12}>
                                <ThemeProvider theme={theme}>
                                    <Button variant="contained" className="logout"
                                            style={{fontSize: '20px', textTransform: 'none'}}
                                            onClick={() => setDoRedirectAdmin(true)}>
                                        Admin Panel
                                    </Button>
                                </ThemeProvider>
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <ThemeProvider theme={themeError}>
                                    <Button variant="contained" className="logout"
                                            style={{fontSize: '20px', textTransform: 'none'}}
                                            onClick={() => setDoRemoveUser({doRemove: true, userId: user.id})}>
                                        Delete Account
                                    </Button>
                                </ThemeProvider>
                            </Grid>
                        }
                        {gameList !== undefined ?
                            <Grid item xs={12}>
                                <Typography style={{marginBottom: '10px'}} variant="h4">My Games</Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Game Name</TableCell>
                                                <TableCell>Rating</TableCell>
                                                <TableCell>Public</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {gameList.map((game) => (
                                                <TableRow>
                                                    <TableCell><a className="gamelink"
                                                                  href={"http://localhost:3000/gamepanel?id=" + game.id + "&session=" + session}
                                                                  target="_blank" rel="noopener noreferrer">
                                                        {game.name}
                                                    </a></TableCell>
                                                    <TableCell>{game.rating}</TableCell>
                                                    <TableCell>{game.isPublic ? "Yes" : "No"}</TableCell>
                                                    <TableCell width={350}>
                                                        <ThemeProvider theme={theme}>
                                                            <Button variant="contained"
                                                                    style={{fontSize: '15px', textTransform: 'none', marginRight: '10px'}}
                                                                    onClick={() => setDoShareGame({doShare: true, gameId: game.id})}>
                                                                Share Link
                                                            </Button>
                                                        </ThemeProvider>
                                                        <ThemeProvider theme={theme}>
                                                            <Button variant="contained"
                                                                    style={{fontSize: '15px', textTransform: 'none', marginRight: '10px'}}
                                                                    onClick={() => setDoChangeVisible({doChange: true, gameId: game.id})}>
                                                                {game.isPublic ? 'Set Private' : 'Set Public'}
                                                            </Button>
                                                        </ThemeProvider>
                                                        <ThemeProvider theme={themeError}>
                                                            <Button variant="contained"
                                                                    style={{fontSize: '15px', textTransform: 'none'}}
                                                                    onClick={() => setDoRemoveGame({doRemove: true, gameId: game.id})}>
                                                                Delete
                                                            </Button>
                                                        </ThemeProvider>
                                                    </TableCell>
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
                                        {scores.map((score) => (
                                            <TableRow>
                                                <TableCell><a className="gamelink"
                                                              href={"http://localhost:3000/gamepanel?id=" + score.id + "&session=" + session}
                                                              target="_blank" rel="noopener noreferrer">
                                                    {score.title}
                                                </a></TableCell>
                                                <TableCell>
                                                    {score.score}
                                                </TableCell>
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

