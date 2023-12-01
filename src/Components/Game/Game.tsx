import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import './Game.css';
import useParams from "react-router-dom";
import {Link} from "react-router-dom"; // Import the CSS file
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"
import './AlertDialogSlide'
import AlertDialogSlide from "./AlertDialogSlide";
import Rating from "@mui/material/Rating";
import {Autocomplete} from "@mui/material";
import Button from "@mui/material/Button";


const Game = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const gameId = queryParameters.get("id")

    const [isSending, setIsSending] = useState(false)
    const [sendRequest, setSendRequest] = useState(false);

    const [gameWon, setGameWon] = useState(false);

    const [currentGuess, setCurrentGuess] = useState('')

    const [activeGame, setActiveGame] = useState({
        id: '',
        title: '',
        correctGuess: '',
        columns: [''],
        guesses: ['']
    })

    const [guessResult, setGuessResult] = useState<any>({
        [activeGame.columns[0]]: [''],
        [activeGame.columns[1]]: [''],
        [activeGame.columns[2]]: [''],
        [activeGame.columns[3]]: [''],
        [activeGame.columns[4]]: ['']
    })

    useEffect(() => {
        fetch("http://localhost:8080/game/active/get/" + gameId)
            .then(res => res.json())
            .then(result => {
                setActiveGame(result);
            })
    }, [])


    useEffect(() => {
        if (sendRequest) {
            fetch("http://localhost:8080/game/" + gameId + "/guess/" + currentGuess)
                .then(res => res.json())
                .then(result => {
                    setGuessResult(result);
                })
                .then(() =>
                    setSendRequest(false)
                )
        }
    }, [sendRequest])


    const str = Object.values(guessResult)[0]

    const sendRequestTrue = useCallback(async () => {

        if (isSending) return

        setIsSending(true)

        setSendRequest(true)

        setIsSending(false)
    }, [isSending])

    return (
        <div className="container">
            <Typography variant="h2" gutterBottom>
                {activeGame.title}
            </Typography>

            <div className="search-container">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={activeGame.guesses}
                    sx={{width: 300}}
                    onChange={(event, value) => setCurrentGuess(value || '')}
                    renderInput={(params) => <TextField {...params} label="Guess"/>}
                />

                <Button variant="outlined" disabled={isSending} onClick={sendRequestTrue}>Guess!</Button>
            </div>

            <table className="table-columns">
                <thead>
                <tr>
                    {activeGame.columns.map((item) => (
                        <th>{item}</th>
                    ))}
                </tr>
                </thead>
            </table>

            <div className="square-container">
                <div className={"square " + (guessResult[activeGame.columns[0]] || [''] )[1] || ''}>{(guessResult[activeGame.columns[0]] || [''] )[0] || ''}</div>
                <div className={"square " + (guessResult[activeGame.columns[1]] || [''] )[1] || ''}>{(guessResult[activeGame.columns[1]] || [''] )[0] || ''}</div>
                <div className={"square " + (guessResult[activeGame.columns[2]] || [''] )[1] || ''}>{(guessResult[activeGame.columns[2]] || [''] )[0] || ''}</div>
                <div className={"square " + (guessResult[activeGame.columns[3]] || [''] )[1] || ''}>{(guessResult[activeGame.columns[3]] || [''] )[0] || ''}</div>
                <div className={"square " + (guessResult[activeGame.columns[4]] || [''] )[1] || ''}>{(guessResult[activeGame.columns[4]] || [''] )[0] || ''}</div>
            </div>
        </div>
    );
};

export default Game;
