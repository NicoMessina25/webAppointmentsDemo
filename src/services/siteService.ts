import axios from "axios";
import { useState } from "react";

export function getLanguage(){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getLanguage').then(res=>res.data)
}

export function getCaptchaKey(){
    
 
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getWebAppointmentsCaptchaKey',{
        params:{
            appid:2
        }
    }).then(res => {
        console.log(res.data);
        
        return res.data
    } );
        
    
}