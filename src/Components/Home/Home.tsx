import React, {useState} from 'react'
import './Home.css'
import logo from "../Assets/logo.svg"
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div className="app-container">
            <img src={logo} alt="Logo" className="logo" />
            <div className="button-container">
                <Link to="/game" className="button">Example Game</Link>
                <Link to="/game" className="button">Random Game</Link>
                <Link to="/searchtablecomponent" className="button">Search for a Game</Link>
                <Link to="/loginsignup" className="corner-button">Login/SignUp</Link>
            </div>
        </div>
    )
}

export default Home
