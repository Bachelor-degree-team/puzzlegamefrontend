import React, {ChangeEvent, useEffect, useState} from 'react'
import './LoginSignup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'
import password_bad_icon from '../Assets/password-bad.png'
import {Link, Navigate} from "react-router-dom";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar";
import background from "../Assets/login_page.jpg"
import { motion } from 'framer-motion';
import Home from "../Home/Home";
import {host_back} from "../../Constants/global";

const LoginSignup = () => {

    const[action, setAction] = useState("Login")
    const[login, setLogin] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[passwordMismatch, setPasswordMismatch] = useState(false)
    const[doLogin, setDoLogin] = useState(false)
    const[doRegister, setDoRegister] = useState(false)
    const[loginResult, setLoginResult] = useState([''])
    const[registerResult, setRegisterResult] = useState(false)


    useEffect(() => {
        if (doLogin) {
            fetch(host_back + "/user/login", {
                method: 'POST',
                body: JSON.stringify({login, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(result => {
                    setLoginResult(result);
                    if (result[0]=='true') {
                        toast.success("Successfully logged in!");
                    } else {
                        toast.error("Could not log in - check credentials");
                    }
                })
        }
    }, [doLogin])

    useEffect(() => {
        if (doRegister) {
            fetch(host_back + "/register", {
                method: 'POST',
                body: JSON.stringify({login, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(result => {
                    setRegisterResult(result);
                    if (result) {
                        toast.success("Account registered successfully!");
                    } else {
                        toast.error("Could not register - username taken");
                    }

                })
        }
    }, [doRegister])

    useEffect(() => {
        if (registerResult) {
            setDoRegister(false)
            setAction("Login");
        } else if (doRegister){
            setDoRegister(false)
        }
    }, [registerResult, doRegister])

    useEffect(() => {
        if (loginResult[0]=='true') {
            setDoLogin(false)
        } else if (doLogin) {
            setDoLogin(false)
        }
    }, [loginResult, doLogin])

    const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        console.log(e.target.value)
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        console.log(e.target.value)
    }

    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
        console.log(e.target.value)
    }

    if (loginResult[0]=='true') {
        return <Navigate to={"/?session=" + loginResult[1]}/>
    }

    return(
        <div style={{ backgroundImage:`url('${background}')`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`, height: `100vh`}}>
            <ButtonAppBar color={'#f4c329'} session={''}/>
            <motion.div className='container-log'
                        initial={{ opacity: 0, y: -100}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}>
                <div className="header-log">
                    <div className="text-log">{action}</div>
                    <div className="underline-log"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="name" placeholder="Login" value={login} onChange={(e) => handleLogin(e)}/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => handlePassword(e)}/>
                    </div>
                    {action==="Login"?<div></div>:<div className="input">
                        <img src={password===confirmPassword ? password_icon : password_bad_icon} alt=""/>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleConfirmPassword(e)}/>
                    </div>}
                </div>
                {action==="Login"?<div className="forgot-password">Lost password? <span>Click here</span></div>:<div></div>}
                {action==="Sign Up" && passwordMismatch ? <div className="bad-password">Passwords must be the same and of length at least 6!</div>:<div></div>}
                {action==="Sign Up" && password.length<6 && password.length>0 ? <div className="bad-password">Password length must be at least 6!</div>:<div></div>}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={action==="Sign Up" ? password===confirmPassword && password.length>5 ? () => setDoRegister(true) : () => setPasswordMismatch(true) : ()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={action==="Login"? () => setDoLogin(true) : ()=>{setAction("Login")}}>Login</div>
                </div>
            </motion.div>
        </div>

    )
}

export default LoginSignup
