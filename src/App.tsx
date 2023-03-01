import React, { useContext, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import "./scss/styles.scss"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import LogginForm from './Components/Forms/LogginForm/LoginForm';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPasswordStepOne from './Components/ForgotPassword/ForgotPassword';
import Menu from './Components/Views/DashBoard/Menu'
import { appContext } from './Components/Context/appContext';
import PrivateComponent from './Components/PrivateComponent/PrivateComponent';


function App() {

  const {auth}:any = useContext(appContext);
  
  const [authServer,setAuthServer]=useState(false);


  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/login'  element={
            <Login/>
          }/>
          <Route path='/register/:step' element={
            <Register/>
          }/>
          
          <Route element={<PrivateComponent/>}>
            <Route path='/*' element={<Menu/>  }/>
          </Route>
          
          <Route path='/forgotPassword' element={<ForgotPasswordStepOne/>  }/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
