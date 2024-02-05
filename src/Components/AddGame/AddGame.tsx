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
import {host_back} from "../../Constants/global";

const AddGame = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const session = queryParameters.get("session")

    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[isPublic, setIsPublic] = useState(true)
    const[isRak, setIsRak] = useState(false)
    const[selectedFile, setSelectedFile] = useState('')
    const [doRedirectHome, setDoRedirectHome] = useState(false);
    const [doSubmit, setDoSubmit] = useState(false);
    const [doCheck, setDoCheck] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);
    const [user, setUser] = useState({
        login: '',
        scores: [['']]
    });
    const [fileCheckResult, setFileCheckResult] = useState<any>({
        foul_language: false,
        same_size_rows: false,
        same_type_columns: false,
        all_string_first_row: false,
        minimum_5: false,
        maximum_1000: false,
        all_fields_checked: false
    })

    const notify_success_added = () => toast.success("Successfully added a game!");

    useEffect(() => {
        fetch(host_back + "/user/logged/" + session)
            .then(res => res.json())
            .then(result => {
                setUser(result);
            })
    }, [])

    useEffect(() => {
        if (doCheck) {
            const formData = new FormData();
            formData.append('csv', selectedFile);
            formData.append('separator', isRak ? ';' : ',');
            fetch(host_back + "/file/check", {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    setFileCheckResult(result);
                })
                .then(() => {
                    setDoCheck(false);
                })
        }
    }, [doCheck])

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        console.log(title)
    }

    const handleDesc = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
        console.log(description)
    }

    const isNotAllProper = () => {
        return !((title.length >= 5) && (title.length <= 50) && (description.length >= 20) && (description.length <= 1000) && fileCheckResult.all_fields_checked)
    }

    const isNotFileUploaded = () => {
        return selectedFile===''
    }

    const handlePublic = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPublic(e.target.checked)
        console.log(e.target.checked)
    }

    const handleRak = (e: ChangeEvent<HTMLInputElement>) => {
        setIsRak(e.target.checked)
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
            formData.append('separator', isRak ? ';' : ',');
            formData.append('isPublic', String(isPublic));
            formData.append('title', title);
            formData.append('desc', description);
            formData.append('session', session || '');
            fetch(host_back + "/game/create", {
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
                        <input type="name" placeholder="Title (5 or more characters, 50 max)" value={title} onChange={(e) => handleTitle(e)}/>
                    </div>
                    <div className="input">
                        <input type="name" placeholder="Description (20 or more characters, 1000 max)" value={description} onChange={(e) => handleDesc(e)}/>
                    </div>
                </div>

                <div className="checkboxer">
                    <Typography className="textb" variant={"h6"}>Public</Typography>
                    <Checkbox defaultChecked value={isPublic} onChange={(e) => handlePublic(e)}/>
                </div>

                <div className="checkboxer">
                    <Typography className="textb" variant={"h6"}>Use .rak file (lists possible)</Typography>
                    <Checkbox value={isRak} onChange={(e) => handleRak(e)}/>
                </div>

                <input type="file" className="filechange" onChange={(e) => onFileChange(e)}/>
                    <div className="square-result">
                        <div className="result-input">The file must contain at least 5 entries {hasChecked ? fileCheckResult.minimum_5 ? "✔️" : "❌" : ""}</div>
                        <div className="result-input">The file must contain at most 1000 entries {hasChecked ? fileCheckResult.maximum_1000 ? "✔️" : "❌" : ""}</div>
                        <div className="result-input">The header row must have no numeric values {hasChecked ? fileCheckResult.all_string_first_row ? "✔️" : "❌" : ""}</div>
                        <div className="result-input">All rows must have the same number of entries {hasChecked ? fileCheckResult.same_size_rows ? "✔️" : "❌" : ""}</div>
                        <div className="result-input">All columns must be of the same type {hasChecked ? fileCheckResult.same_type_columns ? "✔️" : "❌" : ""}</div>
                        <div className="result-input">No foul language must be detected {hasChecked ? fileCheckResult.foul_language ? "✔️" : "❌" : ""}</div>
                    </div>
                <ThemeProvider theme={theme}>
                    <Button variant="outlined" className="submit-a"
                            disabled={isNotFileUploaded()}
                            style={{fontSize: '20px', textTransform: 'none', marginTop: '10px'}}
                            onClick={() => {
                               setDoCheck(true);
                               setHasChecked(true);
                            }}>
                        Check file (required)
                    </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" className="submit-a"
                            disabled={isNotAllProper()}
                            style={{fontSize: '20px', textTransform: 'none', marginTop: '10px'}}
                            onClick={() => setDoSubmit(true)}>
                        Submit
                    </Button>
                </ThemeProvider>
            </motion.div>
        </div>
    );
};

export default AddGame;

