import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountLink from "./page/count";
import HomePage from "./page/home";
import "bootstrap/dist/css/bootstrap.css";
import Signup from "./page/signup";
import "./styles/signup-login-styles.css"
import Login from "./page/login";
import Navbar from "./page/dashboard";
ReactDOM.render(
  <>
 
  <BrowserRouter>
    <Routes>
    
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<HomePage />} />
      <Route path="/:click" element={<CountLink />} />
    </Routes>
  </BrowserRouter></>,
  document.getElementById("root")
);
