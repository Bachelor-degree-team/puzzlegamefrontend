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
import background from "../Assets/game_page.jpg";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import {animate, motion, stagger, useAnimate} from 'framer-motion';


const Game = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const gameId = queryParameters.get("id")
    const databaseGameId = queryParameters.get("from")
    const session = queryParameters.get("session")

    const [counter, setCounter] = useState(0);
    const [isSending, setIsSending] = useState(false)
    const [sendRequest, setSendRequest] = useState(false);
    const [gameWonAfterDelay, setGameWonAfterDelay] = useState(false);

    const [gameWon, setGameWon] = useState(false);

    const [currentGuess, setCurrentGuess] = useState('')

    const [activeGame, setActiveGame] = useState({
        id: '',
        title: '',
        correctGuess: '',
        columns: [''],
        guesses: ['']
    })
    const increaseGuessCount = () => {
        setCounter(counter + 1);
    };

    const delay = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const [guessResult, setGuessResult] = useState<any>({
        [activeGame.columns[0]]: [''],
        [activeGame.columns[1]]: [''],
        [activeGame.columns[2]]: [''],
        [activeGame.columns[3]]: [''],
        [activeGame.columns[4]]: [''],
        game_won: ['']
    })

    const [guessResults, setGuessResults] = useState(
        [
            {
                [activeGame.columns[0]]: [''],
                [activeGame.columns[1]]: [''],
                [activeGame.columns[2]]: [''],
                [activeGame.columns[3]]: [''],
                [activeGame.columns[4]]: [''],
                game_won: ['']
            }
        ]
    )

    useEffect(() => {
        fetch("http://spring-api/game/active/get/" + gameId)
            .then(res => res.json())
            .then(result => {
                setActiveGame(result);
            })
    }, [])


    useEffect(() => {
        if (sendRequest) {
            fetch("http://spring-api/game/" + gameId + "/guess/" + currentGuess)
                .then(res => res.json())
                .then(result => {
                    const newList = guessResults.concat(result)
                    setGuessResults(newList);
                    setGuessResult(result);
                })
                .then(() =>
                    setSendRequest(false)
                )
                .then(() => {
                    increaseGuessCount();
                    console.log(counter);
                })
        }
    }, [sendRequest])

    useEffect(() => {
        async function gameWin() {
                await delay(2200);
                setGameWonAfterDelay(true)
        }

        if (guessResult.game_won[0]==='true') {
            fetch("http://spring-api/user/" + session + "/scores/" + databaseGameId + "/add/" + counter)
            gameWin();
        }

    }, [guessResult.game_won])


    const [scope, animate] = useAnimate();
    const animateOnClick = () => {
      animate([
          [".anim", { y: [-100, 0], opacity: [0, 1] }, {duration: 0.2, delay: stagger(0.5) }]
      ]);
    }

    const sendRequestTrue = useCallback(async () => {

        if (isSending) return

        setIsSending(true)

        setSendRequest(true)

        setIsSending(false)
    }, [isSending])

    const getSquares = () => {
        let content = [];
        const len = guessResults.length - 1
        for (let i = len; i >= 0; i--) {
            content.push(
                <div className="square-container">
                    <div className={"square " + (i===len ? "anim " : "") + (i===0 ? "hidden " : "") + (guessResults[i][activeGame.columns[0]] || [''] )[1] || ''}>{(guessResults[i][activeGame.columns[0]] || [''] )[0] || ''}</div>
                    <div className={"square " + (i===len ? "anim " : "") + (i===0 ? "hidden " : "") + (guessResults[i][activeGame.columns[1]] || [''] )[1] || ''}>{(guessResults[i][activeGame.columns[1]] || [''] )[0] || ''}</div>
                    <div className={"square " + (i===len ? "anim " : "") + (i===0 ? "hidden " : "") + (guessResults[i][activeGame.columns[2]] || [''] )[1] || ''}>{(guessResults[i][activeGame.columns[2]] || [''] )[0] || ''}</div>
                    <div className={"square " + (i===len ? "anim " : "") + (i===0 ? "hidden " : "") + (guessResults[i][activeGame.columns[3]] || [''] )[1] || ''}>{(guessResults[i][activeGame.columns[3]] || [''] )[0] || ''}</div>
                    <div className={"square " + (i===len ? "anim " : "") + (i===0 ? "hidden " : "") + (guessResults[i][activeGame.columns[4]] || [''] )[1] || ''}>{(guessResults[i][activeGame.columns[4]] || [''] )[0] || ''}</div>
                </div>
            );
        }
        return content;
    };

    return (
        <motion.div ref={scope} style={{ backgroundImage:`url('${background}')`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, height: `100vh`}}>
            <ButtonAppBar color={'#436aad'} session={session || ''}/>
            <motion.div className="container" initial={{ opacity: 0, y: -100}} animate={{ opacity: 1, y: 0}} transition={{duration: 1, delay: 0.2, ease: [0, 0.71, 0.2, 1.01]}}>
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

                    <Button variant="outlined" disabled={isSending} onClick={() => {
                        sendRequestTrue();
                        animateOnClick();
                    }}>Guess!</Button>
                </div>
                {gameWonAfterDelay? <AlertDialogSlide count={counter} session={session || ''} gameId={databaseGameId || ''}/> : <div/>}
                <table className="table-columns">
                    <thead>
                    <tr>
                        {activeGame.columns.map((item) => (
                            <th>{item}</th>
                        ))}
                    </tr>
                    </thead>
                </table>
                {
                    getSquares()
                }
            </motion.div>
        </motion.div>
    );
};

export default Game;
