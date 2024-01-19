import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Checkbox, createTheme, ThemeProvider} from '@mui/material';
import background from "../Assets/gameremove_page.jpg";
import {motion} from 'framer-motion';
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import "./RemoveUser.css"
import {Navigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {toast} from "react-toastify";

const RemoveUser = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const session = queryParameters.get("session")
    const userId = queryParameters.get("id")

    const [user, setUser] = useState(
        {
            id: '',
            login: '',
            numberOfGames: 0,
            isBlocked: false
        }
    );
    const [isAdmin, setIsAdmin] = useState(false);
    const [doRedirectHome, setDoRedirectHome] = useState(false);
    const [doRedirectHomeAfterDeletion, setDoRedirectHomeAfterDeletion] = useState(false);
    const [doRemove, setDoRemove] = useState(false);

    const notify_success_removed = () => toast.success("Removed successfully");

    useEffect(() => {
        fetch("http://localhost:8080/user/get/" + userId)
            .then(res => res.json())
            .then((res) => {
                setUser(res);
            })
    }, [userId])

    useEffect(() => {
        fetch("http://localhost:8080/user/isAdmin/" + session)
            .then(res => res.json())
            .then(result => {
                setIsAdmin(result);
            })
    }, [])

    useEffect(() => {
        if (doRemove) {
            fetch("http://localhost:8080/user/remove/" + userId)
                .then(res => res.json())
                .then(() => {
                    notify_success_removed();
                    setDoRedirectHomeAfterDeletion(true);
                })
        }
    }, [userId ,doRemove])

    const theme = createTheme({
        palette: {
            primary: {
                main:  '#a10000',
                contrastText : '#fff'
            },
            secondary: {
                main: '#a10000'
            }
        }
    });

    if (doRedirectHome) {
        return <Navigate to={"/usermanagement?session=" + session}/>
    }

    if (doRedirectHomeAfterDeletion && !isAdmin) {
        return <Navigate to={"/"} />
    }

    if (doRedirectHomeAfterDeletion && isAdmin) {
        return <Navigate to={"/adminpanel?session=" + session} />
    }

    return (
        <div style={{
            backgroundImage: `url('${background}')`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            height: `100vh`
        }}>
            <ButtonAppBar color={'#a10000'} session={session || ''}/>
            <motion.div className='container'
                        initial={{ opacity: 0, y: -100}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                <div className="header">
                    <div className="text-r">Remove Game</div>
                    <div className="underline-r"></div>
                </div>

                <div className="greeting">
                    <Typography variant="h4">Do you wish to remove the</Typography>
                    <Typography style={{marginLeft: '15px', marginRight: '15px'}} color={'#a10000'}
                                variant="h4">{" " + user.login}</Typography>
                    <Typography variant="h4"> account?</Typography>
                </div>
                <Typography variant="h4">{"All " + user.numberOfGames + " games associated will also be removed."}</Typography>
                <Typography variant="h4">This action cannot be undone.</Typography>
                <div className="greeting">
                    <ThemeProvider theme={theme}>
                        <Button variant="outlined" className="submit-a"
                                style={{fontSize: '20px', textTransform: 'none', marginTop: '20px', marginRight: '20px'}}
                                onClick={() => {
                                    setDoRedirectHome(true);
                                }}>
                            Cancel
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" className="submit-a"
                                style={{fontSize: '20px', textTransform: 'none', marginTop: '20px'}}
                                onClick={() => setDoRemove(true)}>
                            Remove
                        </Button>
                    </ThemeProvider>
                </div>

            </motion.div>
        </div>
    );
};

export default RemoveUser;

