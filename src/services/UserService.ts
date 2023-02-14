import axios from "axios";


export function getLanguage(){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getLanguage').then(res=>res.data)
}


export function getPatientInfo(medereEntity:any){
    
    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getPatientInfo',null,{
        params:{
            id:medereEntity
        }
    }).then(res => {
        return res.data
    });
}

export function savePatientInfo(user:any,returnValidPatientDTO:any,mobilePhone:any){
    //Pasar mobilePhone como string
    let validDTO=returnValidPatientDTO(user)
    validDTO.mobilePhone=mobilePhone;
    console.log(validDTO)
    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/updatePatient',validDTO
    ).then(res => {
        return res
    });
}

export function changePassword(newPasswordDTO:any){
    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/changePassword',newPasswordDTO
    ).then(res => {
        return res
    });
}

export function addRelativeMedere(dto:any){
    return axios.post(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/addRelative',dto
    ).then(res => {
        return res
    });
}