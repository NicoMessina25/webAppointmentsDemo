import axios from "axios";
axios.defaults.withCredentials = true

export function getLanguage(){
    return axios.get('/api/notsecure/getLanguage').then(res=>res.data)
}


export function getPatientInfo(medereEntity:any){
    
    const instance = axios.create({
        withCredentials: true
     })


    return instance.post('/api/secure/getPatientInfo',null,{
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
    console.log(validDTO)
    return axios.post('/api/secure/updatePatient',validDTO
    ).then(res => {
        return res
    });
}

export function changePassword(newPasswordDTO:any){
    return axios.post('/api/secure/changePassword',newPasswordDTO
    ).then(res => {
        return res
    });
}

export function addRelativeMedere(dto:any){
    return axios.post('/api/secure/addRelative',dto
    ).then(res => {
        return res
    });
}