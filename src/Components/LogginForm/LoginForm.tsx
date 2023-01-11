import React, { useState} from "react";
import "../../scss/styles.scss"
import "./LoginForm.scss"
import {Button} from "primereact/button"
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

export default function LogginForm(){
    const [checked, setChecked] = useState(false);
    const [displayNotUserFound, setDisplayNotUserFound] = useState(false);
    const [displayRegister, setDisplayRegister] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function validateUser(){
        console.log(userName, password);
        
        setDisplayNotUserFound(true)
    }

    return( 
        <div className="formContainer flexible--column">
            <div className="loginHeader">
                <h1>Bienvenido</h1>
                <h4>Ingresá o solicitá tu turno o receta</h4>
            </div>
            <div className="flexible--column loginBody">
               <Button label="Ingresá con Google" className="buttonMain2"/>
               <div className="lineContainer flexible--row">
                    <div className="lineGreenBlue"></div>
                    <p>O</p>
                    <div className="lineGreenBlue"></div>
               </div>
               <div className="flexible--column inputContainer">
                    <p>Usuario</p>
                    <InputText value={userName} onChange={(e) => setUserName(e.target.value)} className="input" placeholder=""/>
               </div>
               <div className="flexible--column inputContainer">
                    <p>Contraseña</p>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask={true} />
               </div>
               <div className="rememberForgetPasswordContainer flexible--row">
                    <div className="checkboxContainer flexible--row">
                        <Checkbox onChange={e => setChecked(e.checked)} checked={checked} className="checkbox"/>
                        <p>Recordar</p>
                    </div>
                    <div className="linkContainer flexible--row">
                        <Link to={"/"} className="link">Olvidé mi contraseña</Link>
                    </div>
               </div>
               <Button  label="Ingresar" className="buttonMain" onClick={()=>{validateUser()}}/>
               <p className="text">¿Primera vez acá?</p>
               <Button label="Regístrame" className="buttonMain2" onClick={()=>setDisplayRegister(true)}/>
            </div>
            <Modal visible={displayNotUserFound} setVisible={setDisplayNotUserFound} header="El usuario no existe" footerButtonRightText="Volver" onClickRightBtn={()=>setDisplayNotUserFound(false)}>
                Registrate o verificá si la cuenta que ingresaste fue la usada para darte de alta.
            </Modal>
            <Modal visible={displayRegister} setVisible={setDisplayRegister} header="Antes de comenzar..." footerButtonRightText="Continuar" footerButtonLeftText="Cancelar" onClickLeftBtn={()=>setDisplayRegister(false)}>
                Tené a disposición los datos de tu obra social o prepaga (vas a tener que ingresarlos en caso de que tengas una).
            </Modal>
        </div>
    );
}