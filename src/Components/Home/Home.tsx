import React, {useState} from 'react'
import './Home.css'
import logo from "../Assets/logo.svg"

const Home = () => {
    return(
        <div className="app-container">
            <img src={logo} alt="Logo" className="logo" />
            <div className="button-container">
                <button className="button">Example Game</button>
                <button className="button">Random Game</button>
                <button className="button">Search for a Game</button>
                <button className="corner-button">Login/SignUp</button>
            </div>
        </div>
    )
}

export default Home
