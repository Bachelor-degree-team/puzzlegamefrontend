import React, {useState} from 'react'
import './Home.css'
import logo from "../Assets/logo.svg"
import background from '../Assets/landing_page.jpg'
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material";

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
    return(

        <>
            <div className="spacing-container">

            </div>
            <div className="button-container1">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="button" style={{ fontSize: '20px', textTransform: 'none' }}>Example Game</Button>
                </ThemeProvider>
            </div>
            <div className="button-container2">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="button" style={{ fontSize: '20px', textTransform: 'none' }}>Random Game</Button>
                </ThemeProvider>
            </div>
            <div className="button-container3">
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="button" style={{ fontSize: '20px', textTransform: 'none' }}>Game Search</Button>
                </ThemeProvider>
            </div>{/*<Link to="/game" className="button">Example Game</Link>*/}
            {/*<Link to="/game" className="button">Random Game</Link>*/}
            {/*<Link to="/search" className="button">Search for a Game</Link>*/}

        </>



    )
}

export default Home
