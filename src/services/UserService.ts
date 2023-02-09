import axios from "axios";
import { useState } from "react";

export function getPatientInfo(medereEntity:any){
    
    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getPatientInfo',null,{
        params:{
            id:medereEntity
        }
    }).then(res => {
        return res.data
    });
        
    
}
