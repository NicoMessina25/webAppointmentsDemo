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
            medicalspeciality:params.medicalspeciality,
            building:params.building

        }
    }).then(res => res.data)
}

export function getSpecialities(inputText:String,offSet:number,pageSize:number,language:number,params:any ){


    return axios.get('/api/secure/general/getSpecialities',
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
            language:language,
            inputText:inputText,

        }
    }).then(res => {return res.data})
}

export function getBuildings(inputText:String,offSet:number,pageSize:number,language:number,params:any ){

    return axios.get('/api/secure/general/getBuildings',
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
        }
    }).then(res => {return res.data})
}

export function amilogged(){
  
    return axios.get('/api/secure/general/amilogged');
    
}