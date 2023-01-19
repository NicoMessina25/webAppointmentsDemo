import React, { useEffect, useState } from "react";
import LogginForm from "../LogginForm/LoginForm";
import "../../scss/styles.scss"
import "./Login.scss"
import { getLogo } from "../../services/imageService";

export default function Login(){
    const [logo, setLogo] = useState("");
    const [src,setSrc]=useState(process.env.REACT_APP_MEDERE_ADDRESS+"/imgs/");
    const [defaultLogo,setDefaultLogo]=useState("/img/advenio-medere.png");

     useEffect(()=>{
        getLogo().then(res=>{
            setLogo(res);
            setSrc(src+res);
        })
    },[]) 


    return(
        <div className="login flexible--column">
            { logo!="" && <img src={src} onError={()=>{setSrc(defaultLogo)}} alt="" className='logoSite' /> }
            <LogginForm googleLogin/>
            <img src="/img/graylogo.png" alt="" className='logo' />
        </div>
    )
}