import axios from "axios";
axios.defaults.withCredentials = true




export function getPatientInfo(medereEntity:any){
    
    const instance = axios.create({
        withCredentials: true
     })


    return instance.post('/api/secure/user/getPatientInfo',null,{
        params:{
            id:medereEntity
        },
    }).then(res => {
        return res.data
    });
}

export function savePatientInfo(user:any,returnValidPatientDTO:any,mobilePhone:any){
    //Pasar mobilePhone como string
    let validDTO=returnValidPatientDTO(user)
    validDTO.mobilePhone=mobilePhone;
    return axios.post('/api/secure/user/updatePatient',validDTO
    ).then(res => {
        return res
    });
}

export function changePassword(newPasswordDTO:any){
    return axios.post('/api/secure/user/changePassword',newPasswordDTO
    ).then(res => {
        return res
    });
}

export function addRelativeMedere(dto:any){
    return axios.post('/api/secure/user/addRelative',dto
    ).then(res => {
        return res
    });
}