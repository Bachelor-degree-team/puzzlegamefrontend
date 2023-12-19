import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Checkbox, createTheme, ThemeProvider} from '@mui/material';
import background from "../Assets/gameadd_page.jpg";
import {motion} from 'framer-motion';
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import "./AddGame.css"
import {Navigate} from "react-router-dom";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import password_bad_icon from "../Assets/password-bad.png";
import Typography from "@mui/material/Typography";
import {toast} from "react-toastify";

const AddGame = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const session = queryParameters.get("session")

    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[isPublic, setIsPublic] = useState(true)
    const[selectedFile, setSelectedFile] = useState('')
    const [doRedirectHome, setDoRedirectHome] = useState(false);
    const [doSubmit, setDoSubmit] = useState(false);
    const [user, setUser] = useState({
        login: '',
        scores: [['']]
    });

    const notify_success_added = () => toast.success("Successfully added a game!");

    useEffect(() => {
        fetch("/user/logged/" + session)
            .then(res => res.json())
            .then(result => {
                setUser(result);
            })
    }, [])

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDesc = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handlePublic = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPublic(e.target.checked)
        console.log(e.target.checked)
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setSelectedFile(e.target.files[0])
    };

    const theme = createTheme({
        palette: {
            primary: {
                main:  '#6eabc7',
                contrastText : '#fff'
            },
            secondary: {
                main: '#6eabc7'
            }
        }
    });

    useEffect(() => {
        if (doSubmit) {
            const formData = new FormData();
            formData.append('csv', selectedFile);
            formData.append('separator', ',');
            formData.append('isPublic', String(isPublic));
            formData.append('title', title);
            formData.append('desc', description);
            formData.append('session', session || '');
            fetch("/game/create", {
                method: 'POST',
                body: formData
            })
                .then(res => res.text())
                .then(result => {
                    if (result.length > 1) {
                        notify_success_added();
                        setDoRedirectHome(true);
                    }
                })
        }
    }, [doSubmit])

    if (doRedirectHome) {
        return <Navigate to={"/usermanagement?session=" + session}/>
    }

    return (
        <div style={{
            backgroundImage: `url('${background}')`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            height: `100vh`
        }}>
            <ButtonAppBar color={'#6eabc7'} session={session || ''}/>
            <motion.div className='container'
                        initial={{ opacity: 0, y: -100}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                <div className="header">
                    <div className="text-a">Add Game</div>
                    <div className="underline-a"></div>
                </div>

                <div className="inputs">
                    <div className="input">
                        <input type="name" placeholder="Title" value={title} onChange={(e) => handleTitle(e)}/>
                    </div>
                    <div className="input">
                        <input type="name" placeholder="Description" value={description} onChange={(e) => handleDesc(e)}/>
                    </div>
                </div>

                <div className="checkboxer">
                    <Typography className="textb" variant={"h6"}>Public</Typography>
                    <Checkbox defaultChecked value={isPublic} onChange={(e) => handlePublic(e)}/>
                </div>

                <input type="file" onChange={(e) => onFileChange(e)}/>

                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="submit-a"
                            style={{fontSize: '20px', textTransform: 'none'}}
                            onClick={() => setDoSubmit(true)}>
                        Submit
                    </Button>
                </ThemeProvider>
            </motion.div>
        </div>
    );
};

export default AddGame;

