import React, {useEffect, useState} from 'react'
import './Home.css'
import logo from "../Assets/logo.png"
import background from '../Assets/landing_page.jpg'
import {Link, Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material";
import { motion } from "framer-motion"
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";

const theme = createTheme({
    palette: {
        primary: {
           main:  '#3eb8b4',
           contrastText : '#fff'
        },
        secondary: {
            main: '#3eb8b4'
        }
    }
});

const Home = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const session = queryParameters.get("session")

    const [helpMessage1, setHelpMessage1] = useState('');
    const [helpMessage2, setHelpMessage2] = useState('');
    const [helpMessage3, setHelpMessage3] = useState('');
    const [navExample, setNavExample] = useState(false);
    const [navRandom, setNavRandom] = useState(false);
    const [navSearch, setNavSearch] = useState(false);

    const setHelpExampleGame = () => {
        setHelpMessage1('New to the platform? Try out an entry level game');
        setHelpMessage2('with hints to guide you through the journey!');
        setHelpMessage3('');
    }

    const setHelpRandomGame = () => {
        setHelpMessage1('No particular fancy? Try your luck with a random game!');
        setHelpMessage2('It will pick out and initiate a random game out of');
        setHelpMessage3('all publicly listed games.');
    }

    const setHelpSearchGame = () => {
        setHelpMessage1('Care to pick out the finest, all by yourself?');
        setHelpMessage2('Jump into the search page and play');
        setHelpMessage3('what suits you most!');
    }

    const clearHelpMessage = () => {
        setHelpMessage1('');
        setHelpMessage2('');
        setHelpMessage3('');
    }

    const navigateExample = () => {
        setNavExample(true)
    }

    const navigateRandom = () => {
        setNavRandom(true)
    }

    const navigateSearch = () => {
        setNavSearch(true)
    }

    if (navExample) {
        return <Navigate to={"/search?session=" + session} />
    }

    if (navRandom) {
        return <Navigate to={"/search?session=" + session} />
    }

    if (navSearch) {
        return <Navigate to={"/search?session=" + session} />
    }

    return(

        <div style={{ backgroundImage:`url('${background}')`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, height: `100vh`}}>
            <ButtonAppBar color={'#3eb8b4'} session={session || ''}/>
            <h1 className='header-landing'>
                {helpMessage1} <br/>
                {helpMessage2} <br/>
                {helpMessage3}
            </h1>
            <motion.img src={logo} className='logo'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
            </motion.img>
            <motion.div className="button-container1"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="button" onClick={ () => navigateExample() } onMouseEnter={ () => setHelpExampleGame() } onMouseLeave={ () => clearHelpMessage() } style={{ fontSize: '20px', textTransform: 'none' }}>Example Game</Button>
                </ThemeProvider>
            </motion.div>

            <motion.div className="button-container2"
                initial={{ opacity: 0, x: 100}}
                animate={{ opacity: 1, x: 0}}
                transition={{
                    duration: 1,
                    delay: 1,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="button" onClick={ () => navigateRandom() } onMouseEnter={ () => setHelpRandomGame() } onMouseLeave={ () => clearHelpMessage() } style={{ fontSize: '20px', textTransform: 'none' }}>Random Game</Button>
                </ThemeProvider>
            </motion.div>

            <motion.div className="button-container3"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 1.4,
                    delay: 1.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="button" onClick={ () => navigateSearch() } onMouseEnter={ () => setHelpSearchGame() } onMouseLeave={ () => clearHelpMessage() } style={{ fontSize: '20px', textTransform: 'none' }}>Game Search</Button>
                </ThemeProvider>
            </motion.div>
        </div>

    )
}

export default Home
