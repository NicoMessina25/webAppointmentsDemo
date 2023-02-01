import React, { useEffect, useRef, useState } from "react";
import LogginForm from "../LogginForm/LoginForm";
import "../../scss/styles.scss"
import "./Login.scss"
import { getLogo } from "../../services/imageService";
import ReCAPTCHA from "react-google-recaptcha";
import { getCaptchaKey } from "../../services/siteService";

export default function Login(){
    const [logo, setLogo] = useState("");
    const [src,setSrc]=useState(process.env.REACT_APP_MEDERE_ADDRESS+"/imgs/");
    const [defaultLogo,setDefaultLogo]=useState("/img/graylogo.png");
    let logoLoaded=false;

     useEffect(()=>{
        if(!logoLoaded){
            logoLoaded=true;
            getLogo().then(res=>{
                setLogo(res);
                setSrc(src+res);
            })
        }
        
    },[]) 

        
    return(
        <div className="login flexible--column">
            <img src={src} onError={()=>{setSrc(defaultLogo)}} alt="" className='logoSite' />
            <LogginForm googleLogin/>
         
            <img src="/img/graylogo.png" alt="" className='logo' />
        
        </div>
    )
}