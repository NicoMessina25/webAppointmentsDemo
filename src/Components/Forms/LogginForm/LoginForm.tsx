import React, { useContext, useState} from "react";
import "../../../scss/styles.scss"
import "./LoginForm.scss"
import {Button} from "primereact/button"
import { Checkbox } from 'primereact/checkbox';
import { Link, Navigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { useIntl } from 'react-intl';
import InputTextCustom from "../../Inputs/InputText/InputTextCustom";
import { authenticateUser } from "../../../services/loginService";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../Context/appContext";
import { log } from "console";
import { getPatientInfo } from "../../../services/UserService";




export default function LogginForm({googleLogin}:any){

    const [checked, setChecked] = useState(false);
    const [displayNotUserFound, setDisplayNotUserFound] = useState(false);
    
    const [displayRegister, setDisplayRegister] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorUserstyle,setErrorUserstyle]=useState(false);
    const [errorPassstyle,setErrorPassstyle]=useState(false);
    const intl = useIntl();

    const [userErrorCaption,setUserErrorCaption]=useState("");
    const [passwordErrorCaption,setPasswordErrorCaption]=useState("");

    const navigate = useNavigate();
    const {setAppSettings}:any = useContext(appContext);
    const {setModificateUser}:any = useContext(appContext);

    const {user}:any = useContext(appContext);

    

    function validateUser(){
        //Validar antes de ir al backend que los dos campos tienen datos.
        if(userName==""){
            setErrorUserstyle(true);
            setUserErrorCaption(intl.formatMessage({id:'EnterUsername'}))
        }
        if(password==""){
            setPasswordErrorCaption(intl.formatMessage({id:'EnterPassword'}));
            setErrorPassstyle(true)
        }
      
        if(password!="" && userName!=""){
            authenticateUser(userName,password).then(res=>{
                if(res.request.status==200){

                    localStorage.setItem("settings",JSON.stringify(res.data))

                    let settingsString: any = localStorage.getItem("settings");
                    let settingsJson;
                    
                    if (settingsString){
                        
                        settingsJson = JSON.parse(settingsString)
                    
                        getPatientInfo(settingsJson.entityId).then(res=>{
                            res.mobilephone={
                                prefix: "+54",
                                area: "",
                                number: "",
                            };
                            res.birthDate = new Date(res.birthDate);
                            setModificateUser(res);
                            
                            
                        })
                        
                    }
                    
                    navigate("/home");
                }else{
                    setErrorPassstyle(true)
                }
                
            }).catch(error=>{
                setDisplayNotUserFound(true);
                console.log(error);
                
            })
               
        }
    }
    
    return( 
        <div className="formContainer flexible--column">
            <div className="loginHeader">
                <h1>{intl.formatMessage({ id: 'Welcome' })}</h1>
                <h4>{intl.formatMessage({ id: 'EnterAndRequestYourTurnOrRecipe' })}</h4>
            </div>
            <div className="flexible--column loginBody">
            
               {googleLogin &&<Button label={intl.formatMessage({ id: 'SignInWithGoogle' })} className="buttonMain2"/>} 
                                        
                {  googleLogin && <div className="lineContainer flexible--row">
                                        <div className="lineGreenBlue"></div>
                                        <p>O</p>
                                        <div className="lineGreenBlue"></div>
                                </div>
                                }
                
                <InputTextCustom value={userName} caption={userErrorCaption} error={errorUserstyle} onChange={(e:any) => {
                        setUserName(e.target.value)
                        setErrorUserstyle(false);
                        setUserErrorCaption("")
                    }} className="input" placeholder="" label={intl.formatMessage({id: "User"})}/>
                <InputTextCustom value={password} caption={passwordErrorCaption} error={errorPassstyle} onChange={(e:any) =>{
                    setPassword(e.target.value);
                    setErrorPassstyle(false);
                    setPasswordErrorCaption("")
                }} 
                onEnter={validateUser}
                placeholder="" label={intl.formatMessage({id: "Password"})} password feedback={false}/>
               <div className="rememberForgetPasswordContainer flexible--row">
                    <div className="checkboxContainer flexible--row">
                        <Checkbox onChange={e => setChecked(e.checked)} checked={checked} className="checkbox"/>
                        <p className="checkboxLabel" >{intl.formatMessage({ id: 'RememberMe' })}</p>
                    </div>
                    <div className="linkContainer flexible--row">
                        <Link to={"/forgotPassword"} className="link">{intl.formatMessage({ id: 'ForgotPassword' })}</Link>
                    </div>
               </div>
               <Button label={intl.formatMessage({ id: 'Join' })} onClick={validateUser} className="buttonMain" />
               <p className="text">{intl.formatMessage({ id: 'FirstTimeHere' })}</p>
               <Button label={intl.formatMessage({ id: 'SignIn' })} className="buttonMain2" onClick={()=>setDisplayRegister(true)} />
            </div>
            <Modal visible={displayNotUserFound} setVisible={setDisplayNotUserFound} header={intl.formatMessage({ id: 'UserOrPasswordAreInvalid' })} footerButtonRightText={intl.formatMessage({ id: 'Back' })}  onClickRightBtn={()=>setDisplayNotUserFound(false)} pathRightBtn={"#"}>
            {intl.formatMessage({ id: 'UserDoesNotExistDescription' })}
            </Modal>
            <Modal visible={displayRegister} setVisible={setDisplayRegister} header={intl.formatMessage({ id: 'BeforeStarting' }) + "..."}  footerButtonRightText={intl.formatMessage({ id: 'Continue' })}  pathRightBtn={"/register/1"}>
            {intl.formatMessage({ id: 'BeforeStartingDescription' })}
            </Modal>
            
        </div>
    );
}