import React from 'react';
import './Game.css';
import {Link} from "react-router-dom"; // Import the CSS file

const Game = () => {
    return (
        <div className="container">
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-bar" />
            </div>
            <div className="square-container">
                <div className="square green">MATCH</div>
                <div className="square red">No MATCH</div>
                <div className="square orange">PARTIAL MATCH</div>
                <div className="square red">LOWER</div>
                <div className="square red">HIGHER</div>
            </div>
            <Link to="/" className="corner-button">Home</Link>
        </div>
    );
};

export default Game;
