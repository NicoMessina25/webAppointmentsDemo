import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import "./scss/styles.scss"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import LogginForm from './Components/LogginForm/LoginForm';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Modal from './Components/Modal/Modal';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPasswordStepOne from './Components/ForgotPassword/ForgotPassword';
import Menu from './Components/DashBoard/Menu'

function App() {

  

  return (
    <BrowserRouter>
      <div className='App'>

        <Routes>
          <Route path='/' element={
            <Login/>
          }/>
          <Route path='/register/:step' element={
            <Register/>
          }/>
          <Route path='/forgotPassword/*' element={
            <ForgotPasswordStepOne/>
          }/>
          <Route path='/home' element={
            <Menu/>
          }/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
