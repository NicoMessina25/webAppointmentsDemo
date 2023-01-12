import React, { useEffect, useState } from "react";
import LogginForm from "../LogginForm/LoginForm";
import "../../scss/styles.scss"
import "./Login.scss"
import { getLogo } from "../../services/imageService";

export default function Login(){
    const [logo, setLogo] = useState("");

    useEffect(()=>{
        getLogo().then(res=>{
            console.log(res);
            
            setLogo(res);
            
        })
    },[])

  

    return(
        <div className="login flexible--column">
            <img src={`http://medere1.medere.localhost:8080/imgs/${logo}`} alt="" className='logoSite' />
            <LogginForm/>
            <img src="/img/advenio-medere.png" alt="" className='logo' />
        </div>
    )
}