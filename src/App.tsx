import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Home from "./Components/Home/Home"
import SearchTableComponent from "./Components/SearchTableComponent/SearchTableComponent";
import Game from "./Components/Game/Game";
import GamePanel from "./Components/GamePanel/GamePanel";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import UserManagement from "./Components/UserManagement/UserManagement";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import AddGame from "./Components/AddGame/AddGame";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="loginsignup/" element={<LoginSignup/>}/>
                <Route path="search/" element={<SearchTableComponent/>}/>
                <Route path="game/" element={<Game/>}/>
                <Route path="gamepanel/" element={<GamePanel/>}/>
                <Route path="adminpanel/" element={<AdminPanel/>}/>
                <Route path="usermanagement/" element={<UserManagement/>}/>
                <Route path="addgame/" element={<AddGame/>}/>
            </Routes>
            <ToastContainer/>
        </Router>
    );
}

export default App;
