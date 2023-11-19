import React from 'react';
import './Game.css';
import {Link} from "react-router-dom"; // Import the CSS file
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"
import './AlertDialogSlide'
import AlertDialogSlide from "./AlertDialogSlide";

const Game = () => {
    return (
        <div className="container">
            <Typography variant="h1" gutterBottom>
                Title
            </Typography>
            <TextField id="outlined-basic" label="Search..." variant="outlined" />
            <AlertDialogSlide/>
            <div className="square-container">
                <div className="square green">MATCH</div>
                <div className="square red">No MATCH</div>
                <div className="square orange">PARTIAL MATCH</div>
                <div className="square red">LOWER</div>
                <div className="square red">HIGHER</div>
            </div>
        </div>
    );
};

export default Game;
