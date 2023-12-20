import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Rating from "@mui/material/Rating";
import {toast} from "react-toastify";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({count, gameId, session}: { count: number, gameId: string, session: string }) {
    const [open, setOpen] = useState(true);
    const [rate, setRate] = useState(false);
    const [rateSubmit, setRateSubmit] = useState(false);
    const [exitHome, setExitHome] = useState(false);
    const [value, setValue] = useState<number | null>(3);

    const {width, height} = useWindowSize()
    const handleClose = () => {
        setOpen(false);
        setExitHome(true);
    };

    console.log(session)

    const notify_success_rate = () => toast.success("Rated successfully!");

    const handleRate = () => {
        if (!rate) {
            setRate(true);
            return;
        } else {
            setRateSubmit(true);
        }
    };

    useEffect(() => {
        if(rateSubmit) {
            fetch("http://34.16.197.214/game/" + gameId + "/ratings/" + session + "/rate/" + value)
                .then(res => res.text())
                .then(() => {
                    notify_success_rate()
                    setExitHome(true);
                })
        }
    }, [rateSubmit])

    if (exitHome) {
        return <Navigate to={session === '' || session == undefined || session=='null' ? "/" : ("/?session=" + (session || ''))}/>
    }

    return (

        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{justifyContent: "center"}}
            >
                <DialogTitle>{"You have won!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You have managed to win in {count} guesses!
                    </DialogContentText>
                    {rate ? <Rating defaultValue={0} precision={0.5} onChange={(event, newValue) => {
                        setValue(newValue);
                    }}/> : <div/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Great!!!</Button>
                    <Button disabled={session==='' || session==undefined || session=='null'} onClick={handleRate}>{rate ? 'Submit' : 'Rate this game'}</Button>
                </DialogActions>
            </Dialog>
            <Confetti
                width={width}
                height={height}
            />
        </React.Fragment>
    );
}