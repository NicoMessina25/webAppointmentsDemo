import React, { useContext, useEffect, useState } from 'react';
import { getCaptchaKey } from '../../services/siteService';

const captchaContext = React.createContext({});



const CaptchaProvider = ({children}:any) => {

    let [captchaKey,setCaptchaKey]=useState("");
    
    useEffect(()=>{
        getCaptchaKey().then(response=>{
            setCaptchaKey(response);
        })
    },[])
    
    return (
        <captchaContext.Provider value={{captchaKey}}>
            {children}
        </captchaContext.Provider>
        
    )
}

export {CaptchaProvider,captchaContext};