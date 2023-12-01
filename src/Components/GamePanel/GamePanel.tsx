import React, {useEffect, useState} from 'react';
import './GamePanel.css';
import useParams, {Navigate} from "react-router-dom";
import {Link} from "react-router-dom"; // Import the CSS file
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"

const GamePanel = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const gameId = queryParameters.get("id")
    const [sendRequest, setSendRequest] = useState(false);
    const [activeGameId, setActiveGameId] = useState('');
    const [activeGameReady, setActiveGameReady] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/game/get/" + gameId)
            .then(res => res.json())
            .then(result => {
                setGame(result);
            })
    }, [])

    useEffect(() => {
        if (sendRequest) {
            fetch("http://localhost:8080/game/" + gameId + "/play")
                .then(res => res.text())
                .then(result => {
                    setActiveGameId(result);
                })
                .then(() => {
                    setActiveGameReady(true)
                })
        }
    }, [sendRequest]);

    const [game, setGame] = useState({
        id: '',
        title: '',
        description: '',
        rating: 0.0,
    })

    if (activeGameReady) {
        return <Navigate to={"/game?id=" + activeGameId} />
    }

    return (
        <div className="container">
            <Typography variant="h2" gutterBottom>
                {game.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {game.description}
            </Typography>
            <Typography variant="h3" className="button-play" onClick={() => setSendRequest(true)}>PLAY</Typography>
        </div>
    );
};

export default GamePanel;
