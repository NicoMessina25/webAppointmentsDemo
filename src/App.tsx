import React, { useContext, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import "./scss/styles.scss"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import LogginForm from './Components/Forms/LogginForm/LoginForm';
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import Modal from './Components/Modal/Modal';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ForgotPasswordStepOne from './Components/ForgotPassword/ForgotPassword';
import Menu from './Components/Views/DashBoard/Menu'
import { appContext } from './Components/Context/appContext';
import { amilogged } from './services/loginService';
import PrivateComponent from './Components/PrivateComponent/PrivateComponent';
import MyPrescriptions from './Components/Views/Prescriptions/MyPrescriptions';
import NewAppointments from './Components/Views/Appointments/NewAppointments';
import HistoricAppointments from './Components/Views/Appointments/HistoricAppointments';
import MyAppointments from './Components/Views/Appointments/MyAppointments';
import NewRp from './Components/Views/Prescriptions/NewRp';
import ClinicRequest from './Components/Views/ClinicHistory/ClinicRequest';
import SendStudyResults from './Components/Views/ClinicHistory/SendStudyResults';
import MyProfile from './Components/Views/Profile/MyProfile';
import FamilyGroup from './Components/Views/FamilyGroup/FamilyGroup';
import { useIntl } from 'react-intl';


function App() {

  const {auth}:any = useContext(appContext);
  
  const [authServer,setAuthServer]=useState(false);



  
  
  

  // function validateClient(){
  //   if(localStorage.getItem("auth")!=null)
  //     if(localStorage.getItem("auth")==="true"){
  //       serverConfirmation().then((result)=>{
  //         console.log(result)
  //         return result;
  //       })
  //     }
  //   return false;
  // }

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
