import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import "./scss/styles.scss"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import LogginForm from './Components/LogginForm/LoginForm';
import {BrowserRouter} from "react-router-dom"
import Modal from './Components/Modal/Modal';

function App() {

  

  return (
    <BrowserRouter>
      <div className="App flexible--column">
        <img src="/img/ccyr.png" alt="" className='logoSite' />
        <LogginForm/>
        <img src="/img/advenio-medere.png" alt="" className='logo' />
      </div>
    </BrowserRouter>
  );
}

export default App;
