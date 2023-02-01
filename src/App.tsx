import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import "./scss/styles.scss"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import LogginForm from './Components/LogginForm/LoginForm';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import Modal from './Components/Modal/Modal';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPasswordStepOne from './Components/ForgotPassword/ForgotPassword';
import Menu from './Components/DashBoard/Menu'
import PrivateRoute from './Components/PrivateComponent/PrivateComponent';
import { appContext } from './Components/Context/appContext';
import { amilogged } from './services/loginService';
import PrivateComponent from './Components/PrivateComponent/PrivateComponent';

function App() {

  const {auth}:any = useContext(appContext);
  
  const [authServer,setAuthServer]=useState(false);
  
  async function serverConfirmation() {
    console.log("verificando");
    try {
      const res = await amilogged();
      console.log(res);
      if (res.request.status === 403) {
        return false;
      }
      return res.data;
    } catch (e) {
      return false;
    }
  }

  function validateClient(){
    if(localStorage.getItem("auth")!=null)
      if(localStorage.getItem("auth")==="true"){
        serverConfirmation().then((result)=>{
          console.log(result)
          return result;
        })
      }
       
    return false;
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/'  element={
            <Login/>
          }/>
          <Route path='/register/:step' element={
            <Register/>
          }/>
          
          <Route element={<PrivateComponent/>}>
            <Route path='/home' element={<Menu/>  }/>
            <Route path='/forgotPassword' element={<ForgotPasswordStepOne/>  }/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
