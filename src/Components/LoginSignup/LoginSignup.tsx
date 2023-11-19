import React, {useState} from 'react'
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'
import {Link} from "react-router-dom";

const LoginSignup = () => {

    const[action,setAction] = useState("Sign Up")

    return(
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt=""/>
                    <input type="name" placeholder="Name"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt=""/>
                    <input type="password" placeholder="Password"/>
                </div>
                {action==="Login"?<div></div>:<div className="input">
                    <img src={password_icon} alt=""/>
                    <input type="confirm password" placeholder="Confirm Password"/>
                </div>}
            </div>
            {action==="Login"?<div className="forgot-password">Lost password? <span>Click here</span></div>:<div></div>}
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup
