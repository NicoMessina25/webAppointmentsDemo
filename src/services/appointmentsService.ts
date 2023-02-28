import axios from "axios";


export function getProfessionals(inputText:String,offSet:number,pageSize:number,language:number,params:any ){
    
    return axios.get('/api/secure/getProfessionals',
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

    return axios.get('/api/secure/getSpecialities',
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

export function getAppointments(offSet:any,pageSize:any,language:any,params:any ){
    
    /* "language":1,
    "medicalspeciality":51,
    "professional":58946,
    "videocall":false,
    "building":3,
    "hour":"",
    "time":"tade",
    "date":"2023-02-25T10:31:59.000Z"
     */

    let professional=-1;
    if(params.professional)
        professional=params.professional;

    return axios.post('/api/secure/getAppointments',params,
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
        }
    }).then(res => {return res.data})
}

export function getBuildings(inputText:String,offSet:number,pageSize:number,language:number,params:any ){

    return axios.get('/api/secure/getBuildings',
    {
        params: {
            pageSize:pageSize,
            offSet:offSet,
            speciality:params.speciality,
            professional:params.professional
        }
    }).then(res => {return res.data})
}
