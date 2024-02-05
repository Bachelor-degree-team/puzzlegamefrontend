import React, {useEffect, useState} from 'react';
import './GamePanel.css';
import {Navigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import background from "../Assets/game_page.jpg";
import {motion} from 'framer-motion';
import { host_back, host_front } from '../../Constants/global';

const GamePanel = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const gameId = queryParameters.get("id")
    const session = queryParameters.get("session")

    const [sendRequest, setSendRequest] = useState(false);
    const [activeGameId, setActiveGameId] = useState('');
    const [activeGameReady, setActiveGameReady] = useState(false);

    useEffect(() => {
        fetch(host_back + "/game/get/" + gameId)
            .then(res => res.json())
            .then(result => {
                setGame(result);
            })
    }, [])

    useEffect(() => {
        if (sendRequest) {
            fetch(host_back + "/game/" + gameId + "/play")
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
        return <Navigate to={"/game?id=" + activeGameId + "&from=" + gameId + "&session=" + session} />
    }

    return (
        <div style={{ backgroundImage:`url('${background}')`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, height: `100vh`}}>
            <ButtonAppBar color={'#436aad'} session={session || ''}/>
            <motion.div className="container"
                        initial={{ opacity: 0, y: -100}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                <Typography variant="h2" gutterBottom>
                    {game.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {game.description}
                </Typography>
                <Typography variant="h3" className="button-play" onClick={() => setSendRequest(true)}>PLAY</Typography>
            </motion.div>
        </div>
    );
};

export default GamePanel;
