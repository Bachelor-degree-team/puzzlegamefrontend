import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Home from "./Components/Home/Home"
import SearchTableComponent from "./Components/SearchTableComponent/SearchTableComponent";
import Game from "./Components/Game/Game";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import UserManagement from "./Components/UserManagement/UserManagement";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="loginsignup/" element={<LoginSignup/>} />
              <Route path="searchtablecomponent/" element={<SearchTableComponent/>}/>
              <Route path="game/" element={<Game/>} />
              <Route path="adminpanel/" element={<AdminPanel/>}/>
              <Route path="usermanagement/" element={<UserManagement/>}/>
          </Routes>
      </Router>
  );
}

export default App;
