import React from 'react'
import {BrowserRouter, Routes, Route} from  "react-router-dom";
import HomePage from './Pages/HomePage/homePage';
import LoginPage from './Pages/LoginPage/loginPage';
import SignUpPage from './Pages/SignUpPage/signUpPage';
import "./App.css"


const App = () =>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" index element ={<SignUpPage/>}/>
      <Route path = "/login" element ={<LoginPage/>}/>
      <Route path = "/sign-up" element = {<SignUpPage/>}/>
      <Route path = "/home" element ={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App ;