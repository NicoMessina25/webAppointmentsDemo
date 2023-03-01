import axios from "axios";

export function getProfessionals(inputText:String,offSet:number,pageSize:number,language:number,params:any ){
    
    return axios.get('/api/secure/general/getProfessionals',
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
            language:language,
            inputText:inputText,
            facetoface:params.facetoface,
            allowsdigitalrp:params.allowsdigitalrp,
            medicalspeciality:params.medicalspeciality

        }
    }).then(res => res.data)
}

export function getSpecialities(inputText:String,offSet:number,pageSize:number,language:number,params:any ){
    
    let professional=-1;
    if(params.professional)
        professional=params.professional;

    return axios.get('/api/secure/general/getSpecialities',
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
            language:language,
            inputText:inputText,
            professional:professional

        }
    }).then(res => {return res.data})
}

export function getBuildings(inputText:String,offSet:number,pageSize:number,language:number,params:any ){

    return axios.get('/api/secure/general/getBuildings',
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
            speciality:params.speciality,
            professional:params.professional
        }
    }).then(res => {return res.data})
}

export function amilogged(){
  
    return axios.get('/api/secure/general/amilogged');
    
}