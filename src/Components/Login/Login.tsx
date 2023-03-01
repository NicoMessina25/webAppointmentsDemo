import React, { useEffect, useRef, useState } from "react";
import LogginForm from "../Forms/LogginForm/LoginForm";
import "../../scss/styles.scss"
import "./Login.scss"
import { getLogo } from "../../services/nsGeneralService";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login(){
    const [logo, setLogo] = useState("");
    const [defaultLogo,setDefaultLogo]=useState("/img/graylogo.png");
    let logoLoaded=false;

     useEffect(()=>{
        if(!logoLoaded){
            logoLoaded=true;
            getLogo().then(res=>{
                setLogo(res);
            })
        } 
    },[]) 
    
    
    return(
        <div className="login flexible--column">
            
            <img src={logo!="" ? "/imgs/"+logo : defaultLogo} onError={()=>{setLogo("")}} alt="" className='logoSite' />
            <LogginForm />
            {/* <img src="/img/graylogo.png" alt="" className='logo' /> */}
        
        </div>
    )
}